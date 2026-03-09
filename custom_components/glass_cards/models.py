"""Data models for Glass Cards."""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any

_ISO_RE = re.compile(r"^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$")
_HEX_COLOR_RE = re.compile(r"^#[0-9a-fA-F]{6}$")

VALID_WEATHER_METRICS = frozenset(
    {"humidity", "wind", "pressure", "uv", "visibility", "sunrise", "sunset"}
)

VALID_DASHBOARD_CARDS = frozenset(
    {"weather", "light", "title", "cover", "spotify"}
)

VALID_SORT_ORDERS = frozenset({"recent_first", "oldest_first"})

VALID_MODE_COLORS = frozenset(
    {"neutral", "success", "warning", "info", "accent", "alert"}
)
DEFAULT_DASHBOARD_CARDS: list[str] = ["weather"]
DEFAULT_CARD_ORDER: list[str] = ["title", "weather", "light", "cover", "spotify"]


@dataclass
class VisibilityPeriod:
    """A date+time visibility period for an entity."""

    start: str  # ISO 8601 "YYYY-MM-DDThh:mm"
    end: str
    recurring: bool = False

    def __post_init__(self) -> None:
        if self.start and not _ISO_RE.match(self.start):
            self.start = ""
        if self.end and not _ISO_RE.match(self.end):
            self.end = ""

    def to_dict(self) -> dict[str, Any]:
        """Serialize to dict."""
        return {"start": self.start, "end": self.end, "recurring": self.recurring}

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> VisibilityPeriod:
        """Deserialize from dict."""
        return cls(
            start=str(data.get("start", "")),
            end=str(data.get("end", "")),
            recurring=bool(data.get("recurring", False)),
        )


