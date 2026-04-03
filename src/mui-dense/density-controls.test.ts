import { describe, expect, it } from 'vitest';

import { DEFAULT_DENSE_THEME_FEATURES, DENSE_THEME_FEATURE_PRESETS, DENSE_THEME_PRESETS } from './dense';

describe('mui-dense public presets', () => {
    it('keeps the dense preset aligned with the intended compact baseline', () => {
        expect(DENSE_THEME_PRESETS.dense).toMatchObject({
            componentSize: 'small',
            denseFormMargins: true,
            denseLists: true,
            disableGlobalGutters: true,
            listDisablePadding: true,
            spacingBase: 4,
            tableSize: 'small',
            toolbarDense: true,
            toolbarDisableGutters: true,
            typographyScale: 1,
        });
    });

    it('maps theme-feature presets without inventing extra state', () => {
        expect(DENSE_THEME_FEATURE_PRESETS.default).toEqual(DEFAULT_DENSE_THEME_FEATURES);
        expect(DENSE_THEME_FEATURE_PRESETS.dense).toMatchObject({
            compactAccordionSummary: true,
            compactButtonsAndChips: true,
            compactIconButtons: true,
            compactInputs: true,
            compactListsAndMenus: true,
            compactTableCells: true,
            compactTreeItems: true,
        });
        expect(DENSE_THEME_FEATURE_PRESETS.densePlus).toEqual(DEFAULT_DENSE_THEME_FEATURES);
    });
});
