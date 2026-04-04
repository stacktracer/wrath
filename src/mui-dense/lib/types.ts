export type DenseColorMode = 'light' | 'dark';

export type DensePreset = 'default' | 'dense' | 'densePlus';

export type DenseThemeOptions = {
    spacingBase: number;
    typographyScale: number;
    componentSize: 'small' | 'medium';
    denseFormMargins: boolean;
    disableGlobalGutters: boolean;
    denseLists: boolean;
    listDisablePadding: boolean;
    toolbarDense: boolean;
    toolbarDisableGutters: boolean;
    tableSize: 'small' | 'medium';
};

export type DenseThemeFeatures = {
    compactButtonsAndChips: boolean;
    compactIconButtons: boolean;
    compactInputs: boolean;
    compactListsAndMenus: boolean;
    compactAccordionSummary: boolean;
    compactTableCells: boolean;
    compactTreeItems: boolean;
};

export type DenseDataGridDensity = 'comfortable' | 'standard' | 'compact';

export type DenseDataGridCellBlockPadding = {
    unit: 'px' | 'ex';
    value: number;
};

export type DenseDataGridOptions = {
    density: DenseDataGridDensity;
    headerFilters: boolean;
    headerFilterHeight: number;
    cellBlockPadding: DenseDataGridCellBlockPadding;
};

export type DenseSettings = {
    dataGrid: DenseDataGridOptions;
    features: DenseThemeFeatures;
    theme: DenseThemeOptions;
};
