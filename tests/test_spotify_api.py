"""Tests for Spotify Web API client."""

from __future__ import annotations

import sys
from unittest.mock import AsyncMock, MagicMock, patch

import pytest

# Ensure homeassistant.helpers.aiohttp_client is a real mock module
# so patch() can target it (it's imported locally inside spotify_request)
_aiohttp_mod = MagicMock()
sys.modules.setdefault("homeassistant.helpers.aiohttp_client", _aiohttp_mod)

from custom_components.glass_cards.spotify_api import (
    SpotifyAPIError,
    SpotifyNotConfiguredError,
    spotify_add_to_queue,
    spotify_get_album,
    spotify_get_artist_top_tracks,
    spotify_get_playlists,
    spotify_get_playlist_tracks,
    spotify_get_queue,
    spotify_get_recently_played,
    spotify_get_recommendations,
    spotify_get_saved_albums,
    spotify_get_saved_tracks,
    spotify_request,
    spotify_search,
)


@pytest.fixture
def mock_hass():
    """Create a mock HomeAssistant with Spotify config entry."""
    hass = MagicMock()
    hass.data = {}

    entry = MagicMock()
    entry.data = {"token": {"access_token": "test-token-123"}}
    hass.config_entries.async_entries = MagicMock(return_value=[entry])

    return hass


@pytest.fixture
def mock_hass_no_spotify():
    """Create a mock HomeAssistant without Spotify integration."""
    hass = MagicMock()
    hass.data = {}
    hass.config_entries.async_entries = MagicMock(return_value=[])
    return hass


def _make_mock_response(status: int = 200, json_data: dict | None = None, headers: dict | None = None, text: str = ""):
    """Create a mock aiohttp response usable as async context manager."""
    resp = MagicMock()
    resp.status = status
    resp.json = AsyncMock(return_value=json_data or {})
    resp.text = AsyncMock(return_value=text)
    resp.headers = headers or {}
    # Make it work with `async with session.request(...) as resp:`
    ctx = AsyncMock()
    ctx.__aenter__ = AsyncMock(return_value=resp)
    ctx.__aexit__ = AsyncMock(return_value=False)
    return ctx


class TestSpotifyNotConfigured:
    """Tests when Spotify integration is not set up."""

    @pytest.mark.asyncio
    async def test_no_spotify_integration(self, mock_hass_no_spotify):
        """Should raise SpotifyNotConfiguredError."""
        with pytest.raises(SpotifyNotConfiguredError):
            await spotify_search(mock_hass_no_spotify, "test", ["track"])


