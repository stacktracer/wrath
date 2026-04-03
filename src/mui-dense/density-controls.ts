export type AdvancedDensityControls = {
    compactButtonsAndChips: boolean;
    compactIconButtons: boolean;
    compactInputs: boolean;
    compactListsAndMenus: boolean;
    compactAccordionSummary: boolean;
    compactTableCells: boolean;
    compactDataGridCells: boolean;
    compactDataGridToolbar: boolean;
    compactTreeItems: boolean;
};

export type AdvancedControlDefinition = {
    key: keyof AdvancedDensityControls;
    label: string;
    mechanism: string;
    description: string;
};

export type DensityPreset = 'default' | 'dense' | 'densePlus';
export type DensityPresetSelection = DensityPreset | 'custom';

export type DensityControls = {
    spacingBase: number;
    layoutScale: number;
    typographyScale: number;
    componentSize: 'small' | 'medium';
    denseFormMargins: boolean;
    disableGlobalGutters: boolean;
    denseLists: boolean;
    listDisablePadding: boolean;
    toolbarDense: boolean;
    toolbarDisableGutters: boolean;
    tableSize: 'small' | 'medium';
    imageGap: number;
    dataGridDensity: 'comfortable' | 'standard' | 'compact';
    dataGridHeaderFilters: boolean;
    dataGridHeaderFilterHeight: number;
    treeIndentation: number;
};

export type GalleryColorMode = 'light' | 'dark';

export type AutoDataGridMetrics = {
    checkboxHeight: number;
    columnHeaderHeight: number;
    devicePixelRatio: number;
    rowHeight: number;
    textLineHeight: number;
    xHeight: number;
};

export const DENSITY_PRESET_LABELS: Record<DensityPresetSelection, string> = {
    default: 'Default',
    dense: 'Dense',
    densePlus: 'Dense+',
    custom: 'Custom',
};

export const DEFAULT_ADVANCED_DENSITY_CONTROLS: AdvancedDensityControls = {
    compactButtonsAndChips: false,
    compactIconButtons: false,
    compactInputs: false,
    compactListsAndMenus: false,
    compactAccordionSummary: false,
    compactTableCells: false,
    compactDataGridCells: false,
    compactDataGridToolbar: false,
    compactTreeItems: false,
};

export const DENSE_ADVANCED_DENSITY_CONTROLS: AdvancedDensityControls = {
    ...DEFAULT_ADVANCED_DENSITY_CONTROLS,
    compactButtonsAndChips: true,
    compactIconButtons: true,
    compactInputs: true,
    compactListsAndMenus: true,
    compactAccordionSummary: true,
    compactTableCells: true,
    compactTreeItems: true,
};

export const THEME_OVERRIDE_CONTROLS: AdvancedControlDefinition[] = [
    {
        key: 'compactButtonsAndChips',
        label: 'Tighten button and chip padding',
        mechanism: 'Theme override: MuiButton and MuiChip styleOverrides',
        description: 'Shrinks action padding and chip label chrome without changing public size props.',
    },
    {
        key: 'compactIconButtons',
        label: 'Tighten icon button box size',
        mechanism: 'Theme override: MuiIconButton styleOverrides',
        description: 'Reduces icon-button padding so compact actions consume less area.',
    },
    {
        key: 'compactInputs',
        label: 'Tighten input root and text padding',
        mechanism: 'Theme override: MuiInputBase, MuiOutlinedInput, MuiFilledInput styleOverrides',
        description: 'Compacts text-entry shells and helper spacing beyond the public size props.',
    },
    {
        key: 'compactListsAndMenus',
        label: 'Tighten menu and list rows',
        mechanism: 'Theme override: MuiMenuItem, MuiListItemButton, MuiListSubheader styleOverrides',
        description: 'Reduces list-like row height and padding with slot-aware overrides.',
    },
    {
        key: 'compactAccordionSummary',
        label: 'Tighten accordion summary spacing',
        mechanism: 'Theme override: MuiAccordionSummary styleOverrides',
        description: 'Shrinks the accordion summary row without touching undocumented descendants.',
    },
    {
        key: 'compactTableCells',
        label: 'Tighten table cell padding',
        mechanism: 'Theme override: MuiTableCell styleOverrides',
        description: 'Compacts table rows by trimming head and body cell padding.',
    },
];

export const UTILITY_AND_SLOT_CONTROLS: AdvancedControlDefinition[] = [
    {
        key: 'compactDataGridCells',
        label: 'Tighten Data Grid cells and headers',
        mechanism: 'Utility classes: MuiDataGrid root selectors using exported gridClasses',
        description: 'Uses documented grid utility classes to trim header and cell padding.',
    },
    {
        key: 'compactDataGridToolbar',
        label: 'Compact Data Grid toolbar and quick filter',
        mechanism: 'Slot props: toolbar, quickFilterProps, baseButton, baseIconButton, baseTextField',
        description:
            'Uses documented slot props to tighten the toolbar controls without swapping components.',
    },
    {
        key: 'compactTreeItems',
        label: 'Tighten tree item layout and states',
        mechanism: 'MuiTreeItem overrides, treeItemClasses, and Tree data-* state hooks',
        description: 'Shrinks tree-item content, icon, label, and stateful rows through documented hooks.',
    },
];

export const ALL_ADVANCED_CONTROLS: AdvancedControlDefinition[] = [
    ...THEME_OVERRIDE_CONTROLS,
    ...UTILITY_AND_SLOT_CONTROLS,
];

export const DENSITY_PRESETS: Record<DensityPreset, DensityControls> = {
    default: {
        spacingBase: 8,
        layoutScale: 1,
        typographyScale: 1,
        componentSize: 'medium',
        denseFormMargins: false,
        disableGlobalGutters: false,
        denseLists: false,
        listDisablePadding: false,
        toolbarDense: false,
        toolbarDisableGutters: false,
        tableSize: 'medium',
        imageGap: 12,
        dataGridDensity: 'standard',
        dataGridHeaderFilters: false,
        dataGridHeaderFilterHeight: 52,
        treeIndentation: 24,
    },
    dense: {
        spacingBase: 4,
        layoutScale: 0.2,
        typographyScale: 1,
        componentSize: 'small',
        denseFormMargins: true,
        disableGlobalGutters: true,
        denseLists: true,
        listDisablePadding: true,
        toolbarDense: true,
        toolbarDisableGutters: true,
        tableSize: 'small',
        imageGap: 4,
        dataGridDensity: 'compact',
        dataGridHeaderFilters: false,
        dataGridHeaderFilterHeight: 52,
        treeIndentation: 12,
    },
    densePlus: {
        spacingBase: 2,
        layoutScale: 0.45,
        typographyScale: 0.65,
        componentSize: 'small',
        denseFormMargins: true,
        disableGlobalGutters: true,
        denseLists: true,
        listDisablePadding: true,
        toolbarDense: true,
        toolbarDisableGutters: true,
        tableSize: 'small',
        imageGap: 0,
        dataGridDensity: 'compact',
        dataGridHeaderFilters: true,
        dataGridHeaderFilterHeight: 24,
        treeIndentation: 0,
    },
};

export const ADVANCED_DENSITY_PRESETS: Record<DensityPreset, AdvancedDensityControls> = {
    default: DEFAULT_ADVANCED_DENSITY_CONTROLS,
    dense: DENSE_ADVANCED_DENSITY_CONTROLS,
    densePlus: DEFAULT_ADVANCED_DENSITY_CONTROLS,
};
