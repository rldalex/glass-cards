import { GlassCardEditor } from '@glass-cards/base-card';

class GlassFanCardEditor extends GlassCardEditor {}
try { customElements.define('glass-fan-card-editor', GlassFanCardEditor); } catch { /* already registered */ }
