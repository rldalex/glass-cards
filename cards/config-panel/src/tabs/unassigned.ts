import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import { resolveEntityAreaId } from '@glass-cards/base-card';
import { BaseConfigTab } from '../base-tab';
import { CARD_ICONS, DOMAIN_I18N_KEYS } from '../types';

// — Types —

export interface EntityAreaEntry {
  entityId: string;
  name: string;
  domain: string;
  areaId: string | null;
  areaName: string | null;
  icon: string | null;
}

/** Domains handled by Glass Cards controllable cards (in prod only). */
const CONTROLLABLE_DOMAINS = ['light', 'cover', 'climate', 'fan', 'media_player', 'camera'];

// — Helpers —

function domainIcon(domain: string): string {
  return CARD_ICONS[domain] ?? 'mdi:help-circle';
}

function domainLabel(domain: string): string {
  const keys = DOMAIN_I18N_KEYS[domain as keyof typeof DOMAIN_I18N_KEYS];
  return keys ? t(keys.name) : domain;
}

// — Component —

export class ConfigTabUnassigned extends BaseConfigTab {
  @state() _unassignedEntities: EntityAreaEntry[] = [];
  @state() _unassignedDropdownEntity: string | null = null;
  @state() _unassignedEntitySearch = '';
  @state() _unassignedAreaSearch = '';
  @state() _unassignedEditingEntity: string | null = null;
  @state() _iconPopupEntity: string | null = null;
  @state() _iconSearch = '';
  _iconList: string[] = [];
  _iconLoading = false;

