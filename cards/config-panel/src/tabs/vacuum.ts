import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { t, type TranslationKey } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';
import { BaseConfigTab } from '../base-tab';
import {
  discoverVacuumCompanions,
  deriveVacuumPrefix,
  type VacuumCompanions,
} from '../../../vacuum-card/src/companions';
import {
  VACUUM_ROLES,
  VACUUM_ROLE_SECTIONS,
  slugFromButtonEntity,
  type VacuumRoleDef,
  type VacuumRoleSection,
} from '../../../vacuum-card/src/roles';
import { humanizeRoomSlug } from '../../../vacuum-card/src/labels';

interface VacuumEntity {
  entityId: string;
  name: string;
}

interface DropdownItem {
  value: string;
  label: string;
}

const AUTO_VALUE = '__auto__';
const NONE_VALUE = '__none__';

const SECTION_LABEL: Record<VacuumRoleSection, TranslationKey> = {
  state: 'config.vacuum_section_state',
  mopping: 'config.vacuum_section_mopping',
  dock: 'config.vacuum_section_dock',
  consumables: 'config.vacuum_section_consumables',
  stats: 'config.vacuum_section_stats',
};

const SECTION_ICON: Record<VacuumRoleSection, string> = {
  state: 'mdi:robot-vacuum-variant',
  mopping: 'mdi:water',
  dock: 'mdi:home-import-outline',
  consumables: 'mdi:broom',
  stats: 'mdi:chart-box-outline',
};

export class ConfigTabVacuum extends BaseConfigTab {
  @state() _vacuumShowHeader = true;
  @state() _vacuumEntity = '';
  @state() _overrides: Record<string, string> = {};
  @state() _roomButtonsHidden: string[] = [];
  @state() _roomButtonsOrder: string[] = [];
  @state() _roomButtonsExtra: string[] = [];
  /** Which collapsible sections are open. Not auto-saved. */
  @state() _openSections: Record<string, boolean> = {};
  @state() protected override _localDragIdx: number | null = null;
  @state() protected override _localDropIdx: number | null = null;

