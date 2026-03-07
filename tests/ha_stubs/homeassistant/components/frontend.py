"""Stub for homeassistant.components.frontend."""

from __future__ import annotations
from typing import Any


def add_extra_js_url(hass: Any, url: str) -> None:
    """No-op stub."""
    pass


def async_register_built_in_panel(
    hass: Any,
    component_name: str = "",
    sidebar_title: str = "",
    sidebar_icon: str = "",
    frontend_url_path: str = "",
    config: dict[str, Any] | None = None,
    require_admin: bool = False,
) -> None:
    """No-op stub."""
    pass
