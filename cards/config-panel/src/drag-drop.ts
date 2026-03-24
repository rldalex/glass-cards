import type { GlassConfigPanel } from './index';

export function onDragStart(
  self: GlassConfigPanel,
  idx: number,
  context: 'rooms' | 'lights' | 'covers' | 'fans' | 'climates' | 'dashboard_covers' | 'dashboard_cards' | 'speakers' | 'title_sources' | 'title_modes' | 'camera_order',
  srcIdx?: number,
): void {
  self._dragIdx = idx;
  self._dragContext = context;
  if (srcIdx !== undefined) self._dragModeSrcIdx = srcIdx;
}

export function onDragOver(self: GlassConfigPanel, idx: number, e: DragEvent, srcIdx?: number): void {
  e.preventDefault();
  if (self._dragIdx === null || self._dragIdx === idx) return;
  // Block cross-source drag (legacy guard — title_modes now handled internally by ConfigTabTitle)
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
  // Note: 'rooms' drag is handled internally by ConfigRoomList
  // Note: 'cards'/'scenes' drag is handled internally by ConfigTabPopup
  // Note: 'lights' drag is handled internally by ConfigTabLight
  // Note: title_sources and title_modes drag is handled internally by ConfigTabTitle
  self._dragIdx = null;
  self._dropIdx = null;
}

export function onDragEnd(self: GlassConfigPanel): void {
  self._dragIdx = null;
  self._dropIdx = null;
  self._dragModeSrcIdx = null;
}
