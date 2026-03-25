import { html, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';
import { BaseConfigTab } from '../base-tab';

// — Metrics definition —

const METRICS = [
  { key: 'humidity', icon: 'mdi:water-percent', nameKey: 'config.weather_metric_humidity' as const },
  { key: 'wind', icon: 'mdi:weather-windy', nameKey: 'config.weather_metric_wind' as const },
  { key: 'pressure', icon: 'mdi:gauge', nameKey: 'config.weather_metric_pressure' as const },
  { key: 'uv', icon: 'mdi:white-balance-sunny', nameKey: 'config.weather_metric_uv' as const },
  { key: 'visibility', icon: 'mdi:eye', nameKey: 'config.weather_metric_visibility' as const },
  { key: 'sunrise', icon: 'mdi:weather-sunset-up', nameKey: 'config.weather_metric_sunrise' as const },
  { key: 'sunset', icon: 'mdi:weather-sunset-down', nameKey: 'config.weather_metric_sunset' as const },
];

// — Component —

export class ConfigTabWeather extends BaseConfigTab {
  @state() _weatherEntity = '';
  @state() _weatherHiddenMetrics: string[] = [];
  @state() _weatherShowDaily = true;
  @state() _weatherShowHourly = true;
  @state() _weatherShowHeader = true;
  @state() _weatherDropdownOpen = false;

  protected static override _AUTO_SAVE_KEYS = new Set([
    '_weatherEntity', '_weatherHiddenMetrics', '_weatherShowDaily', '_weatherShowHourly', '_weatherShowHeader',
  ]);

  // — Lifecycle —

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    this._checkAutoSave(changedProps);
  }

  // — Persistence —

  loadFromConfig(config: Record<string, unknown>): void {
    const c = config as { entity_id?: string; hidden_metrics?: string[]; show_daily?: boolean; show_hourly?: boolean; show_header?: boolean };
    this._weatherEntity = c.entity_id ?? '';
    this._weatherHiddenMetrics = c.hidden_metrics ?? [];
    this._weatherShowDaily = c.show_daily ?? true;
    this._weatherShowHourly = c.show_hourly ?? true;
    this._weatherShowHeader = c.show_header ?? true;
  }

  collectSaveData(): Record<string, unknown> {
    return {
      ...(this._weatherEntity ? { entity_id: this._weatherEntity } : {}),
      hidden_metrics: this._weatherHiddenMetrics,
      show_daily: this._weatherShowDaily,
      show_hourly: this._weatherShowHourly,
      show_header: this._weatherShowHeader,
    };
  }

  protected override async _performSave(): Promise<void> {
    await this.backend!.send('set_weather', this.collectSaveData());
    bus.emit('weather-config-changed', undefined);
  }

  async reload(): Promise<void> {
    if (!this.backend) return;
    try {
      const result = await this.backend.send<{
        weather: { entity_id: string; hidden_metrics: string[]; show_daily: boolean; show_hourly: boolean; show_header: boolean };
      }>('get_config');
      if (result?.weather) this.loadFromConfig(result.weather);
    } catch { /* ignore */ }
  }

  // — Actions —

  private _selectEntity(entityId: string): void {
    this._weatherEntity = entityId;
    this._weatherDropdownOpen = false;
  }

  private _toggleMetric(metric: string): void {
    const set = new Set(this._weatherHiddenMetrics);
    if (set.has(metric)) set.delete(metric);
    else set.add(metric);
    this._weatherHiddenMetrics = [...set];
  }

  // — Render —

  renderTab(): TemplateResult {
    void this._lang;
    const weatherEntities = this.hass
      ? Object.keys(this.hass.states).filter((id) => id.startsWith('weather.')).sort()
      : [];
    const selectedEntity = weatherEntities.find((id) => id === this._weatherEntity);

    const hiddenSet = new Set(this._weatherHiddenMetrics);

    return html`
      <div class="tab-panel" id="panel-weather">
        <glass-weather-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-weather-card>
        <div class="section-label">${t('config.behavior')}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            role="switch"
            aria-checked=${this._weatherShowHeader ? 'true' : 'false'}
            @click=${() => { this._weatherShowHeader = !this._weatherShowHeader; }}
          >
            <div class="feature-icon">
              <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${t('config.weather_show_header')}</div>
              <div class="feature-desc">${t('config.weather_show_header_desc')}</div>
            </div>
            <span
              class="toggle ${this._weatherShowHeader ? 'on' : ''}"
            ></span>
          </button>
        </div>

        <div class="section-label">${t('config.weather_entity')}</div>
        <div class="section-desc">${t('config.weather_entity_desc')}</div>
        <div class="dropdown ${this._weatherDropdownOpen ? 'open' : ''}">
          <button
            class="dropdown-trigger"
            @click=${() => (this._weatherDropdownOpen = !this._weatherDropdownOpen)}
            aria-expanded=${this._weatherDropdownOpen ? 'true' : 'false'}
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
                  class="dropdown-item ${id === this._weatherEntity ? 'active' : ''}"
                  role="option"
                  aria-selected=${id === this._weatherEntity ? 'true' : 'false'}
                  @click=${() => this._selectEntity(id)}
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
                role="switch"
                aria-checked=${visible ? 'true' : 'false'}
                aria-label="${visible ? t('common.hide') : t('common.show')} ${t(m.nameKey)}"
                @click=${() => this._toggleMetric(m.key)}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${m.icon}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${t(m.nameKey)}</div>
                </div>
                <span
                  class="toggle ${visible ? 'on' : ''}"
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
            role="switch"
            aria-checked=${this._weatherShowDaily ? 'true' : 'false'}
            aria-label="${this._weatherShowDaily ? t('common.hide') : t('common.show')} ${t('config.weather_daily')}"
            @click=${() => { this._weatherShowDaily = !this._weatherShowDaily; }}
          >
            <div class="feature-icon">
              <ha-icon .icon=${'mdi:calendar-week'}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${t('config.weather_daily')}</div>
            </div>
            <span
              class="toggle ${this._weatherShowDaily ? 'on' : ''}"
            ></span>
          </button>
          <button
            class="feature-row"
            role="switch"
            aria-checked=${this._weatherShowHourly ? 'true' : 'false'}
            aria-label="${this._weatherShowHourly ? t('common.hide') : t('common.show')} ${t('config.weather_hourly')}"
            @click=${() => { this._weatherShowHourly = !this._weatherShowHourly; }}
          >
            <div class="feature-icon">
              <ha-icon .icon=${'mdi:clock-outline'}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${t('config.weather_hourly')}</div>
            </div>
            <span
              class="toggle ${this._weatherShowHourly ? 'on' : ''}"
            ></span>
          </button>
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${() => this.reload()}>${t('common.reset')}</button>
        </div>
      </div>
    `;
  }
}

try { customElements.define('config-tab-weather', ConfigTabWeather); } catch { /* already registered */ }
