import { html, nothing } from 'lit';
import { t } from '@glass-cards/i18n';
import type { GlassConfigPanel } from '../index';

export function renderWeatherPreview(self: GlassConfigPanel) {
  if (!self._weatherEntity || !self.hass) {
    return html`<div class="preview-empty">${t('config.weather_select_entity')}</div>`;
  }

  const entity = self.hass.states[self._weatherEntity];
  if (!entity) {
    return html`<div class="preview-empty">${t('config.weather_select_entity')}</div>`;
  }

  const attrs = entity.attributes;
  const temp = attrs.temperature ?? '--';
  const tempUnit = (attrs.temperature_unit as string | undefined) ?? '°C';
  const hidden = new Set(self._weatherHiddenMetrics);
  const condKey = entity.state || 'sunny';

  const condIcons: Record<string, string> = {
    'sunny': 'mdi:weather-sunny', 'clear-night': 'mdi:weather-night',
    'partlycloudy': 'mdi:weather-partly-cloudy', 'cloudy': 'mdi:weather-cloudy',
    'fog': 'mdi:weather-fog', 'rainy': 'mdi:weather-rainy',
    'pouring': 'mdi:weather-pouring', 'snowy': 'mdi:weather-snowy',
    'windy': 'mdi:weather-windy', 'lightning': 'mdi:weather-lightning',
  };
  const condNames: Record<string, string> = {
    'sunny': 'weather.cond_sunny', 'clear-night': 'weather.cond_clear_night',
    'partlycloudy': 'weather.cond_partly_cloudy', 'cloudy': 'weather.cond_cloudy',
    'fog': 'weather.cond_foggy', 'rainy': 'weather.cond_rainy',
    'pouring': 'weather.cond_pouring', 'snowy': 'weather.cond_snowy',
    'windy': 'weather.cond_windy', 'lightning': 'weather.cond_lightning',
  };
  const condTints: Record<string, string> = {
    'sunny': '#fbbf24', 'clear-night': '#6366f1', 'partlycloudy': '#94a3b8',
    'cloudy': '#64748b', 'fog': '#94a3b8', 'rainy': '#3b82f6',
    'pouring': '#2563eb', 'snowy': '#e2e8f0', 'windy': '#6ee7b3',
    'lightning': '#a78bfa',
  };
  const condSparkStrokes: Record<string, string> = {
    'sunny': 'rgba(251,191,36,0.8)', 'clear-night': 'rgba(129,140,248,0.7)',
    'partlycloudy': 'rgba(148,163,184,0.6)', 'cloudy': 'rgba(100,116,139,0.6)',
    'fog': 'rgba(148,163,184,0.5)', 'rainy': 'rgba(96,165,250,0.7)',
    'pouring': 'rgba(59,130,246,0.8)', 'snowy': 'rgba(226,232,240,0.7)',
    'windy': 'rgba(110,231,179,0.6)', 'lightning': 'rgba(167,139,250,0.8)',
  };
  const condIcon = condIcons[condKey] || 'mdi:weather-cloudy';
  const condText = t((condNames[condKey] || 'weather.cond_cloudy') as Parameters<typeof t>[0]);
  const tintColor = condTints[condKey] || '#64748b';
  const sparkStroke = condSparkStrokes[condKey] || 'rgba(148,163,184,0.6)';

  // Time
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const secStr = String(now.getSeconds()).padStart(2, '0');
  const dateStr = now.toLocaleDateString(self.hass.language || 'fr', { weekday: 'long', day: 'numeric', month: 'long' });

  // Feels like
  const feelsLike = attrs.apparent_temperature ?? null;

  // Sparkline SVG — fake curve based on temperature
  const baseTemp = typeof temp === 'number' ? temp : 12;
  const sparkPoints = [0, 0.5, 1.2, 0.8, -0.3, -1, -0.5, 0.2, 0.7, 1.5];
  const sparkW = 348;
  const sparkH = 44;
  const sparkPad = 6;
  const minV = Math.min(...sparkPoints);
  const maxV = Math.max(...sparkPoints);
  const rangeV = maxV - minV || 1;
  const pts = sparkPoints.map((v, i) => ({
    x: (i / (sparkPoints.length - 1)) * sparkW,
    y: sparkPad + (1 - (v - minV) / rangeV) * (sparkH - sparkPad * 2),
  }));
  // Catmull-Rom to cubic bezier
  let pathD = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    pathD += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }
  const areaD = pathD + ` L${sparkW},${sparkH} L0,${sparkH} Z`;
  // Now marker position (~30% from left)
  const nowFrac = 0.3;
  const nowIdx = nowFrac * (sparkPoints.length - 1);
  const nowIdxFloor = Math.floor(nowIdx);
  const nowIdxCeil = Math.min(sparkPoints.length - 1, nowIdxFloor + 1);
  const nowLerp = nowIdx - nowIdxFloor;
  const nowV = sparkPoints[nowIdxFloor] + (sparkPoints[nowIdxCeil] - sparkPoints[nowIdxFloor]) * nowLerp;
  const nowY = sparkPad + (1 - (nowV - minV) / rangeV) * (sparkH - sparkPad * 2);
  // Hour labels
  const currentHour = now.getHours();
  const sparkLabels = sparkPoints.map((_, i) => {
    const h = (currentHour + i) % 24;
    return `${String(h).padStart(2, '0')}h`;
  });

  // Metrics
  type Metric = { key: string; icon: string; val: string; unit?: string; dir?: string };
  const metrics: Metric[] = [];
  if (!hidden.has('humidity') && attrs.humidity != null) metrics.push({ key: 'humidity', icon: 'mdi:water-percent', val: `${attrs.humidity}`, unit: '%' });
  if (!hidden.has('wind') && attrs.wind_speed != null) {
    const dir = typeof attrs.wind_bearing === 'number' ? self._windBearingToDir(attrs.wind_bearing as number) : undefined;
    metrics.push({ key: 'wind', icon: 'mdi:weather-windy', val: `${Math.round(attrs.wind_speed as number)}`, unit: 'km/h', dir });
  }
  if (!hidden.has('pressure') && attrs.pressure != null) metrics.push({ key: 'pressure', icon: 'mdi:gauge', val: `${Math.round(attrs.pressure as number)}`, unit: 'hPa' });
  if (!hidden.has('uv') && attrs.uv_index != null) metrics.push({ key: 'uv', icon: 'mdi:sun-wireless', val: `${Math.round(attrs.uv_index as number)}`, unit: 'UV' });
  if (!hidden.has('visibility') && attrs.visibility != null) metrics.push({ key: 'visibility', icon: 'mdi:eye-outline', val: `${attrs.visibility}`, unit: 'km' });
  if (!hidden.has('sunrise')) {
    const sunState = self.hass.states['sun.sun'];
    const nextRising = sunState?.attributes.next_rising as string | undefined;
    metrics.push({ key: 'sunrise', icon: 'mdi:weather-sunset-up', val: nextRising ? new Date(nextRising).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--' });
  }
  if (!hidden.has('sunset')) {
    const sunState = self.hass.states['sun.sun'];
    const nextSetting = sunState?.attributes.next_setting as string | undefined;
    metrics.push({ key: 'sunset', icon: 'mdi:weather-sunset-down', val: nextSetting ? new Date(nextSetting).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--' });
  }

  const cols = 3;

  // Fake forecast data — use Intl for locale-aware day names
  const lang = self.hass.language || 'fr';
  const dayNames = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2024, 0, i + 1); // Mon=1 Jan 2024
    return new Intl.DateTimeFormat(lang, { weekday: 'short' }).format(d);
  });
  const fakeDailyIcons = ['mdi:weather-sunny', 'mdi:weather-partly-cloudy', 'mdi:weather-cloudy', 'mdi:weather-rainy', 'mdi:weather-partly-cloudy', 'mdi:weather-sunny', 'mdi:weather-cloudy'];
  const fakeDailyHighs = [baseTemp + 2, baseTemp + 1, baseTemp, baseTemp - 1, baseTemp + 1, baseTemp + 3, baseTemp];
  const fakeDailyLows = [baseTemp - 4, baseTemp - 3, baseTemp - 5, baseTemp - 6, baseTemp - 4, baseTemp - 2, baseTemp - 5];
  const fakePrecip = [0, 10, 30, 60, 20, 0, 15];
  // Convert getDay() (0=Sun) to Mon-based index (0=Mon) to match dayNames array
  const todayDow = (now.getDay() + 6) % 7;

  return html`
    <div class="preview-weather-wrap">
      ${self._weatherShowHeader ? html`
        <div class="pw-card-header">
          <span class="pw-card-title">${t('weather.title')}</span>
          <span class="pw-card-location">${entity.attributes.friendly_name ?? ''}</span>
        </div>
      ` : nothing}
    <div class="preview-weather">
      <div class="pw-tint" style="background: radial-gradient(80% 20% at 75% 15%, ${tintColor}22 0%, transparent 70%);"></div>
      <div class="pw-content">
        <div class="pw-header">
          <div class="pw-header-left">
            <span class="pw-time">${timeStr}<span class="pw-sec">:${secStr}</span></span>
            <span class="pw-date">${dateStr}</span>
          </div>
          <div class="pw-header-right">
            <span class="pw-temp">${temp}<span class="pw-temp-unit">${tempUnit}</span></span>
            <span class="pw-cond"><ha-icon .icon=${condIcon}></ha-icon>${condText}</span>
            ${feelsLike != null ? html`<span class="pw-feels">${t('weather.feels_like', { temp: String(Math.round(feelsLike as number)) })}</span>` : nothing}
          </div>
        </div>

        <div class="pw-spark-zone">
          <svg class="pw-spark-svg" viewBox="0 0 ${sparkW} ${sparkH}" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pw-spark-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${sparkStroke}" stop-opacity="0.3"/>
                <stop offset="100%" stop-color="${sparkStroke}" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <path d="${areaD}" fill="url(#pw-spark-fill)"/>
            <path d="${pathD}" fill="none" stroke="${sparkStroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="pw-spark-now" style="left: ${nowFrac * 100}%;">
            <div class="pw-spark-now-dot" style="top: ${(nowY / sparkH) * 100}%;"></div>
          </div>
          <div class="pw-spark-labels">
            ${sparkLabels.map((lbl, i) => i % 2 === 0 || i === sparkLabels.length - 1
              ? html`<span class="pw-spark-lbl" style="left: ${(i / (sparkLabels.length - 1)) * 100}%;">${lbl}</span>`
              : nothing
            )}
          </div>
        </div>

        ${metrics.length > 0 ? html`
          <div class="pw-metrics" style="grid-template-columns: repeat(${cols}, 1fr);">
            ${metrics.map((m) => html`
              <div class="pw-metric ${m.key}">
                <ha-icon .icon=${m.icon}></ha-icon>
                <span class="pw-metric-val">${m.val}</span>
                ${m.unit ? html`<span class="pw-metric-unit">${m.unit}</span>` : nothing}
                ${m.dir ? html`<span class="pw-metric-dir">${m.dir}</span>` : nothing}
              </div>
            `)}
          </div>
        ` : nothing}

        ${self._weatherShowDaily || self._weatherShowHourly ? html`
          <div class="pw-forecast-zone">
            <div class="pw-tabs">
              ${self._weatherShowDaily ? html`<span class="pw-tab active">${t('weather.daily_tab')}</span>` : nothing}
              ${self._weatherShowHourly ? html`<span class="pw-tab">${t('weather.hourly_tab')}</span>` : nothing}
            </div>
            <div class="pw-fold-sep"></div>
            ${self._weatherShowDaily ? html`
              <div class="pw-daily-list">
                ${fakeDailyIcons.slice(0, 5).map((icon, i) => {
                  const dayIdx = (todayDow + i) % 7;
                  const label = i === 0 ? t('weather.today') : dayNames[dayIdx];
                  const high = Math.round(fakeDailyHighs[i]);
                  const low = Math.round(fakeDailyLows[i]);
                  const precip = fakePrecip[i];
                  return html`
                    <div class="pw-day-row ${i === 0 ? 'today' : ''}">
                      <span class="pw-day-label">${label}</span>
                      <ha-icon class="pw-day-icon" .icon=${icon}></ha-icon>
                      <span class="pw-day-temps"><span class="pw-day-high">${high}°</span><span class="pw-day-low">${low}°</span></span>
                      ${precip > 0 ? html`<span class="pw-day-precip">${precip}%</span>` : html`<span class="pw-day-precip"></span>`}
                    </div>
                  `;
                })}
              </div>
            ` : nothing}
          </div>
        ` : nothing}
      </div>
    </div>
    </div>
  `;
}