class TestSpotifyRequest:
    """Tests for the low-level spotify_request function."""

    def setup_method(self):
        import custom_components.glass_cards.spotify_api as api
        api._rate_limit_until = 0.0
        api._request_timestamps.clear()

    @pytest.mark.asyncio
    async def test_rate_limit_429(self, mock_hass):
        """429 should raise SpotifyAPIError with retry_after."""
        mock_resp = _make_mock_response(429, headers={"Retry-After": "10"})
        mock_session = MagicMock()
        mock_session.request = MagicMock(return_value=mock_resp)

        with (
            patch("custom_components.glass_cards.spotify_api._get_spotify_token", return_value="token"),
            patch("homeassistant.helpers.aiohttp_client.async_get_clientsession", return_value=mock_session),
        ):
            with pytest.raises(SpotifyAPIError) as exc_info:
                await spotify_request(mock_hass, "GET", "/test")
            assert exc_info.value.status == 429
            assert exc_info.value.retry_after == 10

    @pytest.mark.asyncio
    async def test_401_unauthorized(self, mock_hass):
        """401 should raise SpotifyAPIError."""
        mock_resp = _make_mock_response(401)
        mock_session = MagicMock()
        mock_session.request = MagicMock(return_value=mock_resp)

        with (
            patch("custom_components.glass_cards.spotify_api._get_spotify_token", return_value="token"),
            patch("homeassistant.helpers.aiohttp_client.async_get_clientsession", return_value=mock_session),
        ):
            with pytest.raises(SpotifyAPIError) as exc_info:
                await spotify_request(mock_hass, "GET", "/test")
            assert exc_info.value.status == 401

    @pytest.mark.asyncio
    async def test_403_premium_required(self, mock_hass):
        """403 should raise SpotifyAPIError."""
        mock_resp = _make_mock_response(403)
        mock_session = MagicMock()
        mock_session.request = MagicMock(return_value=mock_resp)

        with (
            patch("custom_components.glass_cards.spotify_api._get_spotify_token", return_value="token"),
            patch("homeassistant.helpers.aiohttp_client.async_get_clientsession", return_value=mock_session),
        ):
            with pytest.raises(SpotifyAPIError) as exc_info:
                await spotify_request(mock_hass, "GET", "/test")
            assert exc_info.value.status == 403

    @pytest.mark.asyncio
    async def test_204_returns_none(self, mock_hass):
        """204 No Content should return None."""
        mock_resp = _make_mock_response(204)
        mock_session = MagicMock()
        mock_session.request = MagicMock(return_value=mock_resp)

        with (
            patch("custom_components.glass_cards.spotify_api._get_spotify_token", return_value="token"),
            patch("homeassistant.helpers.aiohttp_client.async_get_clientsession", return_value=mock_session),
        ):
            result = await spotify_request(mock_hass, "GET", "/test")
            assert result is None

    @pytest.mark.asyncio
    async def test_200_returns_json(self, mock_hass):
        """200 should return parsed JSON."""
        data = {"tracks": {"items": [{"name": "Test"}]}}
        mock_resp = _make_mock_response(200, json_data=data)
        mock_session = MagicMock()
        mock_session.request = MagicMock(return_value=mock_resp)

        with (
            patch("custom_components.glass_cards.spotify_api._get_spotify_token", return_value="token"),
            patch("homeassistant.helpers.aiohttp_client.async_get_clientsession", return_value=mock_session),
        ):
            result = await spotify_request(mock_hass, "GET", "/search", params={"q": "test"})
            assert result == data


class TestSpotifySearch:
    """Tests for spotify_search."""

    @pytest.mark.asyncio
    async def test_search_with_valid_types(self, mock_hass):
        """Should call API with correct params."""
        expected = {"tracks": {"items": [], "total": 0}}

        with patch(
            "custom_components.glass_cards.spotify_api.spotify_request",
            new_callable=AsyncMock,
            return_value=expected,
        ) as mock_req:
            result = await spotify_search(mock_hass, "test query", ["track", "album"], limit=5)
            assert result == expected
            mock_req.assert_called_once()
            call_params = mock_req.call_args[1].get("params") or mock_req.call_args[0][3]
            assert call_params["q"] == "test query"
            assert "track" in call_params["type"]
            assert "album" in call_params["type"]

    @pytest.mark.asyncio
    async def test_search_filters_invalid_types(self, mock_hass):
        """Invalid search types should be filtered out."""
        with patch(
            "custom_components.glass_cards.spotify_api.spotify_request",
            new_callable=AsyncMock,
            return_value={},
        ):
            result = await spotify_search(mock_hass, "test", ["invalid_type"])
            # No valid types → returns empty dict without calling API
            assert result == {}

    @pytest.mark.asyncio
    async def test_search_clamps_limit(self, mock_hass):
        """Limit should be clamped to 1-50."""
        with patch(
            "custom_components.glass_cards.spotify_api.spotify_request",
            new_callable=AsyncMock,
            return_value={},
        ) as mock_req:
            await spotify_search(mock_hass, "test", ["track"], limit=100)
            call_params = mock_req.call_args[1].get("params") or mock_req.call_args[0][3]
            assert call_params["limit"] == 50


