"""Stub for homeassistant.exceptions."""


class HomeAssistantError(Exception):
    """Base class for Home Assistant errors."""
    pass


class Unauthorized(Exception):
    """Raised when user is not authorized."""
    pass
