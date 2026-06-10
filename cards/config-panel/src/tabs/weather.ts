import { html, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';
import { BaseConfigTab } from '../base-tab';

// — Metrics definition —

const METRICS = [
  { key: 'humidity', icon: 'mdi:water-percent', nameKey: 'config.weather_metric_humidity' as const, attr: 'humidity' },
  { key: 'wind', icon: 'mdi:weather-windy', nameKey: 'config.weather_metric_wind' as const, attr: 'wind_speed' },
  { key: 'pressure', icon: 'mdi:gauge', nameKey: 'config.weather_metric_pressure' as const, attr: 'pressure' },
  { key: 'uv', icon: 'mdi:white-balance-sunny', nameKey: 'config.weather_metric_uv' as const, attr: 'uv_index' },
  { key: 'visibility', icon: 'mdi:eye', nameKey: 'config.weather_metric_visibility' as const, attr: 'visibility' },
  // sunrise/sunset come from the `sun.sun` entity in HA core, not from the
  // weather entity itself, so they are listed independently of the picked
  // weather provider.
  { key: 'sunrise', icon: 'mdi:weather-sunset-up', nameKey: 'config.weather_metric_sunrise' as const, attr: null },
  { key: 'sunset', icon: 'mdi:weather-sunset-down', nameKey: 'config.weather_metric_sunset' as const, attr: null },
];

// — Component —

export class ConfigTabWeather extends BaseConfigTab {
  @state() _weatherEntity = '';
  @state() _weatherHiddenMetrics: string[] = [];
  @state() _weatherShowDaily = true;
  @state() _weatherShowHourly = true;
  @state() _weatherShowHeader = true;

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

  // — Actions —

  private _selectEntity(entityId: string): void {
    this._weatherEntity = entityId;
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
    // Show only the metrics the picked entity actually provides. sunrise /
    // sunset always come from sun.sun and are unconditional.
    const entityAttrs = (selectedEntity && this.hass?.states[selectedEntity]?.attributes) || {};
    const availableMetrics = METRICS.filter((m) => m.attr === null || (entityAttrs as Record<string, unknown>)[m.attr] != null);
    const visibleCount = availableMetrics.length - availableMetrics.filter((m) => hiddenSet.has(m.key)).length;

    return html`
      <div class="tab-panel weather-tab" id="panel-weather">
        <glass-weather-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-weather-card>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">1</span>
            <div class="cfg-section-text">
              <span class="section-label">${t('config.weather_entity')}</span>
              <span class="section-desc">${t('config.weather_entity_desc')}</span>
            </div>
          </header>

          ${weatherEntities.length === 0 ? html`
            <glass-empty-state variant="inline" .icon=${'mdi:weather-cloudy-alert'} .title=${t('config.weather_no_entity')}></glass-empty-state>
          ` : html`
            <glass-dropdown
              .items=${weatherEntities.map((id) => ({ value: id, label: id, icon: 'mdi:weather-partly-cloudy' }))}
              .value=${this._weatherEntity}
              .label=${t('common.select')}
              icon="mdi:weather-partly-cloudy"
              @glass-dropdown-change=${(e: CustomEvent<{ value: string }>) => this._selectEntity(e.detail.value)}
            ></glass-dropdown>
          `}
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">2</span>
            <div class="cfg-section-text">
              <span class="section-label">${t('config.weather_display')}</span>
              <span class="section-desc">${t('config.weather_display_desc')}</span>
            </div>
          </header>
          <div class="feature-list">
            ${this._renderFeatureRow({
              icon: 'mdi:page-layout-header',
              nameKey: 'config.weather_show_header',
              descKey: 'config.weather_show_header_desc',
              on: this._weatherShowHeader,
              onToggle: () => { this._weatherShowHeader = !this._weatherShowHeader; },
            })}
            ${this._renderFeatureRow({
              icon: 'mdi:calendar-week',
              nameKey: 'config.weather_daily',
              descKey: 'config.weather_daily_desc',
              on: this._weatherShowDaily,
              ariaLabel: `${this._weatherShowDaily ? t('common.hide') : t('common.show')} ${t('config.weather_daily')}`,
              onToggle: () => { this._weatherShowDaily = !this._weatherShowDaily; },
            })}
            ${this._renderFeatureRow({
              icon: 'mdi:clock-outline',
              nameKey: 'config.weather_hourly',
              descKey: 'config.weather_hourly_desc',
              on: this._weatherShowHourly,
              ariaLabel: `${this._weatherShowHourly ? t('common.hide') : t('common.show')} ${t('config.weather_hourly')}`,
              onToggle: () => { this._weatherShowHourly = !this._weatherShowHourly; },
            })}
          </div>
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">3</span>
            <div class="cfg-section-text">
              <span class="section-label">${t('config.weather_metrics')}</span>
              <span class="section-desc">${t('config.weather_metrics_desc')}</span>
            </div>
            <span class="cfg-section-count" aria-label="${t('common.count_visible', { count: visibleCount, total: availableMetrics.length })}">
              ${visibleCount}/${availableMetrics.length}
            </span>
          </header>
          <div class="feature-list">
            ${availableMetrics.map((m) => {
              const visible = !hiddenSet.has(m.key);
              return this._renderFeatureRow({
                icon: m.icon,
                nameKey: m.nameKey,
                on: visible,
                ariaLabel: `${visible ? t('common.hide') : t('common.show')} ${t(m.nameKey)}`,
                onToggle: () => this._toggleMetric(m.key),
              });
            })}
          </div>
        </section>

        <div class="save-bar">
          <glass-button variant="ghost" @click=${() => this.reload()}>${t('common.reset')}</glass-button>
        </div>
      </div>
    `;
  }
}

try { customElements.define('config-tab-weather', ConfigTabWeather); } catch { /* already registered */ }
