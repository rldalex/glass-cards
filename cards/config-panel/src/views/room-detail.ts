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

/** Explicit "no sensor" sentinel — distinguishes user choice from undecided auto-detect. */
const NONE_SENTINEL = '__none__';

/** Default icon per HA domain — used when the user picks an entity and the icon field is empty. */
const DOMAIN_ICONS: Record<string, string> = {
  light: 'mdi:lightbulb',
  switch: 'mdi:toggle-switch',
  vacuum: 'mdi:robot-vacuum-variant',
  cover: 'mdi:window-shutter',
  climate: 'mdi:thermostat',
  fan: 'mdi:fan',
  media_player: 'mdi:speaker',
  scene: 'mdi:palette',
  script: 'mdi:script-text',
  automation: 'mdi:robot',
  input_boolean: 'mdi:toggle-switch',
  input_button: 'mdi:gesture-tap-button',
  input_select: 'mdi:form-dropdown',
  button: 'mdi:gesture-tap-button',
  lock: 'mdi:lock',
  camera: 'mdi:cctv',
  alarm_control_panel: 'mdi:shield-home',
  remote: 'mdi:remote',
  humidifier: 'mdi:air-humidifier',
  water_heater: 'mdi:water-boiler',
  siren: 'mdi:bullhorn',
  valve: 'mdi:valve',
  lawn_mower: 'mdi:robot-mower',
};

/**
 * Pick a sensible default service for any HA domain by scanning what the
 * domain actually exposes. Priority list covers the common "fire once with
 * no parameters" actions, in order of usefulness for a single-tap button:
 *   - toggle (light, switch, fan, cover, remote, automation, input_boolean…)
 *   - turn_on (climate, camera, script, scene, water_heater…)
 *   - turn_off (paired domains that don't have toggle)
 *   - press (button, input_button)
 *   - start (vacuum, lawn_mower, timer)
 *   - trigger (automation alt, script alt)
 *   - lock (lock domain)
 *   - alarm_arm_home (alarm_control_panel)
 *   - open / close (valve alt)
 *
 * Falls back to the first service the domain exposes — at worst the user
 * picks something else manually, but the button is never wired to a
 * destructive default like `delete_command`.
 */
const SERVICE_PRIORITY = [
  'toggle', 'turn_on', 'turn_off', 'press', 'start',
  'trigger', 'lock', 'alarm_arm_home', 'open', 'close',
];

