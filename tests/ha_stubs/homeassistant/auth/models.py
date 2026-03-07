"""Stub for homeassistant.auth.models."""


class User:
    """Minimal user stub."""

    def __init__(self) -> None:
        self.name: str = ""
        self.is_owner: bool = False
        self.is_admin: bool = False
        self.permissions = None
