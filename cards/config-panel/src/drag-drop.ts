import type { GlassConfigPanel } from './index';

export function onDragStart(
  self: GlassConfigPanel,
  idx: number,
  context: 'rooms' | 'cards' | 'scenes' | 'lights' | 'covers' | 'fans' | 'climates' | 'dashboard_covers' | 'dashboard_cards' | 'speakers' | 'title_sources' | 'title_modes' | 'camera_order',
  srcIdx?: number,
): void {
  self._dragIdx = idx;
  self._dragContext = context;
  if (context === 'title_modes') self._dragModeSrcIdx = srcIdx ?? null;
}

export function onDragOver(self: GlassConfigPanel, idx: number, e: DragEvent, srcIdx?: number): void {
  e.preventDefault();
  if (self._dragIdx === null || self._dragIdx === idx) return;
  // Block cross-source drag for title_modes
  if (self._dragContext === 'title_modes' && srcIdx !== undefined && srcIdx !== self._dragModeSrcIdx) return;
  self._dropIdx = idx;
}

export function onDragLeave(self: GlassConfigPanel): void {
  self._dropIdx = null;
}

export function onDropGeneric(self: GlassConfigPanel, idx: number, e: DragEvent): void {
  e.preventDefault();
  if (self._dragIdx === null || self._dragIdx === idx) {
    self._dragIdx = null;
    self._dropIdx = null;
    return;
  }
  const ctx = self._dragContext;
  if (ctx === 'rooms') {
    const arr = [...self._rooms];
    const [moved] = arr.splice(self._dragIdx, 1);
    arr.splice(idx, 0, moved);
    self._rooms = arr;
  } else if (ctx === 'cards') {
    const arr = [...self._cards];
    const [moved] = arr.splice(self._dragIdx, 1);
    arr.splice(idx, 0, moved);
    self._cards = arr;
  } else if (ctx === 'scenes') {
    const arr = [...self._scenes];
    const [moved] = arr.splice(self._dragIdx, 1);
    arr.splice(idx, 0, moved);
    self._scenes = arr;
  } else if (ctx === 'lights') {
    const arr = [...self._lights];
    const [moved] = arr.splice(self._dragIdx, 1);
    arr.splice(idx, 0, moved);
    self._lights = arr;
  } else if (ctx === 'climates') {
    const arr = [...self._climateRoomEntities];
    const [moved] = arr.splice(self._dragIdx, 1);
    arr.splice(idx, 0, moved);
    self._climateRoomEntities = arr;
  } else if (ctx === 'title_sources') {
    const arr = [...self._titleSources];
    const [moved] = arr.splice(self._dragIdx, 1);
    arr.splice(idx, 0, moved);
    self._titleSources = arr;
    // Update editing index to follow moved source
    if (self._titleEditingSourceIdx === self._dragIdx) {
      self._titleEditingSourceIdx = idx;
    } else if (self._titleEditingSourceIdx !== null) {
      const oldEdit = self._titleEditingSourceIdx;
      const from = self._dragIdx;
      if (from < oldEdit && idx >= oldEdit) self._titleEditingSourceIdx = oldEdit - 1;
      else if (from > oldEdit && idx <= oldEdit) self._titleEditingSourceIdx = oldEdit + 1;
    }
  } else if (ctx === 'title_modes' && self._dragModeSrcIdx !== null) {
    const sources = [...self._titleSources];
    const src = sources[self._dragModeSrcIdx];
    if (src) {
      const modes = [...src.modes];
      const [moved] = modes.splice(self._dragIdx, 1);
      modes.splice(idx, 0, moved);
      sources[self._dragModeSrcIdx] = { ...src, modes };
      self._titleSources = sources;
    }
    self._dragModeSrcIdx = null;
  }
  self._dragIdx = null;
  self._dropIdx = null;
}

export function onDragEnd(self: GlassConfigPanel): void {
  self._dragIdx = null;
  self._dropIdx = null;
  self._dragModeSrcIdx = null;
}
