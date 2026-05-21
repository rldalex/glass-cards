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

// Base attribute helper — guarantees feels_like, wind_speed_unit and friendly_name
// are always present so the card sees what HA really delivers in production.
function attrs(
  friendly: string, temp: number, feels: number, hum: number, pressure: number,
  windDeg: number, windKmh: number, vis: number, uv: number,
  tempUnit = '°C', windUnit = 'km/h',
): Record<string, unknown> {
  return {
    friendly_name: friendly,
    temperature: temp,
    apparent_temperature: feels,
    humidity: hum,
    pressure,
    wind_bearing: windDeg,
    wind_speed: windKmh,
    wind_speed_unit: windUnit,
    visibility: vis,
    uv_index: uv,
    temperature_unit: tempUnit,
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: 'sunny',
    label: 'Ensoleillé',
    description: '22°, ciel dégagé, prévision stable',
    state: 'sunny',
    attrs: attrs('Maison', 22, 23, 55, 1015, 90, 12, 30, 6),
    hourly: Array.from({ length: 10 }, (_, i) => ({ datetime: isoOffset(i + 1), condition: 'sunny', temperature: 22 + Math.sin(i / 2) * 3, precipitation_probability: 0 })),
    daily: Array.from({ length: 7 }, (_, i) => ({ datetime: isoDays(i + 1), condition: i % 3 === 0 ? 'sunny' : 'partlycloudy', temperature: 24 + i, templow: 14 + i, precipitation_probability: i === 4 ? 20 : 0 })),
  },
  {
    id: 'partly_cloudy',
    label: 'Partiellement nuageux',
    description: '18°, alternance soleil/nuages',
    state: 'partlycloudy',
    attrs: attrs('Maison', 18, 17, 68, 1012, 220, 18, 22, 4),
    hourly: Array.from({ length: 10 }, (_, i) => ({ datetime: isoOffset(i + 1), condition: i % 2 === 0 ? 'partlycloudy' : 'cloudy', temperature: 18 + Math.sin(i / 3) * 2, precipitation_probability: 10 })),
    daily: Array.from({ length: 7 }, (_, i) => ({ datetime: isoDays(i + 1), condition: 'partlycloudy', temperature: 19 + i % 3, templow: 11, precipitation_probability: 15 + (i * 5) % 30 })),
  },
  {
    id: 'rainy',
    label: 'Pluie',
    description: '14°, averses persistantes, ressenti 11°',
    state: 'rainy',
    attrs: attrs('Maison', 14, 11, 88, 1003, 280, 28, 8, 1),
    hourly: Array.from({ length: 10 }, (_, i) => ({ datetime: isoOffset(i + 1), condition: i < 4 ? 'rainy' : 'pouring', temperature: 14 + Math.sin(i / 4), precipitation_probability: 75 + i * 2 })),
    daily: Array.from({ length: 7 }, (_, i) => ({ datetime: isoDays(i + 1), condition: i < 3 ? 'rainy' : 'cloudy', temperature: 15 + (i % 2), templow: 9 + (i % 3), precipitation_probability: i < 3 ? 80 : 30 })),
  },
  {
    id: 'snowy',
    label: 'Neige',
    description: '-2°, ressenti -7°, neige légère',
    state: 'snowy',
    attrs: attrs('Chalet', -2, -7, 90, 1018, 30, 8, 5, 0),
    hourly: Array.from({ length: 10 }, (_, i) => ({ datetime: isoOffset(i + 1), condition: 'snowy', temperature: -2 - i * 0.3, precipitation_probability: 90 })),
    daily: Array.from({ length: 7 }, (_, i) => ({ datetime: isoDays(i + 1), condition: i < 2 ? 'snowy' : 'cloudy', temperature: i < 2 ? -1 : 2, templow: -5 + i, precipitation_probability: i < 2 ? 90 : 20 })),
  },
  {
    id: 'stormy',
    label: 'Orage',
    description: '16°, éclairs et pluie battante',
    state: 'lightning-rainy',
    attrs: attrs('Maison', 16, 13, 85, 998, 200, 45, 3, 0),
    hourly: Array.from({ length: 10 }, (_, i) => ({ datetime: isoOffset(i + 1), condition: i < 5 ? 'lightning-rainy' : 'rainy', temperature: 16 + Math.sin(i), precipitation_probability: 95 })),
    daily: Array.from({ length: 7 }, (_, i) => ({ datetime: isoDays(i + 1), condition: i === 0 ? 'lightning-rainy' : i < 3 ? 'rainy' : 'cloudy', temperature: 17 + (i % 2), templow: 12, precipitation_probability: i < 2 ? 90 : 40 })),
  },
  {
    id: 'foggy',
    label: 'Brouillard',
    description: '9°, visibilité 0.5km',
    state: 'fog',
    attrs: attrs('Maison', 9, 8, 95, 1023, 180, 5, 0.5, 0),
    hourly: Array.from({ length: 10 }, (_, i) => ({ datetime: isoOffset(i + 1), condition: i < 6 ? 'fog' : 'cloudy', temperature: 9 + i * 0.4, precipitation_probability: 5 })),
    daily: Array.from({ length: 7 }, (_, i) => ({ datetime: isoDays(i + 1), condition: i === 0 ? 'fog' : 'cloudy', temperature: 12 + (i % 4), templow: 6 + (i % 3), precipitation_probability: 10 })),
  },
  {
    id: 'windy',
    label: 'Vent fort',
    description: '12°, rafales 65km/h secteur N-O',
    state: 'windy',
    attrs: attrs('Maison', 12, 7, 60, 1005, 310, 65, 25, 2),
    hourly: Array.from({ length: 10 }, (_, i) => ({ datetime: isoOffset(i + 1), condition: i < 5 ? 'windy' : 'cloudy', temperature: 12 - i * 0.2, precipitation_probability: 15 })),
    daily: Array.from({ length: 7 }, (_, i) => ({ datetime: isoDays(i + 1), condition: i < 2 ? 'windy' : i < 4 ? 'cloudy' : 'partlycloudy', temperature: 13 + (i % 3), templow: 7, precipitation_probability: i < 2 ? 30 : 10 })),
  },
  {
    id: 'clear_night',
    label: 'Nuit claire',
    description: '12°, ciel étoilé',
    state: 'clear-night',
    attrs: attrs('Maison', 12, 10, 72, 1020, 0, 4, 35, 0),
    hourly: Array.from({ length: 10 }, (_, i) => ({ datetime: isoOffset(i + 1), condition: i < 6 ? 'clear-night' : 'sunny', temperature: 11 - i * 0.2 + (i > 6 ? (i - 6) * 1.5 : 0), precipitation_probability: 0 })),
    daily: Array.from({ length: 7 }, (_, i) => ({ datetime: isoDays(i + 1), condition: 'sunny', temperature: 20 + i % 3, templow: 10 + (i % 2), precipitation_probability: 5 })),
  },
  {
    id: 'hot_imperial',
    label: 'Chaleur (°F)',
    description: '°F + mph + ressenti 95°F',
    state: 'sunny',
    attrs: attrs('Cabin', 88, 95, 35, 1011, 180, 8, 20, 9, '°F', 'mph'),
    hourly: Array.from({ length: 10 }, (_, i) => ({ datetime: isoOffset(i + 1), condition: 'sunny', temperature: 88 + Math.sin(i / 2) * 4, precipitation_probability: 0 })),
    daily: Array.from({ length: 7 }, (_, i) => ({ datetime: isoDays(i + 1), condition: i < 4 ? 'sunny' : 'partlycloudy', temperature: 92 + i, templow: 68 + i, precipitation_probability: i === 5 ? 25 : 0 })),
  },
];

