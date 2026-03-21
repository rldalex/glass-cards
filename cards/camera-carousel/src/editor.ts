import { GlassCardEditor } from '@glass-cards/base-card';

class GlassCameraCarouselCardEditor extends GlassCardEditor {}
try { customElements.define('glass-camera-carousel-card-editor', GlassCameraCarouselCardEditor); } catch { /* already registered */ }
