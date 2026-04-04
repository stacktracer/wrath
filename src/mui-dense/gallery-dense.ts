import {
    DENSE_PRESETS,
    type DenseDataGridCellBlockPadding,
    type DensePreset,
    type DenseSettings,
    type DenseThemeFeatures,
    type DenseThemeOptions,
} from './lib';

export type GalleryAdvancedControlDefinition = {
    key: keyof DenseThemeFeatures;
    label: string;
    mechanism: string;
    description: string;
};

type GalleryOnlyDenseControls = {
    imageGap: number;
    layoutScale: number;
    treeIndentation: number;
};

export type GalleryDenseControls = DenseThemeOptions &
    GalleryOnlyDenseControls & {
        dataGridCellBlockPadding: number;
        dataGridCellBlockPaddingUnit: DenseDataGridCellBlockPadding['unit'];
        dataGridDensity: DenseSettings['dataGrid']['density'];
        dataGridHeaderFilters: boolean;
        dataGridHeaderFilterHeight: number;
    };

export type GalleryPresetSelection = DensePreset | 'custom';

export const GALLERY_DENSE_PRESET_LABELS: Record<GalleryPresetSelection, string> = {
    custom: 'Custom',
    default: 'Default',
    dense: 'Dense',
    densePlus: 'Dense+',
};

const GALLERY_ONLY_DENSE_PRESETS: Record<DensePreset, GalleryOnlyDenseControls> = {
    default: {
        imageGap: 12,
        layoutScale: 1,
        treeIndentation: 24,
    },
    dense: {
        imageGap: 4,
        layoutScale: 0.2,
        treeIndentation: 12,
    },
    densePlus: {
        imageGap: 0,
        layoutScale: 0.45,
        treeIndentation: 0,
    },
};

export const GALLERY_DENSE_PRESETS: Record<DensePreset, GalleryDenseControls> = {
    default: {
        ...DENSE_PRESETS.default.theme,
        ...GALLERY_ONLY_DENSE_PRESETS.default,
        dataGridCellBlockPadding: DENSE_PRESETS.default.dataGrid.cellBlockPadding.value,
        dataGridCellBlockPaddingUnit: DENSE_PRESETS.default.dataGrid.cellBlockPadding.unit,
        dataGridDensity: DENSE_PRESETS.default.dataGrid.density,
        dataGridHeaderFilters: DENSE_PRESETS.default.dataGrid.headerFilters,
        dataGridHeaderFilterHeight: DENSE_PRESETS.default.dataGrid.headerFilterHeight,
    },
    dense: {
        ...DENSE_PRESETS.dense.theme,
        ...GALLERY_ONLY_DENSE_PRESETS.dense,
        dataGridCellBlockPadding: DENSE_PRESETS.dense.dataGrid.cellBlockPadding.value,
        dataGridCellBlockPaddingUnit: DENSE_PRESETS.dense.dataGrid.cellBlockPadding.unit,
        dataGridDensity: DENSE_PRESETS.dense.dataGrid.density,
        dataGridHeaderFilters: DENSE_PRESETS.dense.dataGrid.headerFilters,
        dataGridHeaderFilterHeight: DENSE_PRESETS.dense.dataGrid.headerFilterHeight,
    },
    densePlus: {
        ...DENSE_PRESETS.densePlus.theme,
        ...GALLERY_ONLY_DENSE_PRESETS.densePlus,
        dataGridCellBlockPadding: DENSE_PRESETS.densePlus.dataGrid.cellBlockPadding.value,
        dataGridCellBlockPaddingUnit: DENSE_PRESETS.densePlus.dataGrid.cellBlockPadding.unit,
        dataGridDensity: DENSE_PRESETS.densePlus.dataGrid.density,
        dataGridHeaderFilters: DENSE_PRESETS.densePlus.dataGrid.headerFilters,
        dataGridHeaderFilterHeight: DENSE_PRESETS.densePlus.dataGrid.headerFilterHeight,
    },
};

export const GALLERY_THEME_OVERRIDE_CONTROLS: GalleryAdvancedControlDefinition[] = [
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

export const GALLERY_TREE_VIEW_CONTROLS: GalleryAdvancedControlDefinition[] = [
    {
        key: 'compactTreeItems',
        label: 'Tighten tree item layout and states',
        mechanism: 'MuiTreeItem overrides, treeItemClasses, and Tree data-* state hooks',
        description: 'Shrinks tree-item content, icon, label, and stateful rows through documented hooks.',
    },
];

export function adaptGalleryControlsToDenseSettings(
    controls: GalleryDenseControls,
    features: DenseThemeFeatures,
): DenseSettings {
    const {
        componentSize,
        dataGridCellBlockPadding,
        dataGridCellBlockPaddingUnit,
        dataGridDensity,
        dataGridHeaderFilterHeight,
        dataGridHeaderFilters,
        denseFormMargins,
        denseLists,
        disableGlobalGutters,
        listDisablePadding,
        spacingBase,
        tableSize,
        toolbarDense,
        toolbarDisableGutters,
        typographyScale,
    } = controls;

    return {
        dataGrid: {
            cellBlockPadding: {
                unit: dataGridCellBlockPaddingUnit,
                value: dataGridCellBlockPadding,
            },
            density: dataGridDensity,
            headerFilterHeight: dataGridHeaderFilterHeight,
            headerFilters: dataGridHeaderFilters,
        },
        features,
        theme: {
            componentSize,
            denseFormMargins,
            denseLists,
            disableGlobalGutters,
            listDisablePadding,
            spacingBase,
            tableSize,
            toolbarDense,
            toolbarDisableGutters,
            typographyScale,
        },
    };
}
