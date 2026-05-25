import { LitElement, html, css, nothing, type CSSResult, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { motionMixin } from './motion-mixin';
import { DOMAIN_COLORS } from './domain-colors';

/**
 * Minimal Home Assistant surface this primitive consumes. We avoid importing
 * the full base-card `HomeAssistant` type to keep `ui-core` free of upstream
 * package deps; consumers pass their typed hass and the structural overlap is
 * enough.
 */
interface HassLike {
  states: Record<string, { state: string; attributes: Record<string, unknown> } | undefined>;
  callService: (domain: string, service: string, data?: Record<string, unknown>) => Promise<unknown>;
}

/** Domains where the entity has a meaningful ON/OFF state worth reflecting visually. */
const TOGGABLE_DOMAINS = new Set([
  'light', 'switch', 'fan', 'cover', 'climate', 'lock', 'media_player',
  'humidifier', 'valve', 'siren', 'input_boolean', 'water_heater',
]);

/** Fallback MDI icon per domain when neither user nor entity provide one. */
const DOMAIN_FALLBACK_ICON: Record<string, string> = {
  light: 'mdi:lightbulb', switch: 'mdi:toggle-switch', vacuum: 'mdi:robot-vacuum-variant',
  cover: 'mdi:window-shutter', climate: 'mdi:thermostat', fan: 'mdi:fan',
  media_player: 'mdi:speaker', scene: 'mdi:palette', script: 'mdi:script-text',
  automation: 'mdi:robot', input_boolean: 'mdi:toggle-switch', input_button: 'mdi:gesture-tap-button',
  button: 'mdi:gesture-tap-button', lock: 'mdi:lock', camera: 'mdi:cctv',
  notify: 'mdi:bell-outline', homeassistant: 'mdi:home',
  remote: 'mdi:remote', humidifier: 'mdi:air-humidifier',
  water_heater: 'mdi:water-boiler', siren: 'mdi:bullhorn',
  valve: 'mdi:valve', lawn_mower: 'mdi:robot-mower',
};

/**
 * `<glass-action-button>` — A single-tap action button bound to an HA service,
 * with optional entity-state reflection.
 *
 * - Togglable domains (light/switch/cover/climate/...): visually reflects ON/OFF
 *   via the domain colour. ON state is saturated + has a soft glow; OFF state
 *   is neutral with a tinted icon at 70% opacity.
 * - One-shot domains (script/scene/button/...): renders at a fixed mid intensity
 *   in the domain's colour at all times.
 * - Tap: fires `callService` immediately, switches to a spinner, and resolves
 *   on the next observed state-change of the target entity (or after 1.5s).
 * - No `:hover` at all — affordance is the `idle-on` saturation + `:active`
 *   scale-down on press.
 *
 * @fires glass-action-invoke — { service: string, data: Record<string, unknown> } — fired before callService
 * @fires glass-action-result — { success: boolean, reason: 'state-changed' | 'timeout' | 'error' }
 */
export class GlassActionButton extends LitElement {
  @property({ attribute: false }) hass?: HassLike;
  @property({ type: String }) service = '';
  @property({ attribute: false }) data: Record<string, unknown> = {};
  @property({ type: String }) label = '';
  @property({ type: String }) icon = '';
  @property({ type: Boolean, attribute: 'icon-cleared' }) iconCleared = false;
  @property({ type: String, reflect: true }) size: 'sm' | 'md' = 'sm';

  @state() private _phase: 'idle' | 'pending' | 'flash-success' | 'flash-error' = 'idle';
  private _pendingTimer: ReturnType<typeof setTimeout> | null = null;
  private _flashTimer: ReturnType<typeof setTimeout> | null = null;

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._pendingTimer) { clearTimeout(this._pendingTimer); this._pendingTimer = null; }
    if (this._flashTimer) { clearTimeout(this._flashTimer); this._flashTimer = null; }
  }

  private _resolveDomain(): string {
    const i = this.service.indexOf('.');
    return i > 0 ? this.service.slice(0, i) : '';
  }

  private _resolveEntityId(): string {
    const v = this.data?.entity_id;
    if (typeof v === 'string') return v;
    if (Array.isArray(v) && typeof v[0] === 'string') return v[0];
    return '';
  }

  /** Map entity state to "is this on?" per domain. Returns null if not applicable. */
  private _isEntityOn(domain: string, state: string | undefined): boolean | null {
    if (!state || state === 'unavailable' || state === 'unknown') return null;
    switch (domain) {
      case 'light': case 'switch': case 'fan': case 'input_boolean':
      case 'humidifier': case 'siren':
        return state === 'on';
      case 'cover': case 'valve':
        return state === 'open' || state === 'opening';
      case 'lock':
        return state === 'unlocked';
      case 'climate': case 'water_heater':
        return state !== 'off';
      case 'media_player':
        return state === 'playing' || state === 'paused' || state === 'on';
      default:
        return null;
    }
  }

  /** Resolve domain → RGB triplet from DOMAIN_COLORS (with media_player → media), with accent fallback. */
  private _resolveDomainRgb(domain: string): string {
    if (domain === 'media_player') return DOMAIN_COLORS.media?.rgb ?? '129,140,248';
    return DOMAIN_COLORS[domain]?.rgb ?? '129,140,248';
  }

  /** Resolve the icon to render given user pick, entity hint, and domain fallback. */
  private _resolveIcon(domain: string, entityState: { attributes: Record<string, unknown> } | undefined): string {
    if (this.label && this.iconCleared) return '';
    if (this.icon) return this.icon;
    const entityIcon = entityState?.attributes?.icon as string | undefined;
    if (entityIcon) return entityIcon;
    return DOMAIN_FALLBACK_ICON[domain] ?? 'mdi:gesture-tap-button';
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.service) return nothing;
    const domain = this._resolveDomain();
    if (!domain) return nothing;
    const entityId = this._resolveEntityId();
    const entityState = entityId ? this.hass?.states?.[entityId] : undefined;
    const isToggable = TOGGABLE_DOMAINS.has(domain);
    const onOff = isToggable ? this._isEntityOn(domain, entityState?.state) : null;
    const unavailable = !!(entityId && entityState && (entityState.state === 'unavailable' || entityState.state === 'unknown'));
    const rgb = this._resolveDomainRgb(domain);
    const iconName = unavailable ? 'mdi:alert-circle-outline' : this._resolveIcon(domain, entityState);
    const friendlyName = (entityState?.attributes?.friendly_name as string) || '';
    const aria = this.label || friendlyName || `Action ${domain}`;

    const dataPhase = this._phase;
    const dataState = unavailable ? 'unavailable' : onOff === true ? 'on' : 'off';

    return html`
      <button
        type="button"
        part="button"
        class=${this.label ? 'has-label' : 'icon-only'}
        style="--_d-rgb: ${rgb}"
        data-phase=${dataPhase}
        data-state=${dataState}
        aria-label=${aria}
        aria-pressed=${isToggable && onOff !== null ? (onOff ? 'true' : 'false') : nothing}
        aria-busy=${dataPhase === 'pending' ? 'true' : 'false'}
        aria-disabled=${unavailable ? 'true' : 'false'}
        @click=${this._onClick}
      >
        ${dataPhase === 'pending'
          ? html`<span class="spinner" aria-hidden="true"></span>`
          : iconName
            ? html`<ha-icon .icon=${iconName}></ha-icon>`
            : nothing}
        ${this.label ? html`<span class="lbl">${this.label}</span>` : nothing}
      </button>
    `;
  }

  private _onClick = (_e: Event): void => {
    if (!this.hass || !this.service || this._phase !== 'idle') return;
    const hass = this.hass;
    const domain = this._resolveDomain();
    if (!domain) return;
    const action = this.service.slice(domain.length + 1);
    const entityId = this._resolveEntityId();
    const unavailable = entityId
      ? (() => {
          const st = hass.states[entityId]?.state;
          return st === 'unavailable' || st === 'unknown';
        })()
      : false;
    if (unavailable) return;

    this.dispatchEvent(new CustomEvent('glass-action-invoke', {
      detail: { service: this.service, data: this.data ?? {} },
      bubbles: true, composed: true,
    }));

    this._phase = 'pending';

    // 1.5s safety net — one-shot services (script.turn_on) and services
    // without observable state changes resolve here as 'timeout' success.
    this._pendingTimer = setTimeout(() => this._resolveSuccess('timeout'), 1500);

    // Fire-and-forget: we do NOT await the WS round trip. The state-change
    // observer in updated() (Task 3) is the honest signal for togglables.
    const safeData = (this.data && typeof this.data === 'object' && !Array.isArray(this.data))
      ? this.data
      : {};
    hass.callService(domain, action, safeData).catch((_err) => this._resolveError());
  };

  private _resolveSuccess(reason: 'state-changed' | 'timeout'): void {
    if (this._pendingTimer) { clearTimeout(this._pendingTimer); this._pendingTimer = null; }
    this.dispatchEvent(new CustomEvent('glass-action-result', {
      detail: { success: true, reason },
      bubbles: true, composed: true,
    }));
    // Flash phase added in Task 3.
    this._phase = 'idle';
  }

  private _resolveError(): void {
    if (this._pendingTimer) { clearTimeout(this._pendingTimer); this._pendingTimer = null; }
    this.dispatchEvent(new CustomEvent('glass-action-result', {
      detail: { success: false, reason: 'error' },
      bubbles: true, composed: true,
    }));
    // Flash phase added in Task 3.
    this._phase = 'idle';
  }

  static styles: CSSResult[] = [
    motionMixin,
    css`
      :host {
        display: inline-flex;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
      }
      button {
        position: relative;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.375rem;
        padding: 0 0.625rem;
        margin: 0;
        font-family: inherit;
        font-size: var(--fz-sm);
        font-weight: 600;
        color: var(--t2);
        background: var(--s2);
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
        cursor: pointer;
        outline: none;
        white-space: nowrap;
        transition:
          background var(--t-med) var(--ease-std),
          border-color var(--t-med) var(--ease-std),
          color var(--t-med) var(--ease-std),
          box-shadow var(--t-med) var(--ease-std),
          opacity var(--t-med) var(--ease-std),
          transform var(--t-fast) var(--ease-std);
        -webkit-tap-highlight-color: transparent;
      }
      button.icon-only { padding: 0; gap: 0; }
      :host([size='sm']) button.icon-only { width: 2rem; height: 2rem; }
      :host([size='sm']) button.has-label { min-height: 2rem; }
      :host([size='md']) button.icon-only { width: var(--tap-lg); height: var(--tap-lg); }
      :host([size='md']) button.has-label { min-height: var(--tap-lg); padding: 0 1rem; }

      button::after { content: ''; position: absolute; inset: 0; }
      @media (pointer: coarse) {
        :host([size='sm']) button.icon-only::after { inset: calc((var(--tap-lg) - 2rem) / -2); }
        :host([size='sm']) button.has-label::after { inset: calc((var(--tap-lg) - 2rem) / -2) 0; }
      }

      ha-icon {
        --mdc-icon-size: var(--icon-sm);
        color: rgb(var(--_d-rgb));
        opacity: 0.7;
        transition: opacity var(--t-med) var(--ease-std);
        flex-shrink: 0;
      }
      :host([size='md']) ha-icon { --mdc-icon-size: var(--icon-md); }
      .lbl { max-width: 100%; overflow: hidden; text-overflow: ellipsis; }

      button[data-state='on'] {
        background: rgba(var(--_d-rgb), 0.18);
        border-color: rgba(var(--_d-rgb), 0.4);
        color: rgb(var(--_d-rgb));
        box-shadow: 0 0 12px rgba(var(--_d-rgb), 0.25);
      }
      button[data-state='on'] ha-icon { opacity: 1; }

      button[data-state='unavailable'] {
        border-color: var(--c-alert);
        opacity: 0.6;
        pointer-events: none;
      }
      button[data-state='unavailable'] ha-icon { color: var(--c-alert); opacity: 1; }

      button:active { transform: scale(0.96); }

      button:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* pending state — disable taps, scale down, swap icon for spinner. */
      button[data-phase='pending'] {
        transform: scale(0.97);
        pointer-events: none;
      }
      .spinner {
        width: 1rem;
        height: 1rem;
        border: 2px solid rgba(var(--_d-rgb), 0.25);
        border-top-color: rgb(var(--_d-rgb));
        border-radius: 50%;
        animation: glass-action-spin 0.8s linear infinite;
      }
      :host([size='md']) .spinner { width: 1.25rem; height: 1.25rem; border-width: 3px; }
      @keyframes glass-action-spin { to { transform: rotate(360deg); } }
    `,
  ];
}

try { customElements.define('glass-action-button', GlassActionButton); } catch { /* already registered */ }

declare global {
  interface HTMLElementTagNameMap {
    'glass-action-button': GlassActionButton;
  }
}
