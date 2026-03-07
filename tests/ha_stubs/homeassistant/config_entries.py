"""Stub for homeassistant.config_entries."""

from __future__ import annotations
from typing import Any


class ConfigEntry:
    """Minimal config entry stub."""
    pass


class ConfigFlowResult(dict):
    """Minimal config flow result stub."""
    pass


class ConfigFlow:
    """Minimal config flow stub."""

    VERSION = 1

    def __init_subclass__(cls, domain: str = "", **kwargs: Any) -> None:
        super().__init_subclass__(**kwargs)
        cls._domain = domain

    def _async_current_entries(self) -> list:
        return []

    def async_abort(self, *, reason: str) -> ConfigFlowResult:
        return ConfigFlowResult(type="abort", reason=reason)

    def async_create_entry(self, *, title: str, data: dict) -> ConfigFlowResult:
        return ConfigFlowResult(type="create_entry", title=title, data=data)

    def async_show_form(self, *, step_id: str) -> ConfigFlowResult:
        return ConfigFlowResult(type="form", step_id=step_id)
