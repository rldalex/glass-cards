import { css, LitElement, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { glassTokens, hostMixin, glassMixin, bounceMixin } from '@glass-cards/ui-core';
import { setLanguage, getLanguage } from '@glass-cards/i18n';
import { BackendService, type HomeAssistant } from '@glass-cards/base-card';
import { bus } from '@glass-cards/event-bus';
import { configPanelStyles } from './styles';
import { createSaveScheduler } from './utils/save-scheduler';
import type { RoomEntry, DragState } from './types';

/**
 * Abstract base class for config panel tab components.
 * Each tab extends this and implements loadFromConfig/collectSaveData/render.
 */
export abstract class BaseConfigTab extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) backend?: BackendService;
  @property({ attribute: false }) rooms: RoomEntry[] = [];
  @property({ attribute: false }) emptyRooms: { areaId: string; name: string; icon: string }[] = [];
  @property({ attribute: false }) dragState: DragState = { dragIdx: null, dropIdx: null, dragContext: 'rooms', dragModeSrcIdx: null };
  @property() areaId?: string;

  /** Config slice from parent — when set, calls loadFromConfig() automatically. */
  @property({ attribute: false })
  set configData(val: Record<string, unknown>) {
    const old = this._configData;
    this._configData = val;
    if (val && val !== old) {
      this._loading = true;
      this.loadFromConfig(val);
      // Reset after Lit's microtask update cycle so _checkAutoSave sees the flag
      this.updateComplete.then(() => { this._loading = false; });
    }
  }
  get configData(): Record<string, unknown> { return this._configData; }
  private _configData: Record<string, unknown> = {};

  protected _initializedForArea: string | null = null;
  protected _loading = false;

  private _saveScheduler = createSaveScheduler();

  @state() _lang = getLanguage();

  static styles = [
    glassTokens, hostMixin, glassMixin, bounceMixin,
    ...configPanelStyles,
    css`:host { padding: 0.5rem 0; min-height: auto; }`,
  ];

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass?.language && setLanguage(this.hass.language)) {
      this._lang = getLanguage();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._saveScheduler.cancel();
    this._teardownDropdownListener();
  }

  /** Called by parent after loadConfig() with this tab's config slice. */
  abstract loadFromConfig(config: Record<string, unknown>): void;

  /** Called by parent before save — returns the payload for the WS command. */
  abstract collectSaveData(): Record<string, unknown>;

  /** Render the tab form content. */
  abstract renderTab(): TemplateResult;

  protected render(): TemplateResult {
    void this._lang;
    return this.renderTab();
  }

  // — Event helpers —

  /** Request parent to show a toast. */
  protected _fireToast(success: boolean): void {
    this.dispatchEvent(new CustomEvent('tab-toast', { bubbles: true, composed: true, detail: { success } }));
  }

  // — Auto-save —

  protected _scheduleSave(): void {
    this._saveScheduler.schedule(() => this.save());
  }

  /** Override to add pre-save guards (e.g. _saving flag). */
  protected _canSave(): boolean { return !!this.backend; }

  /** Main save — calls _performSave with toast error handling. */
  async save(): Promise<void> {
    if (!this._canSave()) return;
    try {
      await this._performSave();
      this._fireToast(true);
    } catch {
      this._fireToast(false);
    }
  }

  /** Override with card-specific WS calls + bus.emit(). Default no-op. */
  protected async _performSave(): Promise<void> { /* no-op */ }

  // — Auto-save key detection —

  /** Override in subclasses with the set of @state() keys that trigger auto-save. */
  protected static _AUTO_SAVE_KEYS: Set<string> = new Set();

  protected _checkAutoSave(changedProps: PropertyValues): void {
    if (this._loading) return;
    const keys = (this.constructor as typeof BaseConfigTab)._AUTO_SAVE_KEYS;
    if (keys.size === 0) return;
    for (const key of changedProps.keys()) {
      if (keys.has(key as string)) {
        this._scheduleSave();
        return;
      }
    }
  }

  /** Called by subclasses in firstUpdated to initialize room-specific data.
   *  Skips if already initialized for the same areaId. */
  protected _initRoomIfNeeded(): boolean {
    if (!this.areaId) return false;
    if (this._initializedForArea === this.areaId) return false;
    this._initializedForArea = this.areaId;
    return true;
  }

  // — Drag/drop helpers —

  protected _localDragIdx: number | null = null;
  protected _localDropIdx: number | null = null;

  protected _onLocalDragStart(idx: number): void { this._localDragIdx = idx; }
  protected _onLocalDragOver(idx: number, e: DragEvent): void {
    e.preventDefault();
    if (this._localDragIdx !== null && this._localDragIdx !== idx) this._localDropIdx = idx;
  }
  protected _onLocalDragLeave(): void { this._localDropIdx = null; }
  protected _onLocalDragEnd(): void {
    this._localDragIdx = null;
    this._localDropIdx = null;
  }

  protected _applyLocalDrop<T>(idx: number, arr: T[]): T[] | null {
    if (this._localDragIdx === null || this._localDragIdx === idx) {
      this._localDragIdx = null;
      this._localDropIdx = null;
      return null;
    }
    const result = [...arr];
    const [moved] = result.splice(this._localDragIdx, 1);
    result.splice(idx, 0, moved);
    this._localDragIdx = null;
    this._localDropIdx = null;
    return result;
  }

  // — Dropdown outside-click helpers —

  private _boundDropdownClose?: (e: MouseEvent) => void;

  protected _setupDropdownListener(): void {
    this._boundDropdownClose = (e: MouseEvent) => {
      const path = e.composedPath();
      const root = this.shadowRoot;
      if (!root) return;
      const dropdowns = root.querySelectorAll('.dropdown.open');
      for (const dd of dropdowns) {
        if (path.includes(dd)) return;
      }
      this._closeAllDropdowns();
    };
    document.addEventListener('click', this._boundDropdownClose);
  }

  protected _teardownDropdownListener(): void {
    if (this._boundDropdownClose) {
      document.removeEventListener('click', this._boundDropdownClose);
      this._boundDropdownClose = undefined;
    }
  }

  /** Override in subclass to reset dropdown open states. */
  protected _closeAllDropdowns(): void { /* no-op */ }

  // — Room entity save helper —

  protected async _saveRoomEntities(
    areaId: string,
    cardEntityIds: Set<string>,
    hiddenIds: string[],
    orderedIds: string[],
    layouts?: Record<string, string>,
  ): Promise<void> {
    if (!this.backend) return;

    let existingHidden: string[] = [];
    let existingOrder: string[] = [];
    let existingLayouts: Record<string, string> = {};
    try {
      const existing = await this.backend.send<{
        hidden_entities: string[];
        entity_order: string[];
        entity_layouts: Record<string, string>;
      } | null>('get_room', { area_id: areaId });
      if (existing) {
        existingHidden = existing.hidden_entities ?? [];
        existingOrder = existing.entity_order ?? [];
        existingLayouts = existing.entity_layouts ?? {};
      }
    } catch { /* ignore */ }

    const nonCardHidden = existingHidden.filter(id => !cardEntityIds.has(id));
    const nonCardOrder = existingOrder.filter(id => !cardEntityIds.has(id));

    const mergedLayouts: Record<string, string> = {};
    for (const [id, layout] of Object.entries(existingLayouts)) {
      if (!cardEntityIds.has(id)) mergedLayouts[id] = layout;
    }
    if (layouts) Object.assign(mergedLayouts, layouts);

    await this.backend.send('set_room', {
      area_id: areaId,
      hidden_entities: [...nonCardHidden, ...hiddenIds],
      entity_order: [...nonCardOrder, ...orderedIds],
      entity_layouts: mergedLayouts,
    });
    bus.emit('room-config-changed', { areaId });
  }
}
