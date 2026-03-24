import { LitElement, html, type TemplateResult } from 'lit';

export class WizardStepWelcome extends LitElement {
  protected createRenderRoot() { return this; }

  protected render(): TemplateResult {
    return html`
      <div class="wizard-step-icon">
        <ha-icon .icon=${'mdi:auto-fix'}></ha-icon>
      </div>
      <div class="section-label">Bienvenue</div>
      <div class="section-desc">
        Glass Cards transforme votre interface Home Assistant avec un design moderne
        et des contrôles intuitifs. Ce guide rapide va configurer votre tableau de bord.
      </div>
      <div class="banner">
        <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
        <span>Vous pouvez passer chaque étape et revenir plus tard via Avancé.</span>
      </div>
    `;
  }
}

try { customElements.define('wizard-step-welcome', WizardStepWelcome); } catch { /* already registered */ }
