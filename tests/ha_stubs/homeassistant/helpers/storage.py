"""Stub for homeassistant.helpers.storage."""

from __future__ import annotations
from typing import Any


class Store:
    """Minimal storage stub."""

    def __init__(self, hass: Any, version: int, key: str) -> None:
        self._data: dict[str, Any] | None = None

    async def async_load(self) -> dict[str, Any] | None:
        return self._data

    async def async_save(self, data: dict[str, Any]) -> None:
        self._data = data
