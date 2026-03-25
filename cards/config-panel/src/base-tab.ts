import { css, LitElement, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { glassTokens, hostMixin, glassMixin, bounceMixin } from '@glass-cards/ui-core';
import { setLanguage, getLanguage } from '@glass-cards/i18n';
import { BackendService, type HomeAssistant } from '@glass-cards/base-card';
import { configPanelStyles } from './styles';
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
    if (val && val !== old) this.loadFromConfig(val);
  }
  get configData(): Record<string, unknown> { return this._configData; }
  private _configData: Record<string, unknown> = {};

  protected _initializedForArea: string | null = null;

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

  // — Event helpers (events bubble up to parent) —

  /** Signal that tab state changed — triggers auto-save debounce in parent. */
  protected _fireDirty(): void {
    this.dispatchEvent(new CustomEvent('tab-dirty', { bubbles: true, composed: true }));
  }

  /** Request parent to show a toast. */
  protected _fireToast(success: boolean): void {
    this.dispatchEvent(new CustomEvent('tab-toast', { bubbles: true, composed: true, detail: { success } }));
  }

  // — Drag helpers —

  protected _onDragStart(idx: number, context: string, srcIdx?: number): void {
    this.dispatchEvent(new CustomEvent('drag-start', { bubbles: true, composed: true, detail: { idx, context, srcIdx } }));
  }

  protected _onDragOver(idx: number, e: DragEvent): void {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('drag-over', { bubbles: true, composed: true, detail: { idx } }));
  }

  protected _onDragLeave(): void {
    this.dispatchEvent(new CustomEvent('drag-leave', { bubbles: true, composed: true }));
  }

  protected _onDragEnd(): void {
    this.dispatchEvent(new CustomEvent('drag-end', { bubbles: true, composed: true }));
  }

  // — Auto-save key detection —

  /** Override in subclasses with the set of @state() keys that trigger auto-save. */
  protected static _AUTO_SAVE_KEYS: Set<string> = new Set();

  protected _checkAutoSave(changedProps: PropertyValues): void {
    const keys = (this.constructor as typeof BaseConfigTab)._AUTO_SAVE_KEYS;
    if (keys.size === 0) return;
    for (const key of changedProps.keys()) {
      if (keys.has(key as string)) {
        this._fireDirty();
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
}
