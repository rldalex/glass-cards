// Weather-card harness — covers conditions + daily/hourly forecast.

import { layoutHarness, rowEl, chipEl } from './setup-climate';
import { makeCardHass } from './mock-card-hass';
import type { HomeAssistant } from '@glass-cards/base-card';

interface DailyForecast { datetime: string; condition: string; temperature: number; templow?: number; precipitation_probability?: number }
interface HourlyForecast { datetime: string; condition: string; temperature: number; precipitation_probability?: number }

interface Scenario {
  id: string; label: string; description: string;
  state: string;
  attrs: Record<string, unknown>;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

function isoOffset(hours: number): string {
  const d = new Date();
  d.setHours(d.getHours() + hours, 0, 0, 0);
  return d.toISOString();
}
function isoDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(12, 0, 0, 0);
  return d.toISOString();
}

const SCENARIOS: Scenario[] = [
  {
    id: 'sunny',
    label: 'Ensoleillé',
    description: '22°, ciel dégagé, prévision stable',
    state: 'sunny',
    attrs: {
      friendly_name: 'Maison', temperature: 22, humidity: 55, pressure: 1015, wind_bearing: 90, wind_speed: 12, visibility: 30, uv_index: 6,
      temperature_unit: '°C',
    },
    hourly: Array.from({ length: 10 }, (_, i) => ({ datetime: isoOffset(i + 1), condition: 'sunny', temperature: 22 + Math.sin(i / 2) * 3, precipitation_probability: 0 })),
    daily: Array.from({ length: 7 }, (_, i) => ({ datetime: isoDays(i + 1), condition: i % 3 === 0 ? 'sunny' : 'partlycloudy', temperature: 24 + i, templow: 14 + i, precipitation_probability: i === 4 ? 20 : 0 })),
  },
  {
    id: 'partly_cloudy',
    label: 'Partiellement nuageux',
    description: '18°, alternance soleil/nuages',
    state: 'partlycloudy',
    attrs: { friendly_name: 'Maison', temperature: 18, humidity: 68, pressure: 1012, wind_bearing: 220, wind_speed: 18, visibility: 22, uv_index: 4, temperature_unit: '°C' },
    hourly: Array.from({ length: 10 }, (_, i) => ({ datetime: isoOffset(i + 1), condition: i % 2 === 0 ? 'partlycloudy' : 'cloudy', temperature: 18 + Math.sin(i / 3) * 2, precipitation_probability: 10 })),
    daily: Array.from({ length: 7 }, (_, i) => ({ datetime: isoDays(i + 1), condition: 'partlycloudy', temperature: 19 + i % 3, templow: 11, precipitation_probability: 15 + (i * 5) % 30 })),
  },
  {
    id: 'rainy',
    label: 'Pluie',
    description: '14°, averses persistantes',
    state: 'rainy',
    attrs: { friendly_name: 'Maison', temperature: 14, humidity: 88, pressure: 1003, wind_bearing: 280, wind_speed: 28, visibility: 8, uv_index: 1, temperature_unit: '°C' },
    hourly: Array.from({ length: 10 }, (_, i) => ({ datetime: isoOffset(i + 1), condition: i < 4 ? 'rainy' : 'pouring', temperature: 14, precipitation_probability: 75 + i * 2 })),
    daily: Array.from({ length: 7 }, (_, i) => ({ datetime: isoDays(i + 1), condition: i < 3 ? 'rainy' : 'cloudy', temperature: 15, templow: 9, precipitation_probability: i < 3 ? 80 : 30 })),
  },
  {
    id: 'snowy',
    label: 'Neige',
    description: '-2°, neige légère',
    state: 'snowy',
    attrs: { friendly_name: 'Maison', temperature: -2, humidity: 90, pressure: 1018, wind_bearing: 30, wind_speed: 8, visibility: 5, uv_index: 0, temperature_unit: '°C' },
    hourly: Array.from({ length: 10 }, (_, i) => ({ datetime: isoOffset(i + 1), condition: 'snowy', temperature: -2 - i * 0.3, precipitation_probability: 90 })),
    daily: Array.from({ length: 7 }, (_, i) => ({ datetime: isoDays(i + 1), condition: i < 2 ? 'snowy' : 'cloudy', temperature: i < 2 ? -1 : 2, templow: -5 + i, precipitation_probability: i < 2 ? 90 : 20 })),
  },
  {
    id: 'stormy',
    label: 'Orage',
    description: '16°, éclairs et pluie battante',
    state: 'lightning-rainy',
    attrs: { friendly_name: 'Maison', temperature: 16, humidity: 85, pressure: 998, wind_bearing: 200, wind_speed: 45, visibility: 3, uv_index: 0, temperature_unit: '°C' },
    hourly: Array.from({ length: 10 }, (_, i) => ({ datetime: isoOffset(i + 1), condition: i < 5 ? 'lightning-rainy' : 'rainy', temperature: 16, precipitation_probability: 95 })),
    daily: Array.from({ length: 7 }, (_, i) => ({ datetime: isoDays(i + 1), condition: i === 0 ? 'lightning-rainy' : i < 3 ? 'rainy' : 'cloudy', temperature: 17, templow: 12, precipitation_probability: i < 2 ? 90 : 40 })),
  },
  {
    id: 'clear_night',
    label: 'Nuit claire',
    description: '12°, ciel étoilé',
    state: 'clear-night',
    attrs: { friendly_name: 'Maison', temperature: 12, humidity: 72, pressure: 1020, wind_bearing: 0, wind_speed: 4, visibility: 35, uv_index: 0, temperature_unit: '°C' },
    hourly: Array.from({ length: 10 }, (_, i) => ({ datetime: isoOffset(i + 1), condition: 'clear-night', temperature: 11 - i * 0.2, precipitation_probability: 0 })),
    daily: Array.from({ length: 7 }, (_, i) => ({ datetime: isoDays(i + 1), condition: 'sunny', temperature: 20 + i % 3, templow: 10, precipitation_probability: 5 })),
  },
];

