import { LitElement, html, css, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { bus } from '@glass-cards/event-bus';
import { glassTokens, glassMixin, foldMixin } from '@glass-cards/ui-core';
import { getAreaEntities, type HomeAssistant, type HassEntity } from '@glass-cards/base-card';

interface AreaMeta {
  name: string;
  icon: string;
  temperature: string | null;
  humidity: string | null;
  scenes: HassEntity[];
  domains: string[];
}

export class GlassRoomPopup extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _areaId: string | null = null;
  @state() private _open = false;
  @state() private _scenesOpen = false;
  private _pendingRaf?: number;
  private _busCleanups: (() => void)[] = [];
  private _boundKeydown = this._onKeydown.bind(this);

  static styles = [
    glassTokens,
    glassMixin,
    foldMixin,
    css`
      :host {
        position: fixed;
        inset: 0;
        z-index: 9999;
        pointer-events: none;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }

      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: opacity 0.3s var(--ease-std);
        pointer-events: none;
      }
      :host([open]) .overlay {
        opacity: 1;
        pointer-events: auto;
      }

      .dialog {
        position: fixed;
        bottom: 90px;
        left: 50%;
        transform: translateX(-50%) scale(0.3);
        transform-origin: center bottom;
        width: calc(100vw - 16px);
        max-width: 500px;
        max-height: calc(100vh - 120px);
        overflow-y: auto;
        opacity: 0;
        pointer-events: none;
        transition:
          transform 0.45s var(--ease-out),
          opacity 0.3s var(--ease-std);
        padding: 16px;
        box-sizing: border-box;
      }
      :host([open]) .dialog {
        transform: translateX(-50%) scale(1);
        opacity: 1;
        pointer-events: auto;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
      }
      .header-icon {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-md);
        background: var(--s2);
        color: var(--t2);
        flex-shrink: 0;
      }
      .header-info {
        flex: 1;
        min-width: 0;
      }
      .header-name {
        font-size: 16px;
        font-weight: 700;
        color: var(--t1);
      }
      .header-meta {
        display: flex;
        gap: 10px;
        font-size: 12px;
        color: var(--t3);
        font-weight: 500;
      }
      .close-btn {
        background: transparent;
        border: none;
        width: 28px;
        height: 28px;
        border-radius: var(--radius-sm);
        color: var(--t3);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        font-family: inherit;
        outline: none;
        transition: background var(--t-fast);
        flex-shrink: 0;
      }
      .close-btn:hover {
        background: var(--s3);
      }

      .scenes-toggle {
        background: transparent;
        border: none;
        padding: 0;
        font-family: inherit;
        outline: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 9px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        color: var(--t4);
        margin-bottom: 8px;
      }
      .scenes-toggle ha-icon {
        --mdc-icon-size: 14px;
        transition: transform var(--t-fast);
      }
      .scenes-toggle.open ha-icon {
        transform: rotate(90deg);
      }

      .scene-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding-bottom: 8px;
      }
      .scene-chip {
        background: var(--s2);
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
        padding: 5px 12px;
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        color: var(--t3);
        cursor: pointer;
        font-family: inherit;
        outline: none;
        transition:
          background var(--t-fast),
          border-color var(--t-fast);
      }
      .scene-chip:hover {
        background: var(--s3);
        border-color: var(--b3);
      }

      .section-title {
        font-size: 9px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        color: var(--t4);
        margin: 12px 0 8px;
      }

      .cards {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this._busCleanups.push(
      bus.on('popup-open', (payload) => this._handleOpen(payload)),
      bus.on('popup-close', () => this._handleClose()),
    );
    document.addEventListener('keydown', this._boundKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._busCleanups.forEach((c) => c());
    this._busCleanups = [];
    document.removeEventListener('keydown', this._boundKeydown);
  }

  private _handleOpen(payload: { areaId: string; originRect?: DOMRect }) {
    this._areaId = payload.areaId;
    this._scenesOpen = false;
    this._pendingRaf = requestAnimationFrame(() => {
      this._pendingRaf = undefined;
      this._open = true;
      this.setAttribute('open', '');
    });
  }

  private _handleClose() {
    if (this._pendingRaf !== undefined) {
      cancelAnimationFrame(this._pendingRaf);
      this._pendingRaf = undefined;
    }
    this._open = false;
    this.removeAttribute('open');
    setTimeout(() => {
      this._areaId = null;
    }, 350);
  }

  private _onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this._open) {
      bus.emit('popup-close', undefined);
    }
  }

  private _onOverlayClick() {
    bus.emit('popup-close', undefined);
  }

  private _getAreaMeta(): AreaMeta | null {
    if (!this.hass || !this._areaId) return null;
    const area = this.hass.areas[this._areaId];
    if (!area) return null;

    const areaEntities = getAreaEntities(this._areaId, this.hass.entities, this.hass.devices);
    let temperature: string | null = null;
    let humidity: string | null = null;
    const scenes: HassEntity[] = [];
    const domainSet = new Set<string>();

    for (const regEntry of areaEntities) {
      const entityState = this.hass?.states[regEntry.entity_id];
      if (!entityState) continue;

      const domain = regEntry.entity_id.split('.')[0];
      domainSet.add(domain);

      if (domain === 'sensor') {
        const dc = entityState.attributes.device_class;
        if (dc === 'temperature' && !temperature) {
          temperature = `${entityState.state}${entityState.attributes.unit_of_measurement || '°C'}`;
        }
        if (dc === 'humidity' && !humidity) {
          humidity = `${entityState.state}%`;
        }
      }
      if (domain === 'scene') {
        scenes.push(entityState);
      }
    }

    return {
      name: area.name,
      icon: area.icon || 'mdi:home',
      temperature,
      humidity,
      scenes,
      domains: [...domainSet],
    };
  }

  private _activateScene(entityId: string) {
    this.hass?.callService('scene', 'turn_on', {}, { entity_id: entityId });
  }

  private _hasDomain(domains: string[], domain: string): boolean {
    return domains.includes(domain);
  }

  render() {
    if (!this._areaId) return nothing;
    const meta = this._getAreaMeta();
    if (!meta) return nothing;

    return html`
      <div class="overlay" @click=${this._onOverlayClick}></div>
      <div class="dialog glass glass-float" role="dialog" aria-modal="true" aria-label=${meta.name}>
        ${html`
          <div class="header">
            <div class="header-icon">
              <ha-icon .icon=${meta.icon}></ha-icon>
            </div>
            <div class="header-info">
              <div class="header-name">${meta.name}</div>
              <div class="header-meta">
                ${meta.temperature ? html`<span>${meta.temperature}</span>` : nothing}
                ${meta.humidity ? html`<span>${meta.humidity}</span>` : nothing}
              </div>
            </div>
            <button
              class="close-btn"
              @click=${() => bus.emit('popup-close', undefined)}
              aria-label="Close"
            >
              <ha-icon .icon=${'mdi:close'}></ha-icon>
            </button>
          </div>

          ${meta.scenes.length > 0
            ? html`
                <button
                  class="scenes-toggle ${this._scenesOpen ? 'open' : ''}"
                  @click=${() => (this._scenesOpen = !this._scenesOpen)}
                  aria-expanded=${this._scenesOpen ? 'true' : 'false'}
                >
                  <ha-icon .icon=${'mdi:chevron-right'}></ha-icon>
                  SCENES
                </button>
                <div class="fold ${this._scenesOpen ? 'open' : ''}">
                  <div class="fold-inner">
                    <div class="scene-chips">
                      ${meta.scenes.map(
                        (s) => html`
                          <button
                            class="scene-chip"
                            @click=${() => this._activateScene(s.entity_id)}
                            aria-label="Activate ${s.attributes.friendly_name || s.entity_id}"
                          >
                            ${s.attributes.friendly_name || s.entity_id}
                          </button>
                        `,
                      )}
                    </div>
                  </div>
                </div>
              `
            : nothing}

          <div class="cards">
            ${this._hasDomain(meta.domains, 'light')
              ? html`
                  <glass-light-card .hass=${this.hass} .areaId=${this._areaId}></glass-light-card>
                `
              : nothing}
          </div>
        `}
      </div>
    `;
  }
}

customElements.define('glass-room-popup', GlassRoomPopup);
