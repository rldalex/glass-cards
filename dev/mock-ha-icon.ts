// Minimal <ha-icon> stub for dev server.
// Renders embedded MDI SVG paths sourced from @mdi/js (all 7000+ icons).
//
// Lookup order:
//   1. LOCAL_OVERRIDES (rare custom paths or HA-specific fallbacks)
//   2. @mdi/js export, keyed via the `mdi:my-icon-name` -> `mdiMyIconName` slug rule

import * as mdiIcons from '@mdi/js';

// Override / supplement table — kept for icons where the HA name diverges from MDI,
// or where we want a custom rendering in the harness.
const LOCAL_OVERRIDES: Record<string, string> = {};

const mdiTable = mdiIcons as unknown as Record<string, string>;

function slugToConstName(slug: string): string {
  // 'lightbulb-outline' -> 'mdiLightbulbOutline'
  return 'mdi' + slug.replace(/(^|-)([a-z0-9])/g, (_, _dash, c: string) => c.toUpperCase());
}

function resolveMdiPath(icon: string): string | undefined {
  if (LOCAL_OVERRIDES[icon]) return LOCAL_OVERRIDES[icon];
  if (!icon.startsWith('mdi:')) return undefined;
  return mdiTable[slugToConstName(icon.slice(4))];
}

class HaIconStub extends HTMLElement {
  static get observedAttributes(): string[] { return ['icon']; }

  private _icon = '';

  set icon(v: string) {
    this._icon = v;
    this._render();
  }
  get icon(): string { return this._icon; }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    if (name === 'icon') {
      this._icon = value ?? '';
      this._render();
    }
  }

  connectedCallback(): void { this._render(); }

  private _render(): void {
    const path = resolveMdiPath(this._icon);
    const size = getComputedStyle(this).getPropertyValue('--mdc-icon-size').trim() || '24px';
    this.style.display = 'inline-flex';
    this.style.alignItems = 'center';
    this.style.justifyContent = 'center';
    this.style.width = size;
    this.style.height = size;
    if (!path) {
      this.replaceChildren();
      return;
    }
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.fill = 'currentColor';
    const p = document.createElementNS(svgNS, 'path');
    p.setAttribute('d', path);
    svg.appendChild(p);
    this.replaceChildren(svg);
  }
}

if (!customElements.get('ha-icon')) {
  customElements.define('ha-icon', HaIconStub);
}
