import type { CSSResult } from 'lit';
import { baseStyles } from './styles/base';
import { tabStyles } from './styles/tabs';
import { previewStyles } from './styles/previews';
import { formStyles } from './styles/forms';

export const configPanelStyles: CSSResult[] = [baseStyles, tabStyles, previewStyles, formStyles];
