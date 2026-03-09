"""Spotify Web API client for Glass Cards.

Uses the OAuth2 token from Home Assistant's Spotify integration
to call the Spotify Web API directly for search, browse, and queue.
"""

from __future__ import annotations

import logging
from typing import TYPE_CHECKING, Any

from homeassistant.exceptions import HomeAssistantError

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)

SPOTIFY_API_BASE = "https://api.spotify.com/v1"
SPOTIFY_DOMAIN = "spotify"


class SpotifyNotConfiguredError(HomeAssistantError):
    """Raised when the Spotify integration is not set up."""


class SpotifyAPIError(HomeAssistantError):
    """Raised when the Spotify API returns an error."""

    def __init__(self, status: int, message: str, retry_after: int | None = None) -> None:
        super().__init__(message)
        self.status = status
        self.retry_after = retry_after


async def _get_spotify_token(hass: HomeAssistant) -> str:
    """Retrieve a valid access token from the HA Spotify integration."""
    entries = hass.config_entries.async_entries(SPOTIFY_DOMAIN)
    if not entries:
        raise SpotifyNotConfiguredError(
            "Spotify integration not configured in Home Assistant"
        )

    entry = entries[0]
    token_data = entry.data.get("token")
    if not token_data or "access_token" not in token_data:
        raise SpotifyNotConfiguredError(
            "No Spotify token available — re-authenticate the Spotify integration"
        )

    # Refresh the token if expired
    from homeassistant.helpers import config_entry_oauth2_flow

    try:
        implementation = await config_entry_oauth2_flow.async_get_config_entry_implementation(
            hass, entry
        )
        session = config_entry_oauth2_flow.OAuth2Session(hass, entry, implementation)
        await session.async_ensure_token_valid()
        return session.token["access_token"]
    except Exception as exc:
        raise SpotifyNotConfiguredError(
            f"Failed to refresh Spotify token: {exc}"
        ) from exc


async def spotify_request(
    hass: HomeAssistant,
    method: str,
    endpoint: str,
    params: dict[str, Any] | None = None,
    json_body: dict[str, Any] | None = None,
) -> dict[str, Any] | None:
    """Make an authenticated request to the Spotify Web API."""
    from homeassistant.helpers.aiohttp_client import async_get_clientsession

    token = await _get_spotify_token(hass)
    headers = {"Authorization": f"Bearer {token}"}
    url = f"{SPOTIFY_API_BASE}{endpoint}"

    session = async_get_clientsession(hass)
    async with session.request(
        method, url, headers=headers, params=params, json=json_body
    ) as resp:
        if resp.status == 204:
            return None
        if resp.status == 429:
            retry_after = int(resp.headers.get("Retry-After", "5"))
            raise SpotifyAPIError(429, "Spotify rate limit exceeded", retry_after)
        if resp.status == 401:
            raise SpotifyAPIError(401, "Spotify token expired or invalid")
        if resp.status == 403:
            raise SpotifyAPIError(403, "Spotify Premium required or insufficient permissions")
        if resp.status >= 400:
            body = await resp.text()
            raise SpotifyAPIError(resp.status, f"Spotify API error: {body}")
        return await resp.json()


# ── Search ────────────────────────────────────────────────────────────

VALID_SEARCH_TYPES = frozenset(
    {"track", "album", "artist", "playlist", "show", "episode"}
)


async def spotify_search(
    hass: HomeAssistant,
    query: str,
    types: list[str],
    limit: int = 10,
    offset: int = 0,
    market: str | None = None,
) -> dict[str, Any]:
    """Search Spotify for tracks, albums, artists, playlists, shows, episodes."""
    valid_types = [t for t in types if t in VALID_SEARCH_TYPES]
    if not valid_types:
        return {}

    params: dict[str, Any] = {
        "q": query,
        "type": ",".join(valid_types),
        "limit": min(max(limit, 1), 50),
        "offset": min(max(offset, 0), 1000),
    }
    if market:
        params["market"] = market

    result = await spotify_request(hass, "GET", "/search", params=params)
    return result or {}


# ── Queue ─────────────────────────────────────────────────────────────

async def spotify_get_queue(hass: HomeAssistant) -> dict[str, Any]:
    """Get the current playback queue."""
    result = await spotify_request(hass, "GET", "/me/player/queue")
    return result or {"currently_playing": None, "queue": []}


async def spotify_add_to_queue(
    hass: HomeAssistant, uri: str, device_id: str | None = None
) -> None:
    """Add a track or episode to the playback queue."""
    params: dict[str, str] = {"uri": uri}
    if device_id:
        params["device_id"] = device_id
    await spotify_request(hass, "POST", "/me/player/queue", params=params)


