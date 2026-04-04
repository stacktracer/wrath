export type DensePreset = 'default' | 'dense' | 'densePlus';

export type DenseDataGridDensity = 'comfortable' | 'standard' | 'compact';

// FIXME: Can we remove the `headerFilters` field from this type? Not sure it belongs here.
// FIXME: Can we provide a better knob than `headerFilterHeight`?
export type DenseDataGridOptions = {
    density: DenseDataGridDensity;
    headerFilters: boolean;
    headerFilterHeight: number;
    cellBlockPadding: string;
};

export type DenseSettings = {
    disableAnimations: boolean;
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
    compactButtonsAndChips: boolean;
    compactIconButtons: boolean;
    compactInputs: boolean;
    compactListsAndMenus: boolean;
    compactAccordionSummary: boolean;
    compactTableCells: boolean;
    compactTreeItems: boolean;
    dataGrid: DenseDataGridOptions;
};