const ALL_METRICS = [
  { id: 'humidity', label: 'Humidité' },
  { id: 'wind', label: 'Vent' },
  { id: 'pressure', label: 'Pression' },
  { id: 'uv', label: 'UV' },
  { id: 'visibility', label: 'Visibilité' },
  { id: 'sunrise', label: 'Lever' },
  { id: 'sunset', label: 'Coucher' },
] as const;

export async function setupWeather(): Promise<void> {
  await import('../cards/weather-card/src/index');

  let current = SCENARIOS[0];
  // Track config toggles to mirror what the real config panel exposes.
  const hiddenMetrics = new Set<string>();
  const config = {
    show_header: true,
    show_daily: true,
    show_hourly: true,
  };

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
    toolbar.appendChild(rowEl('Métriques visibles', ALL_METRICS.map((m) => {
      const isVisible = !hiddenMetrics.has(m.id);
      return chipEl(m.label, isVisible, () => {
        if (isVisible) hiddenMetrics.add(m.id);
        else hiddenMetrics.delete(m.id);
        rebuild();
        renderToolbar();
      });
    })));
    toolbar.appendChild(rowEl('Sections', [
      chipEl('Header', config.show_header, () => { config.show_header = !config.show_header; rebuild(); renderToolbar(); }),
      chipEl('Prévisions horaires', config.show_hourly, () => { config.show_hourly = !config.show_hourly; rebuild(); renderToolbar(); }),
      chipEl('Prévisions 7 jours', config.show_daily, () => { config.show_daily = !config.show_daily; rebuild(); renderToolbar(); }),
    ]));
    const meta = document.createElement('div');
    meta.style.cssText = 'font-size:12px; color:rgba(255,255,255,0.5); margin-top:2px;';
    meta.textContent = current.description;
    toolbar.appendChild(meta);
  }

  function rebuild(): void {
    // Sun entity for sunrise/sunset, computed from today so the timeline dot lands realistically
    const today = new Date();
    const sunrise = new Date(today); sunrise.setHours(6, 42, 0, 0);
    const sunset = new Date(today); sunset.setHours(21, 18, 0, 0);
    const hass = makeCardHass({
      entities: [
        {
          entity_id: 'weather.maison',
          state: current.state,
          attributes: current.attrs,
        },
        {
          entity_id: 'sun.sun',
          state: 'above_horizon',
          attributes: {
            next_rising: sunrise.toISOString(),
            next_setting: sunset.toISOString(),
            elevation: 35,
          },
        },
      ],
      cardConfig: {
        weather: {
          entity_id: 'weather.maison',
          hidden_metrics: [...hiddenMetrics],
          show_daily: config.show_daily,
          show_hourly: config.show_hourly,
          show_header: config.show_header,
        },
      },
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