@dataclass
class EntitySchedule:
    """Visibility schedule for a single entity."""

    entity_id: str
    periods: list[VisibilityPeriod] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        """Serialize to dict."""
        return {
            "entity_id": self.entity_id,
            "periods": [p.to_dict() for p in self.periods],
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> EntitySchedule:
        """Deserialize from dict."""
        raw_periods = data.get("periods", [])
        return cls(
            entity_id=str(data.get("entity_id", "")),
            periods=[
                VisibilityPeriod.from_dict(p)
                for p in raw_periods
                if isinstance(p, dict)
            ],
        )


@dataclass
class RoomConfig:
    """Configuration for a single room (area)."""

    area_id: str
    card_order: list[str] = field(default_factory=list)
    hidden_entities: list[str] = field(default_factory=list)
    entity_order: list[str] = field(default_factory=list)
    entity_layouts: dict[str, str] = field(default_factory=dict)
    hidden_scenes: list[str] = field(default_factory=list)
    scene_order: list[str] = field(default_factory=list)
    icon: str | None = None
    label: str | None = None
    visible: bool = True

    def to_dict(self) -> dict[str, Any]:
        """Serialize to dict."""
        return {
            "area_id": self.area_id,
            "card_order": self.card_order,
            "hidden_entities": self.hidden_entities,
            "entity_order": self.entity_order,
            "entity_layouts": self.entity_layouts,
            "hidden_scenes": self.hidden_scenes,
            "scene_order": self.scene_order,
            "icon": self.icon,
            "label": self.label,
            "visible": self.visible,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> RoomConfig:
        """Deserialize from dict."""
        raw_order = data.get("card_order", [])
        raw_hidden = data.get("hidden_entities", [])
        raw_entity_order = data.get("entity_order", [])
        raw_layouts = data.get("entity_layouts", {})
        raw_hidden_scenes = data.get("hidden_scenes", [])
        raw_scene_order = data.get("scene_order", [])
        return cls(
            area_id=str(data.get("area_id", "")),
            card_order=[str(x) for x in raw_order if isinstance(x, str)],
            hidden_entities=[str(x) for x in raw_hidden if isinstance(x, str)],
            entity_order=[str(x) for x in raw_entity_order if isinstance(x, str)],
            entity_layouts={
                str(k): str(v)
                for k, v in raw_layouts.items()
                if isinstance(k, str) and isinstance(v, str)
                and v in ("auto", "full", "compact")
            },
            hidden_scenes=[str(x) for x in raw_hidden_scenes if isinstance(x, str)],
            scene_order=[str(x) for x in raw_scene_order if isinstance(x, str)],
            icon=data.get("icon") if isinstance(data.get("icon"), str) else None,
            label=data.get("label") if isinstance(data.get("label"), str) else None,
            visible=bool(data.get("visible", True)),
        )


@dataclass
class NavbarConfig:
    """Configuration for the navbar."""

    room_order: list[str] = field(default_factory=list)
    hidden_rooms: list[str] = field(default_factory=list)
    show_lights: bool = True
    show_temperature: bool = True
    show_humidity: bool = True
    show_media: bool = True
    auto_sort: bool = True
    temp_high: float = 24.0
    temp_low: float = 17.0
    humidity_threshold: float = 65.0

    def to_dict(self) -> dict[str, Any]:
        """Serialize to dict."""
        return {
            "room_order": self.room_order,
            "hidden_rooms": self.hidden_rooms,
            "show_lights": self.show_lights,
            "show_temperature": self.show_temperature,
            "show_humidity": self.show_humidity,
            "show_media": self.show_media,
            "auto_sort": self.auto_sort,
            "temp_high": self.temp_high,
            "temp_low": self.temp_low,
            "humidity_threshold": self.humidity_threshold,
        }

    @staticmethod
    def _safe_float(value: Any, default: float) -> float:
        """Convert to float, returning default on failure."""
        try:
            return float(value) if value is not None else default
        except (ValueError, TypeError):
            return default

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> NavbarConfig:
        """Deserialize from dict."""
        raw_room_order = data.get("room_order", [])
        raw_hidden_rooms = data.get("hidden_rooms", [])
        return cls(
            room_order=[str(x) for x in raw_room_order if isinstance(x, str)],
            hidden_rooms=[str(x) for x in raw_hidden_rooms if isinstance(x, str)],
            show_lights=bool(data.get("show_lights", True)),
            show_temperature=bool(data.get("show_temperature", True)),
            show_humidity=bool(data.get("show_humidity", True)),
            show_media=bool(data.get("show_media", True)),
            auto_sort=bool(data.get("auto_sort", True)),
            temp_high=cls._safe_float(data.get("temp_high"), 24.0),
            temp_low=cls._safe_float(data.get("temp_low"), 17.0),
            humidity_threshold=cls._safe_float(data.get("humidity_threshold"), 65.0),
        )


@dataclass
class WeatherConfig:
    """Configuration for the weather card."""

    entity_id: str = ""
    hidden_metrics: list[str] = field(default_factory=list)
    show_daily: bool = True
    show_hourly: bool = True
    show_header: bool = True

    def to_dict(self) -> dict[str, Any]:
        """Serialize to dict."""
        return {
            "entity_id": self.entity_id,
            "hidden_metrics": self.hidden_metrics,
            "show_daily": self.show_daily,
            "show_hourly": self.show_hourly,
            "show_header": self.show_header,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> WeatherConfig:
        """Deserialize from dict."""
        raw_hidden = data.get("hidden_metrics", [])
        return cls(
            entity_id=str(data.get("entity_id", "")),
            hidden_metrics=[
                str(x) for x in raw_hidden
                if isinstance(x, str) and x in VALID_WEATHER_METRICS
            ],
            show_daily=bool(data.get("show_daily", True)),
            show_hourly=bool(data.get("show_hourly", True)),
            show_header=bool(data.get("show_header", True)),
        )


@dataclass
class TitleModeEntry:
    """A single mode entry for the title card."""

    id: str
    label: str = ""
    icon: str = ""
    color: str = "neutral"

    def to_dict(self) -> dict[str, Any]:
        """Serialize to dict."""
        return {"id": self.id, "label": self.label, "icon": self.icon, "color": self.color}

    @staticmethod
    def _validate_color(color: str) -> str:
        """Accept predefined color names or #rrggbb hex values."""
        if color in VALID_MODE_COLORS:
            return color
        if _HEX_COLOR_RE.match(color):
            return color.lower()
        return "neutral"

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> TitleModeEntry:
        """Deserialize from dict."""
        return cls(
            id=str(data.get("id", "")),
            label=str(data.get("label", "")),
            icon=str(data.get("icon", "")),
            color=cls._validate_color(str(data.get("color", "neutral"))),
        )


@dataclass
class TitleCardConfig:
    """Configuration for the title card."""

    title: str = ""
    mode_entity: str = ""
    modes: list[TitleModeEntry] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        """Serialize to dict."""
        return {
            "title": self.title,
            "mode_entity": self.mode_entity,
            "modes": [m.to_dict() for m in self.modes],
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> TitleCardConfig:
        """Deserialize from dict."""
        raw_modes = data.get("modes", [])
        return cls(
            title=str(data.get("title", "")),
            mode_entity=str(data.get("mode_entity", "")),
            modes=[
                TitleModeEntry.from_dict(m)
                for m in raw_modes
                if isinstance(m, dict)
            ],
        )


@dataclass
class LightCardConfig:
    """Configuration for the light card."""

    show_header: bool = True

    def to_dict(self) -> dict[str, Any]:
        """Serialize to dict."""
        return {"show_header": self.show_header}

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> LightCardConfig:
        """Deserialize from dict."""
        return cls(show_header=bool(data.get("show_header", True)))


DEFAULT_COVER_PRESETS: list[int] = [0, 25, 50, 75, 100]


@dataclass
class CoverCardConfig:
    """Configuration for the cover card."""

    show_header: bool = True
    dashboard_entities: list[str] = field(default_factory=list)
    presets: list[int] = field(default_factory=lambda: list(DEFAULT_COVER_PRESETS))
    entity_presets: dict[str, list[int]] = field(default_factory=dict)

    def to_dict(self) -> dict[str, Any]:
        """Serialize to dict."""
        return {
            "show_header": self.show_header,
            "dashboard_entities": self.dashboard_entities,
            "presets": self.presets,
            "entity_presets": self.entity_presets,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> CoverCardConfig:
        """Deserialize from dict."""
        raw_entities = data.get("dashboard_entities", [])
        raw_presets = data.get("presets")
        presets = list(DEFAULT_COVER_PRESETS)
        if isinstance(raw_presets, list):
            presets = [
                x for x in raw_presets
                if isinstance(x, int) and not isinstance(x, bool) and 0 <= x <= 100
            ]
            if not presets:
                presets = list(DEFAULT_COVER_PRESETS)

        raw_ep = data.get("entity_presets")
        entity_presets: dict[str, list[int]] = {}
        if isinstance(raw_ep, dict):
            for eid, vals in raw_ep.items():
                if not isinstance(eid, str) or not isinstance(vals, list):
                    continue
                valid = [
                    x for x in vals
                    if isinstance(x, int) and not isinstance(x, bool) and 0 <= x <= 100
                ]
                if valid:
                    entity_presets[eid] = sorted(set(valid))

        return cls(
            show_header=bool(data.get("show_header", True)),
            dashboard_entities=[
                str(x) for x in raw_entities if isinstance(x, str)
            ],
            presets=presets,
            entity_presets=entity_presets,
        )


@dataclass
class SpotifyCardConfig:
    """Configuration for the Spotify card."""

    show_header: bool = True
    entity_id: str = ""
    sort_order: str = "recent_first"
    max_items_per_section: int = 6

    def to_dict(self) -> dict[str, Any]:
        """Serialize to dict."""
        return {
            "show_header": self.show_header,
            "entity_id": self.entity_id,
            "sort_order": self.sort_order,
            "max_items_per_section": self.max_items_per_section,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> SpotifyCardConfig:
        """Deserialize from dict."""
        raw_sort = str(data.get("sort_order", "recent_first"))
        raw_max = data.get("max_items_per_section", 6)
        return cls(
            show_header=bool(data.get("show_header", True)),
            entity_id=str(data.get("entity_id", "")),
            sort_order=raw_sort if raw_sort in VALID_SORT_ORDERS else "recent_first",
            max_items_per_section=max(1, min(50, int(raw_max))) if isinstance(raw_max, (int, float)) else 6,
        )


@dataclass
class DashboardConfig:
    """Configuration for dashboard card visibility and order."""

    enabled_cards: list[str] = field(default_factory=lambda: list(DEFAULT_DASHBOARD_CARDS))
    card_order: list[str] = field(default_factory=lambda: list(DEFAULT_CARD_ORDER))

    def to_dict(self) -> dict[str, Any]:
        """Serialize to dict."""
        return {
            "enabled_cards": self.enabled_cards,
            "card_order": self.card_order,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> DashboardConfig:
        """Deserialize from dict."""
        raw = data.get("enabled_cards", list(DEFAULT_DASHBOARD_CARDS))
        raw_order = data.get("card_order", list(DEFAULT_CARD_ORDER))
        order = [
            str(x) for x in raw_order
            if isinstance(x, str) and x in VALID_DASHBOARD_CARDS
        ]
        # Append any valid cards missing from the order
        for c in DEFAULT_CARD_ORDER:
            if c not in order:
                order.append(c)
        return cls(
            enabled_cards=[
                str(x) for x in raw
                if isinstance(x, str) and x in VALID_DASHBOARD_CARDS
            ],
            card_order=order,
        )


@dataclass
class GlassCardsData:
    """Top-level data structure for Glass Cards."""

    navbar: NavbarConfig = field(default_factory=NavbarConfig)
    rooms: dict[str, RoomConfig] = field(default_factory=dict)
    weather: WeatherConfig = field(default_factory=WeatherConfig)
    light_card: LightCardConfig = field(default_factory=LightCardConfig)
    cover_card: CoverCardConfig = field(default_factory=CoverCardConfig)
    title_card: TitleCardConfig = field(default_factory=TitleCardConfig)
    spotify_card: SpotifyCardConfig = field(default_factory=SpotifyCardConfig)
    dashboard: DashboardConfig = field(default_factory=DashboardConfig)
    entity_schedules: dict[str, EntitySchedule] = field(default_factory=dict)

    def to_dict(self) -> dict[str, Any]:
        """Serialize to dict."""
        return {
            "navbar": self.navbar.to_dict(),
            "rooms": {k: v.to_dict() for k, v in self.rooms.items()},
            "weather": self.weather.to_dict(),
            "light_card": self.light_card.to_dict(),
            "cover_card": self.cover_card.to_dict(),
            "title_card": self.title_card.to_dict(),
            "spotify_card": self.spotify_card.to_dict(),
            "dashboard": self.dashboard.to_dict(),
            "entity_schedules": {
                k: v.to_dict() for k, v in self.entity_schedules.items()
            },
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> GlassCardsData:
        """Deserialize from dict."""
        return cls(
            navbar=NavbarConfig.from_dict(data.get("navbar", {})),
            rooms={
                k: RoomConfig.from_dict(v)
                for k, v in data.get("rooms", {}).items()
                if isinstance(v, dict)
            },
            weather=WeatherConfig.from_dict(data.get("weather", {})),
            light_card=LightCardConfig.from_dict(data.get("light_card", {})),
            cover_card=CoverCardConfig.from_dict(data.get("cover_card", {})),
            title_card=TitleCardConfig.from_dict(data.get("title_card", {})),
            spotify_card=SpotifyCardConfig.from_dict(data.get("spotify_card", {})),
            dashboard=DashboardConfig.from_dict(data.get("dashboard", {})),
            entity_schedules={
                k: EntitySchedule.from_dict({**v, "entity_id": k})
                for k, v in data.get("entity_schedules", {}).items()
                if isinstance(v, dict)
            },
        )
