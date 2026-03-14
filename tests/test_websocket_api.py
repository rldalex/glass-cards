"""Tests for Glass Cards WebSocket API."""

from unittest.mock import MagicMock

import pytest

from custom_components.glass_cards.models import EntitySchedule, RoomConfig, VisibilityPeriod
from custom_components.glass_cards.websocket_api import (
    ws_delete_room,
    ws_get_config,
    ws_get_room,
    ws_get_schedules,
    ws_set_climate_config,
    ws_set_navbar,
    ws_set_room,
    ws_set_schedule,
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


class TestGetSchedules:
    """Tests for ws_get_schedules."""

    @pytest.mark.asyncio
    async def test_returns_empty(self, hass_with_store, mock_connection):
        """Should return empty dict when no schedules."""
        await ws_get_schedules(
            hass_with_store, mock_connection,
            {"id": 11, "type": "glass_cards/get_schedules"},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result == {}

    @pytest.mark.asyncio
    async def test_returns_schedules(self, hass_with_store, mock_connection, mock_store):
        """Should return serialized schedules."""
        mock_store._data.entity_schedules["light.sapin"] = EntitySchedule(
            entity_id="light.sapin",
            periods=[VisibilityPeriod(start="2026-12-01T18:00", end="2027-01-15T23:59", recurring=True)],
        )
        await ws_get_schedules(
            hass_with_store, mock_connection,
            {"id": 12, "type": "glass_cards/get_schedules"},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert "light.sapin" in result
        assert result["light.sapin"]["periods"][0]["recurring"] is True

    @pytest.mark.asyncio
    async def test_unauthorized(self, hass_with_store, mock_connection):
        """Non-readable user should raise Unauthorized."""
        mock_connection.user = None
        from homeassistant.exceptions import Unauthorized

        with pytest.raises(Unauthorized):
            await ws_get_schedules(
                hass_with_store, mock_connection,
                {"id": 13, "type": "glass_cards/get_schedules"},
            )

    @pytest.mark.asyncio
    async def test_regular_user_can_read(self, hass_with_store, mock_connection, mock_regular_user):
        """Authenticated non-admin user should be able to read schedules."""
        mock_connection.user = mock_regular_user
        await ws_get_schedules(
            hass_with_store, mock_connection,
            {"id": 14, "type": "glass_cards/get_schedules"},
        )
        mock_connection.send_result.assert_called_once()
        result = mock_connection.send_result.call_args[0][1]
        assert result == {}


class TestSetSchedule:
    """Tests for ws_set_schedule."""

    @pytest.mark.asyncio
    async def test_set_schedule(self, hass_with_store, mock_connection, mock_store):
        """Should create a schedule."""
        await ws_set_schedule(
            hass_with_store, mock_connection,
            {
                "id": 14,
                "type": "glass_cards/set_schedule",
                "entity_id": "light.sapin",
                "periods": [
                    {"start": "2026-12-01T18:00", "end": "2027-01-15T23:59", "recurring": True},
                ],
            },
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["entity_id"] == "light.sapin"
        assert len(result["periods"]) == 1
        assert result["periods"][0]["recurring"] is True
        mock_store._store.async_save.assert_called()

    @pytest.mark.asyncio
    async def test_clear_schedule(self, hass_with_store, mock_connection, mock_store):
        """Empty periods should remove the schedule."""
        mock_store._data.entity_schedules["light.sapin"] = EntitySchedule(
            entity_id="light.sapin",
            periods=[VisibilityPeriod(start="2026-12-01T18:00", end="2027-01-15T23:59")],
        )
        await ws_set_schedule(
            hass_with_store, mock_connection,
            {
                "id": 15,
                "type": "glass_cards/set_schedule",
                "entity_id": "light.sapin",
                "periods": [],
            },
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["periods"] == []
        assert "light.sapin" not in mock_store._data.entity_schedules

    @pytest.mark.asyncio
    async def test_multiple_periods(self, hass_with_store, mock_connection, mock_store):
        """Should store multiple periods."""
        await ws_set_schedule(
            hass_with_store, mock_connection,
            {
                "id": 16,
                "type": "glass_cards/set_schedule",
                "entity_id": "light.guirlande",
                "periods": [
                    {"start": "2026-12-01T00:00", "end": "2027-01-31T23:59", "recurring": True},
                    {"start": "2026-06-21T20:00", "end": "2026-06-22T02:00", "recurring": False},
                ],
            },
        )
        result = mock_connection.send_result.call_args[0][1]
        assert len(result["periods"]) == 2

    @pytest.mark.asyncio
    async def test_all_periods_invalid_returns_error(self, hass_with_store, mock_connection, mock_store):
        """Should return error when all periods have start >= end."""
        await ws_set_schedule(
            hass_with_store, mock_connection,
            {
                "id": 18,
                "type": "glass_cards/set_schedule",
                "entity_id": "light.sapin",
                "periods": [
                    {"start": "2026-12-31T23:59", "end": "2026-01-01T00:00"},
                ],
            },
        )
        mock_connection.send_error.assert_called_once()
        mock_connection.send_result.assert_not_called()
        mock_store._store.async_save.assert_not_called()

    @pytest.mark.asyncio
    async def test_unauthorized(self, hass_with_store, mock_connection, mock_regular_user):
        """Non-edit user should raise Unauthorized."""
        mock_connection.user = mock_regular_user
        from homeassistant.exceptions import Unauthorized

        with pytest.raises(Unauthorized):
            await ws_set_schedule(
                hass_with_store, mock_connection,
                {
                    "id": 17,
                    "type": "glass_cards/set_schedule",
                    "entity_id": "light.x",
                    "periods": [],
                },
            )


class TestSetClimateConfig:
    """Tests for ws_set_climate_config."""

    @pytest.mark.asyncio
    async def test_set_show_header(self, hass_with_store, mock_connection, mock_store):
        """Should update show_header."""
        await ws_set_climate_config(
            hass_with_store,
            mock_connection,
            {"id": 50, "type": "glass_cards/set_climate_config", "show_header": False},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["show_header"] is False
        mock_store._store.async_save.assert_called()

    @pytest.mark.asyncio
    async def test_set_entity_order(self, hass_with_store, mock_connection, mock_store):
        """Should update entity_order with deduplication."""
        await ws_set_climate_config(
            hass_with_store,
            mock_connection,
            {
                "id": 51,
                "type": "glass_cards/set_climate_config",
                "entity_order": ["climate.salon", "climate.chambre", "climate.salon"],
            },
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["entity_order"] == ["climate.salon", "climate.chambre"]

    @pytest.mark.asyncio
    async def test_set_hidden_entities(self, hass_with_store, mock_connection, mock_store):
        """Should update hidden_entities."""
        await ws_set_climate_config(
            hass_with_store,
            mock_connection,
            {
                "id": 52,
                "type": "glass_cards/set_climate_config",
                "hidden_entities": ["climate.garage"],
            },
        )
        result = mock_connection.send_result.call_args[0][1]
        assert "climate.garage" in result["hidden_entities"]

    @pytest.mark.asyncio
    async def test_set_dashboard_entities(self, hass_with_store, mock_connection, mock_store):
        """Should update dashboard_entities with deduplication."""
        await ws_set_climate_config(
            hass_with_store,
            mock_connection,
            {
                "id": 53,
                "type": "glass_cards/set_climate_config",
                "dashboard_entities": ["climate.salon", "climate.salon"],
            },
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["dashboard_entities"] == ["climate.salon"]

    @pytest.mark.asyncio
    async def test_unauthorized(self, hass_with_store, mock_connection, mock_regular_user):
        """Non-edit user should raise Unauthorized."""
        mock_connection.user = mock_regular_user
        from homeassistant.exceptions import Unauthorized

        with pytest.raises(Unauthorized):
            await ws_set_climate_config(
                hass_with_store,
                mock_connection,
                {"id": 54, "type": "glass_cards/set_climate_config", "show_header": True},
            )

    @pytest.mark.asyncio
    async def test_partial_update(self, hass_with_store, mock_connection, mock_store):
        """Should only update provided fields."""
        mock_store._data.climate_card.show_header = True
        mock_store._data.climate_card.entity_order = ["climate.existing"]
        await ws_set_climate_config(
            hass_with_store,
            mock_connection,
            {"id": 55, "type": "glass_cards/set_climate_config", "show_header": False},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["show_header"] is False
        assert result["entity_order"] == ["climate.existing"]

    @pytest.mark.asyncio
    async def test_get_config_includes_climate(self, hass_with_store, mock_connection):
        """get_config should include climate_card section."""
        await ws_get_config(
            hass_with_store, mock_connection, {"id": 56, "type": "glass_cards/get_config"}
        )
        result = mock_connection.send_result.call_args[0][1]
        assert "climate_card" in result
        assert result["climate_card"]["show_header"] is True
