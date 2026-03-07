"""Data models for Glass Cards."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


@dataclass
class RoomConfig:
    """Configuration for a single room (area)."""

    area_id: str
    card_order: list[str] = field(default_factory=lambda: [
        "light", "media_player", "fan", "cover", "vacuum",
    ])
    hidden_entities: list[str] = field(default_factory=list)
    icon: str | None = None
    label: str | None = None
    visible: bool = True

    def to_dict(self) -> dict[str, Any]:
        """Serialize to dict."""
        return {
            "area_id": self.area_id,
            "card_order": self.card_order,
            "hidden_entities": self.hidden_entities,
            "icon": self.icon,
            "label": self.label,
            "visible": self.visible,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> RoomConfig:
        """Deserialize from dict."""
        default_order = ["light", "media_player", "fan", "cover", "vacuum"]
        raw_order = data.get("card_order", default_order)
        raw_hidden = data.get("hidden_entities", [])
        return cls(
            area_id=data["area_id"],
            card_order=[str(x) for x in raw_order if isinstance(x, str)],
            hidden_entities=[str(x) for x in raw_hidden if isinstance(x, str)],
            icon=data.get("icon") if isinstance(data.get("icon"), str) else None,
            label=data.get("label") if isinstance(data.get("label"), str) else None,
            visible=bool(data.get("visible", True)),
        )


@dataclass
class NavbarConfig:
    """Configuration for the navbar."""

    room_order: list[str] = field(default_factory=list)
    hidden_rooms: list[str] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        """Serialize to dict."""
        return {
            "room_order": self.room_order,
            "hidden_rooms": self.hidden_rooms,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> NavbarConfig:
        """Deserialize from dict."""
        return cls(
            room_order=data.get("room_order", []),
            hidden_rooms=data.get("hidden_rooms", []),
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
