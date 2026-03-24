import { LitElement, html, type TemplateResult } from 'lit';

export class WizardStepAppearance extends LitElement {
  protected createRenderRoot() { return this; }

  protected render(): TemplateResult {
    return html`
      <div class="wizard-step-icon">
        <ha-icon .icon=${'mdi:palette'}></ha-icon>
      </div>
      <div class="section-label">Apparence</div>
      <div class="section-desc">
        La personnalisation du thème sera disponible prochainement.
        Glass Cards utilise un thème sombre par défaut.
      </div>
      <div class="banner">
        <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
        <span>Vous pourrez choisir vos couleurs dans une prochaine version.</span>
      </div>
    `;
  }
}

try { customElements.define('wizard-step-appearance', WizardStepAppearance); } catch { /* already registered */ }
