import { DENSE_PRESETS, type DensePreset, type DenseSettings } from './lib';

export type DenseFeatureKey =
    | 'compactButtonsAndChips'
    | 'compactIconButtons'
    | 'compactInputs'
    | 'compactListsAndMenus'
    | 'compactAccordionSummary'
    | 'compactTableCells'
    | 'compactTreeItems';

export type GalleryAdvancedControlDefinition = {
    key: DenseFeatureKey;
    label: string;
    mechanism: string;
    description: string;
};

type GalleryOnlyDenseControls = {
    imageGap: number;
    layoutScale: number;
    treeIndentation: number;
};

export type GalleryDenseControls = Omit<DenseSettings, 'dataGrid'> &
    GalleryOnlyDenseControls & {
        dataGridCellBlockPadding: DenseSettings['dataGrid']['cellBlockPadding'];
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

function createGalleryDensePreset(
    preset: DensePreset,
    galleryOnly: GalleryOnlyDenseControls,
): GalleryDenseControls {
    const { dataGrid, ...denseSettings } = DENSE_PRESETS[preset];

    return {
        ...denseSettings,
        ...galleryOnly,
        dataGridCellBlockPadding: dataGrid.cellBlockPadding,
        dataGridDensity: dataGrid.density,
        dataGridHeaderFilters: dataGrid.headerFilters,
        dataGridHeaderFilterHeight: dataGrid.headerFilterHeight,
    };
}

export const GALLERY_DENSE_PRESETS: Record<DensePreset, GalleryDenseControls> = {
    default: createGalleryDensePreset('default', GALLERY_ONLY_DENSE_PRESETS.default),
    dense: createGalleryDensePreset('dense', GALLERY_ONLY_DENSE_PRESETS.dense),
    densePlus: createGalleryDensePreset('densePlus', GALLERY_ONLY_DENSE_PRESETS.densePlus),
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

export function adaptGalleryControlsToDenseSettings(controls: GalleryDenseControls): DenseSettings {
    const {
        dataGridCellBlockPadding,
        dataGridDensity,
        dataGridHeaderFilterHeight,
        dataGridHeaderFilters,
        imageGap: _imageGap,
        layoutScale: _layoutScale,
        treeIndentation: _treeIndentation,
        ...denseSettings
    } = controls;

    return {
        ...denseSettings,
        dataGrid: {
            cellBlockPadding: dataGridCellBlockPadding,
            density: dataGridDensity,
            headerFilterHeight: dataGridHeaderFilterHeight,
            headerFilters: dataGridHeaderFilters,
        },
    };
}
