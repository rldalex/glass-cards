import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { bus } from '@glass-cards/event-bus';
import { glassTokens, glassMixin } from '@glass-cards/ui-core';
import { t, setLanguage, getLanguage, type TranslationKey } from '@glass-cards/i18n';
import {
  BackendService,
  getAreaEntities,
  type EntityScheduleMap,
  type HomeAssistant,
} from '@glass-cards/base-card';

// — Types —

interface RoomEntry {
  areaId: string;
  name: string;
  icon: string;
  entityCount: number;
  visible: boolean;
  lightsOn: number;
  temperature: string | null;
  tempValue: number | null;
  humidity: string | null;
  humidityValue: number | null;
  mediaPlaying: boolean;
}

const DEFAULT_TEMP_HIGH = 24.0;
const DEFAULT_TEMP_LOW = 17.0;
const DEFAULT_HUMIDITY_THRESHOLD = 65;

interface CardEntry {
  id: string;
  nameKey: TranslationKey | null;
  icon: string;
  descKey: TranslationKey | null;
  count: number;
  visible: boolean;
}

interface SceneEntry {
  entityId: string;
  name: string;
  visible: boolean;
}

interface LightEntry {
  entityId: string;
  name: string;
  isOn: boolean;
  brightnessPct: number;
  layout: 'full' | 'compact';
  visible: boolean;
}

interface SchedulePeriodEdit {
  start: string;
  end: string;
  recurring: boolean;
}

const DEFAULT_CARD_ORDER = ['light', 'media_player', 'climate', 'fan', 'cover', 'vacuum'];

// Domains with an actual card implementation — others are planned for later phases
const IMPLEMENTED_CARDS = new Set(['light', 'cover']);

const CARD_ICONS: Record<string, string> = {
  light: 'mdi:lightbulb-group',
  media_player: 'mdi:speaker',
  climate: 'mdi:thermostat',
  fan: 'mdi:fan',
  cover: 'mdi:blinds',
  vacuum: 'mdi:robot-vacuum',
};

type DomainKey = 'light' | 'media_player' | 'climate' | 'fan' | 'cover' | 'vacuum';

const DOMAIN_I18N_KEYS: Record<DomainKey, { name: TranslationKey; desc: TranslationKey }> = {
  light: { name: 'config.domain_light', desc: 'config.domain_light_desc' },
  media_player: { name: 'config.domain_media_player', desc: 'config.domain_media_player_desc' },
  climate: { name: 'config.domain_climate', desc: 'config.domain_climate_desc' },
  fan: { name: 'config.domain_fan', desc: 'config.domain_fan_desc' },
  cover: { name: 'config.domain_cover', desc: 'config.domain_cover_desc' },
  vacuum: { name: 'config.domain_vacuum', desc: 'config.domain_vacuum_desc' },
};

function getCardMeta(domain: string): { nameKey: TranslationKey | null; icon: string; descKey: TranslationKey | null } {
  const keys = DOMAIN_I18N_KEYS[domain as DomainKey];
  return {
    nameKey: keys ? keys.name : null,
    icon: CARD_ICONS[domain] || 'mdi:help-circle',
    descKey: keys ? keys.desc : null,
  };
}

const ROOM_ICONS = [
  'mdi:sofa', 'mdi:stove', 'mdi:bed', 'mdi:desk',
  'mdi:shower', 'mdi:home', 'mdi:movie-open', 'mdi:music',
  'mdi:wrench', 'mdi:flower', 'mdi:white-balance-sunny', 'mdi:weather-night',
  'mdi:lightbulb', 'mdi:snowflake', 'mdi:fire', 'mdi:lock',
];


// — Component —

