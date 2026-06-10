import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { t, type TranslationKey } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';
import { BaseConfigTab } from '../base-tab';

// — Types —

type SourceType = 'input_select' | 'scenes' | 'booleans';
type TitleSource = { source_type: SourceType; entity: string; label: string; modes: { id: string; label: string; icon: string; color: string }[] };

const SOURCE_DEFS: { key: SourceType; i18nKey: TranslationKey; icon: string; tone: string }[] = [
  { key: 'input_select', i18nKey: 'config.title_source_input_select', icon: 'mdi:form-select', tone: 'info' },
  { key: 'scenes', i18nKey: 'config.title_source_scenes', icon: 'mdi:palette', tone: 'accent' },
  { key: 'booleans', i18nKey: 'config.title_source_booleans', icon: 'mdi:toggle-switch', tone: 'success' },
];

const COLORS = ['neutral', 'success', 'warning', 'info', 'accent', 'alert'];

const COLOR_LABEL: Record<string, string> = {
  neutral: 'Neutre', success: 'Vert', warning: 'Orange', info: 'Bleu', accent: 'Violet', alert: 'Rouge',
};

const DOT_MAP: Record<string, string> = {
  success: 'var(--c-success)', warning: 'var(--c-warning)',
  info: 'var(--c-info)', accent: 'var(--c-accent)',
  alert: 'var(--c-alert)', neutral: 'var(--t4)',
};
const resolveD = (c: string) => DOT_MAP[c] ?? (c.startsWith('#') ? c : 'var(--t4)');

/** Default period visuals used when no period_options are configured. */
const DEFAULT_PERIOD_VISUALS: Record<string, { icon: string; color: string }> = {
  'Matin':       { icon: 'mdi:weather-sunset-up',   color: '#f0a050' },
  'Après-midi':  { icon: 'mdi:white-balance-sunny',  color: '#7db8e0' },
  'Soir':        { icon: 'mdi:weather-sunset-down',  color: '#e08040' },
  'Nuit':        { icon: 'mdi:weather-night',        color: '#8b8ff0' },
};
const PERIOD_DEFAULT_VISUAL = { icon: 'mdi:clock-outline', color: 'var(--t3)' };

// — Component —

export class ConfigTabTitle extends BaseConfigTab {
  @state() _titleText = '';
  @state() _titleSources: TitleSource[] = [];
  @state() _titlePeriodEntity = '';
  @state() _titlePeriodOptions: { id: string; label: string; icon: string; color: string }[] = [];
  @state() _titleEditingSourceIdx: number | null = null;
  @state() _periodIconPopupIdx: number | null = null;
  @state() _iconPopupModeIdx: number | null = null;
  @state() _iconSearch = '';
  /** Index of the period option currently being edited inline (under the chip row). */
  @state() _periodEditingIdx: number | null = null;

  // Non-reactive state
  _iconList: string[] = [];
  _iconLoading = false;
  private _portalEl: HTMLDivElement | null = null;

  // Local drag state
  @state() _dragIdx: number | null = null;
  @state() _dropIdx: number | null = null;
  @state() _dragContext: 'title_sources' | 'title_modes' | '' = '';
  @state() _dragModeSrcIdx: number | null = null;

  protected static override _AUTO_SAVE_KEYS = new Set([
    '_titleText', '_titleSources', '_titlePeriodEntity', '_titlePeriodOptions',
  ]);

  get _titleModes(): { id: string; label: string; icon: string; color: string }[] {
    return this._titleSources.flatMap((s) => s.modes);
  }

