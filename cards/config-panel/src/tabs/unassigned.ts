import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import { resolveEntityAreaId, ROOM_CARD_ORDER } from '@glass-cards/base-card';
import { openIconPortal } from '@glass-cards/ui-core';
import { BaseConfigTab } from '../base-tab';
import { CARD_ICONS, getCardMeta } from '../types';

// — Types —

export interface EntityAreaEntry {
  entityId: string;
  name: string;
  domain: string;
  areaId: string | null;
  areaName: string | null;
  icon: string | null;
}

/** Domains handled by Glass Cards room cards — derived from the registry. */
const CONTROLLABLE_DOMAINS: readonly string[] = ROOM_CARD_ORDER;

// — Helpers —

function domainIcon(domain: string): string {
  return CARD_ICONS[domain] ?? 'mdi:help-circle';
}

function domainLabel(domain: string): string {
  const { nameKey } = getCardMeta(domain);
  return nameKey ? t(nameKey) : domain;
}

// — Component —

export class ConfigTabUnassigned extends BaseConfigTab {
  @state() _unassignedEntities: EntityAreaEntry[] = [];
  @state() _unassignedEntitySearch = '';
  @state() _unassignedEditingEntity: string | null = null;
  @state() _iconPopupEntity: string | null = null;
  @state() _filter: 'all' | 'orphans' = 'all';
  @state() _collapsedDomains = new Set<string>();

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
    this._unassignedEditingEntity = null;
    this._unassignedEntitySearch = '';
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

  private _closeIconPortal: (() => void) | null = null;

  private _openIconPopup(entityId: string): void {
    this._iconPopupEntity = entityId;
    const entity = this._unassignedEntities.find((e) => e.entityId === entityId);
    this._closeIconPortal = openIconPortal({
      hass: this.hass,
      value: entity?.icon ?? '',
      allowNone: true,
      headerText: t('config.unassigned_change_icon'),
      emptyText: t('config.title_no_icons_found'),
      onSelect: (icon) => void this._selectIcon(icon),
      onClose: () => { this._iconPopupEntity = null; this._closeIconPortal = null; },
    });
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

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._closeIconPortal?.();
    this._closeIconPortal = null;
  }

  // — Render —

