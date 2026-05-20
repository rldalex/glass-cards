import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';
import { BaseConfigTab } from '../base-tab';

export class ConfigTabCalendar extends BaseConfigTab {
  @state() _calendarShowHeader = true;
  @state() _calendarHiddenEntities: string[] = [];

  protected static override _AUTO_SAVE_KEYS = new Set([
    '_calendarShowHeader', '_calendarHiddenEntities',
  ]);

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    this._checkAutoSave(changedProps);
  }

  loadFromConfig(config: Record<string, unknown>): void {
    const c = config as { show_header?: boolean; hidden_entities?: string[] };
    this._calendarShowHeader = c.show_header ?? true;
    this._calendarHiddenEntities = c.hidden_entities ?? [];
  }

  collectSaveData(): Record<string, unknown> {
    return {
      show_header: this._calendarShowHeader,
      hidden_entities: this._calendarHiddenEntities,
    };
  }

  protected override async _performSave(): Promise<void> {
    await this.backend!.send('set_calendar_card', this.collectSaveData());
    bus.emit('calendar-config-changed', undefined);
  }

  async reload(): Promise<void> {
    if (!this.backend) return;
    try {
      const result = await this.backend.send<{
        calendar_card?: { show_header: boolean; hidden_entities: string[] };
      }>('get_config');
      if (result?.calendar_card) this.loadFromConfig(result.calendar_card);
    } catch { /* ignore */ }
  }

  private _toggleCalendar(entityId: string): void {
    const set = new Set(this._calendarHiddenEntities);
    if (set.has(entityId)) set.delete(entityId);
    else set.add(entityId);
    this._calendarHiddenEntities = [...set];
  }

  renderTab(): TemplateResult {
    void this._lang;

    const calendars = this.hass
      ? Object.keys(this.hass.states)
          .filter((id) => id.startsWith('calendar.'))
          .sort()
          .map((id) => {
            const entity = this.hass?.states[id];
            const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1] || id;
            return { entityId: id, name };
          })
      : [];

    const hiddenSet = new Set(this._calendarHiddenEntities);
    const visibleCount = calendars.length - calendars.filter((c) => hiddenSet.has(c.entityId)).length;

    return html`
      <div class="tab-panel calendar-tab" id="panel-calendar">
        <glass-calendar-card .hass=${this.hass} config-preview></glass-calendar-card>
        <div class="cfg-info">
          <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
          <span>${t('config.calendar_dashboard_info')}</span>
        </div>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">1</span>
            <div class="cfg-section-text">
              <span class="section-label">${t('config.display')}</span>
            </div>
          </header>
          <div class="feature-list">
            ${this._renderFeatureRow({
              icon: 'mdi:page-layout-header',
              nameKey: 'config.calendar_show_header',
              descKey: 'config.calendar_show_header_desc',
              on: this._calendarShowHeader,
              onToggle: () => { this._calendarShowHeader = !this._calendarShowHeader; },
            })}
          </div>
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">2</span>
            <div class="cfg-section-text">
              <span class="section-label">${t('config.calendar_entities')}</span>
              <span class="section-desc">${t('config.calendar_entities_desc')}</span>
            </div>
            ${calendars.length > 0 ? html`
              <span class="cfg-section-count" aria-label="${t('common.count_visible', { count: visibleCount, total: calendars.length })}">
                ${visibleCount}/${calendars.length}
              </span>
            ` : nothing}
          </header>

          ${calendars.length === 0 ? html`
            <div class="cfg-empty">
              <ha-icon .icon=${'mdi:calendar-remove-outline'}></ha-icon>
              <span>${t('config.calendar_no_entities')}</span>
            </div>
          ` : html`
            <div class="feature-list">
              ${calendars.map((c) => {
                const visible = !hiddenSet.has(c.entityId);
                return html`
                  <button
                    class="feature-row"
                    role="switch"
                    aria-checked=${visible ? 'true' : 'false'}
                    aria-label="${visible ? t('common.hide') : t('common.show')} ${c.name}"
                    @click=${() => this._toggleCalendar(c.entityId)}
                  >
                    <div class="feature-icon">
                      <ha-icon .icon=${'mdi:calendar-month'}></ha-icon>
                    </div>
                    <div class="feature-text">
                      <div class="feature-name">${c.name}</div>
                      <div class="feature-desc">${c.entityId}</div>
                    </div>
                    <span class="toggle ${visible ? 'on' : ''}"></span>
                  </button>
                `;
              })}
            </div>
          `}
        </section>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${() => this.reload()}>${t('common.reset')}</button>
        </div>
      </div>
    `;
  }
}

try { customElements.define('config-tab-calendar', ConfigTabCalendar); } catch { /* already registered */ }
