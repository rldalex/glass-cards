import { html, css, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import {
  BaseCard,
  type HassEntity,
  type LovelaceCardConfig,
} from '@glass-cards/base-card';
import {
  glassTokens,
  hostMixin,
  glassMixin,
  foldMixin,
  marqueeMixin,
  bounceMixin,
  unavailableMixin,
  isEntityUnavailable,
} from '@glass-cards/ui-core';

export class GlassVacuumCard extends BaseCard {
  getCardSize(): number {
    return 4;
  }

  @property({ attribute: false }) hass?: import('@glass-cards/base-card').HomeAssistant;
  @property({ attribute: false }) config?: LovelaceCardConfig;

  private _locateTimer: ReturnType<typeof setTimeout> | null = null;
  private _confirmTimerId: ReturnType<typeof setTimeout> | null = null;

  setConfig(config: LovelaceCardConfig): void {
    if (!config?.entity || !(config.entity as string).startsWith('vacuum.')) {
      throw new Error('vacuum-card: config.entity must be a vacuum.* entity_id');
    }
    this.config = config;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._locateTimer) clearTimeout(this._locateTimer);
    if (this._confirmTimerId) clearTimeout(this._confirmTimerId);
    this._locateTimer = null;
    this._confirmTimerId = null;
  }

  static styles = [
    glassTokens,
    hostMixin,
    glassMixin,
    foldMixin,
    marqueeMixin,
    bounceMixin,
    unavailableMixin,
    css`
      :host {
        width: 100%;
        color: var(--t1);
      }
      .card-inner {
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 1;
      }
      .placeholder {
        padding: 1rem;
        font-size: var(--fz-md);
        color: var(--t2);
      }
    `,
  ];

  private _vacuumEntity(): HassEntity | null {
    if (!this.hass || !this.config?.entity) return null;
    return this.hass.states[this.config.entity as string] ?? null;
  }

  render(): TemplateResult | typeof nothing {
    const vacuum = this._vacuumEntity();
    if (!this.hass || !this.config?.entity) return nothing;

    if (!vacuum) {
      return html`
        <div class="glass">
          <div class="card-inner">
            <div class="placeholder">Vacuum entité ${this.config.entity} introuvable.</div>
          </div>
        </div>
      `;
    }

    const friendlyName = (vacuum.attributes.friendly_name as string) ?? this.config.entity;
    return html`
      <div class="glass ${isEntityUnavailable(vacuum.state) ? 'unavailable' : ''}">
        <div class="card-inner">
          <div class="placeholder">${friendlyName} — état : ${vacuum.state}</div>
        </div>
      </div>
    `;
  }
}

customElements.define('glass-vacuum-card', GlassVacuumCard);
