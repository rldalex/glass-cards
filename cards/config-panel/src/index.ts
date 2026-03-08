import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { bus } from '@glass-cards/event-bus';
import { glassTokens, glassMixin } from '@glass-cards/ui-core';
import {
  BackendService,
  getAreaEntities,
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
  name: string;
  icon: string;
  description: string;
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
  layout: 'auto' | 'full' | 'compact';
  visible: boolean;
}

const DEFAULT_CARD_ORDER = ['light', 'media_player', 'climate', 'fan', 'cover', 'vacuum'];

const CARD_META: Record<string, { name: string; icon: string; description: string }> = {
  light: { name: 'Lumières', icon: 'mdi:lightbulb-group', description: 'Contrôle des lumières' },
  media_player: { name: 'Média', icon: 'mdi:speaker', description: 'Lecteurs multimédias' },
  climate: { name: 'Climat', icon: 'mdi:thermostat', description: 'Thermostats et climatisation' },
  fan: { name: 'Ventilateur', icon: 'mdi:fan', description: 'Ventilation' },
  cover: { name: 'Volets', icon: 'mdi:blinds', description: 'Stores et volets roulants' },
  vacuum: { name: 'Aspirateur', icon: 'mdi:robot-vacuum', description: 'Robots aspirateurs' },
};

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

  @state() private _tab: 'navbar' | 'popup' | 'light' = 'navbar';
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

  // Drag state
  @state() private _dragIdx: number | null = null;
  @state() private _dropIdx: number | null = null;
  private _dragContext: 'rooms' | 'cards' | 'scenes' | 'lights' = 'rooms';

  private _backend?: BackendService;
  private _loaded = false;
  private _loading = false;
  private _toastTimeout?: ReturnType<typeof setTimeout>;
  @state() private _toastError = false;
  private _boundCloseDropdowns = this._closeDropdownsOnOutsideClick.bind(this);
  private _initialIcons = new Map<string, string | null>();

  static styles = [
    glassTokens,
    glassMixin,
    css`
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
      .page-back:hover {
        background: var(--s3);
      }
      .page-back:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .page-back ha-icon {
        --mdc-icon-size: 18px;
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
      }
      .tab {
        flex: 1;
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
      .tab:hover {
        color: var(--t2);
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
      .item-row:hover {
        background: var(--s2);
        border-color: var(--b2);
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
      .drag-handle:hover {
        color: var(--t3);
      }
      .drag-handle:active {
        cursor: grabbing;
      }
      .drag-handle ha-icon {
        --mdc-icon-size: 14px;
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
      }
      .room-icon-btn:hover {
        background: var(--s3);
        border-color: var(--b2);
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
      .dropdown-trigger:hover {
        background: var(--s3);
        border-color: var(--b3);
      }
      .dropdown-trigger:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .dropdown-trigger ha-icon {
        --mdc-icon-size: 16px;
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
      .dropdown-item:hover {
        background: var(--s3);
        color: var(--t1);
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
      }
      .icon-pick:hover {
        background: var(--s3);
        border-color: var(--b2);
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
      .feature-row:hover {
        background: var(--s1);
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
      .check-box {
        width: 18px;
        height: 18px;
        border-radius: 4px;
        border: 2px solid var(--b3);
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          box-shadow var(--t-fast);
      }
      .check-box ha-icon {
        --mdc-icon-size: 12px;
        color: #fff;
        opacity: 0;
        transform: scale(0);
        transition:
          opacity var(--t-fast),
          transform var(--t-fast);
      }
      .feature-row.checked .check-box {
        background: var(--c-accent);
        border-color: var(--c-accent);
        box-shadow: 0 0 6px rgba(129, 140, 248, 0.3);
      }
      .feature-row.checked .check-box ha-icon {
        opacity: 1;
        transform: scale(1);
      }
      .feature-row.checked .feature-name {
        color: var(--t1);
      }
      .feature-row:not(.checked) .feature-name {
        color: var(--t2);
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
      .layout-btn:hover {
        background: var(--s3);
        color: var(--t2);
        border-color: var(--b3);
      }
      .layout-btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
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
      .btn:hover {
        background: var(--s4);
        border-color: var(--b3);
        color: var(--t1);
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
      .btn-accent:hover {
        background: rgba(129, 140, 248, 0.2);
        border-color: rgba(129, 140, 248, 0.35);
      }
      .btn-accent:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
      .btn-ghost {
        border-color: transparent;
        background: transparent;
      }
      .btn-ghost:hover {
        background: var(--s2);
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
    // Only re-render for hass if we haven't loaded yet
    return !this._loaded;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._boundCloseDropdowns);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._boundCloseDropdowns);
    if (this._toastTimeout !== undefined) {
      clearTimeout(this._toastTimeout);
      this._toastTimeout = undefined;
    }
    this._backend = undefined;
  }

  private _closeDropdownsOnOutsideClick(e: MouseEvent) {
    if (!this._dropdownOpen && !this._lightDropdownOpen) return;
    const path = e.composedPath();
    const root = this.shadowRoot;
    if (!root) return;
    const dropdowns = root.querySelectorAll('.dropdown');
    for (const dd of dropdowns) {
      if (path.includes(dd)) return;
    }
    this._dropdownOpen = false;
    this._lightDropdownOpen = false;
  }

  updated(changedProps: PropertyValues) {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass && !this._loaded) {
      this._loaded = true;
      this._backend = new BackendService(this.hass);
      this._loadConfig();
    }
  }

  private async _loadConfig() {
    if (!this.hass || this._loading) return;
    this._loading = true;

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
    const roomConfigs: Record<string, { icon?: string | null }> = {};
    try {
      if (!this._backend) throw new Error('No backend');
      const result = await this._backend.send<{
        navbar: typeof navbarConfig;
        rooms: Record<string, { icon?: string | null }>;
      }>('get_config');
      navbarConfig = result.navbar;
      Object.assign(roomConfigs, result.rooms);
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

    // Sort by backend order, then alphabetically
    rooms.sort((a, b) => {
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
    this._loading = false;
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
      if (!orderedSet.has(domain) && CARD_META[domain]) {
        orderedIds.push(domain);
      }
    }

    this._cards = orderedIds
      .filter((id) => {
        // Only show card types that have entities OR are in stored order
        return (domainCounts.get(id) || 0) > 0 || (storedOrder && storedOrder.includes(id));
      })
      .map((id) => {
        const meta = CARD_META[id] || { name: id, icon: 'mdi:card-outline', description: '' };
        const count = domainCounts.get(id) || 0;
        return {
          id,
          name: meta.name,
          icon: meta.icon,
          description: meta.description,
          count,
          visible: storedOrder ? storedOrder.includes(id) : count > 0,
        };
      });
  }

  // — Tab switching —

  private _switchTab(tab: 'navbar' | 'popup' | 'light') {
    this._tab = tab;
    this._iconPickerRoom = null;
    this._dropdownOpen = false;
    this._lightDropdownOpen = false;
    if (tab === 'light' && !this._lightRoom && this._rooms.length > 0) {
      this._lightRoom = this._rooms[0].areaId;
      this._loadRoomLights();
    }
  }

  // — Drag & Drop —

  private _onDragStart(idx: number, context: 'rooms' | 'cards' | 'scenes' | 'lights') {
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
    this._rooms = this._rooms.map((r) =>
      r.areaId === areaId ? { ...r, visible: !r.visible } : r,
    );
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
        room_order: this._rooms.map((r) => r.areaId),
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
      this._showToast();
      bus.emit('navbar-config-changed', undefined);
    } catch {
      this._showToast(true);
    }
    this._saving = false;
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
      this._showToast();
      bus.emit('room-config-changed', { areaId: this._selectedRoom });
    } catch {
      this._showToast(true);
    }
    this._saving = false;
  }

  private _save() {
    if (this._tab === 'navbar') {
      this._saveNavbar();
    } else if (this._tab === 'popup') {
      this._savePopup();
    } else {
      this._saveLights();
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
        hiddenEntities = new Set(result.hidden_entities);
        entityOrder = result.entity_order;
        entityLayouts = result.entity_layouts;
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
        layout: (entityLayouts[e.entity_id] as 'auto' | 'full' | 'compact') || 'auto',
        visible: !hiddenEntities.has(e.entity_id),
      };
    });

    // Sort by backend order, then by name
    lights.sort((a, b) => {
      const aIdx = orderMap.get(a.entityId);
      const bIdx = orderMap.get(b.entityId);
      if (aIdx !== undefined && bIdx !== undefined) return aIdx - bIdx;
      if (aIdx !== undefined) return -1;
      if (bIdx !== undefined) return 1;
      return a.name.localeCompare(b.name);
    });

    this._lights = lights;
  }

  private _toggleLightVisible(entityId: string) {
    this._lights = this._lights.map((l) =>
      l.entityId === entityId ? { ...l, visible: !l.visible } : l,
    );
  }

  private _cycleLightLayout(entityId: string) {
    const cycle: Record<string, 'auto' | 'full' | 'compact'> = {
      auto: 'full',
      full: 'compact',
      compact: 'auto',
    };
    this._lights = this._lights.map((l) =>
      l.entityId === entityId ? { ...l, layout: cycle[l.layout] } : l,
    );
  }

  private async _saveLights() {
    if (!this._backend || this._saving || !this._lightRoom) return;
    this._saving = true;
    try {
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
        if (l.layout !== 'auto') {
          layouts[l.entityId] = l.layout;
        }
      }
      await this._backend.send('set_room', {
        area_id: this._lightRoom,
        entity_order: this._lights.map((l) => l.entityId),
        hidden_entities: [...nonLightHidden, ...hiddenLights],
        entity_layouts: layouts,
      });
      this._showToast();
      bus.emit('room-config-changed', { areaId: this._lightRoom });
    } catch {
      this._showToast(true);
    }
    this._saving = false;
  }

  private async _reset() {
    this._loaded = true;
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
    if (!room) return html`<div class="preview-empty">Sélectionnez une pièce</div>`;

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
                <span class="preview-card-slot-name">${card.name}</span>
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
          <div class="section-label">Pièces vides</div>
          <div class="section-desc">
            Ces pièces n'ont aucune entité assignée dans Home Assistant.
            Ajoutez des appareils à ces zones pour qu'elles apparaissent dans la navbar.
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
                  <span class="item-meta">0 entités</span>
                </div>
              </div>
            `)}
          </div>
        ` : nothing}

        <div class="section-label">Comportement</div>
        <div class="feature-list">
          <button
            class="feature-row ${this._autoSort ? 'checked' : ''}"
            @click=${() => { this._autoSort = !this._autoSort; }}
          >
            <div class="feature-icon">
              <ha-icon .icon=${'mdi:sort-bool-ascending'}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">Tri automatique</div>
              <div class="feature-desc">Les pièces actives remontent en premier</div>
            </div>
            <span class="check-box"><ha-icon .icon=${'mdi:check'}></ha-icon></span>
          </button>
        </div>

        <div class="banner">
          <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
          <span>Réordonnez les pièces par glisser-déposer. Désactivez celles à masquer.</span>
        </div>
        <div class="section-label">Pièces visibles</div>
        <div class="item-list">
          ${this._rooms.map((room, idx) => this._renderRoomRow(room, idx))}
        </div>

        <div class="icon-picker-fold ${this._iconPickerRoom ? 'open' : ''}">
          <div class="icon-picker-inner">
            <div class="section-label">
              Icône — ${this._rooms.find((r) => r.areaId === this._iconPickerRoom)?.name || ''}
            </div>
            <div class="icon-picker-grid">
              ${ROOM_ICONS.map(
                (icon) => html`
                  <button
                    class="icon-pick ${this._rooms.find((r) => r.areaId === this._iconPickerRoom)?.icon === icon ? 'selected' : ''}"
                    @click=${() => this._iconPickerRoom && this._setRoomIcon(this._iconPickerRoom, icon)}
                    aria-label="Choisir icône"
                  >
                    <ha-icon .icon=${icon}></ha-icon>
                  </button>
                `,
              )}
            </div>
          </div>
        </div>

        <div class="section-label">Indicateurs</div>
        <div class="section-desc">Activez ou désactivez les indicateurs visuels sur la navbar.</div>
        <div class="feature-list">
          ${([
            { key: 'lights' as const, icon: 'mdi:lightbulb', name: 'Lumières allumées', desc: 'Glow doré sur l\'icône' },
            { key: 'temperature' as const, icon: 'mdi:thermometer', name: 'Température', desc: 'Badge chaud / froid' },
            { key: 'humidity' as const, icon: 'mdi:water-percent', name: 'Humidité', desc: 'Barre bleue en bas' },
            { key: 'media' as const, icon: 'mdi:music', name: 'Média en lecture', desc: 'Bounce de l\'icône' },
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
                class="feature-row ${checked ? 'checked' : ''}"
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
                  <div class="feature-name">${feat.name}</div>
                  <div class="feature-desc">${feat.desc}</div>
                </div>
                <span class="check-box"><ha-icon .icon=${'mdi:check'}></ha-icon></span>
              </button>
            `;
          })}
        </div>

        <div class="section-label">Seuils</div>
        <div class="section-desc">Définissez les seuils pour les alertes de température et d'humidité.</div>
        <div class="threshold-list">
          <div class="threshold-row">
            <div class="threshold-icon hot">
              <ha-icon .icon=${'mdi:thermometer-high'}></ha-icon>
            </div>
            <span class="threshold-label">Température haute</span>
            <input
              class="threshold-input"
              type="number"
              step="0.5"
              .value=${String(this._tempHigh)}
              @change=${(e: Event) => { this._tempHigh = parseFloat((e.target as HTMLInputElement).value) || DEFAULT_TEMP_HIGH; }}
              aria-label="Seuil température haute"
            />
            <span class="threshold-unit">°C</span>
          </div>
          <div class="threshold-row">
            <div class="threshold-icon cold">
              <ha-icon .icon=${'mdi:snowflake'}></ha-icon>
            </div>
            <span class="threshold-label">Température basse</span>
            <input
              class="threshold-input"
              type="number"
              step="0.5"
              .value=${String(this._tempLow)}
              @change=${(e: Event) => { this._tempLow = parseFloat((e.target as HTMLInputElement).value) || DEFAULT_TEMP_LOW; }}
              aria-label="Seuil température basse"
            />
            <span class="threshold-unit">°C</span>
          </div>
          <div class="threshold-row">
            <div class="threshold-icon humidity">
              <ha-icon .icon=${'mdi:water-percent'}></ha-icon>
            </div>
            <span class="threshold-label">Seuil humidité</span>
            <input
              class="threshold-input"
              type="number"
              step="1"
              .value=${String(this._humidityThreshold)}
              @change=${(e: Event) => { this._humidityThreshold = parseFloat((e.target as HTMLInputElement).value) || DEFAULT_HUMIDITY_THRESHOLD; }}
              aria-label="Seuil humidité"
            />
            <span class="threshold-unit">%</span>
          </div>
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${() => this._reset()}>Réinitialiser</button>
          <button
            class="btn btn-accent"
            @click=${() => this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving ? 'Enregistrement...' : 'Enregistrer'}
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
          aria-label="Changer l'icône de ${room.name}"
        >
          <ha-icon .icon=${room.icon}></ha-icon>
        </button>
        <div class="item-info">
          <span class="item-name">${room.name}</span>
          <span class="item-meta">${room.entityCount} entités</span>
        </div>
        <button
          class="toggle ${room.visible ? 'on' : ''}"
          @click=${() => this._toggleRoomVisible(room.areaId)}
          role="switch"
          aria-checked=${room.visible ? 'true' : 'false'}
          aria-label="${room.visible ? 'Masquer' : 'Afficher'} ${room.name}"
        ></button>
      </div>
    `;
  }

  // — Render: Popup tab —

  private _renderPopupTab() {
    const selectedRoomObj = this._rooms.find((r) => r.areaId === this._selectedRoom);

    return html`
      <div class="tab-panel" id="panel-popup">
        <div class="section-label">Pièce</div>
        <div class="section-desc">
          Sélectionnez une pièce pour configurer l'ordre et la visibilité de ses cartes internes.
        </div>
        <div class="dropdown ${this._dropdownOpen ? 'open' : ''}">
          <button
            class="dropdown-trigger"
            @click=${() => (this._dropdownOpen = !this._dropdownOpen)}
            aria-expanded=${this._dropdownOpen ? 'true' : 'false'}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${selectedRoomObj?.icon || 'mdi:home'}></ha-icon>
            <span>${selectedRoomObj?.name || 'Sélectionner...'}</span>
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

        <div class="section-label">Cartes internes</div>
        <div class="section-desc">
          Ordonnez les cartes affichées dans le popup de cette pièce.
        </div>
        <div class="item-list">
          ${this._cards.map((card, idx) => this._renderCardRow(card, idx))}
        </div>

        ${this._scenes.length > 0 ? html`
          <div class="section-label">Scènes (${this._scenes.length})</div>
          <div class="section-desc">
            Réordonnez et masquez les scènes affichées en haut du popup.
          </div>
          <div class="item-list">
            ${this._scenes.map((scene, idx) => this._renderSceneRow(scene, idx))}
          </div>
        ` : nothing}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${() => this._reset()}>Réinitialiser</button>
          <button
            class="btn btn-accent"
            @click=${() => this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving ? 'Enregistrement...' : 'Enregistrer'}
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
          <span class="item-name">${card.name}</span>
          <span class="item-meta">${card.description}</span>
        </div>
        <span class="card-count">${card.count}</span>
        <button
          class="toggle ${card.visible ? 'on' : ''}"
          @click=${() => this._toggleCardVisible(card.id)}
          role="switch"
          aria-checked=${card.visible ? 'true' : 'false'}
          aria-label="${card.visible ? 'Masquer' : 'Afficher'} ${card.name}"
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
          aria-label="${scene.visible ? 'Masquer' : 'Afficher'} ${scene.name}"
        ></button>
      </div>
    `;
  }

  // — Render: Light tab —

  private _renderLightPreview() {
    if (!this._lightRoom) return html`<div class="preview-empty">Sélectionnez une pièce</div>`;
    if (this._lights.length === 0) return html`<div class="preview-empty">Aucune lumière</div>`;

    const visibleLights = this._lights.filter((l) => l.visible);
    const onCount = visibleLights.filter((l) => l.isOn).length;
    const total = visibleLights.length;
    const anyOn = onCount > 0;
    const countClass = onCount === 0 ? 'none' : onCount === total ? 'all' : 'some';

    // Build layout: compact lights are paired, full/auto-on get full row
    type PItem =
      | { kind: 'full'; light: LightEntry }
      | { kind: 'compact-pair'; left: LightEntry; right: LightEntry | null };
    const layout: PItem[] = [];
    const compactBuf: LightEntry[] = [];

    for (const l of this._lights) {
      const effectiveLayout = l.layout === 'auto'
        ? (l.isOn ? 'full' : 'compact')
        : l.layout;
      if (effectiveLayout === 'compact') {
        compactBuf.push(l);
        if (compactBuf.length === 2) {
          layout.push({ kind: 'compact-pair', left: compactBuf[0], right: compactBuf[1] });
          compactBuf.length = 0;
        }
      } else {
        if (compactBuf.length > 0) {
          layout.push({ kind: 'compact-pair', left: compactBuf[0], right: null });
          compactBuf.length = 0;
        }
        layout.push({ kind: 'full', light: l });
      }
    }
    if (compactBuf.length > 0) {
      layout.push({ kind: 'compact-pair', left: compactBuf[0], right: null });
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

      return html`
        <div class=${classes} data-on=${l.isOn}>
          <div class="preview-light-icon ${l.isOn ? 'on' : ''}">
            <ha-icon .icon=${'mdi:lightbulb'}></ha-icon>
          </div>
          <div class="preview-light-info">
            <div class="preview-light-name">${l.name}</div>
            <div class="preview-light-sub">${l.isOn ? `${l.brightnessPct}%` : 'Off'}</div>
          </div>
          ${l.layout !== 'auto' ? html`<span class="preview-light-layout-tag">${l.layout}</span>` : nothing}
          <span class="preview-light-dot ${l.isOn ? 'on' : ''}"></span>
        </div>
      `;
    };

    return html`
      <div class="preview-light">
        <div class="preview-light-header">
          <div class="preview-light-header-left">
            <span class="preview-light-title">LIGHTS</span>
            <span class="preview-light-count ${countClass}">${onCount}/${total}</span>
          </div>
          <div class="preview-light-toggle ${anyOn ? 'on' : ''}"></div>
        </div>
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
        <div class="section-label">Pièce</div>
        <div class="section-desc">
          Sélectionnez une pièce pour configurer ses lumières : ordre, visibilité et mode d'affichage.
        </div>
        <div class="dropdown ${this._lightDropdownOpen ? 'open' : ''}">
          <button
            class="dropdown-trigger"
            @click=${() => (this._lightDropdownOpen = !this._lightDropdownOpen)}
            aria-expanded=${this._lightDropdownOpen ? 'true' : 'false'}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${selectedRoomObj?.icon || 'mdi:home'}></ha-icon>
            <span>${selectedRoomObj?.name || 'Sélectionner...'}</span>
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
              <div class="section-label">Lumières (${this._lights.length})</div>
              <div class="section-desc">
                Glissez pour réordonner. Le bouton layout change l'affichage : auto, pleine largeur, ou compact.
              </div>
              <div class="item-list">
                ${this._lights.map((light, idx) => this._renderLightRow(light, idx))}
              </div>
            `
          : this._lightRoom
            ? html`<div class="banner">
                <ha-icon .icon=${'mdi:lightbulb-off-outline'}></ha-icon>
                <span>Aucune lumière dans cette pièce.</span>
              </div>`
            : nothing}

        ${this._lightRoom ? html`
          <div class="save-bar">
            <button class="btn btn-ghost" @click=${() => this._loadRoomLights()}>Réinitialiser</button>
            <button
              class="btn btn-accent"
              @click=${() => this._save()}
              ?disabled=${this._saving}
            >
              ${this._saving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        ` : nothing}
      </div>
    `;
  }

  private _renderLightRow(light: LightEntry, idx: number) {
    const isDragging = this._dragIdx === idx && this._dragContext === 'lights';
    const isDropTarget = this._dropIdx === idx && this._dragContext === 'lights';
    const classes = [
      'item-row',
      !light.visible ? 'disabled' : '',
      isDragging ? 'dragging' : '',
      isDropTarget ? 'drop-target' : '',
    ].filter(Boolean).join(' ');

    return html`
      <div
        class=${classes}
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
          <span class="light-brightness">${light.isOn ? `${light.brightnessPct}%` : 'Off'}</span>
        </div>
        <button
          class="layout-btn"
          @click=${() => this._cycleLightLayout(light.entityId)}
          aria-label="Changer le layout"
          title="Layout: ${light.layout}"
        >
          ${light.layout}
        </button>
        <button
          class="toggle ${light.visible ? 'on' : ''}"
          @click=${() => this._toggleLightVisible(light.entityId)}
          role="switch"
          aria-checked=${light.visible ? 'true' : 'false'}
          aria-label="${light.visible ? 'Masquer' : 'Afficher'} ${light.name}"
        ></button>
      </div>
    `;
  }

  // — Main render —

  render() {
    if (!this.hass) return nothing;

    return html`
      <div class="ambient-bg"></div>
      <div class="page-wrap">
        <div class="page-header">
          <button class="page-back" @click=${() => this._goBack()} aria-label="Retour">
            <ha-icon .icon=${'mdi:chevron-left'}></ha-icon>
          </button>
          <span class="page-title">Configuration</span>
          <span class="page-subtitle">Glass Cards</span>
        </div>

        <div class="glass config-panel">
          <div class="tabs" role="tablist">
            <button
              class="tab ${this._tab === 'navbar' ? 'active' : ''}"
              role="tab"
              aria-selected=${this._tab === 'navbar' ? 'true' : 'false'}
              @click=${() => this._switchTab('navbar')}
            >
              <ha-icon .icon=${'mdi:dock-bottom'}></ha-icon>
              Navbar
            </button>
            <button
              class="tab ${this._tab === 'popup' ? 'active' : ''}"
              role="tab"
              aria-selected=${this._tab === 'popup' ? 'true' : 'false'}
              @click=${() => this._switchTab('popup')}
            >
              <ha-icon .icon=${'mdi:card-outline'}></ha-icon>
              Room Popup
            </button>
            <button
              class="tab ${this._tab === 'light' ? 'active' : ''}"
              role="tab"
              aria-selected=${this._tab === 'light' ? 'true' : 'false'}
              @click=${() => this._switchTab('light')}
            >
              <ha-icon .icon=${'mdi:lightbulb-group'}></ha-icon>
              Light Card
            </button>
          </div>

          <div class="preview-encart">
            <div class="preview-label">Aperçu</div>
            ${this._tab === 'navbar'
              ? this._renderNavbarPreview()
              : this._tab === 'popup'
                ? this._renderPopupPreview()
                : this._renderLightPreview()}
          </div>

          ${this._tab === 'navbar'
            ? this._renderNavbarTab()
            : this._tab === 'popup'
              ? this._renderPopupTab()
              : this._renderLightTab()}
        </div>
      </div>

      <div class="toast ${this._toast ? 'show' : ''} ${this._toastError ? 'error' : ''}">
        ${this._toastError ? 'Erreur de sauvegarde' : 'Configuration sauvegardée'}
      </div>
    `;
  }
}

customElements.define('glass-config-panel', GlassConfigPanel);