class TestSpotifyQueue:
    """Tests for queue operations."""

    @pytest.mark.asyncio
    async def test_get_queue(self, mock_hass):
        """Should return queue data."""
        expected = {"currently_playing": {"name": "Test"}, "queue": []}
        with patch(
            "custom_components.glass_cards.spotify_api.spotify_request",
            new_callable=AsyncMock,
            return_value=expected,
        ):
            result = await spotify_get_queue(mock_hass)
            assert result == expected

    @pytest.mark.asyncio
    async def test_get_queue_empty(self, mock_hass):
        """Should return default when API returns None (204)."""
        with patch(
            "custom_components.glass_cards.spotify_api.spotify_request",
            new_callable=AsyncMock,
            return_value=None,
        ):
            result = await spotify_get_queue(mock_hass)
            assert result == {"currently_playing": None, "queue": []}

    @pytest.mark.asyncio
    async def test_add_to_queue(self, mock_hass):
        """Should call API with correct URI."""
        with patch(
            "custom_components.glass_cards.spotify_api.spotify_request",
            new_callable=AsyncMock,
            return_value=None,
        ) as mock_req:
            await spotify_add_to_queue(mock_hass, "spotify:track:abc123")
            mock_req.assert_called_once()
            call_params = mock_req.call_args[1].get("params") or mock_req.call_args[0][3]
            assert call_params["uri"] == "spotify:track:abc123"

    @pytest.mark.asyncio
    async def test_add_to_queue_with_device(self, mock_hass):
        """Should include device_id when provided."""
        with patch(
            "custom_components.glass_cards.spotify_api.spotify_request",
            new_callable=AsyncMock,
            return_value=None,
        ) as mock_req:
            await spotify_add_to_queue(mock_hass, "spotify:track:abc", device_id="dev123")
            call_params = mock_req.call_args[1].get("params") or mock_req.call_args[0][3]
            assert call_params["device_id"] == "dev123"


class TestSpotifyBrowse:
    """Tests for browse/library functions."""

    @pytest.mark.asyncio
    async def test_get_playlists(self, mock_hass):
        """Should return playlists."""
        expected = {"items": [{"name": "Chill"}], "total": 1}
        with patch(
            "custom_components.glass_cards.spotify_api.spotify_request",
            new_callable=AsyncMock,
            return_value=expected,
        ):
            result = await spotify_get_playlists(mock_hass)
            assert result == expected

    @pytest.mark.asyncio
    async def test_get_recently_played(self, mock_hass):
        """Should return recently played."""
        expected = {"items": [{"track": {"name": "Test"}}]}
        with patch(
            "custom_components.glass_cards.spotify_api.spotify_request",
            new_callable=AsyncMock,
            return_value=expected,
        ):
            result = await spotify_get_recently_played(mock_hass)
            assert result == expected

    @pytest.mark.asyncio
    async def test_get_saved_tracks(self, mock_hass):
        """Should return saved tracks."""
        expected = {"items": [{"track": {"name": "Liked"}}], "total": 1}
        with patch(
            "custom_components.glass_cards.spotify_api.spotify_request",
            new_callable=AsyncMock,
            return_value=expected,
        ):
            result = await spotify_get_saved_tracks(mock_hass)
            assert result == expected

    @pytest.mark.asyncio
    async def test_get_saved_albums(self, mock_hass):
        """Should return saved albums."""
        expected = {"items": [{"album": {"name": "Album"}}], "total": 1}
        with patch(
            "custom_components.glass_cards.spotify_api.spotify_request",
            new_callable=AsyncMock,
            return_value=expected,
        ):
            result = await spotify_get_saved_albums(mock_hass)
            assert result == expected

    @pytest.mark.asyncio
    async def test_get_album(self, mock_hass):
        """Should return album details."""
        expected = {"name": "Test Album", "tracks": {"items": []}}
        with patch(
            "custom_components.glass_cards.spotify_api.spotify_request",
            new_callable=AsyncMock,
            return_value=expected,
        ):
            result = await spotify_get_album(mock_hass, "abc123")
            assert result == expected

    @pytest.mark.asyncio
    async def test_get_artist_top_tracks(self, mock_hass):
        """Should return artist top tracks."""
        expected = {"tracks": [{"name": "Hit"}]}
        with patch(
            "custom_components.glass_cards.spotify_api.spotify_request",
            new_callable=AsyncMock,
            return_value=expected,
        ):
            result = await spotify_get_artist_top_tracks(mock_hass, "artist123")
            assert result == expected