  // — Lifecycle —

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    // On first hass, load entities
    if (changedProps.has('hass') && this.hass && this._unassignedEntities.length === 0) {
      this._loadEntities();
    }
  }

  // — Persistence (no backend config for unassigned) —

  loadFromConfig(_config: Record<string, unknown>): void {
    // Unassigned tab loads from hass entity registry, not backend config
  }

  collectSaveData(): Record<string, unknown> {
    return {};
  }

  // — Collect entities from hass —

  private _collectAllEntities(): EntityAreaEntry[] {
    if (!this.hass) return [];
    const entities = this.hass.entities;
    const devices = this.hass.devices;
    const areas = this.hass.areas;
    const result: EntityAreaEntry[] = [];

    for (const entry of Object.values(entities)) {
      if (entry.disabled_by || entry.hidden_by) continue;
      const domain = entry.entity_id.split('.')[0];
      if (!CONTROLLABLE_DOMAINS.includes(domain)) continue;
      const areaId = resolveEntityAreaId(entry, devices);
      const s = this.hass!.states[entry.entity_id];
      const name = (s?.attributes?.friendly_name as string) ?? entry.entity_id;
      const areaName = areaId ? (areas[areaId]?.name ?? null) : null;
      result.push({ entityId: entry.entity_id, name, domain, areaId, areaName, icon: entry.icon ?? null });
    }

    // Unassigned first, then by domain order, then alphabetical
    result.sort((a, b) => {
      const aUnassigned = a.areaId ? 1 : 0;
      const bUnassigned = b.areaId ? 1 : 0;
      if (aUnassigned !== bUnassigned) return aUnassigned - bUnassigned;
      const di = CONTROLLABLE_DOMAINS.indexOf(a.domain) - CONTROLLABLE_DOMAINS.indexOf(b.domain);
      if (di !== 0) return di;
      return a.name.localeCompare(b.name);
    });

    return result;
  }

  _loadEntities(): void {
    this._unassignedEntities = this._collectAllEntities();
    this._unassignedDropdownEntity = null;
    this._unassignedEditingEntity = null;
    this._unassignedEntitySearch = '';
    this._unassignedAreaSearch = '';
  }

  // — Actions —

  private async _assignEntityArea(entityId: string, areaId: string): Promise<void> {
    if (!this.hass) return;
    try {
      await this.hass.connection.sendMessagePromise({
        type: 'config/entity_registry/update',
        entity_id: entityId,
        area_id: areaId,
      });
      this._unassignedEntities = this._unassignedEntities.map((e) =>
        e.entityId === entityId
          ? { ...e, areaId, areaName: this.hass?.areas[areaId]?.name ?? null }
          : e,
      );
      this._unassignedDropdownEntity = null;
      this._unassignedAreaSearch = '';
      // Notify parent that room assignments changed
      this.dispatchEvent(new CustomEvent('entities-assigned', { bubbles: true, composed: true }));
    } catch {
      this._fireToast(false);
    }
  }

  private async _renameEntity(entityId: string, newName: string): Promise<void> {
    if (!this.hass) return;
    const trimmed = newName.trim();
    if (!trimmed) {
      this._unassignedEditingEntity = null;
      return;
    }
    // Find current name — skip if unchanged
    const current = this._unassignedEntities.find((e) => e.entityId === entityId);
    if (current && current.name === trimmed) {
      this._unassignedEditingEntity = null;
      return;
    }
    try {
      await this.hass.connection.sendMessagePromise({
        type: 'config/entity_registry/update',
        entity_id: entityId,
        name: trimmed,
      });
      this._unassignedEntities = this._unassignedEntities.map((e) =>
        e.entityId === entityId ? { ...e, name: trimmed } : e,
      );
    } catch {
      this._fireToast(false);
    }
    this._unassignedEditingEntity = null;
  }

  private async _openIconPopup(entityId: string): Promise<void> {
    if (this._iconLoading) return;
    if (this._iconList.length === 0) await this._loadIconList();
    this._iconSearch = '';
    this._iconPopupEntity = entityId;
  }

  private async _loadIconList(): Promise<void> {
    this._iconLoading = true;
    const picker = document.createElement('ha-icon-picker') as HTMLElement & { hass: unknown };
    picker.hass = this.hass;
    picker.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none';
    try {
      this.shadowRoot?.appendChild(picker);
      await new Promise((r) => setTimeout(r, 50));
      const gp = picker.shadowRoot?.querySelector('ha-generic-picker') as HTMLElement & { getItems(): Promise<{ id: string }[]> } | null;
      if (gp?.getItems) {
        const items = await gp.getItems();
        if (items?.length) this._iconList = items.map((i) => i.id);
      }
    } catch { /* ignore */ } finally {
      if (this.shadowRoot?.contains(picker)) this.shadowRoot.removeChild(picker);
      this._iconLoading = false;
    }
  }

  private _getFilteredIcons(): string[] {
    const query = this._iconSearch.toLowerCase().trim();
    if (!query) return this._iconList.slice(0, 120);
    return this._iconList.filter((icon) => icon.toLowerCase().includes(query)).slice(0, 120);
  }

  private async _selectIcon(icon: string): Promise<void> {
    const entityId = this._iconPopupEntity;
    this._iconPopupEntity = null;
    if (!entityId || !this.hass) return;
    const current = this._unassignedEntities.find((e) => e.entityId === entityId);
    if (current && current.icon === (icon || null)) return;
    try {
      await this.hass.connection.sendMessagePromise({
        type: 'config/entity_registry/update',
        entity_id: entityId,
        icon: icon || null,
      });
      this._unassignedEntities = this._unassignedEntities.map((e) =>
        e.entityId === entityId ? { ...e, icon: icon || null } : e,
      );
    } catch {
      this._fireToast(false);
    }
  }

  private _portalEl: HTMLDivElement | null = null;

  private _showIconPortal(): void {
    if (!this._iconPopupEntity) { this._removeIconPortal(); return; }
    const entity = this._unassignedEntities.find((e) => e.entityId === this._iconPopupEntity);
    const currentIcon = entity?.icon ?? '';
    const icons = this._getFilteredIcons();

    if (!this._portalEl) {
      this._portalEl = document.createElement('div');
      document.body.appendChild(this._portalEl);
    }

    const close = () => { this._iconPopupEntity = null; this._removeIconPortal(); };
    const select = (icon: string) => { this._selectIcon(icon); this._removeIconPortal(); };
    const onSearch = (val: string) => { this._iconSearch = val; this._showIconPortal(); };

    this._portalEl.replaceChildren();
    Object.assign(this._portalEl.style, {
      position: 'fixed', inset: '0', zIndex: '10000',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem',
    });
    this._portalEl.addEventListener('click', (e) => { if (e.target === this._portalEl) close(); }, { once: true });

    const popup = document.createElement('div');
    Object.assign(popup.style, {
      width: '100%', maxWidth: '25rem', maxHeight: '70vh',
      display: 'flex', flexDirection: 'column',
      borderRadius: '22px',
      background: 'linear-gradient(135deg, #1a2233 0%, #141c2a 50%, #172030 100%)',
      boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)',
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
    });

    const header = document.createElement('div');
    Object.assign(header.style, { padding: '0.875rem 1rem 0.625rem', display: 'flex', flexDirection: 'column', gap: '0.625rem', borderBottom: '1px solid rgba(255,255,255,0.06)' });
    const titleEl = document.createElement('span');
    Object.assign(titleEl.style, { fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.45)' });
    titleEl.textContent = t('config.unassigned_change_icon');
    const searchInput = document.createElement('input');
    Object.assign(searchInput.style, { width: '100%', padding: '0.5rem 0.75rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.88)', fontSize: '13px', outline: 'none', boxSizing: 'border-box' });
    searchInput.placeholder = 'mdi:...';
    searchInput.value = this._iconSearch;
    searchInput.addEventListener('input', () => onSearch(searchInput.value));
    header.appendChild(titleEl);
    header.appendChild(searchInput);
    popup.appendChild(header);

    const gridWrap = document.createElement('div');
    Object.assign(gridWrap.style, { overflow: 'auto', flex: '1', padding: '0.5rem', scrollbarWidth: 'none' });
    const grid = document.createElement('div');
    Object.assign(grid.style, { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '4px' });

    const noIconBtn = this._createIconBtn('mdi:cancel', currentIcon === '', 0.4);
    noIconBtn.addEventListener('click', () => select(''));
    grid.appendChild(noIconBtn);

    for (const icon of icons) {
      const btn = this._createIconBtn(icon, icon === currentIcon, 1);
      btn.addEventListener('click', () => select(icon));
      grid.appendChild(btn);
    }

    if (icons.length === 0 && this._iconSearch) {
      const empty = document.createElement('div');
      Object.assign(empty.style, { gridColumn: '1/-1', textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.35)', fontSize: '13px' });
      empty.textContent = t('config.title_no_icons_found');
      grid.appendChild(empty);
    }

    gridWrap.appendChild(grid);
    popup.appendChild(gridWrap);
    this._portalEl.appendChild(popup);
    searchInput.focus();
  }

  private _createIconBtn(icon: string, selected: boolean, opacity: number): HTMLButtonElement {
    const btn = document.createElement('button');
    Object.assign(btn.style, {
      width: '100%', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: '10px', border: selected ? '2px solid rgba(129,140,248,0.6)' : '1px solid rgba(255,255,255,0.06)',
      background: selected ? 'rgba(129,140,248,0.15)' : 'rgba(255,255,255,0.04)',
      cursor: 'pointer', color: 'rgba(255,255,255,0.88)', padding: '0',
    });
    const haIcon = document.createElement('ha-icon');
    (haIcon as unknown as { icon: string }).icon = icon;
    haIcon.style.cssText = `--mdc-icon-size:20px;display:flex;align-items:center;justify-content:center;opacity:${opacity};`;
    btn.appendChild(haIcon);
    return btn;
  }

  private _removeIconPortal(): void {
    if (this._portalEl) {
      this._portalEl.remove();
      this._portalEl = null;
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._removeIconPortal();
  }

  /** Close dropdown when clicking outside (called by parent via event or directly). */
  closeDropdowns(): void {
    this._unassignedDropdownEntity = null;
  }

  // — Render —

  renderTab(): TemplateResult {
    void this._lang;
    if (!this.hass) return html`${nothing}`;

    const entities = this._unassignedEntities;
    const areas = Object.values(this.hass.areas).sort((a, b) => a.name.localeCompare(b.name));
    const entitySearch = this._unassignedEntitySearch.toLowerCase();
    const areaSearch = this._unassignedAreaSearch.toLowerCase();

    // Filter entities by search
    const filtered = entitySearch
      ? entities.filter((e) =>
          e.name.toLowerCase().includes(entitySearch) ||
          e.entityId.toLowerCase().includes(entitySearch),
        )
      : entities;

    // Group by domain
    const grouped = new Map<string, EntityAreaEntry[]>();
    for (const e of filtered) {
      const list = grouped.get(e.domain) ?? [];
      list.push(e);
      grouped.set(e.domain, list);
    }

    const unassignedCount = entities.filter((e) => !e.areaId).length;

    // Filter areas by search in dropdown
    const filteredAreas = areaSearch
      ? areas.filter((a) => a.name.toLowerCase().includes(areaSearch))
      : areas;

    return html`
      <div class="tab-panel" id="panel-unassigned">
        <div class="section-label">${t('config.tab_unassigned')}</div>
        <div class="section-desc">${t('config.unassigned_desc')}</div>

        ${unassignedCount > 0 ? html`
          <div class="banner pw-ua-banner-warn">
            <ha-icon .icon=${'mdi:alert-circle-outline'}></ha-icon>
            <span>${t('config.unassigned_count', { count: String(unassignedCount) })}</span>
          </div>
        ` : nothing}

        ${entities.length === 0 ? html`
          <div class="banner">
            <ha-icon .icon=${'mdi:help-circle-outline'}></ha-icon>
            <span>${t('config.unassigned_no_entities')}</span>
          </div>
        ` : html`
          <!-- Entity search -->
          <input
            type="text"
            class="dropdown-search pw-ua-search"
            placeholder="${t('config.search_entity')}"
            aria-label="${t('config.search_entity')}"
            .value=${this._unassignedEntitySearch}
            @input=${(e: InputEvent) => { this._unassignedEntitySearch = (e.target as HTMLInputElement).value; }}
          />

          ${filtered.length === 0 ? html`
            <div class="banner">
              <ha-icon .icon=${'mdi:magnify'}></ha-icon>
              <span>${t('config.unassigned_no_results')}</span>
            </div>
          ` : nothing}

          ${[...grouped.entries()].map(([domain, items]) => html`
            <div class="section-label pw-ua-domain-group">
              <ha-icon .icon=${domainIcon(domain)} class="pw-ua-domain-icon"></ha-icon>
              ${domainLabel(domain)}
              <span class="pw-ua-domain-count">(${items.length})</span>
            </div>
            <div class="item-list">
              ${items.map((e) => {
                const isOpen = this._unassignedDropdownEntity === e.entityId;
                const isEditing = this._unassignedEditingEntity === e.entityId;
                return html`
                  <div class="item-card pw-ua-card">
                    <div class="item-row">
                      <button
                        class="pw-ua-icon-btn"
                        title="${t('config.unassigned_change_icon')}"
                        aria-label="${t('config.unassigned_change_icon')}: ${e.name}"
                        @click=${async () => { await this._openIconPopup(e.entityId); this._showIconPortal(); }}
                      >
                        <ha-icon .icon=${e.icon || domainIcon(e.domain)}></ha-icon>
                      </button>
                      <div class="item-info">
                        ${isEditing ? html`
                          <input
                            type="text"
                            class="entity-rename-input"
                            .value=${e.name}
                            aria-label="${t('config.unassigned_rename')}"
                            @blur=${(ev: FocusEvent) => {
                              const input = ev.target as HTMLInputElement;
                              if (input.dataset.cancelled) return;
                              this._renameEntity(e.entityId, input.value);
                            }}
                            @keydown=${(ev: KeyboardEvent) => {
                              if (ev.key === 'Enter') (ev.target as HTMLInputElement).blur();
                              if (ev.key === 'Escape') {
                                (ev.target as HTMLInputElement).dataset.cancelled = '1';
                                this._unassignedEditingEntity = null;
                              }
                            }}
                            @focus=${(ev: FocusEvent) => (ev.target as HTMLInputElement).select()}
                          />
                        ` : html`
                          <button class="item-name pw-ua-name" type="button"
                            @click=${() => {
                              this._unassignedEditingEntity = e.entityId;
                              this.updateComplete.then(() => {
                                const input = this.shadowRoot?.querySelector('.entity-rename-input') as HTMLInputElement | null;
                                input?.focus();
                              });
                            }}
                            title="${t('config.unassigned_rename')}"
                          >${e.name}</button>
                        `}
                        <span class="item-meta">${e.entityId}</span>
                      </div>
                    </div>
                    <div class="dropdown ${isOpen ? 'open' : ''} pw-ua-area-dropdown">
                      <button
                        class="dropdown-trigger pw-ua-area-trigger ${!e.areaId ? 'pw-ua-unassigned' : ''}"
                        @click=${(ev: Event) => {
                          ev.stopPropagation();
                          this._unassignedAreaSearch = '';
                          this._unassignedDropdownEntity = isOpen ? null : e.entityId;
                        }}
                        aria-expanded=${isOpen ? 'true' : 'false'}
                        aria-haspopup="listbox"
                      >
                        <ha-icon .icon=${e.areaId ? 'mdi:home' : 'mdi:alert-circle-outline'} class="pw-ua-area-icon"></ha-icon>
                        ${e.areaName ?? t('config.unassigned_select_area')}
                        <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
                      </button>
                      <div class="dropdown-menu" role="listbox">
                        <input
                          type="text"
                          class="dropdown-search"
                          placeholder="${t('config.search_entity')}"
                          aria-label="${t('config.search_entity')}"
                          .value=${this._unassignedAreaSearch}
                          @input=${(ev: InputEvent) => { this._unassignedAreaSearch = (ev.target as HTMLInputElement).value; }}
                          @click=${(ev: Event) => ev.stopPropagation()}
                        />
                        ${filteredAreas.map((a) => html`
                          <button
                            class="dropdown-item ${a.area_id === e.areaId ? 'active' : ''}"
                            role="option"
                            aria-selected=${a.area_id === e.areaId ? 'true' : 'false'}
                            @click=${() => this._assignEntityArea(e.entityId, a.area_id)}
                          >
                            <ha-icon .icon=${a.icon || 'mdi:home'}></ha-icon>
                            ${a.name}
                          </button>
                        `)}
                      </div>
                    </div>
                  </div>
                `;
              })}
            </div>
          `)}
        `}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${() => this._loadEntities()}>${t('common.reset')}</button>
        </div>
      </div>

    `;
  }
}

try { customElements.define('config-tab-unassigned', ConfigTabUnassigned); } catch { /* already registered */ }
