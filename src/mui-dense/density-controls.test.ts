import { describe, expect, it } from 'vitest';

import {
    ADVANCED_DENSITY_PRESETS,
    DENSITY_PRESETS,
    DENSE_ADVANCED_DENSITY_CONTROLS,
    DEFAULT_ADVANCED_DENSITY_CONTROLS,
} from './density-controls';

describe('mui-dense presets', () => {
    it('keeps the dense preset aligned with the intended compact baseline', () => {
        expect(DENSITY_PRESETS.dense).toMatchObject({
            componentSize: 'small',
            dataGridDensity: 'compact',
            dataGridHeaderFilterHeight: 52,
            dataGridHeaderFilters: false,
            denseFormMargins: true,
            denseLists: true,
            disableGlobalGutters: true,
            imageGap: 4,
            layoutScale: 0.2,
            listDisablePadding: true,
            spacingBase: 4,
            tableSize: 'small',
            toolbarDense: true,
            toolbarDisableGutters: true,
            treeIndentation: 12,
            typographyScale: 1,
        });
    });

    it('maps advanced controls per preset without inventing extra state', () => {
        expect(ADVANCED_DENSITY_PRESETS.default).toEqual(DEFAULT_ADVANCED_DENSITY_CONTROLS);
        expect(ADVANCED_DENSITY_PRESETS.dense).toEqual(DENSE_ADVANCED_DENSITY_CONTROLS);
        expect(ADVANCED_DENSITY_PRESETS.densePlus).toEqual(DEFAULT_ADVANCED_DENSITY_CONTROLS);
    });
});
