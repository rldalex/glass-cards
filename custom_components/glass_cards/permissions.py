"""Permission helpers for Glass Cards."""

from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from homeassistant.auth.models import User


def can_read(user: User) -> bool:
    """Check if user has read permissions (all authenticated users)."""
    return user is not None


def can_control(user: User) -> bool:
    """Check if user can control entities (admin or owner)."""
    if user is None:
        return False
    return user.is_owner or user.is_admin


def can_edit(user: User) -> bool:
    """Check if user can edit Glass Cards configuration (admin or owner)."""
    if user is None:
        return False
    return user.is_owner or user.is_admin