  // — Lifecycle —

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    this._checkAutoSave(changedProps);
  }

  // — Persistence —

  loadFromConfig(config: Record<string, unknown>): void {
    const c = config as {
      title?: string;
      sources?: { source_type: string; entity: string; label: string; modes: { id: string; label: string; icon: string; color: string }[] }[];
      period_entity?: string;
      period_options?: { id: string; label: string; icon: string; color: string }[];
    };
    this._titleText = c.title ?? '';
    this._titlePeriodEntity = c.period_entity ?? '';
    this._titlePeriodOptions = (c.period_options ?? []).map((o) => ({
      id: o.id || '', label: o.label || '', icon: o.icon || '', color: o.color || 'neutral',
    }));
    this._titleSources = (c.sources ?? []).map((s) => ({
      source_type: (s.source_type || '') as SourceType,
      entity: s.entity || '',
      label: s.label || '',
      modes: (s.modes || []).map((m) => ({ id: m.id || '', label: m.label || '', icon: m.icon || '', color: m.color || 'neutral' })),
    }));
    // Bootstrap HA options missing from the stored list HERE, under the
    // _loading window — doing it from the render path mutated an auto-save
    // key mid-render and fired a phantom save on first open.
    if (this._titlePeriodEntity && this.hass) {
      const haOptions = (this.hass.states[this._titlePeriodEntity]?.attributes?.options as string[] | undefined) ?? [];
      const known = new Set(this._titlePeriodOptions.map((o) => o.id));
      const missing = haOptions.filter((id) => !known.has(id));
      if (missing.length > 0) {
        this._titlePeriodOptions = [
          ...this._titlePeriodOptions,
          ...missing.map((id) => ({ id, label: id, icon: '', color: 'neutral' })),
        ];
      }
    }
  }

  collectSaveData(): Record<string, unknown> {
    return {
      title: this._titleText,
      period_entity: this._titlePeriodEntity,
      period_options: this._titlePeriodOptions,
      sources: this._titleSources.map((s) => ({
        source_type: s.source_type,
        entity: s.entity || '',
        label: s.label || '',
        modes: s.modes,
      })),
    };
  }

  protected override async _performSave(): Promise<void> {
    await this.backend!.send('set_title_config', this.collectSaveData());
    bus.emit('title-config-changed', undefined);
  }

  async reload(): Promise<void> {
    if (!this.backend) return;
    this._iconPopupModeIdx = null;
    this._periodIconPopupIdx = null;
    this._removeIconPortal();
    this._titleEditingSourceIdx = null;
    await this._withLoading(async () => {
      try {
        const result = await this.backend!.send<{
          title_card: { title: string; sources: { source_type: string; entity: string; label: string; modes: { id: string; label: string; icon: string; color: string }[] }[]; period_entity: string; period_options: { id: string; label: string; icon: string; color: string }[] };
        }>('get_config');
        if (result?.title_card) this.loadFromConfig(result.title_card);
      } catch { /* ignore */ }
    });
  }

  // — Local drag & drop —

  private _localDragStart(idx: number, context: 'title_sources' | 'title_modes', srcIdx?: number): void {
    this._dragIdx = idx;
    this._dragContext = context;
    if (context === 'title_modes') this._dragModeSrcIdx = srcIdx ?? null;
  }

  private _localDragOver(idx: number, e: DragEvent, srcIdx?: number): void {
    e.preventDefault();
    if (this._dragIdx === null || this._dragIdx === idx) return;
    // Block cross-source drag for title_modes
    if (this._dragContext === 'title_modes' && srcIdx !== undefined && srcIdx !== this._dragModeSrcIdx) return;
    this._dropIdx = idx;
  }

  private _localDragLeave(): void {
    this._dropIdx = null;
  }

  private _localDrop(idx: number, e: DragEvent): void {
    e.preventDefault();
    if (this._dragIdx === null || this._dragIdx === idx) {
      this._dragIdx = null;
      this._dropIdx = null;
      return;
    }
    const ctx = this._dragContext;
    if (ctx === 'title_sources') {
      const arr = [...this._titleSources];
      const [moved] = arr.splice(this._dragIdx, 1);
      arr.splice(idx, 0, moved);
      this._titleSources = arr;
      // Update editing index to follow moved source
      if (this._titleEditingSourceIdx === this._dragIdx) {
        this._titleEditingSourceIdx = idx;
      } else if (this._titleEditingSourceIdx !== null) {
        const oldEdit = this._titleEditingSourceIdx;
        const from = this._dragIdx;
        if (from < oldEdit && idx >= oldEdit) this._titleEditingSourceIdx = oldEdit - 1;
        else if (from > oldEdit && idx <= oldEdit) this._titleEditingSourceIdx = oldEdit + 1;
      }
    } else if (ctx === 'title_modes' && this._dragModeSrcIdx !== null) {
      const sources = [...this._titleSources];
      const src = sources[this._dragModeSrcIdx];
      if (src) {
        const modes = [...src.modes];
        const [moved] = modes.splice(this._dragIdx, 1);
        modes.splice(idx, 0, moved);
        sources[this._dragModeSrcIdx] = { ...src, modes };
        this._titleSources = sources;
      }
      this._dragModeSrcIdx = null;
    }
    this._dragIdx = null;
    this._dropIdx = null;
  }

  private _localDragEnd(): void {
    this._dragIdx = null;
    this._dropIdx = null;
    this._dragModeSrcIdx = null;
  }

  // — Source actions —

  private _addTitleSource(sourceType: SourceType): void {
    this._titleSources = [...this._titleSources, {
      source_type: sourceType,
      entity: '',
      label: '',
      modes: [],
    }];
    this._titleEditingSourceIdx = this._titleSources.length - 1;
  }

  private _removeTitleSource(idx: number): void {
    const sources = [...this._titleSources];
    sources.splice(idx, 1);
    this._titleSources = sources;
    if (this._titleEditingSourceIdx === idx) {
      this._titleEditingSourceIdx = null;
    } else if (this._titleEditingSourceIdx !== null && this._titleEditingSourceIdx > idx) {
      this._titleEditingSourceIdx--;
    }
  }

  private _setTitleSourceEntity(srcIdx: number, entityId: string): void {
    const sources = [...this._titleSources];
    if (!sources[srcIdx]) return;
    sources[srcIdx] = { ...sources[srcIdx], entity: entityId };

    // Auto-populate modes from input_select options
    if (entityId.startsWith('input_select.') && this.hass) {
      const entity = this.hass.states[entityId];
      if (entity) {
        const options = (entity.attributes.options as string[] | undefined) ?? [];
        const existingMap = new Map(sources[srcIdx].modes.map((m) => [m.id, m]));
        sources[srcIdx] = {
          ...sources[srcIdx],
          modes: options.map((opt) => existingMap.get(opt) ?? { id: opt, label: opt, icon: '', color: 'neutral' }),
        };
      }
    } else if (!entityId) {
      sources[srcIdx] = { ...sources[srcIdx], modes: [] };
    }
    this._titleSources = sources;
  }

  private _setTitleSourceLabel(srcIdx: number, label: string): void {
    const sources = [...this._titleSources];
    if (!sources[srcIdx]) return;
    sources[srcIdx] = { ...sources[srcIdx], label };
    this._titleSources = sources;
  }

  private _addTitleModeEntity(srcIdx: number, entityId: string): void {
    const sources = [...this._titleSources];
    if (!sources[srcIdx]) return;
    if (sources[srcIdx].modes.some((m) => m.id === entityId)) return;

    const entity = this.hass?.states[entityId];
    const name = (entity?.attributes.friendly_name as string | undefined) || entityId.split('.')[1] || entityId;
    const defaultIcon = entityId.startsWith('scene.') ? 'mdi:palette' : 'mdi:toggle-switch';
    const defaultColor = entityId.startsWith('scene.') ? 'accent' : 'success';
    sources[srcIdx] = {
      ...sources[srcIdx],
      modes: [...sources[srcIdx].modes, { id: entityId, label: name, icon: defaultIcon, color: defaultColor }],
    };
    this._titleSources = sources;
  }

  private _removeTitleModeEntity(srcIdx: number, entityId: string): void {
    const sources = [...this._titleSources];
    if (!sources[srcIdx]) return;
    sources[srcIdx] = {
      ...sources[srcIdx],
      modes: sources[srcIdx].modes.filter((m) => m.id !== entityId),
    };
    this._titleSources = sources;
  }

  private _updateTitleMode(flatIdx: number, field: 'label' | 'icon' | 'color', value: string): void {
    // flatIdx spans across all sources — find srcIdx + local modeIdx
    let remaining = flatIdx;
    const sources = [...this._titleSources];
    for (let si = 0; si < sources.length; si++) {
      if (remaining < sources[si].modes.length) {
        const modes = [...sources[si].modes];
        modes[remaining] = { ...modes[remaining], [field]: value };
        sources[si] = { ...sources[si], modes };
        this._titleSources = sources;
        return;
      }
      remaining -= sources[si].modes.length;
    }
  }

  // — Period entity actions —

  private _setTitlePeriodEntity(entityId: string): void {
    this._titlePeriodEntity = entityId;
    if (!entityId) {
      this._titlePeriodOptions = [];
      return;
    }
    // Auto-populate period options from input_select options
    const entity = this.hass?.states[entityId];
    if (!entity) return;
    const options = (entity.attributes.options as string[] | undefined) ?? [];
    const existingMap = new Map(this._titlePeriodOptions.map((o) => [o.id, o]));
    this._titlePeriodOptions = options.map((opt) => existingMap.get(opt) ?? { id: opt, label: opt, icon: '', color: 'neutral' });
  }

  private _updateTitlePeriodOption(idx: number, field: 'icon' | 'color', value: string): void {
    const opts = [...this._titlePeriodOptions];
    if (!opts[idx]) return;
    opts[idx] = { ...opts[idx], [field]: value };
    this._titlePeriodOptions = opts;
  }

  // — Icon popup —

  private async _openIconPopup(modeIdx: number): Promise<void> {
    if (this._iconLoading) return;
    if (this._iconList.length === 0) {
      await this._loadIconList();
    }
    if (modeIdx < this._titleModes.length) {
      this._iconSearch = '';
      this._iconPopupModeIdx = modeIdx;
      this._showIconPortal();
    }
  }

  private async _openPeriodIconPopup(periodIdx: number): Promise<void> {
    if (this._iconLoading) return;
    if (this._iconList.length === 0) {
      await this._loadIconList();
    }
    if (periodIdx < this._titlePeriodOptions.length) {
      this._iconSearch = '';
      this._periodIconPopupIdx = periodIdx;
      this._showIconPortal();
    }
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
        if (items?.length) {
          this._iconList = items.map((i) => i.id);
        }
      }
    } catch { /* ignore */ } finally {
      if (this.shadowRoot?.contains(picker)) {
        this.shadowRoot.removeChild(picker);
      }
      this._iconLoading = false;
    }
  }

  private _getFilteredIcons(): string[] {
    const query = this._iconSearch.toLowerCase().trim();
    const list = this._iconList;
    if (!query) return list.slice(0, 120);
    return list.filter((icon) => icon.toLowerCase().includes(query)).slice(0, 120);
  }

  // — Icon portal (renders into document.body for viewport centering) —

  private _showIconPortal(): void {
    const isModePopup = this._iconPopupModeIdx !== null;
    const isPeriodPopup = this._periodIconPopupIdx !== null;
    if (!isModePopup && !isPeriodPopup) { this._removeIconPortal(); return; }

    const icons = this._getFilteredIcons();
    const modeIdx = this._iconPopupModeIdx;
    const periodIdx = this._periodIconPopupIdx;
    let currentIcon = '';
    if (isModePopup && modeIdx !== null) {
      currentIcon = this._titleModes[modeIdx]?.icon ?? '';
    } else if (periodIdx !== null) {
      currentIcon = this._titlePeriodOptions[periodIdx]?.icon ?? '';
    }

    if (!this._portalEl) {
      this._portalEl = document.createElement('div');
      document.body.appendChild(this._portalEl);
    }

    const close = () => { this._iconPopupModeIdx = null; this._periodIconPopupIdx = null; this._removeIconPortal(); };
    const select = (icon: string) => {
      if (isModePopup && this._iconPopupModeIdx !== null) {
        this._updateTitleMode(this._iconPopupModeIdx, 'icon', icon);
      } else if (isPeriodPopup && this._periodIconPopupIdx !== null) {
        this._updateTitlePeriodOption(this._periodIconPopupIdx, 'icon', icon);
      }
      this._removeIconPortal();
    };
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
    titleEl.textContent = t('config.title_mode_icon');
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

  // — Render: Source editor —

  private _renderSourceEditor(src: TitleSource, srcIdx: number): TemplateResult {
    const isEditing = this._titleEditingSourceIdx === srcIdx;
    const srcDef = SOURCE_DEFS.find((s) => s.key === src.source_type);
    const sourceLabel = src.label || (srcDef ? t(srcDef.i18nKey) : '') || src.source_type;
    const isDragging = this._dragIdx === srcIdx && this._dragContext === 'title_sources';
    const isDropTarget = this._dropIdx === srcIdx && this._dragContext === 'title_sources';

    return html`
      <div
        class="title-source-block ${isDragging ? 'dragging' : ''} ${isDropTarget ? 'drop-target' : ''}"
        draggable="true"
        @dragstart=${() => this._localDragStart(srcIdx, 'title_sources')}
        @dragover=${(e: DragEvent) => this._localDragOver(srcIdx, e)}
        @dragleave=${() => this._localDragLeave()}
        @drop=${(e: DragEvent) => this._localDrop(srcIdx, e)}
        @dragend=${() => this._localDragEnd()}
      >
        <div class="title-source-header">
          <glass-drag-handle></glass-drag-handle>
          <ha-icon .icon=${srcDef?.icon || 'mdi:help'}></ha-icon>
          <span class="title-source-type">${sourceLabel}</span>
          <span class="title-source-badge">${src.modes.length}</span>
          <glass-icon-button
            class="title-source-actions-first"
            size="xs"
            .icon=${isEditing ? 'mdi:pencil' : 'mdi:pencil-outline'}
            aria-label=${isEditing ? t('common.collapse') : t('common.expand')}
            @click=${() => { this._titleEditingSourceIdx = isEditing ? null : srcIdx; }}
          ></glass-icon-button>
          <glass-icon-button
            size="xs"
            .icon=${'mdi:close'}
            aria-label=${t('config.title_remove_source')}
            @click=${() => this._removeTitleSource(srcIdx)}
          ></glass-icon-button>
        </div>

        ${isEditing ? html`
          <div class="title-source-body">
            <!-- Label -->
            <div class="title-source-field">
              <span class="title-source-field-label">${t('config.title_source_label')}</span>
              <glass-form-input
                class="input"
                type="text"
                .value=${src.label}
                placeholder=${srcDef ? t(srcDef.i18nKey) : ''}
                @glass-input=${(e: CustomEvent<{ value: string }>) => this._setTitleSourceLabel(srcIdx, e.detail.value)}
              ></glass-form-input>
            </div>

            ${src.source_type === 'input_select' ? this._renderInputSelectEntityPicker(src, srcIdx) : nothing}

            <!-- Mode list -->
            ${src.modes.length > 0 ? html`
              <div class="section-label mt-sm">${t('config.title_modes')}</div>
              <div class="title-modes-list">
                ${src.modes.map((mode, modeIdx) => this._renderModeRow(src, srcIdx, mode, modeIdx))}
              </div>
            ` : nothing}

            ${(src.source_type === 'scenes' || src.source_type === 'booleans') ? this._renderEntityAdder(src, srcIdx) : nothing}
          </div>
        ` : nothing}
      </div>
    `;
  }

  // — Render: Input select entity picker —

  private _renderInputSelectEntityPicker(src: TitleSource, srcIdx: number): TemplateResult {
    const inputSelectEntities = this.hass
      ? Object.keys(this.hass.states).filter((id) => id.startsWith('input_select.')).sort()
      : [];
    const items = [
      { value: '', label: t('title_card.mode_none'), icon: 'mdi:close' },
      ...inputSelectEntities.map((id) => ({ value: id, label: id, icon: 'mdi:form-select' })),
    ];

    return html`
      <div class="title-source-field">
        <span class="title-source-field-label">${t('config.title_mode_entity')}</span>
        <glass-dropdown
          .items=${items}
          .value=${src.entity}
          .label=${src.entity || t('config.title_select_entity')}
          icon=${src.entity ? 'mdi:form-select' : 'mdi:help-circle-outline'}
          searchable
          search-placeholder=${t('config.search_entity')}
          @glass-dropdown-change=${(e: CustomEvent<{ value: string }>) => this._setTitleSourceEntity(srcIdx, e.detail.value)}
        ></glass-dropdown>
      </div>
    `;
  }

  // — Render: Scene/Boolean entity adder —

  private _renderEntityAdder(src: TitleSource, srcIdx: number): TemplateResult {
    const entityPrefix = src.source_type === 'scenes' ? 'scene.' : 'input_boolean.';
    const entityIcon = src.source_type === 'scenes' ? 'mdi:palette' : 'mdi:toggle-switch';
    const allEntities = this.hass
      ? Object.keys(this.hass.states).filter((id) => id.startsWith(entityPrefix)).sort()
      : [];
    const existingIds = new Set(src.modes.map((m) => m.id));
    const addable = allEntities.filter((id) => !existingIds.has(id));
    const items = addable.map((id) => ({ value: id, label: id, icon: entityIcon }));

    return html`
      <div class="title-source-field">
        <span class="title-source-field-label">${t('config.title_add_entity')}</span>
        <glass-dropdown
          .items=${items}
          .value=${''}
          .label=${t('config.title_add_entity')}
          icon="mdi:plus"
          searchable
          search-placeholder=${t('config.search_entity')}
          @glass-dropdown-change=${(e: CustomEvent<{ value: string }>) => { if (e.detail.value) this._addTitleModeEntity(srcIdx, e.detail.value); }}
        ></glass-dropdown>
      </div>
    `;
  }

  // — Render: Mode row —

  private _renderModeRow(src: TitleSource, srcIdx: number, mode: { id: string; label: string; icon: string; color: string }, modeIdx: number): TemplateResult {
    // Compute flat index for icon/color picker (across all sources)
    let flatIdx = 0;
    for (let si = 0; si < srcIdx; si++) flatIdx += this._titleSources[si].modes.length;
    flatIdx += modeIdx;

    const isDragging = this._dragIdx === modeIdx && this._dragContext === 'title_modes' && this._dragModeSrcIdx === srcIdx;
    const isDropTarget = this._dropIdx === modeIdx && this._dragContext === 'title_modes' && this._dragModeSrcIdx === srcIdx;

    return html`
      <div
        class="title-mode-row ${isDragging ? 'dragging' : ''} ${isDropTarget ? 'drop-target' : ''}"
        draggable="true"
        @dragstart=${() => this._localDragStart(modeIdx, 'title_modes', srcIdx)}
        @dragover=${(e: DragEvent) => this._localDragOver(modeIdx, e, srcIdx)}
        @dragleave=${() => this._localDragLeave()}
        @drop=${(e: DragEvent) => this._localDrop(modeIdx, e)}
        @dragend=${() => this._localDragEnd()}
      >
        <div class="title-mode-header">
          <glass-drag-handle></glass-drag-handle>
          <span class="title-mode-id">${mode.id}</span>
          ${(src.source_type === 'scenes' || src.source_type === 'booleans') ? html`
            <glass-icon-button
              size="xs"
              .icon=${'mdi:close'}
              aria-label=${t('config.title_remove_entity')}
              @click=${() => this._removeTitleModeEntity(srcIdx, mode.id)}
            ></glass-icon-button>
          ` : nothing}
        </div>
        <div class="title-mode-fields-row">
          <glass-form-input
            class="input"
            type="text"
            placeholder=${t('config.title_mode_label')}
            .value=${mode.label}
            @glass-input=${(e: CustomEvent<{ value: string }>) => this._updateTitleMode(flatIdx, 'label', e.detail.value)}
          ></glass-form-input>
          <button
            class="title-icon-btn ${mode.icon ? 'has-icon' : ''}"
            @click=${() => this._openIconPopup(flatIdx)}
            aria-label="${t('config.title_mode_icon')}"
          >
            <ha-icon .icon=${mode.icon || 'mdi:emoticon-outline'}></ha-icon>
          </button>
        </div>
        <div class="title-color-row">
          <span class="title-color-label">${t('config.title_mode_color')}</span>
          <div class="title-color-chips">
            ${COLORS.map((c) => html`
              <button
                class="title-color-chip ${c} ${mode.color === c ? 'active' : ''}"
                @click=${() => this._updateTitleMode(flatIdx, 'color', c)}
                aria-label="${t('config.title_mode_color')}: ${c}"
              ></button>
            `)}
          </div>
        </div>
      </div>
    `;
  }

  // — Render: Period entity picker —

  private _renderPeriodEntityPicker(): TemplateResult {
    const inputSelectEntities = this.hass
      ? Object.keys(this.hass.states).filter((id) => id.startsWith('input_select.')).sort()
      : [];
    const currentEntity = this._titlePeriodEntity;
    const items = [
      { value: '', label: t('config.title_period_auto'), icon: 'mdi:clock-outline' },
      ...inputSelectEntities.map((id) => ({ value: id, label: id, icon: 'mdi:form-select' })),
    ];

    return html`
      <glass-dropdown
        .items=${items}
        .value=${currentEntity}
        .label=${currentEntity || t('config.title_period_auto')}
        icon=${currentEntity ? 'mdi:form-select' : 'mdi:clock-outline'}
        searchable
        search-placeholder=${t('config.search_entity')}
        @glass-dropdown-change=${(e: CustomEvent<{ value: string }>) => this._setTitlePeriodEntity(e.detail.value)}
      ></glass-dropdown>
    `;
  }

  // — Render: Period options as horizontal chip-row + inline editor —

  private _renderPeriodOptionsEditor(): TemplateResult | typeof nothing {
    const periodEntity = this._titlePeriodEntity
      ? this.hass?.states[this._titlePeriodEntity]
      : undefined;
    const haOptions = (periodEntity?.attributes?.options as string[] | undefined) ?? [];

    if (haOptions.length === 0) {
      return html`
        <div class="title-period-empty">
          <ha-icon .icon=${'mdi:clock-outline'}></ha-icon>
          <div class="title-period-empty-text">
            <strong>${t('config.title_period_options')}</strong>
            <span>${t('config.title_period_options_desc')}</span>
          </div>
        </div>
      `;
    }

    // Options are bootstrapped in loadFromConfig/_setTitlePeriodEntity —
    // never mutate state from the render path (phantom auto-save).
    const currentState = periodEntity?.state ?? '';

    return html`
      <div class="title-period-head">
        <span class="title-period-head-label">${t('config.title_period_options')}</span>
        <span class="title-period-head-desc">${t('config.title_period_options_desc')}</span>
      </div>

      <div class="title-period-chips-row" role="listbox" aria-label="${t('config.title_period_options')}">
        ${haOptions.map((optionId) => {
          const idx = this._titlePeriodOptions.findIndex((o) => o.id === optionId);
          if (idx === -1) return nothing;
          const opt = this._titlePeriodOptions[idx];
          const defaultVisual = DEFAULT_PERIOD_VISUALS[optionId] ?? PERIOD_DEFAULT_VISUAL;
          const icon = opt.icon || defaultVisual.icon;
          const colorKey = opt.color || (DEFAULT_PERIOD_VISUALS[optionId]?.color ?? 'neutral');
          const tint = resolveD(colorKey);
          const isEditing = this._periodEditingIdx === idx;
          const isLive = currentState === optionId;

          return html`
            <button
              class="title-period-chip ${isEditing ? 'editing' : ''} ${isLive ? 'live' : ''}"
              style="--chip-tint:${tint};"
              role="option"
              aria-selected=${isEditing ? 'true' : 'false'}
              @click=${() => { this._periodEditingIdx = isEditing ? null : idx; }}
            >
              <span class="title-period-chip-icon"><ha-icon .icon=${icon}></ha-icon></span>
              <span class="title-period-chip-name">${optionId}</span>
              ${isLive ? html`<span class="title-period-chip-live-dot" aria-label="${t('common.active')}"></span>` : nothing}
            </button>
          `;
        })}
      </div>

      ${this._periodEditingIdx !== null && this._periodEditingIdx < this._titlePeriodOptions.length ? html`
        ${this._renderPeriodChipEditor(this._periodEditingIdx, haOptions)}
      ` : nothing}
    `;
  }

  private _renderPeriodChipEditor(idx: number, haOptions: string[]): TemplateResult {
    const opt = this._titlePeriodOptions[idx];
    const optionId = opt.id;
    const defaultVisual = DEFAULT_PERIOD_VISUALS[optionId] ?? PERIOD_DEFAULT_VISUAL;
    const icon = opt.icon || defaultVisual.icon;
    const colorKey = opt.color || (DEFAULT_PERIOD_VISUALS[optionId]?.color ?? 'neutral');

    return html`
      <div class="title-period-editor" role="region" aria-label="${optionId}">
        <div class="title-period-editor-head">
          <ha-icon class="title-period-editor-icon" .icon=${icon} style="color:${resolveD(colorKey)};"></ha-icon>
          <span class="title-period-editor-name">${optionId}</span>
          <glass-icon-button size="xs" .icon=${'mdi:close'} aria-label="${t('common.close')}"
            @click=${() => { this._periodEditingIdx = null; }}></glass-icon-button>
        </div>

        <div class="title-period-editor-field">
          <span class="title-period-editor-field-label">${t('config.title_mode_icon')}</span>
          <button
            class="title-icon-btn ${opt.icon ? 'has-icon' : ''}"
            @click=${() => this._openPeriodIconPopup(idx)}
            aria-label="${t('config.title_mode_icon')}"
          >
            <ha-icon .icon=${icon}></ha-icon>
          </button>
        </div>

        <div class="title-period-editor-field">
          <span class="title-period-editor-field-label">${t('config.title_mode_color')}</span>
          <div class="title-color-swatches">
            ${COLORS.map((c) => html`
              <glass-color-swatch
                with-check
                .color=${resolveD(c)}
                ?selected=${colorKey === c}
                aria-label="${COLOR_LABEL[c] ?? c}"
                title="${COLOR_LABEL[c] ?? c}"
                @click=${() => this._updateTitlePeriodOption(idx, 'color', c)}
              ></glass-color-swatch>
            `)}
          </div>
        </div>

        ${haOptions.length > 1 ? (() => {
          // Cycle through the DISPLAYED chips. `idx` indexes _titlePeriodOptions,
          // which may hold extra entries from a previously selected entity — a
          // raw modulo on either length would edit the wrong option.
          const displayed = haOptions
            .map((id) => this._titlePeriodOptions.findIndex((o) => o.id === id))
            .filter((i) => i !== -1);
          const pos = Math.max(0, displayed.indexOf(idx));
          const prev = displayed[(pos - 1 + displayed.length) % displayed.length];
          const next = displayed[(pos + 1) % displayed.length];
          return html`
          <div class="title-period-editor-nav">
            <button class="btn-link" @click=${() => { this._periodEditingIdx = prev; }}>
              <ha-icon .icon=${'mdi:chevron-left'}></ha-icon>
              <span>${t('common.previous')}</span>
            </button>
            <button class="btn-link" @click=${() => { this._periodEditingIdx = next; }}>
              <span>${t('common.next')}</span>
              <ha-icon .icon=${'mdi:chevron-right'}></ha-icon>
            </button>
          </div>
        `;
        })() : nothing}
      </div>
    `;
  }

  // — Render: Tab —

  renderTab(): TemplateResult {
    void this._lang;
    const sources = this._titleSources;
    const titleChars = this._titleText.length;
    const titleMax = 40;
    const sourcesEmpty = sources.length === 0;

    return html`
      <div class="tab-panel title-tab" id="panel-title">
        <glass-title-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-title-card>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">1</span>
            <div class="cfg-section-text">
              <span class="section-label">${t('config.title_title')}</span>
              <span class="section-desc">${t('config.title_title_desc')}</span>
            </div>
          </header>
          <div class="title-text-field">
            <glass-form-input
              class="input"
              type="text"
              .value=${this._titleText}
              placeholder=${t('config.title_title_placeholder')}
              max-length=${titleMax}
              @glass-input=${(e: CustomEvent<{ value: string }>) => { this._titleText = e.detail.value; }}
            >
              <span slot="trailing" class="title-text-count ${titleChars > titleMax * 0.85 ? 'warn' : ''}">
                ${titleChars}/${titleMax}
              </span>
            </glass-form-input>
          </div>
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">2</span>
            <div class="cfg-section-text">
              <span class="section-label">${t('config.title_mode_source')}</span>
              <span class="section-desc">${t('config.title_mode_source_desc')}</span>
            </div>
            ${!sourcesEmpty ? html`<span class="cfg-section-count">${sources.length}</span>` : nothing}
          </header>

          ${sourcesEmpty ? html`
            <glass-empty-state variant="inline" .icon=${'mdi:cursor-default-click-outline'} .title=${t('config.title_sources_empty')}></glass-empty-state>
          ` : sources.map((src, srcIdx) => this._renderSourceEditor(src, srcIdx))}

          <div class="cfg-add-wrap">
            <glass-dropdown
              class="cfg-add-btn"
              .items=${SOURCE_DEFS.map((s) => ({ value: s.key, label: t(s.i18nKey), icon: s.icon }))}
              .value=${''}
              .label=${t('config.title_add_source')}
              icon="mdi:plus"
              @glass-dropdown-change=${(e: CustomEvent<{ value: string }>) => this._addTitleSource(e.detail.value as SourceType)}
            ></glass-dropdown>
          </div>
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">3</span>
            <div class="cfg-section-text">
              <span class="section-label">${t('config.title_period_entity')}</span>
              <span class="section-desc">${t('config.title_period_entity_desc')}</span>
            </div>
          </header>
          ${this._renderPeriodEntityPicker()}
          ${this._renderPeriodOptionsEditor()}
        </section>

        <div class="save-bar">
          <glass-button variant="ghost" @click=${() => this.reload()}>${t('common.reset')}</glass-button>
        </div>
      </div>
    `;
  }
}

try { customElements.define('config-tab-title', ConfigTabTitle); } catch { /* already registered */ }
