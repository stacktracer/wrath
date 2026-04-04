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
    dataGrid: {
        density: 'comfortable' | 'standard' | 'compact';
        contentVerticalPadding: string;
    };
};

export const DEFAULT_DENSE_SETTINGS: DenseSettings = {
    disableAnimations: false,
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
    compactButtonsAndChips: false,
    compactIconButtons: false,
    compactInputs: false,
    compactListsAndMenus: false,
    compactAccordionSummary: false,
    compactTableCells: false,
    compactTreeItems: false,
    dataGrid: {
        contentVerticalPadding: '1px',
        density: 'standard',
    },
};
