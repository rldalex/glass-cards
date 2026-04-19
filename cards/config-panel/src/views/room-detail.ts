import { LitElement, html, nothing, type TemplateResult, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';
import type { HomeAssistant, BackendService } from '@glass-cards/base-card';
import { getAreaEntities } from '@glass-cards/base-card';
import { DOMAIN_COLORS } from '@glass-cards/ui-core';
import type { SceneEntry } from '../types';
import { DEFAULT_CARD_ORDER, IMPLEMENTED_CARDS, CARD_ICONS } from '../types';
import { createSaveScheduler } from '../utils/save-scheduler';

interface SectionDef {
  id: string;
  label: string;
  icon: string;
  domains: string[];
  color: string;
  visible: boolean;
  count: number;
}

const SECTION_DEFS: Omit<SectionDef, 'visible' | 'count'>[] = [
  { id: 'light', label: 'Lumières', icon: 'mdi:lightbulb-group', domains: ['light'], color: DOMAIN_COLORS.light.rgb },
  { id: 'cover', label: 'Volets', icon: 'mdi:window-shutter', domains: ['cover'], color: DOMAIN_COLORS.cover.rgb },
  { id: 'climate', label: 'Climat', icon: 'mdi:thermostat', domains: ['climate'], color: DOMAIN_COLORS.climate.rgb },
  { id: 'media', label: 'Media', icon: 'mdi:speaker', domains: ['media_player'], color: DOMAIN_COLORS.media.rgb },
  { id: 'fan', label: 'Ventilateurs', icon: 'mdi:fan', domains: ['fan'], color: DOMAIN_COLORS.fan.rgb },
  { id: 'camera', label: 'Caméras', icon: 'mdi:cctv', domains: ['camera'], color: DOMAIN_COLORS.camera.rgb },
];

export class ConfigRoomDetail extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property() areaId!: string;
  @property({ attribute: false }) configData: Record<string, unknown> = {};
  @property({ attribute: false }) backend?: BackendService;
  @property({ attribute: false }) rooms: unknown[] = [];

  @state() private _openSections = new Set<string>();
  @state() private _sections: SectionDef[] = [];
  @state() private _scenes: SceneEntry[] = [];

  // Sensor config per room
  @state() private _tempEntity = '';
  @state() private _humidityEntity = '';
  @state() private _tempHigh: number | null = null;
  @state() private _tempLow: number | null = null;
  @state() private _humidityThreshold: number | null = null;
  @state() private _showLights = true;
  @state() private _showTemperature = true;
  @state() private _showHumidity = true;
  @state() private _presenceEntity = '';
  @state() private _showPresence = false;
  @state() private _sortByLights = true;
  private _availableTempEntities: { id: string; name: string }[] = [];
  private _availableHumidityEntities: { id: string; name: string }[] = [];
  private _availablePresenceEntities: { id: string; name: string }[] = [];
  @state() private _tempDropdownOpen = false;
  @state() private _humidityDropdownOpen = false;
  @state() private _presenceDropdownOpen = false;

  // Drag state for section reorder
  @state() private _dragIdx: number | null = null;
  @state() private _dropIdx: number | null = null;
  @state() private _dragContext: 'sections' | 'scenes' | null = null;

  private _loaded = false;
  private _autoOpenDone = false;
  private _saveScheduler = createSaveScheduler();

  protected createRenderRoot() { return this; }

  override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('areaId') || changedProps.has('hass')) {
      this._loaded = false;
      this._autoOpenDone = false;
    }
    if (!this._loaded && this.hass && this.areaId) {
      this._loaded = true;
      this._loadRoomConfig();
    }
    if (!this._autoOpenDone && this._sections.length > 0) {
      this._autoOpenDone = true;
      // All folds closed by default
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._saveScheduler.cancel();
  }

  // ── Load ──

  private async _loadRoomConfig(): Promise<void> {
    if (!this.hass || !this.areaId) return;

    const entities = getAreaEntities(this.areaId, this.hass.entities, this.hass.devices);

    let storedOrder: string[] | null = null;
    let hiddenScenes = new Set<string>();
    let sceneOrder: string[] = [];

    try {
      if (!this.backend) throw new Error('No backend');
      const result = await this.backend.send<{
        card_order: string[];
        hidden_entities: string[];
        hidden_scenes: string[];
        scene_order: string[];
        temperature_entity?: string | null;
        humidity_entity?: string | null;
        temp_high?: number | null;
        temp_low?: number | null;
        humidity_threshold?: number | null;
        show_lights?: boolean;
        show_temperature?: boolean;
        show_humidity?: boolean;
        presence_entity?: string | null;
        show_presence?: boolean;
        sort_by_lights?: boolean;
      } | null>('get_room', { area_id: this.areaId });
      if (result) {
        storedOrder = result.card_order.length > 0 ? result.card_order : null;
        hiddenScenes = new Set(result.hidden_scenes ?? []);
        sceneOrder = result.scene_order ?? [];
        this._tempEntity = result.temperature_entity ?? '';
        this._humidityEntity = result.humidity_entity ?? '';
        this._tempHigh = result.temp_high ?? null;
        this._tempLow = result.temp_low ?? null;
        this._humidityThreshold = result.humidity_threshold ?? null;
        this._showLights = result.show_lights ?? true;
        this._showTemperature = result.show_temperature ?? true;
        this._showHumidity = result.show_humidity ?? true;
        this._presenceEntity = result.presence_entity ?? '';
        this._showPresence = result.show_presence ?? false;
        this._sortByLights = result.sort_by_lights ?? true;
      }
    } catch { /* backend not available */ }

    // Build available sensor entity lists for this room
    const hass = this.hass;
    this._availableTempEntities = [];
    this._availableHumidityEntities = [];
    this._availablePresenceEntities = [];
    for (const e of entities) {
      const state = hass.states[e.entity_id];
      const dc = state?.attributes?.device_class;
      const name = (state?.attributes?.friendly_name as string) || e.entity_id.split('.')[1];
      if (e.entity_id.startsWith('sensor.')) {
        if (dc === 'temperature') this._availableTempEntities.push({ id: e.entity_id, name });
        if (dc === 'humidity') this._availableHumidityEntities.push({ id: e.entity_id, name });
      }
      if (e.entity_id.startsWith('binary_sensor.') && (dc === 'presence' || dc === 'occupancy' || dc === 'motion')) {
        this._availablePresenceEntities.push({ id: e.entity_id, name });
      }
    }

    // Count entities per domain
    const domainCounts = new Map<string, number>();
    for (const e of entities) {
      const d = e.entity_id.split('.')[0];
      domainCounts.set(d, (domainCounts.get(d) || 0) + 1);
    }

    // Build ordered sections — only domains that have entities
    const orderedIds = storedOrder ? [...storedOrder] : [...DEFAULT_CARD_ORDER];
    const orderedSet = new Set(orderedIds);
    for (const domain of domainCounts.keys()) {
      if (!orderedSet.has(domain) && CARD_ICONS[domain]) orderedIds.push(domain);
    }

    this._sections = orderedIds
      .map(id => {
        const def = SECTION_DEFS.find(s => s.domains.includes(id) || s.id === id);
        if (!def) return null;
        const count = def.domains.reduce((sum, d) => sum + (domainCounts.get(d) || 0), 0);
        if (count === 0 || !IMPLEMENTED_CARDS.has(id)) return null;
        return {
          ...def,
          visible: storedOrder ? storedOrder.includes(id) : true,
          count,
        };
      })
      .filter((s): s is SectionDef => s !== null);

    // Build scenes
    const sceneEntities = entities.filter(e => e.entity_id.startsWith('scene.'));
    const sceneOrderMap = new Map<string, number>();
    sceneOrder.forEach((id, i) => sceneOrderMap.set(id, i));

    const scenes: SceneEntry[] = sceneEntities.map(e => {
      const state = hass.states[e.entity_id];
      return {
        entityId: e.entity_id,
        name: (state?.attributes.friendly_name as string) || e.entity_id.split('.')[1],
        visible: !hiddenScenes.has(e.entity_id),
      };
    });
    scenes.sort((a, b) => {
      const aIdx = sceneOrderMap.get(a.entityId);
      const bIdx = sceneOrderMap.get(b.entityId);
      if (aIdx !== undefined && bIdx !== undefined) return aIdx - bIdx;
      if (aIdx !== undefined) return -1;
      if (bIdx !== undefined) return 1;
      return a.name.localeCompare(b.name);
    });
    this._scenes = scenes;
  }

  // ── Save ──

  private _scheduleSave(): void {
    this._saveScheduler.schedule(() => this._save());
  }

  private async _save(): Promise<void> {
    if (!this.backend || !this.areaId) return;
    try {
      await this.backend.send('set_room', {
        area_id: this.areaId,
        card_order: this._sections.filter(s => s.visible).map(s => s.id),
        hidden_scenes: this._scenes.filter(s => !s.visible).map(s => s.entityId),
        scene_order: this._scenes.map(s => s.entityId),
        temperature_entity: this._tempEntity || null,
        humidity_entity: this._humidityEntity || null,
        temp_high: this._tempHigh,
        temp_low: this._tempLow,
        humidity_threshold: this._humidityThreshold,
        show_lights: this._showLights,
        show_temperature: this._showTemperature,
        show_humidity: this._showHumidity,
        presence_entity: this._presenceEntity || null,
        show_presence: this._showPresence,
        sort_by_lights: this._sortByLights,
      });
      bus.emit('room-config-changed', { areaId: this.areaId });
      this.dispatchEvent(new CustomEvent('tab-toast', { detail: { success: true }, bubbles: true, composed: true }));
    } catch {
      this.dispatchEvent(new CustomEvent('tab-toast', { detail: { success: false }, bubbles: true, composed: true }));
    }
  }

  // ── Actions ──

  private _toggleSectionVisible(id: string): void {
    this._sections = this._sections.map(s => s.id === id ? { ...s, visible: !s.visible } : s);
    if (!this._sections.find(s => s.id === id)?.visible) {
      this._openSections.delete(id);
    }
    this._scheduleSave();
  }

  private _toggleSceneVisible(entityId: string): void {
    this._scenes = this._scenes.map(s => s.entityId === entityId ? { ...s, visible: !s.visible } : s);
    this._scheduleSave();
  }

  private _toggleSection(sectionId: string): void {
    if (this._openSections.has(sectionId)) this._openSections.delete(sectionId);
    else this._openSections.add(sectionId);
    this.requestUpdate();
  }

  // ── Drag & drop ──

  private _onDragStart(idx: number, ctx: 'sections' | 'scenes'): void {
    this._dragIdx = idx;
    this._dragContext = ctx;
  }
  private _onDragOver(idx: number, e: DragEvent): void {
    e.preventDefault();
    if (this._dragIdx !== null && this._dragIdx !== idx) this._dropIdx = idx;
  }
  private _onDragLeave(): void { this._dropIdx = null; }
  private _onDragEnd(): void { this._dragIdx = null; this._dropIdx = null; this._dragContext = null; }

  private _onDrop(idx: number, e: DragEvent): void {
    e.preventDefault();
    if (this._dragIdx === null || this._dragIdx === idx) {
      this._dragIdx = null; this._dropIdx = null; return;
    }
    if (this._dragContext === 'sections') {
      const arr = [...this._sections];
      const [moved] = arr.splice(this._dragIdx, 1);
      arr.splice(idx, 0, moved);
      this._sections = arr;
      this._scheduleSave();
    } else if (this._dragContext === 'scenes') {
      const arr = [...this._scenes];
      const [moved] = arr.splice(this._dragIdx, 1);
      arr.splice(idx, 0, moved);
      this._scenes = arr;
      this._scheduleSave();
    }
    this._dragIdx = null;
    this._dropIdx = null;
  }

  // ── Render ──

  protected render(): TemplateResult {
    if (!this._sections.length) return html`<div class="empty-state">Aucune entité dans cette pièce</div>`;

    return html`
      ${this._renderIndicators()}
      ${this._renderSensors()}

      ${this._scenes.length > 0 ? html`
        <div class="section-label">${t('config.popup_scenes')}</div>
        <div class="scene-chips">
          ${this._scenes.map((scene, idx) => html`
            <button
              class="scene-chip ${scene.visible ? 'on' : ''} ${this._dragIdx === idx && this._dragContext === 'scenes' ? 'dragging' : ''} ${this._dropIdx === idx && this._dragContext === 'scenes' ? 'drop-target' : ''}"
              draggable="true"
              @click=${() => this._toggleSceneVisible(scene.entityId)}
              @dragstart=${(e: DragEvent) => { e.stopPropagation(); this._onDragStart(idx, 'scenes'); }}
              @dragover=${(e: DragEvent) => { e.preventDefault(); e.stopPropagation(); if (this._dragIdx !== null && this._dragIdx !== idx) this._dropIdx = idx; }}
              @dragleave=${() => { this._dropIdx = null; }}
              @drop=${(e: DragEvent) => { e.preventDefault(); e.stopPropagation(); this._onDrop(idx, e); }}
              @dragend=${() => this._onDragEnd()}
              aria-label="${scene.visible ? t('common.hide') : t('common.show')} ${scene.name}"
            >
              <ha-icon class="chip-drag" .icon=${'mdi:drag'}></ha-icon>
              <ha-icon .icon=${'mdi:palette'}></ha-icon>
              <span>${scene.name}</span>
            </button>
          `)}
        </div>
      ` : nothing}

      <div class="section-label pw-rd-cards-label">${t('config.popup_internal_cards')}</div>
      <div class="room-sections">
        ${this._sections.map((sec, idx) => {
          const isOpen = this._openSections.has(sec.id) && sec.visible;
          const isDragging = this._dragIdx === idx && this._dragContext === 'sections';
          const isDropTarget = this._dropIdx === idx && this._dragContext === 'sections';

          return html`
            <div
              class="${isDragging ? 'dragging' : ''} ${isDropTarget ? 'drop-target' : ''}"
              draggable="true"
              @dragstart=${() => this._onDragStart(idx, 'sections')}
              @dragover=${(e: DragEvent) => this._onDragOver(idx, e)}
              @dragleave=${() => this._onDragLeave()}
              @drop=${(e: DragEvent) => this._onDrop(idx, e)}
              @dragend=${() => this._onDragEnd()}
            >
              <div class="section-header-wrap ${sec.visible ? '' : 'off'}">
                <span class="drag-handle"><ha-icon .icon=${'mdi:drag'}></ha-icon></span>
                <button class="section-header" @click=${() => { if (sec.visible) this._toggleSection(sec.id); }}
                  aria-expanded=${isOpen ? 'true' : 'false'}>
                  <div class="section-header-icon" style="background:rgba(${sec.color},0.08);border:1px solid rgba(${sec.color},0.12);">
                    <ha-icon .icon=${sec.icon} style="color:rgb(${sec.color});"></ha-icon>
                  </div>
                  <span class="section-title">${sec.label}</span>
                </button>
                <button
                  class="toggle ${sec.visible ? 'on' : ''}"
                  @click=${(e: Event) => { e.stopPropagation(); this._toggleSectionVisible(sec.id); }}
                  role="switch"
                  aria-checked=${sec.visible ? 'true' : 'false'}
                  aria-label="${sec.visible ? t('common.hide') : t('common.show')} ${sec.label}"
                ></button>
                ${sec.visible ? html`
                  <ha-icon class="section-chevron ${isOpen ? 'open' : ''}" .icon=${'mdi:chevron-down'}
                    @click=${() => this._toggleSection(sec.id)}></ha-icon>
                ` : nothing}
              </div>
              ${sec.visible ? html`
                <div class="fold-sep ${isOpen ? 'visible' : ''}" style="--fold-color:rgb(${sec.color})"></div>
                <div class="section-fold ${isOpen ? 'open' : ''}">
                  <div class="section-fold-inner" aria-hidden=${isOpen ? 'false' : 'true'}>
                    <div class="section-content">
                      ${isOpen ? this._renderSection(sec) : nothing}
                    </div>
                  </div>
                </div>
              ` : nothing}
            </div>
          `;
        })}
      </div>
    `;
  }

  private _selectTempEntity(id: string): void {
    this._tempEntity = id;
    this._tempDropdownOpen = false;
    this._scheduleSave();
  }

  private _selectHumidityEntity(id: string): void {
    this._humidityEntity = id;
    this._humidityDropdownOpen = false;
    this._scheduleSave();
  }

  private _selectPresenceEntity(id: string): void {
    this._presenceEntity = id;
    this._presenceDropdownOpen = false;
    this._scheduleSave();
  }

  private _renderIndicators(): TemplateResult {
    return html`
      <div class="section-label">${t('config.room_indicators')}</div>
      <div class="section-desc">${t('config.room_indicators_desc')}</div>
      <div class="feature-list">
        <button class="feature-row" @click=${() => { this._showLights = !this._showLights; this._scheduleSave(); }}>
          <div class="feature-icon"><ha-icon .icon=${'mdi:lightbulb'}></ha-icon></div>
          <div class="feature-text">
            <div class="feature-name">${t('config.room_show_lights')}</div>
          </div>
          <span class="toggle ${this._showLights ? 'on' : ''}" role="switch" aria-checked=${this._showLights ? 'true' : 'false'} aria-label=${t('config.room_show_lights')}></span>
        </button>
        <button class="feature-row" @click=${() => { this._showTemperature = !this._showTemperature; this._scheduleSave(); }}>
          <div class="feature-icon"><ha-icon .icon=${'mdi:thermometer'}></ha-icon></div>
          <div class="feature-text">
            <div class="feature-name">${t('config.room_show_temperature')}</div>
          </div>
          <span class="toggle ${this._showTemperature ? 'on' : ''}" role="switch" aria-checked=${this._showTemperature ? 'true' : 'false'} aria-label=${t('config.room_show_temperature')}></span>
        </button>
        <button class="feature-row" @click=${() => { this._showHumidity = !this._showHumidity; this._scheduleSave(); }}>
          <div class="feature-icon"><ha-icon .icon=${'mdi:water-percent'}></ha-icon></div>
          <div class="feature-text">
            <div class="feature-name">${t('config.room_show_humidity')}</div>
          </div>
          <span class="toggle ${this._showHumidity ? 'on' : ''}" role="switch" aria-checked=${this._showHumidity ? 'true' : 'false'} aria-label=${t('config.room_show_humidity')}></span>
        </button>
        <button class="feature-row" @click=${() => { this._sortByLights = !this._sortByLights; this._scheduleSave(); }}>
          <div class="feature-icon"><ha-icon .icon=${'mdi:lightbulb-auto'}></ha-icon></div>
          <div class="feature-text">
            <div class="feature-name">${t('config.room_sort_by_lights')}</div>
          </div>
          <span class="toggle ${this._sortByLights ? 'on' : ''}" role="switch" aria-checked=${this._sortByLights ? 'true' : 'false'} aria-label=${t('config.room_sort_by_lights')}></span>
        </button>
        <button class="feature-row" @click=${() => { this._showPresence = !this._showPresence; this._scheduleSave(); }}>
          <div class="feature-icon"><ha-icon .icon=${'mdi:motion-sensor'}></ha-icon></div>
          <div class="feature-text">
            <div class="feature-name">${t('config.room_sort_by_presence')}</div>
          </div>
          <span class="toggle ${this._showPresence ? 'on' : ''}" role="switch" aria-checked=${this._showPresence ? 'true' : 'false'} aria-label=${t('config.room_sort_by_presence')}></span>
        </button>
      </div>
    `;
  }

  private _renderSensors(): TemplateResult {
    // Always show — user can choose "none" even if sensors exist
    const tempLabel = this._tempEntity === '__none__'
      ? t('config.room_no_sensor')
      : this._tempEntity
        ? this._availableTempEntities.find(s => s.id === this._tempEntity)?.name ?? this._tempEntity
        : t('config.room_auto_detect');

    const humidityLabel = this._humidityEntity === '__none__'
      ? t('config.room_no_sensor')
      : this._humidityEntity
        ? this._availableHumidityEntities.find(s => s.id === this._humidityEntity)?.name ?? this._humidityEntity
        : t('config.room_auto_detect');

    const presenceLabel = this._presenceEntity === '__none__'
      ? t('config.room_no_sensor')
      : this._presenceEntity
        ? this._availablePresenceEntities.find(s => s.id === this._presenceEntity)?.name ?? this._presenceEntity
        : t('config.room_auto_detect');

    return html`
      <div class="section-label">${t('config.room_sensors')}</div>
      <div class="section-desc">${t('config.room_sensors_desc')}</div>

      <div class="feature-name pw-rd-sensor-label">${t('config.room_temp_entity')}</div>
      <div class="dropdown ${this._tempDropdownOpen ? 'open' : ''}">
        <button
          class="dropdown-trigger"
          @click=${() => { this._tempDropdownOpen = !this._tempDropdownOpen; this._humidityDropdownOpen = false; this._presenceDropdownOpen = false; }}
          aria-expanded=${this._tempDropdownOpen ? 'true' : 'false'}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${'mdi:thermometer'}></ha-icon>
          <span>${tempLabel}</span>
          <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          <button
            class="dropdown-item ${!this._tempEntity ? 'active' : ''}"
            role="option"
            aria-selected=${!this._tempEntity ? 'true' : 'false'}
            @click=${() => this._selectTempEntity('')}
          >
            <ha-icon .icon=${'mdi:auto-fix'}></ha-icon>
            ${t('config.room_auto_detect')}
          </button>
          ${this._availableTempEntities.map(s => html`
            <button
              class="dropdown-item ${this._tempEntity === s.id ? 'active' : ''}"
              role="option"
              aria-selected=${this._tempEntity === s.id ? 'true' : 'false'}
              @click=${() => this._selectTempEntity(s.id)}
            >
              <ha-icon .icon=${'mdi:thermometer'}></ha-icon>
              ${s.name}
            </button>
          `)}
          <button
            class="dropdown-item ${this._tempEntity === '__none__' ? 'active' : ''}"
            role="option"
            aria-selected=${this._tempEntity === '__none__' ? 'true' : 'false'}
            @click=${() => this._selectTempEntity('__none__')}
          >
            <ha-icon .icon=${'mdi:close-circle-outline'}></ha-icon>
            ${t('config.room_no_sensor')}
          </button>
        </div>
      </div>

      <div class="feature-name pw-rd-sensor-label">${t('config.room_humidity_entity')}</div>
      <div class="dropdown ${this._humidityDropdownOpen ? 'open' : ''}">
        <button
          class="dropdown-trigger"
          @click=${() => { this._humidityDropdownOpen = !this._humidityDropdownOpen; this._tempDropdownOpen = false; this._presenceDropdownOpen = false; }}
          aria-expanded=${this._humidityDropdownOpen ? 'true' : 'false'}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${'mdi:water-percent'}></ha-icon>
          <span>${humidityLabel}</span>
          <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          <button
            class="dropdown-item ${!this._humidityEntity ? 'active' : ''}"
            role="option"
            aria-selected=${!this._humidityEntity ? 'true' : 'false'}
            @click=${() => this._selectHumidityEntity('')}
          >
            <ha-icon .icon=${'mdi:auto-fix'}></ha-icon>
            ${t('config.room_auto_detect')}
          </button>
          ${this._availableHumidityEntities.map(s => html`
            <button
              class="dropdown-item ${this._humidityEntity === s.id ? 'active' : ''}"
              role="option"
              aria-selected=${this._humidityEntity === s.id ? 'true' : 'false'}
              @click=${() => this._selectHumidityEntity(s.id)}
            >
              <ha-icon .icon=${'mdi:water-percent'}></ha-icon>
              ${s.name}
            </button>
          `)}
          <button
            class="dropdown-item ${this._humidityEntity === '__none__' ? 'active' : ''}"
            role="option"
            aria-selected=${this._humidityEntity === '__none__' ? 'true' : 'false'}
            @click=${() => this._selectHumidityEntity('__none__')}
          >
            <ha-icon .icon=${'mdi:close-circle-outline'}></ha-icon>
            ${t('config.room_no_sensor')}
          </button>
        </div>
      </div>

      <div class="feature-name pw-rd-sensor-label">${t('config.room_presence_entity')}</div>
      <div class="dropdown ${this._presenceDropdownOpen ? 'open' : ''}">
        <button
          class="dropdown-trigger"
          @click=${() => { this._presenceDropdownOpen = !this._presenceDropdownOpen; this._tempDropdownOpen = false; this._humidityDropdownOpen = false; }}
          aria-expanded=${this._presenceDropdownOpen ? 'true' : 'false'}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${'mdi:motion-sensor'}></ha-icon>
          <span>${presenceLabel}</span>
          <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          <button
            class="dropdown-item ${!this._presenceEntity ? 'active' : ''}"
            role="option"
            aria-selected=${!this._presenceEntity ? 'true' : 'false'}
            @click=${() => this._selectPresenceEntity('')}
          >
            <ha-icon .icon=${'mdi:auto-fix'}></ha-icon>
            ${t('config.room_auto_detect')}
          </button>
          ${this._availablePresenceEntities.map(s => html`
            <button
              class="dropdown-item ${this._presenceEntity === s.id ? 'active' : ''}"
              role="option"
              aria-selected=${this._presenceEntity === s.id ? 'true' : 'false'}
              @click=${() => this._selectPresenceEntity(s.id)}
            >
              <ha-icon .icon=${'mdi:motion-sensor'}></ha-icon>
              ${s.name}
            </button>
          `)}
          <button
            class="dropdown-item ${this._presenceEntity === '__none__' ? 'active' : ''}"
            role="option"
            aria-selected=${this._presenceEntity === '__none__' ? 'true' : 'false'}
            @click=${() => this._selectPresenceEntity('__none__')}
          >
            <ha-icon .icon=${'mdi:close-circle-outline'}></ha-icon>
            ${t('config.room_no_sensor')}
          </button>
        </div>
      </div>

      <div class="feature-name pw-rd-threshold-label">${t('config.room_thresholds')}</div>
      <div class="feature-list">
        <div class="range-row">
          <div class="feature-icon"><ha-icon .icon=${'mdi:thermometer-high'}></ha-icon></div>
          <div class="feature-text pw-rd-flex-fixed">
            <div class="feature-name">${t('config.room_temp_high')}</div>
          </div>
          <input type="range" class="range-input" min="20" max="35" step="0.5"
            .value=${String(this._tempHigh ?? 24)}
            @input=${(e: Event) => { this._tempHigh = parseFloat((e.target as HTMLInputElement).value); this._scheduleSave(); }}
          />
          <span class="range-value">${this._tempHigh ?? 24}\u00b0C</span>
        </div>

        <div class="range-row">
          <div class="feature-icon"><ha-icon .icon=${'mdi:thermometer-low'}></ha-icon></div>
          <div class="feature-text pw-rd-flex-fixed">
            <div class="feature-name">${t('config.room_temp_low')}</div>
          </div>
          <input type="range" class="range-input" min="10" max="25" step="0.5"
            .value=${String(this._tempLow ?? 17)}
            @input=${(e: Event) => { this._tempLow = parseFloat((e.target as HTMLInputElement).value); this._scheduleSave(); }}
          />
          <span class="range-value">${this._tempLow ?? 17}\u00b0C</span>
        </div>

        <div class="range-row">
          <div class="feature-icon"><ha-icon .icon=${'mdi:water-percent'}></ha-icon></div>
          <div class="feature-text pw-rd-flex-fixed">
            <div class="feature-name">${t('config.room_humidity_threshold')}</div>
          </div>
          <input type="range" class="range-input" min="40" max="90" step="1"
            .value=${String(this._humidityThreshold ?? 65)}
            @input=${(e: Event) => { this._humidityThreshold = parseFloat((e.target as HTMLInputElement).value); this._scheduleSave(); }}
          />
          <span class="range-value">${this._humidityThreshold ?? 65}%</span>
        </div>
      </div>

    `;
  }

  private _renderSection(sec: SectionDef): TemplateResult {
    switch (sec.id) {
      case 'light': return html`<config-tab-light .hass=${this.hass} .areaId=${this.areaId} .configData=${this.configData} .backend=${this.backend} .rooms=${this.rooms}></config-tab-light>`;
      case 'cover': return html`<config-tab-cover .hass=${this.hass} .areaId=${this.areaId} .configData=${this.configData} .backend=${this.backend} .rooms=${this.rooms}></config-tab-cover>`;
      case 'climate': return html`<config-tab-climate .hass=${this.hass} .areaId=${this.areaId} .configData=${this.configData} .backend=${this.backend} .rooms=${this.rooms}></config-tab-climate>`;
      case 'media': return html`<config-tab-media .hass=${this.hass} .areaId=${this.areaId} .configData=${this.configData} .backend=${this.backend} .rooms=${this.rooms}></config-tab-media>`;
      case 'fan': return html`<config-tab-fan .hass=${this.hass} .areaId=${this.areaId} .configData=${this.configData} .backend=${this.backend} .rooms=${this.rooms}></config-tab-fan>`;
      case 'camera': return html`<config-tab-camera .hass=${this.hass} .areaId=${this.areaId} .configData=${this.configData} .backend=${this.backend} .rooms=${this.rooms}></config-tab-camera>`;
      default: return html``;
    }
  }
}

customElements.define('config-room-detail', ConfigRoomDetail);
