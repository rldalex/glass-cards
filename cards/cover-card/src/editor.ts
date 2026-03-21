import { GlassCardEditor } from '@glass-cards/base-card';

class GlassCoverCardEditor extends GlassCardEditor {}
try { customElements.define('glass-cover-card-editor', GlassCoverCardEditor); } catch { /* already registered */ }
