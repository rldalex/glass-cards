import { LitElement, html, type TemplateResult } from 'lit';

export class WizardStepDone extends LitElement {
  protected createRenderRoot() { return this; }

  protected render(): TemplateResult {
    return html`
      <div class="wizard-step-icon success">
        <ha-icon .icon=${'mdi:rocket-launch'}></ha-icon>
      </div>
      <div class="section-label">C'est prêt !</div>
      <div class="section-desc">
        Votre tableau de bord Glass Cards est configuré.
        Explorez vos pièces et personnalisez chaque carte.
      </div>
    `;
  }
}

try { customElements.define('wizard-step-done', WizardStepDone); } catch { /* already registered */ }
