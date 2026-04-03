import type { DensePreset, DenseThemeConfig, DenseThemeFeatures } from './types';

export const DEFAULT_DENSE_THEME_FEATURES: DenseThemeFeatures = {
    compactButtonsAndChips: false,
    compactIconButtons: false,
    compactInputs: false,
    compactListsAndMenus: false,
    compactAccordionSummary: false,
    compactTableCells: false,
    compactTreeItems: false,
};

export const DENSE_THEME_PRESETS: Record<DensePreset, DenseThemeConfig> = {
    default: {
        spacingBase: 8,
        typographyScale: 1,
        componentSize: 'medium',
        denseFormMargins: false,
        disableGlobalGutters: false,
        denseLists: false,
        listDisablePadding: false,
        toolbarDense: false,
        toolbarDisableGutters: false,
        tableSize: 'medium',
    },
    dense: {
        spacingBase: 4,
        typographyScale: 1,
        componentSize: 'small',
        denseFormMargins: true,
        disableGlobalGutters: true,
        denseLists: true,
        listDisablePadding: true,
        toolbarDense: true,
        toolbarDisableGutters: true,
        tableSize: 'small',
    },
    densePlus: {
        spacingBase: 2,
        typographyScale: 0.65,
        componentSize: 'small',
        denseFormMargins: true,
        disableGlobalGutters: true,
        denseLists: true,
        listDisablePadding: true,
        toolbarDense: true,
        toolbarDisableGutters: true,
        tableSize: 'small',
    },
};

export const DENSE_THEME_FEATURE_PRESETS: Record<DensePreset, DenseThemeFeatures> = {
    default: DEFAULT_DENSE_THEME_FEATURES,
    dense: {
        ...DEFAULT_DENSE_THEME_FEATURES,
        compactButtonsAndChips: true,
        compactIconButtons: true,
        compactInputs: true,
        compactListsAndMenus: true,
        compactAccordionSummary: true,
        compactTableCells: true,
        compactTreeItems: true,
    },
    densePlus: DEFAULT_DENSE_THEME_FEATURES,
};
