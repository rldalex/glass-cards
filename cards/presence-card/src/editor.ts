import { GlassCardEditor } from '@glass-cards/base-card';

class GlassPresenceCardEditor extends GlassCardEditor {}
try { customElements.define('glass-presence-card-editor', GlassPresenceCardEditor); } catch { /* already registered */ }
