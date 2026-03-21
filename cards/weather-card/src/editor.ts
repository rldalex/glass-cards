import { GlassCardEditor } from '@glass-cards/base-card';

class GlassWeatherCardEditor extends GlassCardEditor {}
try { customElements.define('glass-weather-card-editor', GlassWeatherCardEditor); } catch { /* already registered */ }
