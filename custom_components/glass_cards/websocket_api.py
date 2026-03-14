"""WebSocket API for Glass Cards."""

from __future__ import annotations

import hashlib
import json
from datetime import datetime as dt_cls
from typing import TYPE_CHECKING, Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.exceptions import HomeAssistantError, Unauthorized

from .const import DOMAIN


def _strict_int(value: Any) -> int:
    """Coerce to int but reject booleans."""
    if isinstance(value, bool):
        raise vol.Invalid("Expected int, got bool")
    return int(value)
from .permissions import can_edit, can_read
from .models import (
    DEFAULT_COVER_PRESETS,
    EntitySchedule,
    RoomConfig,
    TitleModeEntry,
    TitleSourceEntry,
    VisibilityPeriod,
    VALID_DASHBOARD_CARDS,
    VALID_MEDIA_VARIANTS,
    VALID_MODE_COLORS,
    VALID_MODE_SOURCES,
    VALID_SORT_ORDERS,
    VALID_WEATHER_METRICS,
)
from .spotify_api import (
    SPOTIFY_DOMAIN,
    SpotifyAPIError,
    SpotifyNotConfiguredError,
    VALID_SEARCH_TYPES,
    spotify_add_to_queue,
    spotify_check_saved_tracks,
    spotify_get_album,
    spotify_get_artist_top_tracks,
    spotify_get_playlists,
    spotify_get_playlist_tracks,
    spotify_get_queue,
    spotify_get_recently_played,
    spotify_get_recommendations,
    spotify_get_saved_albums,
    spotify_get_saved_shows,
    spotify_get_saved_tracks,
    spotify_remove_tracks,
    spotify_save_tracks,
    spotify_search,
)

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
    websocket_api.async_register_command(hass, ws_set_light_config)
    websocket_api.async_register_command(hass, ws_set_fan_config)
    websocket_api.async_register_command(hass, ws_set_cover_config)
    websocket_api.async_register_command(hass, ws_set_climate_config)
    websocket_api.async_register_command(hass, ws_set_title_config)
    websocket_api.async_register_command(hass, ws_set_media_config)
    websocket_api.async_register_command(hass, ws_set_dashboard)
    websocket_api.async_register_command(hass, ws_spotify_status)
    websocket_api.async_register_command(hass, ws_set_spotify_config)
    websocket_api.async_register_command(hass, ws_spotify_search)
    websocket_api.async_register_command(hass, ws_spotify_browse)
    websocket_api.async_register_command(hass, ws_spotify_get_queue)
    websocket_api.async_register_command(hass, ws_spotify_add_to_queue)
    websocket_api.async_register_command(hass, ws_spotify_check_saved)
    websocket_api.async_register_command(hass, ws_spotify_save_tracks)
    websocket_api.async_register_command(hass, ws_spotify_remove_tracks)
    websocket_api.async_register_command(hass, ws_set_presence_config)
    websocket_api.async_register_command(hass, ws_set_camera_carousel_config)
    websocket_api.async_register_command(hass, ws_get_schedules)
    websocket_api.async_register_command(hass, ws_set_schedule)


def _get_store(hass: HomeAssistant) -> GlassCardsStore:
    """Get the Glass Cards store."""
    domain_data = hass.data.get(DOMAIN)
    if not domain_data or "store" not in domain_data:
        raise HomeAssistantError("Glass Cards integration not loaded")
    return domain_data["store"]


def _cache_key(category: str, **params: Any) -> str:
    """Build a deterministic cache key from a category and keyword params."""
    param_str = json.dumps(params, sort_keys=True)
    return f"{category}:{hashlib.md5(param_str.encode()).hexdigest()}"  # noqa: S324


