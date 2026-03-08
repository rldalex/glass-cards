"""Tests for Glass Cards data models."""

from custom_components.glass_cards.models import (
    DashboardConfig,
    EntitySchedule,
    GlassCardsData,
    NavbarConfig,
    RoomConfig,
    VisibilityPeriod,
)


class TestRoomConfig:
    """Tests for RoomConfig."""

    def test_default_values(self):
        """Test default room config."""
        room = RoomConfig(area_id="living_room")
        assert room.area_id == "living_room"
        assert room.card_order == []
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
        assert room.card_order == []
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


class TestDashboardConfig:
    """Tests for DashboardConfig."""

    def test_default_values(self):
        """Test default dashboard config."""
        dashboard = DashboardConfig()
        assert dashboard.enabled_cards == ["weather"]

    def test_roundtrip_defaults(self):
        """Constructor and from_dict({}) must produce the same result."""
        assert DashboardConfig().to_dict() == DashboardConfig.from_dict({}).to_dict()

    def test_from_dict_filters_invalid(self):
        """Invalid card keys should be filtered out."""
        dashboard = DashboardConfig.from_dict({"enabled_cards": ["weather", "invalid", "light"]})
        assert dashboard.enabled_cards == ["weather", "light"]


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

    def test_roundtrip_with_schedules(self):
        """Test roundtrip with entity schedules."""
        original = GlassCardsData(
            entity_schedules={
                "light.sapin": EntitySchedule(
                    entity_id="light.sapin",
                    periods=[
                        VisibilityPeriod(start="2026-12-01T18:00", end="2027-01-15T23:59", recurring=True),
                    ],
                ),
            },
        )
        restored = GlassCardsData.from_dict(original.to_dict())
        assert restored.to_dict() == original.to_dict()


class TestVisibilityPeriod:
    """Tests for VisibilityPeriod."""

    def test_to_dict(self):
        """Test serialization."""
        period = VisibilityPeriod(start="2026-12-01T18:00", end="2027-01-15T23:59", recurring=True)
        data = period.to_dict()
        assert data == {"start": "2026-12-01T18:00", "end": "2027-01-15T23:59", "recurring": True}

    def test_from_dict(self):
        """Test deserialization."""
        period = VisibilityPeriod.from_dict({"start": "2026-06-01T00:00", "end": "2026-09-01T00:00"})
        assert period.start == "2026-06-01T00:00"
        assert period.end == "2026-09-01T00:00"
        assert period.recurring is False

    def test_from_dict_defaults(self):
        """Test deserialization with missing fields."""
        period = VisibilityPeriod.from_dict({})
        assert period.start == ""
        assert period.end == ""
        assert period.recurring is False

    def test_roundtrip(self):
        """Test roundtrip."""
        original = VisibilityPeriod(start="2026-12-15T08:00", end="2026-12-25T23:59", recurring=True)
        restored = VisibilityPeriod.from_dict(original.to_dict())
        assert restored.to_dict() == original.to_dict()

    def test_from_dict_invalid_start_end(self):
        """Invalid datetime strings should be sanitized to empty."""
        period = VisibilityPeriod.from_dict({"start": "not-a-date", "end": "also-bad"})
        assert period.start == ""
        assert period.end == ""

        period2 = VisibilityPeriod(start="garbage", end="2026-12-01T18:00")
        assert period2.start == ""
        assert period2.end == "2026-12-01T18:00"

        period3 = VisibilityPeriod(start="2026-12-01T18:00", end="12/01/2026")
        assert period3.start == "2026-12-01T18:00"
        assert period3.end == ""


class TestEntitySchedule:
    """Tests for EntitySchedule."""

    def test_default_values(self):
        """Test default schedule."""
        schedule = EntitySchedule(entity_id="light.sapin")
        assert schedule.entity_id == "light.sapin"
        assert schedule.periods == []

    def test_to_dict(self):
        """Test serialization."""
        schedule = EntitySchedule(
            entity_id="light.sapin",
            periods=[VisibilityPeriod(start="2026-12-01T18:00", end="2027-01-15T23:59")],
        )
        data = schedule.to_dict()
        assert data["entity_id"] == "light.sapin"
        assert len(data["periods"]) == 1
        assert data["periods"][0]["start"] == "2026-12-01T18:00"

    def test_from_dict(self):
        """Test deserialization."""
        schedule = EntitySchedule.from_dict({
            "entity_id": "light.guirlande",
            "periods": [
                {"start": "2026-12-01T00:00", "end": "2027-01-31T23:59", "recurring": True},
                {"start": "2026-06-21T20:00", "end": "2026-06-22T02:00"},
            ],
        })
        assert schedule.entity_id == "light.guirlande"
        assert len(schedule.periods) == 2
        assert schedule.periods[0].recurring is True
        assert schedule.periods[1].recurring is False

    def test_from_dict_filters_invalid_periods(self):
        """Non-dict periods should be filtered out."""
        schedule = EntitySchedule.from_dict({
            "entity_id": "light.test",
            "periods": [
                {"start": "2026-01-01T00:00", "end": "2026-01-31T23:59"},
                "invalid",
                42,
            ],
        })
        assert len(schedule.periods) == 1

    def test_from_dict_malformed_periods(self):
        """Dicts with missing or invalid start/end keys should produce sanitized periods."""
        schedule = EntitySchedule.from_dict({
            "entity_id": "light.test",
            "periods": [
                {"start": "2026-01-01T00:00"},
                {"end": "2026-12-31T23:59"},
                {"start": "bad", "end": "also-bad"},
                {},
            ],
        })
        assert schedule.entity_id == "light.test"
        assert len(schedule.periods) == 4
        assert schedule.periods[0].start == "2026-01-01T00:00"
        assert schedule.periods[0].end == ""
        assert schedule.periods[1].start == ""
        assert schedule.periods[1].end == "2026-12-31T23:59"
        assert schedule.periods[2].start == ""
        assert schedule.periods[2].end == ""
        assert schedule.periods[3].start == ""
        assert schedule.periods[3].end == ""

    def test_roundtrip(self):
        """Test roundtrip."""
        original = EntitySchedule(
            entity_id="light.sapin",
            periods=[
                VisibilityPeriod(start="2026-12-01T18:00", end="2027-01-15T23:59", recurring=True),
                VisibilityPeriod(start="2026-06-21T20:00", end="2026-06-22T02:00"),
            ],
        )
        restored = EntitySchedule.from_dict(original.to_dict())
        assert restored.to_dict() == original.to_dict()
