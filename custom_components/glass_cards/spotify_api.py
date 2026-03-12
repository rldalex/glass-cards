"""Spotify Web API client for Glass Cards.

Uses the OAuth2 token from Home Assistant's Spotify integration
to call the Spotify Web API directly for search, browse, and queue.
"""

from __future__ import annotations

import logging
import time
from collections import deque
from typing import TYPE_CHECKING, Any

from homeassistant.exceptions import HomeAssistantError

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)

SPOTIFY_API_BASE = "https://api.spotify.com/v1"
SPOTIFY_DOMAIN = "spotify"

# Module-level rate-limit state (shared across all calls in the process)
_rate_limit_until: float = 0.0
_request_timestamps: deque[float] = deque()


class SpotifyNotConfiguredError(HomeAssistantError):
    """Raised when the Spotify integration is not set up."""


class SpotifyAPIError(HomeAssistantError):
    """Raised when the Spotify API returns an error."""

    def __init__(self, status: int, message: str, retry_after: int | None = None) -> None:
        super().__init__(message)
        self.status = status
        self.retry_after = retry_after


async def _get_spotify_token(hass: HomeAssistant, entity_id: str = "") -> str:
    """Retrieve a valid access token from the HA Spotify integration.

    When *entity_id* is provided the matching config entry is resolved via the
    HA entity registry, allowing multi-account Spotify setups. Falls back to
    the first available Spotify config entry when resolution fails.
    """
    config_entry = None

    if entity_id:
        from homeassistant.helpers import entity_registry as er
        entity_registry = er.async_get(hass)
        reg_entry = entity_registry.async_get(entity_id)
        if reg_entry and reg_entry.config_entry_id:
            config_entry = hass.config_entries.async_get_entry(reg_entry.config_entry_id)

    if config_entry is None:
        entries = hass.config_entries.async_entries(SPOTIFY_DOMAIN)
        if not entries:
            raise SpotifyNotConfiguredError(
                "Spotify integration not configured in Home Assistant"
            )
        config_entry = entries[0]

    token_data = config_entry.data.get("token")
    if not token_data or "access_token" not in token_data:
        raise SpotifyNotConfiguredError(
            "No Spotify token available — re-authenticate the Spotify integration"
        )

    # Refresh the token if expired
    from homeassistant.helpers import config_entry_oauth2_flow

    try:
        implementation = await config_entry_oauth2_flow.async_get_config_entry_implementation(
            hass, config_entry
        )
        session = config_entry_oauth2_flow.OAuth2Session(hass, config_entry, implementation)
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
    entity_id: str = "",
) -> dict[str, Any] | None:
    """Make an authenticated request to the Spotify Web API."""
    global _rate_limit_until
    now = time.time()

    # Check global backoff from a previous 429
    if now < _rate_limit_until:
        remaining = _rate_limit_until - now
        raise SpotifyAPIError(
            429,
            f"Rate limited, retry after {remaining:.0f}s",
            retry_after=int(remaining),
        )

    # Proactive: max 25 requests per 30s sliding window
    while _request_timestamps and now - _request_timestamps[0] > 30:
        _request_timestamps.popleft()
    if len(_request_timestamps) > 25:
        _rate_limit_until = now + 5
        raise SpotifyAPIError(
            429,
            "Rate limit preventive, retry after 5s",
            retry_after=5,
        )

    _request_timestamps.append(now)

    from homeassistant.helpers.aiohttp_client import async_get_clientsession

    token = await _get_spotify_token(hass, entity_id=entity_id)
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
            _rate_limit_until = now + retry_after
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
    entity_id: str = "",
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

    result = await spotify_request(hass, "GET", "/search", params=params, entity_id=entity_id)
    return result or {}


# ── Queue ─────────────────────────────────────────────────────────────

async def spotify_get_queue(hass: HomeAssistant, entity_id: str = "") -> dict[str, Any]:
    """Get the current playback queue."""
    result = await spotify_request(hass, "GET", "/me/player/queue", entity_id=entity_id)
    return result or {"currently_playing": None, "queue": []}


