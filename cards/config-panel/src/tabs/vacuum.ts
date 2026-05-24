import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';
import { BaseConfigTab } from '../base-tab';

interface VacuumEntity {
  entityId: string;
  name: string;
}

export class ConfigTabVacuum extends BaseConfigTab {
  @state() _vacuumShowHeader = true;
  @state() _vacuumEntity = '';

  protected static override _AUTO_SAVE_KEYS = new Set([
    '_vacuumShowHeader', '_vacuumEntity',
  ]);

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    this._checkAutoSave(changedProps);
  }

  loadFromConfig(config: Record<string, unknown>): void {
    const c = config as { show_header?: boolean; entity?: string };
    this._vacuumShowHeader = c.show_header ?? true;
    this._vacuumEntity = c.entity ?? '';
  }

  collectSaveData(): Record<string, unknown> {
    return {
      show_header: this._vacuumShowHeader,
      entity: this._vacuumEntity,
    };
  }

  protected override async _performSave(): Promise<void> {
    await this.backend!.send('set_vacuum_card', this.collectSaveData());
    bus.emit('vacuum-config-changed', undefined);
  }

  async reload(): Promise<void> {
    if (!this.backend) return;
    try {
      const result = await this.backend.send<{
        vacuum_card?: { show_header: boolean; entity: string };
      }>('get_config');
      if (result?.vacuum_card) this.loadFromConfig(result.vacuum_card);
    } catch { /* ignore */ }
  }

  private _selectEntity(entityId: string): void {
    this._vacuumEntity = entityId === this._vacuumEntity ? '' : entityId;
  }

  renderTab(): TemplateResult {
    void this._lang;

    const vacuums: VacuumEntity[] = this.hass
      ? Object.keys(this.hass.states)
          .filter((id) => id.startsWith('vacuum.'))
          .sort()
          .map((id) => {
            const entity = this.hass?.states[id];
            const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1] || id;
            return { entityId: id, name };
          })
      : [];

    const effective = this._vacuumEntity || (vacuums[0]?.entityId ?? '');
    const previewEntity = effective || 'vacuum.placeholder';

    return html`
      <div class="tab-panel vacuum-tab" id="panel-vacuum">
        ${effective
          ? html`<glass-vacuum-card
              .hass=${this.hass}
              .config=${{ type: 'custom:glass-vacuum-card', entity: previewEntity }}
              config-preview
            ></glass-vacuum-card>`
          : nothing}

        <div class="cfg-info">
          <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
          <span>${t('config.vacuum_dashboard_info')}</span>
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
              nameKey: 'config.vacuum_show_header',
              descKey: 'config.vacuum_show_header_desc',
              on: this._vacuumShowHeader,
              onToggle: () => { this._vacuumShowHeader = !this._vacuumShowHeader; },
            })}
          </div>
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">2</span>
            <div class="cfg-section-text">
              <span class="section-label">${t('config.vacuum_entity')}</span>
              <span class="section-desc">${t('config.vacuum_entity_desc')}</span>
            </div>
          </header>

          ${vacuums.length === 0 ? html`
            <div class="cfg-empty">
              <ha-icon .icon=${'mdi:robot-vacuum-variant'}></ha-icon>
              <span>${t('config.vacuum_no_entities')}</span>
            </div>
          ` : html`
            <div class="feature-list">
              ${vacuums.map((v) => {
                const isSelected = v.entityId === effective;
                return html`
                  <button
                    class="feature-row"
                    role="radio"
                    aria-checked=${isSelected ? 'true' : 'false'}
                    aria-label="${v.name}"
                    @click=${() => this._selectEntity(v.entityId)}
                  >
                    <div class="feature-icon">
                      <ha-icon .icon=${'mdi:robot-vacuum-variant'}></ha-icon>
                    </div>
                    <div class="feature-text">
                      <div class="feature-name">${v.name}</div>
                      <div class="feature-desc">${v.entityId}</div>
                    </div>
                    <glass-toggle presentation .checked=${isSelected}></glass-toggle>
                  </button>
                `;
              })}
            </div>
          `}
        </section>

        <div class="save-bar">
          <glass-button variant="ghost" @click=${() => this.reload()}>${t('common.reset')}</glass-button>
        </div>
      </div>
    `;
  }
}

try { customElements.define('config-tab-vacuum', ConfigTabVacuum); } catch { /* already registered */ }
