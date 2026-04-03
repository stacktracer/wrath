import type { DenseThemeFeatures } from './dense';
import {
    DENSE_THEME_FEATURE_PRESETS,
    DENSE_THEME_PRESETS,
    type DenseDataGridCellBlockPadding,
    type DenseDataGridDensity,
    type DensePreset,
    type DenseThemeConfig,
} from './dense';

export type GalleryAdvancedControlDefinition = {
    key: keyof DenseThemeFeatures;
    label: string;
    mechanism: string;
    description: string;
};

type GalleryOnlyDensityControls = {
    dataGridCellBlockPadding: number;
    dataGridCellBlockPaddingUnit: DenseDataGridCellBlockPadding['unit'];
    dataGridDensity: DenseDataGridDensity;
    dataGridHeaderFilters: boolean;
    dataGridHeaderFilterHeight: number;
    imageGap: number;
    layoutScale: number;
    treeIndentation: number;
};

export type GalleryDensityControls = DenseThemeConfig & GalleryOnlyDensityControls;

export type GalleryPresetSelection = DensePreset | 'custom';

export const GALLERY_DENSITY_PRESET_LABELS: Record<GalleryPresetSelection, string> = {
    default: 'Default',
    dense: 'Dense',
    densePlus: 'Dense+',
    custom: 'Custom',
};

const GALLERY_ONLY_DENSITY_PRESETS: Record<DensePreset, GalleryOnlyDensityControls> = {
    default: {
        dataGridCellBlockPadding: 1,
        dataGridCellBlockPaddingUnit: 'px',
        dataGridDensity: 'standard',
        dataGridHeaderFilters: false,
        dataGridHeaderFilterHeight: 52,
        imageGap: 12,
        layoutScale: 1,
        treeIndentation: 24,
    },
    dense: {
        dataGridCellBlockPadding: 1,
        dataGridCellBlockPaddingUnit: 'px',
        dataGridDensity: 'compact',
        dataGridHeaderFilters: false,
        dataGridHeaderFilterHeight: 52,
        imageGap: 4,
        layoutScale: 0.2,
        treeIndentation: 12,
    },
    densePlus: {
        dataGridCellBlockPadding: 1,
        dataGridCellBlockPaddingUnit: 'px',
        dataGridDensity: 'compact',
        dataGridHeaderFilters: true,
        dataGridHeaderFilterHeight: 24,
        imageGap: 0,
        layoutScale: 0.45,
        treeIndentation: 0,
    },
};

export const GALLERY_DENSITY_PRESETS: Record<DensePreset, GalleryDensityControls> = {
    default: {
        ...DENSE_THEME_PRESETS.default,
        ...GALLERY_ONLY_DENSITY_PRESETS.default,
    },
    dense: {
        ...DENSE_THEME_PRESETS.dense,
        ...GALLERY_ONLY_DENSITY_PRESETS.dense,
    },
    densePlus: {
        ...DENSE_THEME_PRESETS.densePlus,
        ...GALLERY_ONLY_DENSITY_PRESETS.densePlus,
    },
};

export const GALLERY_DENSE_THEME_FEATURE_PRESETS = DENSE_THEME_FEATURE_PRESETS;

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

export function adaptGalleryControlsToDenseConfig(controls: GalleryDensityControls): DenseThemeConfig {
    const {
        dataGridCellBlockPadding: _dataGridCellBlockPadding,
        dataGridCellBlockPaddingUnit: _dataGridCellBlockPaddingUnit,
        dataGridDensity: _dataGridDensity,
        dataGridHeaderFilters: _dataGridHeaderFilters,
        dataGridHeaderFilterHeight: _dataGridHeaderFilterHeight,
        imageGap: _imageGap,
        layoutScale: _layoutScale,
        treeIndentation: _treeIndentation,
        ...denseConfig
    } = controls;

    return denseConfig;
}

export function getGalleryDataGridCellBlockPadding(
    controls: GalleryDensityControls,
): DenseDataGridCellBlockPadding {
    return {
        unit: controls.dataGridCellBlockPaddingUnit,
        value: controls.dataGridCellBlockPadding,
    };
}
