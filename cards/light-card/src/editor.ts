import { GlassCardEditor } from '@glass-cards/base-card';

class GlassLightCardEditor extends GlassCardEditor {}
try { customElements.define('glass-light-card-editor', GlassLightCardEditor); } catch { /* already registered */ }
