"""Tests for Glass Cards data models."""

from custom_components.glass_cards.models import (
    GlassCardsData,
    NavbarConfig,
    RoomConfig,
)


class TestRoomConfig:
    """Tests for RoomConfig."""

    def test_default_values(self):
        """Test default room config."""
        room = RoomConfig(area_id="living_room")
        assert room.area_id == "living_room"
        assert room.card_order == ["light", "media_player", "fan", "cover", "vacuum"]
        assert room.hidden_entities == []
        assert room.icon is None
        assert room.label is None
        assert room.visible is True

    def test_to_dict(self):
        """Test serialization."""
        room = RoomConfig(area_id="kitchen", icon="mdi:silverware")
        data = room.to_dict()
        assert data["area_id"] == "kitchen"
        assert data["icon"] == "mdi:silverware"
        assert data["visible"] is True

    def test_from_dict(self):
        """Test deserialization."""
        data = {
            "area_id": "bedroom",
            "card_order": ["light", "cover"],
            "hidden_entities": ["light.old_lamp"],
            "icon": "mdi:bed",
            "label": "Master Bedroom",
            "visible": False,
        }
        room = RoomConfig.from_dict(data)
        assert room.area_id == "bedroom"
        assert room.card_order == ["light", "cover"]
        assert room.hidden_entities == ["light.old_lamp"]
        assert room.icon == "mdi:bed"
        assert room.label == "Master Bedroom"
        assert room.visible is False

    def test_from_dict_defaults(self):
        """Test deserialization with missing fields uses defaults."""
        room = RoomConfig.from_dict({"area_id": "garage"})
        assert room.area_id == "garage"
        assert room.card_order == ["light", "media_player", "fan", "cover", "vacuum"]
        assert room.visible is True

    def test_roundtrip(self):
        """Test serialize -> deserialize roundtrip."""
        original = RoomConfig(
            area_id="office",
            card_order=["light", "media_player"],
            hidden_entities=["light.desk"],
            icon="mdi:desk",
            label="Office",
            visible=True,
        )
        restored = RoomConfig.from_dict(original.to_dict())
        assert restored.to_dict() == original.to_dict()


class TestNavbarConfig:
    """Tests for NavbarConfig."""

    def test_default_values(self):
        """Test default navbar config."""
        navbar = NavbarConfig()
        assert navbar.room_order == []
        assert navbar.hidden_rooms == []

    def test_to_dict(self):
        """Test serialization."""
        navbar = NavbarConfig(room_order=["living_room", "kitchen"])
        data = navbar.to_dict()
        assert data["room_order"] == ["living_room", "kitchen"]

    def test_from_dict(self):
        """Test deserialization."""
        navbar = NavbarConfig.from_dict({"room_order": ["a", "b"], "hidden_rooms": ["c"]})
        assert navbar.room_order == ["a", "b"]
        assert navbar.hidden_rooms == ["c"]

    def test_from_dict_empty(self):
        """Test deserialization with empty dict."""
        navbar = NavbarConfig.from_dict({})
        assert navbar.room_order == []
        assert navbar.hidden_rooms == []


class TestGlassCardsData:
    """Tests for GlassCardsData."""

    def test_default_values(self):
        """Test default data."""
        data = GlassCardsData()
        assert data.rooms == {}
        assert data.navbar.room_order == []

    def test_roundtrip(self):
        """Test full roundtrip."""
        original = GlassCardsData(
            navbar=NavbarConfig(room_order=["a", "b"]),
            rooms={
                "a": RoomConfig(area_id="a", icon="mdi:sofa"),
                "b": RoomConfig(area_id="b", label="Kitchen"),
            },
        )
        restored = GlassCardsData.from_dict(original.to_dict())
        assert restored.to_dict() == original.to_dict()

    def test_from_dict_empty(self):
        """Test deserialization from empty dict."""
        data = GlassCardsData.from_dict({})
        assert data.rooms == {}
        assert data.navbar.room_order == []