export function renderWeatherTab(self: GlassConfigPanel) {
  const weatherEntities = self.hass
    ? Object.keys(self.hass.states).filter((id) => id.startsWith('weather.')).sort()
    : [];
  const selectedEntity = weatherEntities.find((id) => id === self._weatherEntity);

  const METRICS = [
    { key: 'humidity', icon: 'mdi:water-percent', nameKey: 'config.weather_metric_humidity' as const },
    { key: 'wind', icon: 'mdi:weather-windy', nameKey: 'config.weather_metric_wind' as const },
    { key: 'pressure', icon: 'mdi:gauge', nameKey: 'config.weather_metric_pressure' as const },
    { key: 'uv', icon: 'mdi:white-balance-sunny', nameKey: 'config.weather_metric_uv' as const },
    { key: 'visibility', icon: 'mdi:eye', nameKey: 'config.weather_metric_visibility' as const },
    { key: 'sunrise', icon: 'mdi:weather-sunset-up', nameKey: 'config.weather_metric_sunrise' as const },
    { key: 'sunset', icon: 'mdi:weather-sunset-down', nameKey: 'config.weather_metric_sunset' as const },
  ];

  const hiddenSet = new Set(self._weatherHiddenMetrics);

  return html`
    <div class="tab-panel" id="panel-weather">
      <div class="section-label">${t('config.behavior')}</div>
      <div class="feature-list">
        <button
          class="feature-row"
          @click=${() => { self._weatherShowHeader = !self._weatherShowHeader; }}
        >
          <div class="feature-icon">
            <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${t('config.weather_show_header')}</div>
            <div class="feature-desc">${t('config.weather_show_header_desc')}</div>
          </div>
          <span
            class="toggle ${self._weatherShowHeader ? 'on' : ''}"
            role="switch"
            aria-checked=${self._weatherShowHeader ? 'true' : 'false'}
          ></span>
        </button>
      </div>

      <div class="section-label">${t('config.weather_entity')}</div>
      <div class="section-desc">${t('config.weather_entity_desc')}</div>
      <div class="dropdown ${self._weatherDropdownOpen ? 'open' : ''}">
        <button
          class="dropdown-trigger"
          @click=${() => (self._weatherDropdownOpen = !self._weatherDropdownOpen)}
          aria-expanded=${self._weatherDropdownOpen ? 'true' : 'false'}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${'mdi:weather-partly-cloudy'}></ha-icon>
          <span>${selectedEntity || t('common.select')}</span>
          <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          ${weatherEntities.map(
            (id) => html`
              <button
                class="dropdown-item ${id === self._weatherEntity ? 'active' : ''}"
                role="option"
                aria-selected=${id === self._weatherEntity ? 'true' : 'false'}
                @click=${() => self._selectWeatherEntity(id)}
              >
                <ha-icon .icon=${'mdi:weather-partly-cloudy'}></ha-icon>
                ${id}
              </button>
            `,
          )}
        </div>
      </div>

      <div class="section-label">${t('config.weather_metrics')}</div>
      <div class="section-desc">${t('config.weather_metrics_desc')}</div>
      <div class="feature-list">
        ${METRICS.map((m) => {
          const visible = !hiddenSet.has(m.key);
          return html`
            <button
              class="feature-row"
              @click=${() => self._toggleWeatherMetric(m.key)}
            >
              <div class="feature-icon">
                <ha-icon .icon=${m.icon}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${t(m.nameKey)}</div>
              </div>
              <span
                class="toggle ${visible ? 'on' : ''}"
                role="switch"
                aria-checked=${visible ? 'true' : 'false'}
                aria-label="${visible ? t('common.hide') : t('common.show')} ${t(m.nameKey)}"
              ></span>
            </button>
          `;
        })}
      </div>

      <div class="section-label">${t('config.weather_forecasts')}</div>
      <div class="section-desc">${t('config.weather_forecasts_desc')}</div>
      <div class="feature-list">
        <button
          class="feature-row"
          @click=${() => { self._weatherShowDaily = !self._weatherShowDaily; }}
        >
          <div class="feature-icon">
            <ha-icon .icon=${'mdi:calendar-week'}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${t('config.weather_daily')}</div>
          </div>
          <span
            class="toggle ${self._weatherShowDaily ? 'on' : ''}"
            role="switch"
            aria-checked=${self._weatherShowDaily ? 'true' : 'false'}
            aria-label="${self._weatherShowDaily ? t('common.hide') : t('common.show')} ${t('config.weather_daily')}"
          ></span>
        </button>
        <button
          class="feature-row"
          @click=${() => { self._weatherShowHourly = !self._weatherShowHourly; }}
        >
          <div class="feature-icon">
            <ha-icon .icon=${'mdi:clock-outline'}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${t('config.weather_hourly')}</div>
          </div>
          <span
            class="toggle ${self._weatherShowHourly ? 'on' : ''}"
            role="switch"
            aria-checked=${self._weatherShowHourly ? 'true' : 'false'}
            aria-label="${self._weatherShowHourly ? t('common.hide') : t('common.show')} ${t('config.weather_hourly')}"
          ></span>
        </button>
      </div>

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${() => self._loadWeatherConfig()}>${t('common.reset')}</button>
      </div>
    </div>
  `;
}

export function toggleWeatherMetric(self: GlassConfigPanel, metric: string) {
  const set = new Set(self._weatherHiddenMetrics);
  if (set.has(metric)) set.delete(metric);
  else set.add(metric);
  self._weatherHiddenMetrics = [...set];
}

export function selectWeatherEntity(self: GlassConfigPanel, entityId: string) {
  self._weatherEntity = entityId;
  self._weatherDropdownOpen = false;
}

export function windBearingToDir(_self: GlassConfigPanel, bearing: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
  return dirs[Math.round(bearing / 45) % 8];
}