  protected static override _AUTO_SAVE_KEYS = new Set([
    '_vacuumShowHeader', '_vacuumEntity', '_overrides',
    '_roomButtonsHidden', '_roomButtonsOrder', '_roomButtonsExtra',
  ]);

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    this._checkAutoSave(changedProps);
  }

  loadFromConfig(config: Record<string, unknown>): void {
    const c = config as {
      show_header?: boolean;
      entity?: string;
      entity_overrides?: Record<string, string>;
      room_buttons_hidden?: string[];
      room_buttons_order?: string[];
      room_buttons_extra?: string[];
    };
    this._vacuumShowHeader = c.show_header ?? true;
    this._vacuumEntity = c.entity ?? '';
    this._overrides = c.entity_overrides ?? {};
    this._roomButtonsHidden = c.room_buttons_hidden ?? [];
    this._roomButtonsOrder = c.room_buttons_order ?? [];
    this._roomButtonsExtra = c.room_buttons_extra ?? [];
  }

  collectSaveData(): Record<string, unknown> {
    return {
      show_header: this._vacuumShowHeader,
      entity: this._vacuumEntity,
      entity_overrides: this._overrides,
      room_buttons_hidden: this._roomButtonsHidden,
      room_buttons_order: this._roomButtonsOrder,
      room_buttons_extra: this._roomButtonsExtra,
    };
  }

  protected override async _performSave(): Promise<void> {
    await this.backend!.send('set_vacuum_card', this.collectSaveData());
    bus.emit('vacuum-config-changed', undefined);
  }

  async reload(): Promise<void> {
    if (!this.backend) return;
    try {
      const result = await this.backend.send<{
        vacuum_card?: Record<string, unknown>;
      }>('get_config');
      if (result?.vacuum_card) this.loadFromConfig(result.vacuum_card);
    } catch { /* ignore */ }
  }

  // — Helpers —

  private _vacuums(): VacuumEntity[] {
    if (!this.hass) return [];
    return Object.keys(this.hass.states)
      .filter((id) => id.startsWith('vacuum.'))
      .sort()
      .map((id) => {
        const name = (this.hass?.states[id]?.attributes?.friendly_name as string) || id.split('.')[1] || id;
        return { entityId: id, name };
      });
  }

  /** Effective robot id (chosen entity, else first vacuum.*). */
  private _robotId(): string {
    if (this._vacuumEntity && this.hass?.states[this._vacuumEntity]) return this._vacuumEntity;
    return this._vacuums()[0]?.entityId ?? '';
  }

  private _autoCompanions(robotId: string): VacuumCompanions | null {
    if (!robotId || !this.hass) return null;
    return discoverVacuumCompanions(this.hass, robotId);
  }

  private _roleValue(roleKey: string): string {
    if (!(roleKey in this._overrides)) return AUTO_VALUE;
    return this._overrides[roleKey] === '' ? NONE_VALUE : this._overrides[roleKey];
  }

  private _onRoleChange(roleKey: string, value: string): void {
    const next = { ...this._overrides };
    if (value === AUTO_VALUE) delete next[roleKey];
    else if (value === NONE_VALUE) next[roleKey] = '';
    else next[roleKey] = value;
    this._overrides = next;
  }

  private _roleItems(role: VacuumRoleDef, prefix: string, autoEntity: string | undefined): DropdownItem[] {
    const items: DropdownItem[] = [
      {
        value: AUTO_VALUE,
        label: autoEntity
          ? t('config.vacuum_opt_auto', { entity: autoEntity })
          : t('config.vacuum_opt_auto_none'),
      },
      { value: NONE_VALUE, label: t('config.vacuum_opt_none') },
    ];
    const ids = Object.keys(this.hass?.states ?? {})
      .filter((id) => role.domains.includes(id.split('.')[0]));
    ids.sort((a, b) => {
      const ap = a.slice(a.indexOf('.') + 1).startsWith(prefix + '_') ? 0 : 1;
      const bp = b.slice(b.indexOf('.') + 1).startsWith(prefix + '_') ? 0 : 1;
      if (ap !== bp) return ap - bp;
      return a.localeCompare(b);
    });
    for (const id of ids) {
      const name = (this.hass?.states[id]?.attributes?.friendly_name as string) || id;
      items.push({ value: id, label: name });
    }
    // Ghost option: a current override pointing to a now-missing entity.
    const current = this._overrides[role.key as string];
    if (current && current !== '' && !this.hass?.states[current]) {
      items.push({ value: current, label: current });
    }
    return items;
  }

  private _toggleSection(key: string): void {
    this._openSections = { ...this._openSections, [key]: !this._openSections[key] };
  }

  // — Render —

  renderTab(): TemplateResult {
    void this._lang;

    const vacuums = this._vacuums();
    const robotId = this._robotId();
    const previewEntity = robotId || 'vacuum.placeholder';
    const auto = this._autoCompanions(robotId);
    const prefix = robotId ? deriveVacuumPrefix(robotId) : '';

    return html`
      <div class="tab-panel vacuum-tab" id="panel-vacuum">
        ${robotId
          ? html`<glass-vacuum-card
              .hass=${this.hass}
              .config=${{ type: 'custom:glass-vacuum-card', entity: previewEntity }}
              config-preview
            ></glass-vacuum-card>`
          : nothing}

        <div class="cfg-info">
          <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
          <span>${t('config.vacuum_dashboard_info')}</span>
        </div>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">1</span>
            <div class="cfg-section-text">
              <span class="section-label">${t('config.display')}</span>
            </div>
          </header>
          <div class="feature-list">
            ${this._renderFeatureRow({
              icon: 'mdi:page-layout-header',
              nameKey: 'config.vacuum_show_header',
              descKey: 'config.vacuum_show_header_desc',
              on: this._vacuumShowHeader,
              onToggle: () => { this._vacuumShowHeader = !this._vacuumShowHeader; },
            })}
          </div>
        </section>

        ${this._renderPrimarySection(vacuums, robotId)}

        ${vacuums.length === 0 ? nothing : html`
          <div class="cfg-info">
            <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
            <span>${t('config.vacuum_overrides_info')}</span>
          </div>
          ${VACUUM_ROLE_SECTIONS.map((section) =>
            this._renderRoleSection(section, prefix, auto))}
          ${this._renderRoomsSection(prefix, auto)}
        `}

        <div class="save-bar">
          <glass-button variant="ghost" @click=${() => this.reload()}>${t('common.reset')}</glass-button>
        </div>
      </div>
    `;
  }

  private _renderPrimarySection(vacuums: VacuumEntity[], robotId: string): TemplateResult {
    return html`
      <section class="cfg-section">
        <header class="cfg-section-head">
          <span class="cfg-section-num">2</span>
          <div class="cfg-section-text">
            <span class="section-label">${t('config.vacuum_entity')}</span>
            <span class="section-desc">${t('config.vacuum_entity_desc')}</span>
          </div>
        </header>
        ${vacuums.length === 0 ? html`
          <glass-empty-state variant="inline" .icon=${'mdi:robot-vacuum-variant'} .title=${t('config.vacuum_no_entities')}></glass-empty-state>
        ` : html`
          <glass-dropdown
            .items=${vacuums.map((v) => ({ value: v.entityId, label: v.name }))}
            .value=${robotId}
            aria-label=${t('config.vacuum_entity')}
            @glass-dropdown-change=${(e: CustomEvent<{ value: string }>) => {
              this._vacuumEntity = e.detail.value;
            }}
          ></glass-dropdown>
        `}
      </section>
    `;
  }

  private _renderRoleSection(
    section: VacuumRoleSection,
    prefix: string,
    auto: VacuumCompanions | null,
  ): TemplateResult {
    const roles = VACUUM_ROLES.filter((r) => r.section === section);
    const open = !!this._openSections[section];
    const overriddenCount = roles.filter((r) => (r.key as string) in this._overrides).length;
    return html`
      <section class="cfg-section">
        <button class="section-header" @click=${() => this._toggleSection(section)} aria-expanded=${open ? 'true' : 'false'}>
          <ha-icon .icon=${SECTION_ICON[section]}></ha-icon>
          <span class="section-title">${t(SECTION_LABEL[section])}</span>
          ${overriddenCount > 0 ? html`<span class="cfg-section-count">${overriddenCount}</span>` : nothing}
          <glass-chevron ?open=${open} size="sm" tone="muted"></glass-chevron>
        </button>
        <div class="section-fold ${open ? 'open' : ''}">
          <div class="section-fold-inner">
            <div class="item-list">
              ${roles.map((role) => {
                const autoEntity = auto
                  ? (auto[role.key] as string | undefined)
                  : undefined;
                return html`
                  <div class="item-card">
                    <div class="item-row static-row">
                      <div class="feature-icon"><ha-icon .icon=${role.icon}></ha-icon></div>
                      <div class="item-info">
                        <span class="item-name">${t(`config.vacuum_role_${role.key}` as TranslationKey)}</span>
                      </div>
                      <glass-dropdown
                        searchable
                        search-placeholder=${t('config.vacuum_search_entity')}
                        empty-text=${t('config.vacuum_no_match')}
                        .items=${this._roleItems(role, prefix, autoEntity)}
                        .value=${this._roleValue(role.key as string)}
                        aria-label=${t(`config.vacuum_role_${role.key}` as TranslationKey)}
                        @glass-dropdown-change=${(e: CustomEvent<{ value: string }>) =>
                          this._onRoleChange(role.key as string, e.detail.value)}
                      ></glass-dropdown>
                    </div>
                  </div>
                `;
              })}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  private _orderedRoomButtons(auto: VacuumCompanions | null, prefix: string): { entityId: string; slug: string }[] {
    const map = new Map<string, { entityId: string; slug: string }>();
    for (const b of auto?.roomButtons ?? []) map.set(b.entityId, b);
    for (const id of this._roomButtonsExtra) {
      if (!map.has(id)) map.set(id, { entityId: id, slug: slugFromButtonEntity(id, prefix) });
    }
    const all = [...map.values()];
    if (this._roomButtonsOrder.length === 0) return all;
    const orderMap = new Map(this._roomButtonsOrder.map((id, i) => [id, i]));
    return all.sort((a, b) => {
      const ai = orderMap.has(a.entityId) ? orderMap.get(a.entityId)! : Infinity;
      const bi = orderMap.has(b.entityId) ? orderMap.get(b.entityId)! : Infinity;
      return ai - bi;
    });
  }

  private _toggleRoomButtonVisible(entityId: string): void {
    const set = new Set(this._roomButtonsHidden);
    if (set.has(entityId)) set.delete(entityId); else set.add(entityId);
    this._roomButtonsHidden = [...set];
  }

  private _onRoomDrop(idx: number, ordered: { entityId: string }[]): void {
    if (this._localDragIdx === null || this._localDragIdx === idx) {
      this._localDragIdx = null; this._localDropIdx = null; return;
    }
    const arr = ordered.map((b) => b.entityId);
    const [moved] = arr.splice(this._localDragIdx, 1);
    arr.splice(idx, 0, moved);
    this._roomButtonsOrder = arr;
    this._localDragIdx = null; this._localDropIdx = null;
  }

  private _addRoomButton(entityId: string): void {
    if (!entityId || this._roomButtonsExtra.includes(entityId)) return;
    this._roomButtonsExtra = [...this._roomButtonsExtra, entityId];
    this._roomButtonsOrder = [...this._roomButtonsOrder, entityId];
  }

  private _renderRoomsSection(prefix: string, auto: VacuumCompanions | null): TemplateResult {
    const open = !!this._openSections['rooms'];
    const ordered = this._orderedRoomButtons(auto, prefix);
    const hiddenSet = new Set(this._roomButtonsHidden);

    // Candidates for the "+ add" dropdown: button.* not already listed.
    const present = new Set(ordered.map((b) => b.entityId));
    const addItems: DropdownItem[] = Object.keys(this.hass?.states ?? {})
      .filter((id) => id.startsWith('button.') && !present.has(id))
      .sort()
      .map((id) => ({
        value: id,
        label: (this.hass?.states[id]?.attributes?.friendly_name as string) || id,
      }));

    // allHouseButton role dropdown (single entity, domain button).
    const allHouseAuto = auto?.allHouseButton;
    const allHouseRole: VacuumRoleDef = { key: 'allHouseButton', section: 'state', domains: ['button'], icon: 'mdi:home-outline' };

    return html`
      <section class="cfg-section">
        <button class="section-header" @click=${() => this._toggleSection('rooms')} aria-expanded=${open ? 'true' : 'false'}>
          <ha-icon .icon=${'mdi:floor-plan'}></ha-icon>
          <span class="section-title">${t('config.vacuum_section_rooms')}</span>
          ${ordered.length > 0 ? html`<span class="cfg-section-count">${ordered.length - hiddenSet.size}/${ordered.length}</span>` : nothing}
          <glass-chevron ?open=${open} size="sm" tone="muted"></glass-chevron>
        </button>
        <div class="section-fold ${open ? 'open' : ''}">
          <div class="section-fold-inner">
            <div class="section-desc">${t('config.vacuum_rooms_desc')}</div>
            ${ordered.length === 0 ? html`
              <glass-empty-state variant="inline" .icon=${'mdi:gesture-tap-button'} .title=${t('config.vacuum_no_room_buttons')}></glass-empty-state>
            ` : html`
              <div class="item-list">
                ${ordered.map((b, idx) => {
                  const visible = !hiddenSet.has(b.entityId);
                  const isDragging = this._localDragIdx === idx;
                  const isDropTarget = this._localDropIdx === idx;
                  const rowClasses = [
                    'item-row',
                    isDragging ? 'dragging' : '',
                    isDropTarget ? 'drop-target' : '',
                    !visible ? 'disabled' : '',
                  ].filter(Boolean).join(' ');
                  return html`
                    <div class="item-card">
                      <div
                        class=${rowClasses}
                        draggable="true"
                        @dragstart=${() => { this._localDragIdx = idx; }}
                        @dragover=${(ev: DragEvent) => { ev.preventDefault(); this._localDropIdx = idx; }}
                        @dragleave=${() => { this._localDropIdx = null; }}
                        @drop=${(ev: DragEvent) => { ev.preventDefault(); this._onRoomDrop(idx, ordered); }}
                        @dragend=${() => { this._localDragIdx = null; this._localDropIdx = null; }}
                      >
                        <glass-drag-handle></glass-drag-handle>
                        <div class="item-info">
                          <span class="item-name">${b.slug ? humanizeRoomSlug(b.slug) : b.entityId}</span>
                          <span class="item-meta">${b.entityId}</span>
                        </div>
                        <glass-toggle
                          .checked=${visible}
                          aria-label="${visible ? t('common.hide') : t('common.show')} ${b.entityId}"
                          @glass-toggle-change=${() => this._toggleRoomButtonVisible(b.entityId)}
                        ></glass-toggle>
                      </div>
                    </div>
                  `;
                })}
              </div>
            `}

            ${addItems.length > 0 ? html`
              <div class="cfg-add-wrap">
                <glass-dropdown
                  searchable
                  class="cfg-add-btn"
                  placeholder=${t('config.vacuum_add_room')}
                  search-placeholder=${t('config.vacuum_search_entity')}
                  empty-text=${t('config.vacuum_no_match')}
                  .items=${addItems}
                  .value=${''}
                  aria-label=${t('config.vacuum_add_room')}
                  @glass-dropdown-change=${(e: CustomEvent<{ value: string }>) => this._addRoomButton(e.detail.value)}
                ></glass-dropdown>
              </div>
            ` : nothing}

            <div class="item-list" style="margin-top:0.75rem">
              <div class="item-card">
                <div class="item-row static-row">
                  <div class="feature-icon"><ha-icon .icon=${allHouseRole.icon}></ha-icon></div>
                  <div class="item-info">
                    <span class="item-name">${t('config.vacuum_role_allHouseButton')}</span>
                  </div>
                  <glass-dropdown
                    searchable
                    search-placeholder=${t('config.vacuum_search_entity')}
                    empty-text=${t('config.vacuum_no_match')}
                    .items=${this._roleItems(allHouseRole, prefix, allHouseAuto)}
                    .value=${this._roleValue('allHouseButton')}
                    aria-label=${t('config.vacuum_role_allHouseButton')}
                    @glass-dropdown-change=${(e: CustomEvent<{ value: string }>) =>
                      this._onRoleChange('allHouseButton', e.detail.value)}
                  ></glass-dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

try { customElements.define('config-tab-vacuum', ConfigTabVacuum); } catch { /* already registered */ }
