"""WebSocket API for Glass Cards."""

from __future__ import annotations

from typing import TYPE_CHECKING, Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.exceptions import HomeAssistantError, Unauthorized

from .const import DOMAIN
from .permissions import can_edit, can_read
from .models import RoomConfig, VALID_WEATHER_METRICS, VALID_DASHBOARD_CARDS

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

    from .store import GlassCardsStore


def async_register_commands(hass: HomeAssistant) -> None:
    """Register WebSocket commands."""
    websocket_api.async_register_command(hass, ws_get_config)
    websocket_api.async_register_command(hass, ws_get_room)
    websocket_api.async_register_command(hass, ws_set_room)
    websocket_api.async_register_command(hass, ws_set_navbar)
    websocket_api.async_register_command(hass, ws_delete_room)
    websocket_api.async_register_command(hass, ws_set_weather)
    websocket_api.async_register_command(hass, ws_set_dashboard)


def _get_store(hass: HomeAssistant) -> GlassCardsStore:
    """Get the Glass Cards store."""
    domain_data = hass.data.get(DOMAIN)
    if not domain_data or "store" not in domain_data:
        raise HomeAssistantError("Glass Cards integration not loaded")
    return domain_data["store"]


@websocket_api.websocket_command(
    {vol.Required("type"): "glass_cards/get_config"}
)
@websocket_api.async_response
async def ws_get_config(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return the full Glass Cards configuration."""
    if not can_read(connection.user):
        raise Unauthorized()

    store = _get_store(hass)
    connection.send_result(msg["id"], store.data.to_dict())


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/get_room",
        vol.Required("area_id"): str,
    }
)
@websocket_api.async_response
async def ws_get_room(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return configuration for a specific room."""
    if not can_read(connection.user):
        raise Unauthorized()

    store = _get_store(hass)
    area_id = msg["area_id"]
    room = store.data.rooms.get(area_id)

    if room is None:
        connection.send_result(msg["id"], None)
        return

    connection.send_result(msg["id"], room.to_dict())


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/set_room",
        vol.Required("area_id"): str,
        vol.Optional("card_order"): [str],
        vol.Optional("hidden_entities"): [str],
        vol.Optional("entity_order"): [str],
        vol.Optional("entity_layouts"): {str: vol.In(["auto", "full", "compact"])},
        vol.Optional("hidden_scenes"): [str],
        vol.Optional("scene_order"): [str],
        vol.Optional("icon"): vol.Any(str, None),
        vol.Optional("label"): vol.Any(str, None),
        vol.Optional("visible"): bool,
    }
)
@websocket_api.async_response
async def ws_set_room(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Create or update a room configuration."""
    if not can_edit(connection.user):
        raise Unauthorized()

    store = _get_store(hass)
    area_id = msg["area_id"]
    room = store.data.rooms.get(area_id)

    if room is None:
        room = RoomConfig(area_id=area_id)
        store.data.rooms[area_id] = room

    if "card_order" in msg:
        room.card_order = msg["card_order"]
    if "hidden_entities" in msg:
        room.hidden_entities = msg["hidden_entities"]
    if "entity_order" in msg:
        room.entity_order = msg["entity_order"]
    if "entity_layouts" in msg:
        room.entity_layouts = msg["entity_layouts"]
    if "hidden_scenes" in msg:
        room.hidden_scenes = msg["hidden_scenes"]
    if "scene_order" in msg:
        room.scene_order = msg["scene_order"]
    if "icon" in msg:
        room.icon = msg["icon"]
    if "label" in msg:
        room.label = msg["label"]
    if "visible" in msg:
        room.visible = msg["visible"]

    await store.async_save()
    connection.send_result(msg["id"], room.to_dict())


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/set_navbar",
        vol.Optional("room_order"): [str],
        vol.Optional("hidden_rooms"): [str],
        vol.Optional("show_lights"): bool,
        vol.Optional("show_temperature"): bool,
        vol.Optional("show_humidity"): bool,
        vol.Optional("show_media"): bool,
        vol.Optional("auto_sort"): bool,
        vol.Optional("temp_high"): vol.Coerce(float),
        vol.Optional("temp_low"): vol.Coerce(float),
        vol.Optional("humidity_threshold"): vol.Coerce(float),
    }
)
@websocket_api.async_response
async def ws_set_navbar(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Update the navbar configuration."""
    if not can_edit(connection.user):
        raise Unauthorized()

    store = _get_store(hass)

    if "room_order" in msg:
        store.data.navbar.room_order = msg["room_order"]
    if "hidden_rooms" in msg:
        store.data.navbar.hidden_rooms = msg["hidden_rooms"]
    if "show_lights" in msg:
        store.data.navbar.show_lights = msg["show_lights"]
    if "show_temperature" in msg:
        store.data.navbar.show_temperature = msg["show_temperature"]
    if "show_humidity" in msg:
        store.data.navbar.show_humidity = msg["show_humidity"]
    if "show_media" in msg:
        store.data.navbar.show_media = msg["show_media"]
    if "auto_sort" in msg:
        store.data.navbar.auto_sort = msg["auto_sort"]
    if "temp_high" in msg:
        store.data.navbar.temp_high = msg["temp_high"]
    if "temp_low" in msg:
        store.data.navbar.temp_low = msg["temp_low"]
    if "humidity_threshold" in msg:
        store.data.navbar.humidity_threshold = msg["humidity_threshold"]

    await store.async_save()
    connection.send_result(msg["id"], store.data.navbar.to_dict())


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/delete_room",
        vol.Required("area_id"): str,
    }
)
@websocket_api.async_response
async def ws_delete_room(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Delete a room configuration."""
    if not can_edit(connection.user):
        raise Unauthorized()

    store = _get_store(hass)
    area_id = msg["area_id"]

    if area_id not in store.data.rooms:
        connection.send_error(msg["id"], "not_found", f"Room {area_id} not found")
        return

    del store.data.rooms[area_id]
    await store.async_save()
    connection.send_result(msg["id"], {"deleted": area_id})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/set_weather",
        vol.Optional("entity_id"): vol.All(str, vol.Strip, vol.Match(r"^weather\.\w+$")),
        vol.Optional("hidden_metrics"): [vol.In(list(VALID_WEATHER_METRICS))],
        vol.Optional("show_daily"): bool,
        vol.Optional("show_hourly"): bool,
    }
)
@websocket_api.async_response
async def ws_set_weather(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Update the weather card configuration."""
    if not can_edit(connection.user):
        raise Unauthorized()

    store = _get_store(hass)

    if "entity_id" in msg:
        store.data.weather.entity_id = msg["entity_id"]
    if "hidden_metrics" in msg:
        store.data.weather.hidden_metrics = msg["hidden_metrics"]
    if "show_daily" in msg:
        store.data.weather.show_daily = msg["show_daily"]
    if "show_hourly" in msg:
        store.data.weather.show_hourly = msg["show_hourly"]

    await store.async_save()
    connection.send_result(msg["id"], store.data.weather.to_dict())


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/set_dashboard",
        vol.Optional("enabled_cards"): [vol.In(list(VALID_DASHBOARD_CARDS))],
    }
)
@websocket_api.async_response
async def ws_set_dashboard(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Update the dashboard card configuration."""
    if not can_edit(connection.user):
        raise Unauthorized()

    store = _get_store(hass)

    if "enabled_cards" in msg:
        store.data.dashboard.enabled_cards = msg["enabled_cards"]

    await store.async_save()
    connection.send_result(msg["id"], store.data.dashboard.to_dict())
