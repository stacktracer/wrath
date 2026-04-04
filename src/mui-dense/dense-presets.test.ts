import { describe, expect, it } from 'vitest';

import { DEFAULT_DENSE_SETTINGS } from './lib';
import { GALLERY_DENSE_PRESETS, adaptGalleryControlsToDenseSettings } from './gallery-dense';

describe('mui-dense gallery presets', () => {
    it('keeps the dense preset aligned with the intended compact baseline', () => {
        expect(adaptGalleryControlsToDenseSettings(GALLERY_DENSE_PRESETS.dense)).toMatchObject({
            componentSize: 'small',
            disableAnimations: true,
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
        expect(adaptGalleryControlsToDenseSettings(GALLERY_DENSE_PRESETS.default)).toMatchObject({
            compactAccordionSummary: DEFAULT_DENSE_SETTINGS.compactAccordionSummary,
            compactButtonsAndChips: DEFAULT_DENSE_SETTINGS.compactButtonsAndChips,
            compactIconButtons: DEFAULT_DENSE_SETTINGS.compactIconButtons,
            compactInputs: DEFAULT_DENSE_SETTINGS.compactInputs,
            compactListsAndMenus: DEFAULT_DENSE_SETTINGS.compactListsAndMenus,
            compactTableCells: DEFAULT_DENSE_SETTINGS.compactTableCells,
            compactTreeItems: DEFAULT_DENSE_SETTINGS.compactTreeItems,
        });
        expect(adaptGalleryControlsToDenseSettings(GALLERY_DENSE_PRESETS.dense)).toMatchObject({
            compactAccordionSummary: true,
            compactButtonsAndChips: true,
            compactIconButtons: true,
            compactInputs: true,
            compactListsAndMenus: true,
            compactTableCells: true,
            compactTreeItems: true,
        });
        expect(adaptGalleryControlsToDenseSettings(GALLERY_DENSE_PRESETS.densePlus)).toMatchObject({
            compactAccordionSummary: DEFAULT_DENSE_SETTINGS.compactAccordionSummary,
            compactButtonsAndChips: DEFAULT_DENSE_SETTINGS.compactButtonsAndChips,
            compactIconButtons: DEFAULT_DENSE_SETTINGS.compactIconButtons,
            compactInputs: DEFAULT_DENSE_SETTINGS.compactInputs,
            compactListsAndMenus: DEFAULT_DENSE_SETTINGS.compactListsAndMenus,
            compactTableCells: DEFAULT_DENSE_SETTINGS.compactTableCells,
            compactTreeItems: DEFAULT_DENSE_SETTINGS.compactTreeItems,
        });
    });
});
