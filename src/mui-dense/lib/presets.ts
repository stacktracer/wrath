import type { DensePreset, DenseSettings, DenseThemeFeatures } from './types';

export const DEFAULT_DENSE_THEME_FEATURES: DenseThemeFeatures = {
    compactButtonsAndChips: false,
    compactIconButtons: false,
    compactInputs: false,
    compactListsAndMenus: false,
    compactAccordionSummary: false,
    compactTableCells: false,
    compactTreeItems: false,
};

export const DEFAULT_DENSE_SETTINGS: DenseSettings = {
    dataGrid: {
        cellBlockPadding: {
            unit: 'px',
            value: 1,
        },
        density: 'standard',
        headerFilters: false,
        headerFilterHeight: 52,
    },
    features: DEFAULT_DENSE_THEME_FEATURES,
    theme: {
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
};

export const DENSE_PRESETS: Record<DensePreset, DenseSettings> = {
    default: DEFAULT_DENSE_SETTINGS,
    dense: {
        dataGrid: {
            cellBlockPadding: {
                unit: 'px',
                value: 1,
            },
            density: 'compact',
            headerFilters: false,
            headerFilterHeight: 52,
        },
        features: {
            ...DEFAULT_DENSE_THEME_FEATURES,
            compactButtonsAndChips: true,
            compactIconButtons: true,
            compactInputs: true,
            compactListsAndMenus: true,
            compactAccordionSummary: true,
            compactTableCells: true,
            compactTreeItems: true,
        },
        theme: {
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
    },
    densePlus: {
        dataGrid: {
            cellBlockPadding: {
                unit: 'px',
                value: 1,
            },
            density: 'compact',
            headerFilters: true,
            headerFilterHeight: 24,
        },
        features: DEFAULT_DENSE_THEME_FEATURES,
        theme: {
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
    },
};
