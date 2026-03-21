"""Tests for Glass Cards permissions."""

from unittest.mock import MagicMock

from custom_components.glass_cards.permissions import can_edit, can_read


class TestCanRead:
    """Tests for can_read."""

    def test_authenticated_user_can_read(self, mock_owner_user):
        """Any authenticated user can read."""
        assert can_read(mock_owner_user) is True

    def test_regular_user_can_read(self, mock_regular_user):
        """Regular user can read."""
        assert can_read(mock_regular_user) is True

    def test_none_cannot_read(self):
        """None user cannot read."""
        assert can_read(None) is False


class TestCanEdit:
    """Tests for can_edit."""

    def test_owner_can_edit(self, mock_owner_user):
        """Owner can always edit."""
        assert can_edit(mock_owner_user) is True

    def test_admin_can_edit(self):
        """Admin can always edit."""
        user = MagicMock()
        user.is_owner = False
        user.is_admin = True
        assert can_edit(user) is True

    def test_regular_user_cannot_edit(self, mock_regular_user):
        """Regular user cannot edit."""
        assert can_edit(mock_regular_user) is False

    def test_none_cannot_edit(self):
        """None user cannot edit."""
        assert can_edit(None) is False
