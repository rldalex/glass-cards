import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';
import { BaseConfigTab } from '../base-tab';

// — Component —

export class ConfigTabPresence extends BaseConfigTab {
  @state() _presenceShowHeader = true;
  @state() _presencePersonEntities: string[] = [];
  @state() _presenceSmartphoneSensors: Record<string, string> = {};
  @state() _presenceNotifyServices: Record<string, string> = {};
  @state() _presenceDrivingSensors: Record<string, string> = {};
  @state() _presenceDropdownOpen: string | null = null;
  @state() _presenceDropdownSearch = '';

  protected static override _AUTO_SAVE_KEYS = new Set([
    '_presenceShowHeader', '_presencePersonEntities', '_presenceSmartphoneSensors', '_presenceNotifyServices', '_presenceDrivingSensors',
  ]);

  private _boundCloseDropdowns = this._closeDropdownsOnOutsideClick.bind(this);

  // — Lifecycle —

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this._boundCloseDropdowns);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this._boundCloseDropdowns);
  }

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    this._checkAutoSave(changedProps);
  }

  // — Dropdown close on outside click —

  private _closeDropdownsOnOutsideClick(e: MouseEvent): void {
    if (!this._presenceDropdownOpen) return;
    const path = e.composedPath();
    const root = this.shadowRoot;
    if (!root) return;
    const dropdowns = root.querySelectorAll('.dropdown');
    for (const dd of dropdowns) {
      if (path.includes(dd)) return;
    }
    this._presenceDropdownOpen = null;
  }

  // — Persistence —

  loadFromConfig(config: Record<string, unknown>): void {
    const c = config as {
      show_header?: boolean;
      person_entities?: string[];
      smartphone_sensors?: Record<string, string>;
      notify_services?: Record<string, string>;
      driving_sensors?: Record<string, string>;
    };
    this._presenceShowHeader = c.show_header ?? true;
    this._presencePersonEntities = c.person_entities ?? [];
    this._presenceSmartphoneSensors = c.smartphone_sensors ?? {};
    this._presenceNotifyServices = c.notify_services ?? {};
    this._presenceDrivingSensors = c.driving_sensors ?? {};
  }

  collectSaveData(): Record<string, unknown> {
    return {
      show_header: this._presenceShowHeader,
      person_entities: this._presencePersonEntities,
      smartphone_sensors: this._presenceSmartphoneSensors,
      notify_services: this._presenceNotifyServices,
      driving_sensors: this._presenceDrivingSensors,
    };
  }

  async save(): Promise<void> {
    if (!this.backend) return;
    try {
      await this.backend.send('set_presence_config', this.collectSaveData());
      this._fireToast(true);
      bus.emit('presence-config-changed', undefined);
    } catch {
      this._fireToast(false);
    }
  }

  async reload(): Promise<void> {
    if (!this.backend) return;
    try {
      const result = await this.backend.send<{
        presence_card?: {
          show_header?: boolean;
          person_entities?: string[];
          smartphone_sensors?: Record<string, string>;
          notify_services?: Record<string, string>;
          driving_sensors?: Record<string, string>;
        };
      }>('get_config');
      if (result?.presence_card) this.loadFromConfig(result.presence_card);
    } catch { /* ignore */ }
  }

  // — Helper: available entities —

  private _getAvailablePersonEntities(): { entityId: string; name: string }[] {
    if (!this.hass) return [];
    return Object.keys(this.hass.states)
      .filter((id) => id.startsWith('person.'))
      .map((id) => {
        const entity = this.hass?.states[id];
        const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1];
        return { entityId: id, name };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  private _getAvailableSmartphoneSensors(): { entityId: string; name: string }[] {
    if (!this.hass) return [];
    return Object.keys(this.hass.states)
      .filter((id) => id.startsWith('sensor.') && (
        id.includes('phone') || id.includes('mobile') || id.includes('smartphone') ||
        id.includes('tablet') || id.includes('iphone') || id.includes('galaxy') ||
        id.includes('pixel') || id.includes('oneplus')
      ))
      .map((id) => {
        const entity = this.hass?.states[id];
        const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1];
        return { entityId: id, name };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  private _getAvailableDrivingSensors(): { entityId: string; name: string }[] {
    if (!this.hass) return [];
    return Object.keys(this.hass.states)
      .filter((id) => id.startsWith('binary_sensor.'))
      .map((id) => {
        const entity = this.hass?.states[id];
        const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1];
        return { entityId: id, name };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  private _getAvailableNotifyServices(): string[] {
    if (!this.hass) return [];
    const services = (this.hass as unknown as Record<string, unknown>).services as Record<string, Record<string, unknown>> | undefined;
    return Object.keys(services?.notify ?? {}).map((s) => `notify.${s}`).sort();
  }

  // — Actions —

  private _togglePresencePerson(entityId: string): void {
    const persons = this._getAvailablePersonEntities();
    const autoMode = this._presencePersonEntities.length === 0;

    if (autoMode) {
      // Switching from auto to manual: select all except the toggled one
      this._presencePersonEntities = persons
        .map((p) => p.entityId)
        .filter((id) => id !== entityId);
    } else {
      const set = new Set(this._presencePersonEntities);
      if (set.has(entityId)) {
        // Don't allow deselecting the last person — return to auto mode instead
        if (set.size <= 1) {
          this._presencePersonEntities = [];
          return;
        }
        set.delete(entityId);
      } else {
        set.add(entityId);
      }
      this._presencePersonEntities = [...set];
    }
  }

  // — Render —

  renderPreview(): TemplateResult | typeof nothing {
    const persons = this._getAvailablePersonEntities();
    const selected = this._presencePersonEntities.length > 0
      ? persons.filter((p) => this._presencePersonEntities.includes(p.entityId))
      : persons;

    if (selected.length === 0) {
      return html`<div class="preview-empty">${t('config.presence_no_persons')}</div>`;
    }

    const homeCount = selected.filter((p) => {
      const entity = this.hass?.states[p.entityId];
      return entity?.state === 'home';
    }).length;

    return html`
      <div class="preview-presence">
        ${this._presenceShowHeader ? html`
          <div class="preview-presence-header">
            <span class="preview-presence-title">${t('presence.title')}</span>
            <span class="preview-presence-pill ${homeCount === selected.length ? 'all-home' : homeCount === 0 ? 'all-away' : 'mixed'}">
              ${homeCount}/${selected.length}
            </span>
          </div>
        ` : nothing}
        <div class="preview-presence-persons">
          ${selected.slice(0, 4).map((p) => {
            const entity = this.hass?.states[p.entityId];
            const isHome = entity?.state === 'home';
            const picture = entity?.attributes?.entity_picture as string | undefined;
            return html`
              <div class="preview-presence-person ${isHome ? 'home' : 'away'}">
                ${picture
                  ? html`<div class="preview-presence-avatar" style="background-image:url(${picture})"></div>`
                  : html`<div class="preview-presence-avatar fallback"><ha-icon .icon=${'mdi:account'}></ha-icon></div>`}
                <span class="preview-presence-name">${p.name}</span>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  renderTab(): TemplateResult {
    void this._lang;
    const persons = this._getAvailablePersonEntities();
    const selectedPersons = this._presencePersonEntities.length > 0
      ? this._presencePersonEntities
      : persons.map((p) => p.entityId);
    const smartphoneSensors = this._getAvailableSmartphoneSensors();
    const drivingSensors = this._getAvailableDrivingSensors();
    const notifyServices = this._getAvailableNotifyServices();

    return html`
      <div class="preview-encart">
        <div class="preview-label">${t('config.preview')}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-presence">
        <!-- Behaviour -->
        <div class="section-label">${t('config.behavior')}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            role="switch"
            aria-checked=${this._presenceShowHeader ? 'true' : 'false'}
            @click=${() => { this._presenceShowHeader = !this._presenceShowHeader; }}
          >
            <div class="feature-icon">
              <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${t('config.presence_show_header')}</div>
              <div class="feature-desc">${t('config.presence_show_header_desc')}</div>
            </div>
            <span
              class="toggle ${this._presenceShowHeader ? 'on' : ''}"
            ></span>
          </button>
        </div>

        <!-- Person entities -->
        <div class="section-label">${t('config.presence_persons')}</div>
        <div class="section-desc">${t('config.presence_persons_desc')}</div>

        ${persons.length === 0 ? html`
          <div class="preview-empty">${t('config.presence_no_persons')}</div>
        ` : html`
          <div class="item-list">
            ${persons.map((p) => {
              const selected = this._presencePersonEntities.includes(p.entityId);
              const autoMode = this._presencePersonEntities.length === 0;
              return html`
                <div class="item-row ${!selected && !autoMode ? 'disabled' : ''}">
                  <div class="feature-icon">
                    <ha-icon .icon=${'mdi:account'}></ha-icon>
                  </div>
                  <div class="item-info">
                    <span class="item-name">${p.name}</span>
                    <span class="item-meta">${p.entityId}</span>
                  </div>
                  <button
                    class="toggle ${selected || autoMode ? 'on' : ''}"
                    @click=${() => this._togglePresencePerson(p.entityId)}
                    role="switch"
                    aria-checked=${(selected || autoMode) ? 'true' : 'false'}
                    aria-label="${p.name}"
                  ></button>
                </div>
              `;
            })}
          </div>
        `}

        <!-- Per-person sensor mapping -->
        <div class="section-label">${t('config.presence_smartphone')}</div>
        <div class="section-desc">${t('config.presence_smartphone_desc')}</div>

        ${selectedPersons.map((personId) => {
          const person = persons.find((p) => p.entityId === personId);
          if (!person) return nothing;
          const currentSensor = this._presenceSmartphoneSensors[personId] || '';
          const currentNotify = this._presenceNotifyServices[personId] || '';
          const currentDriving = this._presenceDrivingSensors[personId] || '';
          const sensorName = smartphoneSensors.find((s) => s.entityId === currentSensor)?.name;
          const drivingName = drivingSensors.find((s) => s.entityId === currentDriving)?.name;
          const smKey = `${personId}:smartphone`;
          const notKey = `${personId}:notify`;
          const drvKey = `${personId}:driving`;

          return html`
            <div class="presence-mapping-card">
              <div class="presence-mapping-header">
                <div class="feature-icon">
                  <ha-icon .icon=${'mdi:account'}></ha-icon>
                </div>
                <span class="item-name">${person.name}</span>
              </div>

              <div class="presence-mapping-field">
                <label class="section-label">${t('config.presence_smartphone')}</label>
                <div class="dropdown ${this._presenceDropdownOpen === smKey ? 'open' : ''}">
                  <button
                    class="dropdown-trigger"
                    @click=${() => { this._presenceDropdownSearch = ''; this._presenceDropdownOpen = this._presenceDropdownOpen === smKey ? null : smKey; }}
                    aria-expanded=${this._presenceDropdownOpen === smKey ? 'true' : 'false'}
                    aria-haspopup="listbox"
                  >
                    <ha-icon .icon=${'mdi:cellphone'}></ha-icon>
                    <span>${sensorName || currentSensor || t('config.presence_auto_detect')}</span>
                    <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
                  </button>
                  <div class="dropdown-menu" role="listbox">
                    <input
                      class="dropdown-search"
                      type="text"
                      placeholder=${t('config.search_entity')}
                      .value=${this._presenceDropdownOpen === smKey ? this._presenceDropdownSearch : ''}
                      @input=${(e: InputEvent) => { this._presenceDropdownSearch = (e.target as HTMLInputElement).value; }}
                      @click=${(e: Event) => e.stopPropagation()}
                    />
                    <button
                      class="dropdown-item ${!currentSensor ? 'active' : ''}"
                      role="option"
                      aria-selected=${!currentSensor ? 'true' : 'false'}
                      @click=${() => {
                        const sensors = { ...this._presenceSmartphoneSensors };
                        delete sensors[personId];
                        this._presenceSmartphoneSensors = sensors;
                        this._presenceDropdownOpen = null;
                      }}
                    >
                      <ha-icon .icon=${'mdi:auto-fix'}></ha-icon>
                      ${t('config.presence_auto_detect')}
                    </button>
                    ${smartphoneSensors
                      .filter((s) => !this._presenceDropdownSearch || s.name.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase()) || s.entityId.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase()))
                      .map((s) => html`
                      <button
                        class="dropdown-item ${currentSensor === s.entityId ? 'active' : ''}"
                        role="option"
                        aria-selected=${currentSensor === s.entityId ? 'true' : 'false'}
                        @click=${() => {
                          this._presenceSmartphoneSensors = { ...this._presenceSmartphoneSensors, [personId]: s.entityId };
                          this._presenceDropdownOpen = null;
                        }}
                      >
                        <ha-icon .icon=${'mdi:cellphone'}></ha-icon>
                        ${s.name}
                      </button>
                    `)}
                  </div>
                </div>
              </div>

              <div class="presence-mapping-field">
                <label class="section-label">${t('config.presence_notify')}</label>
                <div class="dropdown ${this._presenceDropdownOpen === notKey ? 'open' : ''}">
                  <button
                    class="dropdown-trigger"
                    @click=${() => { this._presenceDropdownSearch = ''; this._presenceDropdownOpen = this._presenceDropdownOpen === notKey ? null : notKey; }}
                    aria-expanded=${this._presenceDropdownOpen === notKey ? 'true' : 'false'}
                    aria-haspopup="listbox"
                  >
                    <ha-icon .icon=${'mdi:bell'}></ha-icon>
                    <span>${currentNotify || t('config.presence_auto_detect')}</span>
                    <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
                  </button>
                  <div class="dropdown-menu" role="listbox">
                    <input
                      class="dropdown-search"
                      type="text"
                      placeholder=${t('config.search_entity')}
                      .value=${this._presenceDropdownOpen === notKey ? this._presenceDropdownSearch : ''}
                      @input=${(e: InputEvent) => { this._presenceDropdownSearch = (e.target as HTMLInputElement).value; }}
                      @click=${(e: Event) => e.stopPropagation()}
                    />
                    <button
                      class="dropdown-item ${!currentNotify ? 'active' : ''}"
                      role="option"
                      aria-selected=${!currentNotify ? 'true' : 'false'}
                      @click=${() => {
                        const services = { ...this._presenceNotifyServices };
                        delete services[personId];
                        this._presenceNotifyServices = services;
                        this._presenceDropdownOpen = null;
                      }}
                    >
                      <ha-icon .icon=${'mdi:auto-fix'}></ha-icon>
                      ${t('config.presence_auto_detect')}
                    </button>
                    ${notifyServices
                      .filter((s) => !this._presenceDropdownSearch || s.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase()))
                      .map((s) => html`
                      <button
                        class="dropdown-item ${currentNotify === s ? 'active' : ''}"
                        role="option"
                        aria-selected=${currentNotify === s ? 'true' : 'false'}
                        @click=${() => {
                          this._presenceNotifyServices = { ...this._presenceNotifyServices, [personId]: s };
                          this._presenceDropdownOpen = null;
                        }}
                      >
                        <ha-icon .icon=${'mdi:bell'}></ha-icon>
                        ${s}
                      </button>
                    `)}
                  </div>
                </div>
              </div>

              <div class="presence-mapping-field">
                <label class="section-label">${t('config.presence_driving')}</label>
                <div class="dropdown ${this._presenceDropdownOpen === drvKey ? 'open' : ''}">
                  <button
                    class="dropdown-trigger"
                    @click=${() => { this._presenceDropdownSearch = ''; this._presenceDropdownOpen = this._presenceDropdownOpen === drvKey ? null : drvKey; }}
                    aria-expanded=${this._presenceDropdownOpen === drvKey ? 'true' : 'false'}
                    aria-haspopup="listbox"
                  >
                    <ha-icon .icon=${'mdi:car'}></ha-icon>
                    <span>${drivingName || currentDriving || t('config.presence_auto_detect')}</span>
                    <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
                  </button>
                  <div class="dropdown-menu" role="listbox">
                    <input
                      class="dropdown-search"
                      type="text"
                      placeholder=${t('config.search_entity')}
                      .value=${this._presenceDropdownOpen === drvKey ? this._presenceDropdownSearch : ''}
                      @input=${(e: InputEvent) => { this._presenceDropdownSearch = (e.target as HTMLInputElement).value; }}
                      @click=${(e: Event) => e.stopPropagation()}
                    />
                    <button
                      class="dropdown-item ${!currentDriving ? 'active' : ''}"
                      role="option"
                      aria-selected=${!currentDriving ? 'true' : 'false'}
                      @click=${() => {
                        const sensors = { ...this._presenceDrivingSensors };
                        delete sensors[personId];
                        this._presenceDrivingSensors = sensors;
                        this._presenceDropdownOpen = null;
                      }}
                    >
                      <ha-icon .icon=${'mdi:auto-fix'}></ha-icon>
                      ${t('config.presence_auto_detect')}
                    </button>
                    ${drivingSensors
                      .filter((s) => !this._presenceDropdownSearch || s.name.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase()) || s.entityId.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase()))
                      .map((s) => html`
                      <button
                        class="dropdown-item ${currentDriving === s.entityId ? 'active' : ''}"
                        role="option"
                        aria-selected=${currentDriving === s.entityId ? 'true' : 'false'}
                        @click=${() => {
                          this._presenceDrivingSensors = { ...this._presenceDrivingSensors, [personId]: s.entityId };
                          this._presenceDropdownOpen = null;
                        }}
                      >
                        <ha-icon .icon=${'mdi:car'}></ha-icon>
                        ${s.name}
                      </button>
                    `)}
                  </div>
                </div>
              </div>
            </div>
          `;
        })}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${() => this.reload()}>${t('common.reset')}</button>
        </div>
      </div>
    `;
  }
}

try { customElements.define('config-tab-presence', ConfigTabPresence); } catch { /* already registered */ }