async def spotify_add_to_queue(
    hass: HomeAssistant, uri: str, device_id: str | None = None, entity_id: str = ""
) -> None:
    """Add a track or episode to the playback queue."""
    params: dict[str, str] = {"uri": uri}
    if device_id:
        params["device_id"] = device_id
    await spotify_request(hass, "POST", "/me/player/queue", params=params, entity_id=entity_id)


# ── Browse / Library ──────────────────────────────────────────────────

async def spotify_get_playlists(
    hass: HomeAssistant, limit: int = 20, offset: int = 0, entity_id: str = ""
) -> dict[str, Any]:
    """Get the current user's playlists."""
    result = await spotify_request(
        hass, "GET", "/me/playlists",
        params={"limit": min(limit, 50), "offset": offset},
        entity_id=entity_id,
    )
    return result or {"items": [], "total": 0}


def _get_playlist_total_from_cache(hass: HomeAssistant, playlist_id: str) -> int | None:
    """Read cached playlist total, return None on miss or if cache unavailable."""
    from .const import DOMAIN
    domain_data = hass.data.get(DOMAIN)
    if not domain_data:
        return None
    cache = domain_data.get("spotify_cache")
    if cache is None:
        return None
    return cache.get(f"playlist_total:{playlist_id}")


def _set_playlist_total_in_cache(hass: HomeAssistant, playlist_id: str, total: int) -> None:
    """Store playlist total in cache for subsequent pages."""
    from .const import DOMAIN
    domain_data = hass.data.get(DOMAIN)
    if not domain_data:
        return
    cache = domain_data.get("spotify_cache")
    if cache is None:
        return
    cache.set(f"playlist_total:{playlist_id}", total)


async def spotify_get_playlist_tracks(
    hass: HomeAssistant,
    playlist_id: str,
    limit: int = 50,
    offset: int = 0,
    sort_order: str = "oldest_first",
    entity_id: str = "",
) -> dict[str, Any]:
    """Get tracks in a playlist with optional reverse sort.

    For ``recent_first``:
    - First page (offset=0): fetches total via a separate metadata call, then
      caches it as ``playlist_total:{playlist_id}`` so subsequent pages only
      need one API call.
    - Subsequent pages: reads total from cache (1 call). If cache expired,
      re-fetches total gracefully (2 calls again).
    """
    if sort_order == "recent_first":
        # Try to read total from cache (subsequent pages skip the meta call)
        total: int | None = None
        if offset > 0:
            total = _get_playlist_total_from_cache(hass, playlist_id)

        if total is None:
            # First page or cache miss: fetch total via metadata call
            meta = await spotify_request(
                hass, "GET", f"/playlists/{playlist_id}",
                params={"fields": "tracks.total"},
                entity_id=entity_id,
            )
            total = (meta or {}).get("tracks", {}).get("total", 0)
            if total == 0:
                return {"items": [], "total": 0}
            # Cache total for subsequent page requests
            _set_playlist_total_in_cache(hass, playlist_id, total)

        reverse_offset = max(0, total - offset - limit)
        actual_limit = min(limit, total - offset)
        if actual_limit <= 0:
            return {"items": [], "total": total}

        result = await spotify_request(
            hass, "GET", f"/playlists/{playlist_id}/tracks",
            params={"limit": actual_limit, "offset": reverse_offset},
            entity_id=entity_id,
        )
        if result and "items" in result:
            result["items"] = list(reversed(result["items"]))
            result["total"] = total
        return result or {"items": [], "total": total}

    result = await spotify_request(
        hass, "GET", f"/playlists/{playlist_id}/tracks",
        params={"limit": min(limit, 50), "offset": offset},
        entity_id=entity_id,
    )
    return result or {"items": [], "total": 0}


