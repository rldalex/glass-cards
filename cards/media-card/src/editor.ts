import { GlassCardEditor } from '@glass-cards/base-card';

class GlassMediaCardEditor extends GlassCardEditor {}
try { customElements.define('glass-media-card-editor', GlassMediaCardEditor); } catch { /* already registered */ }
