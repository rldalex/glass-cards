import { GlassCardEditor } from '@glass-cards/base-card';

class GlassRoomPopupEditor extends GlassCardEditor {}
try { customElements.define('glass-room-popup-editor', GlassRoomPopupEditor); } catch { /* already registered */ }