async def spotify_get_recently_played(
    hass: HomeAssistant, limit: int = 20, entity_id: str = ""
) -> dict[str, Any]:
    """Get recently played tracks (most recent first by default)."""
    result = await spotify_request(
        hass, "GET", "/me/player/recently-played",
        params={"limit": min(limit, 50)},
        entity_id=entity_id,
    )
    return result or {"items": []}


async def spotify_get_saved_tracks(
    hass: HomeAssistant, limit: int = 20, offset: int = 0, entity_id: str = ""
) -> dict[str, Any]:
    """Get user's liked songs (most recent first by default)."""
    result = await spotify_request(
        hass, "GET", "/me/tracks",
        params={"limit": min(limit, 50), "offset": offset},
        entity_id=entity_id,
    )
    return result or {"items": [], "total": 0}


async def spotify_get_saved_albums(
    hass: HomeAssistant, limit: int = 20, offset: int = 0, entity_id: str = ""
) -> dict[str, Any]:
    """Get user's saved albums (most recent first by default)."""
    result = await spotify_request(
        hass, "GET", "/me/albums",
        params={"limit": min(limit, 50), "offset": offset},
        entity_id=entity_id,
    )
    return result or {"items": [], "total": 0}


async def spotify_get_saved_shows(
    hass: HomeAssistant, limit: int = 20, offset: int = 0, entity_id: str = ""
) -> dict[str, Any]:
    """Get user's saved/followed podcasts (shows)."""
    result = await spotify_request(
        hass, "GET", "/me/shows",
        params={"limit": min(limit, 50), "offset": offset},
        entity_id=entity_id,
    )
    return result or {"items": [], "total": 0}


async def spotify_get_album(
    hass: HomeAssistant, album_id: str, entity_id: str = ""
) -> dict[str, Any]:
    """Get an album's details and tracks."""
    result = await spotify_request(hass, "GET", f"/albums/{album_id}", entity_id=entity_id)
    return result or {}


async def spotify_get_artist_top_tracks(
    hass: HomeAssistant, artist_id: str, market: str | None = None, entity_id: str = ""
) -> dict[str, Any]:
    """Get an artist's top tracks."""
    resolved_market = market or hass.config.country or "US"
    result = await spotify_request(
        hass, "GET", f"/artists/{artist_id}/top-tracks",
        params={"market": resolved_market},
        entity_id=entity_id,
    )
    return result or {"tracks": []}


# ── Favorites ─────────────────────────────────────────────────────────

async def spotify_check_saved_tracks(
    hass: HomeAssistant, track_ids: list[str], entity_id: str = ""
) -> dict[str, bool]:
    """Check if tracks are in user's saved library. Batches by 50."""
    if not track_ids:
        return {}
    result: dict[str, bool] = {}
    for i in range(0, len(track_ids), 50):
        batch = track_ids[i : i + 50]
        ids_param = ",".join(batch)
        data = await spotify_request(
            hass, "GET", "/me/tracks/contains",
            params={"ids": ids_param}, entity_id=entity_id,
        )
        for track_id, saved in zip(batch, data):
            result[track_id] = saved
    return result


async def spotify_save_tracks(
    hass: HomeAssistant, track_ids: list[str], entity_id: str = ""
) -> None:
    """Save tracks to user's library."""
    await spotify_request(hass, "PUT", "/me/tracks", json_body={"ids": track_ids}, entity_id=entity_id)


async def spotify_remove_tracks(
    hass: HomeAssistant, track_ids: list[str], entity_id: str = ""
) -> None:
    """Remove tracks from user's library."""
    await spotify_request(hass, "DELETE", "/me/tracks", json_body={"ids": track_ids}, entity_id=entity_id)


async def spotify_get_recommendations(
    hass: HomeAssistant,
    seed_tracks: list[str] | None = None,
    seed_artists: list[str] | None = None,
    seed_genres: list[str] | None = None,
    limit: int = 20,
    entity_id: str = "",
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

    result = await spotify_request(hass, "GET", "/recommendations", params=params, entity_id=entity_id)
    return result or {"tracks": []}
