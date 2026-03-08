"""Tests for Glass Cards WebSocket API."""

from unittest.mock import MagicMock

import pytest

from custom_components.glass_cards.models import RoomConfig
from custom_components.glass_cards.websocket_api import (
    ws_delete_room,
    ws_get_config,
    ws_get_room,
    ws_set_navbar,
    ws_set_room,
)


class TestGetConfig:
    """Tests for ws_get_config."""

    @pytest.mark.asyncio
    async def test_returns_full_config(self, hass_with_store, mock_connection):
        """Should return serialized GlassCardsData."""
        await ws_get_config(hass_with_store, mock_connection, {"id": 1, "type": "glass_cards/get_config"})
        mock_connection.send_result.assert_called_once()
        result = mock_connection.send_result.call_args[0][1]
        assert "navbar" in result
        assert "rooms" in result
        assert "dashboard" in result
        assert result["dashboard"]["enabled_cards"] == ["weather"]

    @pytest.mark.asyncio
    async def test_unauthorized_user(self, hass_with_store, mock_connection, mock_regular_user):
        """Non-readable user should raise Unauthorized."""
        mock_connection.user = None
        from homeassistant.exceptions import Unauthorized

        with pytest.raises(Unauthorized):
            await ws_get_config(hass_with_store, mock_connection, {"id": 1, "type": "glass_cards/get_config"})


class TestGetRoom:
    """Tests for ws_get_room."""

    @pytest.mark.asyncio
    async def test_existing_room(self, hass_with_store, mock_connection, mock_store):
        """Should return room config."""
        mock_store._data.rooms["kitchen"] = RoomConfig(area_id="kitchen", icon="mdi:silverware")
        await ws_get_room(
            hass_with_store, mock_connection,
            {"id": 2, "type": "glass_cards/get_room", "area_id": "kitchen"},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["area_id"] == "kitchen"
        assert result["icon"] == "mdi:silverware"

    @pytest.mark.asyncio
    async def test_nonexistent_room(self, hass_with_store, mock_connection):
        """Should return None for unknown room."""
        await ws_get_room(
            hass_with_store, mock_connection,
            {"id": 3, "type": "glass_cards/get_room", "area_id": "unknown"},
        )
        mock_connection.send_result.assert_called_once_with(3, None)


class TestSetRoom:
    """Tests for ws_set_room."""

    @pytest.mark.asyncio
    async def test_create_room(self, hass_with_store, mock_connection, mock_store):
        """Should create a new room."""
        await ws_set_room(
            hass_with_store, mock_connection,
            {
                "id": 4,
                "type": "glass_cards/set_room",
                "area_id": "bedroom",
                "icon": "mdi:bed",
                "card_order": ["light", "cover"],
            },
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["area_id"] == "bedroom"
        assert result["icon"] == "mdi:bed"
        assert result["card_order"] == ["light", "cover"]
        mock_store._store.async_save.assert_called()

    @pytest.mark.asyncio
    async def test_update_room(self, hass_with_store, mock_connection, mock_store):
        """Should update an existing room."""
        mock_store._data.rooms["office"] = RoomConfig(area_id="office", icon="mdi:desk")
        await ws_set_room(
            hass_with_store, mock_connection,
            {"id": 5, "type": "glass_cards/set_room", "area_id": "office", "label": "My Office"},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["icon"] == "mdi:desk"
        assert result["label"] == "My Office"

    @pytest.mark.asyncio
    async def test_unauthorized(self, hass_with_store, mock_connection, mock_regular_user):
        """Non-edit user should raise Unauthorized."""
        mock_connection.user = mock_regular_user
        from homeassistant.exceptions import Unauthorized

        with pytest.raises(Unauthorized):
            await ws_set_room(
                hass_with_store, mock_connection,
                {"id": 6, "type": "glass_cards/set_room", "area_id": "x"},
            )


class TestSetNavbar:
    """Tests for ws_set_navbar."""

    @pytest.mark.asyncio
    async def test_set_room_order(self, hass_with_store, mock_connection, mock_store):
        """Should update navbar room order."""
        await ws_set_navbar(
            hass_with_store, mock_connection,
            {"id": 7, "type": "glass_cards/set_navbar", "room_order": ["a", "b", "c"]},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["room_order"] == ["a", "b", "c"]
        mock_store._store.async_save.assert_called()

    @pytest.mark.asyncio
    async def test_set_hidden_rooms(self, hass_with_store, mock_connection, mock_store):
        """Should update hidden rooms."""
        await ws_set_navbar(
            hass_with_store, mock_connection,
            {"id": 8, "type": "glass_cards/set_navbar", "hidden_rooms": ["garage"]},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["hidden_rooms"] == ["garage"]


class TestDeleteRoom:
    """Tests for ws_delete_room."""

    @pytest.mark.asyncio
    async def test_delete_existing(self, hass_with_store, mock_connection, mock_store):
        """Should delete an existing room."""
        mock_store._data.rooms["old"] = RoomConfig(area_id="old")
        await ws_delete_room(
            hass_with_store, mock_connection,
            {"id": 9, "type": "glass_cards/delete_room", "area_id": "old"},
        )
        assert "old" not in mock_store._data.rooms
        mock_connection.send_result.assert_called_once_with(9, {"deleted": "old"})

    @pytest.mark.asyncio
    async def test_delete_nonexistent(self, hass_with_store, mock_connection):
        """Should send error for unknown room."""
        await ws_delete_room(
            hass_with_store, mock_connection,
            {"id": 10, "type": "glass_cards/delete_room", "area_id": "nope"},
        )
        mock_connection.send_error.assert_called_once()
