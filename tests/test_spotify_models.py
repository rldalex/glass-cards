"""Tests for Spotify-related data models."""

from custom_components.glass_cards.models import (
    GlassCardsData,
    SpotifyCardConfig,
)


class TestSpotifyCardConfig:
    """Tests for SpotifyCardConfig."""

    def test_default_values(self):
        """Test default Spotify config."""
        config = SpotifyCardConfig()
        assert config.show_header is True
        assert config.entity_id == ""
        assert config.sort_order == "recent_first"
        assert config.max_items_per_section == 6

    def test_to_dict(self):
        """Test serialization."""
        config = SpotifyCardConfig(
            show_header=False,
            entity_id="media_player.spotify_john",
            sort_order="oldest_first",
            max_items_per_section=10,
        )
        data = config.to_dict()
        assert data == {
            "show_header": False,
            "entity_id": "media_player.spotify_john",
            "sort_order": "oldest_first",
            "max_items_per_section": 10,
            "visible_speakers": [],
        }

    def test_from_dict(self):
        """Test deserialization."""
        config = SpotifyCardConfig.from_dict({
            "show_header": False,
            "entity_id": "media_player.spotify_jane",
            "sort_order": "oldest_first",
        })
        assert config.show_header is False
        assert config.entity_id == "media_player.spotify_jane"
        assert config.sort_order == "oldest_first"

    def test_from_dict_defaults(self):
        """Test deserialization with empty dict uses defaults."""
        config = SpotifyCardConfig.from_dict({})
        assert config.show_header is True
        assert config.entity_id == ""
        assert config.sort_order == "recent_first"
        assert config.max_items_per_section == 6

    def test_from_dict_invalid_sort_order(self):
        """Invalid sort_order should fallback to recent_first."""
        config = SpotifyCardConfig.from_dict({"sort_order": "invalid"})
        assert config.sort_order == "recent_first"

    def test_max_items_clamped(self):
        """max_items_per_section should be clamped to 1-50."""
        assert SpotifyCardConfig.from_dict({"max_items_per_section": 0}).max_items_per_section == 1
        assert SpotifyCardConfig.from_dict({"max_items_per_section": 100}).max_items_per_section == 50
        assert SpotifyCardConfig.from_dict({"max_items_per_section": "bad"}).max_items_per_section == 6

    def test_roundtrip(self):
        """Test serialize -> deserialize roundtrip."""
        original = SpotifyCardConfig(
            show_header=False,
            entity_id="media_player.spotify_test",
            sort_order="oldest_first",
        )
        restored = SpotifyCardConfig.from_dict(original.to_dict())
        assert restored.to_dict() == original.to_dict()


class TestGlassCardsDataWithSpotify:
    """Tests for GlassCardsData with spotify_card field."""

    def test_default_includes_spotify(self):
        """Default GlassCardsData should include spotify_card."""
        data = GlassCardsData()
        assert data.spotify_card.show_header is True
        assert data.spotify_card.entity_id == ""
        assert data.spotify_card.sort_order == "recent_first"

    def test_to_dict_includes_spotify(self):
        """Serialized data should include spotify_card."""
        data = GlassCardsData()
        d = data.to_dict()
        assert "spotify_card" in d
        assert d["spotify_card"]["show_header"] is True

    def test_from_dict_includes_spotify(self):
        """Deserialized data should include spotify_card."""
        data = GlassCardsData.from_dict({
            "spotify_card": {
                "show_header": False,
                "entity_id": "media_player.spotify_x",
                "sort_order": "oldest_first",
            }
        })
        assert data.spotify_card.show_header is False
        assert data.spotify_card.entity_id == "media_player.spotify_x"
        assert data.spotify_card.sort_order == "oldest_first"

    def test_roundtrip_with_spotify(self):
        """Test full roundtrip with spotify_card."""
        original = GlassCardsData(
            spotify_card=SpotifyCardConfig(
                show_header=False,
                entity_id="media_player.spotify_user",
                sort_order="oldest_first",
            ),
        )
        restored = GlassCardsData.from_dict(original.to_dict())
        assert restored.to_dict() == original.to_dict()

    def test_spotify_in_valid_dashboard_cards(self):
        """spotify should be a valid dashboard card."""
        from custom_components.glass_cards.models import VALID_DASHBOARD_CARDS
        assert "spotify" in VALID_DASHBOARD_CARDS

    def test_dashboard_config_accepts_spotify(self):
        """DashboardConfig should accept spotify in enabled_cards."""
        from custom_components.glass_cards.models import DashboardConfig
        dashboard = DashboardConfig.from_dict(
            {"enabled_cards": ["weather", "spotify"]}
        )
        assert "spotify" in dashboard.enabled_cards