export class GlassConfigPanel extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ type: Boolean }) narrow = false;
  private _mounted = false;

  @state() private _lang = getLanguage();
  @state() private _tab: 'navbar' | 'popup' | 'light' | 'weather' | 'title' | 'cover' | 'spotify' | 'dashboard' = 'dashboard';
  @state() private _rooms: RoomEntry[] = [];
  @state() private _emptyRooms: { areaId: string; name: string; icon: string }[] = [];
  @state() private _selectedRoom = '';
  @state() private _cards: CardEntry[] = [];
  @state() private _scenes: SceneEntry[] = [];
  @state() private _lights: LightEntry[] = [];
  @state() private _lightRoom = '';
  @state() private _lightDropdownOpen = false;
  @state() private _iconPickerRoom: string | null = null;
  @state() private _dropdownOpen = false;
  @state() private _toast = false;
  @state() private _saving = false;

  // Feature toggles
  @state() private _showLights = true;
  @state() private _showTemperature = true;
  @state() private _showHumidity = true;
  @state() private _showMedia = true;
  @state() private _autoSort = true;
  @state() private _tempHigh = DEFAULT_TEMP_HIGH;
  @state() private _tempLow = DEFAULT_TEMP_LOW;
  @state() private _humidityThreshold = DEFAULT_HUMIDITY_THRESHOLD;

  // Weather config
  @state() private _weatherEntity = '';
  @state() private _weatherHiddenMetrics: string[] = [];
  @state() private _weatherShowDaily = true;
  @state() private _weatherShowHourly = true;
  @state() private _weatherShowHeader = true;
  @state() private _weatherDropdownOpen = false;

  // Title card config
  @state() private _titleText = '';
  @state() private _titleModeEntity = '';
  @state() private _titleModes: { id: string; label: string; icon: string; color: string }[] = [];
  @state() private _titleModeDropdownOpen = false;
  @state() private _iconPopupModeIdx: number | null = null;
  @state() private _iconSearch = '';
  private _iconList: string[] = [];

  // Title color picker
  @state() private _colorPickerModeIdx: number | null = null;
  @state() private _colorPickerHex: string = '#ffffff';
  @state() private _colorPickerPos: { x: number; y: number } = { x: 50, y: 50 };
  private _cpCanvas: HTMLCanvasElement | null = null;
  private _cancelColorDrag: (() => void) | undefined;

  // Light card config
  @state() private _lightShowHeader = true;

  // Cover card config
  @state() private _coverShowHeader = true;
  @state() private _coverDashboardEntities: string[] = [];
  @state() private _coverDashboardOrder: string[] = [];
  @state() private _coverPresets: number[] = [0, 25, 50, 75, 100];
  @state() private _coverRoom = '';
  @state() private _coverRoomDropdownOpen = false;
  @state() private _coverRoomEntities: { entityId: string; name: string; visible: boolean; deviceClass: string }[] = [];
  @state() private _coverPresetInput = '';

  // Spotify config
  @state() private _spotifyShowHeader = true;
  @state() private _spotifyEntity = '';
  @state() private _spotifySortOrder: 'recent_first' | 'oldest_first' = 'recent_first';
  @state() private _spotifyDropdownOpen = false;
  @state() private _spotifyMaxItems = 6;
  @state() private _spotifyConfigured: boolean | null = null; // null = checking

  // Dashboard config
  @state() private _dashboardEnabledCards: string[] = ['weather'];

  // Schedule config
  @state() private _scheduleExpandedEntity: string | null = null;
  private _scheduleEdits = new Map<string, SchedulePeriodEdit[]>();
  private _schedulesLoaded: EntityScheduleMap = {};

  // DateTime range picker popup
  @state() private _pickerOpen = false;
  private _pickerTarget: { entityId: string; periodIdx: number } | null = null;
  @state() private _pickerYear = new Date().getFullYear();
  @state() private _pickerMonth = new Date().getMonth();
  @state() private _pickerStartDay: number | null = null;
  @state() private _pickerStartMonth = 0;
  @state() private _pickerStartYear = new Date().getFullYear();
  @state() private _pickerEndDay: number | null = null;
  @state() private _pickerEndMonth = 0;
  @state() private _pickerEndYear = new Date().getFullYear();
  @state() private _pickerStartHour = '00';
  @state() private _pickerStartMinute = '00';
  @state() private _pickerEndHour = '23';
  @state() private _pickerEndMinute = '59';
  @state() private _pickerPhase: 'start' | 'end' = 'start';

  // Drag state
  @state() private _dragIdx: number | null = null;
  @state() private _dropIdx: number | null = null;
  private _dragContext: 'rooms' | 'cards' | 'scenes' | 'lights' | 'covers' | 'dashboard_covers' = 'rooms';

  private _backend?: BackendService;
  private _loaded = false;
  private _loading = false;
  private _toastTimeout?: ReturnType<typeof setTimeout>;
  @state() private _toastError = false;
  private _boundCloseDropdowns = this._closeDropdownsOnOutsideClick.bind(this);
  private _boundUpdateScrollMask = this._updateScrollMask.bind(this);
  private _initialIcons = new Map<string, string | null>();

  static styles = [
    glassTokens,
    glassMixin,
    css`
      *, *::before, *::after {
        box-sizing: border-box;
      }
      :host {
        display: block;
        font-family: 'Plus Jakarta Sans', sans-serif;
        min-height: 100vh;
        padding: 32px 16px 48px;
        color: var(--t1);
      }

      /* ── Ambient ── */
      .ambient-bg {
        position: fixed;
        inset: 0;
        z-index: -1;
        background: #111827;
      }
      .ambient-bg::before,
      .ambient-bg::after {
        content: '';
        position: absolute;
        border-radius: 50%;
        filter: blur(120px);
        opacity: 0.35;
      }
      .ambient-bg::before {
        width: 600px;
        height: 600px;
        top: -200px;
        right: -100px;
        background: var(--ambient-blob-top, #2d4a8a);
      }
      .ambient-bg::after {
        width: 500px;
        height: 500px;
        bottom: -150px;
        left: -100px;
        background: var(--ambient-blob-bottom, #3a2d6b);
      }

      /* ── Layout ── */
      .page-wrap {
        max-width: 440px;
        margin: 0 auto;
      }

      /* ── Header ── */
      .page-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
      }
      .page-back {
        width: 32px;
        height: 32px;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b1);
        cursor: pointer;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--t3);
        padding: 0;
        font-family: inherit;
        transition: background var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .page-back:hover {
          background: var(--s3);
        }
      }
      .page-back:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .page-back ha-icon {
        --mdc-icon-size: 18px;
        display: flex; align-items: center; justify-content: center;
      }
      .page-title {
        font-size: 16px;
        font-weight: 700;
        color: var(--t1);
        letter-spacing: -0.3px;
      }
      .page-subtitle {
        font-size: 10px;
        font-weight: 500;
        color: var(--t4);
        margin-left: auto;
        text-transform: uppercase;
        letter-spacing: 0.8px;
      }

      /* ── Panel ── */
      .config-panel {
        padding: 16px;
      }

      /* ── Tabs ── */
      .tabs {
        display: flex;
        gap: 0;
        border-radius: 12px;
        background: var(--s1);
        border: 1px solid var(--b1);
        padding: 3px;
        margin-bottom: 16px;
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none;
        scroll-behavior: smooth;
      }
      .tabs::-webkit-scrollbar { display: none; }
      .tabs.mask-right {
        mask-image: linear-gradient(to right, black calc(100% - 24px), transparent 100%);
        -webkit-mask-image: linear-gradient(to right, black calc(100% - 24px), transparent 100%);
      }
      .tabs.mask-left {
        mask-image: linear-gradient(to left, black calc(100% - 24px), transparent 100%);
        -webkit-mask-image: linear-gradient(to left, black calc(100% - 24px), transparent 100%);
      }
      .tabs.mask-both {
        mask-image: linear-gradient(to right, transparent 0%, black 24px, black calc(100% - 24px), transparent 100%);
        -webkit-mask-image: linear-gradient(to right, transparent 0%, black 24px, black calc(100% - 24px), transparent 100%);
      }
      .tab {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 8px 12px;
        border-radius: 9px;
        font-family: inherit;
        font-size: 11px;
        font-weight: 600;
        color: var(--t3);
        cursor: pointer;
        transition:
          background var(--t-fast),
          color var(--t-fast),
          box-shadow var(--t-fast);
        border: none;
        background: transparent;
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .tab:hover {
          color: var(--t2);
        }
      }
      .tab:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: -2px;
      }
      .tab.active {
        background: var(--s4);
        color: var(--t1);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
      }
      .tab ha-icon {
        --mdc-icon-size: 14px;
        display: flex; align-items: center; justify-content: center;
      }

      /* ── Tab panel animation ── */
      .tab-panel {
        animation: panel-in 0.3s var(--ease-out) both;
      }
      @keyframes panel-in {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* ── Section ── */
      .section-label {
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        color: var(--t4);
        margin-bottom: 8px;
        padding-left: 2px;
      }
      .section-desc {
        font-size: 10px;
        font-weight: 400;
        color: var(--t3);
        margin-bottom: 12px;
        line-height: 1.5;
        padding-left: 2px;
      }

      /* ── Banner ── */
      .banner {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 14px;
        border-radius: var(--radius-lg);
        font-size: 11px;
        font-weight: 500;
        margin-bottom: 14px;
        background: rgba(96, 165, 250, 0.08);
        border: 1px solid rgba(96, 165, 250, 0.12);
        color: var(--t2);
      }
      .banner ha-icon {
        --mdc-icon-size: 16px;
        color: var(--c-info);
        flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
      }

      /* ── Item rows ── */
      .item-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 16px;
      }
      .item-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        border-radius: var(--radius-md);
        background: var(--s1);
        border: 1px solid var(--b1);
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          opacity var(--t-fast);
        user-select: none;
        -webkit-user-select: none;
      }
      @media (hover: hover) and (pointer: fine) {
        .item-row:hover {
          background: var(--s2);
          border-color: var(--b2);
        }
      }
      .item-row.disabled {
        opacity: 0.35;
      }
      .empty-rooms .drag-handle {
        visibility: hidden;
      }
      .empty-rooms .room-icon-btn {
        pointer-events: none;
        opacity: 0.4;
      }
      .item-row.dragging {
        opacity: 0.4;
      }
      .item-row.drop-target {
        border-color: var(--c-accent);
        background: rgba(129, 140, 248, 0.06);
      }

      .card-row {
        padding: 10px;
      }

      /* ── Drag handle ── */
      .drag-handle {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: grab;
        color: var(--t4);
        flex-shrink: 0;
        border-radius: 4px;
        transition: color var(--t-fast);
      }
      @media (hover: hover) and (pointer: fine) {
        .drag-handle:hover {
          color: var(--t3);
        }
      }
      .drag-handle:active {
        cursor: grabbing;
      }
      .drag-handle ha-icon {
        --mdc-icon-size: 14px;
        display: flex; align-items: center; justify-content: center;
      }

      /* ── Room icon button ── */
      .room-icon-btn {
        width: 32px;
        height: 32px;
        border-radius: var(--radius-sm);
        background: var(--s2);
        border: 1px solid var(--b1);
        cursor: pointer;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        padding: 0;
        font-family: inherit;
        transition:
          background var(--t-fast),
          border-color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .room-icon-btn ha-icon {
        --mdc-icon-size: 16px;
        color: var(--t2);
        display: flex; align-items: center; justify-content: center;
      }
      @media (hover: hover) and (pointer: fine) {
        .room-icon-btn:hover {
          background: var(--s3);
          border-color: var(--b2);
        }
      }
      .room-icon-btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* ── Card icon box ── */
      .card-icon-box {
        width: 36px;
        height: 36px;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .card-icon-box ha-icon {
        --mdc-icon-size: 18px;
        color: var(--t2);
        display: flex; align-items: center; justify-content: center;
      }

      /* ── Item info ── */
      .item-info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 1px;
      }
      .item-name {
        font-size: 12px;
        font-weight: 600;
        color: var(--t2);
        line-height: 1.2;
      }
      .item-meta {
        font-size: 9px;
        font-weight: 400;
        color: var(--t4);
        line-height: 1.2;
      }
      .item-row.disabled .item-name {
        color: var(--t4);
      }

      /* ── Card count badge ── */
      .card-count {
        font-size: 10px;
        font-weight: 600;
        color: var(--t3);
        padding: 2px 8px;
        border-radius: var(--radius-full);
        background: var(--s1);
        border: 1px solid var(--b1);
        flex-shrink: 0;
      }

      /* ── Toggle ── */
      .toggle {
        position: relative;
        width: 38px;
        height: 20px;
        border-radius: 10px;
        background: var(--s2);
        border: 1px solid var(--b2);
        cursor: pointer;
        transition:
          background var(--t-fast),
          border-color var(--t-fast);
        padding: 0;
        outline: none;
        font-size: 0;
        flex-shrink: 0;
        -webkit-tap-highlight-color: transparent;
      }
      .toggle::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: var(--t3);
        transition:
          transform var(--t-fast),
          background var(--t-fast),
          box-shadow var(--t-fast);
      }
      .toggle.on {
        background: rgba(74, 222, 128, 0.2);
        border-color: rgba(74, 222, 128, 0.3);
      }
      .toggle.on::after {
        transform: translateX(18px);
        background: var(--c-success);
        box-shadow: 0 0 8px rgba(74, 222, 128, 0.4);
      }
      .toggle:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* ── Dropdown ── */
      .dropdown {
        position: relative;
        width: 100%;
        margin-bottom: 14px;
      }
      .dropdown-trigger {
        width: 100%;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 14px;
        border-radius: 12px;
        border: 1px solid var(--b2);
        background: var(--s2);
        color: var(--t2);
        font-family: inherit;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all var(--t-fast);
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .dropdown-trigger:hover {
          background: var(--s3);
          border-color: var(--b3);
        }
      }
      .dropdown-trigger:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .dropdown-trigger ha-icon {
        --mdc-icon-size: 16px;
        display: flex; align-items: center; justify-content: center;
      }
      .dropdown-trigger .arrow {
        margin-left: auto;
        color: var(--t3);
        transition: transform var(--t-fast);
      }
      .dropdown.open .dropdown-trigger .arrow {
        transform: rotate(180deg);
      }
      .dropdown-menu {
        position: absolute;
        top: calc(100% + 6px);
        left: 0;
        right: 0;
        z-index: 20;
        min-width: 160px;
        border-radius: var(--radius-lg);
        padding: 4px;
        background: #1e2433;
        border: 1px solid var(--b2);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
        opacity: 0;
        transform: translateY(-4px);
        pointer-events: none;
        transition: all var(--t-fast);
      }
      .dropdown.open .dropdown-menu {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }
      .dropdown-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: var(--radius-md);
        font-size: 12px;
        font-weight: 500;
        color: var(--t2);
        cursor: pointer;
        transition: all var(--t-fast);
        border: none;
        background: transparent;
        width: 100%;
        font-family: inherit;
        outline: none;
        text-align: left;
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .dropdown-item:hover {
          background: var(--s3);
          color: var(--t1);
        }
      }
      .dropdown-item:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: -2px;
      }
      .dropdown-item.active {
        color: var(--c-accent);
      }
      .dropdown-item ha-icon {
        --mdc-icon-size: 16px;
        display: flex; align-items: center; justify-content: center;
      }

      /* ── Icon picker ── */
      .icon-picker-fold {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
      }
      .icon-picker-fold.open {
        grid-template-rows: 1fr;
      }
      .icon-picker-inner {
        overflow: hidden;
        opacity: 0;
        transition: opacity var(--t-fast);
      }
      .icon-picker-fold.open .icon-picker-inner {
        opacity: 1;
      }
      .icon-picker-grid {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 4px;
        padding: 8px 0;
      }
      .icon-pick {
        width: 100%;
        aspect-ratio: 1;
        border-radius: var(--radius-sm);
        background: var(--s1);
        border: 1px solid var(--b1);
        cursor: pointer;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        font-family: inherit;
        transition:
          background var(--t-fast),
          border-color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .icon-pick ha-icon {
        --mdc-icon-size: 18px;
        color: var(--t2);
        display: flex; align-items: center; justify-content: center;
      }
      @media (hover: hover) and (pointer: fine) {
        .icon-pick:hover {
          background: var(--s3);
          border-color: var(--b2);
        }
      }
      .icon-pick:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: -2px;
      }
      .icon-pick.selected {
        background: rgba(129, 140, 248, 0.12);
        border-color: rgba(129, 140, 248, 0.25);
      }

      /* ── Preview ── */
      .preview-encart {
        margin-bottom: 14px;
        padding: 12px;
        border-radius: var(--radius-lg);
        background: var(--s1);
        border: 1px solid var(--b1);
      }
      .preview-label {
        font-size: 8px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        color: var(--t4);
        margin-bottom: 8px;
      }

      /* Preview navbar — miniature faithful to real navbar */
      .preview-navbar {
        display: flex;
        align-items: center;
        gap: 3px;
        padding: 0 6px;
        height: 46px;
        border-radius: 16px;
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.08) 0%,
          rgba(255, 255, 255, 0.03) 50%,
          rgba(255, 255, 255, 0.06) 100%
        );
        backdrop-filter: blur(50px) saturate(1.5);
        -webkit-backdrop-filter: blur(50px) saturate(1.5);
        box-shadow:
          inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
          0 20px 60px rgba(0, 0, 0, 0.4),
          0 4px 16px rgba(0, 0, 0, 0.25);
        border: 1px solid var(--b2);
        overflow-x: auto;
        scrollbar-width: none;
      }
      .preview-navbar::-webkit-scrollbar {
        display: none;
      }
      .preview-nav-item {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        height: 34px;
        min-width: 34px;
        padding: 0 8px;
        border-radius: 11px;
        background: transparent;
        flex-shrink: 0;
        position: relative;
        transition:
          background var(--t-fast),
          color var(--t-fast),
          opacity var(--t-fast);
        color: var(--t3);
      }
      .preview-nav-item ha-icon {
        --mdc-icon-size: 18px;
        flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .preview-nav-item.hidden-preview {
        opacity: 0.2;
      }
      .preview-nav-item.active-preview {
        background: rgba(255, 255, 255, 0.1);
        color: var(--t1);
      }
      .preview-nav-item.active-preview ha-icon {
        color: var(--t1);
      }
      .preview-nav-label {
        font-size: 10px;
        font-weight: 600;
        white-space: nowrap;
        display: grid;
        grid-template-columns: 0fr;
        overflow: hidden;
        transition: grid-template-columns 0.35s var(--ease-out);
      }
      .preview-nav-item.active-preview .preview-nav-label {
        grid-template-columns: 1fr;
      }
      .preview-nav-label span {
        min-width: 0;
        overflow: hidden;
        opacity: 0;
        transition: opacity var(--t-fast);
      }
      .preview-nav-item.active-preview .preview-nav-label span {
        opacity: 1;
      }

      /* Preview navbar — live indicators */
      .preview-nav-item.has-light ha-icon {
        color: var(--c-light-glow);
        filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.6));
        animation: pulse-light 3s ease-in-out infinite;
      }
      @keyframes pulse-light {
        0%, 100% { filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.6)); }
        50% { filter: drop-shadow(0 0 2px rgba(251, 191, 36, 0.2)); }
      }
      .preview-nav-item.has-humidity::after {
        content: '';
        position: absolute;
        bottom: 3px;
        left: 50%;
        transform: translateX(-50%);
        width: 12px;
        height: 2px;
        border-radius: 2px;
        background: var(--c-info);
        opacity: 0.8;
        box-shadow: 0 0 6px rgba(96, 165, 250, 0.4);
      }
      .preview-nav-item.has-music ha-icon {
        animation: pulse-music 0.8s ease-in-out infinite;
      }
      .preview-nav-item.has-light.has-music ha-icon {
        color: var(--c-light-glow);
        animation: pulse-light 3s ease-in-out infinite, pulse-music 0.8s ease-in-out infinite;
      }
      @keyframes pulse-music {
        0%, 100% { transform: scale(1); }
        30% { transform: scale(1.2); }
        50% { transform: scale(0.95); }
        70% { transform: scale(1.1); }
      }
      .preview-temp-badge {
        position: absolute;
        top: 1px;
        right: 3px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity var(--t-fast);
      }
      .preview-temp-badge ha-icon {
        --mdc-icon-size: 8px;
      }
      .preview-nav-item.has-temp-hot .preview-temp-badge {
        opacity: 1;
        color: var(--c-temp-hot);
        filter: drop-shadow(0 0 4px rgba(248, 113, 113, 0.6));
        animation: pulse-temp-hot 2s infinite ease-in-out;
      }
      .preview-nav-item.has-temp-cold .preview-temp-badge {
        opacity: 1;
        color: var(--c-temp-cold);
        filter: drop-shadow(0 0 4px rgba(96, 165, 250, 0.6));
        animation: pulse-temp-cold 2s infinite ease-in-out;
      }
      @keyframes pulse-temp-hot {
        0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 transparent); }
        50% { transform: scale(1.15); filter: drop-shadow(0 0 6px rgba(248, 113, 113, 0.6)); }
      }
      @keyframes pulse-temp-cold {
        0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 transparent); }
        50% { transform: scale(1.15); filter: drop-shadow(0 0 6px rgba(96, 165, 250, 0.6)); }
      }

      /* Preview popup — faithful miniature of real popup */
      .preview-popup {
        border-radius: var(--radius-lg);
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.08) 0%,
          rgba(255, 255, 255, 0.03) 50%,
          rgba(255, 255, 255, 0.06) 100%
        );
        backdrop-filter: blur(50px) saturate(1.5);
        -webkit-backdrop-filter: blur(50px) saturate(1.5);
        box-shadow:
          inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
          0 20px 60px rgba(0, 0, 0, 0.4),
          0 4px 16px rgba(0, 0, 0, 0.25);
        border: 1px solid var(--b2);
        padding: 12px;
        overflow: hidden;
      }
      .preview-popup-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
      }
      .preview-popup-header-left {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
      }
      .preview-popup-icon-box {
        width: 30px;
        height: 30px;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--t2);
      }
      .preview-popup-icon-box ha-icon {
        --mdc-icon-size: 15px;
        display: flex; align-items: center; justify-content: center;
      }
      .preview-popup-icon-box.has-light ha-icon {
        color: var(--c-light-glow);
        filter: drop-shadow(0 0 5px rgba(251, 191, 36, 0.6));
      }
      .preview-popup-icon-box.has-music ha-icon {
        animation: pulse-music 0.8s ease-in-out infinite;
      }
      .preview-popup-scene-dash {
        width: 10px;
        height: 2px;
        background: var(--t4);
        border-radius: 4px;
        margin-top: 4px;
        opacity: 0;
        transition: opacity 0.3s var(--ease-std);
      }
      .preview-popup-scene-dash.visible {
        opacity: 1;
      }
      .preview-popup-info {
        flex: 1;
        min-width: 0;
      }
      .preview-popup-name {
        font-size: 12px;
        font-weight: 700;
        color: var(--t1);
        line-height: 1.2;
      }
      .preview-popup-meta {
        display: flex;
        gap: 8px;
        font-size: 9px;
        font-weight: 500;
        color: var(--t3);
        margin-top: 2px;
      }
      .preview-popup-close {
        width: 20px;
        height: 20px;
        border-radius: var(--radius-sm);
        background: transparent;
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: var(--t3);
        pointer-events: none;
      }
      .preview-popup-close ha-icon {
        --mdc-icon-size: 10px;
        display: flex; align-items: center; justify-content: center;
      }

      /* Preview popup scenes */
      .preview-popup-scenes {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        padding-bottom: 8px;
      }
      .preview-scene-chip {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
        padding: 3px 8px;
        font-size: 7px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.6px;
        color: var(--t3);
        transition: opacity var(--t-fast);
      }
      .preview-scene-chip.hidden-scene {
        opacity: 0.2;
      }

      /* Preview popup cards */
      .preview-popup-cards {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .preview-card-slot {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 8px;
        border-radius: var(--radius-sm);
        background: var(--s1);
        border: 1px solid var(--b1);
        transition: opacity var(--t-fast);
      }
      .preview-card-slot ha-icon {
        --mdc-icon-size: 14px;
        color: var(--t3);
        display: flex; align-items: center; justify-content: center;
      }
      .preview-card-slot-name {
        font-size: 10px;
        font-weight: 600;
        color: var(--t2);
      }
      .preview-card-slot-count {
        margin-left: auto;
        font-size: 9px;
        font-weight: 600;
        color: var(--t4);
        padding: 1px 6px;
        border-radius: var(--radius-full);
        background: var(--s2);
        border: 1px solid var(--b1);
      }
      .preview-empty {
        font-size: 10px;
        font-weight: 500;
        color: var(--t4);
        text-align: center;
        padding: 12px 0;
      }

      /* Preview light card */
      .preview-light {
        border-radius: var(--radius-lg);
        overflow: hidden;
      }
      .preview-light-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 4px;
        padding: 0 4px;
      }
      .preview-light-header-left {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .preview-light-title {
        font-size: 7px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: var(--t4);
      }
      .preview-light-count {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 14px;
        height: 14px;
        padding: 0 4px;
        border-radius: var(--radius-full);
        font-size: 7px;
        font-weight: 700;
      }
      .preview-light-count.none {
        background: var(--s2);
        color: var(--t3);
      }
      .preview-light-count.some {
        background: rgba(251, 191, 36, 0.15);
        color: var(--c-light-glow);
      }
      .preview-light-count.all {
        background: rgba(251, 191, 36, 0.2);
        color: var(--c-light-glow);
      }
      .preview-light-toggle {
        width: 28px;
        height: 14px;
        border-radius: 7px;
        background: var(--s2);
        border: 1px solid var(--b2);
        position: relative;
        pointer-events: none;
      }
      .preview-light-toggle::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--t3);
        transition: transform var(--t-fast), background var(--t-fast);
      }
      .preview-light-toggle.on {
        background: rgba(251, 191, 36, 0.2);
        border-color: rgba(251, 191, 36, 0.3);
      }
      .preview-light-toggle.on::after {
        transform: translateX(14px);
        background: var(--c-light-glow);
        box-shadow: 0 0 6px rgba(251, 191, 36, 0.4);
      }
      .preview-light-body {
        border-radius: var(--radius-lg);
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.06) 0%,
          rgba(255, 255, 255, 0.02) 100%
        );
        box-shadow:
          inset 0 1px 0 0 rgba(255, 255, 255, 0.08),
          0 8px 24px rgba(0, 0, 0, 0.3);
        border: 1px solid var(--b1);
        padding: 8px;
        position: relative;
        overflow: hidden;
      }
      .preview-light-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0;
        position: relative;
        z-index: 1;
      }
      .preview-light-row {
        display: flex;
        align-items: center;
        gap: 6px;
        grid-column: 1 / -1;
        padding: 5px 4px;
        border-radius: 6px;
        transition: opacity var(--t-fast);
      }
      .preview-light-row.compact {
        grid-column: span 1;
      }
      .preview-light-row.compact-right {
        padding-left: 8px;
        position: relative;
      }
      .preview-light-row.compact-right::before {
        content: '';
        position: absolute;
        left: 0;
        top: 20%;
        bottom: 20%;
        width: 1px;
        background: linear-gradient(
          to bottom,
          transparent,
          rgba(255, 255, 255, 0.08) 30%,
          rgba(255, 255, 255, 0.08) 70%,
          transparent
        );
      }
      .preview-light-row.hidden-light {
        opacity: 0.2;
      }
      .preview-light-icon {
        width: 24px;
        height: 24px;
        border-radius: 6px;
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: var(--t3);
      }
      .preview-light-icon ha-icon {
        --mdc-icon-size: 12px;
        display: flex; align-items: center; justify-content: center;
      }
      .preview-light-icon.on {
        background: rgba(251, 191, 36, 0.1);
        border-color: rgba(251, 191, 36, 0.15);
        color: var(--c-light-glow);
        filter: drop-shadow(0 0 4px rgba(251, 191, 36, 0.4));
      }
      .preview-light-info {
        flex: 1;
        min-width: 0;
      }
      .preview-light-name {
        font-size: 9px;
        font-weight: 600;
        color: var(--t1);
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .preview-light-sub {
        font-size: 7px;
        font-weight: 500;
        color: var(--t3);
        margin-top: 1px;
      }
      .preview-light-row[data-on='true'] .preview-light-sub {
        color: rgba(251, 191, 36, 0.55);
      }
      .preview-light-dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        flex-shrink: 0;
        background: var(--t4);
        transition: background var(--t-fast), box-shadow var(--t-fast);
      }
      .preview-light-dot.on {
        background: var(--c-light-glow);
        box-shadow: 0 0 6px rgba(251, 191, 36, 0.5);
      }
      .preview-light-tint {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        transition: opacity var(--t-slow);
      }
      .preview-light-sched {
        --mdc-icon-size: 10px;
        color: var(--c-accent);
        flex-shrink: 0;
        opacity: 0.7;
      }
      .preview-light-layout-tag {
        font-size: 6px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--t4);
        background: var(--s2);
        border: 1px solid var(--b1);
        border-radius: 3px;
        padding: 1px 4px;
        flex-shrink: 0;
      }

      /* ── Preview weather (realistic miniature) ── */
      .preview-weather-wrap {
        display: flex; flex-direction: column; gap: 4px;
      }
      .pw-card-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 4px;
      }
      .pw-card-title {
        font-size: 7px; font-weight: 700;
        text-transform: uppercase; letter-spacing: 1.2px;
        color: var(--t4);
      }
      .pw-card-location {
        font-size: 7px; font-weight: 500; color: var(--t3);
      }

      /* ── Preview title card ── */
      .preview-title-card {
        display: flex; flex-direction: column; align-items: center;
        gap: 4px; padding: 8px 12px; text-align: center;
      }
      .preview-title-text {
        font-size: 16px; font-weight: 700; color: var(--t1);
        letter-spacing: -0.3px; line-height: 1.2;
        display: flex; align-items: center; gap: 10px;
        width: 100%;
      }
      .preview-title-text::before, .preview-title-text::after {
        content: ''; flex: 1; height: 1px;
        background: linear-gradient(90deg, transparent, var(--b3));
      }
      .preview-title-text::after {
        background: linear-gradient(90deg, var(--b3), transparent);
      }
      .preview-title-mode {
        display: flex; align-items: center; gap: 4px;
        font-size: 9px;
      }
      .preview-title-mode ha-icon {
        display: flex; align-items: center; justify-content: center;
      }
      .preview-title-dot {
        width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
      }

      /* ── Title config styles ── */
      .title-section-gap {
        height: 12px;
      }
      .title-modes-list {
        display: flex; flex-direction: column; gap: 10px;
      }
      .title-mode-row {
        display: flex; flex-direction: column; gap: 8px;
        padding: 12px; border-radius: var(--radius-md);
        background: var(--s1); border: 1px solid var(--b1);
      }
      .title-mode-id {
        font-size: 10px; font-weight: 700; color: var(--t3);
        text-transform: uppercase; letter-spacing: 0.5px;
      }
      .title-color-row {
        display: flex; align-items: center; gap: 8px;
      }
      .title-color-label {
        font-size: 10px; color: var(--t4); white-space: nowrap;
      }
      .title-color-chips {
        display: flex; gap: 6px; align-items: center;
      }
      .title-color-chip {
        width: 20px; height: 20px; border-radius: 50%;
        border: 2px solid transparent; cursor: pointer;
        transition: all var(--t-fast); outline: none;
      }
      @media (hover: hover) and (pointer: fine) {
        .title-color-chip:hover { transform: scale(1.1); }
      }
      .title-color-chip.neutral { background: var(--t4); }
      .title-color-chip.success { background: var(--c-success); }
      .title-color-chip.warning { background: var(--c-warning); }
      .title-color-chip.info { background: var(--c-info); }
      .title-color-chip.accent { background: var(--c-accent); }
      .title-color-chip.alert { background: var(--c-alert); }
      .title-color-chip.active { border-color: var(--t1); transform: scale(1.15); }

      /* ── Title mode icon picker ── */
      .title-mode-fields-row {
        display: flex; gap: 8px; align-items: center;
      }
      .title-mode-fields-row .input { flex: 1; min-width: 0; }
      .title-icon-btn {
        width: 44px; align-self: stretch; flex-shrink: 0;
        border-radius: 12px; border: 1px solid var(--b2);
        background: var(--s1); cursor: pointer; outline: none;
        display: flex; align-items: center; justify-content: center;
        padding: 0; font-family: inherit;
        transition: background var(--t-fast), border-color var(--t-fast);
      }
      .title-icon-btn ha-icon {
        --mdc-icon-size: 20px;
        color: var(--t3);
        display: flex; align-items: center; justify-content: center;
      }
      .title-icon-btn.has-icon { border-color: var(--b3); }
      .title-icon-btn.has-icon ha-icon { color: var(--t1); }
      @media (hover: hover) and (pointer: fine) {
        .title-icon-btn:hover { background: var(--s3); border-color: var(--b3); }
      }
      .title-icon-btn:focus-visible {
        outline: 2px solid var(--c-accent); outline-offset: -2px;
      }

      /* ── Icon picker popup (glass) ── */
      .icon-popup-overlay {
        position: fixed; inset: 0; z-index: 10000;
        background: rgba(0, 0, 0, 0.5);
        display: flex; align-items: center; justify-content: center;
        padding: 24px;
        animation: fade-in 0.15s ease-out;
      }
      @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
      .icon-popup {
        width: 100%; max-width: 400px; max-height: 70vh;
        display: flex; flex-direction: column;
        border-radius: var(--radius-xl);
        background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.06) 100%);
        backdrop-filter: blur(40px) saturate(1.4);
        -webkit-backdrop-filter: blur(40px) saturate(1.4);
        box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15);
        border: 1px solid var(--b2);
        overflow: hidden;
        animation: popup-in 0.2s var(--ease-out);
      }
      @keyframes popup-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      .icon-popup-header {
        padding: 14px 16px 10px;
        display: flex; flex-direction: column; gap: 10px;
        border-bottom: 1px solid var(--b1);
      }
      .icon-popup-title {
        font-size: 11px; font-weight: 600; text-transform: uppercase;
        letter-spacing: 1px; color: var(--t3);
      }
      .icon-popup-search {
        width: 100%; padding: 10px 14px; border-radius: 12px;
        border: 1px solid var(--b2); background: var(--s1);
        color: var(--t1); font-family: inherit; font-size: 13px;
        outline: none; transition: border-color var(--t-fast);
        box-sizing: border-box;
      }
      .icon-popup-search:focus { border-color: var(--b3); }
      .icon-popup-search::placeholder { color: var(--t4); }
      .icon-popup-grid-wrap {
        flex: 1; overflow-y: auto; padding: 10px;
        scrollbar-width: thin;
        scrollbar-color: var(--s3) transparent;
      }
      .icon-popup-grid {
        display: grid; grid-template-columns: repeat(6, 1fr);
        gap: 4px;
      }
      .icon-popup-grid .icon-pick {
        aspect-ratio: 1; width: 100%;
        display: flex; align-items: center; justify-content: center;
      }
      .icon-popup-grid .icon-pick ha-icon {
        display: flex; align-items: center; justify-content: center;
      }
      .icon-popup-empty {
        padding: 24px; text-align: center;
        font-size: 12px; color: var(--t4);
      }

      /* ── Color picker popup (glass) ── */
      .cp-overlay {
        position: fixed; inset: 0; z-index: 10001;
        display: flex; align-items: center; justify-content: center;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
        animation: cpFadeIn 0.2s ease;
      }
      @keyframes cpFadeIn { from { opacity: 0; } to { opacity: 1; } }
      .cp-dialog {
        background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.06) 100%);
        backdrop-filter: blur(40px) saturate(1.4); -webkit-backdrop-filter: blur(40px) saturate(1.4);
        border: 1px solid var(--b2); border-radius: var(--radius-xl);
        padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 14px;
        box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.25);
        max-width: 300px; width: 90vw;
      }
      .cp-dialog .cp-title {
        font-size: 11px; font-weight: 700; text-transform: uppercase;
        letter-spacing: 1px; color: var(--t3);
      }
      .cp-wheel-wrap {
        position: relative; width: 220px; height: 220px;
      }
      .cp-wheel-wrap canvas {
        width: 100%; height: 100%; border-radius: 50%; cursor: crosshair;
      }
      .cp-cursor {
        position: absolute; width: 22px; height: 22px; border-radius: 50%;
        border: 3px solid white; box-shadow: 0 0 6px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.2);
        pointer-events: none; transform: translate(-50%, -50%);
        transition: left 0.05s, top 0.05s;
      }
      .cp-preview {
        width: 100%; height: 32px; border-radius: var(--radius-md);
        border: 1px solid var(--b2);
      }
      .cp-hex {
        font-size: 12px; font-weight: 600; color: var(--t2);
        font-family: monospace; letter-spacing: 0.5px;
      }
      .cp-confirm {
        font-family: inherit; font-size: 12px; font-weight: 600;
        text-transform: uppercase; letter-spacing: 0.8px; color: var(--t2);
        background: var(--s2); border: 1px solid var(--b2);
        border-radius: var(--radius-md); padding: 8px 24px;
        cursor: pointer; outline: none; -webkit-tap-highlight-color: transparent;
        transition: background var(--t-fast), border-color var(--t-fast);
      }
      @media (hover: hover) and (pointer: fine) {
        .cp-confirm:hover { background: var(--s3); border-color: var(--b3); }
      }
      .cp-confirm:focus-visible { outline: 2px solid var(--c-accent); outline-offset: -2px; }

      /* Color picker button (rainbow ring) */
      .title-color-picker-btn {
        width: 20px; height: 20px; border-radius: 50%;
        border: 2px solid transparent; cursor: pointer; padding: 0;
        outline: none; background: none; -webkit-tap-highlight-color: transparent;
        transition: all var(--t-fast); flex-shrink: 0;
        position: relative;
      }
      .title-color-picker-btn::before {
        content: ''; position: absolute; inset: -2px; border-radius: 50%;
        background: conic-gradient(
          hsl(0,80%,60%), hsl(60,80%,55%), hsl(120,70%,50%),
          hsl(180,75%,50%), hsl(240,75%,60%), hsl(300,75%,55%), hsl(360,80%,60%)
        );
      }
      @media (hover: hover) and (pointer: fine) {
        .title-color-picker-btn:hover { transform: scale(1.15); }
      }
      .title-color-picker-btn:focus-visible { outline: 2px solid var(--c-accent); outline-offset: 2px; }
      .title-color-chip.custom {
        border: 2px solid var(--b3);
      }
      .title-color-chip.custom.active {
        border-color: var(--t1); transform: scale(1.15);
      }

      .preview-weather {
        border-radius: var(--radius-lg);
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.08) 0%,
          rgba(255, 255, 255, 0.03) 50%,
          rgba(255, 255, 255, 0.06) 100%
        );
        backdrop-filter: blur(50px) saturate(1.5);
        -webkit-backdrop-filter: blur(50px) saturate(1.5);
        box-shadow:
          inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
          0 20px 60px rgba(0, 0, 0, 0.4),
          0 4px 16px rgba(0, 0, 0, 0.25);
        border: 1px solid var(--b2);
        overflow: hidden;
        position: relative;
      }
      .pw-tint {
        position: absolute; inset: 0;
        border-radius: inherit;
        pointer-events: none; z-index: 0;
      }
      .pw-content {
        position: relative; z-index: 1;
        padding: 10px;
        display: flex; flex-direction: column; gap: 6px;
      }
      .pw-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      .pw-header-left {
        display: flex; flex-direction: column; gap: 1px;
      }
      .pw-time {
        font-size: 18px; font-weight: 300; color: var(--t1); line-height: 1;
        font-variant-numeric: tabular-nums;
      }
      .pw-time .pw-sec {
        font-size: 8px; font-weight: 400; color: var(--t4);
      }
      .pw-date {
        font-size: 7px; color: var(--t3);
        text-transform: capitalize;
      }
      .pw-date::first-letter { font-weight: 700; }
      .pw-header-right {
        display: flex; flex-direction: column; align-items: flex-end; gap: 2px;
      }
      .pw-temp {
        font-size: 20px; font-weight: 700; color: var(--t1); line-height: 1;
      }
      .pw-temp-unit {
        font-size: 8px; font-weight: 400; color: var(--t3); vertical-align: super;
      }
      .pw-cond {
        display: flex; align-items: center; gap: 3px;
        font-size: 7px; font-weight: 500; color: var(--t3);
      }
      .pw-cond ha-icon {
        --mdc-icon-size: 10px;
        display: flex; align-items: center; justify-content: center;
        color: var(--t3);
      }
      .pw-feels {
        font-size: 6px; color: var(--t4);
      }
      /* ── Sparkline ── */
      .pw-spark-zone {
        height: 44px; position: relative; overflow: hidden;
        border-radius: var(--radius-sm);
      }
      .pw-spark-svg {
        display: block; width: 100%; height: 100%;
      }
      .pw-spark-now {
        position: absolute; top: 0; bottom: 16px; width: 1px;
        background: linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.5) 70%, transparent 100%);
        transform: translateX(-50%);
      }
      .pw-spark-now-dot {
        position: absolute; left: 50%; transform: translate(-50%, -50%);
        width: 4px; height: 4px; border-radius: 50%;
        background: white;
        box-shadow: 0 0 4px rgba(255,255,255,0.8);
      }
      .pw-spark-labels {
        position: absolute; bottom: 0; left: 0; right: 0; height: 12px;
      }
      .pw-spark-lbl {
        position: absolute; transform: translateX(-50%);
        font-size: 5px; color: var(--t4);
        font-variant-numeric: tabular-nums;
      }
      /* ── Metrics ── */
      .pw-metrics {
        display: grid;
        gap: 1px;
        border-radius: var(--radius-sm);
        background: var(--b1);
        overflow: hidden;
      }
      .pw-metric {
        display: flex; align-items: center; justify-content: center; gap: 2px;
        padding: 4px 3px;
        background: var(--s1);
      }
      .pw-metric ha-icon {
        --mdc-icon-size: 9px;
        width: 9px; height: 9px;
        display: flex; align-items: center; justify-content: center;
        color: var(--t4);
      }
      .pw-metric.humidity ha-icon { color: rgba(96,165,250,0.5); }
      .pw-metric.wind ha-icon { color: rgba(110,231,183,0.5); }
      .pw-metric.pressure ha-icon { color: rgba(148,163,184,0.5); }
      .pw-metric.uv ha-icon { color: rgba(251,191,36,0.5); }
      .pw-metric.visibility ha-icon { color: rgba(148,163,184,0.4); }
      .pw-metric.sunrise ha-icon { color: rgba(251,191,36,0.4); }
      .pw-metric.sunset ha-icon { color: rgba(251,146,60,0.5); }
      .pw-metric-val { font-size: 7px; font-weight: 600; color: var(--t2); }
      .pw-metric-unit { font-size: 5px; font-weight: 400; color: var(--t4); }
      .pw-metric-dir { font-size: 6px; font-weight: 700; color: var(--t3); }
      /* ── Forecast ── */
      .pw-forecast-zone {
        display: flex; flex-direction: column; gap: 4px;
      }
      .pw-tabs {
        display: flex; justify-content: center; gap: 4px;
      }
      .pw-tab {
        font-size: 7px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;
        color: var(--t4);
        padding: 2px 6px;
        border-radius: 100px;
        border: 1px solid var(--b1);
        background: transparent;
      }
      .pw-tab.active {
        color: var(--t1);
        background: var(--s4);
        border-color: var(--b3);
      }
      .pw-fold-sep {
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
        opacity: 0.3;
      }
      .pw-daily-list {
        display: flex; flex-direction: column; gap: 1px;
      }
      .pw-day-row {
        display: grid;
        grid-template-columns: 28px 14px 1fr 24px;
        align-items: center;
        gap: 4px;
        padding: 2px 4px;
        border-radius: var(--radius-sm);
      }
      .pw-day-row.today {
        background: var(--s2);
      }
      .pw-day-label {
        font-size: 7px; font-weight: 600; color: var(--t3);
      }
      .pw-day-row.today .pw-day-label { color: var(--t2); }
      .pw-day-icon {
        --mdc-icon-size: 10px;
        display: flex; align-items: center; justify-content: center;
        color: var(--t3);
      }
      .pw-day-temps {
        display: flex; align-items: baseline; gap: 3px;
      }
      .pw-day-high {
        font-size: 7px; font-weight: 700; color: var(--t2);
      }
      .pw-day-low {
        font-size: 6px; font-weight: 400; color: var(--t4);
      }
      .pw-day-precip {
        font-size: 6px; color: rgba(96,165,250,0.5);
        text-align: right;
      }

      /* ── Preview dashboard ── */
      .preview-dashboard {
        border-radius: var(--radius-lg);
        background: rgba(17, 24, 39, 0.6);
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-height: 80px;
      }
      .preview-dashboard-cards {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .preview-dashboard-navbar {
        display: flex;
        gap: 6px;
        justify-content: center;
        padding: 4px 8px;
        border-radius: var(--radius-md);
        background: var(--s1);
        border: 1px solid var(--b1);
        margin-top: auto;
      }
      .preview-dashboard-navbar ha-icon {
        --mdc-icon-size: 14px;
        color: var(--t3);
        display: flex; align-items: center; justify-content: center;
      }
      .preview-dashboard-card {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        border-radius: var(--radius-md);
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.06) 0%,
          rgba(255, 255, 255, 0.02) 100%
        );
        border: 1px solid var(--b1);
        font-size: 10px;
        font-weight: 600;
        color: var(--t2);
      }
      .preview-dashboard-card ha-icon {
        --mdc-icon-size: 16px;
        color: var(--t3);
        display: flex; align-items: center; justify-content: center;
      }
      .preview-dashboard-card.weather ha-icon {
        color: rgba(251, 191, 36, 0.7);
      }
      .preview-dashboard-card.light ha-icon {
        color: rgba(251, 191, 36, 0.5);
      }
      .preview-dashboard-empty {
        text-align: center;
        color: var(--t4);
        font-size: 11px;
        padding: 16px 0;
      }

      /* ── Feature toggles ── */
      .feature-list {
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin-bottom: 14px;
      }
      .feature-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        border-radius: var(--radius-md);
        transition: background var(--t-fast);
        border: none;
        background: none;
        width: 100%;
        cursor: pointer;
        font-family: inherit;
        outline: none;
        text-align: left;
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .feature-row:hover {
          background: var(--s1);
        }
      }
      .feature-row:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: -2px;
      }
      .feature-icon {
        width: 28px;
        height: 28px;
        border-radius: var(--radius-sm);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .feature-icon ha-icon {
        --mdc-icon-size: 14px;
        color: var(--t2);
        display: flex; align-items: center; justify-content: center;
      }
      .feature-text {
        flex: 1;
        min-width: 0;
      }
      .feature-name {
        font-size: 11px;
        font-weight: 600;
        color: var(--t1);
      }
      .feature-desc {
        font-size: 9px;
        color: var(--t3);
        margin-top: 1px;
      }
      .feature-row .feature-name {
        color: var(--t1);
      }
      .feature-sub {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
      }
      .feature-sub.open { grid-template-rows: 1fr; }
      .feature-sub-inner {
        overflow: hidden;
        opacity: 0;
        transition: opacity 0.2s var(--ease-std);
      }
      .feature-sub.open .feature-sub-inner {
        opacity: 1;
        transition-delay: 0.08s;
      }
      .feature-sub-content {
        margin-left: 24px;
        padding-left: 14px;
        border-left: 2px solid var(--b2);
      }

      /* ── Threshold inputs ── */
      .threshold-list {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-bottom: 14px;
      }
      .threshold-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 6px 10px;
      }
      .threshold-icon {
        width: 28px;
        height: 28px;
        border-radius: var(--radius-sm);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .threshold-icon ha-icon {
        --mdc-icon-size: 14px;
        color: var(--t2);
        display: flex; align-items: center; justify-content: center;
      }
      .threshold-icon.hot ha-icon { color: var(--c-temp-hot); }
      .threshold-icon.cold ha-icon { color: var(--c-temp-cold); }
      .threshold-icon.humidity ha-icon { color: var(--c-info); }
      .threshold-label {
        flex: 1;
        min-width: 0;
        font-size: 11px;
        font-weight: 600;
        color: var(--t2);
      }
      .threshold-input {
        width: 56px;
        height: 28px;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b2);
        background: var(--s2);
        color: var(--t1);
        font-family: inherit;
        font-size: 12px;
        font-weight: 600;
        text-align: center;
        outline: none;
        transition: border-color var(--t-fast);
        -webkit-appearance: none;
        -moz-appearance: textfield;
      }
      .threshold-input:focus {
        border-color: var(--c-accent);
      }
      .threshold-input::-webkit-inner-spin-button,
      .threshold-input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      .threshold-unit {
        font-size: 10px;
        font-weight: 500;
        color: var(--t4);
        width: 16px;
      }

      /* ── Light row extras ── */
      .light-state {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-left: auto;
        flex-shrink: 0;
      }
      .light-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--t4);
      }
      .light-dot.on {
        background: var(--c-light-glow);
        box-shadow: 0 0 6px rgba(251, 191, 36, 0.5);
      }
      .light-brightness {
        font-size: 9px;
        font-weight: 600;
        color: var(--t3);
        min-width: 28px;
        text-align: right;
      }
      .layout-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 24px;
        padding: 0 8px;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t3);
        font-family: inherit;
        font-size: 8px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        cursor: pointer;
        transition:
          background var(--t-fast),
          color var(--t-fast),
          border-color var(--t-fast);
        outline: none;
        flex-shrink: 0;
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .layout-btn:hover {
          background: var(--s3);
          color: var(--t2);
          border-color: var(--b3);
        }
      }
      .layout-btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* ── Schedule button (btn-icon.xs pattern from kit) ── */
      .schedule-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: var(--radius-sm);
        border: 1px solid transparent;
        background: transparent;
        color: var(--t4);
        cursor: pointer;
        flex-shrink: 0;
        padding: 0;
        transition: all var(--t-fast);
        outline: none;
        -webkit-tap-highlight-color: transparent;
        --mdc-icon-size: 16px;
      }
      .schedule-btn.active {
        color: var(--c-accent);
        border-color: rgba(129,140,248,0.25);
        background: rgba(129,140,248,0.12);
      }
      @media (hover: hover) and (pointer: fine) {
        .schedule-btn:hover {
          background: var(--s4);
          border-color: var(--b3);
          color: var(--t1);
        }
      }
      .schedule-btn:active { transform: scale(0.96); }
      .schedule-btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* ── Item card wrapper ── */
      .item-card {
        border-radius: var(--radius-md);
        overflow: hidden;
        border: 1px solid var(--b1);
        background: var(--s1);
        transition: border-color var(--t-fast);
      }
      .item-card .item-row {
        border: none;
        border-radius: 0;
        background: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .item-card:hover {
          background: var(--s2);
          border-color: var(--b2);
        }
      }
      .item-card.expanded {
        border-color: var(--b2);
      }
      .item-card.expanded .item-row {
        border-bottom: none;
      }
      .item-card .item-row.disabled {
        opacity: 0.35;
      }

      /* ── Fold separator (from kit) ── */
      .fold-sep {
        height: 1px;
        margin: 0 12px;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
        opacity: 0;
        transition: opacity var(--t-fast);
      }
      .fold-sep.visible { opacity: 1; }

      /* ── Schedule fold (CSS Grid 0fr/1fr from kit) ── */
      .schedule-fold {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
      }
      .schedule-fold.open {
        grid-template-rows: 1fr;
      }
      .schedule-fold-inner {
        overflow: hidden;
        opacity: 0;
        transition: opacity var(--t-fast);
      }
      .schedule-fold.open .schedule-fold-inner {
        opacity: 1;
      }
      .schedule-body {
        padding: 10px 12px 12px 36px;
      }
      .schedule-header {
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--t3);
        margin-bottom: 8px;
      }
      .schedule-period {
        padding: 8px 0;
        border-bottom: 1px solid var(--b1);
      }
      .schedule-period:last-of-type {
        border-bottom: none;
      }
      .schedule-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 6px;
      }
      .schedule-row-actions {
        justify-content: space-between;
        margin-bottom: 0;
      }
      .schedule-label {
        font-size: 11px;
        font-weight: 500;
        color: var(--t3);
        min-width: 36px;
        flex-shrink: 0;
      }
      /* ── Input (from kit) ── */
      .input {
        width: 100%;
        padding: 10px 14px;
        border-radius: 12px;
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t1);
        font-family: inherit;
        font-size: 13px;
        outline: none;
        transition: border-color var(--t-fast);
      }
      .input:focus { border-color: var(--b3); }
      .input::placeholder { color: var(--t4); }
      /* schedule-input removed — replaced by .datetime-display */

      /* ── Check item (from kit) ── */
      .check-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 0;
        background: none;
        border: none;
        cursor: pointer;
        outline: none;
        font-family: inherit;
      }
      .check-box {
        width: 18px;
        height: 18px;
        border-radius: 4px;
        border: 2px solid var(--b3);
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--t-fast);
        flex-shrink: 0;
        --mdc-icon-size: 12px;
      }
      .check-box ha-icon {
        opacity: 0;
        transform: scale(0);
        transition: all var(--t-fast);
        color: #fff;
      }
      .check-item.checked .check-box {
        background: var(--c-accent);
        border-color: var(--c-accent);
        box-shadow: 0 0 6px rgba(129,140,248,0.3);
      }
      .check-item.checked .check-box ha-icon {
        opacity: 1;
        transform: scale(1);
      }
      .check-label {
        font-size: 12px;
        font-weight: 500;
        color: var(--t2);
      }
      .check-item.checked .check-label {
        color: var(--t1);
      }

      /* ── Schedule delete (btn-icon.xs btn-alert from kit) ── */
      .schedule-delete {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: var(--radius-sm);
        border: 1px solid rgba(248,113,113,0.2);
        background: rgba(248,113,113,0.1);
        color: var(--c-alert);
        cursor: pointer;
        padding: 0;
        --mdc-icon-size: 14px;
        transition: all var(--t-fast);
        outline: none;
      }
      @media (hover: hover) and (pointer: fine) {
        .schedule-delete:hover {
          background: rgba(248,113,113,0.2);
          border-color: rgba(248,113,113,0.3);
        }
      }
      .schedule-delete:active { transform: scale(0.96); }

      /* ── Schedule add & save (btn btn-sm from kit) ── */
      .schedule-add {
        width: 100%;
        margin-top: 8px;
        border-style: dashed;
        --mdc-icon-size: 14px;
      }
      .schedule-save {
        margin-top: 8px;
        width: 100%;
      }

      /* ── Hint & explanation texts ── */
      .schedule-hint,
      .dashboard-vs-room {
        display: flex;
        align-items: flex-start;
        gap: 6px;
        margin-top: 12px;
        padding: 8px 10px;
        background: var(--s1);
        border-radius: var(--radius-sm);
        border: 1px solid var(--b1);
        font-size: 11px;
        line-height: 1.4;
        color: var(--t3);
        --mdc-icon-size: 14px;
      }
      .schedule-hint ha-icon,
      .dashboard-vs-room ha-icon {
        flex-shrink: 0;
        margin-top: 1px;
        color: var(--c-info);
        display: flex; align-items: center; justify-content: center;
      }

      /* ── DateTime display trigger ── */
      .datetime-display {
        flex: 1;
        min-width: 0;
        padding: 6px 10px;
        border-radius: 10px;
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t2);
        font-family: inherit;
        font-size: 11px;
        font-weight: 500;
        cursor: pointer;
        transition: border-color var(--t-fast);
        text-align: left;
        outline: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      @media (hover: hover) and (pointer: fine) {
        .datetime-display:hover { border-color: var(--b3); }
      }
      .datetime-display:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .datetime-display.empty { color: var(--t4); }

      /* ── DateTime picker popup ── */
      .picker-overlay {
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.5);
        backdrop-filter: blur(4px);
        animation: picker-fade-in var(--t-fast) ease-out;
      }
      @keyframes picker-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .picker-popup {
        width: 280px;
        padding: 16px;
        border-radius: var(--radius-lg);
        border: 1px solid var(--b2);
        background: var(--s3);
        box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      }
      .picker-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 4px 10px;
      }
      .picker-month {
        font-size: 13px;
        font-weight: 700;
        color: var(--t1);
      }
      .picker-nav {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: var(--radius-sm);
        border: none;
        background: transparent;
        color: var(--t3);
        cursor: pointer;
        padding: 0;
        outline: none;
        transition: all var(--t-fast);
        --mdc-icon-size: 16px;
      }
      @media (hover: hover) and (pointer: fine) {
        .picker-nav:hover { background: var(--s2); color: var(--t1); }
      }
      .picker-nav:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .picker-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 2px;
      }
      .picker-day-label {
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--t4);
        text-align: center;
        padding: 4px 0;
      }
      .picker-day {
        aspect-ratio: 1;
        border-radius: var(--radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 500;
        color: var(--t3);
        background: transparent;
        border: none;
        cursor: pointer;
        transition: all var(--t-fast);
        outline: none;
        font-family: inherit;
        padding: 0;
      }
      @media (hover: hover) and (pointer: fine) {
        .picker-day:hover { background: var(--s2); color: var(--t1); }
      }
      .picker-day.today { border: 1px solid var(--b3); color: var(--t1); }
      .picker-day.selected {
        background: rgba(129,140,248,0.2);
        color: var(--c-accent);
        font-weight: 700;
        border: 1px solid rgba(129,140,248,0.3);
      }
      .picker-day.range-start {
        background: var(--c-accent);
        color: #fff;
        font-weight: 700;
        border-radius: var(--radius-sm) 0 0 var(--radius-sm);
      }
      .picker-day.range-end {
        background: var(--c-accent);
        color: #fff;
        font-weight: 700;
        border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      }
      .picker-day.range-start.range-end {
        border-radius: var(--radius-sm);
      }
      .picker-day.in-range {
        background: rgba(129,140,248,0.12);
        color: var(--c-accent);
        border-radius: 0;
      }
      .picker-day.other-month { opacity: 0.3; }

      /* ── Picker phase indicator ── */
      .picker-phase {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-bottom: 10px;
      }
      .picker-phase-btn {
        padding: 4px 12px;
        border-radius: 8px;
        border: 1px solid var(--b1);
        background: transparent;
        color: var(--t3);
        font-family: inherit;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        transition: all var(--t-fast);
        outline: none;
      }
      .picker-phase-btn.active {
        background: rgba(129,140,248,0.15);
        color: var(--c-accent);
        border-color: rgba(129,140,248,0.3);
      }

      /* ── Time picker ── */
      .picker-time-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        margin-top: 14px;
        padding-top: 12px;
        border-top: 1px solid var(--b1);
      }
      .picker-time-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }
      .picker-time-label {
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--t4);
      }
      .time-input {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .time-digit {
        width: 44px;
        height: 40px;
        text-align: center;
        border-radius: 10px;
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t1);
        font-family: inherit;
        font-size: 16px;
        font-weight: 700;
        outline: none;
        transition: border-color var(--t-fast);
      }
      .time-digit:focus { border-color: var(--c-accent); }
      .time-sep {
        font-size: 18px;
        font-weight: 700;
        color: var(--t3);
      }

      /* ── Picker confirm button ── */
      .picker-confirm {
        margin-top: 14px;
        width: 100%;
      }

      /* ── Save bar ── */
      .save-bar {
        margin-top: 16px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
      }
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        border: 1px solid var(--b2);
        background: var(--s2);
        color: var(--t2);
        font-family: inherit;
        font-weight: 600;
        cursor: pointer;
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          color var(--t-fast);
        outline: none;
        -webkit-tap-highlight-color: transparent;
        height: 36px;
        padding: 0 14px;
        border-radius: 12px;
        font-size: 12px;
      }
      @media (hover: hover) and (pointer: fine) {
        .btn:hover {
          background: var(--s4);
          border-color: var(--b3);
          color: var(--t1);
        }
      }
      .btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .btn-accent {
        border-color: rgba(129, 140, 248, 0.25);
        background: rgba(129, 140, 248, 0.12);
        color: var(--c-accent);
      }
      @media (hover: hover) and (pointer: fine) {
        .btn-accent:hover {
          background: rgba(129, 140, 248, 0.2);
          border-color: rgba(129, 140, 248, 0.35);
        }
      }
      .btn-accent:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
      .btn-ghost {
        border-color: transparent;
        background: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .btn-ghost:hover {
          background: var(--s2);
        }
      }

      /* ── Toast ── */
      .toast {
        position: fixed;
        bottom: 32px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        padding: 10px 18px;
        border-radius: var(--radius-lg);
        backdrop-filter: blur(20px);
        font-family: inherit;
        font-size: 12px;
        font-weight: 500;
        opacity: 0;
        z-index: 200;
        pointer-events: none;
        transition:
          opacity var(--t-fast),
          transform var(--t-fast);
        background: rgba(74, 222, 128, 0.15);
        border: 1px solid rgba(74, 222, 128, 0.2);
        color: var(--c-success);
      }
      .toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      .toast.error {
        background: rgba(248, 113, 113, 0.15);
        border: 1px solid rgba(248, 113, 113, 0.2);
        color: var(--c-alert);
      }

      /* ── Entry animation ── */
      .config-panel {
        animation: panel-in 0.4s var(--ease-out) both;
      }
    `,
  ];

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!changedProps.has('hass')) return true;
    if (changedProps.size > 1) return true;
    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    // Detect language change (pure check, no side effects)
    if (oldHass && oldHass.language !== this.hass?.language) return true;
    return !this._loaded;
  }

  connectedCallback() {
    super.connectedCallback();
    this._mounted = true;
    document.addEventListener('click', this._boundCloseDropdowns);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._mounted = false;
    document.removeEventListener('click', this._boundCloseDropdowns);
    this._removeTabsScrollListener();
    if (this._toastTimeout !== undefined) {
      clearTimeout(this._toastTimeout);
      this._toastTimeout = undefined;
    }
    this._cancelColorDrag?.();
    this._cancelColorDrag = undefined;
    this._backend = undefined;
  }

  private _closeDropdownsOnOutsideClick(e: MouseEvent) {
    if (!this._dropdownOpen && !this._lightDropdownOpen && !this._weatherDropdownOpen && !this._titleModeDropdownOpen && !this._coverRoomDropdownOpen) return;
    const path = e.composedPath();
    const root = this.shadowRoot;
    if (!root) return;
    const dropdowns = root.querySelectorAll('.dropdown');
    for (const dd of dropdowns) {
      if (path.includes(dd)) return;
    }
    this._dropdownOpen = false;
    this._lightDropdownOpen = false;
    this._weatherDropdownOpen = false;
    this._titleModeDropdownOpen = false;
    this._coverRoomDropdownOpen = false;
  }

  private _tabsEl: HTMLElement | null = null;

  private _setupTabsScrollListener() {
    if (this._tabsEl) return;
    const el = this.shadowRoot?.querySelector<HTMLElement>('.tabs');
    if (!el) return;
    this._tabsEl = el;
    el.addEventListener('scroll', this._boundUpdateScrollMask, { passive: true });
    this._updateScrollMask();
  }

  private _removeTabsScrollListener() {
    if (this._tabsEl) {
      this._tabsEl.removeEventListener('scroll', this._boundUpdateScrollMask);
      this._tabsEl = null;
    }
  }

  private _updateScrollMask() {
    const el = this._tabsEl;
    if (!el) return;
    const atStart = el.scrollLeft <= 5;
    const atEnd = el.scrollLeft + el.offsetWidth >= el.scrollWidth - 5;
    el.classList.remove('mask-left', 'mask-right', 'mask-both');
    if (atStart && !atEnd) el.classList.add('mask-right');
    else if (!atStart && atEnd) el.classList.add('mask-left');
    else if (!atStart && !atEnd) el.classList.add('mask-both');
  }

  updated(changedProps: PropertyValues) {
    super.updated(changedProps);
    this._setupTabsScrollListener();
    if (changedProps.has('hass')) {
      if (this.hass?.language && setLanguage(this.hass.language)) {
        this._lang = getLanguage();
      }
      // Invalidate backend on WS reconnect
      if (this.hass && this._backend && this._backend.connection !== this.hass.connection) {
        this._backend = undefined;
        this._loaded = false;
        this._loading = false;
      }
      if (this.hass && !this._loaded && !this._loading) {
        this._backend = new BackendService(this.hass);
        this._loadConfig();
      }
    }
  }

  private async _loadConfig() {
    if (!this.hass || this._loading) return;
    this._loading = true;
    try {
      await this._loadConfigInner();
      this._loaded = true;
    } catch {
      this._loaded = false;
    } finally {
      this._loading = false;
    }
  }

  private async _loadConfigInner() {
    if (!this.hass) return;

    // Build rooms from HA areas
    const areas = Object.values(this.hass.areas).sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    // Load backend config
    let navbarConfig = {
      room_order: [] as string[],
      hidden_rooms: [] as string[],
      show_lights: true,
      show_temperature: true,
      show_humidity: true,
      show_media: true,
      auto_sort: true,
      temp_high: DEFAULT_TEMP_HIGH,
      temp_low: DEFAULT_TEMP_LOW,
      humidity_threshold: DEFAULT_HUMIDITY_THRESHOLD,
    };
    let weatherConfig = {
      entity_id: '',
      hidden_metrics: [] as string[],
      show_daily: true,
      show_hourly: true,
      show_header: true,
    };
    let dashboardConfig = {
      enabled_cards: ['weather'] as string[],
    };
    let lightCardConfig = {
      show_header: true,
    };
    let titleCardConfig = {
      title: '',
      mode_entity: '',
      modes: [] as { id: string; label: string; icon: string; color: string }[],
    };
    let coverCardConfig = {
      show_header: true,
      dashboard_entities: [] as string[],
      presets: [0, 25, 50, 75, 100] as number[],
    };
    let spotifyCardConfig = {
      show_header: true,
      entity_id: '',
      sort_order: 'recent_first' as 'recent_first' | 'oldest_first',
      max_items_per_section: 6,
    };
    const roomConfigs: Record<string, { icon?: string | null }> = {};
    try {
      if (!this._backend) throw new Error('No backend');
      const result = await this._backend.send<{
        navbar: typeof navbarConfig;
        rooms: Record<string, { icon?: string | null }>;
        weather: typeof weatherConfig;
        light_card: typeof lightCardConfig;
        title_card: typeof titleCardConfig;
        cover_card: typeof coverCardConfig;
        spotify_card: typeof spotifyCardConfig;
        dashboard: typeof dashboardConfig;
      }>('get_config');
      navbarConfig = result.navbar;
      Object.assign(roomConfigs, result.rooms);
      if (result.weather) weatherConfig = result.weather;
      if (result.light_card) lightCardConfig = result.light_card;
      if (result.title_card) titleCardConfig = result.title_card;
      if (result.cover_card) coverCardConfig = result.cover_card;
      if (result.spotify_card) spotifyCardConfig = result.spotify_card;
      if (result.dashboard) dashboardConfig = result.dashboard;
    } catch {
      // Backend not available
    }

    this._showLights = navbarConfig.show_lights ?? true;
    this._showTemperature = navbarConfig.show_temperature ?? true;
    this._showHumidity = navbarConfig.show_humidity ?? true;
    this._showMedia = navbarConfig.show_media ?? true;
    this._autoSort = navbarConfig.auto_sort ?? true;
    this._tempHigh = navbarConfig.temp_high ?? DEFAULT_TEMP_HIGH;
    this._tempLow = navbarConfig.temp_low ?? DEFAULT_TEMP_LOW;
    this._humidityThreshold = navbarConfig.humidity_threshold ?? DEFAULT_HUMIDITY_THRESHOLD;

    this._weatherEntity = weatherConfig.entity_id ?? '';
    this._weatherHiddenMetrics = weatherConfig.hidden_metrics ?? [];
    this._weatherShowDaily = weatherConfig.show_daily ?? true;
    this._weatherShowHourly = weatherConfig.show_hourly ?? true;
    this._weatherShowHeader = weatherConfig.show_header ?? true;

    this._lightShowHeader = lightCardConfig.show_header ?? true;

    this._titleText = titleCardConfig.title ?? '';
    this._titleModeEntity = titleCardConfig.mode_entity ?? '';
    this._titleModes = titleCardConfig.modes ?? [];

    this._coverShowHeader = coverCardConfig.show_header ?? true;
    this._coverDashboardEntities = coverCardConfig.dashboard_entities ?? [];
    this._coverPresets = coverCardConfig.presets ?? [0, 25, 50, 75, 100];
    this._initCoverDashboardOrder();

    this._spotifyShowHeader = spotifyCardConfig.show_header ?? true;
    this._spotifyEntity = spotifyCardConfig.entity_id ?? '';
    this._spotifySortOrder = spotifyCardConfig.sort_order === 'oldest_first' ? 'oldest_first' : 'recent_first';
    this._spotifyMaxItems = spotifyCardConfig.max_items_per_section ?? 6;
    this._checkSpotifyStatus();

    this._dashboardEnabledCards = dashboardConfig.enabled_cards ?? ['weather'];

    const hiddenSet = new Set(navbarConfig.hidden_rooms);
    const orderMap = new Map<string, number>();
    navbarConfig.room_order.forEach((id, i) => orderMap.set(id, i));

    const hass = this.hass;
    if (!hass) return;
    const rooms: RoomEntry[] = [];
    const emptyRooms: { areaId: string; name: string; icon: string }[] = [];

    for (const area of areas) {
      const entities = getAreaEntities(area.area_id, hass.entities, hass.devices);
      const backendIcon = roomConfigs[area.area_id]?.icon;
      const icon = backendIcon || area.icon || 'mdi:home';

      // Separate empty rooms (no entities) — they won't appear in the navbar
      if (entities.length === 0) {
        emptyRooms.push({ areaId: area.area_id, name: area.name, icon });
        continue;
      }

      // Aggregate live state — same logic as navbar card
      let lightsOn = 0;
      let temperature: string | null = null;
      let tempValue: number | null = null;
      let humidity: string | null = null;
      let humidityValue: number | null = null;
      let mediaPlaying = false;

      for (const entry of entities) {
        const entity = hass.states[entry.entity_id];
        if (!entity) continue;
        const domain = entry.entity_id.split('.')[0];

        if (domain === 'light' && entity.state === 'on') lightsOn++;
        if (domain === 'sensor') {
          const dc = entity.attributes.device_class;
          if (dc === 'temperature' && !temperature) {
            temperature = `${entity.state}°`;
            tempValue = parseFloat(entity.state);
          }
          if (dc === 'humidity' && !humidity) {
            humidity = `${entity.state}%`;
            humidityValue = parseFloat(entity.state);
          }
        }
        if (domain === 'media_player' && entity.state === 'playing') mediaPlaying = true;
      }

      rooms.push({
        areaId: area.area_id,
        name: area.name,
        icon,
        entityCount: entities.length,
        visible: !hiddenSet.has(area.area_id),
        lightsOn,
        temperature,
        tempValue,
        humidity,
        humidityValue,
        mediaPlaying,
      });
    }

    // Track initial icons for dirty-checking on save
    this._initialIcons.clear();
    for (const room of rooms) {
      this._initialIcons.set(room.areaId, room.icon);
    }

    // Sort by backend order, then alphabetically; visible rooms first
    rooms.sort((a, b) => {
      if (a.visible !== b.visible) return a.visible ? -1 : 1;
      const aOrder = orderMap.get(a.areaId);
      const bOrder = orderMap.get(b.areaId);
      if (aOrder !== undefined && bOrder !== undefined) return aOrder - bOrder;
      if (aOrder !== undefined) return -1;
      if (bOrder !== undefined) return 1;
      return a.name.localeCompare(b.name);
    });

    this._rooms = rooms;
    this._emptyRooms = emptyRooms;
    if (!this._selectedRoom && rooms.length > 0) {
      this._selectedRoom = rooms[0].areaId;
    }
    this._loadRoomCards();
  }

  private async _loadRoomCards() {
    if (!this.hass || !this._selectedRoom) {
      this._cards = [];
      this._scenes = [];
      return;
    }

    const entities = getAreaEntities(
      this._selectedRoom,
      this.hass.entities,
      this.hass.devices,
    );

    // Load room config from backend
    let storedOrder: string[] | null = null;
    let hiddenEntities = new Set<string>();
    let hiddenScenes = new Set<string>();
    let sceneOrder: string[] = [];
    try {
      if (!this._backend) throw new Error('No backend');
      const result = await this._backend.send<{
        card_order: string[];
        hidden_entities: string[];
        hidden_scenes: string[];
        scene_order: string[];
        visible?: boolean;
      } | null>('get_room', { area_id: this._selectedRoom });
      if (result) {
        storedOrder = result.card_order.length > 0 ? result.card_order : null;
        hiddenEntities = new Set(result.hidden_entities);
        hiddenScenes = new Set(result.hidden_scenes ?? []);
        sceneOrder = result.scene_order ?? [];
      }
    } catch {
      // Backend not available
    }

    // Build scenes list
    const hass = this.hass;
    const sceneEntities = entities.filter((e) => e.entity_id.startsWith('scene.'));
    const sceneOrderMap = new Map<string, number>();
    sceneOrder.forEach((id, i) => sceneOrderMap.set(id, i));

    const scenes: SceneEntry[] = sceneEntities.map((e) => {
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

    // Count visible entities per domain (subtract hidden_entities)
    const domainCounts = new Map<string, number>();
    for (const e of entities) {
      if (hiddenEntities.has(e.entity_id)) continue;
      const d = e.entity_id.split('.')[0];
      domainCounts.set(d, (domainCounts.get(d) || 0) + 1);
    }

    // Build ordered list: stored order first, then any extra domains with entities
    const orderedIds = storedOrder ? [...storedOrder] : [...DEFAULT_CARD_ORDER];
    const orderedSet = new Set(orderedIds);

    // Add domains that have entities but aren't in the stored order
    for (const domain of domainCounts.keys()) {
      if (!orderedSet.has(domain) && CARD_ICONS[domain]) {
        orderedIds.push(domain);
      }
    }

    this._cards = orderedIds
      .filter((id) => {
        // Only show domains that have entities AND an implemented card
        return (domainCounts.get(id) || 0) > 0 && IMPLEMENTED_CARDS.has(id);
      })
      .map((id) => {
        const meta = getCardMeta(id);
        const count = domainCounts.get(id) || 0;
        return {
          id,
          nameKey: meta.nameKey,
          icon: meta.icon,
          descKey: meta.descKey,
          count,
          visible: storedOrder ? storedOrder.includes(id) : count > 0,
        };
      });
  }

  // — Tab switching —

  private _switchTab(tab: 'navbar' | 'popup' | 'light' | 'weather' | 'title' | 'cover' | 'spotify' | 'dashboard') {
    this._tab = tab;
    this._iconPickerRoom = null;
    this._dropdownOpen = false;
    this._lightDropdownOpen = false;
    this._weatherDropdownOpen = false;
    this._titleModeDropdownOpen = false;
    this._coverRoomDropdownOpen = false;
    this._spotifyDropdownOpen = false;
    this._iconPopupModeIdx = null;
    this._colorPickerModeIdx = null;
    if (tab === 'light' && !this._lightRoom && this._rooms.length > 0) {
      this._lightRoom = this._rooms[0].areaId;
      this._loadRoomLights();
    }
    if (tab === 'cover' && !this._coverRoom && this._rooms.length > 0) {
      this._coverRoom = this._rooms[0].areaId;
      this._loadRoomCovers();
    }
    if ((tab === 'cover' || tab === 'dashboard') && this._coverDashboardOrder.length === 0) {
      this._initCoverDashboardOrder();
    }
  }

  // — Drag & Drop —

  private _onDragStart(idx: number, context: 'rooms' | 'cards' | 'scenes' | 'lights' | 'covers' | 'dashboard_covers') {
    this._dragIdx = idx;
    this._dragContext = context;
  }

  private _onDragOver(idx: number, e: DragEvent) {
    e.preventDefault();
    if (this._dragIdx === null || this._dragIdx === idx) return;
    this._dropIdx = idx;
  }

  private _onDragLeave() {
    this._dropIdx = null;
  }

  private _onDropGeneric(idx: number, e: DragEvent) {
    e.preventDefault();
    if (this._dragIdx === null || this._dragIdx === idx) {
      this._dragIdx = null;
      this._dropIdx = null;
      return;
    }
    const ctx = this._dragContext;
    if (ctx === 'rooms') {
      const arr = [...this._rooms];
      const [moved] = arr.splice(this._dragIdx, 1);
      arr.splice(idx, 0, moved);
      this._rooms = arr;
    } else if (ctx === 'cards') {
      const arr = [...this._cards];
      const [moved] = arr.splice(this._dragIdx, 1);
      arr.splice(idx, 0, moved);
      this._cards = arr;
    } else if (ctx === 'scenes') {
      const arr = [...this._scenes];
      const [moved] = arr.splice(this._dragIdx, 1);
      arr.splice(idx, 0, moved);
      this._scenes = arr;
    } else if (ctx === 'lights') {
      const arr = [...this._lights];
      const [moved] = arr.splice(this._dragIdx, 1);
      arr.splice(idx, 0, moved);
      this._lights = arr;
    }
    this._dragIdx = null;
    this._dropIdx = null;
  }

  private _onDragEnd() {
    this._dragIdx = null;
    this._dropIdx = null;
  }

  // — Room actions —

  private _toggleRoomVisible(areaId: string) {
    const toggled = this._rooms.map((r) =>
      r.areaId === areaId ? { ...r, visible: !r.visible } : r,
    );
    const visible = toggled.filter((r) => r.visible);
    const hidden = toggled.filter((r) => !r.visible);
    this._rooms = [...visible, ...hidden];
  }

  private _openIconPicker(areaId: string) {
    this._iconPickerRoom = this._iconPickerRoom === areaId ? null : areaId;
  }

  private _setRoomIcon(areaId: string, icon: string) {
    this._rooms = this._rooms.map((r) =>
      r.areaId === areaId ? { ...r, icon } : r,
    );
    this._iconPickerRoom = null;
  }

  // — Card actions —

  private _toggleCardVisible(id: string) {
    this._cards = this._cards.map((c) =>
      c.id === id ? { ...c, visible: !c.visible } : c,
    );
  }

  private _toggleSceneVisible(entityId: string) {
    this._scenes = this._scenes.map((s) =>
      s.entityId === entityId ? { ...s, visible: !s.visible } : s,
    );
  }

  // — Room dropdown —

  private _selectRoom(areaId: string) {
    this._selectedRoom = areaId;
    this._dropdownOpen = false;
    this._loadRoomCards();
  }

  // — Save —

  private async _saveNavbar() {
    const backend = this._backend;
    if (!backend || this._saving) return;
    this._saving = true;
    try {
      await backend.send('set_navbar', {
        room_order: this._rooms.filter((r) => r.visible).map((r) => r.areaId),
        hidden_rooms: this._rooms.filter((r) => !r.visible).map((r) => r.areaId),
        show_lights: this._showLights,
        show_temperature: this._showTemperature,
        show_humidity: this._showHumidity,
        show_media: this._showMedia,
        auto_sort: this._autoSort,
        temp_high: this._tempHigh,
        temp_low: this._tempLow,
        humidity_threshold: this._humidityThreshold,
      });
      // Save only changed room icons in parallel
      const iconSaves = this._rooms
        .filter((room) => room.icon !== this._initialIcons.get(room.areaId))
        .map((room) => {
          const area = this.hass?.areas[room.areaId];
          const haIcon = area?.icon || 'mdi:home';
          const iconToSave = room.icon === haIcon ? null : room.icon;
          return backend.send('set_room', {
            area_id: room.areaId,
            icon: iconToSave,
          });
        });
      if (iconSaves.length > 0) await Promise.all(iconSaves);
      if (!this._mounted) return;
      this._showToast();
      bus.emit('navbar-config-changed', undefined);
    } catch {
      this._showToast(true);
    } finally {
      this._saving = false;
    }
  }

  private async _savePopup() {
    if (!this._backend || this._saving || !this._selectedRoom) return;
    this._saving = true;
    try {
      await this._backend.send('set_room', {
        area_id: this._selectedRoom,
        card_order: this._cards.filter((c) => c.visible).map((c) => c.id),
        hidden_scenes: this._scenes.filter((s) => !s.visible).map((s) => s.entityId),
        scene_order: this._scenes.map((s) => s.entityId),
      });
      if (!this._mounted) return;
      this._showToast();
      bus.emit('room-config-changed', { areaId: this._selectedRoom });
    } catch {
      this._showToast(true);
    } finally {
      this._saving = false;
    }
  }

  private _save() {
    if (this._tab === 'navbar') {
      this._saveNavbar();
    } else if (this._tab === 'popup') {
      this._savePopup();
    } else if (this._tab === 'light') {
      this._saveLights();
    } else if (this._tab === 'weather') {
      this._saveWeather();
    } else if (this._tab === 'title') {
      this._saveTitle();
    } else if (this._tab === 'cover') {
      this._saveCover();
    } else if (this._tab === 'spotify') {
      this._saveSpotify();
    } else {
      this._saveDashboard();
    }
  }

  // — Light Card config —

  private _selectLightRoom(areaId: string) {
    this._lightRoom = areaId;
    this._lightDropdownOpen = false;
    this._loadRoomLights();
  }

  private async _loadRoomLights() {
    if (!this.hass || !this._lightRoom) {
      this._lights = [];
      return;
    }

    const entities = getAreaEntities(this._lightRoom, this.hass.entities, this.hass.devices);
    const lightEntities = entities.filter((e) => e.entity_id.startsWith('light.'));

    // Load room config from backend
    let hiddenEntities = new Set<string>();
    let entityOrder: string[] = [];
    let entityLayouts: Record<string, string> = {};
    try {
      if (!this._backend) throw new Error('No backend');
      const result = await this._backend.send<{
        hidden_entities: string[];
        entity_order: string[];
        entity_layouts: Record<string, string>;
      } | null>('get_room', { area_id: this._lightRoom });
      if (result) {
        hiddenEntities = new Set(result.hidden_entities ?? []);
        entityOrder = result.entity_order ?? [];
        entityLayouts = result.entity_layouts ?? {};
      }
    } catch {
      // Backend not available
    }

    // Build ordered list
    const hass = this.hass;
    const orderMap = new Map<string, number>();
    entityOrder.forEach((id, i) => orderMap.set(id, i));

    const lights: LightEntry[] = lightEntities.map((e) => {
      const state = hass.states[e.entity_id];
      const isOn = state?.state === 'on';
      const brightness = state?.attributes.brightness as number | undefined;
      const brightnessPct = isOn && brightness !== undefined ? Math.round((brightness / 255) * 100) : 0;
      return {
        entityId: e.entity_id,
        name: state?.attributes.friendly_name as string || e.entity_id.split('.')[1],
        isOn,
        brightnessPct,
        layout: (entityLayouts[e.entity_id] as 'full' | 'compact') || 'compact',
        visible: !hiddenEntities.has(e.entity_id),
      };
    });

    // Sort: visible first, then by backend order, then by name
    lights.sort((a, b) => {
      if (a.visible !== b.visible) return a.visible ? -1 : 1;
      const aIdx = orderMap.get(a.entityId);
      const bIdx = orderMap.get(b.entityId);
      if (aIdx !== undefined && bIdx !== undefined) return aIdx - bIdx;
      if (aIdx !== undefined) return -1;
      if (bIdx !== undefined) return 1;
      return a.name.localeCompare(b.name);
    });

    this._lights = lights;

    // Load schedules
    try {
      if (this._backend) {
        const schedules = await this._backend.send<EntityScheduleMap>('get_schedules');
        this._schedulesLoaded = schedules ?? {};
        this._scheduleEdits = new Map();
        for (const l of lights) {
          const sched = this._schedulesLoaded[l.entityId];
          this._scheduleEdits.set(
            l.entityId,
            sched?.periods?.map((p) => ({ start: p.start, end: p.end, recurring: p.recurring ?? false })) ?? [],
          );
        }
      }
    } catch {
      // Backend not available
    }
  }

  private _toggleLightVisible(entityId: string) {
    const toggled = this._lights.map((l) =>
      l.entityId === entityId ? { ...l, visible: !l.visible } : l,
    );
    const visible = toggled.filter((l) => l.visible);
    const hidden = toggled.filter((l) => !l.visible);
    this._lights = [...visible, ...hidden];
  }

  private _cycleLightLayout(entityId: string) {
    this._lights = this._lights.map((l) =>
      l.entityId === entityId ? { ...l, layout: l.layout === 'full' ? 'compact' : 'full' } : l,
    );
  }

  private _toggleScheduleExpand(entityId: string) {
    this._scheduleExpandedEntity = this._scheduleExpandedEntity === entityId ? null : entityId;
    // Initialize edit entries if not present
    if (!this._scheduleEdits.has(entityId)) {
      const sched = this._schedulesLoaded[entityId];
      this._scheduleEdits.set(
        entityId,
        sched?.periods?.map((p) => ({ start: p.start, end: p.end, recurring: p.recurring ?? false })) ?? [],
      );
    }
    this.requestUpdate();
  }

  private _addSchedulePeriod(entityId: string) {
    const periods = this._scheduleEdits.get(entityId) ?? [];
    periods.push({ start: '', end: '', recurring: false });
    this._scheduleEdits.set(entityId, [...periods]);
    this.requestUpdate();
  }

  private _removeSchedulePeriod(entityId: string, idx: number) {
    const periods = this._scheduleEdits.get(entityId) ?? [];
    periods.splice(idx, 1);
    this._scheduleEdits.set(entityId, [...periods]);
    this.requestUpdate();
    this._saveSchedule(entityId);
  }

  private _updateSchedulePeriod(entityId: string, idx: number, field: 'start' | 'end', value: string) {
    const periods = this._scheduleEdits.get(entityId) ?? [];
    if (periods[idx]) {
      periods[idx] = { ...periods[idx], [field]: value };
      this._scheduleEdits.set(entityId, [...periods]);
      this.requestUpdate();
    }
  }

  private _toggleScheduleRecurring(entityId: string, idx: number) {
    const periods = this._scheduleEdits.get(entityId) ?? [];
    if (periods[idx]) {
      periods[idx] = { ...periods[idx], recurring: !periods[idx].recurring };
      this._scheduleEdits.set(entityId, [...periods]);
      this.requestUpdate();
    }
  }

  private async _saveSchedule(entityId: string) {
    if (!this._backend) return;
    const periods = this._scheduleEdits.get(entityId) ?? [];
    const validPeriods = periods.filter((p) => p.start && p.end);
    try {
      await this._backend.send('set_schedule', {
        entity_id: entityId,
        periods: validPeriods,
      });
      if (!this._mounted) return;
      this._showToast();
      bus.emit('schedule-changed', { entityId });
    } catch {
      if (!this._mounted) return;
      this._showToast(true);
    }
  }

  // — DateTime range picker —

  private _parseDateTimeValue(value: string): { year: number; month: number; day: number; hour: string; minute: string } | null {
    if (!value) return null;
    const [datePart, timePart] = value.split('T');
    if (!datePart) return null;
    const parts = datePart.split('-').map(Number);
    if (parts.length < 3 || parts.some(isNaN)) return null;
    const [y, m, d] = parts;
    const [hh, mm] = (timePart ?? '00:00').split(':');
    return { year: y, month: m - 1, day: d, hour: hh ?? '00', minute: mm ?? '00' };
  }

  private _openRangePicker(entityId: string, periodIdx: number) {
    this._pickerTarget = { entityId, periodIdx };
    const periods = this._scheduleEdits.get(entityId) ?? [];
    const p = periods[periodIdx];
    const startParsed = p ? this._parseDateTimeValue(p.start) : null;
    const endParsed = p ? this._parseDateTimeValue(p.end) : null;
    const now = new Date();

    if (startParsed) {
      this._pickerStartDay = startParsed.day;
      this._pickerStartMonth = startParsed.month;
      this._pickerStartYear = startParsed.year;
      this._pickerStartHour = startParsed.hour;
      this._pickerStartMinute = startParsed.minute;
      this._pickerYear = startParsed.year;
      this._pickerMonth = startParsed.month;
    } else {
      this._pickerStartDay = null;
      this._pickerStartMonth = now.getMonth();
      this._pickerStartYear = now.getFullYear();
      this._pickerStartHour = '00';
      this._pickerStartMinute = '00';
      this._pickerYear = now.getFullYear();
      this._pickerMonth = now.getMonth();
    }

    if (endParsed) {
      this._pickerEndDay = endParsed.day;
      this._pickerEndMonth = endParsed.month;
      this._pickerEndYear = endParsed.year;
      this._pickerEndHour = endParsed.hour;
      this._pickerEndMinute = endParsed.minute;
    } else {
      this._pickerEndDay = null;
      this._pickerEndMonth = now.getMonth();
      this._pickerEndYear = now.getFullYear();
      this._pickerEndHour = '23';
      this._pickerEndMinute = '59';
    }

    this._pickerPhase = startParsed ? (endParsed ? 'start' : 'end') : 'start';
    this._pickerOpen = true;
  }

  private _closePicker() {
    this._pickerOpen = false;
    this._pickerTarget = null;
  }

  private _pickerPrevMonth() {
    if (this._pickerMonth === 0) { this._pickerMonth = 11; this._pickerYear--; }
    else this._pickerMonth--;
  }

  private _pickerNextMonth() {
    if (this._pickerMonth === 11) { this._pickerMonth = 0; this._pickerYear++; }
    else this._pickerMonth++;
  }

  private _pickerSelectDay(day: number, isOtherMonth: boolean) {
    if (isOtherMonth) return;
    if (this._pickerPhase === 'start') {
      this._pickerStartDay = day;
      this._pickerStartMonth = this._pickerMonth;
      this._pickerStartYear = this._pickerYear;
      // Auto-advance to end selection
      this._pickerPhase = 'end';
      // If end is before new start, clear end
      if (this._pickerEndDay !== null) {
        const startTs = new Date(this._pickerStartYear, this._pickerStartMonth, day).getTime();
        const endTs = new Date(this._pickerEndYear, this._pickerEndMonth, this._pickerEndDay).getTime();
        if (endTs < startTs) {
          this._pickerEndDay = null;
        }
      }
    } else {
      // Ensure end >= start
      if (this._pickerStartDay !== null) {
        const startTs = new Date(this._pickerStartYear, this._pickerStartMonth, this._pickerStartDay).getTime();
        const endTs = new Date(this._pickerYear, this._pickerMonth, day).getTime();
        if (endTs < startTs) {
          this._pickerStartDay = day;
          this._pickerStartMonth = this._pickerMonth;
          this._pickerStartYear = this._pickerYear;
          this._pickerEndDay = null;
          this._pickerPhase = 'start';
          return;
        }
      }
      this._pickerEndDay = day;
      this._pickerEndMonth = this._pickerMonth;
      this._pickerEndYear = this._pickerYear;
    }
  }

  private _pickerSetTime(which: 'startHour' | 'startMinute' | 'endHour' | 'endMinute', e: Event) {
    const val = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 2);
    const isHour = which.includes('Hour');
    const num = Math.min(isHour ? 23 : 59, Math.max(0, parseInt(val, 10) || 0));
    const padded = String(num).padStart(2, '0');
    (e.target as HTMLInputElement).value = padded;
    if (which === 'startHour') this._pickerStartHour = padded;
    else if (which === 'startMinute') this._pickerStartMinute = padded;
    else if (which === 'endHour') this._pickerEndHour = padded;
    else this._pickerEndMinute = padded;
    this.requestUpdate();
  }

  private _pickerConfirm() {
    if (!this._pickerTarget || this._pickerStartDay === null || this._pickerEndDay === null) return;
    const { entityId, periodIdx } = this._pickerTarget;
    const sm = String(this._pickerStartMonth + 1).padStart(2, '0');
    const sd = String(this._pickerStartDay).padStart(2, '0');
    const em = String(this._pickerEndMonth + 1).padStart(2, '0');
    const ed = String(this._pickerEndDay).padStart(2, '0');
    const startVal = `${this._pickerStartYear}-${sm}-${sd}T${this._pickerStartHour}:${this._pickerStartMinute}`;
    const endVal = `${this._pickerEndYear}-${em}-${ed}T${this._pickerEndHour}:${this._pickerEndMinute}`;
    this._updateSchedulePeriod(entityId, periodIdx, 'start', startVal);
    this._updateSchedulePeriod(entityId, periodIdx, 'end', endVal);
    this._closePicker();
  }

  private _toAbsDay(year: number, month: number, day: number): number {
    return new Date(year, month, day).getTime();
  }

  private _getMonthDays(): Array<{ day: number; otherMonth: boolean; today: boolean; rangeStart: boolean; rangeEnd: boolean; inRange: boolean }> {
    const year = this._pickerYear;
    const month = this._pickerMonth;
    const firstDay = new Date(year, month, 1).getDay();
    const startOffset = (firstDay + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const now = new Date();
    const isCurrentMonth = now.getFullYear() === year && now.getMonth() === month;
    const todayDate = now.getDate();

    const startTs = this._pickerStartDay !== null ? this._toAbsDay(this._pickerStartYear, this._pickerStartMonth, this._pickerStartDay) : null;
    const endTs = this._pickerEndDay !== null ? this._toAbsDay(this._pickerEndYear, this._pickerEndMonth, this._pickerEndDay) : null;

    type DayInfo = { day: number; otherMonth: boolean; today: boolean; rangeStart: boolean; rangeEnd: boolean; inRange: boolean };
    const days: DayInfo[] = [];

    const classify = (d: number, isOther: boolean, absYear: number, absMonth: number): DayInfo => {
      const ts = this._toAbsDay(absYear, absMonth, d);
      const isStart = startTs !== null && ts === startTs;
      const isEnd = endTs !== null && ts === endTs;
      const isInRange = startTs !== null && endTs !== null && ts > startTs && ts < endTs;
      return {
        day: d, otherMonth: isOther,
        today: !isOther && isCurrentMonth && d === todayDate,
        rangeStart: isStart, rangeEnd: isEnd, inRange: isInRange,
      };
    };

    // Previous month
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    for (let i = startOffset - 1; i >= 0; i--) {
      days.push(classify(daysInPrevMonth - i, true, prevYear, prevMonth));
    }
    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(classify(d, false, year, month));
    }
    // Next month
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      days.push(classify(d, true, nextYear, nextMonth));
    }
    return days;
  }

  private _getMonthLabel(): string {
    const date = new Date(this._pickerYear, this._pickerMonth, 1);
    const lang = this._lang === 'fr' ? 'fr-FR' : 'en-US';
    const monthName = date.toLocaleDateString(lang, { month: 'long' });
    return `${monthName.charAt(0).toUpperCase()}${monthName.slice(1)} ${this._pickerYear}`;
  }

  private _getDayLabels(): string[] {
    if (this._lang === 'fr') return ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];
    return ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  }

  private _renderDateTimePicker() {
    const days = this._getMonthDays();
    const dayLabels = this._getDayLabels();
    const canConfirm = this._pickerStartDay !== null && this._pickerEndDay !== null;
    return html`
      <div class="picker-overlay"
        @click=${(e: Event) => { if (e.target === e.currentTarget) this._closePicker(); }}
        @keydown=${(e: KeyboardEvent) => { if (e.key === 'Escape') this._closePicker(); }}
      >
        <div class="picker-popup" role="dialog" aria-modal="true" aria-label="${t('config.light_schedule_title')}">
          <div class="picker-phase">
            <button
              class="picker-phase-btn ${this._pickerPhase === 'start' ? 'active' : ''}"
              @click=${() => { this._pickerPhase = 'start'; }}
            >${t('config.light_schedule_start')}</button>
            <button
              class="picker-phase-btn ${this._pickerPhase === 'end' ? 'active' : ''}"
              @click=${() => { this._pickerPhase = 'end'; }}
            >${t('config.light_schedule_end')}</button>
          </div>
          <div class="picker-header">
            <button class="picker-nav" @click=${() => this._pickerPrevMonth()} aria-label="${t('config.light_schedule_prev_month_aria')}">
              <ha-icon .icon=${'mdi:chevron-left'}></ha-icon>
            </button>
            <span class="picker-month">${this._getMonthLabel()}</span>
            <button class="picker-nav" @click=${() => this._pickerNextMonth()} aria-label="${t('config.light_schedule_next_month_aria')}">
              <ha-icon .icon=${'mdi:chevron-right'}></ha-icon>
            </button>
          </div>
          <div class="picker-grid">
            ${dayLabels.map((l) => html`<span class="picker-day-label">${l}</span>`)}
            ${days.map((d) => {
              const cls = [
                'picker-day',
                d.today ? 'today' : '',
                d.rangeStart ? 'range-start' : '',
                d.rangeEnd ? 'range-end' : '',
                d.inRange ? 'in-range' : '',
                d.otherMonth ? 'other-month' : '',
              ].filter(Boolean).join(' ');
              return html`
                <button class=${cls} @click=${() => this._pickerSelectDay(d.day, d.otherMonth)}>${d.day}</button>
              `;
            })}
          </div>
          <div class="picker-time-row">
            <div class="picker-time-group">
              <span class="picker-time-label">${t('config.light_schedule_start')}</span>
              <div class="time-input">
                <input type="text" class="time-digit" maxlength="2"
                  .value=${this._pickerStartHour}
                  @change=${(e: Event) => this._pickerSetTime('startHour', e)}
                />
                <span class="time-sep">:</span>
                <input type="text" class="time-digit" maxlength="2"
                  .value=${this._pickerStartMinute}
                  @change=${(e: Event) => this._pickerSetTime('startMinute', e)}
                />
              </div>
            </div>
            <div class="picker-time-group">
              <span class="picker-time-label">${t('config.light_schedule_end')}</span>
              <div class="time-input">
                <input type="text" class="time-digit" maxlength="2"
                  .value=${this._pickerEndHour}
                  @change=${(e: Event) => this._pickerSetTime('endHour', e)}
                />
                <span class="time-sep">:</span>
                <input type="text" class="time-digit" maxlength="2"
                  .value=${this._pickerEndMinute}
                  @change=${(e: Event) => this._pickerSetTime('endMinute', e)}
                />
              </div>
            </div>
          </div>
          <button
            class="btn btn-sm btn-accent picker-confirm"
            @click=${() => this._pickerConfirm()}
            ?disabled=${!canConfirm}
          >
            ${t('config.light_schedule_confirm')}
          </button>
        </div>
      </div>
    `;
  }

  private async _saveLights() {
    if (!this._backend || this._saving) return;
    this._saving = true;
    try {
      // Save light card global config
      await this._backend.send('set_light_config', {
        show_header: this._lightShowHeader,
      });
      bus.emit('light-config-changed', undefined);

      if (!this._lightRoom) {
        if (!this._mounted) return;
        this._showToast();
        return;
      }
      // Load existing hidden_entities to preserve non-light hidden entries
      let existingHidden: string[] = [];
      try {
        const existing = await this._backend.send<{
          hidden_entities: string[];
        } | null>('get_room', { area_id: this._lightRoom });
        if (existing) existingHidden = existing.hidden_entities ?? [];
      } catch { /* ignore */ }

      const lightEntityIds = new Set(this._lights.map((l) => l.entityId));
      const nonLightHidden = existingHidden.filter((id) => !lightEntityIds.has(id));
      const hiddenLights = this._lights.filter((l) => !l.visible).map((l) => l.entityId);

      const layouts: Record<string, string> = {};
      for (const l of this._lights) {
        if (l.layout === 'full') {
          layouts[l.entityId] = l.layout;
        }
      }
      await this._backend.send('set_room', {
        area_id: this._lightRoom,
        entity_order: this._lights.map((l) => l.entityId),
        hidden_entities: [...nonLightHidden, ...hiddenLights],
        entity_layouts: layouts,
      });
      if (!this._mounted) return;
      this._showToast();
      bus.emit('room-config-changed', { areaId: this._lightRoom });
    } catch {
      this._showToast(true);
    } finally {
      this._saving = false;
    }
  }

  private async _reset() {
    this._loaded = false;
    this._loading = false;
    await this._loadConfig();
    if (this._lightRoom) {
      this._loadRoomLights();
    }
  }

  private _showToast(error = false) {
    if (this._toastTimeout !== undefined) clearTimeout(this._toastTimeout);
    this._toastError = error;
    this._toast = true;
    this._toastTimeout = setTimeout(() => {
      this._toast = false;
      this._toastTimeout = undefined;
    }, 2000);
  }

  private _goBack() {
    history.back();
  }

  // — Preview —

  private _renderNavbarPreview() {
    // Only show visible rooms in preview (like the real navbar)
    const visibleRooms = [...this._rooms.filter((r) => r.visible)];
    if (this._autoSort) {
      visibleRooms.sort((a, b) => {
        const aLit = a.lightsOn > 0 ? 0 : 1;
        const bLit = b.lightsOn > 0 ? 0 : 1;
        return aLit - bLit;
      });
    }
    return html`
      <div class="preview-navbar">
        ${visibleRooms.map((room, idx) => {
          const hasLight = this._showLights && room.lightsOn > 0;
          const hasHumidity = this._showHumidity && room.humidityValue !== null && room.humidityValue >= this._humidityThreshold;
          const hasMusic = this._showMedia && room.mediaPlaying;
          const hasTempHot = this._showTemperature && room.tempValue !== null && room.tempValue >= this._tempHigh;
          const hasTempCold = this._showTemperature && room.tempValue !== null && !hasTempHot && room.tempValue <= this._tempLow;

          const classes = [
            'preview-nav-item',
            idx === 0 ? 'active-preview' : '',
            hasLight ? 'has-light' : '',
            hasHumidity ? 'has-humidity' : '',
            hasMusic ? 'has-music' : '',
            hasTempHot ? 'has-temp-hot' : '',
            hasTempCold ? 'has-temp-cold' : '',
          ].filter(Boolean).join(' ');

          return html`
            <div class=${classes}>
              <span class="preview-temp-badge">
                <ha-icon .icon=${hasTempHot ? 'mdi:thermometer-high' : 'mdi:snowflake'}></ha-icon>
              </span>
              <ha-icon .icon=${room.icon}></ha-icon>
              <div class="preview-nav-label"><span>${room.name}</span></div>
            </div>
          `;
        })}
      </div>
    `;
  }

  private _renderPopupPreview() {
    const room = this._rooms.find((r) => r.areaId === this._selectedRoom);
    if (!room) return html`<div class="preview-empty">${t('config.popup_select_room')}</div>`;

    const hasScenes = this._scenes.length > 0;
    const visibleScenes = this._scenes.filter((s) => s.visible);
    const iconClasses = [
      'preview-popup-icon-box',
      room.lightsOn > 0 ? 'has-light' : '',
      room.mediaPlaying ? 'has-music' : '',
    ].filter(Boolean).join(' ');

    return html`
      <div class="preview-popup">
        <div class="preview-popup-header">
          <div class="preview-popup-header-left">
            <div class=${iconClasses}>
              <ha-icon .icon=${room.icon}></ha-icon>
            </div>
            <div class="preview-popup-scene-dash ${hasScenes ? 'visible' : ''}"></div>
          </div>
          <div class="preview-popup-info">
            <div class="preview-popup-name">${room.name}</div>
            <div class="preview-popup-meta">
              ${room.temperature ? html`<span>${room.temperature}</span>` : nothing}
              ${room.humidity ? html`<span>${room.humidity}</span>` : nothing}
            </div>
          </div>
          <div class="preview-popup-close">
            <ha-icon .icon=${'mdi:close'}></ha-icon>
          </div>
        </div>

        ${visibleScenes.length > 0 ? html`
          <div class="preview-popup-scenes">
            ${this._scenes.map(
              (s) => html`
                <span class="preview-scene-chip ${!s.visible ? 'hidden-scene' : ''}">${s.name}</span>
              `,
            )}
          </div>
        ` : nothing}

        <div class="preview-popup-cards">
          ${this._cards.filter((c) => c.visible).map(
            (card) => html`
              <div class="preview-card-slot">
                <ha-icon .icon=${card.icon}></ha-icon>
                <span class="preview-card-slot-name">${card.nameKey ? t(card.nameKey) : card.id}</span>
                <span class="preview-card-slot-count">${card.count}</span>
              </div>
            `,
          )}
        </div>
      </div>
    `;
  }

  // — Render: Navbar tab —

  private _renderNavbarTab() {
    return html`
      <div class="tab-panel" id="panel-navbar">

        ${this._emptyRooms.length > 0 ? html`
          <div class="section-label">${t('config.navbar_empty_rooms')}</div>
          <div class="section-desc">
            ${t('config.navbar_empty_rooms_desc')}
          </div>
          <div class="item-list empty-rooms">
            ${this._emptyRooms.map((room) => html`
              <div class="item-row disabled">
                <span class="drag-handle">
                  <ha-icon .icon=${'mdi:drag'}></ha-icon>
                </span>
                <div class="room-icon-btn">
                  <ha-icon .icon=${room.icon}></ha-icon>
                </div>
                <div class="item-info">
                  <span class="item-name">${room.name}</span>
                  <span class="item-meta">0 ${t('common.entities')}</span>
                </div>
              </div>
            `)}
          </div>
        ` : nothing}

        <div class="section-label">${t('config.navbar_behavior')}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            @click=${() => { this._autoSort = !this._autoSort; }}
          >
            <div class="feature-icon">
              <ha-icon .icon=${'mdi:sort-bool-ascending'}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${t('config.navbar_auto_sort')}</div>
              <div class="feature-desc">${t('config.navbar_auto_sort_desc')}</div>
            </div>
            <span
              class="toggle ${this._autoSort ? 'on' : ''}"
              role="switch"
              aria-checked=${this._autoSort ? 'true' : 'false'}
            ></span>
          </button>
        </div>

        <div class="banner">
          <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
          <span>${t('config.navbar_rooms_banner')}</span>
        </div>
        <div class="section-label">${t('config.navbar_visible_rooms')}</div>
        <div class="item-list">
          ${this._rooms.map((room, idx) => this._renderRoomRow(room, idx))}
        </div>

        <div class="icon-picker-fold ${this._iconPickerRoom ? 'open' : ''}">
          <div class="icon-picker-inner">
            <div class="section-label">
              ${t('config.navbar_icon_label', { name: this._rooms.find((r) => r.areaId === this._iconPickerRoom)?.name || '' })}
            </div>
            <div class="icon-picker-grid">
              ${ROOM_ICONS.map(
                (icon) => html`
                  <button
                    class="icon-pick ${this._rooms.find((r) => r.areaId === this._iconPickerRoom)?.icon === icon ? 'selected' : ''}"
                    @click=${() => this._iconPickerRoom && this._setRoomIcon(this._iconPickerRoom, icon)}
                    aria-label="${t('config.navbar_choose_icon')}"
                  >
                    <ha-icon .icon=${icon}></ha-icon>
                  </button>
                `,
              )}
            </div>
          </div>
        </div>

        <div class="section-label">${t('config.navbar_indicators')}</div>
        <div class="section-desc">${t('config.navbar_indicators_desc')}</div>
        <div class="feature-list">
          ${([
            { key: 'lights' as const, icon: 'mdi:lightbulb', nameKey: 'config.navbar_ind_lights' as const, descKey: 'config.navbar_ind_lights_desc' as const },
            { key: 'temperature' as const, icon: 'mdi:thermometer', nameKey: 'config.navbar_ind_temp' as const, descKey: 'config.navbar_ind_temp_desc' as const },
            { key: 'humidity' as const, icon: 'mdi:water-percent', nameKey: 'config.navbar_ind_humidity' as const, descKey: 'config.navbar_ind_humidity_desc' as const },
            { key: 'media' as const, icon: 'mdi:music', nameKey: 'config.navbar_ind_media' as const, descKey: 'config.navbar_ind_media_desc' as const },
          ] as const).map((feat) => {
            const stateMap = {
              lights: this._showLights,
              temperature: this._showTemperature,
              humidity: this._showHumidity,
              media: this._showMedia,
            };
            const checked = stateMap[feat.key];
            return html`
              <button
                class="feature-row"
                @click=${() => {
                  if (feat.key === 'lights') this._showLights = !this._showLights;
                  else if (feat.key === 'temperature') this._showTemperature = !this._showTemperature;
                  else if (feat.key === 'humidity') this._showHumidity = !this._showHumidity;
                  else this._showMedia = !this._showMedia;
                }}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${feat.icon}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${t(feat.nameKey)}</div>
                  <div class="feature-desc">${t(feat.descKey)}</div>
                </div>
                <span
                  class="toggle ${checked ? 'on' : ''}"
                  role="switch"
                  aria-checked=${checked ? 'true' : 'false'}
                ></span>
              </button>
            `;
          })}
        </div>

        <div class="section-label">${t('config.navbar_thresholds')}</div>
        <div class="section-desc">${t('config.navbar_thresholds_desc')}</div>
        <div class="threshold-list">
          <div class="threshold-row">
            <div class="threshold-icon hot">
              <ha-icon .icon=${'mdi:thermometer-high'}></ha-icon>
            </div>
            <span class="threshold-label">${t('config.navbar_temp_high')}</span>
            <input
              class="threshold-input"
              type="number"
              step="0.5"
              .value=${String(this._tempHigh)}
              @change=${(e: Event) => { this._tempHigh = parseFloat((e.target as HTMLInputElement).value) || DEFAULT_TEMP_HIGH; }}
              aria-label="${t('config.navbar_temp_high')}"
            />
            <span class="threshold-unit">°C</span>
          </div>
          <div class="threshold-row">
            <div class="threshold-icon cold">
              <ha-icon .icon=${'mdi:snowflake'}></ha-icon>
            </div>
            <span class="threshold-label">${t('config.navbar_temp_low')}</span>
            <input
              class="threshold-input"
              type="number"
              step="0.5"
              .value=${String(this._tempLow)}
              @change=${(e: Event) => { this._tempLow = parseFloat((e.target as HTMLInputElement).value) || DEFAULT_TEMP_LOW; }}
              aria-label="${t('config.navbar_temp_low')}"
            />
            <span class="threshold-unit">°C</span>
          </div>
          <div class="threshold-row">
            <div class="threshold-icon humidity">
              <ha-icon .icon=${'mdi:water-percent'}></ha-icon>
            </div>
            <span class="threshold-label">${t('config.navbar_humidity_threshold')}</span>
            <input
              class="threshold-input"
              type="number"
              step="1"
              .value=${String(this._humidityThreshold)}
              @change=${(e: Event) => { this._humidityThreshold = parseFloat((e.target as HTMLInputElement).value) || DEFAULT_HUMIDITY_THRESHOLD; }}
              aria-label="${t('config.navbar_humidity_threshold')}"
            />
            <span class="threshold-unit">%</span>
          </div>
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${() => this._reset()}>${t('common.reset')}</button>
          <button
            class="btn btn-accent"
            @click=${() => this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving ? t('common.saving') : t('common.save')}
          </button>
        </div>
      </div>
    `;
  }

  private _renderRoomRow(room: RoomEntry, idx: number) {
    const isDragging = this._dragIdx === idx && this._dragContext === 'rooms';
    const isDropTarget = this._dropIdx === idx && this._dragContext === 'rooms';
    const classes = [
      'item-row',
      !room.visible ? 'disabled' : '',
      isDragging ? 'dragging' : '',
      isDropTarget ? 'drop-target' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div
        class=${classes}
        draggable="true"
        @dragstart=${() => this._onDragStart(idx, 'rooms')}
        @dragover=${(e: DragEvent) => this._onDragOver(idx, e)}
        @dragleave=${() => this._onDragLeave()}
        @drop=${(e: DragEvent) => this._onDropGeneric(idx, e)}
        @dragend=${() => this._onDragEnd()}
      >
        <span class="drag-handle">
          <ha-icon .icon=${'mdi:drag'}></ha-icon>
        </span>
        <button
          class="room-icon-btn"
          @click=${() => this._openIconPicker(room.areaId)}
          aria-label="${t('config.navbar_change_icon_aria', { name: room.name })}"
        >
          <ha-icon .icon=${room.icon}></ha-icon>
        </button>
        <div class="item-info">
          <span class="item-name">${room.name}</span>
          <span class="item-meta">${room.entityCount} ${t('common.entities')}</span>
        </div>
        <button
          class="toggle ${room.visible ? 'on' : ''}"
          @click=${() => this._toggleRoomVisible(room.areaId)}
          role="switch"
          aria-checked=${room.visible ? 'true' : 'false'}
          aria-label="${room.visible ? t('common.hide') : t('common.show')} ${room.name}"
        ></button>
      </div>
    `;
  }

  // — Render: Popup tab —

  private _renderPopupTab() {
    const selectedRoomObj = this._rooms.find((r) => r.areaId === this._selectedRoom);

    return html`
      <div class="tab-panel" id="panel-popup">
        <div class="section-label">${t('config.popup_room')}</div>
        <div class="section-desc">
          ${t('config.popup_room_desc')}
        </div>
        <div class="dropdown ${this._dropdownOpen ? 'open' : ''}">
          <button
            class="dropdown-trigger"
            @click=${() => (this._dropdownOpen = !this._dropdownOpen)}
            aria-expanded=${this._dropdownOpen ? 'true' : 'false'}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${selectedRoomObj?.icon || 'mdi:home'}></ha-icon>
            <span>${selectedRoomObj?.name || t('common.select')}</span>
            <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${this._rooms.map(
              (room) => html`
                <button
                  class="dropdown-item ${room.areaId === this._selectedRoom ? 'active' : ''}"
                  role="option"
                  aria-selected=${room.areaId === this._selectedRoom ? 'true' : 'false'}
                  @click=${() => this._selectRoom(room.areaId)}
                >
                  <ha-icon .icon=${room.icon}></ha-icon>
                  ${room.name}
                </button>
              `,
            )}
          </div>
        </div>

        <div class="section-label">${t('config.popup_internal_cards')}</div>
        <div class="section-desc">
          ${t('config.popup_internal_cards_desc')}
        </div>
        <div class="item-list">
          ${this._cards.map((card, idx) => this._renderCardRow(card, idx))}
        </div>

        ${this._scenes.length > 0 ? html`
          <div class="section-label">${t('config.popup_scenes')} (${this._scenes.length})</div>
          <div class="section-desc">
            ${t('config.popup_scenes_desc')}
          </div>
          <div class="item-list">
            ${this._scenes.map((scene, idx) => this._renderSceneRow(scene, idx))}
          </div>
        ` : nothing}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${() => this._reset()}>${t('common.reset')}</button>
          <button
            class="btn btn-accent"
            @click=${() => this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving ? t('common.saving') : t('common.save')}
          </button>
        </div>
      </div>
    `;
  }

  private _renderCardRow(card: CardEntry, idx: number) {
    const isDragging = this._dragIdx === idx && this._dragContext === 'cards';
    const isDropTarget = this._dropIdx === idx && this._dragContext === 'cards';
    const classes = [
      'item-row card-row',
      !card.visible ? 'disabled' : '',
      isDragging ? 'dragging' : '',
      isDropTarget ? 'drop-target' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div
        class=${classes}
        draggable="true"
        @dragstart=${() => this._onDragStart(idx, 'cards')}
        @dragover=${(e: DragEvent) => this._onDragOver(idx, e)}
        @dragleave=${() => this._onDragLeave()}
        @drop=${(e: DragEvent) => this._onDropGeneric(idx, e)}
        @dragend=${() => this._onDragEnd()}
      >
        <span class="drag-handle">
          <ha-icon .icon=${'mdi:drag'}></ha-icon>
        </span>
        <div class="card-icon-box">
          <ha-icon .icon=${card.icon}></ha-icon>
        </div>
        <div class="item-info">
          <span class="item-name">${card.nameKey ? t(card.nameKey) : card.id}</span>
          <span class="item-meta">${card.descKey ? t(card.descKey) : ''}</span>
        </div>
        <span class="card-count">${card.count}</span>
        <button
          class="toggle ${card.visible ? 'on' : ''}"
          @click=${() => this._toggleCardVisible(card.id)}
          role="switch"
          aria-checked=${card.visible ? 'true' : 'false'}
          aria-label="${card.visible ? t('common.hide') : t('common.show')} ${card.nameKey ? t(card.nameKey) : card.id}"
        ></button>
      </div>
    `;
  }

  private _renderSceneRow(scene: SceneEntry, idx: number) {
    const isDragging = this._dragIdx === idx && this._dragContext === 'scenes';
    const isDropTarget = this._dropIdx === idx && this._dragContext === 'scenes';
    const classes = [
      'item-row',
      !scene.visible ? 'disabled' : '',
      isDragging ? 'dragging' : '',
      isDropTarget ? 'drop-target' : '',
    ].filter(Boolean).join(' ');

    return html`
      <div
        class=${classes}
        draggable="true"
        @dragstart=${() => this._onDragStart(idx, 'scenes')}
        @dragover=${(e: DragEvent) => this._onDragOver(idx, e)}
        @dragleave=${() => this._onDragLeave()}
        @drop=${(e: DragEvent) => this._onDropGeneric(idx, e)}
        @dragend=${() => this._onDragEnd()}
      >
        <span class="drag-handle">
          <ha-icon .icon=${'mdi:drag'}></ha-icon>
        </span>
        <div class="card-icon-box">
          <ha-icon .icon=${'mdi:palette'}></ha-icon>
        </div>
        <div class="item-info">
          <span class="item-name">${scene.name}</span>
          <span class="item-meta">${scene.entityId}</span>
        </div>
        <button
          class="toggle ${scene.visible ? 'on' : ''}"
          @click=${() => this._toggleSceneVisible(scene.entityId)}
          role="switch"
          aria-checked=${scene.visible ? 'true' : 'false'}
          aria-label="${scene.visible ? t('common.hide') : t('common.show')} ${scene.name}"
        ></button>
      </div>
    `;
  }

  // — Render: Light tab —

  private _renderLightPreview() {
    if (!this._lightRoom) return html`<div class="preview-empty">${t('config.light_select_room')}</div>`;
    if (this._lights.length === 0) return html`<div class="preview-empty">${t('config.light_no_lights')}</div>`;

    const visibleLights = this._lights.filter((l) => l.visible);
    const onCount = visibleLights.filter((l) => l.isOn).length;
    const total = visibleLights.length;
    const anyOn = onCount > 0;
    const countClass = onCount === 0 ? 'none' : onCount === total ? 'all' : 'some';

    if (visibleLights.length === 0) return html`<div class="preview-empty">${t('config.light_no_visible')}</div>`;

    // Build layout: compact lights are paired, full/auto-on get full row
    type PItem =
      | { kind: 'full'; light: LightEntry }
      | { kind: 'compact-pair'; left: LightEntry; right: LightEntry | null };
    const layout: PItem[] = [];
    const compactBuf: LightEntry[] = [];

    for (const l of visibleLights) {
      const effectiveLayout = l.layout === 'full' ? 'full' : 'compact';
      if (effectiveLayout === 'compact') {
        compactBuf.push(l);
        if (compactBuf.length === 2) {
          layout.push({ kind: 'compact-pair', left: compactBuf[0], right: compactBuf[1] });
          compactBuf.length = 0;
        }
      } else {
        if (compactBuf.length > 0) {
          layout.push({ kind: 'full', light: compactBuf[0] });
          compactBuf.length = 0;
        }
        layout.push({ kind: 'full', light: l });
      }
    }
    if (compactBuf.length > 0) {
      layout.push({ kind: 'full', light: compactBuf[0] });
    }

    // Tint: warm glow if any light is on
    const tintOpacity = anyOn ? 0.06 : 0;

    const renderRow = (l: LightEntry, compact: boolean, isRight: boolean) => {
      const classes = [
        'preview-light-row',
        compact ? 'compact' : '',
        isRight ? 'compact-right' : '',
        !l.visible ? 'hidden-light' : '',
      ].filter(Boolean).join(' ');
      const editPeriods = this._scheduleEdits.get(l.entityId);
      const hasSched = editPeriods
        ? editPeriods.some((p) => p.start && p.end)
        : (this._schedulesLoaded[l.entityId]?.periods?.length ?? 0) > 0;

      return html`
        <div class=${classes} data-on=${l.isOn}>
          <div class="preview-light-icon ${l.isOn ? 'on' : ''}">
            <ha-icon .icon=${'mdi:lightbulb'}></ha-icon>
          </div>
          <div class="preview-light-info">
            <div class="preview-light-name">${l.name}</div>
            <div class="preview-light-sub">${l.isOn ? `${l.brightnessPct}%` : t('common.off')}</div>
          </div>
          ${hasSched ? html`<ha-icon class="preview-light-sched" .icon=${'mdi:calendar-clock'}></ha-icon>` : nothing}
          ${l.layout === 'full' ? html`<span class="preview-light-layout-tag">full</span>` : nothing}
          <span class="preview-light-dot ${l.isOn ? 'on' : ''}"></span>
        </div>
      `;
    };

    return html`
      <div class="preview-light">
        ${this._lightShowHeader ? html`
          <div class="preview-light-header">
            <div class="preview-light-header-left">
              <span class="preview-light-title">${t('light.title')}</span>
              <span class="preview-light-count ${countClass}">${onCount}/${total}</span>
            </div>
            <div class="preview-light-toggle ${anyOn ? 'on' : ''}"></div>
          </div>
        ` : nothing}
        <div class="preview-light-body">
          <div
            class="preview-light-tint"
            style="background:radial-gradient(ellipse at 30% 20%, rgba(251,191,36,0.12) 0%, transparent 70%);opacity:${tintOpacity}"
          ></div>
          <div class="preview-light-grid">
            ${layout.map((item) => {
              if (item.kind === 'full') {
                return renderRow(item.light, false, false);
              }
              return html`
                ${renderRow(item.left, true, false)}
                ${item.right ? renderRow(item.right, true, true) : nothing}
              `;
            })}
          </div>
        </div>
      </div>
    `;
  }

  private _renderLightTab() {
    const selectedRoomObj = this._rooms.find((r) => r.areaId === this._lightRoom);

    return html`
      <div class="tab-panel" id="panel-light">
        <div class="section-label">${t('config.navbar_behavior')}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            @click=${() => { this._lightShowHeader = !this._lightShowHeader; }}
          >
            <div class="feature-icon">
              <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${t('config.light_show_header')}</div>
              <div class="feature-desc">${t('config.light_show_header_desc')}</div>
            </div>
            <span
              class="toggle ${this._lightShowHeader ? 'on' : ''}"
              role="switch"
              aria-checked=${this._lightShowHeader ? 'true' : 'false'}
            ></span>
          </button>
        </div>

        <div class="section-label">${t('config.light_room')}</div>
        <div class="section-desc">
          ${t('config.light_room_desc')}
        </div>
        <div class="dropdown ${this._lightDropdownOpen ? 'open' : ''}">
          <button
            class="dropdown-trigger"
            @click=${() => (this._lightDropdownOpen = !this._lightDropdownOpen)}
            aria-expanded=${this._lightDropdownOpen ? 'true' : 'false'}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${selectedRoomObj?.icon || 'mdi:home'}></ha-icon>
            <span>${selectedRoomObj?.name || t('common.select')}</span>
            <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${this._rooms.map(
              (room) => html`
                <button
                  class="dropdown-item ${room.areaId === this._lightRoom ? 'active' : ''}"
                  role="option"
                  aria-selected=${room.areaId === this._lightRoom ? 'true' : 'false'}
                  @click=${() => this._selectLightRoom(room.areaId)}
                >
                  <ha-icon .icon=${room.icon}></ha-icon>
                  ${room.name}
                </button>
              `,
            )}
          </div>
        </div>

        ${this._lights.length > 0
          ? html`
              <div class="section-label">${t('config.light_list_title')} (${this._lights.length})</div>
              <div class="section-desc">
                ${t('config.light_list_banner')}
              </div>
              <div class="item-list">
                ${this._lights.map((light, idx) => this._renderLightRow(light, idx))}
              </div>
            `
          : this._lightRoom
            ? html`<div class="banner">
                <ha-icon .icon=${'mdi:lightbulb-off-outline'}></ha-icon>
                <span>${t('config.light_no_lights')}</span>
              </div>`
            : nothing}

        ${this._lights.length > 0 ? html`
          <div class="section-desc schedule-hint">
            <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
            ${t('config.light_schedule_hint')}
          </div>
        ` : nothing}

        <div class="section-desc dashboard-vs-room">
          <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
          ${t('config.light_dashboard_vs_room')}
        </div>

        ${this._lightRoom ? html`
          <div class="save-bar">
            <button class="btn btn-ghost" @click=${() => this._loadRoomLights()}>${t('common.reset')}</button>
            <button
              class="btn btn-accent"
              @click=${() => this._save()}
              ?disabled=${this._saving}
            >
              ${this._saving ? t('common.saving') : t('common.save')}
            </button>
          </div>
        ` : nothing}
      </div>
    `;
  }

  private _renderLightRow(light: LightEntry, idx: number) {
    const isDragging = this._dragIdx === idx && this._dragContext === 'lights';
    const isDropTarget = this._dropIdx === idx && this._dragContext === 'lights';
    const rowClasses = [
      'item-row',
      !light.visible ? 'disabled' : '',
      isDragging ? 'dragging' : '',
      isDropTarget ? 'drop-target' : '',
    ].filter(Boolean).join(' ');
    const editPeriods = this._scheduleEdits.get(light.entityId);
    const hasSchedule = editPeriods
      ? editPeriods.some((p) => p.start && p.end)
      : (this._schedulesLoaded[light.entityId]?.periods?.length ?? 0) > 0;
    const isExpanded = this._scheduleExpandedEntity === light.entityId;
    const wrapClasses = ['item-card', isExpanded ? 'expanded' : ''].filter(Boolean).join(' ');

    return html`
      <div class=${wrapClasses}>
        <div
          class=${rowClasses}
          draggable="true"
          @dragstart=${() => this._onDragStart(idx, 'lights')}
          @dragover=${(e: DragEvent) => this._onDragOver(idx, e)}
          @dragleave=${() => this._onDragLeave()}
          @drop=${(e: DragEvent) => this._onDropGeneric(idx, e)}
          @dragend=${() => this._onDragEnd()}
        >
          <span class="drag-handle">
            <ha-icon .icon=${'mdi:drag'}></ha-icon>
          </span>
          <div class="item-info">
            <span class="item-name">${light.name}</span>
            <span class="item-meta">${light.entityId}</span>
          </div>
          <div class="light-state">
            <span class="light-dot ${light.isOn ? 'on' : ''}"></span>
          </div>
          <button
            class="schedule-btn ${hasSchedule ? 'active' : ''}"
            @click=${() => this._toggleScheduleExpand(light.entityId)}
            aria-label="${t('config.light_schedule_aria', { name: light.name })}"
            aria-expanded=${isExpanded ? 'true' : 'false'}
            title="${t('config.light_schedule_title')}"
          >
            <ha-icon .icon=${'mdi:calendar-clock'}></ha-icon>
          </button>
          <button
            class="layout-btn"
            @click=${() => this._cycleLightLayout(light.entityId)}
            aria-label="${t('config.light_change_layout_aria')}"
            title="${t(light.layout === 'compact' ? 'config.light_layout_compact' : 'config.light_layout_full')}"
          >
            ${t(light.layout === 'compact' ? 'config.light_layout_compact' : 'config.light_layout_full')}
          </button>
          <button
            class="toggle ${light.visible ? 'on' : ''}"
            @click=${() => this._toggleLightVisible(light.entityId)}
            role="switch"
            aria-checked=${light.visible ? 'true' : 'false'}
            aria-label="${light.visible ? t('common.hide') : t('common.show')} ${light.name}"
          ></button>
        </div>
        <div class="fold-sep ${isExpanded ? 'visible' : ''}"></div>
        <div class="schedule-fold ${isExpanded ? 'open' : ''}">
          <div class="schedule-fold-inner">
            ${this._renderScheduleContent(light.entityId)}
          </div>
        </div>
      </div>
    `;
  }

  private _formatDateTimeShort(value: string): string {
    if (!value) return '';
    const [datePart, timePart] = value.split('T');
    if (!datePart) return value;
    const [y, m, d] = datePart.split('-');
    const time = timePart ?? '00:00';
    return `${d}/${m}/${y} ${time}`;
  }

  private _formatPeriodDisplay(p: SchedulePeriodEdit): string {
    if (!p.start && !p.end) return '';
    const s = this._formatDateTimeShort(p.start);
    const e = this._formatDateTimeShort(p.end);
    if (s && e) return `${s}  →  ${e}`;
    if (s) return `${s}  → …`;
    return `…  →  ${e}`;
  }

  private _renderScheduleContent(entityId: string) {
    const periods = this._scheduleEdits.get(entityId) ?? [];
    return html`
      <div class="schedule-body">
        <div class="schedule-header">${t('config.light_schedule_title')}</div>
        ${periods.map((p, idx) => html`
          <div class="schedule-period">
            <div class="schedule-row">
              <button
                class="datetime-display ${p.start || p.end ? '' : 'empty'}"
                @click=${() => this._openRangePicker(entityId, idx)}
              >
                ${p.start || p.end ? this._formatPeriodDisplay(p) : t('config.light_schedule_no_date')}
              </button>
            </div>
            <div class="schedule-row schedule-row-actions">
              <button
                class="check-item ${p.recurring ? 'checked' : ''}"
                @click=${() => this._toggleScheduleRecurring(entityId, idx)}
              >
                <span class="check-box">
                  <ha-icon .icon=${'mdi:check'}></ha-icon>
                </span>
                <span class="check-label">${t('config.light_schedule_recurring')}</span>
              </button>
              <button
                class="btn-icon xs schedule-delete"
                @click=${() => this._removeSchedulePeriod(entityId, idx)}
                aria-label="${t('config.light_schedule_delete_aria')}"
              >
                <ha-icon .icon=${'mdi:delete-outline'}></ha-icon>
              </button>
            </div>
          </div>
        `)}
        <button class="btn btn-sm schedule-add" @click=${() => this._addSchedulePeriod(entityId)}>
          <ha-icon .icon=${'mdi:plus'}></ha-icon>
          ${t('config.light_schedule_add')}
        </button>
        <button class="btn btn-sm btn-accent schedule-save" @click=${() => this._saveSchedule(entityId)}>
          ${t('common.save')}
        </button>
      </div>
    `;
  }

  // — Cover card config —

  private _selectCoverRoom(areaId: string) {
    this._coverRoom = areaId;
    this._coverRoomDropdownOpen = false;
    this._loadRoomCovers();
  }

  private async _loadRoomCovers() {
    if (!this._backend || !this._coverRoom || !this.hass) return;
    const targetRoom = this._coverRoom;
    const areaEntities = getAreaEntities(targetRoom, this.hass.entities, this.hass.devices);
    const coverIds = areaEntities
      .filter((e) => e.entity_id.startsWith('cover.'))
      .map((e) => e.entity_id);

    // Load room config for hidden_entities / entity_order
    let roomConfig: { hidden_entities?: string[]; entity_order?: string[] } | null = null;
    try {
      roomConfig = await this._backend.send<{ hidden_entities?: string[]; entity_order?: string[] } | null>('get_room', { area_id: targetRoom });
    } catch { /* ignore */ }

    // Discard stale result if room changed during async call
    if (this._coverRoom !== targetRoom) return;

    const hiddenSet = new Set(roomConfig?.hidden_entities ?? []);
    const order = roomConfig?.entity_order ?? [];

    // Sort by order
    const sorted = [...coverIds].sort((a, b) => {
      const ai = order.indexOf(a);
      const bi = order.indexOf(b);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return 0;
    });

    this._coverRoomEntities = sorted.map((id) => {
      const entity = this.hass?.states[id];
      const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1] || id;
      const dc = (entity?.attributes?.device_class as string) || 'shutter';
      return { entityId: id, name, visible: !hiddenSet.has(id), deviceClass: dc };
    });
  }

  private _toggleCoverEntityVisibility(entityId: string) {
    const toggled = this._coverRoomEntities.map((e) =>
      e.entityId === entityId ? { ...e, visible: !e.visible } : e,
    );
    const visible = toggled.filter((e) => e.visible);
    const hidden = toggled.filter((e) => !e.visible);
    this._coverRoomEntities = [...visible, ...hidden];
  }

  private _getAllCoverEntities(): { entityId: string; name: string }[] {
    if (!this.hass) return [];
    const covers: { entityId: string; name: string }[] = [];
    for (const [id, entity] of Object.entries(this.hass.states)) {
      if (!id.startsWith('cover.')) continue;
      const name = (entity.attributes?.friendly_name as string) || id.split('.')[1] || id;
      covers.push({ entityId: id, name });
    }
    return covers.sort((a, b) => a.name.localeCompare(b.name));
  }

  private _toggleCoverDashboardEntity(entityId: string) {
    const set = new Set(this._coverDashboardEntities);
    if (set.has(entityId)) set.delete(entityId);
    else set.add(entityId);
    this._coverDashboardEntities = [...set];
    // Re-sort _coverDashboardOrder: selected first, then unselected
    const newSet = new Set(this._coverDashboardEntities);
    const selected = this._coverDashboardOrder.filter((id) => newSet.has(id));
    const unselected = this._coverDashboardOrder.filter((id) => !newSet.has(id));
    this._coverDashboardOrder = [...selected, ...unselected];
  }

  private _initCoverDashboardOrder() {
    const all = this._getAllCoverEntities().map((c) => c.entityId);
    const selSet = new Set(this._coverDashboardEntities);
    // Keep existing order for entities already in _coverDashboardEntities, then append new ones
    const ordered = this._coverDashboardEntities.filter((id) => all.includes(id));
    const remaining = all.filter((id) => !selSet.has(id));
    this._coverDashboardOrder = [...ordered, ...remaining];
  }

  private _onDropDashboardCover(idx: number, e: DragEvent) {
    e.preventDefault();
    if (this._dragIdx === null || this._dragIdx === idx || this._dragContext !== 'dashboard_covers') {
      this._dragIdx = null;
      this._dropIdx = null;
      return;
    }
    const arr = [...this._coverDashboardOrder];
    const [moved] = arr.splice(this._dragIdx, 1);
    arr.splice(idx, 0, moved);
    this._coverDashboardOrder = arr;
    this._dragIdx = null;
    this._dropIdx = null;
  }

  private async _saveCover() {
    if (!this._backend || this._saving) return;
    this._saving = true;
    try {
      // Save global cover config — ordered dashboard entities (selected ones in order)
      const orderedDashboardEntities = this._coverDashboardOrder.filter((id) =>
        this._coverDashboardEntities.includes(id),
      );
      await this._backend.send('set_cover_config', {
        show_header: this._coverShowHeader,
        dashboard_entities: orderedDashboardEntities,
        presets: this._coverPresets,
      });

      // Save room-level cover config if a room is selected
      if (this._coverRoom && this._coverRoomEntities.length > 0) {
        const hiddenEntities = this._coverRoomEntities.filter((e) => !e.visible).map((e) => e.entityId);
        const entityOrder = this._coverRoomEntities.map((e) => e.entityId);
        await this._backend.send('set_room', {
          area_id: this._coverRoom,
          hidden_entities: hiddenEntities,
          entity_order: entityOrder,
        });
      }

      if (!this._mounted) return;
      this._showToast();
      bus.emit('cover-config-changed', undefined);
      if (this._coverRoom) bus.emit('room-config-changed', { areaId: this._coverRoom });
    } catch {
      this._showToast(true);
    } finally {
      this._saving = false;
    }
  }

  private _renderCoverPreview() {
    const entities = this._coverRoomEntities.filter((e) => e.visible);
    const DC_ICONS: Record<string, [string, string]> = {
      shutter: ['mdi:window-shutter-open', 'mdi:window-shutter'],
      blind: ['mdi:blinds-open', 'mdi:blinds'],
      curtain: ['mdi:curtains', 'mdi:curtains'],
      garage: ['mdi:garage-open', 'mdi:garage'],
      gate: ['mdi:gate-open', 'mdi:gate'],
      door: ['mdi:door-open', 'mdi:door-closed'],
    };
    // Pick the first entity with real HA state as the "expanded" one
    const expandedEntity = entities.length > 0 ? entities[0] : null;
    const expandedHaState = expandedEntity ? this.hass?.states[expandedEntity.entityId] : null;
    const expandedIsOpen = expandedHaState?.state === 'open' || expandedHaState?.state === 'opening';
    const expandedPos = expandedHaState?.attributes.current_position as number | undefined;
    const expandedFeatures = (expandedHaState?.attributes.supported_features as number) || 0;
    const hasPosition = !!(expandedFeatures & 4); // SET_POSITION
    const posVal = expandedPos ?? (expandedIsOpen ? 100 : 0);
    const openCount = entities.filter((e) => {
      const s = this.hass?.states[e.entityId];
      return s?.state === 'open' || s?.state === 'opening';
    }).length;

    return html`
      <div class="preview-cover">
        ${this._coverShowHeader ? html`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:0 4px 4px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t4);">${t('cover.title')}</span>
              <span style="font-size:8px;font-weight:600;padding:1px 4px;border-radius:8px;background:${openCount > 0 ? 'rgba(167,139,250,0.15)' : 'var(--s2)'};color:${openCount > 0 ? '#a78bfa' : 'var(--t3)'};">${openCount}/${entities.length}</span>
            </div>
            <div style="display:flex;gap:3px;">
              <div style="width:18px;height:18px;border-radius:4px;background:var(--s2);border:1px solid var(--b2);display:flex;align-items:center;justify-content:center;">
                <ha-icon .icon=${'mdi:arrow-up'} style="--mdc-icon-size:10px;color:var(--t3);display:flex;align-items:center;justify-content:center;"></ha-icon>
              </div>
              <div style="width:18px;height:18px;border-radius:4px;background:var(--s2);border:1px solid var(--b2);display:flex;align-items:center;justify-content:center;">
                <ha-icon .icon=${'mdi:arrow-down'} style="--mdc-icon-size:10px;color:var(--t3);display:flex;align-items:center;justify-content:center;"></ha-icon>
              </div>
            </div>
          </div>
        ` : nothing}
        <div class="preview-cover-card glass" style="padding:8px 10px;display:flex;flex-direction:column;gap:2px;position:relative;">
          <!-- Tint -->
          <div style="position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(ellipse at 50% 50%,#a78bfa,transparent 70%);opacity:${entities.length > 0 ? (openCount / entities.length * 0.18).toFixed(3) : '0'};"></div>
          ${entities.length === 0 ? html`
            <div style="padding:8px;text-align:center;font-size:10px;color:var(--t4);">—</div>
          ` : nothing}
          ${entities.slice(0, 3).map((e, idx) => {
            const icons = DC_ICONS[e.deviceClass] || DC_ICONS.shutter;
            const entity = this.hass?.states[e.entityId];
            const isOpen = entity?.state === 'open' || entity?.state === 'opening';
            const pos = entity?.attributes.current_position as number | undefined;
            const isExpanded = idx === 0;
            return html`
              <!-- Row -->
              <div style="display:flex;align-items:center;gap:6px;padding:4px 2px;position:relative;z-index:1;">
                <div style="width:22px;height:22px;border-radius:6px;background:${isOpen ? 'rgba(167,139,250,0.1)' : 'var(--s2)'};border:1px solid ${isOpen ? 'rgba(167,139,250,0.15)' : 'var(--b1)'};display:flex;align-items:center;justify-content:center;">
                  <ha-icon .icon=${icons[isOpen ? 0 : 1]} style="--mdc-icon-size:13px;color:${isOpen ? '#a78bfa' : 'var(--t3)'};display:flex;align-items:center;justify-content:center;${isOpen ? 'filter:drop-shadow(0 0 4px rgba(167,139,250,0.4));' : ''}"></ha-icon>
                </div>
                <div style="flex:1;min-width:0;">
                  <div style="font-size:10px;font-weight:600;color:var(--t1);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${e.name}</div>
                  <div style="display:flex;align-items:center;gap:4px;margin-top:1px;">
                    <span style="font-size:8px;color:${isOpen ? 'rgba(167,139,250,0.6)' : 'var(--t4)'};">${isOpen ? t('cover.open') : t('cover.closed')}</span>
                  </div>
                </div>
                ${pos !== undefined ? html`
                  <span style="font-size:12px;font-weight:700;color:${isOpen ? '#a78bfa' : 'var(--t3)'};font-variant-numeric:tabular-nums;">${pos}<span style="font-size:8px;font-weight:500;">%</span></span>
                ` : nothing}
                <div style="width:6px;height:6px;border-radius:50%;background:${isOpen ? '#a78bfa' : 'var(--t4)'};${isOpen ? 'box-shadow:0 0 6px rgba(167,139,250,0.4);' : ''}"></div>
              </div>
              ${isExpanded ? html`
                <!-- Expanded controls for first entity -->
                <div style="height:1px;margin:0 8px;background:linear-gradient(90deg,transparent,rgba(167,139,250,0.25),transparent);"></div>
                <div style="padding:4px 2px;display:flex;flex-direction:column;gap:6px;position:relative;z-index:1;">
                  <span style="font-size:8px;font-weight:600;letter-spacing:0.5px;color:rgba(167,139,250,0.6);text-transform:uppercase;">${e.name}</span>
                  <!-- Transport -->
                  <div style="display:flex;align-items:center;justify-content:center;gap:4px;">
                    <div style="width:28px;height:28px;border-radius:8px;background:var(--s2);border:1px solid var(--b2);display:flex;align-items:center;justify-content:center;">
                      <ha-icon .icon=${'mdi:arrow-up'} style="--mdc-icon-size:14px;color:var(--t2);display:flex;align-items:center;justify-content:center;"></ha-icon>
                    </div>
                    <div style="width:28px;height:28px;border-radius:8px;background:var(--s2);border:1px solid var(--b2);display:flex;align-items:center;justify-content:center;">
                      <ha-icon .icon=${'mdi:stop'} style="--mdc-icon-size:14px;color:var(--t2);display:flex;align-items:center;justify-content:center;"></ha-icon>
                    </div>
                    <div style="width:28px;height:28px;border-radius:8px;background:var(--s2);border:1px solid var(--b2);display:flex;align-items:center;justify-content:center;">
                      <ha-icon .icon=${'mdi:arrow-down'} style="--mdc-icon-size:14px;color:var(--t2);display:flex;align-items:center;justify-content:center;"></ha-icon>
                    </div>
                  </div>
                  <!-- Position slider -->
                  ${hasPosition ? html`
                    <div style="display:flex;align-items:center;gap:4px;">
                      <ha-icon .icon=${icons[1]} style="--mdc-icon-size:12px;color:var(--t3);display:flex;align-items:center;justify-content:center;"></ha-icon>
                      <div style="flex:1;height:22px;border-radius:var(--radius-lg);background:var(--s1);border:1px solid var(--b1);position:relative;overflow:hidden;">
                        <div style="position:absolute;top:0;left:0;height:100%;width:${posVal}%;border-radius:inherit;background:linear-gradient(90deg,rgba(167,139,250,0.15),rgba(167,139,250,0.25));"></div>
                        <div style="position:absolute;top:50%;left:${posVal}%;transform:translate(-50%,-50%);width:5px;height:14px;border-radius:3px;background:rgba(255,255,255,0.7);"></div>
                        <span style="position:absolute;top:50%;right:6px;transform:translateY(-50%);font-size:9px;font-weight:600;color:var(--t3);">${posVal}%</span>
                      </div>
                      <ha-icon .icon=${icons[0]} style="--mdc-icon-size:12px;color:var(--t3);display:flex;align-items:center;justify-content:center;"></ha-icon>
                    </div>
                  ` : nothing}
                  <!-- Presets -->
                  <div style="height:1px;background:var(--b1);"></div>
                  <div style="display:flex;gap:4px;flex-wrap:wrap;">
                    ${this._coverPresets.map((p) => {
                      const isActive = posVal === p;
                      const pIsOpen = p >= 50;
                      const label = p === 0 ? t('cover.preset_closed') : p === 100 ? t('cover.preset_open') : `${p}%`;
                      return html`
                        <span style="
                          display:inline-flex;align-items:center;gap:3px;
                          padding:3px 7px;border-radius:var(--radius-md);
                          border:1px solid ${isActive ? 'rgba(167,139,250,0.15)' : 'var(--b2)'};
                          background:${isActive ? 'rgba(167,139,250,0.1)' : 'var(--s1)'};
                          font-size:9px;font-weight:600;
                          color:${isActive ? '#a78bfa' : 'var(--t3)'};
                        ">
                          <ha-icon .icon=${icons[pIsOpen ? 0 : 1]} style="--mdc-icon-size:10px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                          ${label}
                        </span>
                      `;
                    })}
                  </div>
                </div>
                <div style="height:1px;margin:0 8px;background:linear-gradient(90deg,transparent,rgba(167,139,250,0.25),transparent);"></div>
              ` : nothing}
            `;
          })}
          ${entities.length > 3 ? html`
            <div style="font-size:9px;color:var(--t4);text-align:center;padding-top:2px;position:relative;z-index:1;">+${entities.length - 3}</div>
          ` : nothing}
        </div>
      </div>
    `;
  }

  private _renderCoverTab() {
    if (!this.hass) return nothing;

    const currentRoom = this._rooms.find((r) => r.areaId === this._coverRoom);

    return html`
      <div class="tab-panel" id="panel-cover">
        <div class="section-label">${t('config.navbar_behavior')}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            @click=${() => { this._coverShowHeader = !this._coverShowHeader; }}
          >
            <div class="feature-icon">
              <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${t('config.cover_show_header')}</div>
              <div class="feature-desc">${t('config.cover_show_header_desc')}</div>
            </div>
            <span
              class="toggle ${this._coverShowHeader ? 'on' : ''}"
              role="switch"
              aria-checked=${this._coverShowHeader ? 'true' : 'false'}
            ></span>
          </button>
        </div>

        <!-- Per-room cover config -->
        <div class="section-label">${t('config.cover_room')}</div>
        <div class="section-desc">${t('config.cover_room_desc')}</div>

        <!-- Room selector dropdown -->
        <div class="dropdown ${this._coverRoomDropdownOpen ? 'open' : ''}">
          <button
            class="dropdown-trigger"
            @click=${() => { this._coverRoomDropdownOpen = !this._coverRoomDropdownOpen; }}
            aria-expanded=${this._coverRoomDropdownOpen ? 'true' : 'false'}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${currentRoom?.icon || 'mdi:home'}></ha-icon>
            <span>${currentRoom?.name || t('common.select')}</span>
            <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${this._rooms.map((r) => html`
              <button
                class="dropdown-item ${r.areaId === this._coverRoom ? 'active' : ''}"
                role="option"
                aria-selected=${r.areaId === this._coverRoom ? 'true' : 'false'}
                @click=${() => this._selectCoverRoom(r.areaId)}
              >
                <ha-icon .icon=${r.icon}></ha-icon>
                ${r.name}
              </button>
            `)}
          </div>
        </div>

        ${this._coverRoom ? html`
          ${this._coverRoomEntities.length > 0 ? html`
            <div class="section-label">${t('config.cover_list_title')} (${this._coverRoomEntities.length})</div>
            <div class="section-desc">${t('config.cover_list_banner')}</div>
            <div class="item-list">
              ${this._coverRoomEntities.map((e, idx) => {
                const isDragging = this._dragIdx === idx && this._dragContext === 'covers';
                const isDropTarget = this._dropIdx === idx && this._dragContext === 'covers';
                const rowClasses = [
                  'item-row',
                  !e.visible ? 'disabled' : '',
                  isDragging ? 'dragging' : '',
                  isDropTarget ? 'drop-target' : '',
                ].filter(Boolean).join(' ');
                return html`
                  <div
                    class=${rowClasses}
                    draggable="true"
                    @dragstart=${() => this._onDragStart(idx, 'covers')}
                    @dragover=${(ev: DragEvent) => this._onDragOver(idx, ev)}
                    @dragleave=${() => this._onDragLeave()}
                    @drop=${(ev: DragEvent) => this._onDropCover(idx, ev)}
                    @dragend=${() => this._onDragEnd()}
                  >
                    <span class="drag-handle">
                      <ha-icon .icon=${'mdi:drag'}></ha-icon>
                    </span>
                    <div class="item-info">
                      <span class="item-name">${e.name}</span>
                      <span class="item-meta">${e.entityId}</span>
                    </div>
                    <button
                      class="toggle ${e.visible ? 'on' : ''}"
                      @click=${() => this._toggleCoverEntityVisibility(e.entityId)}
                      role="switch"
                      aria-checked=${e.visible ? 'true' : 'false'}
                      aria-label="${e.visible ? t('common.hide') : t('common.show')} ${e.name}"
                    ></button>
                  </div>
                `;
              })}
            </div>
          ` : html`
            <div class="banner">
              <ha-icon .icon=${'mdi:blinds-open'}></ha-icon>
              <span>${t('config.cover_no_covers')}</span>
            </div>
          `}
        ` : nothing}

        <!-- Preset config -->
        <div class="section-label">${t('config.cover_presets')}</div>
        <div class="section-desc">${t('config.cover_presets_desc')}</div>

        <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;">
          ${this._coverPresets.map((p) => {
            const pIcon = p >= 50 ? 'mdi:window-shutter-open' : 'mdi:window-shutter';
            return html`
              <span style="
                display:inline-flex;align-items:center;gap:4px;
                padding:5px 10px;border-radius:var(--radius-md);
                border:1px solid var(--b2);background:var(--s1);
                font-size:11px;font-weight:600;color:var(--t2);
              ">
                <ha-icon .icon=${pIcon} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                ${p === 0 ? t('cover.preset_closed') : p === 100 ? t('cover.preset_open') : `${p}%`}
                <button
                  style="
                    background:none;border:none;cursor:pointer;padding:0;
                    display:flex;align-items:center;justify-content:center;
                    color:var(--t4);transition:color var(--t-fast);
                  "
                  @click=${() => this._removeCoverPreset(p)}
                  aria-label="${t('common.delete')} ${p}%"
                >
                  <ha-icon .icon=${'mdi:close'} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                </button>
              </span>
            `;
          })}
          <span style="display:inline-flex;align-items:center;gap:4px;">
            <input
              class="input"
              type="number"
              min="0"
              max="100"
              step="5"
              .value=${this._coverPresetInput}
              @input=${(e: Event) => { this._coverPresetInput = (e.target as HTMLInputElement).value; }}
              @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter') this._addCoverPreset(); }}
              placeholder=${t('config.cover_preset_placeholder')}
              style="width:64px;font-size:11px;padding:5px 8px;"
            />
            <button
              style="
                display:inline-flex;align-items:center;gap:4px;
                padding:5px 10px;border-radius:var(--radius-md);
                border:1px solid rgba(167,139,250,0.3);background:rgba(167,139,250,0.1);
                font-size:11px;font-weight:600;color:var(--c-accent);
                cursor:pointer;font-family:inherit;
                opacity:${this._coverPresetInput ? '1' : '0.4'};
                pointer-events:${this._coverPresetInput ? 'auto' : 'none'};
                transition:opacity var(--t-fast);
              "
              @click=${() => this._addCoverPreset()}
            >
              <ha-icon .icon=${'mdi:plus'} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              ${t('config.cover_preset_add')}
            </button>
          </span>
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${() => this._resetCover()}>${t('common.reset')}</button>
          <button
            class="btn btn-accent"
            @click=${() => this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving ? t('common.saving') : t('common.save')}
          </button>
        </div>
      </div>
    `;
  }

  private _onDropCover(idx: number, e: DragEvent) {
    e.preventDefault();
    if (this._dragIdx === null || this._dragIdx === idx || this._dragContext !== 'covers') {
      this._dragIdx = null;
      this._dropIdx = null;
      return;
    }
    const arr = [...this._coverRoomEntities];
    const [moved] = arr.splice(this._dragIdx, 1);
    arr.splice(idx, 0, moved);
    this._coverRoomEntities = arr;
    this._dragIdx = null;
    this._dropIdx = null;
  }

  private async _resetCover() {
    if (!this._backend) return;
    try {
      const result = await this._backend.send<{
        cover_card?: { show_header: boolean; dashboard_entities: string[]; presets: number[] };
      }>('get_config');
      if (result?.cover_card) {
        this._coverShowHeader = result.cover_card.show_header ?? true;
        this._coverDashboardEntities = result.cover_card.dashboard_entities ?? [];
        this._coverPresets = result.cover_card.presets ?? [0, 25, 50, 75, 100];
        this._initCoverDashboardOrder();
      }
    } catch { /* ignore */ }
    await this._loadRoomCovers();
  }

  private _addCoverPreset() {
    const val = parseInt(this._coverPresetInput, 10);
    if (isNaN(val) || val < 0 || val > 100) return;
    if (this._coverPresets.includes(val)) { this._coverPresetInput = ''; return; }
    this._coverPresets = [...this._coverPresets, val].sort((a, b) => a - b);
    this._coverPresetInput = '';
  }

  private _removeCoverPreset(val: number) {
    this._coverPresets = this._coverPresets.filter((p) => p !== val);
  }

  // — Dashboard config —

  private _toggleDashboardCard(card: string) {
    const set = new Set(this._dashboardEnabledCards);
    if (set.has(card)) set.delete(card);
    else set.add(card);
    this._dashboardEnabledCards = [...set];
  }

  private async _saveDashboard() {
    if (!this._backend || this._saving) return;
    this._saving = true;
    try {
      await this._backend.send('set_dashboard', {
        enabled_cards: this._dashboardEnabledCards,
      });
      await this._backend.send('set_light_config', {
        show_header: this._lightShowHeader,
      });
      await this._backend.send('set_weather', {
        show_header: this._weatherShowHeader,
      });
      const orderedDashCovers = this._coverDashboardOrder.filter((id) =>
        this._coverDashboardEntities.includes(id),
      );
      await this._backend.send('set_cover_config', {
        show_header: this._coverShowHeader,
        dashboard_entities: orderedDashCovers,
        presets: this._coverPresets,
      });
      if (!this._mounted) return;
      this._showToast();
      bus.emit('dashboard-config-changed', undefined);
      bus.emit('light-config-changed', undefined);
      bus.emit('weather-config-changed', undefined);
      bus.emit('cover-config-changed', undefined);
    } catch {
      this._showToast(true);
    } finally {
      this._saving = false;
    }
  }

  private async _loadDashboardConfig(): Promise<void> {
    if (!this._backend) return;
    try {
      const result = await this._backend.send<{
        dashboard: { enabled_cards: string[] };
      }>('get_config');
      if (result?.dashboard) {
        this._dashboardEnabledCards = result.dashboard.enabled_cards ?? ['weather'];
      }
    } catch { /* ignore */ }
  }

  private _renderDashboardPreview() {
    const enabled = new Set(this._dashboardEnabledCards);

    return html`
      <div class="preview-dashboard">
        <div class="preview-dashboard-cards">
          ${enabled.has('title') ? html`
            <div class="preview-dashboard-card title">
              <span style="font-size:11px;font-weight:700;color:var(--t1);">${this._titleText || t('config.title_title_placeholder')}</span>
            </div>
          ` : nothing}
          ${enabled.has('weather') ? html`
            <div class="preview-dashboard-card weather">
              <ha-icon .icon=${'mdi:weather-partly-cloudy'}></ha-icon>
              <span>${t('weather.title')}</span>
            </div>
          ` : nothing}
          ${enabled.has('light') ? html`
            <div class="preview-dashboard-card light">
              <ha-icon .icon=${'mdi:lightbulb-group'}></ha-icon>
              <span>${t('light.title')}</span>
            </div>
          ` : nothing}
          ${enabled.has('cover') ? html`
            <div class="preview-dashboard-card cover">
              <ha-icon .icon=${'mdi:blinds'}></ha-icon>
              <span>${t('cover.title')}</span>
            </div>
          ` : nothing}
          ${enabled.size === 0 ? html`<div class="preview-dashboard-empty">—</div>` : nothing}
        </div>
        <div class="preview-dashboard-navbar">
          <ha-icon .icon=${'mdi:sofa'}></ha-icon>
          <ha-icon .icon=${'mdi:stove'}></ha-icon>
          <ha-icon .icon=${'mdi:bed'}></ha-icon>
        </div>
      </div>
    `;
  }

  private _renderDashboardTab() {
    const CARDS = [
      { key: 'title', icon: 'mdi:format-title', nameKey: 'config.dashboard_card_title' as const, descKey: 'config.dashboard_card_title_desc' as const },
      { key: 'weather', icon: 'mdi:weather-partly-cloudy', nameKey: 'config.dashboard_card_weather' as const, descKey: 'config.dashboard_card_weather_desc' as const },
      { key: 'light', icon: 'mdi:lightbulb-group', nameKey: 'config.dashboard_card_light' as const, descKey: 'config.dashboard_card_light_desc' as const },
      { key: 'cover', icon: 'mdi:blinds', nameKey: 'config.dashboard_card_cover' as const, descKey: 'config.dashboard_card_cover_desc' as const },
      { key: 'spotify', icon: 'mdi:spotify', nameKey: 'config.dashboard_card_spotify' as const, descKey: 'config.dashboard_card_spotify_desc' as const },
    ];

    const enabledSet = new Set(this._dashboardEnabledCards);

    return html`
      <div class="tab-panel" id="panel-dashboard">
        <div class="section-label">${t('config.dashboard_title')}</div>
        <div class="section-desc">${t('config.dashboard_desc')}</div>
        <div class="feature-list">
          ${CARDS.map((c) => {
            const enabled = enabledSet.has(c.key);
            return html`
              <button
                class="feature-row"
                @click=${() => this._toggleDashboardCard(c.key)}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${c.icon}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${t(c.nameKey)}</div>
                  <div class="feature-desc">${t(c.descKey)}</div>
                </div>
                <span
                  class="toggle ${enabled ? 'on' : ''}"
                  role="switch"
                  aria-checked=${enabled ? 'true' : 'false'}
                  aria-label="${enabled ? t('common.hide') : t('common.show')} ${t(c.nameKey)}"
                ></span>
              </button>
              ${c.key === 'light' ? html`
                <div class="feature-sub ${enabled ? 'open' : ''}">
                  <div class="feature-sub-inner">
                    <div class="feature-sub-content">
                      <button
                        class="feature-row"
                        @click=${(e: Event) => { e.stopPropagation(); this._lightShowHeader = !this._lightShowHeader; }}
                      >
                        <div class="feature-icon">
                          <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
                        </div>
                        <div class="feature-text">
                          <div class="feature-name">${t('config.light_show_header')}</div>
                          <div class="feature-desc">${t('config.light_show_header_desc')}</div>
                        </div>
                        <span
                          class="toggle ${this._lightShowHeader ? 'on' : ''}"
                          role="switch"
                          aria-checked=${this._lightShowHeader ? 'true' : 'false'}
                        ></span>
                      </button>
                    </div>
                  </div>
                </div>
              ` : nothing}
              ${c.key === 'weather' ? html`
                <div class="feature-sub ${enabled ? 'open' : ''}">
                  <div class="feature-sub-inner">
                    <div class="feature-sub-content">
                      <button
                        class="feature-row"
                        @click=${(e: Event) => { e.stopPropagation(); this._weatherShowHeader = !this._weatherShowHeader; }}
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
                          role="switch"
                          aria-checked=${this._weatherShowHeader ? 'true' : 'false'}
                        ></span>
                      </button>
                    </div>
                  </div>
                </div>
              ` : nothing}
              ${c.key === 'cover' ? html`
                <div class="feature-sub ${enabled ? 'open' : ''}">
                  <div class="feature-sub-inner">
                    <div class="feature-sub-content">
                      <button
                        class="feature-row"
                        @click=${(e: Event) => { e.stopPropagation(); this._coverShowHeader = !this._coverShowHeader; }}
                      >
                        <div class="feature-icon">
                          <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
                        </div>
                        <div class="feature-text">
                          <div class="feature-name">${t('config.cover_show_header')}</div>
                          <div class="feature-desc">${t('config.cover_show_header_desc')}</div>
                        </div>
                        <span
                          class="toggle ${this._coverShowHeader ? 'on' : ''}"
                          role="switch"
                          aria-checked=${this._coverShowHeader ? 'true' : 'false'}
                        ></span>
                      </button>
                      <div class="section-label" style="margin-top:10px;">${t('config.cover_dashboard_entities')}</div>
                      <div class="section-desc">${t('config.cover_dashboard_entities_desc')}</div>
                      <div class="item-list">
                        ${this._coverDashboardOrder.map((entityId, idx) => {
                          const allCovers = this._getAllCoverEntities();
                          const cv = allCovers.find((c) => c.entityId === entityId);
                          if (!cv) return nothing;
                          const sel = this._coverDashboardEntities.includes(cv.entityId);
                          const isDragging = this._dragIdx === idx && this._dragContext === 'dashboard_covers';
                          const isDropTarget = this._dropIdx === idx && this._dragContext === 'dashboard_covers';
                          const rowClasses = [
                            'item-row',
                            !sel ? 'disabled' : '',
                            isDragging ? 'dragging' : '',
                            isDropTarget ? 'drop-target' : '',
                          ].filter(Boolean).join(' ');
                          return html`
                            <div
                              class=${rowClasses}
                              draggable="true"
                              @dragstart=${() => this._onDragStart(idx, 'dashboard_covers')}
                              @dragover=${(ev: DragEvent) => this._onDragOver(idx, ev)}
                              @dragleave=${() => this._onDragLeave()}
                              @drop=${(ev: DragEvent) => this._onDropDashboardCover(idx, ev)}
                              @dragend=${() => this._onDragEnd()}
                            >
                              <span class="drag-handle">
                                <ha-icon .icon=${'mdi:drag'}></ha-icon>
                              </span>
                              <div class="item-info">
                                <span class="item-name">${cv.name}</span>
                                <span class="item-meta">${cv.entityId}</span>
                              </div>
                              <button
                                class="toggle ${sel ? 'on' : ''}"
                                @click=${(e: Event) => { e.stopPropagation(); this._toggleCoverDashboardEntity(cv.entityId); }}
                                role="switch"
                                aria-checked=${sel ? 'true' : 'false'}
                                aria-label="${sel ? t('common.hide') : t('common.show')} ${cv.name}"
                              ></button>
                            </div>
                          `;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ` : nothing}
            `;
          })}
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${() => this._loadDashboardConfig()}>${t('common.reset')}</button>
          <button
            class="btn btn-accent"
            @click=${() => this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving ? t('common.saving') : t('common.save')}
          </button>
        </div>
      </div>
    `;
  }

  // — Weather config —

  private _toggleWeatherMetric(metric: string) {
    const set = new Set(this._weatherHiddenMetrics);
    if (set.has(metric)) set.delete(metric);
    else set.add(metric);
    this._weatherHiddenMetrics = [...set];
  }

  private _selectWeatherEntity(entityId: string) {
    this._weatherEntity = entityId;
    this._weatherDropdownOpen = false;
  }

  private async _saveWeather() {
    if (!this._backend || this._saving) return;
    this._saving = true;
    try {
      await this._backend.send('set_weather', {
        ...(this._weatherEntity ? { entity_id: this._weatherEntity } : {}),
        hidden_metrics: this._weatherHiddenMetrics,
        show_daily: this._weatherShowDaily,
        show_hourly: this._weatherShowHourly,
        show_header: this._weatherShowHeader,
      });
      if (!this._mounted) return;
      this._showToast();
      bus.emit('weather-config-changed', undefined);
    } catch {
      this._showToast(true);
    } finally {
      this._saving = false;
    }
  }

  private _renderWeatherPreview() {
    if (!this._weatherEntity || !this.hass) {
      return html`<div class="preview-empty">${t('config.weather_select_entity')}</div>`;
    }

    const entity = this.hass.states[this._weatherEntity];
    if (!entity) {
      return html`<div class="preview-empty">${t('config.weather_select_entity')}</div>`;
    }

    const attrs = entity.attributes;
    const temp = attrs.temperature ?? '--';
    const tempUnit = (attrs.temperature_unit as string | undefined) ?? '°C';
    const hidden = new Set(this._weatherHiddenMetrics);
    const condKey = entity.state || 'sunny';

    const condIcons: Record<string, string> = {
      'sunny': 'mdi:weather-sunny', 'clear-night': 'mdi:weather-night',
      'partlycloudy': 'mdi:weather-partly-cloudy', 'cloudy': 'mdi:weather-cloudy',
      'fog': 'mdi:weather-fog', 'rainy': 'mdi:weather-rainy',
      'pouring': 'mdi:weather-pouring', 'snowy': 'mdi:weather-snowy',
      'windy': 'mdi:weather-windy', 'lightning': 'mdi:weather-lightning',
    };
    const condNames: Record<string, string> = {
      'sunny': 'weather.cond_sunny', 'clear-night': 'weather.cond_clear_night',
      'partlycloudy': 'weather.cond_partly_cloudy', 'cloudy': 'weather.cond_cloudy',
      'fog': 'weather.cond_foggy', 'rainy': 'weather.cond_rainy',
      'pouring': 'weather.cond_pouring', 'snowy': 'weather.cond_snowy',
      'windy': 'weather.cond_windy', 'lightning': 'weather.cond_lightning',
    };
    const condTints: Record<string, string> = {
      'sunny': '#fbbf24', 'clear-night': '#6366f1', 'partlycloudy': '#94a3b8',
      'cloudy': '#64748b', 'fog': '#94a3b8', 'rainy': '#3b82f6',
      'pouring': '#2563eb', 'snowy': '#e2e8f0', 'windy': '#6ee7b3',
      'lightning': '#a78bfa',
    };
    const condSparkStrokes: Record<string, string> = {
      'sunny': 'rgba(251,191,36,0.8)', 'clear-night': 'rgba(129,140,248,0.7)',
      'partlycloudy': 'rgba(148,163,184,0.6)', 'cloudy': 'rgba(100,116,139,0.6)',
      'fog': 'rgba(148,163,184,0.5)', 'rainy': 'rgba(96,165,250,0.7)',
      'pouring': 'rgba(59,130,246,0.8)', 'snowy': 'rgba(226,232,240,0.7)',
      'windy': 'rgba(110,231,179,0.6)', 'lightning': 'rgba(167,139,250,0.8)',
    };
    const condIcon = condIcons[condKey] || 'mdi:weather-cloudy';
    const condText = t((condNames[condKey] || 'weather.cond_cloudy') as Parameters<typeof t>[0]);
    const tintColor = condTints[condKey] || '#64748b';
    const sparkStroke = condSparkStrokes[condKey] || 'rgba(148,163,184,0.6)';

    // Time
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const secStr = String(now.getSeconds()).padStart(2, '0');
    const dateStr = now.toLocaleDateString(this.hass.language || 'fr', { weekday: 'long', day: 'numeric', month: 'long' });

    // Feels like
    const feelsLike = attrs.apparent_temperature ?? null;

    // Sparkline SVG — fake curve based on temperature
    const baseTemp = typeof temp === 'number' ? temp : 12;
    const sparkPoints = [0, 0.5, 1.2, 0.8, -0.3, -1, -0.5, 0.2, 0.7, 1.5];
    const sparkW = 348;
    const sparkH = 44;
    const sparkPad = 6;
    const minV = Math.min(...sparkPoints);
    const maxV = Math.max(...sparkPoints);
    const rangeV = maxV - minV || 1;
    const pts = sparkPoints.map((v, i) => ({
      x: (i / (sparkPoints.length - 1)) * sparkW,
      y: sparkPad + (1 - (v - minV) / rangeV) * (sparkH - sparkPad * 2),
    }));
    // Catmull-Rom to cubic bezier
    let pathD = `M${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(pts.length - 1, i + 2)];
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      pathD += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    const areaD = pathD + ` L${sparkW},${sparkH} L0,${sparkH} Z`;
    // Now marker position (~30% from left)
    const nowFrac = 0.3;
    const nowIdx = nowFrac * (sparkPoints.length - 1);
    const nowIdxFloor = Math.floor(nowIdx);
    const nowIdxCeil = Math.min(sparkPoints.length - 1, nowIdxFloor + 1);
    const nowLerp = nowIdx - nowIdxFloor;
    const nowV = sparkPoints[nowIdxFloor] + (sparkPoints[nowIdxCeil] - sparkPoints[nowIdxFloor]) * nowLerp;
    const nowY = sparkPad + (1 - (nowV - minV) / rangeV) * (sparkH - sparkPad * 2);
    // Hour labels
    const currentHour = now.getHours();
    const sparkLabels = sparkPoints.map((_, i) => {
      const h = (currentHour + i) % 24;
      return `${String(h).padStart(2, '0')}h`;
    });

    // Metrics
    type Metric = { key: string; icon: string; val: string; unit?: string; dir?: string };
    const metrics: Metric[] = [];
    if (!hidden.has('humidity') && attrs.humidity != null) metrics.push({ key: 'humidity', icon: 'mdi:water-percent', val: `${attrs.humidity}`, unit: '%' });
    if (!hidden.has('wind') && attrs.wind_speed != null) {
      const dir = typeof attrs.wind_bearing === 'number' ? this._windBearingToDir(attrs.wind_bearing as number) : undefined;
      metrics.push({ key: 'wind', icon: 'mdi:weather-windy', val: `${Math.round(attrs.wind_speed as number)}`, unit: 'km/h', dir });
    }
    if (!hidden.has('pressure') && attrs.pressure != null) metrics.push({ key: 'pressure', icon: 'mdi:gauge', val: `${Math.round(attrs.pressure as number)}`, unit: 'hPa' });
    if (!hidden.has('uv') && attrs.uv_index != null) metrics.push({ key: 'uv', icon: 'mdi:sun-wireless', val: `${Math.round(attrs.uv_index as number)}`, unit: 'UV' });
    if (!hidden.has('visibility') && attrs.visibility != null) metrics.push({ key: 'visibility', icon: 'mdi:eye-outline', val: `${attrs.visibility}`, unit: 'km' });
    if (!hidden.has('sunrise')) {
      const sunState = this.hass.states['sun.sun'];
      const nextRising = sunState?.attributes.next_rising as string | undefined;
      metrics.push({ key: 'sunrise', icon: 'mdi:weather-sunset-up', val: nextRising ? new Date(nextRising).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--' });
    }
    if (!hidden.has('sunset')) {
      const sunState = this.hass.states['sun.sun'];
      const nextSetting = sunState?.attributes.next_setting as string | undefined;
      metrics.push({ key: 'sunset', icon: 'mdi:weather-sunset-down', val: nextSetting ? new Date(nextSetting).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--' });
    }

    const cols = 3;

    // Fake forecast data — use Intl for locale-aware day names
    const lang = this.hass.language || 'fr';
    const dayNames = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(2024, 0, i + 1); // Mon=1 Jan 2024
      return new Intl.DateTimeFormat(lang, { weekday: 'short' }).format(d);
    });
    const fakeDailyIcons = ['mdi:weather-sunny', 'mdi:weather-partly-cloudy', 'mdi:weather-cloudy', 'mdi:weather-rainy', 'mdi:weather-partly-cloudy', 'mdi:weather-sunny', 'mdi:weather-cloudy'];
    const fakeDailyHighs = [baseTemp + 2, baseTemp + 1, baseTemp, baseTemp - 1, baseTemp + 1, baseTemp + 3, baseTemp];
    const fakeDailyLows = [baseTemp - 4, baseTemp - 3, baseTemp - 5, baseTemp - 6, baseTemp - 4, baseTemp - 2, baseTemp - 5];
    const fakePrecip = [0, 10, 30, 60, 20, 0, 15];
    const todayDow = now.getDay();

    return html`
      <div class="preview-weather-wrap">
        ${this._weatherShowHeader ? html`
          <div class="pw-card-header">
            <span class="pw-card-title">${t('weather.title')}</span>
            <span class="pw-card-location">${entity.attributes.friendly_name ?? ''}</span>
          </div>
        ` : nothing}
      <div class="preview-weather">
        <div class="pw-tint" style="background: radial-gradient(80% 20% at 75% 15%, ${tintColor}22 0%, transparent 70%);"></div>
        <div class="pw-content">
          <div class="pw-header">
            <div class="pw-header-left">
              <span class="pw-time">${timeStr}<span class="pw-sec">:${secStr}</span></span>
              <span class="pw-date">${dateStr}</span>
            </div>
            <div class="pw-header-right">
              <span class="pw-temp">${temp}<span class="pw-temp-unit">${tempUnit}</span></span>
              <span class="pw-cond"><ha-icon .icon=${condIcon}></ha-icon>${condText}</span>
              ${feelsLike != null ? html`<span class="pw-feels">${t('weather.feels_like', { temp: String(Math.round(feelsLike as number)) })}</span>` : nothing}
            </div>
          </div>

          <div class="pw-spark-zone">
            <svg class="pw-spark-svg" viewBox="0 0 ${sparkW} ${sparkH}" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pw-spark-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="${sparkStroke}" stop-opacity="0.3"/>
                  <stop offset="100%" stop-color="${sparkStroke}" stop-opacity="0"/>
                </linearGradient>
              </defs>
              <path d="${areaD}" fill="url(#pw-spark-fill)"/>
              <path d="${pathD}" fill="none" stroke="${sparkStroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="pw-spark-now" style="left: ${nowFrac * 100}%;">
              <div class="pw-spark-now-dot" style="top: ${(nowY / sparkH) * 100}%;"></div>
            </div>
            <div class="pw-spark-labels">
              ${sparkLabels.map((lbl, i) => i % 2 === 0 || i === sparkLabels.length - 1
                ? html`<span class="pw-spark-lbl" style="left: ${(i / (sparkLabels.length - 1)) * 100}%;">${lbl}</span>`
                : nothing
              )}
            </div>
          </div>

          ${metrics.length > 0 ? html`
            <div class="pw-metrics" style="grid-template-columns: repeat(${cols}, 1fr);">
              ${metrics.map((m) => html`
                <div class="pw-metric ${m.key}">
                  <ha-icon .icon=${m.icon}></ha-icon>
                  <span class="pw-metric-val">${m.val}</span>
                  ${m.unit ? html`<span class="pw-metric-unit">${m.unit}</span>` : nothing}
                  ${m.dir ? html`<span class="pw-metric-dir">${m.dir}</span>` : nothing}
                </div>
              `)}
            </div>
          ` : nothing}

          ${this._weatherShowDaily || this._weatherShowHourly ? html`
            <div class="pw-forecast-zone">
              <div class="pw-tabs">
                ${this._weatherShowDaily ? html`<span class="pw-tab active">${t('weather.daily_tab')}</span>` : nothing}
                ${this._weatherShowHourly ? html`<span class="pw-tab">${t('weather.hourly_tab')}</span>` : nothing}
              </div>
              <div class="pw-fold-sep"></div>
              ${this._weatherShowDaily ? html`
                <div class="pw-daily-list">
                  ${fakeDailyIcons.slice(0, 5).map((icon, i) => {
                    const dayIdx = (todayDow + i) % 7;
                    const label = i === 0 ? t('weather.today') : dayNames[dayIdx];
                    const high = Math.round(fakeDailyHighs[i]);
                    const low = Math.round(fakeDailyLows[i]);
                    const precip = fakePrecip[i];
                    return html`
                      <div class="pw-day-row ${i === 0 ? 'today' : ''}">
                        <span class="pw-day-label">${label}</span>
                        <ha-icon class="pw-day-icon" .icon=${icon}></ha-icon>
                        <span class="pw-day-temps"><span class="pw-day-high">${high}°</span><span class="pw-day-low">${low}°</span></span>
                        ${precip > 0 ? html`<span class="pw-day-precip">${precip}%</span>` : html`<span class="pw-day-precip"></span>`}
                      </div>
                    `;
                  })}
                </div>
              ` : nothing}
            </div>
          ` : nothing}
        </div>
      </div>
      </div>
    `;
  }

  private _windBearingToDir(bearing: number): string {
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
    return dirs[Math.round(bearing / 45) % 8];
  }

  private _renderWeatherTab() {
    const weatherEntities = this.hass
      ? Object.keys(this.hass.states).filter((id) => id.startsWith('weather.')).sort()
      : [];
    const selectedEntity = weatherEntities.find((id) => id === this._weatherEntity);

    const METRICS = [
      { key: 'humidity', icon: 'mdi:water-percent', nameKey: 'config.weather_metric_humidity' as const },
      { key: 'wind', icon: 'mdi:weather-windy', nameKey: 'config.weather_metric_wind' as const },
      { key: 'pressure', icon: 'mdi:gauge', nameKey: 'config.weather_metric_pressure' as const },
      { key: 'uv', icon: 'mdi:white-balance-sunny', nameKey: 'config.weather_metric_uv' as const },
      { key: 'visibility', icon: 'mdi:eye', nameKey: 'config.weather_metric_visibility' as const },
      { key: 'sunrise', icon: 'mdi:weather-sunset-up', nameKey: 'config.weather_metric_sunrise' as const },
      { key: 'sunset', icon: 'mdi:weather-sunset-down', nameKey: 'config.weather_metric_sunset' as const },
    ];

    const hiddenSet = new Set(this._weatherHiddenMetrics);

    return html`
      <div class="tab-panel" id="panel-weather">
        <div class="section-label">${t('config.navbar_behavior')}</div>
        <div class="feature-list">
          <button
            class="feature-row"
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
              role="switch"
              aria-checked=${this._weatherShowHeader ? 'true' : 'false'}
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
                  @click=${() => this._selectWeatherEntity(id)}
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
                @click=${() => this._toggleWeatherMetric(m.key)}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${m.icon}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${t(m.nameKey)}</div>
                </div>
                <span
                  class="toggle ${visible ? 'on' : ''}"
                  role="switch"
                  aria-checked=${visible ? 'true' : 'false'}
                  aria-label="${visible ? t('common.hide') : t('common.show')} ${t(m.nameKey)}"
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
              role="switch"
              aria-checked=${this._weatherShowDaily ? 'true' : 'false'}
              aria-label="${this._weatherShowDaily ? t('common.hide') : t('common.show')} ${t('config.weather_daily')}"
            ></span>
          </button>
          <button
            class="feature-row"
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
              role="switch"
              aria-checked=${this._weatherShowHourly ? 'true' : 'false'}
              aria-label="${this._weatherShowHourly ? t('common.hide') : t('common.show')} ${t('config.weather_hourly')}"
            ></span>
          </button>
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${() => this._loadWeatherConfig()}>${t('common.reset')}</button>
          <button
            class="btn btn-accent"
            @click=${() => this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving ? t('common.saving') : t('common.save')}
          </button>
        </div>
      </div>
    `;
  }

  private async _loadWeatherConfig(): Promise<void> {
    if (!this._backend) return;
    try {
      const result = await this._backend.send<{
        weather: { entity_id: string; hidden_metrics: string[]; show_daily: boolean; show_hourly: boolean; show_header: boolean };
      }>('get_config');
      if (result?.weather) {
        this._weatherEntity = result.weather.entity_id ?? '';
        this._weatherHiddenMetrics = result.weather.hidden_metrics ?? [];
        this._weatherShowDaily = result.weather.show_daily ?? true;
        this._weatherShowHourly = result.weather.show_hourly ?? true;
        this._weatherShowHeader = result.weather.show_header ?? true;
      }
    } catch { /* ignore */ }
  }

  // — Spotify card config —

  private async _checkSpotifyStatus() {
    if (!this._backend) return;
    try {
      const result = await this._backend.send<{ configured: boolean }>('spotify_status');
      if (!this._mounted) return;
      this._spotifyConfigured = result?.configured ?? false;
    } catch {
      this._spotifyConfigured = false;
    }
  }

  private async _saveSpotify() {
    if (!this._backend || this._saving) return;
    this._saving = true;
    try {
      await this._backend.send('set_spotify_config', {
        show_header: this._spotifyShowHeader,
        entity_id: this._spotifyEntity,
        sort_order: this._spotifySortOrder,
        max_items_per_section: this._spotifyMaxItems,
      });
      if (!this._mounted) return;
      this._showToast();
      bus.emit('spotify-config-changed', undefined);
    } catch {
      this._showToast(true);
    } finally {
      this._saving = false;
    }
  }

  private async _loadSpotifyConfig(): Promise<void> {
    if (!this._backend) return;
    try {
      const result = await this._backend.send<{
        spotify_card: { show_header: boolean; entity_id: string; sort_order: string; max_items_per_section: number };
      }>('get_config');
      if (result?.spotify_card) {
        this._spotifyShowHeader = result.spotify_card.show_header ?? true;
        this._spotifyEntity = result.spotify_card.entity_id ?? '';
        this._spotifySortOrder = result.spotify_card.sort_order === 'oldest_first' ? 'oldest_first' : 'recent_first';
        this._spotifyMaxItems = result.spotify_card.max_items_per_section ?? 6;
      }
    } catch { /* ignore */ }
  }

  private _selectSpotifyEntity(entityId: string) {
    this._spotifyEntity = entityId;
    this._spotifyDropdownOpen = false;
  }

  private _renderSpotifyPreview() {
    if (this._spotifyConfigured === false) {
      return html`<div class="preview-empty">${t('config.spotify_not_configured')}</div>`;
    }
    if (!this._spotifyEntity || !this.hass) {
      return html`<div class="preview-empty">${t('config.spotify_select_entity')}</div>`;
    }

    const entity = this.hass.states[this._spotifyEntity];
    if (!entity) {
      return html`<div class="preview-empty">${t('config.spotify_select_entity')}</div>`;
    }

    const attrs = entity.attributes;
    const title = (attrs.media_title as string | undefined) ?? '—';
    const artist = (attrs.media_artist as string | undefined) ?? '—';
    const albumArt = attrs.entity_picture as string | undefined;
    const isPlaying = entity.state === 'playing';

    return html`
      <div class="preview-spotify" style="
        display: flex; align-items: center; gap: 12px;
        padding: 16px; border-radius: var(--radius-lg);
        background: var(--s2); border: 1px solid var(--b1);
      ">
        ${albumArt
          ? html`<img src=${albumArt} alt="" style="
              width: 56px; height: 56px; border-radius: var(--radius-md);
              object-fit: cover; flex-shrink: 0;
            " />`
          : html`<div style="
              width: 56px; height: 56px; border-radius: var(--radius-md);
              background: var(--s3); display: flex; align-items: center; justify-content: center;
              flex-shrink: 0;
            "><ha-icon .icon=${'mdi:spotify'} style="color: #1DB954; --mdc-icon-size: 28px;"></ha-icon></div>`}
        <div style="min-width: 0; flex: 1;">
          <div style="font-size: 14px; font-weight: 600; color: var(--t1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${title}</div>
          <div style="font-size: 12px; color: var(--t3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${artist}</div>
        </div>
        <ha-icon .icon=${isPlaying ? 'mdi:pause-circle' : 'mdi:play-circle'} style="
          color: #1DB954; --mdc-icon-size: 32px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        "></ha-icon>
      </div>
    `;
  }

  private _renderSpotifySetupGuide() {
    return html`
      <div class="tab-panel" id="panel-spotify">
        <div style="
          padding: 20px; border-radius: var(--radius-lg);
          background: var(--s2); border: 1px solid var(--b2);
          text-align: center;
        ">
          <ha-icon .icon=${'mdi:spotify'} style="
            color: #1DB954; --mdc-icon-size: 48px;
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 16px;
          "></ha-icon>
          <div style="font-size: 16px; font-weight: 600; color: var(--t1); margin-bottom: 8px;">
            ${t('config.spotify_not_configured')}
          </div>
          <div style="font-size: 13px; color: var(--t3); margin-bottom: 20px; line-height: 1.5;">
            ${t('config.spotify_setup_guide')}
          </div>

          <div style="text-align: left; padding: 0 8px;">
            ${[1, 2, 3, 4].map((n) => html`
              <div style="
                display: flex; align-items: flex-start; gap: 10px;
                margin-bottom: 12px; font-size: 13px; color: var(--t2);
              ">
                <span style="
                  flex-shrink: 0; width: 22px; height: 22px;
                  border-radius: 50%; background: var(--s3);
                  display: flex; align-items: center; justify-content: center;
                  font-size: 12px; font-weight: 600; color: var(--t1);
                ">${n}</span>
                <span style="line-height: 22px;">
                  ${t(`config.spotify_setup_step${n}` as Parameters<typeof t>[0])}
                </span>
              </div>
            `)}
          </div>

          <div style="
            font-size: 12px; color: var(--t3); margin-top: 16px;
            padding: 10px; border-radius: var(--radius-md);
            background: var(--s1); border: 1px solid var(--b1);
          ">
            ${t('config.spotify_setup_note')}
          </div>

          <button
            class="btn btn-accent"
            style="margin-top: 20px;"
            @click=${() => { window.open('/config/integrations/dashboard', '_blank'); }}
          >
            <ha-icon .icon=${'mdi:cog'} style="--mdc-icon-size: 16px; display: flex; align-items: center; justify-content: center;"></ha-icon>
            ${t('config.spotify_open_settings')}
          </button>
        </div>
      </div>
    `;
  }

  private _renderSpotifyTab() {
    if (this._spotifyConfigured === null) {
      return html`<div class="tab-panel" id="panel-spotify">
        <div class="preview-empty">${t('config.spotify_checking')}</div>
      </div>`;
    }
    if (this._spotifyConfigured === false) {
      return this._renderSpotifySetupGuide();
    }

    const mediaPlayerEntities = this.hass
      ? Object.keys(this.hass.states).filter((id) => id.startsWith('media_player.')).sort()
      : [];
    const selectedEntity = mediaPlayerEntities.find((id) => id === this._spotifyEntity);

    return html`
      <div class="tab-panel" id="panel-spotify">
        <div class="section-label">${t('config.spotify_show_header')}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            @click=${() => { this._spotifyShowHeader = !this._spotifyShowHeader; }}
          >
            <div class="feature-icon">
              <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${t('config.spotify_show_header')}</div>
              <div class="feature-desc">${t('config.spotify_show_header_desc')}</div>
            </div>
            <span
              class="toggle ${this._spotifyShowHeader ? 'on' : ''}"
              role="switch"
              aria-checked=${this._spotifyShowHeader ? 'true' : 'false'}
            ></span>
          </button>
        </div>

        <div class="section-label">${t('config.spotify_entity')}</div>
        <div class="section-desc">${t('config.spotify_entity_desc')}</div>
        <div class="dropdown ${this._spotifyDropdownOpen ? 'open' : ''}">
          <button
            class="dropdown-trigger"
            @click=${() => (this._spotifyDropdownOpen = !this._spotifyDropdownOpen)}
            aria-expanded=${this._spotifyDropdownOpen ? 'true' : 'false'}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${'mdi:spotify'} style="color: #1DB954;"></ha-icon>
            <span>${selectedEntity || t('common.select')}</span>
            <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${mediaPlayerEntities.map(
              (id) => html`
                <button
                  class="dropdown-item ${id === this._spotifyEntity ? 'active' : ''}"
                  role="option"
                  aria-selected=${id === this._spotifyEntity ? 'true' : 'false'}
                  @click=${() => this._selectSpotifyEntity(id)}
                >
                  <ha-icon .icon=${'mdi:speaker'}></ha-icon>
                  ${id}
                </button>
              `,
            )}
          </div>
        </div>

        <div class="section-label">${t('config.spotify_sort_order')}</div>
        <div class="section-desc">${t('config.spotify_sort_order_desc')}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            @click=${() => { this._spotifySortOrder = 'recent_first'; }}
          >
            <div class="feature-icon">
              <ha-icon .icon=${'mdi:sort-clock-descending'}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${t('config.spotify_sort_recent')}</div>
            </div>
            <span
              class="toggle ${this._spotifySortOrder === 'recent_first' ? 'on' : ''}"
              role="switch"
              aria-checked=${this._spotifySortOrder === 'recent_first' ? 'true' : 'false'}
            ></span>
          </button>
          <button
            class="feature-row"
            @click=${() => { this._spotifySortOrder = 'oldest_first'; }}
          >
            <div class="feature-icon">
              <ha-icon .icon=${'mdi:sort-clock-ascending'}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${t('config.spotify_sort_oldest')}</div>
            </div>
            <span
              class="toggle ${this._spotifySortOrder === 'oldest_first' ? 'on' : ''}"
              role="switch"
              aria-checked=${this._spotifySortOrder === 'oldest_first' ? 'true' : 'false'}
            ></span>
          </button>
        </div>

        <div class="section-label">${t('config.spotify_max_items')}</div>
        <div class="section-desc">${t('config.spotify_max_items_desc')}</div>
        <div style="display: flex; align-items: center; gap: 12px; padding: 4px 0;">
          <input
            type="range"
            min="1"
            max="20"
            .value=${String(this._spotifyMaxItems)}
            @input=${(e: Event) => { this._spotifyMaxItems = parseInt((e.target as HTMLInputElement).value, 10); }}
            style="flex: 1; accent-color: #1DB954;"
          />
          <span style="
            font-size: 13px; font-weight: 600; color: var(--t1);
            min-width: 28px; text-align: center;
          ">${this._spotifyMaxItems}</span>
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${() => this._loadSpotifyConfig()}>${t('common.reset')}</button>
          <button
            class="btn btn-accent"
            @click=${() => this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving ? t('common.saving') : t('common.save')}
          </button>
        </div>
      </div>
    `;
  }

  // — Title card config —

  private async _saveTitle() {
    if (!this._backend || this._saving) return;
    this._saving = true;
    try {
      await this._backend.send('set_title_config', {
        title: this._titleText,
        mode_entity: this._titleModeEntity || null,
        modes: this._titleModes,
      });
      if (!this._mounted) return;
      this._showToast();
      bus.emit('title-config-changed', undefined);
    } catch {
      this._showToast(true);
    } finally {
      this._saving = false;
    }
  }

  private async _loadTitleConfig(): Promise<void> {
    if (!this._backend) return;
    try {
      const result = await this._backend.send<{
        title_card: { title: string; mode_entity: string; modes: { id: string; label: string; icon: string; color: string }[] };
      }>('get_config');
      if (result?.title_card) {
        this._titleText = result.title_card.title ?? '';
        this._titleModeEntity = result.title_card.mode_entity ?? '';
        this._titleModes = result.title_card.modes ?? [];
      }
    } catch { /* ignore */ }
  }

  private _selectTitleModeEntity(entityId: string) {
    this._titleModeEntity = entityId;
    this._titleModeDropdownOpen = false;
    // Auto-populate modes from input_select options or scene entity
    if (entityId.startsWith('input_select.') && this.hass) {
      const entity = this.hass.states[entityId];
      if (entity) {
        const options = (entity.attributes.options as string[] | undefined) ?? [];
        const existingMap = new Map(this._titleModes.map((m) => [m.id, m]));
        this._titleModes = options.map((opt) => existingMap.get(opt) ?? { id: opt, label: opt, icon: '', color: 'neutral' });
      }
    } else if (entityId.startsWith('input_boolean.') && this.hass) {
      const suffix = entityId.split('.')[1] ?? entityId;
      const entity = this.hass.states[entityId];
      const name = (entity?.attributes.friendly_name as string | undefined) || suffix;
      const existingMap = new Map(this._titleModes.map((m) => [m.id, m]));
      this._titleModes = [existingMap.get(suffix) ?? { id: suffix, label: name, icon: 'mdi:toggle-switch', color: 'success' }];
    } else if (entityId.startsWith('scene.') && this.hass) {
      const suffix = entityId.split('.')[1] ?? entityId;
      const entity = this.hass.states[entityId];
      const name = (entity?.attributes.friendly_name as string | undefined) || suffix;
      const existingMap = new Map(this._titleModes.map((m) => [m.id, m]));
      this._titleModes = [existingMap.get(suffix) ?? { id: suffix, label: name, icon: 'mdi:palette', color: 'accent' }];
    } else if (!entityId) {
      this._titleModes = [];
    }
  }

  private _updateTitleMode(idx: number, field: 'label' | 'icon' | 'color', value: string) {
    const modes = [...this._titleModes];
    if (!modes[idx]) return;
    modes[idx] = { ...modes[idx], [field]: value };
    this._titleModes = modes;
  }

  private _iconLoading = false;

  private async _openIconPopup(modeIdx: number) {
    if (this._iconLoading) return;
    if (this._iconList.length === 0) {
      this._iconLoading = true;
      // Try to get the full MDI list from HA via a temporary ha-icon-picker
      const picker = document.createElement('ha-icon-picker') as HTMLElement & { hass: unknown };
      picker.hass = this.hass;
      picker.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none';
      try {
        this.shadowRoot!.appendChild(picker);
        await new Promise((r) => setTimeout(r, 50));
        const gp = picker.shadowRoot?.querySelector('ha-generic-picker') as HTMLElement & { getItems(): Promise<{ id: string }[]> } | null;
        if (gp?.getItems) {
          const items = await gp.getItems();
          if (items?.length) {
            this._iconList = items.map((i) => i.id);
          }
        }
      } catch { /* ignore */ } finally {
        if (this.shadowRoot!.contains(picker)) {
          this.shadowRoot!.removeChild(picker);
        }
        this._iconLoading = false;
      }
    }
    if (modeIdx < this._titleModes.length) {
      this._iconSearch = '';
      this._iconPopupModeIdx = modeIdx;
    }
  }

  private _getFilteredIcons(): string[] {
    const query = this._iconSearch.toLowerCase().trim();
    const list = this._iconList;
    if (!query) return list.slice(0, 120);
    return list.filter((icon) => icon.toLowerCase().includes(query)).slice(0, 120);
  }

  private _renderIconPopup() {
    if (this._iconPopupModeIdx === null) return nothing;
    const icons = this._getFilteredIcons();
    const currentIcon = this._titleModes[this._iconPopupModeIdx]?.icon ?? '';

    return html`
      <div class="icon-popup-overlay" @click=${(e: Event) => { if (e.target === e.currentTarget) this._iconPopupModeIdx = null; }}>
        <div class="icon-popup">
          <div class="icon-popup-header">
            <span class="icon-popup-title">${t('config.title_mode_icon')}</span>
            <input
              class="icon-popup-search"
              type="text"
              placeholder=${'mdi:...'}
              .value=${this._iconSearch}
              @input=${(e: Event) => { this._iconSearch = (e.target as HTMLInputElement).value; }}
            />
          </div>
          <div class="icon-popup-grid-wrap">
            ${icons.length > 0 || !this._iconSearch ? html`
              <div class="icon-popup-grid">
                <button
                  class="icon-pick ${currentIcon === '' ? 'selected' : ''}"
                  @click=${() => {
                    this._updateTitleMode(this._iconPopupModeIdx!, 'icon', '');
                    this._iconPopupModeIdx = null;
                  }}
                  aria-label=${t('config.title_no_icon')}
                >
                  <ha-icon .icon=${'mdi:cancel'} style="opacity:0.4;"></ha-icon>
                </button>
                ${icons.map((icon) => html`
                  <button
                    class="icon-pick ${icon === currentIcon ? 'selected' : ''}"
                    @click=${() => {
                      this._updateTitleMode(this._iconPopupModeIdx!, 'icon', icon);
                      this._iconPopupModeIdx = null;
                    }}
                    aria-label=${icon}
                  >
                    <ha-icon .icon=${icon}></ha-icon>
                  </button>
                `)}
              </div>
            ` : html`<div class="icon-popup-empty">${t('config.title_no_icons_found')}</div>`}
          </div>
        </div>
      </div>
    `;
  }

  private _renderTitlePreview() {
    const title = this._titleText;
    if (!title) {
      return html`<div class="preview-empty">${t('config.title_title_placeholder')}</div>`;
    }

    // Get active mode if entity is configured
    let activeLabel = '';
    let activeIcon = '';
    let activeColor = 'neutral';
    if (this._titleModeEntity && this.hass) {
      const entity = this.hass.states[this._titleModeEntity];
      if (entity && this._titleModeEntity.startsWith('input_select.')) {
        const currentOption = entity.state;
        const modeConfig = this._titleModes.find((m) => m.id === currentOption);
        activeLabel = modeConfig?.label || currentOption;
        activeIcon = modeConfig?.icon || '';
        activeColor = modeConfig?.color || 'neutral';
      } else if (entity && this._titleModeEntity.startsWith('input_boolean.')) {
        const suffix = this._titleModeEntity.split('.')[1] ?? this._titleModeEntity;
        const modeConfig = this._titleModes.find((m) => m.id === suffix);
        activeLabel = modeConfig?.label || (entity.attributes.friendly_name as string | undefined) || suffix;
        activeIcon = modeConfig?.icon || '';
        activeColor = entity.state === 'on' ? (modeConfig?.color || 'success') : 'neutral';
      } else if (entity && this._titleModeEntity.startsWith('scene.')) {
        const suffix = this._titleModeEntity.split('.')[1] ?? this._titleModeEntity;
        const modeConfig = this._titleModes.find((m) => m.id === suffix);
        activeLabel = modeConfig?.label || (entity.attributes.friendly_name as string | undefined) || suffix;
        activeIcon = modeConfig?.icon || '';
        activeColor = modeConfig?.color || 'accent';
      }
    }

    const COLOR_MAP: Record<string, string> = {
      success: 'var(--c-success)', warning: 'var(--c-warning)',
      info: 'var(--c-info)', accent: 'var(--c-accent)',
      alert: 'var(--c-alert)', neutral: 'var(--t3)',
    };
    const DOT_MAP: Record<string, string> = {
      success: 'var(--c-success)', warning: 'var(--c-warning)',
      info: 'var(--c-info)', accent: 'var(--c-accent)',
      alert: 'var(--c-alert)', neutral: 'var(--t4)',
    };

    return html`
      <div class="preview-title-card">
        <div class="preview-title-text">${title}</div>
        ${activeLabel ? html`
          <div class="preview-title-mode">
            <div class="preview-title-dot" style="background:${DOT_MAP[activeColor] ?? (activeColor.startsWith('#') ? activeColor : 'var(--t4)')};"></div>
            ${activeIcon ? html`<ha-icon .icon=${activeIcon} style="--mdc-icon-size:12px;color:${COLOR_MAP[activeColor] ?? (activeColor.startsWith('#') ? activeColor : 'var(--t3)')};"></ha-icon>` : nothing}
            <span style="color:var(--t4);font-size:9px;">${this._titleModeEntity?.startsWith('scene.') ? t('title_card.scene_label') : t('title_card.mode_label')}</span>
            <span style="color:${COLOR_MAP[activeColor] ?? (activeColor.startsWith('#') ? activeColor : 'var(--t3)')};font-size:9px;font-weight:600;">${activeLabel}</span>
            <ha-icon .icon=${'mdi:chevron-right'} style="--mdc-icon-size:11px;color:var(--t4);"></ha-icon>
          </div>
        ` : nothing}
      </div>
    `;
  }

  // — Title color picker (chromatic wheel) —

  private _openColorPicker(modeIdx: number) {
    if (modeIdx >= this._titleModes.length) return;
    const currentColor = this._titleModes[modeIdx].color;
    if (currentColor.startsWith('#') && currentColor.length === 7) {
      this._colorPickerHex = currentColor;
      this._colorPickerPos = this._hexToWheelPos(currentColor);
    } else {
      this._colorPickerHex = '#ffffff';
      this._colorPickerPos = { x: 50, y: 50 };
    }
    this._colorPickerModeIdx = modeIdx;
    this.updateComplete.then(() => {
      const canvas = this.shadowRoot?.querySelector('.cp-wheel-wrap canvas') as HTMLCanvasElement | null;
      if (canvas) {
        this._cpCanvas = canvas;
        this._drawColorWheel(canvas);
      }
    });
  }

  private _closeColorPicker() {
    this._cancelColorDrag?.();
    this._cancelColorDrag = undefined;
    this._colorPickerModeIdx = null;
    this._cpCanvas = null;
  }

  private _applyColorPicker() {
    if (this._colorPickerModeIdx !== null && this._colorPickerModeIdx < this._titleModes.length) {
      this._updateTitleMode(this._colorPickerModeIdx, 'color', this._colorPickerHex);
    }
    this._closeColorPicker();
  }

  private _onCpWheel(e: MouseEvent | TouchEvent) {
    const canvas = this._cpCanvas;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left - rect.width / 2;
    const y = clientY - rect.top - rect.height / 2;
    const radius = rect.width / 2;
    const dist = Math.sqrt(x * x + y * y);
    if (dist > radius) return;
    const angle = Math.atan2(y, x);
    const hue = ((angle * 180 / Math.PI) % 360 + 360) % 360;
    const sat = Math.min(dist / radius, 1);
    const rgb = this._hslToRgb(hue, sat, 0.5);
    this._colorPickerHex = '#' + rgb.map((c) => c.toString(16).padStart(2, '0')).join('');
    this._colorPickerPos = { x: x / radius * 50 + 50, y: y / radius * 50 + 50 };
  }

  private _drawColorWheel(canvas: HTMLCanvasElement) {
    const size = 440;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const cx = size / 2, cy = size / 2, r = size / 2;
    for (let angle = 0; angle < 360; angle++) {
      const start = ((angle - 1) * Math.PI) / 180;
      const end = ((angle + 1) * Math.PI) / 180;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, `hsl(${angle}, 0%, 100%)`);
      grad.addColorStop(0.5, `hsl(${angle}, 100%, 50%)`);
      grad.addColorStop(1, `hsl(${angle}, 100%, 50%)`);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
    }
  }

  private _hslToRgb(h: number, s: number, l: number): [number, number, number] {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; }
    else if (h < 120) { r = x; g = c; }
    else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; }
    else if (h < 300) { r = x; b = c; }
    else { r = c; b = x; }
    return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
  }

  private _hexToWheelPos(hex: string): { x: number; y: number } {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    if (d !== 0) {
      if (max === r) h = ((g - b) / d + 6) % 6 * 60;
      else if (max === g) h = ((b - r) / d + 2) * 60;
      else h = ((r - g) / d + 4) * 60;
    }
    const sat = d === 0 ? 0 : d / (1 - Math.abs(max + min - 1));
    const dist = Math.min(sat, 1);
    const rad = (h * Math.PI) / 180;
    return { x: Math.cos(rad) * dist * 50 + 50, y: Math.sin(rad) * dist * 50 + 50 };
  }

  private _renderColorPicker() {
    if (this._colorPickerModeIdx === null) return nothing;
    const hex = this._colorPickerHex;
    return html`
      <div class="cp-overlay" @click=${(e: Event) => { if (e.target === e.currentTarget) this._closeColorPicker(); }}>
        <div class="cp-dialog">
          <span class="cp-title">${t('config.title_color_picker_title')}</span>
          <div class="cp-wheel-wrap">
            <canvas
              @mousedown=${(e: MouseEvent) => {
                this._cancelColorDrag?.();
                this._onCpWheel(e);
                const onMove = (me: MouseEvent) => this._onCpWheel(me);
                const onUp = () => {
                  window.removeEventListener('mousemove', onMove);
                  window.removeEventListener('mouseup', onUp);
                  this._cancelColorDrag = undefined;
                };
                window.addEventListener('mousemove', onMove);
                window.addEventListener('mouseup', onUp);
                this._cancelColorDrag = onUp;
              }}
              @touchstart=${(e: TouchEvent) => {
                this._cancelColorDrag?.();
                e.preventDefault();
                this._onCpWheel(e);
                const onMove = (te: TouchEvent) => { te.preventDefault(); this._onCpWheel(te); };
                const onEnd = () => {
                  window.removeEventListener('touchmove', onMove);
                  window.removeEventListener('touchend', onEnd);
                  this._cancelColorDrag = undefined;
                };
                window.addEventListener('touchmove', onMove, { passive: false });
                window.addEventListener('touchend', onEnd);
                this._cancelColorDrag = onEnd;
              }}
            ></canvas>
            <div class="cp-cursor" style="left:${this._colorPickerPos.x}%;top:${this._colorPickerPos.y}%;background:${hex}"></div>
          </div>
          <div class="cp-preview" style="background:${hex}"></div>
          <span class="cp-hex">${hex}</span>
          <button class="cp-confirm" @click=${() => this._applyColorPicker()}>
            ${t('common.select')}
          </button>
        </div>
      </div>
    `;
  }

  private _renderTitleTab() {
    const modeEntities = this.hass
      ? Object.keys(this.hass.states).filter((id) => id.startsWith('input_select.') || id.startsWith('input_boolean.') || id.startsWith('scene.')).sort()
      : [];
    const selectedEntity = modeEntities.find((id) => id === this._titleModeEntity);

    const COLORS = ['neutral', 'success', 'warning', 'info', 'accent', 'alert'];

    return html`
      <div class="tab-panel" id="panel-title">
        <div class="section-label">${t('config.title_title')}</div>
        <div class="section-desc">${t('config.title_title_desc')}</div>
        <input
          class="input"
          type="text"
          .value=${this._titleText}
          placeholder=${t('config.title_title_placeholder')}
          @input=${(e: Event) => { this._titleText = (e.target as HTMLInputElement).value; }}
        />

        <div class="title-section-gap"></div>

        <div class="section-label">${t('config.title_mode_entity')}</div>
        <div class="section-desc">${t('config.title_mode_entity_desc')}</div>
        <div class="dropdown ${this._titleModeDropdownOpen ? 'open' : ''}">
          <button
            class="dropdown-trigger"
            @click=${() => (this._titleModeDropdownOpen = !this._titleModeDropdownOpen)}
            aria-expanded=${this._titleModeDropdownOpen ? 'true' : 'false'}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${this._titleModeEntity ? 'mdi:form-select' : 'mdi:help-circle-outline'}></ha-icon>
            <span>${selectedEntity || t('config.title_select_entity')}</span>
            <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            <button
              class="dropdown-item ${!this._titleModeEntity ? 'active' : ''}"
              role="option"
              aria-selected=${!this._titleModeEntity ? 'true' : 'false'}
              @click=${() => this._selectTitleModeEntity('')}
            >
              <ha-icon .icon=${'mdi:close'}></ha-icon>
              ${t('title_card.mode_none')}
            </button>
            ${modeEntities.map(
              (id) => html`
                <button
                  class="dropdown-item ${id === this._titleModeEntity ? 'active' : ''}"
                  role="option"
                  aria-selected=${id === this._titleModeEntity ? 'true' : 'false'}
                  @click=${() => this._selectTitleModeEntity(id)}
                >
                  <ha-icon .icon=${id.startsWith('scene.') ? 'mdi:palette' : id.startsWith('input_boolean.') ? 'mdi:toggle-switch' : 'mdi:form-select'}></ha-icon>
                  ${id}
                </button>
              `,
            )}
          </div>
        </div>

        ${this._titleModes.length > 0 ? html`
          <div class="title-section-gap"></div>

          <div class="section-label">${t('config.title_modes')}</div>
          <div class="section-desc">${t('config.title_modes_desc')}</div>
          <div class="title-modes-list">
            ${this._titleModes.map((mode, idx) => html`
              <div class="title-mode-row">
                <span class="title-mode-id">${mode.id}</span>
                <div class="title-mode-fields-row">
                  <input
                    class="input"
                    type="text"
                    placeholder=${t('config.title_mode_label')}
                    .value=${mode.label}
                    @input=${(e: Event) => this._updateTitleMode(idx, 'label', (e.target as HTMLInputElement).value)}
                  />
                  <button
                    class="title-icon-btn ${mode.icon ? 'has-icon' : ''}"
                    @click=${() => this._openIconPopup(idx)}
                    aria-label="${t('config.title_mode_icon')}"
                  >
                    <ha-icon .icon=${mode.icon || 'mdi:emoticon-outline'}></ha-icon>
                  </button>
                </div>
                <div class="title-color-row">
                  <span class="title-color-label">${t('config.title_mode_color')}</span>
                  <div class="title-color-chips">
                    ${COLORS.map((c) => html`
                      <button
                        class="title-color-chip ${c} ${mode.color === c ? 'active' : ''}"
                        @click=${() => this._updateTitleMode(idx, 'color', c)}
                        aria-label="${t('config.title_mode_color')}: ${c}"
                      ></button>
                    `)}
                    ${mode.color.startsWith('#') ? html`
                      <button
                        class="title-color-chip custom active"
                        style="background:${mode.color}"
                        @click=${() => this._openColorPicker(idx)}
                        aria-label="${t('config.title_color_picker_aria')}"
                      ></button>
                    ` : nothing}
                    <button
                      class="title-color-picker-btn"
                      @click=${() => this._openColorPicker(idx)}
                      aria-label="${t('config.title_color_picker_aria')}"
                    ></button>
                  </div>
                </div>
              </div>
            `)}
          </div>
        ` : nothing}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${() => this._loadTitleConfig()}>${t('common.reset')}</button>
          <button
            class="btn btn-accent"
            @click=${() => this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving ? t('common.saving') : t('common.save')}
          </button>
        </div>
      </div>
    `;
  }

  // — Main render —

  render() {
    void this._lang; // Trigger re-render on language change
    if (!this.hass) return nothing;

    return html`
      <div class="ambient-bg"></div>
      <div class="page-wrap">
        <div class="page-header">
          <button class="page-back" @click=${() => this._goBack()} aria-label="${t('common.back')}">
            <ha-icon .icon=${'mdi:chevron-left'}></ha-icon>
          </button>
          <span class="page-title">${t('config.title')}</span>
          <span class="page-subtitle">${t('config.brand')}</span>
        </div>

        <div class="glass config-panel">
          <div class="tabs" role="tablist">
            <button
              class="tab ${this._tab === 'dashboard' ? 'active' : ''}"
              role="tab"
              aria-selected=${this._tab === 'dashboard' ? 'true' : 'false'}
              @click=${() => this._switchTab('dashboard')}
            >
              <ha-icon .icon=${'mdi:view-dashboard'}></ha-icon>
              ${t('config.tab_dashboard')}
            </button>
            <button
              class="tab ${this._tab === 'title' ? 'active' : ''}"
              role="tab"
              aria-selected=${this._tab === 'title' ? 'true' : 'false'}
              @click=${() => this._switchTab('title')}
            >
              <ha-icon .icon=${'mdi:format-title'}></ha-icon>
              ${t('config.tab_title')}
            </button>
            <button
              class="tab ${this._tab === 'navbar' ? 'active' : ''}"
              role="tab"
              aria-selected=${this._tab === 'navbar' ? 'true' : 'false'}
              @click=${() => this._switchTab('navbar')}
            >
              <ha-icon .icon=${'mdi:dock-bottom'}></ha-icon>
              ${t('config.tab_navbar')}
            </button>
            <button
              class="tab ${this._tab === 'popup' ? 'active' : ''}"
              role="tab"
              aria-selected=${this._tab === 'popup' ? 'true' : 'false'}
              @click=${() => this._switchTab('popup')}
            >
              <ha-icon .icon=${'mdi:card-outline'}></ha-icon>
              ${t('config.tab_popup')}
            </button>
            <button
              class="tab ${this._tab === 'light' ? 'active' : ''}"
              role="tab"
              aria-selected=${this._tab === 'light' ? 'true' : 'false'}
              @click=${() => this._switchTab('light')}
            >
              <ha-icon .icon=${'mdi:lightbulb-group'}></ha-icon>
              ${t('config.tab_light')}
            </button>
            <button
              class="tab ${this._tab === 'weather' ? 'active' : ''}"
              role="tab"
              aria-selected=${this._tab === 'weather' ? 'true' : 'false'}
              @click=${() => this._switchTab('weather')}
            >
              <ha-icon .icon=${'mdi:weather-partly-cloudy'}></ha-icon>
              ${t('config.tab_weather')}
            </button>
            <button
              class="tab ${this._tab === 'cover' ? 'active' : ''}"
              role="tab"
              aria-selected=${this._tab === 'cover' ? 'true' : 'false'}
              @click=${() => this._switchTab('cover')}
            >
              <ha-icon .icon=${'mdi:blinds'}></ha-icon>
              ${t('config.tab_cover')}
            </button>
            <button
              class="tab ${this._tab === 'spotify' ? 'active' : ''}"
              role="tab"
              aria-selected=${this._tab === 'spotify' ? 'true' : 'false'}
              @click=${() => this._switchTab('spotify')}
            >
              <ha-icon .icon=${'mdi:spotify'}></ha-icon>
              ${t('config.tab_spotify')}
            </button>
          </div>

          <div class="preview-encart">
            <div class="preview-label">${t('config.preview')}</div>
            ${this._tab === 'navbar'
              ? this._renderNavbarPreview()
              : this._tab === 'popup'
                ? this._renderPopupPreview()
                : this._tab === 'light'
                  ? this._renderLightPreview()
                  : this._tab === 'weather'
                    ? this._renderWeatherPreview()
                    : this._tab === 'title'
                      ? this._renderTitlePreview()
                      : this._tab === 'cover'
                        ? this._renderCoverPreview()
                        : this._tab === 'spotify'
                          ? this._renderSpotifyPreview()
                          : this._renderDashboardPreview()}
          </div>

          ${this._tab === 'navbar'
            ? this._renderNavbarTab()
            : this._tab === 'popup'
              ? this._renderPopupTab()
              : this._tab === 'light'
                ? this._renderLightTab()
                : this._tab === 'weather'
                  ? this._renderWeatherTab()
                  : this._tab === 'title'
                    ? this._renderTitleTab()
                    : this._tab === 'cover'
                      ? this._renderCoverTab()
                      : this._tab === 'spotify'
                        ? this._renderSpotifyTab()
                        : this._renderDashboardTab()}
        </div>
      </div>

      ${this._pickerOpen ? this._renderDateTimePicker() : nothing}
      ${this._renderIconPopup()}
      ${this._renderColorPicker()}

      <div class="toast ${this._toast ? 'show' : ''} ${this._toastError ? 'error' : ''}">
        ${this._toastError ? t('common.error_save') : t('common.config_saved')}
      </div>
    `;
  }
}

try { customElements.define('glass-config-panel', GlassConfigPanel); } catch { /* scoped registry */ }