class TestSpotifyPlaylistSort:
    """Tests for playlist track sorting (recent_first)."""

    @pytest.mark.asyncio
    async def test_playlist_tracks_oldest_first(self, mock_hass):
        """Default oldest_first should return items as-is."""
        items = [{"track": {"name": f"Track {i}"}} for i in range(5)]
        with patch(
            "custom_components.glass_cards.spotify_api.spotify_request",
            new_callable=AsyncMock,
            return_value={"items": items, "total": 5},
        ):
            result = await spotify_get_playlist_tracks(
                mock_hass, "pl123", limit=5, sort_order="oldest_first"
            )
            assert [t["track"]["name"] for t in result["items"]] == [
                "Track 0", "Track 1", "Track 2", "Track 3", "Track 4"
            ]

    @pytest.mark.asyncio
    async def test_playlist_tracks_recent_first(self, mock_hass):
        """recent_first should reverse the items."""
        meta_response = {"tracks": {"total": 10}}
        track_items = [{"track": {"name": f"Track {i}"}} for i in range(5)]
        track_response = {"items": track_items, "total": 10}

        call_count = 0

        async def mock_request(hass, method, endpoint, **kwargs):
            nonlocal call_count
            call_count += 1
            if call_count == 1:
                return meta_response  # First call: get total
            return track_response  # Second call: get tracks

        with patch(
            "custom_components.glass_cards.spotify_api.spotify_request",
            side_effect=mock_request,
        ):
            result = await spotify_get_playlist_tracks(
                mock_hass, "pl123", limit=5, sort_order="recent_first"
            )
            # Items should be reversed
            assert [t["track"]["name"] for t in result["items"]] == [
                "Track 4", "Track 3", "Track 2", "Track 1", "Track 0"
            ]
            assert result["total"] == 10

    @pytest.mark.asyncio
    async def test_playlist_tracks_recent_first_empty(self, mock_hass):
        """recent_first on empty playlist should return empty."""
        with patch(
            "custom_components.glass_cards.spotify_api.spotify_request",
            new_callable=AsyncMock,
            return_value={"tracks": {"total": 0}},
        ):
            result = await spotify_get_playlist_tracks(
                mock_hass, "pl123", limit=20, sort_order="recent_first"
            )
            assert result["items"] == []
            assert result["total"] == 0


class TestEntityIdResolution:
    """Tests for entity_id-based token resolution in _get_spotify_token."""

    def setup_method(self):
        import custom_components.glass_cards.spotify_api as api
        api._rate_limit_until = 0.0
        api._request_timestamps.clear()

    @pytest.mark.asyncio
    async def test_entity_id_resolves_config_entry(self, mock_hass):
        """When entity_id provided, resolve config entry via entity registry."""
        mock_entry = MagicMock()
        mock_reg_entry = MagicMock()
        mock_reg_entry.config_entry_id = "config-entry-id-abc"

        mock_hass.config_entries.async_get_entry = MagicMock(return_value=mock_entry)

        mock_er = MagicMock()
        mock_er.async_get = MagicMock(return_value=mock_reg_entry)

        mock_session_obj = MagicMock()
        mock_session_obj.async_ensure_token_valid = AsyncMock()
        mock_session_obj.token = {"access_token": "entity-token-456"}

        with (
            patch(
                "custom_components.glass_cards.spotify_api._get_spotify_token",
                new_callable=AsyncMock,
                return_value="entity-token-456",
            ) as mock_token_fn,
        ):
            from custom_components.glass_cards.spotify_api import spotify_request
            mock_resp = _make_mock_response(200, json_data={"ok": True})
            mock_session = MagicMock()
            mock_session.request = MagicMock(return_value=mock_resp)
            with patch(
                "homeassistant.helpers.aiohttp_client.async_get_clientsession",
                return_value=mock_session,
            ):
                result = await spotify_request(
                    mock_hass, "GET", "/test", entity_id="media_player.spotify_john"
                )
            # entity_id should be passed to _get_spotify_token
            mock_token_fn.assert_called_once_with(mock_hass, entity_id="media_player.spotify_john")
            assert result == {"ok": True}

    @pytest.mark.asyncio
    async def test_entity_id_propagates_through_public_functions(self, mock_hass):
        """entity_id param should propagate from public functions to spotify_request."""
        from custom_components.glass_cards.spotify_api import spotify_get_playlists

        with patch(
            "custom_components.glass_cards.spotify_api.spotify_request",
            new_callable=AsyncMock,
            return_value={"items": [], "total": 0},
        ) as mock_req:
            await spotify_get_playlists(mock_hass, entity_id="media_player.spotify_alice")
            call_kwargs = mock_req.call_args[1]
            assert call_kwargs.get("entity_id") == "media_player.spotify_alice"

    @pytest.mark.asyncio
    async def test_no_entity_id_defaults_to_empty_string(self, mock_hass):
        """Without entity_id, spotify_request is called with entity_id=''."""
        from custom_components.glass_cards.spotify_api import spotify_get_queue

        with patch(
            "custom_components.glass_cards.spotify_api.spotify_request",
            new_callable=AsyncMock,
            return_value=None,
        ) as mock_req:
            await spotify_get_queue(mock_hass)
            call_kwargs = mock_req.call_args[1]
            assert call_kwargs.get("entity_id", "") == ""