function pickDefaultServiceForDomain(
  domain: string,
  services: Record<string, unknown> | undefined,
): string {
  if (!domain) return '';
  const available = services ? Object.keys(services) : [];
  if (available.length === 0) return '';
  for (const action of SERVICE_PRIORITY) {
    if (available.includes(action)) return `${domain}.${action}`;
  }
  // Skip destructive/parameterised actions if a safer one is later in the
  // alphabet (e.g. avoid `delete_command` when `send_command` exists).
  const SKIP_FIRST = ['delete_command', 'learn_command'];
  const safe = available.find((s) => !SKIP_FIRST.includes(s));
  return `${domain}.${safe ?? available[0]}`;
}

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
  @state() private _buttons: { icon: string; label: string; service: string; data_json: string }[] = [];
  private _availableTempEntities: { id: string; name: string }[] = [];
  private _availableHumidityEntities: { id: string; name: string }[] = [];
  private _availablePresenceEntities: { id: string; name: string }[] = [];

  // Per-button dropdown / icon portal state (entity + service pickers use glass-dropdown internally)
  @state() private _btnIconPortalIdx: number | null = null;
  @state() private _btnIconSearch = '';
  @state() private _btnAdvancedOpen = new Set<number>();
  private _btnIconList: string[] = [];
  private _btnIconLoading = false;
  private _entityCache: { hassRef: unknown; query: string; result: { id: string; name: string }[] } | null = null;
  private _serviceCache: { hassRef: unknown; domain: string; query: string; result: string[] } | null = null;

  // Drag state for section reorder
  @state() private _dragIdx: number | null = null;
  @state() private _dropIdx: number | null = null;
  @state() private _dragContext: 'sections' | 'scenes' | null = null;

  private _loaded = false;
  private _saveScheduler = createSaveScheduler();

  protected createRenderRoot() { return this; }

  override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    // Reset only when the room actually changes (areaId). Resetting on every
    // hass tick would re-fetch over the user's in-flight edits — a freshly
    // added (empty-service) button row would vanish before save catches up,
    // and any expanded sections would collapse.
    if (changedProps.has('areaId')) {
      this._loaded = false;
      this._openSections = new Set();
    }
    if (!this._loaded && this.hass && this.areaId) {
      this._loaded = true;
      this._loadRoomConfig();
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('keydown', this._onDocKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._saveScheduler.flush();
    this._removeIconPortal();
    this._btnIconPortalIdx = null;
    document.removeEventListener('keydown', this._onDocKeyDown);
  }

  private _lastIconTriggerEl: HTMLElement | null = null;

  private _onDocKeyDown = (e: KeyboardEvent): void => {
    if (e.key !== 'Escape') return;
    // Esc closes the icon portal (dropdowns handle their own Escape internally)
    if (this._btnIconPortalIdx !== null) {
      this._btnIconPortalIdx = null;
      this._removeIconPortal();
      // WCAG 2.4.3: restore focus to the trigger that opened the portal
      if (this._lastIconTriggerEl) {
        try { this._lastIconTriggerEl.focus(); } catch { /* ignore */ }
        this._lastIconTriggerEl = null;
      }
    }
  };

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
        buttons?: { icon?: string; label?: string; service?: string; data?: Record<string, unknown> }[];
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
        this._buttons = (result.buttons ?? []).map((b) => ({
          icon: b.icon ?? '',
          label: b.label ?? '',
          service: b.service ?? '',
          data_json: b.data && Object.keys(b.data).length > 0 ? JSON.stringify(b.data, null, 2) : '',
        }));
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
    const serviceRe = /^[a-z_][a-z0-9_]*\.[a-z_][a-z0-9_]*$/;
    // Backend only requires a valid service; icon/label optional (frontend renders with sensible fallback).
    const buttons = this._buttons
      .filter((b) => serviceRe.test(b.service))
      .map((b) => {
        let data: Record<string, unknown> = {};
        if (b.data_json.trim()) {
          try {
            const parsed = JSON.parse(b.data_json);
            if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) data = parsed;
          } catch { /* invalid JSON → empty data */ }
        }
        return { icon: b.icon, label: b.label, service: b.service, data };
      });
    try {
      await this.backend.send('set_room', {
        area_id: this.areaId,
        // Save entity DOMAINS, not section ids: the popup filters card_order
        // against entity domains ('media_player'), so saving the section id
        // 'media' would silently drop the media card from the popup.
        card_order: this._sections.filter(s => s.visible).map(s => s.domains[0]),
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
        buttons,
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
      const next = new Set(this._openSections);
      next.delete(id);
      this._openSections = next;
    }
    this._scheduleSave();
  }

  private _toggleSceneVisible(entityId: string): void {
    this._scenes = this._scenes.map(s => s.entityId === entityId ? { ...s, visible: !s.visible } : s);
    this._scheduleSave();
  }

  private _toggleSection(sectionId: string): void {
    const next = new Set(this._openSections);
    if (next.has(sectionId)) next.delete(sectionId);
    else next.add(sectionId);
    this._openSections = next;
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
    if (!this._sections.length) {
      return html`
        <glass-empty-state variant="inline" .icon=${'mdi:home-search-outline'} .title=${t('config.room_no_entities')}></glass-empty-state>
      `;
    }

    const visibleCount = this._sections.filter(s => s.visible).length;

    return html`
      <div class="cfg-info">
        <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
        <span>${t('config.room_detail_info')}</span>
      </div>

      <section class="cfg-section">
        <header class="cfg-section-head">
          <span class="cfg-section-num">1</span>
          <div class="cfg-section-text">
            <span class="section-label">${t('config.room_cards_title')}</span>
            <span class="section-desc">${t('config.room_cards_desc')}</span>
          </div>
          <span class="cfg-section-count" aria-label="${t('common.count_visible', { count: visibleCount, total: this._sections.length })}">
            ${visibleCount}/${this._sections.length}
          </span>
        </header>
        <div class="room-sections">
          ${this._sections.map((sec, idx) => this._renderSectionRow(sec, idx))}
        </div>
      </section>

      ${this._renderIndicators()}
      ${this._renderSensors()}
      ${this._renderButtonsSection()}
      ${this._renderThresholds()}

      ${this._scenes.length > 0 ? html`
        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">6</span>
            <div class="cfg-section-text">
              <span class="section-label">${t('config.popup_scenes')}</span>
            </div>
          </header>
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
        </section>
      ` : nothing}
    `;
  }

  private _renderSectionRow(sec: SectionDef, idx: number): TemplateResult {
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
          <glass-drag-handle></glass-drag-handle>
          <button class="section-header" @click=${() => { if (sec.visible) this._toggleSection(sec.id); }}
            aria-expanded=${isOpen ? 'true' : 'false'}>
            <div class="section-header-icon" style="--icon-color:${sec.color};">
              <ha-icon .icon=${sec.icon}></ha-icon>
            </div>
            <span class="section-title">${sec.label}</span>
            <glass-chevron ?open=${isOpen} size="md" tone="muted"></glass-chevron>
          </button>
          <glass-toggle
            .checked=${sec.visible}
            aria-label="${sec.visible ? t('common.hide') : t('common.show')} ${sec.label}"
            @glass-toggle-change=${() => this._toggleSectionVisible(sec.id)}
          ></glass-toggle>
        </div>
        <div class="fold-sep ${isOpen ? 'visible' : ''}" style="--fold-color:rgb(${sec.color})"></div>
        <div class="section-fold ${isOpen ? 'open' : ''}">
          <div class="section-fold-inner" aria-hidden=${isOpen ? 'false' : 'true'}>
            <div class="section-content">
              ${isOpen ? this._renderSection(sec) : nothing}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _renderButtonsSection(): TemplateResult {
    const MAX = 3;
    return html`
      <section class="cfg-section">
        <header class="cfg-section-head">
          <span class="cfg-section-num">4</span>
          <div class="cfg-section-text">
            <span class="section-label">${t('config.room_buttons_title')}</span>
            <span class="section-desc">${t('config.room_buttons_desc')}</span>
          </div>
          <span class="cfg-section-count">${this._buttons.length}/${MAX}</span>
        </header>
        <div class="room-buttons-list">
          ${this._buttons.map((btn, idx) => this._renderButtonRow(btn, idx))}
          ${this._buttons.length < MAX ? html`
            <button class="room-button-add" type="button" @click=${() => this._addButton()}>
              <ha-icon .icon=${'mdi:plus-circle-outline'}></ha-icon>
              <span>${t('config.room_button_add')}</span>
            </button>
          ` : nothing}
        </div>
      </section>
    `;
  }

  private _entityFromData(data_json: string): string {
    if (!data_json.trim()) return '';
    try {
      const parsed = JSON.parse(data_json);
      if (parsed && typeof parsed === 'object' && typeof parsed.entity_id === 'string') {
        return parsed.entity_id;
      }
    } catch { /* ignore */ }
    return '';
  }

  private _filterEntities(query: string): { id: string; name: string }[] {
    if (!this.hass) return [];
    const q = query.toLowerCase().trim();
    // Memoize on (hass.states identity, query). Re-runs only when hass changes or query changes.
    if (this._entityCache && this._entityCache.hassRef === this.hass.states && this._entityCache.query === q) {
      return this._entityCache.result;
    }
    // No slice cap: glass-dropdown's internal search filters this list, so we
    // need to pass *every* entity for the user to find anything beyond the
    // first 80 alphabetical. A typical HA install has 100–500 entities; the
    // dropdown handles that without trouble.
    const items = Object.keys(this.hass.states)
      .map((id) => ({
        id,
        name: (this.hass.states[id]?.attributes?.friendly_name as string) || id.split('.')[1] || id,
      }))
      .filter((e) => !q || e.id.includes(q) || e.name.toLowerCase().includes(q))
      .sort((a, b) => a.name.localeCompare(b.name));
    this._entityCache = { hassRef: this.hass.states, query: q, result: items };
    return items;
  }

  private _filterServices(domain: string, query: string): string[] {
    if (!domain || !this.hass?.services?.[domain]) return [];
    const q = query.toLowerCase().trim();
    if (this._serviceCache && this._serviceCache.hassRef === this.hass.services
        && this._serviceCache.domain === domain && this._serviceCache.query === q) {
      return this._serviceCache.result;
    }
    const result = Object.keys(this.hass.services[domain])
      .filter((s) => !q || s.includes(q))
      .sort()
      .slice(0, 40);
    this._serviceCache = { hassRef: this.hass.services, domain, query: q, result };
    return result;
  }

  private _renderButtonRow(btn: { icon: string; label: string; service: string; data_json: string }, idx: number): TemplateResult {
    const currentEntity = this._entityFromData(btn.data_json);
    const entityDomain = currentEntity.split('.')[0];
    const entityState = currentEntity ? this.hass?.states?.[currentEntity] : undefined;
    const friendlyName = (entityState?.attributes?.friendly_name as string) || '';
    const entityItems = this._filterEntities('').map((item) => ({
      value: item.id,
      label: item.name,
      icon: (this.hass?.states?.[item.id]?.attributes?.icon as string) || DOMAIN_ICONS[item.id.split('.')[0]] || 'mdi:cube-outline',
    }));
    const serviceItems = entityDomain
      ? this._filterServices(entityDomain, '').map((s) => {
          const full = `${entityDomain}.${s}`;
          return { value: full, label: full };
        })
      : [];
    // btn.icon === '' is the explicit "Aucune icône" pick (also the backend default for
    // a brand-new button). Distinguish "user cleared an entity-bound button" (show the
    // mdi:cancel preview to match the picker cell) from "no entity yet" (show the
    // generic mdi:image-plus-outline placeholder).
    const userClearedIcon = btn.icon === '' && !!entityDomain;
    const autoDomainIcon = (entityDomain && DOMAIN_ICONS[entityDomain]) || '';
    const effectiveIcon = userClearedIcon ? '' : (btn.icon || autoDomainIcon);
    const previewIcon = userClearedIcon ? 'mdi:cancel' : (effectiveIcon || 'mdi:image-plus-outline');
    const triggerEntityIcon = entityState?.attributes?.icon as string | undefined;
    const entityTriggerIcon = triggerEntityIcon || (entityDomain && DOMAIN_ICONS[entityDomain]) || 'mdi:cube-outline';
    const serviceFallback = entityDomain
      ? pickDefaultServiceForDomain(entityDomain, this.hass?.services?.[entityDomain])
        || `${entityDomain}.toggle`
      : t('config.room_button_service_disabled');

    return html`
      <div class="room-button-row">
        <glass-dropdown
          class="room-button-entity-dropdown"
          .items=${entityItems}
          .value=${currentEntity}
          .label=${currentEntity ? (friendlyName || currentEntity) : t('config.room_button_entity_placeholder')}
          .icon=${entityTriggerIcon ?? ''}
          searchable
          search-placeholder=${t('config.room_button_entity_search')}
          empty-text=${t('config.room_button_entity_empty')}
          aria-label=${t('config.room_button_entity')}
          @glass-dropdown-change=${(e: CustomEvent<{ value: string }>) => this._pickEntity(idx, e.detail.value)}
        ></glass-dropdown>

        <div class="room-button-label-row">
          <button
            type="button"
            class="room-button-icon-trigger ${userClearedIcon ? 'is-none' : ''}"
            @click=${(e: Event) => { this._lastIconTriggerEl = e.currentTarget as HTMLElement; this._openButtonIconPortal(idx); }}
            aria-label="${t('config.room_button_icon_pick')}"
            title="${userClearedIcon
              ? t('config.room_button_icon_none')
              : (effectiveIcon
                  ? (btn.icon ? btn.icon : t('config.room_button_icon_auto', { icon: effectiveIcon }))
                  : t('config.room_button_icon_pick'))}"
          >
            <ha-icon class="room-button-icon-preview" .icon=${previewIcon}></ha-icon>
          </button>
          <glass-form-input
            type="text"
            class="room-button-input"
            placeholder=${friendlyName || t('config.room_button_label_placeholder')}
            .value=${btn.label}
            @glass-input=${(e: CustomEvent<{ value: string }>) => this._updateButton(idx, 'label', e.detail.value)}
          ></glass-form-input>
        </div>

        <details
          class="room-button-advanced"
          ?open=${this._btnAdvancedOpen.has(idx) || (!currentEntity && (!!btn.service || !!btn.data_json))}
          @toggle=${(e: Event) => this._onAdvancedToggle(idx, (e.target as HTMLDetailsElement).open)}
        >
          <summary>${t('config.room_button_advanced')}</summary>

          <glass-dropdown
            .items=${serviceItems}
            .value=${btn.service}
            .label=${btn.service || serviceFallback}
            icon="mdi:flash-outline"
            ?disabled=${!entityDomain}
            ?searchable=${!!entityDomain}
            search-placeholder=${t('config.room_button_service_search')}
            empty-text=${t('config.room_button_service_empty')}
            aria-label=${t('config.room_button_service')}
            @glass-dropdown-change=${(e: CustomEvent<{ value: string }>) => this._updateButton(idx, 'service', e.detail.value)}
          ></glass-dropdown>

          <glass-form-input
            multiline
            rows="3"
            class="room-button-input room-button-textarea"
            placeholder='{ "entity_id": "vacuum.robot" }'
            aria-label="${t('config.room_button_data')}"
            .value=${btn.data_json}
            @glass-input=${(e: CustomEvent<{ value: string }>) => this._updateButton(idx, 'data_json', e.detail.value)}
          ></glass-form-input>
        </details>

        <button
          type="button"
          class="room-button-delete"
          @click=${() => this._removeButton(idx)}
        >
          <ha-icon .icon=${'mdi:trash-can-outline'}></ha-icon>
          <span>${t('config.room_button_delete')}</span>
        </button>
      </div>
    `;
  }

  private async _openButtonIconPortal(idx: number): Promise<void> {
    this._btnIconSearch = '';
    this._btnIconPortalIdx = idx;
    this._renderIconPortal();
    if (this._btnIconList.length === 0 && !this._btnIconLoading) {
      this._btnIconLoading = true;
      let picker: (HTMLElement & { hass: unknown }) | null = null;
      try {
        picker = document.createElement('ha-icon-picker') as HTMLElement & { hass: unknown };
        picker.hass = this.hass;
        picker.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none';
        document.body.appendChild(picker);
        await new Promise((r) => setTimeout(r, 50));
        const gp = picker.shadowRoot?.querySelector('ha-generic-picker') as HTMLElement & { getItems(): Promise<{ id: string }[]> } | null;
        if (gp?.getItems) {
          const items = await gp.getItems();
          if (items?.length) this._btnIconList = items.map((i) => i.id);
        }
      } catch { /* ignore */ } finally {
        this._btnIconLoading = false;
        // Always cleanup the probe element, even if it was orphaned by disconnect
        if (picker && picker.parentNode === document.body) {
          document.body.removeChild(picker);
        }
        // Skip portal re-render if the component was disconnected mid-await (avoids orphan portal leak)
        if (this.isConnected && this._btnIconPortalIdx !== null) this._renderIconPortal();
      }
    }
  }

  private _btnIconPortalEl: HTMLDivElement | null = null;
  private _portalClickHandler: ((e: MouseEvent) => void) | null = null;

  private _renderIconPortal(): void {
    if (this._btnIconPortalIdx === null) { this._removeIconPortal(); return; }
    const idx = this._btnIconPortalIdx;
    const currentBtn = this._buttons[idx];
    if (!currentBtn) { this._removeIconPortal(); return; }
    const currentIcon = currentBtn.icon;
    const query = this._btnIconSearch.toLowerCase().trim();
    const icons = query
      ? this._btnIconList.filter((i) => i.toLowerCase().includes(query)).slice(0, 120)
      : this._btnIconList.slice(0, 120);

    const close = () => {
      this._btnIconPortalIdx = null;
      this._removeIconPortal();
      if (this._lastIconTriggerEl) {
        try { this._lastIconTriggerEl.focus(); } catch { /* ignore */ }
        this._lastIconTriggerEl = null;
      }
    };
    const select = (icon: string) => { this._updateButton(idx, 'icon', icon); close(); };
    const onSearch = (val: string) => {
      const inputEl = this._btnIconPortalEl?.querySelector('input.icon-portal-search') as HTMLInputElement | null;
      const selStart = inputEl?.selectionStart ?? null;
      const selEnd = inputEl?.selectionEnd ?? null;
      this._btnIconSearch = val;
      this._renderIconPortal();
      if (selStart !== null) {
        const newInput = this._btnIconPortalEl?.querySelector('input.icon-portal-search') as HTMLInputElement | null;
        if (newInput) {
          try { newInput.setSelectionRange(selStart, selEnd ?? selStart); } catch { /* ignore */ }
        }
      }
    };

    if (!this._btnIconPortalEl) {
      this._btnIconPortalEl = document.createElement('div');
      this._portalClickHandler = (e: MouseEvent) => {
        if (e.target === this._btnIconPortalEl) close();
      };
      this._btnIconPortalEl.addEventListener('click', this._portalClickHandler);
      document.body.appendChild(this._btnIconPortalEl);
    }

    this._btnIconPortalEl.replaceChildren();
    this._btnIconPortalEl.setAttribute('role', 'dialog');
    this._btnIconPortalEl.setAttribute('aria-modal', 'true');
    this._btnIconPortalEl.setAttribute('aria-label', t('config.room_button_icon_pick'));
    Object.assign(this._btnIconPortalEl.style, {
      position: 'fixed', inset: '0', zIndex: '10000',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem',
    });

    const popup = document.createElement('div');
    Object.assign(popup.style, {
      width: '100%', maxWidth: '25rem', maxHeight: '70vh',
      display: 'flex', flexDirection: 'column',
      borderRadius: '22px',
      background: 'linear-gradient(135deg, #1a2233 0%, #141c2a 50%, #172030 100%)',
      boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)',
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
    });

    const header = document.createElement('div');
    Object.assign(header.style, { padding: '0.875rem 1rem 0.625rem', display: 'flex', flexDirection: 'column', gap: '0.625rem', borderBottom: '1px solid rgba(255,255,255,0.06)' });
    const titleEl = document.createElement('span');
    Object.assign(titleEl.style, { fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.45)' });
    titleEl.textContent = t('config.room_button_icon_pick');
    const searchInput = document.createElement('input');
    searchInput.className = 'icon-portal-search';
    Object.assign(searchInput.style, { width: '100%', padding: '0.5rem 0.75rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.88)', fontSize: '13px', outline: 'none', boxSizing: 'border-box' });
    searchInput.placeholder = 'mdi:...';
    searchInput.value = this._btnIconSearch;
    searchInput.addEventListener('input', () => onSearch(searchInput.value));
    header.appendChild(titleEl);
    header.appendChild(searchInput);
    popup.appendChild(header);

    const gridWrap = document.createElement('div');
    Object.assign(gridWrap.style, { overflow: 'auto', flex: '1', padding: '0.5rem', scrollbarWidth: 'none' });
    const grid = document.createElement('div');
    Object.assign(grid.style, { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '4px' });

    const noIconBtn = this._createBtnIconCell('mdi:cancel', currentIcon === '', 0.4);
    noIconBtn.addEventListener('click', () => select(''));
    grid.appendChild(noIconBtn);

    for (const icon of icons) {
      const btnEl = this._createBtnIconCell(icon, icon === currentIcon, 1);
      btnEl.addEventListener('click', () => select(icon));
      grid.appendChild(btnEl);
    }

    if (icons.length === 0 && this._btnIconSearch) {
      const empty = document.createElement('div');
      Object.assign(empty.style, { gridColumn: '1/-1', textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.35)', fontSize: '13px' });
      empty.textContent = t('config.title_no_icons_found');
      grid.appendChild(empty);
    }

    gridWrap.appendChild(grid);
    popup.appendChild(gridWrap);
    this._btnIconPortalEl.appendChild(popup);
    // Only focus the search on initial open or when no portal element currently has focus.
    // Prevents IME composition break and mobile keyboard flicker on keystroke re-renders.
    if (!this._btnIconPortalEl.contains(document.activeElement)) {
      searchInput.focus();
    }
  }

  private _createBtnIconCell(icon: string, selected: boolean, opacity: number): HTMLButtonElement {
    const btn = document.createElement('button');
    Object.assign(btn.style, {
      width: '100%', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: '8px', border: selected ? '1px solid rgba(129,140,248,0.5)' : '1px solid transparent',
      background: selected ? 'rgba(129,140,248,0.15)' : 'rgba(255,255,255,0.03)',
      color: selected ? 'rgb(129,140,248)' : `rgba(255,255,255,${opacity})`,
      cursor: 'pointer', padding: '0', outline: 'none',
    });
    const iconEl = document.createElement('ha-icon') as HTMLElement & { icon: string };
    iconEl.icon = icon;
    btn.appendChild(iconEl);
    return btn;
  }

  private _removeIconPortal(): void {
    if (this._btnIconPortalEl) {
      if (this._portalClickHandler) {
        this._btnIconPortalEl.removeEventListener('click', this._portalClickHandler);
        this._portalClickHandler = null;
      }
      this._btnIconPortalEl.remove();
      this._btnIconPortalEl = null;
    }
  }

  private _pickEntity(idx: number, entityId: string): void {
    if (!entityId) return;
    const domain = entityId.split('.')[0];
    if (!domain) return;
    const state = this.hass?.states?.[entityId];
    const friendlyName = (state?.attributes?.friendly_name as string) || '';
    // Pick a sensible default service from whatever the domain actually
    // exposes — works for any HA domain (no hardcoded per-domain list).
    const defaultServiceName = pickDefaultServiceForDomain(
      domain,
      this.hass?.services?.[domain],
    );

    this._buttons = this._buttons.map((b, i) => {
      if (i !== idx) return b;

      // Reset service if the current one's domain doesn't match the new entity (stale cross-domain).
      const currentServiceDomain = b.service ? b.service.split('.')[0] : '';
      const keepService = !!b.service && currentServiceDomain === domain;

      // Strip area_id / device_id if a specific entity is now targeted (ambiguity guard).
      let nextData: Record<string, unknown> = { entity_id: entityId };
      if (b.data_json.trim()) {
        try {
          const parsed = JSON.parse(b.data_json);
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            const rest = { ...(parsed as Record<string, unknown>) };
            delete rest.area_id;
            delete rest.device_id;
            delete rest.entity_id;
            nextData = { ...rest, entity_id: entityId };
          }
        } catch { /* keep minimal */ }
      }

      // Icon resolution:
      //  - If the user explicitly cleared the icon ('' / "Aucune icône") AND we're
      //    staying in the same domain (currentServiceDomain), respect that intent
      //    — they edited an existing button. Domain change = fresh start → autofill.
      //  - Otherwise prefer the user's explicit icon, then HA's per-entity hint, then
      //    the curated domain map.
      const entityIcon = state?.attributes?.icon as string | undefined;
      const preserveEmptyIcon = b.icon === '' && currentServiceDomain === domain && !!b.service;
      const nextIcon = preserveEmptyIcon
        ? ''
        : (b.icon || entityIcon || DOMAIN_ICONS[domain] || '');

      // Service resolution: prefer the user's existing service if its domain
      // matches the new entity. Otherwise use the picker, but never leave the
      // service blank — a blank service would be filtered out at save time and
      // the button would silently vanish on the next reload. `${domain}.toggle`
      // is the same optimistic fallback the UI placeholder already shows.
      const nextService = keepService
        ? b.service
        : (defaultServiceName || `${domain}.toggle`);

      return {
        icon: nextIcon,
        label: b.label || friendlyName,
        service: nextService,
        data_json: JSON.stringify(nextData, null, 2),
      };
    });
    this._scheduleSave();
  }

  private _addButton(): void {
    if (this._buttons.length >= 3) return;
    this._buttons = [...this._buttons, { icon: '', label: '', service: '', data_json: '' }];
    this._scheduleSave();
  }

  private _onAdvancedToggle(idx: number, open: boolean): void {
    const next = new Set(this._btnAdvancedOpen);
    if (open) next.add(idx);
    else next.delete(idx);
    this._btnAdvancedOpen = next;
  }

  private _removeButton(idx: number): void {
    this._buttons = this._buttons.filter((_, i) => i !== idx);
    // Reset / shift per-row open indices so they don't point to wrong rows after deletion.
    if (this._btnIconPortalIdx !== null) {
      if (this._btnIconPortalIdx === idx) {
        this._btnIconPortalIdx = null;
        this._removeIconPortal();
      } else if (this._btnIconPortalIdx > idx) {
        this._btnIconPortalIdx -= 1;
      }
    }
    // Shift advanced-open set too
    const nextAdvanced = new Set<number>();
    this._btnAdvancedOpen.forEach((openIdx) => {
      if (openIdx === idx) return;
      nextAdvanced.add(openIdx > idx ? openIdx - 1 : openIdx);
    });
    this._btnAdvancedOpen = nextAdvanced;
    this._scheduleSave();
  }

  private _updateButton(idx: number, field: 'icon' | 'label' | 'service' | 'data_json', value: string): void {
    this._buttons = this._buttons.map((b, i) => i === idx ? { ...b, [field]: value } : b);
    this._scheduleSave();
  }

  private _renderIndicators(): TemplateResult {
    return html`
      <section class="cfg-section">
        <header class="cfg-section-head">
          <span class="cfg-section-num">2</span>
          <div class="cfg-section-text">
            <span class="section-label">${t('config.room_indicators')}</span>
            <span class="section-desc">${t('config.room_indicators_desc')}</span>
          </div>
        </header>
        <div class="feature-list">
          <button class="feature-row" role="switch" aria-checked=${this._showLights ? 'true' : 'false'} @click=${() => { this._showLights = !this._showLights; this._scheduleSave(); }}>
            <div class="feature-icon"><ha-icon .icon=${'mdi:lightbulb'}></ha-icon></div>
            <div class="feature-text">
              <div class="feature-name">${t('config.room_show_lights')}</div>
            </div>
            <glass-toggle presentation .checked=${this._showLights}></glass-toggle>
          </button>
          <button class="feature-row" role="switch" aria-checked=${this._showTemperature ? 'true' : 'false'} @click=${() => { this._showTemperature = !this._showTemperature; this._scheduleSave(); }}>
            <div class="feature-icon"><ha-icon .icon=${'mdi:thermometer'}></ha-icon></div>
            <div class="feature-text">
              <div class="feature-name">${t('config.room_show_temperature')}</div>
            </div>
            <glass-toggle presentation .checked=${this._showTemperature}></glass-toggle>
          </button>
          <button class="feature-row" role="switch" aria-checked=${this._showHumidity ? 'true' : 'false'} @click=${() => { this._showHumidity = !this._showHumidity; this._scheduleSave(); }}>
            <div class="feature-icon"><ha-icon .icon=${'mdi:water-percent'}></ha-icon></div>
            <div class="feature-text">
              <div class="feature-name">${t('config.room_show_humidity')}</div>
            </div>
            <glass-toggle presentation .checked=${this._showHumidity}></glass-toggle>
          </button>
          <button class="feature-row" role="switch" aria-checked=${this._sortByLights ? 'true' : 'false'} @click=${() => { this._sortByLights = !this._sortByLights; this._scheduleSave(); }}>
            <div class="feature-icon"><ha-icon .icon=${'mdi:lightbulb-auto'}></ha-icon></div>
            <div class="feature-text">
              <div class="feature-name">${t('config.room_sort_by_lights')}</div>
            </div>
            <glass-toggle presentation .checked=${this._sortByLights}></glass-toggle>
          </button>
          <button class="feature-row" role="switch" aria-checked=${this._showPresence ? 'true' : 'false'} @click=${() => { this._showPresence = !this._showPresence; this._scheduleSave(); }}>
            <div class="feature-icon"><ha-icon .icon=${'mdi:motion-sensor'}></ha-icon></div>
            <div class="feature-text">
              <div class="feature-name">${t('config.room_sort_by_presence')}</div>
            </div>
            <glass-toggle presentation .checked=${this._showPresence}></glass-toggle>
          </button>
        </div>
      </section>
    `;
  }

  private _renderSensors(): TemplateResult {
    // Always show — user can choose "none" even if sensors exist
    const buildItems = (
      available: { id: string; name: string }[],
      sensorIcon: string,
    ) => [
      { value: '', label: t('config.room_auto_detect'), icon: 'mdi:auto-fix' },
      ...available.map((s) => ({ value: s.id, label: s.name, icon: sensorIcon })),
      { value: NONE_SENTINEL, label: t('config.room_no_sensor'), icon: 'mdi:close-circle-outline' },
    ];

    const tempItems = buildItems(this._availableTempEntities, 'mdi:thermometer');
    const humidityItems = buildItems(this._availableHumidityEntities, 'mdi:water-percent');
    const presenceItems = buildItems(this._availablePresenceEntities, 'mdi:motion-sensor');

    return html`
      <section class="cfg-section">
        <header class="cfg-section-head">
          <span class="cfg-section-num">3</span>
          <div class="cfg-section-text">
            <span class="section-label">${t('config.room_sensors')}</span>
            <span class="section-desc">${t('config.room_sensors_desc')}</span>
          </div>
        </header>

      <div class="cfg-sublabel">${t('config.room_temp_entity')}</div>
      <glass-dropdown
        .items=${tempItems}
        .value=${this._tempEntity || ''}
        icon="mdi:thermometer"
        @glass-dropdown-change=${(e: CustomEvent<{ value: string }>) => { this._tempEntity = e.detail.value; this._scheduleSave(); }}
      ></glass-dropdown>

      <div class="cfg-sublabel">${t('config.room_humidity_entity')}</div>
      <glass-dropdown
        .items=${humidityItems}
        .value=${this._humidityEntity || ''}
        icon="mdi:water-percent"
        @glass-dropdown-change=${(e: CustomEvent<{ value: string }>) => { this._humidityEntity = e.detail.value; this._scheduleSave(); }}
      ></glass-dropdown>

      <div class="cfg-sublabel">${t('config.room_presence_entity')}</div>
      <glass-dropdown
        .items=${presenceItems}
        .value=${this._presenceEntity || ''}
        icon="mdi:motion-sensor"
        @glass-dropdown-change=${(e: CustomEvent<{ value: string }>) => { this._presenceEntity = e.detail.value; this._scheduleSave(); }}
      ></glass-dropdown>

      </section>
    `;
  }

  private _renderThresholds(): TemplateResult {
    return html`
      <section class="cfg-section">
        <header class="cfg-section-head">
          <span class="cfg-section-num">5</span>
          <div class="cfg-section-text">
            <span class="section-label">${t('config.room_thresholds_title')}</span>
            <span class="section-desc">${t('config.room_thresholds_desc')}</span>
          </div>
        </header>
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
      </section>
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
