"""Tests for Glass Cards WebSocket API."""

from unittest.mock import MagicMock

import pytest

from custom_components.glass_cards.models import EntitySchedule, RoomConfig, VisibilityPeriod
from custom_components.glass_cards.websocket_api import (
    ws_delete_room,
    ws_get_config,
    ws_get_room,
    ws_get_schedules,
    ws_set_calendar_card,
    ws_set_camera_carousel_config,
    ws_set_climate_config,
    ws_set_cover_config,
    ws_set_dashboard,
    ws_set_fan_config,
    ws_set_light_config,
    ws_set_media_config,
    ws_set_navbar,
    ws_set_presence_config,
    ws_set_room,
    ws_set_schedule,
    ws_set_spotify_config,
    ws_set_title_config,
    ws_set_vacuum_card,
    ws_set_weather,
    ws_set_wizard_completed,
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
    async def test_save_failure_sends_error(self, hass_with_store, mock_connection, mock_store):
        """Should send storage_error when async_save fails."""
        from homeassistant.exceptions import HomeAssistantError

        mock_store._store.async_save.side_effect = HomeAssistantError("disk full")
        await ws_set_navbar(
            hass_with_store, mock_connection,
            {"id": 99, "type": "glass_cards/set_navbar", "room_order": ["a"]},
        )
        mock_connection.send_error.assert_called_once()
        args = mock_connection.send_error.call_args[0]
        assert args[1] == "storage_error"
        mock_connection.send_result.assert_not_called()
        mock_store._store.async_save.side_effect = None

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

    @pytest.mark.asyncio
    async def test_accepts_hyphenated_entity_id(self, hass_with_store, mock_connection, mock_store):
        """Should accept entity_id with hyphens (custom integrations).

        Regression guard for v0.0.200: the schedule regex used to be
        ^[a-z_]+\\.[a-z0-9_]+$ which blocked any entity with a hyphenated
        object_id (Google Calendar, CalDAV, custom integrations).
        """
        await ws_set_schedule(
            hass_with_store, mock_connection,
            {
                "id": 19,
                "type": "glass_cards/set_schedule",
                "entity_id": "calendar.my-google-calendar",
                "periods": [
                    {"start": "2026-12-01T18:00", "end": "2027-01-15T23:59", "recurring": True},
                ],
            },
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["entity_id"] == "calendar.my-google-calendar"


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
    async def test_set_hidden_entities_dedupes_ordered(self, hass_with_store, mock_connection, mock_store):
        """Should update hidden_entities with ORDER-PRESERVING dedup (not list(set())).

        Regression guard for v0.0.200: previously used list(set(...)) which destroyed
        user-defined ordering.
        """
        await ws_set_climate_config(
            hass_with_store,
            mock_connection,
            {
                "id": 52,
                "type": "glass_cards/set_climate_config",
                "hidden_entities": ["climate.garage", "climate.chambre", "climate.garage", "climate.salon"],
            },
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["hidden_entities"] == ["climate.garage", "climate.chambre", "climate.salon"]

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


class TestSetWeather:
    """Tests for ws_set_weather."""

    @pytest.mark.asyncio
    async def test_set_entity_id(self, hass_with_store, mock_connection, mock_store):
        """Should update weather entity_id."""
        await ws_set_weather(
            hass_with_store, mock_connection,
            {"id": 60, "type": "glass_cards/set_weather", "entity_id": "weather.home"},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["entity_id"] == "weather.home"
        mock_store._store.async_save.assert_called()

    @pytest.mark.asyncio
    async def test_set_show_header(self, hass_with_store, mock_connection, mock_store):
        """Should update show_header."""
        await ws_set_weather(
            hass_with_store, mock_connection,
            {"id": 61, "type": "glass_cards/set_weather", "show_header": False},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["show_header"] is False

    @pytest.mark.asyncio
    async def test_set_hidden_metrics(self, hass_with_store, mock_connection, mock_store):
        """Should update hidden_metrics."""
        await ws_set_weather(
            hass_with_store, mock_connection,
            {"id": 62, "type": "glass_cards/set_weather", "hidden_metrics": ["humidity", "wind"]},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["hidden_metrics"] == ["humidity", "wind"]

    @pytest.mark.asyncio
    async def test_accepts_hyphenated_entity_id(self, hass_with_store, mock_connection, mock_store):
        """Should accept hyphenated weather entity IDs (custom integrations)."""
        await ws_set_weather(
            hass_with_store, mock_connection,
            {"id": 63, "type": "glass_cards/set_weather", "entity_id": "weather.my-home-city"},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["entity_id"] == "weather.my-home-city"


class TestSetLightConfig:
    """Tests for ws_set_light_config."""

    @pytest.mark.asyncio
    async def test_set_show_header(self, hass_with_store, mock_connection, mock_store):
        """Should update show_header."""
        await ws_set_light_config(
            hass_with_store, mock_connection,
            {"id": 70, "type": "glass_cards/set_light_config", "show_header": False},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["show_header"] is False
        mock_store._store.async_save.assert_called()


class TestSetFanConfig:
    """Tests for ws_set_fan_config."""

    @pytest.mark.asyncio
    async def test_set_show_header(self, hass_with_store, mock_connection, mock_store):
        """Should update show_header."""
        await ws_set_fan_config(
            hass_with_store, mock_connection,
            {"id": 80, "type": "glass_cards/set_fan_config", "show_header": False},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["show_header"] is False
        mock_store._store.async_save.assert_called()


class TestSetCoverConfig:
    """Tests for ws_set_cover_config."""

    @pytest.mark.asyncio
    async def test_set_show_header(self, hass_with_store, mock_connection, mock_store):
        """Should update show_header."""
        await ws_set_cover_config(
            hass_with_store, mock_connection,
            {"id": 90, "type": "glass_cards/set_cover_config", "show_header": False},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["show_header"] is False
        mock_store._store.async_save.assert_called()

    @pytest.mark.asyncio
    async def test_set_dashboard_entities(self, hass_with_store, mock_connection, mock_store):
        """Should update dashboard_entities with deduplication."""
        await ws_set_cover_config(
            hass_with_store, mock_connection,
            {
                "id": 91, "type": "glass_cards/set_cover_config",
                "dashboard_entities": ["cover.salon", "cover.chambre", "cover.salon"],
            },
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["dashboard_entities"] == ["cover.salon", "cover.chambre"]

    @pytest.mark.asyncio
    async def test_set_presets(self, hass_with_store, mock_connection, mock_store):
        """Should update global presets."""
        await ws_set_cover_config(
            hass_with_store, mock_connection,
            {"id": 92, "type": "glass_cards/set_cover_config", "presets": [0, 25, 50, 100]},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["presets"] == [0, 25, 50, 100]


class TestSetTitleConfig:
    """Tests for ws_set_title_config."""

    @pytest.mark.asyncio
    async def test_set_title(self, hass_with_store, mock_connection, mock_store):
        """Should update title text."""
        await ws_set_title_config(
            hass_with_store, mock_connection,
            {"id": 100, "type": "glass_cards/set_title_config", "title": "My Home"},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["title"] == "My Home"
        mock_store._store.async_save.assert_called()

    @pytest.mark.asyncio
    async def test_set_period_entity(self, hass_with_store, mock_connection, mock_store):
        """Should update period_entity."""
        await ws_set_title_config(
            hass_with_store, mock_connection,
            {"id": 101, "type": "glass_cards/set_title_config", "period_entity": "input_select.periode"},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["period_entity"] == "input_select.periode"


class TestSetMediaConfig:
    """Tests for ws_set_media_config."""

    @pytest.mark.asyncio
    async def test_set_show_header(self, hass_with_store, mock_connection, mock_store):
        """Should update show_header."""
        await ws_set_media_config(
            hass_with_store, mock_connection,
            {"id": 110, "type": "glass_cards/set_media_config", "show_header": False},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["show_header"] is False
        mock_store._store.async_save.assert_called()

    @pytest.mark.asyncio
    async def test_set_extra_entities(self, hass_with_store, mock_connection, mock_store):
        """Should update extra_entities."""
        await ws_set_media_config(
            hass_with_store, mock_connection,
            {
                "id": 111, "type": "glass_cards/set_media_config",
                "extra_entities": {"salon": ["media_player.tv"]},
            },
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["extra_entities"] == {"salon": ["media_player.tv"]}


class TestSetDashboard:
    """Tests for ws_set_dashboard."""

    @pytest.mark.asyncio
    async def test_set_enabled_cards(self, hass_with_store, mock_connection, mock_store):
        """Should update enabled_cards."""
        await ws_set_dashboard(
            hass_with_store, mock_connection,
            {"id": 120, "type": "glass_cards/set_dashboard", "enabled_cards": ["weather", "light"]},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["enabled_cards"] == ["weather", "light"]
        mock_store._store.async_save.assert_called()

    @pytest.mark.asyncio
    async def test_set_hide_sidebar(self, hass_with_store, mock_connection, mock_store):
        """Should update hide_sidebar."""
        await ws_set_dashboard(
            hass_with_store, mock_connection,
            {"id": 121, "type": "glass_cards/set_dashboard", "hide_sidebar": True},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["hide_sidebar"] is True


class TestSetPresenceConfig:
    """Tests for ws_set_presence_config."""

    @pytest.mark.asyncio
    async def test_set_show_header(self, hass_with_store, mock_connection, mock_store):
        """Should update show_header."""
        await ws_set_presence_config(
            hass_with_store, mock_connection,
            {"id": 130, "type": "glass_cards/set_presence_config", "show_header": False},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["show_header"] is False
        mock_store._store.async_save.assert_called()

    @pytest.mark.asyncio
    async def test_set_person_entities(self, hass_with_store, mock_connection, mock_store):
        """Should update person_entities list."""
        await ws_set_presence_config(
            hass_with_store, mock_connection,
            {
                "id": 131, "type": "glass_cards/set_presence_config",
                "person_entities": ["person.alex", "person.marie"],
            },
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["person_entities"] == ["person.alex", "person.marie"]

    @pytest.mark.asyncio
    async def test_set_sleep_sensors(self, hass_with_store, mock_connection, mock_store):
        """Should map person → input_boolean (or binary_sensor) for sleep detection."""
        await ws_set_presence_config(
            hass_with_store, mock_connection,
            {
                "id": 132, "type": "glass_cards/set_presence_config",
                "sleep_sensors": {
                    "person.roland": "input_boolean.roland_dort",
                    "person.marie": "binary_sensor.marie_bed_occupancy",
                },
            },
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["sleep_sensors"]["person.roland"] == "input_boolean.roland_dort"
        assert result["sleep_sensors"]["person.marie"] == "binary_sensor.marie_bed_occupancy"


class TestSetCameraCarouselConfig:
    """Tests for ws_set_camera_carousel_config."""

    @pytest.mark.asyncio
    async def test_set_show_header(self, hass_with_store, mock_connection, mock_store):
        """Should update show_header."""
        await ws_set_camera_carousel_config(
            hass_with_store, mock_connection,
            {"id": 140, "type": "glass_cards/set_camera_carousel_config", "show_header": False},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["show_header"] is False
        mock_store._store.async_save.assert_called()

    @pytest.mark.asyncio
    async def test_set_auto_cycle(self, hass_with_store, mock_connection, mock_store):
        """Should update auto_cycle and cycle_interval."""
        await ws_set_camera_carousel_config(
            hass_with_store, mock_connection,
            {"id": 141, "type": "glass_cards/set_camera_carousel_config", "auto_cycle": True, "cycle_interval": 10},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["auto_cycle"] is True
        assert result["cycle_interval"] == 10

    @pytest.mark.asyncio
    async def test_set_entity_order(self, hass_with_store, mock_connection, mock_store):
        """Should update entity_order."""
        await ws_set_camera_carousel_config(
            hass_with_store, mock_connection,
            {"id": 142, "type": "glass_cards/set_camera_carousel_config", "entity_order": ["camera.front", "camera.back"]},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["entity_order"] == ["camera.front", "camera.back"]


class TestSetCalendarCard:
    """Tests for ws_set_calendar_card."""

    @pytest.mark.asyncio
    async def test_set_show_header(self, hass_with_store, mock_connection, mock_store):
        """Should update show_header AND broadcast the change on the HA bus."""
        await ws_set_calendar_card(
            hass_with_store, mock_connection,
            {"id": 160, "type": "glass_cards/set_calendar_card", "show_header": False},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["show_header"] is False
        mock_store._store.async_save.assert_called()
        # Regression guard: server-side broadcast must fire so other tabs reload
        hass_with_store.bus.async_fire.assert_called_with(
            "glass_cards_config_changed", {"section": "calendar_card"}
        )

    @pytest.mark.asyncio
    async def test_set_hidden_entities(self, hass_with_store, mock_connection, mock_store):
        """Should update hidden_entities."""
        await ws_set_calendar_card(
            hass_with_store, mock_connection,
            {"id": 161, "type": "glass_cards/set_calendar_card", "hidden_entities": ["calendar.perso", "calendar.travail"]},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["hidden_entities"] == ["calendar.perso", "calendar.travail"]

    @pytest.mark.asyncio
    async def test_dedupes_hidden_entities(self, hass_with_store, mock_connection, mock_store):
        """Should dedupe hidden_entities on write (order-preserving)."""
        await ws_set_calendar_card(
            hass_with_store, mock_connection,
            {
                "id": 162, "type": "glass_cards/set_calendar_card",
                "hidden_entities": ["calendar.perso", "calendar.travail", "calendar.perso"],
            },
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["hidden_entities"] == ["calendar.perso", "calendar.travail"]

    @pytest.mark.asyncio
    async def test_accepts_hyphenated_entity_ids(self, hass_with_store, mock_connection, mock_store):
        """Should accept entity IDs with hyphens (Google Calendar / CalDAV convention)."""
        await ws_set_calendar_card(
            hass_with_store, mock_connection,
            {
                "id": 163, "type": "glass_cards/set_calendar_card",
                "hidden_entities": ["calendar.my-google-calendar", "calendar.family-events-1"],
            },
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["hidden_entities"] == ["calendar.my-google-calendar", "calendar.family-events-1"]


class TestSetSpotifyConfig:
    """Tests for ws_set_spotify_config."""

    @pytest.mark.asyncio
    async def test_set_show_header(self, hass_with_store, mock_connection, mock_store):
        """Should update show_header."""
        await ws_set_spotify_config(
            hass_with_store, mock_connection,
            {"id": 150, "type": "glass_cards/set_spotify_config", "show_header": False},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["show_header"] is False
        mock_store._store.async_save.assert_called()

    @pytest.mark.asyncio
    async def test_set_entity_id(self, hass_with_store, mock_connection, mock_store):
        """Should update entity_id."""
        await ws_set_spotify_config(
            hass_with_store, mock_connection,
            {"id": 151, "type": "glass_cards/set_spotify_config", "entity_id": "media_player.spotify"},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["entity_id"] == "media_player.spotify"

    @pytest.mark.asyncio
    async def test_set_visible_speakers(self, hass_with_store, mock_connection, mock_store):
        """Should update visible_speakers with deduplication."""
        await ws_set_spotify_config(
            hass_with_store, mock_connection,
            {
                "id": 152, "type": "glass_cards/set_spotify_config",
                "visible_speakers": ["media_player.sonos", "media_player.echo", "media_player.sonos"],
            },
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["visible_speakers"] == ["media_player.sonos", "media_player.echo"]


class TestSetWizardCompleted:
    """Tests for ws_set_wizard_completed."""

    @pytest.mark.asyncio
    async def test_set_completed_true(self, hass_with_store, mock_connection, mock_store):
        """Should mark wizard as completed."""
        await ws_set_wizard_completed(
            hass_with_store, mock_connection,
            {"id": 170, "type": "glass_cards/set_wizard_completed", "completed": True},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["wizard_completed"] is True
        mock_store._store.async_save.assert_called()

    @pytest.mark.asyncio
    async def test_set_completed_false(self, hass_with_store, mock_connection, mock_store):
        """Should mark wizard as not completed (reset)."""
        mock_store._data.wizard_completed = True
        await ws_set_wizard_completed(
            hass_with_store, mock_connection,
            {"id": 171, "type": "glass_cards/set_wizard_completed", "completed": False},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["wizard_completed"] is False

    @pytest.mark.asyncio
    async def test_broadcasts_change(self, hass_with_store, mock_connection, mock_store):
        """Should fire glass_cards_config_changed on the HA bus."""
        await ws_set_wizard_completed(
            hass_with_store, mock_connection,
            {"id": 172, "type": "glass_cards/set_wizard_completed", "completed": True},
        )
        hass_with_store.bus.async_fire.assert_called_with(
            "glass_cards_config_changed", {"section": "wizard"}
        )

    @pytest.mark.asyncio
    async def test_unauthorized(self, hass_with_store, mock_connection, mock_regular_user):
        """Non-edit user should raise Unauthorized."""
        mock_connection.user = mock_regular_user
        from homeassistant.exceptions import Unauthorized

        with pytest.raises(Unauthorized):
            await ws_set_wizard_completed(
                hass_with_store, mock_connection,
                {"id": 173, "type": "glass_cards/set_wizard_completed", "completed": True},
            )


class TestSetVacuumCard:
    """Tests for ws_set_vacuum_card."""

    @pytest.mark.asyncio
    async def test_set_show_header_broadcasts(self, hass_with_store, mock_connection, mock_store):
        """Should update show_header AND broadcast on the HA bus."""
        await ws_set_vacuum_card(
            hass_with_store, mock_connection,
            {"id": 200, "type": "glass_cards/set_vacuum_card", "show_header": False},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["show_header"] is False
        mock_store._store.async_save.assert_called()
        hass_with_store.bus.async_fire.assert_called_with(
            "glass_cards_config_changed", {"section": "vacuum_card"}
        )

    @pytest.mark.asyncio
    async def test_set_entity(self, hass_with_store, mock_connection, mock_store):
        """Should store a valid primary vacuum entity."""
        await ws_set_vacuum_card(
            hass_with_store, mock_connection,
            {"id": 201, "type": "glass_cards/set_vacuum_card", "entity": "vacuum.saros_10r"},
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["entity"] == "vacuum.saros_10r"

    @pytest.mark.asyncio
    async def test_set_entity_overrides(self, hass_with_store, mock_connection, mock_store):
        """Should store valid overrides and hidden ('') values."""
        await ws_set_vacuum_card(
            hass_with_store, mock_connection,
            {
                "id": 202, "type": "glass_cards/set_vacuum_card",
                "entity_overrides": {"battery": "sensor.bat", "currentRoom": ""},
            },
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["entity_overrides"] == {"battery": "sensor.bat", "currentRoom": ""}

    @pytest.mark.asyncio
    async def test_set_entity_overrides_filters_unknown_keys(self, hass_with_store, mock_connection, mock_store):
        """Unknown role keys must be dropped server-side."""
        await ws_set_vacuum_card(
            hass_with_store, mock_connection,
            {
                "id": 203, "type": "glass_cards/set_vacuum_card",
                "entity_overrides": {"battery": "sensor.bat", "bogus": "sensor.x"},
            },
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["entity_overrides"] == {"battery": "sensor.bat"}

    @pytest.mark.asyncio
    async def test_set_room_button_lists(self, hass_with_store, mock_connection, mock_store):
        """Should store + dedupe the room-button lists."""
        await ws_set_vacuum_card(
            hass_with_store, mock_connection,
            {
                "id": 204, "type": "glass_cards/set_vacuum_card",
                "room_buttons_hidden": ["button.saros_10r_nettoyage_sdb"],
                "room_buttons_order": [
                    "button.saros_10r_nettoyage_cuisine",
                    "button.saros_10r_nettoyage_cuisine",
                ],
                "room_buttons_extra": ["button.saros_10r_nettoyage_garage"],
            },
        )
        result = mock_connection.send_result.call_args[0][1]
        assert result["room_buttons_hidden"] == ["button.saros_10r_nettoyage_sdb"]
        assert result["room_buttons_order"] == ["button.saros_10r_nettoyage_cuisine"]
        assert result["room_buttons_extra"] == ["button.saros_10r_nettoyage_garage"]

    @pytest.mark.asyncio
    async def test_unauthorized_user(self, hass_with_store, mock_connection, mock_regular_user):
        """Non-editable user should raise Unauthorized."""
        mock_connection.user = mock_regular_user
        from homeassistant.exceptions import Unauthorized

        with pytest.raises(Unauthorized):
            await ws_set_vacuum_card(
                hass_with_store, mock_connection,
                {"id": 205, "type": "glass_cards/set_vacuum_card", "show_header": False},
            )
