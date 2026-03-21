import { GlassCardEditor } from '@glass-cards/base-card';

class GlassSpotifyCardEditor extends GlassCardEditor {}
try { customElements.define('glass-spotify-card-editor', GlassSpotifyCardEditor); } catch { /* already registered */ }