class TestRateLimiter:
    """Tests for proactive rate limiting in spotify_request."""

    def setup_method(self):
        import custom_components.glass_cards.spotify_api as api
        api._rate_limit_until = 0.0
        api._request_timestamps.clear()

    @pytest.mark.asyncio
    async def test_proactive_rate_limit(self, mock_hass):
        """Should raise SpotifyAPIError when sliding window is exceeded."""
        import custom_components.glass_cards.spotify_api as api
        import time
        now = time.time()
        api._request_timestamps.extend([now - i * 0.5 for i in range(26)])
        with pytest.raises(SpotifyAPIError, match="Rate limit"):
            await spotify_request(mock_hass, "GET", "/me/playlists")

    @pytest.mark.asyncio
    async def test_global_backoff_blocks(self, mock_hass):
        """Should raise SpotifyAPIError when global backoff is active."""
        import custom_components.glass_cards.spotify_api as api
        import time
        api._rate_limit_until = time.time() + 60
        with pytest.raises(SpotifyAPIError, match="Rate limited"):
            await spotify_request(mock_hass, "GET", "/me/playlists")

    @pytest.mark.asyncio
    async def test_429_sets_global_backoff(self, mock_hass):
        """A 429 response should set _rate_limit_until."""
        import custom_components.glass_cards.spotify_api as api
        import time
        mock_resp = _make_mock_response(429, headers={"Retry-After": "30"})
        mock_session = MagicMock()
        mock_session.request = MagicMock(return_value=mock_resp)
        before = time.time()
        with (
            patch("custom_components.glass_cards.spotify_api._get_spotify_token", return_value="token"),
            patch("homeassistant.helpers.aiohttp_client.async_get_clientsession", return_value=mock_session),
        ):
            with pytest.raises(SpotifyAPIError):
                await spotify_request(mock_hass, "GET", "/test")
        assert api._rate_limit_until >= before + 30


class TestSpotifyRecommendations:
    """Tests for recommendations."""

    @pytest.mark.asyncio
    async def test_recommendations_with_seeds(self, mock_hass):
        """Should call API with seed params."""
        expected = {"tracks": [{"name": "Rec1"}]}
        with patch(
            "custom_components.glass_cards.spotify_api.spotify_request",
            new_callable=AsyncMock,
            return_value=expected,
        ) as mock_req:
            result = await spotify_get_recommendations(
                mock_hass, seed_tracks=["track1", "track2"]
            )
            assert result == expected
            call_params = mock_req.call_args[1].get("params") or mock_req.call_args[0][3]
            assert call_params["seed_tracks"] == "track1,track2"

    @pytest.mark.asyncio
    async def test_recommendations_no_seeds(self, mock_hass):
        """No seeds should return empty without calling API."""
        result = await spotify_get_recommendations(mock_hass)
        assert result == {"tracks": []}

    @pytest.mark.asyncio
    async def test_recommendations_limits_seeds_to_5(self, mock_hass):
        """Seeds should be capped at 5."""
        with patch(
            "custom_components.glass_cards.spotify_api.spotify_request",
            new_callable=AsyncMock,
            return_value={"tracks": []},
        ) as mock_req:
            await spotify_get_recommendations(
                mock_hass, seed_tracks=[f"t{i}" for i in range(10)]
            )
            call_params = mock_req.call_args[1].get("params") or mock_req.call_args[0][3]
            assert len(call_params["seed_tracks"].split(",")) == 5
