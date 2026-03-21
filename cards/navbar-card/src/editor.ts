import { GlassCardEditor } from '@glass-cards/base-card';

class GlassNavbarCardEditor extends GlassCardEditor {}
try { customElements.define('glass-navbar-card-editor', GlassNavbarCardEditor); } catch { /* already registered */ }