def _get_spotify_cache(hass: HomeAssistant):  # type: ignore[return]
    """Return the SpotifyCache instance, or None if not available."""
    domain_data = hass.data.get(DOMAIN)
    if not domain_data:
        return None
    return domain_data.get("spotify_cache")


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
        vol.Optional("show_header"): bool,
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
    if "show_header" in msg:
        store.data.weather.show_header = msg["show_header"]

    await store.async_save()
    connection.send_result(msg["id"], store.data.weather.to_dict())


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/set_light_config",
        vol.Optional("show_header"): bool,
    }
)
@websocket_api.async_response
async def ws_set_light_config(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Update the light card configuration."""
    if not can_edit(connection.user):
        raise Unauthorized()

    store = _get_store(hass)

    if "show_header" in msg:
        store.data.light_card.show_header = msg["show_header"]

    await store.async_save()
    connection.send_result(msg["id"], store.data.light_card.to_dict())


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/set_fan_config",
        vol.Optional("show_header"): bool,
    }
)
@websocket_api.async_response
async def ws_set_fan_config(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Update the fan card configuration."""
    if not can_edit(connection.user):
        raise Unauthorized()

    store = _get_store(hass)

    if "show_header" in msg:
        store.data.fan_card.show_header = msg["show_header"]

    await store.async_save()
    connection.send_result(msg["id"], store.data.fan_card.to_dict())


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/set_cover_config",
        vol.Optional("show_header"): bool,
        vol.Optional("dashboard_entities"): [
            vol.All(str, vol.Match(r"^cover\.[\w-]+$"))
        ],
        vol.Optional("dashboard_compact"): bool,
        vol.Optional("presets"): vol.All(
            [vol.All(_strict_int, vol.Range(min=0, max=100))],
            vol.Length(min=1),
        ),
        vol.Optional("entity_presets"): {
            vol.All(str, vol.Match(r"^cover\.[\w-]+$")): vol.All(
                [vol.All(_strict_int, vol.Range(min=0, max=100))],
                vol.Length(min=1),
            ),
        },
    }
)
@websocket_api.async_response
async def ws_set_cover_config(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Update the cover card configuration."""
    if not can_edit(connection.user):
        raise Unauthorized()

    store = _get_store(hass)

    if "show_header" in msg:
        store.data.cover_card.show_header = msg["show_header"]
    if "dashboard_compact" in msg:
        store.data.cover_card.dashboard_compact = msg["dashboard_compact"]
    if "dashboard_entities" in msg:
        seen: set[str] = set()
        deduped_entities: list[str] = []
        for eid in msg["dashboard_entities"]:
            if eid not in seen:
                seen.add(eid)
                deduped_entities.append(eid)
        store.data.cover_card.dashboard_entities = deduped_entities
    if "presets" in msg:
        deduped = sorted(set(msg["presets"]))
        store.data.cover_card.presets = deduped if deduped else list(DEFAULT_COVER_PRESETS)
    if "entity_presets" in msg:
        ep: dict[str, list[int]] = {}
        for eid, vals in msg["entity_presets"].items():
            deduped_vals = sorted(set(vals))
            if deduped_vals:
                ep[eid] = deduped_vals
        store.data.cover_card.entity_presets = ep

    await store.async_save()
    connection.send_result(msg["id"], store.data.cover_card.to_dict())


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/set_climate_config",
        vol.Optional("show_header"): bool,
        vol.Optional("entity_order"): [
            vol.All(str, vol.Match(r"^climate\.[\w-]+$"))
        ],
        vol.Optional("hidden_entities"): [
            vol.All(str, vol.Match(r"^climate\.[\w-]+$"))
        ],
        vol.Optional("dashboard_entities"): [
            vol.All(str, vol.Match(r"^climate\.[\w-]+$"))
        ],
    }
)
@websocket_api.async_response
async def ws_set_climate_config(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Update the climate card configuration."""
    if not can_edit(connection.user):
        raise Unauthorized()

    store = _get_store(hass)

    if "show_header" in msg:
        store.data.climate_card.show_header = msg["show_header"]
    if "entity_order" in msg:
        seen: set[str] = set()
        deduped: list[str] = []
        for eid in msg["entity_order"]:
            if eid not in seen:
                seen.add(eid)
                deduped.append(eid)
        store.data.climate_card.entity_order = deduped
    if "hidden_entities" in msg:
        store.data.climate_card.hidden_entities = list(set(msg["hidden_entities"]))
    if "dashboard_entities" in msg:
        seen_d: set[str] = set()
        deduped_d: list[str] = []
        for eid in msg["dashboard_entities"]:
            if eid not in seen_d:
                seen_d.add(eid)
                deduped_d.append(eid)
        store.data.climate_card.dashboard_entities = deduped_d

    await store.async_save()
    connection.send_result(msg["id"], store.data.climate_card.to_dict())


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/set_title_config",
        vol.Optional("title"): str,
        vol.Optional("sources"): [
            {
                vol.Required("source_type"): vol.In(
                    ["input_select", "scenes", "booleans"]
                ),
                vol.Optional("entity", default=""): vol.Any(
                    "", vol.All(str, vol.Match(r"^[a-z_]+\.[a-z0-9_]+$"))
                ),
                vol.Optional("label", default=""): str,
                vol.Optional("modes", default=[]): [
                    {
                        vol.Required("id"): str,
                        vol.Optional("label", default=""): str,
                        vol.Optional("icon", default=""): str,
                        vol.Optional("color", default="neutral"): vol.Any(
                            vol.In(list(VALID_MODE_COLORS)),
                            vol.Match(r"^#[0-9a-fA-F]{6}$"),
                        ),
                    }
                ],
            }
        ],
    }
)
@websocket_api.async_response
async def ws_set_title_config(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Update the title card configuration."""
    if not can_edit(connection.user):
        raise Unauthorized()

    store = _get_store(hass)

    if "title" in msg:
        store.data.title_card.title = msg["title"]
    if "sources" in msg:
        store.data.title_card.sources = [
            TitleSourceEntry.from_dict(s) for s in msg["sources"]
        ]

    await store.async_save()
    connection.send_result(msg["id"], store.data.title_card.to_dict())


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/set_media_config",
        vol.Optional("variant"): vol.In(list(VALID_MEDIA_VARIANTS)),
        vol.Optional("dashboard_variant"): vol.In(list(VALID_MEDIA_VARIANTS)),
        vol.Optional("room_variants"): {
            str: vol.In(list(VALID_MEDIA_VARIANTS)),
        },
        vol.Optional("extra_entities"): {
            str: [vol.All(str, vol.Match(r"^media_player\.[\w-]+$"))],
        },
        vol.Optional("show_header"): bool,
    }
)
@websocket_api.async_response
async def ws_set_media_config(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Update the media card configuration."""
    if not can_edit(connection.user):
        raise Unauthorized()

    store = _get_store(hass)

    if "variant" in msg:
        store.data.media_card.variant = msg["variant"]
    if "dashboard_variant" in msg:
        store.data.media_card.dashboard_variant = msg["dashboard_variant"]
    if "room_variants" in msg:
        store.data.media_card.room_variants = msg["room_variants"]
    if "extra_entities" in msg:
        ep: dict[str, list[str]] = {}
        for area_id, entities in msg["extra_entities"].items():
            seen: set[str] = set()
            deduped: list[str] = []
            for eid in entities:
                if eid not in seen:
                    seen.add(eid)
                    deduped.append(eid)
            if deduped:
                ep[area_id] = deduped
        store.data.media_card.extra_entities = ep
    if "show_header" in msg:
        store.data.media_card.show_header = msg["show_header"]

    await store.async_save()
    connection.send_result(msg["id"], store.data.media_card.to_dict())


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/set_dashboard",
        vol.Optional("enabled_cards"): [vol.In(list(VALID_DASHBOARD_CARDS))],
        vol.Optional("card_order"): [vol.In(list(VALID_DASHBOARD_CARDS))],
        vol.Optional("hide_header"): bool,
        vol.Optional("hide_sidebar"): bool,
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
    if "card_order" in msg:
        store.data.dashboard.card_order = msg["card_order"]
    if "hide_header" in msg:
        store.data.dashboard.hide_header = msg["hide_header"]
    if "hide_sidebar" in msg:
        store.data.dashboard.hide_sidebar = msg["hide_sidebar"]

    await store.async_save()
    connection.send_result(msg["id"], store.data.dashboard.to_dict())


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/set_presence_config",
        vol.Optional("show_header"): bool,
        vol.Optional("person_entities"): [
            vol.All(str, vol.Match(r"^person\.[\w-]+$"))
        ],
        vol.Optional("smartphone_sensors"): {
            vol.All(str, vol.Match(r"^person\.[\w-]+$")): vol.All(
                str, vol.Match(r"^sensor\.[\w-]+$")
            ),
        },
        vol.Optional("notify_services"): {
            vol.All(str, vol.Match(r"^person\.[\w-]+$")): str,
        },
        vol.Optional("driving_sensors"): {
            vol.All(str, vol.Match(r"^person\.[\w-]+$")): vol.All(
                str, vol.Match(r"^binary_sensor\.[\w-]+$")
            ),
        },
    }
)
@websocket_api.async_response
async def ws_set_presence_config(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Update the presence card configuration."""
    if not can_edit(connection.user):
        raise Unauthorized()

    store = _get_store(hass)

    if "show_header" in msg:
        store.data.presence_card.show_header = msg["show_header"]
    if "person_entities" in msg:
        store.data.presence_card.person_entities = msg["person_entities"]
    if "smartphone_sensors" in msg:
        store.data.presence_card.smartphone_sensors = msg["smartphone_sensors"]
    if "notify_services" in msg:
        store.data.presence_card.notify_services = msg["notify_services"]
    if "driving_sensors" in msg:
        store.data.presence_card.driving_sensors = msg["driving_sensors"]

    await store.async_save()
    connection.send_result(msg["id"], store.data.presence_card.to_dict())


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/set_camera_carousel_config",
        vol.Optional("show_header"): bool,
        vol.Optional("entity_order"): [
            vol.All(str, vol.Match(r"^camera\.[\w-]+$"))
        ],
        vol.Optional("auto_cycle"): bool,
        vol.Optional("cycle_interval"): vol.All(
            _strict_int, vol.Range(min=3, max=60)
        ),
    }
)
@websocket_api.async_response
async def ws_set_camera_carousel_config(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Update the camera carousel card configuration."""
    if not can_edit(connection.user):
        raise Unauthorized()

    store = _get_store(hass)

    if "show_header" in msg:
        store.data.camera_carousel.show_header = msg["show_header"]
    if "entity_order" in msg:
        seen: set[str] = set()
        deduped: list[str] = []
        for eid in msg["entity_order"]:
            if eid not in seen:
                seen.add(eid)
                deduped.append(eid)
        store.data.camera_carousel.entity_order = deduped
    if "auto_cycle" in msg:
        store.data.camera_carousel.auto_cycle = msg["auto_cycle"]
    if "cycle_interval" in msg:
        store.data.camera_carousel.cycle_interval = msg["cycle_interval"]

    await store.async_save()
    connection.send_result(msg["id"], store.data.camera_carousel.to_dict())


VALID_BROWSE_CATEGORIES = frozenset({
    "playlists", "recently_played", "saved_tracks", "saved_albums", "saved_shows",
    "playlist_tracks", "album_tracks", "artist_top_tracks", "recommendations",
})


def _handle_spotify_error(
    connection: websocket_api.ActiveConnection,
    msg_id: int,
    exc: Exception,
) -> None:
    """Send appropriate WS error for Spotify exceptions."""
    if isinstance(exc, SpotifyNotConfiguredError):
        connection.send_error(msg_id, "spotify_not_configured", str(exc))
    elif isinstance(exc, SpotifyAPIError):
        retry_msg = str(exc)
        if exc.retry_after is not None:
            retry_msg = f"{exc} (retry_after={exc.retry_after})"
        connection.send_error(msg_id, "spotify_api_error", retry_msg)
    else:
        connection.send_error(msg_id, "unknown_error", str(exc))


@websocket_api.websocket_command(
    {vol.Required("type"): "glass_cards/spotify_status"}
)
@websocket_api.async_response
async def ws_spotify_status(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Check if the Spotify integration is configured and token is valid."""
    if not can_read(connection.user):
        raise Unauthorized()

    entries = hass.config_entries.async_entries(SPOTIFY_DOMAIN)
    if not entries:
        connection.send_result(msg["id"], {
            "configured": False,
            "reason": "no_integration",
        })
        return

    entry = entries[0]
    token_data = entry.data.get("token")
    if not token_data or "access_token" not in token_data:
        connection.send_result(msg["id"], {
            "configured": False,
            "reason": "no_token",
        })
        return

    connection.send_result(msg["id"], {
        "configured": True,
    })


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/set_spotify_config",
        vol.Optional("show_header"): bool,
        vol.Optional("entity_id"): vol.Any(
            None, "", vol.All(str, vol.Match(r"^media_player\.[\w-]+$"))
        ),
        vol.Optional("sort_order"): vol.In(list(VALID_SORT_ORDERS)),
        vol.Optional("max_items_per_section"): vol.All(int, vol.Range(min=1, max=50)),
        vol.Optional("visible_speakers"): [
            vol.All(str, vol.Match(r"^media_player\.[\w-]+$"))
        ],
    }
)
@websocket_api.async_response
async def ws_set_spotify_config(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Update the Spotify card configuration."""
    if not can_edit(connection.user):
        raise Unauthorized()

    store = _get_store(hass)

    if "show_header" in msg:
        store.data.spotify_card.show_header = msg["show_header"]
    if "entity_id" in msg:
        store.data.spotify_card.entity_id = msg["entity_id"] or ""
    if "sort_order" in msg:
        store.data.spotify_card.sort_order = msg["sort_order"]
    if "max_items_per_section" in msg:
        store.data.spotify_card.max_items_per_section = msg["max_items_per_section"]
    if "visible_speakers" in msg:
        seen: set[str] = set()
        deduped: list[str] = []
        for eid in msg["visible_speakers"]:
            if eid not in seen:
                seen.add(eid)
                deduped.append(eid)
        store.data.spotify_card.visible_speakers = deduped

    await store.async_save()
    connection.send_result(msg["id"], store.data.spotify_card.to_dict())


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/spotify_search",
        vol.Required("query"): vol.All(str, vol.Length(min=1, max=200)),
        vol.Optional("types", default=["track"]): vol.All(
            [vol.In(list(VALID_SEARCH_TYPES))],
            vol.Length(min=1, max=6),
        ),
        vol.Optional("limit", default=10): vol.All(int, vol.Range(min=1, max=50)),
        vol.Optional("offset", default=0): vol.All(int, vol.Range(min=0, max=1000)),
    }
)
@websocket_api.async_response
async def ws_spotify_search(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Search Spotify for content."""
    if not can_read(connection.user):
        raise Unauthorized()

    store = _get_store(hass)
    entity_id = store.data.spotify_card.entity_id
    cache = _get_spotify_cache(hass)

    key = _cache_key(
        "search",
        query=msg["query"],
        types=msg["types"],
        limit=msg["limit"],
        offset=msg["offset"],
        entity_id=entity_id,
    )
    if cache is not None:
        cached = cache.get(key)
        if cached is not None:
            connection.send_result(msg["id"], cached)
            return

    try:
        result = await spotify_search(
            hass,
            query=msg["query"],
            types=msg["types"],
            limit=msg["limit"],
            offset=msg["offset"],
            entity_id=entity_id,
        )
        if cache is not None:
            cache.set(key, result)
        connection.send_result(msg["id"], result)
    except (SpotifyNotConfiguredError, SpotifyAPIError) as exc:
        _handle_spotify_error(connection, msg["id"], exc)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/spotify_browse",
        vol.Required("category"): vol.In(list(VALID_BROWSE_CATEGORIES)),
        vol.Optional("content_id"): vol.All(str, vol.Match(r"^[a-zA-Z0-9:_-]+$")),
        vol.Optional("limit", default=20): vol.All(int, vol.Range(min=1, max=50)),
        vol.Optional("offset", default=0): vol.All(int, vol.Range(min=0, max=1000)),
        vol.Optional("sort_order", default="recent_first"): vol.In(
            list(VALID_SORT_ORDERS)
        ),
        vol.Optional("seed_tracks"): [str],
        vol.Optional("seed_artists"): [str],
        vol.Optional("seed_genres"): [str],
    }
)
@websocket_api.async_response
async def ws_spotify_browse(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Browse the user's Spotify library."""
    if not can_read(connection.user):
        raise Unauthorized()

    store = _get_store(hass)
    entity_id = store.data.spotify_card.entity_id
    cache = _get_spotify_cache(hass)

    category = msg["category"]
    limit = msg["limit"]
    offset = msg["offset"]
    sort_order = msg["sort_order"]
    content_id = msg.get("content_id", "")

    browse_key = _cache_key(
        "browse",
        cat=category,
        limit=limit,
        offset=offset,
        sort_order=sort_order,
        content_id=content_id,
        entity_id=entity_id,
    )
    if cache is not None:
        cached = cache.get(browse_key)
        if cached is not None:
            connection.send_result(msg["id"], cached)
            return

    try:
        result: dict[str, Any]
        if category == "playlists":
            result = await spotify_get_playlists(hass, limit=limit, offset=offset, entity_id=entity_id)
        elif category == "recently_played":
            result = await spotify_get_recently_played(hass, limit=limit, entity_id=entity_id)
        elif category == "saved_tracks":
            result = await spotify_get_saved_tracks(hass, limit=limit, offset=offset, entity_id=entity_id)
        elif category == "saved_albums":
            result = await spotify_get_saved_albums(hass, limit=limit, offset=offset, entity_id=entity_id)
        elif category == "saved_shows":
            result = await spotify_get_saved_shows(hass, limit=limit, offset=offset, entity_id=entity_id)
        elif category == "playlist_tracks":
            if not content_id:
                connection.send_error(
                    msg["id"], "missing_content_id",
                    "content_id is required for playlist_tracks"
                )
                return
            result = await spotify_get_playlist_tracks(
                hass, playlist_id=content_id,
                limit=limit, offset=offset, sort_order=sort_order,
                entity_id=entity_id,
            )
        elif category == "album_tracks":
            if not content_id:
                connection.send_error(
                    msg["id"], "missing_content_id",
                    "content_id is required for album_tracks"
                )
                return
            result = await spotify_get_album(hass, album_id=content_id, entity_id=entity_id)
        elif category == "artist_top_tracks":
            if not content_id:
                connection.send_error(
                    msg["id"], "missing_content_id",
                    "content_id is required for artist_top_tracks"
                )
                return
            result = await spotify_get_artist_top_tracks(hass, artist_id=content_id, entity_id=entity_id)
        elif category == "recommendations":
            result = await spotify_get_recommendations(
                hass,
                seed_tracks=msg.get("seed_tracks"),
                seed_artists=msg.get("seed_artists"),
                seed_genres=msg.get("seed_genres"),
                limit=limit,
                entity_id=entity_id,
            )
        else:
            connection.send_error(msg["id"], "invalid_category", f"Unknown category: {category}")
            return

        if cache is not None:
            cache.set(browse_key, result)
        connection.send_result(msg["id"], result)
    except (SpotifyNotConfiguredError, SpotifyAPIError) as exc:
        _handle_spotify_error(connection, msg["id"], exc)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/spotify_queue",
        vol.Optional("entity_id"): vol.All(str, vol.Match(r"^media_player\.[\w-]+$")),
    }
)
@websocket_api.async_response
async def ws_spotify_get_queue(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Get the current Spotify playback queue."""
    if not can_read(connection.user):
        raise Unauthorized()

    # Use provided entity_id (active speaker) or fall back to config
    entity_id = msg.get("entity_id", "")
    if not entity_id:
        store = _get_store(hass)
        entity_id = store.data.spotify_card.entity_id

    try:
        result = await spotify_get_queue(hass, entity_id=entity_id)
        connection.send_result(msg["id"], result)
    except (SpotifyNotConfiguredError, SpotifyAPIError) as exc:
        _handle_spotify_error(connection, msg["id"], exc)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/spotify_add_to_queue",
        vol.Required("uri"): vol.All(
            str, vol.Match(r"^spotify:(track|episode):[a-zA-Z0-9]+$")
        ),
        vol.Optional("device_id"): str,
    }
)
@websocket_api.async_response
async def ws_spotify_add_to_queue(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Add a track or episode to the Spotify queue."""
    if not can_edit(connection.user):
        raise Unauthorized()

    store = _get_store(hass)
    entity_id = store.data.spotify_card.entity_id

    try:
        await spotify_add_to_queue(
            hass, uri=msg["uri"], device_id=msg.get("device_id"), entity_id=entity_id
        )
        connection.send_result(msg["id"], {"success": True})
    except (SpotifyNotConfiguredError, SpotifyAPIError) as exc:
        _handle_spotify_error(connection, msg["id"], exc)


_TRACK_ID_SCHEMA = vol.All(
    [vol.All(str, vol.Match(r"^[a-zA-Z0-9]+$"))],
    vol.Length(min=1, max=50),
)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/spotify_check_saved",
        vol.Required("track_ids"): _TRACK_ID_SCHEMA,
    }
)
@websocket_api.async_response
async def ws_spotify_check_saved(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Check if tracks are in the user's saved library."""
    if not can_read(connection.user):
        raise Unauthorized()

    store = _get_store(hass)
    entity_id = store.data.spotify_card.entity_id

    try:
        result = await spotify_check_saved_tracks(
            hass, track_ids=msg["track_ids"], entity_id=entity_id
        )
        connection.send_result(msg["id"], result)
    except (SpotifyNotConfiguredError, SpotifyAPIError) as exc:
        _handle_spotify_error(connection, msg["id"], exc)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/spotify_save_tracks",
        vol.Required("track_ids"): _TRACK_ID_SCHEMA,
    }
)
@websocket_api.async_response
async def ws_spotify_save_tracks(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Save tracks to the user's library."""
    if not can_edit(connection.user):
        raise Unauthorized()

    store = _get_store(hass)
    entity_id = store.data.spotify_card.entity_id
    cache = _get_spotify_cache(hass)

    try:
        await spotify_save_tracks(hass, track_ids=msg["track_ids"], entity_id=entity_id)
        if cache is not None:
            cache.invalidate("saved_tracks")
        connection.send_result(msg["id"], {"success": True})
    except (SpotifyNotConfiguredError, SpotifyAPIError) as exc:
        _handle_spotify_error(connection, msg["id"], exc)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/spotify_remove_tracks",
        vol.Required("track_ids"): _TRACK_ID_SCHEMA,
    }
)
@websocket_api.async_response
async def ws_spotify_remove_tracks(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Remove tracks from the user's library."""
    if not can_edit(connection.user):
        raise Unauthorized()

    store = _get_store(hass)
    entity_id = store.data.spotify_card.entity_id
    cache = _get_spotify_cache(hass)

    try:
        await spotify_remove_tracks(hass, track_ids=msg["track_ids"], entity_id=entity_id)
        if cache is not None:
            cache.invalidate("saved_tracks")
        connection.send_result(msg["id"], {"success": True})
    except (SpotifyNotConfiguredError, SpotifyAPIError) as exc:
        _handle_spotify_error(connection, msg["id"], exc)


def _validate_iso_datetime(value: str) -> str:
    """Validate ISO datetime string YYYY-MM-DDTHH:MM."""
    try:
        dt_cls.strptime(value, "%Y-%m-%dT%H:%M")
    except (ValueError, TypeError) as exc:
        raise vol.Invalid(f"Invalid datetime: {value!r}") from exc
    return value


@websocket_api.websocket_command(
    {vol.Required("type"): "glass_cards/get_schedules"}
)
@websocket_api.async_response
async def ws_get_schedules(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return all entity visibility schedules."""
    if not can_read(connection.user):
        raise Unauthorized()

    store = _get_store(hass)
    connection.send_result(
        msg["id"],
        {k: v.to_dict() for k, v in store.data.entity_schedules.items()},
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "glass_cards/set_schedule",
        vol.Required("entity_id"): vol.All(str, vol.Match(r"^[a-z_]+\.[a-z0-9_]+$")),
        vol.Required("periods"): [
            {
                vol.Required("start"): vol.All(str, _validate_iso_datetime),
                vol.Required("end"): vol.All(str, _validate_iso_datetime),
                vol.Optional("recurring", default=False): bool,
            }
        ],
    }
)
@websocket_api.async_response
async def ws_set_schedule(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Set visibility schedule for an entity."""
    if not can_edit(connection.user):
        raise Unauthorized()

    store = _get_store(hass)
    entity_id: str = msg["entity_id"]
    raw_periods: list[dict[str, Any]] = msg["periods"]

    if not raw_periods:
        # Empty periods = remove schedule
        removed = store.data.entity_schedules.pop(entity_id, None)
        if removed is not None:
            await store.async_save()
        connection.send_result(
            msg["id"], {"entity_id": entity_id, "periods": []}
        )
        return

    valid_periods = [
        p for p in raw_periods
        if p["start"] and p["end"] and p["start"] < p["end"]
    ]
    if not valid_periods:
        connection.send_error(
            msg["id"], "invalid_input",
            "All periods were rejected (start must be before end)"
        )
        return
    periods = [
        VisibilityPeriod(
            start=p["start"], end=p["end"], recurring=p.get("recurring", False)
        )
        for p in valid_periods
    ]
    store.data.entity_schedules[entity_id] = EntitySchedule(
        entity_id=entity_id, periods=periods
    )

    await store.async_save()
    schedule = store.data.entity_schedules.get(entity_id)
    connection.send_result(
        msg["id"], schedule.to_dict() if schedule else {"entity_id": entity_id, "periods": []}
    )
