import { GlassCardEditor } from '@glass-cards/base-card';

class GlassClimateCardEditor extends GlassCardEditor {}
try { customElements.define('glass-climate-card-editor', GlassClimateCardEditor); } catch { /* already registered */ }
