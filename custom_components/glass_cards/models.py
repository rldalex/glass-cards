"""Data models for Glass Cards."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


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
            area_id=data["area_id"],
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
            temp_high=float(data.get("temp_high", 24.0)),
            temp_low=float(data.get("temp_low", 17.0)),
            humidity_threshold=float(data.get("humidity_threshold", 65.0)),
        )


@dataclass
class GlassCardsData:
    """Top-level data structure for Glass Cards."""

    navbar: NavbarConfig = field(default_factory=NavbarConfig)
    rooms: dict[str, RoomConfig] = field(default_factory=dict)

    def to_dict(self) -> dict[str, Any]:
        """Serialize to dict."""
        return {
            "navbar": self.navbar.to_dict(),
            "rooms": {k: v.to_dict() for k, v in self.rooms.items()},
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> GlassCardsData:
        """Deserialize from dict."""
        return cls(
            navbar=NavbarConfig.from_dict(data.get("navbar", {})),
            rooms={
                k: RoomConfig.from_dict(v)
                for k, v in data.get("rooms", {}).items()
            },
        )
