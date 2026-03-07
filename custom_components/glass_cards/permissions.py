"""Permission helpers for Glass Cards."""

from __future__ import annotations

from typing import TYPE_CHECKING

from homeassistant.auth.permissions.const import (
    POLICY_CONTROL,
    POLICY_EDIT,
    POLICY_READ,
)

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant
    from homeassistant.auth.models import User


def can_read(user: User) -> bool:
    """Check if user has read permissions (all authenticated users)."""
    return user is not None


def can_control(user: User) -> bool:
    """Check if user can control entities."""
    if user.is_owner or user.is_admin:
        return True
    return _has_entity_permission(user, POLICY_CONTROL)


def can_edit(user: User, hass: HomeAssistant | None = None) -> bool:
    """Check if user can edit Glass Cards configuration."""
    if user.is_owner or user.is_admin:
        return True
    return _has_entity_permission(user, POLICY_EDIT)


def _has_entity_permission(user: User, policy: str) -> bool:
    """Check if a user has a specific entity permission."""
    if user.permissions is None:
        return False
    entity_perms = user.permissions.check_entity
    # User has the permission if the general entity policy is granted
    return bool(entity_perms("", policy))


# Re-export for convenience
__all__ = [
    "can_read",
    "can_control",
    "can_edit",
    "POLICY_READ",
    "POLICY_CONTROL",
    "POLICY_EDIT",
]
