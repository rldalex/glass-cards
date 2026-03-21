import { GlassCardEditor } from '@glass-cards/base-card';

class GlassTitleCardEditor extends GlassCardEditor {}
try { customElements.define('glass-title-card-editor', GlassTitleCardEditor); } catch { /* already registered */ }
