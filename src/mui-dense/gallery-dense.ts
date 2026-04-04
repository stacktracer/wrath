import { DEFAULT_DENSE_SETTINGS, type DenseSettings } from './lib';

export type GalleryDensePreset = 'default' | 'dense' | 'densePlus';

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
    dataGridHeaderFilters: boolean;
    imageGap: number;
    layoutScale: number;
    treeIndentation: number;
};

export type GalleryDenseControls = Omit<DenseSettings, 'dataGrid'> &
    GalleryOnlyDenseControls & {
        dataGridTextVerticalPadding: DenseSettings['dataGrid']['textVerticalPadding'];
        dataGridDensity: DenseSettings['dataGrid']['density'];
    };

export type GalleryPresetSelection = GalleryDensePreset | 'custom';

export const GALLERY_DENSE_PRESET_LABELS: Record<GalleryPresetSelection, string> = {
    custom: 'Custom',
    default: 'Default',
    dense: 'Dense',
    densePlus: 'Dense+',
};

const GALLERY_ONLY_DENSE_PRESETS: Record<GalleryDensePreset, GalleryOnlyDenseControls> = {
    default: {
        dataGridHeaderFilters: false,
        imageGap: 12,
        layoutScale: 1,
        treeIndentation: 24,
    },
    dense: {
        dataGridHeaderFilters: false,
        imageGap: 4,
        layoutScale: 0.2,
        treeIndentation: 12,
    },
    densePlus: {
        dataGridHeaderFilters: true,
        imageGap: 0,
        layoutScale: 0.45,
        treeIndentation: 0,
    },
};

const GALLERY_DENSE_SETTINGS_PRESETS: Record<GalleryDensePreset, DenseSettings> = {
    default: DEFAULT_DENSE_SETTINGS,
    dense: {
        ...DEFAULT_DENSE_SETTINGS,
        disableAnimations: true,
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
        compactButtonsAndChips: true,
        compactIconButtons: true,
        compactInputs: true,
        compactListsAndMenus: true,
        compactAccordionSummary: true,
        compactTableCells: true,
        compactTreeItems: true,
        dataGrid: {
            ...DEFAULT_DENSE_SETTINGS.dataGrid,
            density: 'compact',
        },
    },
    densePlus: {
        ...DEFAULT_DENSE_SETTINGS,
        disableAnimations: true,
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
        dataGrid: {
            ...DEFAULT_DENSE_SETTINGS.dataGrid,
            density: 'compact',
        },
    },
};

function createGalleryDensePreset(
    preset: GalleryDensePreset,
    galleryOnly: GalleryOnlyDenseControls,
): GalleryDenseControls {
    const { dataGrid, ...denseSettings } = GALLERY_DENSE_SETTINGS_PRESETS[preset];

    return {
        ...denseSettings,
        ...galleryOnly,
        dataGridTextVerticalPadding: dataGrid.textVerticalPadding,
        dataGridDensity: dataGrid.density,
    };
}

export const GALLERY_DENSE_PRESETS: Record<GalleryDensePreset, GalleryDenseControls> = {
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
        dataGridTextVerticalPadding,
        dataGridDensity,
        dataGridHeaderFilters: _dataGridHeaderFilters,
        imageGap: _imageGap,
        layoutScale: _layoutScale,
        treeIndentation: _treeIndentation,
        ...denseSettings
    } = controls;

    return {
        ...denseSettings,
        dataGrid: {
            textVerticalPadding: dataGridTextVerticalPadding,
            density: dataGridDensity,
        },
    };
}