# ── Browse / Library ──────────────────────────────────────────────────

async def spotify_get_playlists(
    hass: HomeAssistant, limit: int = 20, offset: int = 0
) -> dict[str, Any]:
    """Get the current user's playlists."""
    result = await spotify_request(
        hass, "GET", "/me/playlists",
        params={"limit": min(limit, 50), "offset": offset},
    )
    return result or {"items": [], "total": 0}


async def spotify_get_playlist_tracks(
    hass: HomeAssistant,
    playlist_id: str,
    limit: int = 50,
    offset: int = 0,
    sort_order: str = "oldest_first",
) -> dict[str, Any]:
    """Get tracks in a playlist with optional reverse sort."""
    if sort_order == "recent_first":
        # First fetch total to compute reverse offset
        meta = await spotify_request(
            hass, "GET", f"/playlists/{playlist_id}",
            params={"fields": "tracks.total"},
        )
        total = (meta or {}).get("tracks", {}).get("total", 0)
        if total == 0:
            return {"items": [], "total": 0}

        reverse_offset = max(0, total - offset - limit)
        actual_limit = min(limit, total - offset)
        if actual_limit <= 0:
            return {"items": [], "total": total}

        result = await spotify_request(
            hass, "GET", f"/playlists/{playlist_id}/tracks",
            params={"limit": actual_limit, "offset": reverse_offset},
        )
        if result and "items" in result:
            result["items"] = list(reversed(result["items"]))
            result["total"] = total
        return result or {"items": [], "total": total}

    result = await spotify_request(
        hass, "GET", f"/playlists/{playlist_id}/tracks",
        params={"limit": min(limit, 50), "offset": offset},
    )
    return result or {"items": [], "total": 0}


async def spotify_get_recently_played(
    hass: HomeAssistant, limit: int = 20
) -> dict[str, Any]:
    """Get recently played tracks (most recent first by default)."""
    result = await spotify_request(
        hass, "GET", "/me/player/recently-played",
        params={"limit": min(limit, 50)},
    )
    return result or {"items": []}


async def spotify_get_saved_tracks(
    hass: HomeAssistant, limit: int = 20, offset: int = 0
) -> dict[str, Any]:
    """Get user's liked songs (most recent first by default)."""
    result = await spotify_request(
        hass, "GET", "/me/tracks",
        params={"limit": min(limit, 50), "offset": offset},
    )
    return result or {"items": [], "total": 0}


async def spotify_get_saved_albums(
    hass: HomeAssistant, limit: int = 20, offset: int = 0
) -> dict[str, Any]:
    """Get user's saved albums (most recent first by default)."""
    result = await spotify_request(
        hass, "GET", "/me/albums",
        params={"limit": min(limit, 50), "offset": offset},
    )
    return result or {"items": [], "total": 0}


async def spotify_get_saved_shows(
    hass: HomeAssistant, limit: int = 20, offset: int = 0
) -> dict[str, Any]:
    """Get user's saved/followed podcasts (shows)."""
    result = await spotify_request(
        hass, "GET", "/me/shows",
        params={"limit": min(limit, 50), "offset": offset},
    )
    return result or {"items": [], "total": 0}


async def spotify_get_album(hass: HomeAssistant, album_id: str) -> dict[str, Any]:
    """Get an album's details and tracks."""
    result = await spotify_request(hass, "GET", f"/albums/{album_id}")
    return result or {}


async def spotify_get_artist_top_tracks(
    hass: HomeAssistant, artist_id: str, market: str | None = None
) -> dict[str, Any]:
    """Get an artist's top tracks."""
    resolved_market = market or hass.config.country or "US"
    result = await spotify_request(
        hass, "GET", f"/artists/{artist_id}/top-tracks",
        params={"market": resolved_market},
    )
    return result or {"tracks": []}


async def spotify_get_recommendations(
    hass: HomeAssistant,
    seed_tracks: list[str] | None = None,
    seed_artists: list[str] | None = None,
    seed_genres: list[str] | None = None,
    limit: int = 20,
) -> dict[str, Any]:
    """Get track recommendations based on seeds."""
    params: dict[str, Any] = {"limit": min(max(limit, 1), 100)}
    if seed_tracks:
        params["seed_tracks"] = ",".join(seed_tracks[:5])
    if seed_artists:
        params["seed_artists"] = ",".join(seed_artists[:5])
    if seed_genres:
        params["seed_genres"] = ",".join(seed_genres[:5])

    # Need at least one seed
    if not any(k.startswith("seed_") for k in params):
        return {"tracks": []}

    result = await spotify_request(hass, "GET", "/recommendations", params=params)
    return result or {"tracks": []}