  renderTab(): TemplateResult {
    void this._lang;
    if (!this.hass) return html`${nothing}`;

    const entities = this._unassignedEntities;
    const areas = Object.values(this.hass.areas).sort((a, b) => a.name.localeCompare(b.name));
    const entitySearch = this._unassignedEntitySearch.toLowerCase();

    const unassignedCount = entities.filter((e) => !e.areaId).length;
    const totalCount = entities.length;

    // Apply filter (all vs orphans) then search
    const filterPool = this._filter === 'orphans' ? entities.filter((e) => !e.areaId) : entities;
    const filtered = entitySearch
      ? filterPool.filter((e) =>
          e.name.toLowerCase().includes(entitySearch) ||
          e.entityId.toLowerCase().includes(entitySearch),
        )
      : filterPool;

    // Group by domain
    const grouped = new Map<string, EntityAreaEntry[]>();
    for (const e of filtered) {
      const list = grouped.get(e.domain) ?? [];
      list.push(e);
      grouped.set(e.domain, list);
    }

    const hasWarn = unassignedCount > 0;

    return html`
      <div class="tab-panel unassigned-tab" id="panel-unassigned">
        <div class="cfg-info ${hasWarn ? 'warn' : ''}">
          <ha-icon .icon=${hasWarn ? 'mdi:alert-circle-outline' : 'mdi:information-outline'}></ha-icon>
          <span>${hasWarn
            ? t('config.unassigned_info_warn', { count: String(unassignedCount) })
            : t('config.unassigned_info_ok')}</span>
        </div>

        ${entities.length === 0 ? html`
          <glass-empty-state variant="inline" .icon=${'mdi:help-circle-outline'} .title=${t('config.unassigned_no_entities')}></glass-empty-state>
        ` : html`
          <section class="cfg-section">
            <header class="cfg-section-head">
              <span class="cfg-section-num">1</span>
              <div class="cfg-section-text">
                <span class="section-label">${t('config.unassigned_list_title')}</span>
                <span class="section-desc">${t('config.unassigned_list_desc')}</span>
              </div>
              ${unassignedCount > 0 ? html`
                <span class="cfg-section-count" aria-label="${t('config.unassigned_orphan_count_aria', { count: unassignedCount })}">
                  ${unassignedCount}
                </span>
              ` : nothing}
            </header>

          <div class="ua-toolbar">
            <glass-form-input
              type="search"
              class="ua-search-input"
              placeholder="${t('config.search_entity')}"
              aria-label="${t('config.search_entity')}"
              .value=${this._unassignedEntitySearch}
              @glass-input=${(e: CustomEvent<{ value: string }>) => { this._unassignedEntitySearch = e.detail.value; }}
            ></glass-form-input>
            <div class="chip-group ua-filter-chips" role="tablist">
              <glass-chip
                size="sm"
                ?active=${this._filter === 'all'}
                @click=${() => { this._filter = 'all'; }}
              >
                ${t('config.unassigned_filter_all')}
                <span class="chip-count">${totalCount}</span>
              </glass-chip>
              <glass-chip
                class="${unassignedCount > 0 ? 'has-warn' : ''}"
                size="sm"
                active-color=${unassignedCount > 0 ? 'warning' : 'accent'}
                ?active=${this._filter === 'orphans'}
                @click=${() => { this._filter = 'orphans'; }}
              >
                ${t('config.unassigned_filter_orphans')}
                <span class="chip-count">${unassignedCount}</span>
              </glass-chip>
            </div>
          </div>

          ${filtered.length === 0 ? html`
            <glass-empty-state
              variant="inline"
              .icon=${this._filter === 'orphans' && !entitySearch ? 'mdi:check-circle-outline' : 'mdi:magnify'}
              .title=${this._filter === 'orphans' && !entitySearch
                ? t('config.unassigned_all_assigned')
                : t('config.unassigned_no_results')}
            ></glass-empty-state>
          ` : nothing}

          ${[...grouped.entries()].map(([domain, items]) => {
            const isCollapsed = this._collapsedDomains.has(domain);
            return html`
            <button
              class="ua-domain-head ${isCollapsed ? 'collapsed' : ''}"
              type="button"
              aria-expanded=${isCollapsed ? 'false' : 'true'}
              @click=${() => {
                const next = new Set(this._collapsedDomains);
                if (next.has(domain)) next.delete(domain);
                else next.add(domain);
                this._collapsedDomains = next;
              }}
            >
              <ha-icon class="ua-domain-chev" .icon=${'mdi:chevron-down'}></ha-icon>
              <ha-icon class="ua-domain-icon" .icon=${domainIcon(domain)}></ha-icon>
              <span class="ua-domain-label">${domainLabel(domain)}</span>
              <span class="ua-domain-count">${items.length}</span>
            </button>
            <div class="ua-list ${isCollapsed ? 'collapsed' : ''}">
              <div class="ua-list-inner">
              ${items.map((e) => {
                const isEditing = this._unassignedEditingEntity === e.entityId;
                const areaItems = areas.map((a) => ({ value: a.area_id, label: a.name, icon: a.icon || 'mdi:home' }));
                return html`
                  <div class="item-card pw-ua-card">
                    <div class="item-row">
                      <glass-icon-button
                        size="xs"
                        .icon=${e.icon || domainIcon(e.domain)}
                        title="${t('config.unassigned_change_icon')}"
                        aria-label="${t('config.unassigned_change_icon')}: ${e.name}"
                        @click=${() => this._openIconPopup(e.entityId)}
                      ></glass-icon-button>
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
                    <glass-dropdown
                      class="pw-ua-area-dropdown ${!e.areaId ? 'pw-ua-unassigned' : ''}"
                      .items=${areaItems}
                      .value=${e.areaId ?? ''}
                      .label=${t('config.unassigned_select_area')}
                      icon=${e.areaId ? 'mdi:home' : 'mdi:alert-circle-outline'}
                      searchable
                      search-placeholder=${t('config.search_entity')}
                      empty-text=${t('config.unassigned_no_results')}
                      @glass-dropdown-change=${(ev: CustomEvent<{ value: string }>) => this._assignEntityArea(e.entityId, ev.detail.value)}
                    ></glass-dropdown>
                  </div>
                `;
              })}
              </div>
            </div>
          `;})}
          </section>
        `}

        <div class="save-bar">
          <glass-button variant="ghost" @click=${() => this._loadEntities()}>${t('common.reset')}</glass-button>
        </div>
      </div>

    `;
  }
}

try { customElements.define('config-tab-unassigned', ConfigTabUnassigned); } catch { /* already registered */ }
