export type DensePreset = 'default' | 'dense' | 'densePlus';

export type DenseDataGridDensity = 'comfortable' | 'standard' | 'compact';

export type DenseDataGridOptions = {
    density: DenseDataGridDensity;
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
