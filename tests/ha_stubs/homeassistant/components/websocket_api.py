"""Stub for homeassistant.components.websocket_api."""

from __future__ import annotations
from typing import Any, Callable
from unittest.mock import MagicMock


class ActiveConnection:
    """Minimal stub for ActiveConnection."""

    def __init__(self) -> None:
        self.user: Any = None
        self.send_result = MagicMock()
        self.send_error = MagicMock()


def websocket_command(schema: dict) -> Callable:
    """Decorator stub — just passes through."""
    def decorator(func: Callable) -> Callable:
        func.schema = schema
        return func
    return decorator


def async_response(func: Callable) -> Callable:
    """Decorator stub — just passes through."""
    return func


def async_register_command(hass: Any, handler: Callable) -> None:
    """Register stub — no-op."""
    pass
