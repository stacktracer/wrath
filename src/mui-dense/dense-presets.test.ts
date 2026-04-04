import { describe, expect, it } from 'vitest';

import { DEFAULT_DENSE_THEME_FEATURES, DENSE_PRESETS } from './lib';

describe('mui-dense public presets', () => {
    it('keeps the dense preset aligned with the intended compact baseline', () => {
        expect(DENSE_PRESETS.dense.theme).toMatchObject({
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
        expect(DENSE_PRESETS.default.features).toEqual(DEFAULT_DENSE_THEME_FEATURES);
        expect(DENSE_PRESETS.dense.features).toMatchObject({
            compactAccordionSummary: true,
            compactButtonsAndChips: true,
            compactIconButtons: true,
            compactInputs: true,
            compactListsAndMenus: true,
            compactTableCells: true,
            compactTreeItems: true,
        });
        expect(DENSE_PRESETS.densePlus.features).toEqual(DEFAULT_DENSE_THEME_FEATURES);
    });
});
