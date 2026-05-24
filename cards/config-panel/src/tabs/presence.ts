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
  @state() _presenceSleepSensors: Record<string, string> = {};
  @state() _presenceDropdownOpen: string | null = null;
  @state() _presenceDropdownSearch = '';
  @state() _personDragIdx: number | null = null;
  @state() _personDropIdx: number | null = null;

  protected static override _AUTO_SAVE_KEYS = new Set([
    '_presenceShowHeader', '_presencePersonEntities', '_presenceSmartphoneSensors', '_presenceNotifyServices', '_presenceDrivingSensors', '_presenceSleepSensors',
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
    this._presenceDropdownSearch = '';
  }

  // — Persistence —

  loadFromConfig(config: Record<string, unknown>): void {
    const c = config as {
      show_header?: boolean;
      person_entities?: string[];
      smartphone_sensors?: Record<string, string>;
      notify_services?: Record<string, string>;
      driving_sensors?: Record<string, string>;
      sleep_sensors?: Record<string, string>;
    };
    this._presenceShowHeader = c.show_header ?? true;
    this._presencePersonEntities = c.person_entities ?? [];
    this._presenceSmartphoneSensors = c.smartphone_sensors ?? {};
    this._presenceNotifyServices = c.notify_services ?? {};
    this._presenceDrivingSensors = c.driving_sensors ?? {};
    this._presenceSleepSensors = c.sleep_sensors ?? {};
  }

  collectSaveData(): Record<string, unknown> {
    return {
      show_header: this._presenceShowHeader,
      person_entities: this._presencePersonEntities,
      smartphone_sensors: this._presenceSmartphoneSensors,
      notify_services: this._presenceNotifyServices,
      driving_sensors: this._presenceDrivingSensors,
      sleep_sensors: this._presenceSleepSensors,
    };
  }

  protected override async _performSave(): Promise<void> {
    await this.backend!.send('set_presence_config', this.collectSaveData());
    bus.emit('presence-config-changed', undefined);
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
          sleep_sensors?: Record<string, string>;
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

  private _entitiesByDomain(prefixes: string[]): { entityId: string; name: string }[] {
    if (!this.hass) return [];
    return Object.keys(this.hass.states)
      .filter((id) => prefixes.some((p) => id.startsWith(p)))
      .map((id) => {
        const entity = this.hass?.states[id];
        const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1];
        return { entityId: id, name };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }
  private _getAvailableDrivingSensors() { return this._entitiesByDomain(['binary_sensor.']); }
  private _getAvailableSleepSensors() { return this._entitiesByDomain(['input_boolean.', 'binary_sensor.']); }

  private _getAvailableNotifyServices(): string[] {
    if (!this.hass) return [];
    const services = (this.hass as unknown as Record<string, unknown>).services as Record<string, Record<string, unknown>> | undefined;
    return Object.keys(services?.notify ?? {}).map((s) => `notify.${s}`).sort();
  }

  // — Dropdown render helper — used by all four per-person dropdowns
  // (smartphone, notify, driving, sleep) to avoid 50-line copy-paste blocks.

  private _renderEntityDropdown<T>(cfg: {
    key: string;
    triggerIcon: string;
    triggerLabel: string;
    items: T[];
    itemIcon: string;
    itemId: (item: T) => string;
    itemLabel: (item: T) => string;
    activeId: string;          // current selected id; '' if none
    noneLabel: string;
    noneIcon: string;
    onSelect: (item: T) => void;
    onClear: () => void;
  }): TemplateResult {
    const isOpen = this._presenceDropdownOpen === cfg.key;
    const search = isOpen ? this._presenceDropdownSearch : '';
    const q = search.toLowerCase();
    const filtered = !q
      ? cfg.items
      : cfg.items.filter((it) =>
          cfg.itemLabel(it).toLowerCase().includes(q) ||
          cfg.itemId(it).toLowerCase().includes(q),
        );
    return html`
      <div class="presence-mapping-field">
        <div class="dropdown ${isOpen ? 'open' : ''}">
          <button
            class="dropdown-trigger"
            @click=${() => {
              this._presenceDropdownSearch = '';
              this._presenceDropdownOpen = isOpen ? null : cfg.key;
            }}
            aria-expanded=${isOpen ? 'true' : 'false'}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${cfg.triggerIcon}></ha-icon>
            <span>${cfg.triggerLabel}</span>
            <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            <input
              class="dropdown-search"
              type="text"
              placeholder=${t('config.search_entity')}
              .value=${search}
              @input=${(e: InputEvent) => { this._presenceDropdownSearch = (e.target as HTMLInputElement).value; }}
              @click=${(e: Event) => e.stopPropagation()}
            />
            <button
              class="dropdown-item ${!cfg.activeId ? 'active' : ''}"
              role="option"
              aria-selected=${!cfg.activeId ? 'true' : 'false'}
              @click=${() => { cfg.onClear(); this._presenceDropdownOpen = null; }}
            >
              <ha-icon .icon=${cfg.noneIcon}></ha-icon>
              ${cfg.noneLabel}
            </button>
            ${filtered.map((it) => {
              const id = cfg.itemId(it);
              return html`
                <button
                  class="dropdown-item ${cfg.activeId === id ? 'active' : ''}"
                  role="option"
                  aria-selected=${cfg.activeId === id ? 'true' : 'false'}
                  @click=${() => { cfg.onSelect(it); this._presenceDropdownOpen = null; }}
                >
                  <ha-icon .icon=${cfg.itemIcon}></ha-icon>
                  ${cfg.itemLabel(it)}
                </button>
              `;
            })}
          </div>
        </div>
      </div>
    `;
  }

  // — Actions —

  private _getOrderedPersons(persons: { entityId: string; name: string }[]): { entityId: string; name: string }[] {
    if (this._presencePersonEntities.length === 0) return persons;
    const orderMap = new Map(this._presencePersonEntities.map((id, i) => [id, i]));
    return [...persons].sort((a, b) => {
      const ai = orderMap.get(a.entityId) ?? 999;
      const bi = orderMap.get(b.entityId) ?? 999;
      if (ai !== bi) return ai - bi;
      return a.name.localeCompare(b.name);
    });
  }

  private _onPersonDrop(targetIdx: number): void {
    if (this._personDragIdx === null || this._personDragIdx === targetIdx) {
      this._personDragIdx = null;
      this._personDropIdx = null;
      return;
    }
    const persons = this._getAvailablePersonEntities();
    const ordered = this._getOrderedPersons(persons).map((p) => p.entityId);
    const [moved] = ordered.splice(this._personDragIdx, 1);
    ordered.splice(targetIdx, 0, moved);
    // If in auto mode, switching to manual with new order
    this._presencePersonEntities = ordered;
    this._personDragIdx = null;
    this._personDropIdx = null;
  }

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

  renderTab(): TemplateResult {
    void this._lang;
    const persons = this._getAvailablePersonEntities();
    const selectedPersons = this._presencePersonEntities.length > 0
      ? this._presencePersonEntities
      : persons.map((p) => p.entityId);
    const smartphoneSensors = this._getAvailableSmartphoneSensors();
    const drivingSensors = this._getAvailableDrivingSensors();
    const sleepSensors = this._getAvailableSleepSensors();
    const notifyServices = this._getAvailableNotifyServices();

    const autoMode = this._presencePersonEntities.length === 0;
    const selectedCount = autoMode ? persons.length : this._presencePersonEntities.length;

    return html`
      <div class="tab-panel presence-tab" id="panel-presence">
        <glass-presence-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-presence-card>
        <div class="cfg-info">
          <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
          <span>${t('config.presence_dashboard_info')}</span>
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
              nameKey: 'config.presence_show_header',
              descKey: 'config.presence_show_header_desc',
              on: this._presenceShowHeader,
              onToggle: () => { this._presenceShowHeader = !this._presenceShowHeader; },
            })}
          </div>
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">2</span>
            <div class="cfg-section-text">
              <span class="section-label">${t('config.presence_persons')}</span>
              <span class="section-desc">${t('config.presence_persons_desc')}</span>
            </div>
            ${persons.length > 0 ? html`
              <span class="cfg-section-count" aria-label="${t('common.count_visible', { count: selectedCount, total: persons.length })}">
                ${selectedCount}/${persons.length}
              </span>
            ` : nothing}
          </header>

        ${persons.length === 0 ? html`
          <glass-empty-state variant="inline" .icon=${'mdi:account-off-outline'} .title=${t('config.presence_no_persons')}></glass-empty-state>
        ` : html`
          <div class="item-list">
            ${this._getOrderedPersons(persons).map((p, idx) => {
              const selected = this._presencePersonEntities.includes(p.entityId);
              const isDragging = this._personDragIdx === idx;
              const isDropTarget = this._personDropIdx === idx && this._personDragIdx !== null && this._personDragIdx !== idx;
              return html`
                <div class="item-card">
                  <div class="item-row ${!selected && !autoMode ? 'disabled' : ''} ${isDragging ? 'dragging' : ''} ${isDropTarget ? 'drop-target' : ''}"
                    draggable="true"
                    @dragstart=${() => { this._personDragIdx = idx; }}
                    @dragover=${(e: DragEvent) => { e.preventDefault(); this._personDropIdx = idx; }}
                    @dragleave=${() => { this._personDropIdx = null; }}
                    @drop=${(e: DragEvent) => { e.preventDefault(); this._onPersonDrop(idx); }}
                    @dragend=${() => { this._personDragIdx = null; this._personDropIdx = null; }}
                  >
                    <glass-drag-handle></glass-drag-handle>
                    <div class="feature-icon">
                      <ha-icon .icon=${'mdi:account'}></ha-icon>
                    </div>
                    <div class="item-info">
                      <span class="item-name">${p.name}</span>
                      <span class="item-meta">${p.entityId}</span>
                    </div>
                    <glass-toggle
                      .checked=${selected || autoMode}
                      aria-label="${p.name}"
                      @glass-toggle-change=${() => this._togglePresencePerson(p.entityId)}
                    ></glass-toggle>
                  </div>
                </div>
              `;
            })}
          </div>
        `}
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">3</span>
            <div class="cfg-section-text">
              <span class="section-label">${t('config.presence_per_person')}</span>
              <span class="section-desc">${t('config.presence_per_person_desc')}</span>
            </div>
          </header>

        ${selectedPersons.length === 0 ? html`
          <glass-empty-state variant="inline" .icon=${'mdi:cellphone-off'} .title=${t('config.presence_no_persons')}></glass-empty-state>
        ` : nothing}

        ${selectedPersons.map((personId) => {
          const person = persons.find((p) => p.entityId === personId);
          if (!person) return nothing;
          const currentSensor = this._presenceSmartphoneSensors[personId] || '';
          const currentNotify = this._presenceNotifyServices[personId] || '';
          const currentDriving = this._presenceDrivingSensors[personId] || '';
          const currentSleep = this._presenceSleepSensors[personId] || '';
          const sensorName = smartphoneSensors.find((s) => s.entityId === currentSensor)?.name;
          const drivingName = drivingSensors.find((s) => s.entityId === currentDriving)?.name;
          const sleepName = sleepSensors.find((s) => s.entityId === currentSleep)?.name;
          const smKey = `${personId}:smartphone`;
          const notKey = `${personId}:notify`;
          const drvKey = `${personId}:driving`;
          const slpKey = `${personId}:sleep`;

          return html`
            <div class="presence-mapping-card">
              <div class="presence-mapping-header">
                <div class="feature-icon">
                  <ha-icon .icon=${'mdi:account'}></ha-icon>
                </div>
                <span class="item-name">${person.name}</span>
              </div>

              ${this._renderEntityDropdown({
                key: smKey,
                triggerIcon: 'mdi:cellphone',
                triggerLabel: sensorName || currentSensor || t('config.presence_auto_detect'),
                items: smartphoneSensors,
                itemIcon: 'mdi:cellphone',
                itemId: (s) => s.entityId,
                itemLabel: (s) => s.name,
                activeId: currentSensor,
                noneLabel: t('config.presence_auto_detect'),
                noneIcon: 'mdi:auto-fix',
                onSelect: (s) => { this._presenceSmartphoneSensors = { ...this._presenceSmartphoneSensors, [personId]: s.entityId }; },
                onClear: () => { const m = { ...this._presenceSmartphoneSensors }; delete m[personId]; this._presenceSmartphoneSensors = m; },
              })}
              ${this._renderEntityDropdown({
                key: notKey,
                triggerIcon: 'mdi:bell',
                triggerLabel: currentNotify || t('config.presence_auto_detect'),
                items: notifyServices,
                itemIcon: 'mdi:bell',
                itemId: (s) => s,
                itemLabel: (s) => s,
                activeId: currentNotify,
                noneLabel: t('config.presence_auto_detect'),
                noneIcon: 'mdi:auto-fix',
                onSelect: (s) => { this._presenceNotifyServices = { ...this._presenceNotifyServices, [personId]: s }; },
                onClear: () => { const m = { ...this._presenceNotifyServices }; delete m[personId]; this._presenceNotifyServices = m; },
              })}
              ${this._renderEntityDropdown({
                key: drvKey,
                triggerIcon: 'mdi:car',
                triggerLabel: drivingName || currentDriving || t('config.presence_auto_detect'),
                items: drivingSensors,
                itemIcon: 'mdi:car',
                itemId: (s) => s.entityId,
                itemLabel: (s) => s.name,
                activeId: currentDriving,
                noneLabel: t('config.presence_auto_detect'),
                noneIcon: 'mdi:auto-fix',
                onSelect: (s) => { this._presenceDrivingSensors = { ...this._presenceDrivingSensors, [personId]: s.entityId }; },
                onClear: () => { const m = { ...this._presenceDrivingSensors }; delete m[personId]; this._presenceDrivingSensors = m; },
              })}
              ${this._renderEntityDropdown({
                key: slpKey,
                triggerIcon: 'mdi:sleep',
                triggerLabel: sleepName || currentSleep || t('config.presence_sleep_none'),
                items: sleepSensors,
                itemIcon: 'mdi:sleep',
                itemId: (s) => s.entityId,
                itemLabel: (s) => s.name,
                activeId: currentSleep,
                noneLabel: t('config.presence_sleep_none'),
                noneIcon: 'mdi:close-circle-outline',
                onSelect: (s) => { this._presenceSleepSensors = { ...this._presenceSleepSensors, [personId]: s.entityId }; },
                onClear: () => { const m = { ...this._presenceSleepSensors }; delete m[personId]; this._presenceSleepSensors = m; },
              })}
            </div>
          `;
        })}
        </section>

        <div class="save-bar">
          <glass-button variant="ghost" @click=${() => this.reload()}>${t('common.reset')}</glass-button>
        </div>
      </div>
    `;
  }
}

try { customElements.define('config-tab-presence', ConfigTabPresence); } catch { /* already registered */ }