export async function setupWeather(): Promise<void> {
  await import('../cards/weather-card/src/index');

  let current = SCENARIOS[0];

  const { toolbar, stage } = layoutHarness();
  const wrap = document.createElement('div');
  wrap.style.cssText = 'width:100%; max-width:500px; display:flex; flex-direction:column; gap:12px;';
  stage.appendChild(wrap);

  const card = document.createElement('glass-weather-card') as HTMLElement & { hass?: HomeAssistant };
  wrap.appendChild(card);

  function renderToolbar(): void {
    toolbar.replaceChildren();
    toolbar.appendChild(rowEl('Scenario', SCENARIOS.map((s) =>
      chipEl(s.label, s.id === current.id, () => { current = s; rebuild(); renderToolbar(); }),
    )));
    const meta = document.createElement('div');
    meta.style.cssText = 'font-size:12px; color:rgba(255,255,255,0.5); margin-top:2px;';
    meta.textContent = current.description;
    toolbar.appendChild(meta);
  }

  function rebuild(): void {
    const hass = makeCardHass({
      entities: [{
        entity_id: 'weather.maison',
        state: current.state,
        attributes: current.attrs,
      }],
      cardConfig: { weather: { entity_id: 'weather.maison', hidden_metrics: [], show_daily: true, show_hourly: true, show_header: true } },
      subscriptionHandler: (msg, push) => {
        if (msg.type === 'weather/subscribe_forecast') {
          const type = msg.forecast_type;
          // Initial push then noop
          setTimeout(() => {
            push({ forecast: type === 'daily' ? current.daily : current.hourly });
          }, 50);
          return () => {};
        }
      },
    }, (h) => { card.hass = h; });
    card.hass = hass;
  }

  renderToolbar();
  rebuild();
}
