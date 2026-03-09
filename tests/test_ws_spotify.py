"""Tests for Spotify WebSocket commands."""

from __future__ import annotations

from unittest.mock import AsyncMock, MagicMock, patch

import pytest

from custom_components.glass_cards.spotify_api import (
    SpotifyAPIError,
    SpotifyNotConfiguredError,
)
from custom_components.glass_cards.websocket_api import (
    ws_set_spotify_config,
    ws_spotify_add_to_queue,
    ws_spotify_browse,
    ws_spotify_get_queue,
    ws_spotify_search,
    ws_spotify_status,
)


class TestSetSpotifyConfig:
    """Tests for ws_set_spotify_config."""

    @pytest.mark.asyncio
    async def test_set_show_header(self, hass_with_store, mock_connection, mock_store):
        """Should update show_header."""
        await ws_set_spotify_config(
            hass_with_store, mock_connection,
            {"id": 1, "type": "glass_cards/set_spotify_config", "show_header": False},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["show_header"] is False
        mock_store._store.async_save.assert_called()

    @pytest.mark.asyncio
    async def test_set_entity_id(self, hass_with_store, mock_connection, mock_store):
        """Should update entity_id."""
        await ws_set_spotify_config(
            hass_with_store, mock_connection,
            {"id": 2, "type": "glass_cards/set_spotify_config", "entity_id": "media_player.spotify_john"},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["entity_id"] == "media_player.spotify_john"

    @pytest.mark.asyncio
    async def test_set_sort_order(self, hass_with_store, mock_connection, mock_store):
        """Should update sort_order."""
        await ws_set_spotify_config(
            hass_with_store, mock_connection,
            {"id": 3, "type": "glass_cards/set_spotify_config", "sort_order": "oldest_first"},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["sort_order"] == "oldest_first"

    @pytest.mark.asyncio
    async def test_set_empty_entity_id(self, hass_with_store, mock_connection, mock_store):
        """Empty string entity_id should clear the entity."""
        mock_store._data.spotify_card.entity_id = "media_player.spotify_old"
        await ws_set_spotify_config(
            hass_with_store, mock_connection,
            {"id": 4, "type": "glass_cards/set_spotify_config", "entity_id": ""},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["entity_id"] == ""

    @pytest.mark.asyncio
    async def test_unauthorized(self, hass_with_store, mock_connection, mock_regular_user):
        """Non-edit user should raise Unauthorized."""
        mock_connection.user = mock_regular_user
        from homeassistant.exceptions import Unauthorized

        with pytest.raises(Unauthorized):
            await ws_set_spotify_config(
                hass_with_store, mock_connection,
                {"id": 5, "type": "glass_cards/set_spotify_config", "show_header": True},
            )


class TestSpotifySearch:
    """Tests for ws_spotify_search."""

    @pytest.mark.asyncio
    async def test_search_success(self, hass_with_store, mock_connection):
        """Should return search results."""
        expected = {"tracks": {"items": [{"name": "Test"}], "total": 1}}
        with patch(
            "custom_components.glass_cards.websocket_api.spotify_search",
            new_callable=AsyncMock,
            return_value=expected,
        ):
            await ws_spotify_search(
                hass_with_store, mock_connection,
                {
                    "id": 10, "type": "glass_cards/spotify_search",
                    "query": "test", "types": ["track"], "limit": 10, "offset": 0,
                },
            )
        result = mock_connection.send_result.call_args[0][1]
        assert result == expected

    @pytest.mark.asyncio
    async def test_search_not_configured(self, hass_with_store, mock_connection):
        """Should send error when Spotify not configured."""
        with patch(
            "custom_components.glass_cards.websocket_api.spotify_search",
            side_effect=SpotifyNotConfiguredError("Not configured"),
        ):
            await ws_spotify_search(
                hass_with_store, mock_connection,
                {
                    "id": 11, "type": "glass_cards/spotify_search",
                    "query": "test", "types": ["track"], "limit": 10, "offset": 0,
                },
            )
        mock_connection.send_error.assert_called_once()
        assert mock_connection.send_error.call_args[0][1] == "spotify_not_configured"

    @pytest.mark.asyncio
    async def test_search_rate_limited(self, hass_with_store, mock_connection):
        """Should send error with retry info on 429."""
        with patch(
            "custom_components.glass_cards.websocket_api.spotify_search",
            side_effect=SpotifyAPIError(429, "Rate limited", retry_after=30),
        ):
            await ws_spotify_search(
                hass_with_store, mock_connection,
                {
                    "id": 12, "type": "glass_cards/spotify_search",
                    "query": "test", "types": ["track"], "limit": 10, "offset": 0,
                },
            )
        mock_connection.send_error.assert_called_once()

    @pytest.mark.asyncio
    async def test_search_unauthorized_user(self, hass_with_store, mock_connection):
        """Non-readable user should raise Unauthorized."""
        mock_connection.user = None
        from homeassistant.exceptions import Unauthorized

        with pytest.raises(Unauthorized):
            await ws_spotify_search(
                hass_with_store, mock_connection,
                {
                    "id": 13, "type": "glass_cards/spotify_search",
                    "query": "test", "types": ["track"], "limit": 10, "offset": 0,
                },
            )


class TestSpotifyBrowse:
    """Tests for ws_spotify_browse."""

    @pytest.mark.asyncio
    async def test_browse_playlists(self, hass_with_store, mock_connection):
        """Should return playlists."""
        expected = {"items": [{"name": "Chill"}], "total": 1}
        with patch(
            "custom_components.glass_cards.websocket_api.spotify_get_playlists",
            new_callable=AsyncMock,
            return_value=expected,
        ):
            await ws_spotify_browse(
                hass_with_store, mock_connection,
                {
                    "id": 20, "type": "glass_cards/spotify_browse",
                    "category": "playlists", "limit": 20, "offset": 0,
                    "sort_order": "recent_first",
                },
            )
        result = mock_connection.send_result.call_args[0][1]
        assert result == expected

    @pytest.mark.asyncio
    async def test_browse_playlist_tracks_needs_content_id(self, hass_with_store, mock_connection):
        """playlist_tracks without content_id should send error."""
        await ws_spotify_browse(
            hass_with_store, mock_connection,
            {
                "id": 21, "type": "glass_cards/spotify_browse",
                "category": "playlist_tracks", "limit": 20, "offset": 0,
                "sort_order": "recent_first",
            },
        )
        mock_connection.send_error.assert_called_once()
        assert "content_id" in mock_connection.send_error.call_args[0][2]

    @pytest.mark.asyncio
    async def test_browse_album_tracks_needs_content_id(self, hass_with_store, mock_connection):
        """album_tracks without content_id should send error."""
        await ws_spotify_browse(
            hass_with_store, mock_connection,
            {
                "id": 22, "type": "glass_cards/spotify_browse",
                "category": "album_tracks", "limit": 20, "offset": 0,
                "sort_order": "recent_first",
            },
        )
        mock_connection.send_error.assert_called_once()

    @pytest.mark.asyncio
    async def test_browse_recently_played(self, hass_with_store, mock_connection):
        """Should return recently played."""
        expected = {"items": [{"track": {"name": "Recent"}}]}
        with patch(
            "custom_components.glass_cards.websocket_api.spotify_get_recently_played",
            new_callable=AsyncMock,
            return_value=expected,
        ):
            await ws_spotify_browse(
                hass_with_store, mock_connection,
                {
                    "id": 23, "type": "glass_cards/spotify_browse",
                    "category": "recently_played", "limit": 20, "offset": 0,
                    "sort_order": "recent_first",
                },
            )
        result = mock_connection.send_result.call_args[0][1]
        assert result == expected

    @pytest.mark.asyncio
    async def test_browse_saved_tracks(self, hass_with_store, mock_connection):
        """Should return saved tracks."""
        expected = {"items": [], "total": 0}
        with patch(
            "custom_components.glass_cards.websocket_api.spotify_get_saved_tracks",
            new_callable=AsyncMock,
            return_value=expected,
        ):
            await ws_spotify_browse(
                hass_with_store, mock_connection,
                {
                    "id": 24, "type": "glass_cards/spotify_browse",
                    "category": "saved_tracks", "limit": 20, "offset": 0,
                    "sort_order": "recent_first",
                },
            )
        mock_connection.send_result.assert_called_once()

    @pytest.mark.asyncio
    async def test_browse_recommendations(self, hass_with_store, mock_connection):
        """Should return recommendations with seed tracks."""
        expected = {"tracks": [{"name": "Rec1"}]}
        with patch(
            "custom_components.glass_cards.websocket_api.spotify_get_recommendations",
            new_callable=AsyncMock,
            return_value=expected,
        ):
            await ws_spotify_browse(
                hass_with_store, mock_connection,
                {
                    "id": 25, "type": "glass_cards/spotify_browse",
                    "category": "recommendations", "limit": 20, "offset": 0,
                    "sort_order": "recent_first",
                    "seed_tracks": ["track1"],
                },
            )
        result = mock_connection.send_result.call_args[0][1]
        assert result == expected

    @pytest.mark.asyncio
    async def test_browse_spotify_error(self, hass_with_store, mock_connection):
        """Spotify API error should send WS error."""
        with patch(
            "custom_components.glass_cards.websocket_api.spotify_get_playlists",
            side_effect=SpotifyAPIError(500, "Server error"),
        ):
            await ws_spotify_browse(
                hass_with_store, mock_connection,
                {
                    "id": 26, "type": "glass_cards/spotify_browse",
                    "category": "playlists", "limit": 20, "offset": 0,
                    "sort_order": "recent_first",
                },
            )
        mock_connection.send_error.assert_called_once()


class TestSpotifyQueue:
    """Tests for ws_spotify_get_queue and ws_spotify_add_to_queue."""

    @pytest.mark.asyncio
    async def test_get_queue(self, hass_with_store, mock_connection):
        """Should return queue."""
        expected = {"currently_playing": None, "queue": []}
        with patch(
            "custom_components.glass_cards.websocket_api.spotify_get_queue",
            new_callable=AsyncMock,
            return_value=expected,
        ):
            await ws_spotify_get_queue(
                hass_with_store, mock_connection,
                {"id": 30, "type": "glass_cards/spotify_queue"},
            )
        result = mock_connection.send_result.call_args[0][1]
        assert result == expected

    @pytest.mark.asyncio
    async def test_add_to_queue(self, hass_with_store, mock_connection):
        """Should add track to queue."""
        with patch(
            "custom_components.glass_cards.websocket_api.spotify_add_to_queue",
            new_callable=AsyncMock,
        ):
            await ws_spotify_add_to_queue(
                hass_with_store, mock_connection,
                {
                    "id": 31, "type": "glass_cards/spotify_add_to_queue",
                    "uri": "spotify:track:abc123",
                },
            )
        result = mock_connection.send_result.call_args[0][1]
        assert result["success"] is True

    @pytest.mark.asyncio
    async def test_add_to_queue_error(self, hass_with_store, mock_connection):
        """Should send error on API failure."""
        with patch(
            "custom_components.glass_cards.websocket_api.spotify_add_to_queue",
            side_effect=SpotifyAPIError(403, "Premium required"),
        ):
            await ws_spotify_add_to_queue(
                hass_with_store, mock_connection,
                {
                    "id": 32, "type": "glass_cards/spotify_add_to_queue",
                    "uri": "spotify:track:abc123",
                },
            )
        mock_connection.send_error.assert_called_once()


class TestSpotifyStatus:
    """Tests for ws_spotify_status."""

    @pytest.mark.asyncio
    async def test_configured(self, hass_with_store, mock_connection):
        """Should return configured=True when Spotify is set up."""
        entry = MagicMock()
        entry.data = {"token": {"access_token": "test-token"}}
        hass_with_store.config_entries.async_entries = MagicMock(return_value=[entry])
        await ws_spotify_status(
            hass_with_store, mock_connection,
            {"id": 40, "type": "glass_cards/spotify_status"},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["configured"] is True

    @pytest.mark.asyncio
    async def test_no_integration(self, hass_with_store, mock_connection):
        """Should return configured=False when no Spotify integration."""
        hass_with_store.config_entries.async_entries = MagicMock(return_value=[])
        await ws_spotify_status(
            hass_with_store, mock_connection,
            {"id": 41, "type": "glass_cards/spotify_status"},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["configured"] is False
        assert result["reason"] == "no_integration"

    @pytest.mark.asyncio
    async def test_no_token(self, hass_with_store, mock_connection):
        """Should return configured=False when token is missing."""
        entry = MagicMock()
        entry.data = {}
        hass_with_store.config_entries.async_entries = MagicMock(return_value=[entry])
        await ws_spotify_status(
            hass_with_store, mock_connection,
            {"id": 42, "type": "glass_cards/spotify_status"},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["configured"] is False
        assert result["reason"] == "no_token"
