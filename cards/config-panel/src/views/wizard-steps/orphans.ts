import { LitElement, html, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import type { HomeAssistant } from '@glass-cards/base-card';
import { resolveEntityAreaId } from '@glass-cards/base-card';

export class WizardStepOrphans extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;

  protected createRenderRoot() { return this; }

  private _countOrphans(): number {
    if (!this.hass?.entities) return 0;
    return Object.values(this.hass.entities).filter((e) => {
      if (e.disabled_by || e.hidden_by) return false;
      return resolveEntityAreaId(e, this.hass.devices) === null;
    }).length;
  }

  protected render(): TemplateResult {
    const count = this._countOrphans();

    if (count === 0) {
      return html`
        <div class="wizard-step-icon success">
          <ha-icon .icon=${'mdi:check-circle'}></ha-icon>
        </div>
        <div class="section-label">Entités orphelines</div>
        <div class="banner">
          <ha-icon .icon=${'mdi:check-circle'}></ha-icon>
          <span>Toutes vos entités sont bien assignées à une pièce.</span>
        </div>
      `;
    }

    return html`
      <div class="wizard-step-icon">
        <ha-icon .icon=${'mdi:puzzle-outline'}></ha-icon>
      </div>
      <div class="section-label">Entités orphelines</div>
      <div class="wizard-orphan-count">${count}</div>
      <div class="section-desc">
        entité${count > 1 ? 's' : ''} non assignée${count > 1 ? 's' : ''} à une pièce.
        Vous pourrez les assigner dans Avancé › Entités orphelines.
      </div>
    `;
  }
}

try { customElements.define('wizard-step-orphans', WizardStepOrphans); } catch { /* already registered */ }
