import {
    Alert,
    Button,
    ButtonGroup,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Slider,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material';

import {
    type DenseFeatureKey,
    GALLERY_DENSE_PRESET_LABELS,
    GALLERY_THEME_OVERRIDE_CONTROLS,
    GALLERY_TREE_VIEW_CONTROLS,
    type GalleryDenseControls,
    type GalleryPresetSelection,
} from './gallery-dense';
import { formatPixelValue, type DenseDataGridMetrics } from './lib';
import { AdvancedControlTile, DensityControlCard } from './gallery-shell';

type GallerySidebarProps = {
    colorMode: 'light' | 'dark';
    denseControls: GalleryDenseControls;
    densePreset: GalleryPresetSelection;
    onApplyDensePreset: (preset: Exclude<GalleryPresetSelection, 'custom'>) => void;
    onColorModeChange: (mode: 'light' | 'dark') => void;
    onResetDenseFeatures: () => void;
    onResetToDefault: () => void;
    onUpdateDenseControl: <Key extends keyof GalleryDenseControls>(
        key: Key,
        value: GalleryDenseControls[Key],
    ) => void;
    onUpdateDenseFeature: (key: DenseFeatureKey, value: boolean) => void;
    rowMetrics: Pick<DenseDataGridMetrics, 'columnHeaderHeight' | 'devicePixelRatio' | 'rowHeight'>;
};

export function GallerySidebar({
    colorMode,
    denseControls,
    densePreset,
    onApplyDensePreset,
    onColorModeChange,
    onResetDenseFeatures,
    onResetToDefault,
    onUpdateDenseControl,
    onUpdateDenseFeature,
    rowMetrics,
}: GallerySidebarProps) {
    const currentAnimationModeLabel = denseControls.disableAnimations ? 'Off' : 'On';
    const currentColorModeLabel = colorMode === 'dark' ? 'Dark' : 'Light';

    return (
        <aside aria-label="UI controls sidebar" className="mui-dense-sidebar">
            <Stack className="mui-dense-sidebar__scroller" spacing={2}>
                <Paper className="mui-dense-density-panel" variant="outlined">
                    <Stack spacing={2}>
                        <div className="mui-dense-density-panel__header">
                            <div>
                                <Typography component="h2" variant="h5">
                                    Gallery Controls
                                </Typography>
                                <Typography color="textSecondary" variant="body2">
                                    Gallery-wide public controls: palette mode, theme spacing and typography,
                                    default component props, and direct supported props on the current demos.
                                </Typography>
                            </div>

                            <Button onClick={onResetToDefault} variant="outlined">
                                Reset to default
                            </Button>
                        </div>

                        <div className="mui-dense-density-primary">
                            <DensityControlCard
                                description="Gallery-wide appearance toggles for palette mode and motion. Disabling animations zeroes MUI transition durations, removes ripples, and suppresses CSS animations."
                                title="Appearance"
                            >
                                <Stack spacing={1}>
                                    <Typography variant="body2">Mode: {currentColorModeLabel}</Typography>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={colorMode === 'dark'}
                                                onChange={event => {
                                                    onColorModeChange(
                                                        event.target.checked ? 'dark' : 'light',
                                                    );
                                                }}
                                            />
                                        }
                                        label="Dark mode"
                                    />
                                    <Typography variant="body2">
                                        Animations: {currentAnimationModeLabel}
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={denseControls.disableAnimations}
                                                onChange={event => {
                                                    onUpdateDenseControl(
                                                        'disableAnimations',
                                                        event.target.checked,
                                                    );
                                                }}
                                            />
                                        }
                                        label="Disable animations"
                                    />
                                </Stack>
                            </DensityControlCard>

                            <DensityControlCard
                                description="Applies a baseline bundle of public density controls before any fine-tuning below."
                                title="Density Preset"
                            >
                                <div className="mui-dense-density-panel__preset-row">
                                    <ButtonGroup aria-label="Density presets" fullWidth variant="outlined">
                                        {(
                                            ['default', 'dense', 'densePlus'] as Exclude<
                                                GalleryPresetSelection,
                                                'custom'
                                            >[]
                                        ).map(preset => (
                                            <Button
                                                key={preset}
                                                onClick={() => {
                                                    onApplyDensePreset(preset);
                                                }}
                                                variant={densePreset === preset ? 'contained' : 'outlined'}
                                            >
                                                {GALLERY_DENSE_PRESET_LABELS[preset]}
                                            </Button>
                                        ))}
                                    </ButtonGroup>
                                </div>
                            </DensityControlCard>
                        </div>

                        <div className="mui-dense-density-grid">
                            <DensityControlCard
                                description="Toolkit-wide spacing unit used by Stack, Grid, Box, and many component internals."
                                title="Spacing Base"
                            >
                                <Typography variant="body2">
                                    Spacing base: {denseControls.spacingBase}px
                                </Typography>
                                <Slider
                                    marks
                                    max={8}
                                    min={2}
                                    onChange={(_event, value) => {
                                        onUpdateDenseControl('spacingBase', value as number);
                                    }}
                                    step={1}
                                    value={denseControls.spacingBase}
                                    valueLabelDisplay="auto"
                                />
                            </DensityControlCard>

                            <DensityControlCard
                                description="Scales MUI's base typography size so the default variant ratios derive as usual throughout the gallery."
                                title="Typography Scale"
                            >
                                <Typography variant="body2">
                                    Typography: {Math.round(denseControls.typographyScale * 100)}%
                                </Typography>
                                <Slider
                                    marks
                                    max={1}
                                    min={0.65}
                                    onChange={(_event, value) => {
                                        onUpdateDenseControl('typographyScale', value as number);
                                    }}
                                    step={0.05}
                                    value={denseControls.typographyScale}
                                    valueLabelDisplay="auto"
                                />
                            </DensityControlCard>

                            <DensityControlCard
                                description="Uses supported size and margin props across the main component families already on the page."
                                title="Component Defaults"
                            >
                                <Stack spacing={1}>
                                    <FormControl size="small">
                                        <InputLabel id="mui-dense-control-size-label">
                                            Component size
                                        </InputLabel>
                                        <Select
                                            label="Component size"
                                            labelId="mui-dense-control-size-label"
                                            onChange={event => {
                                                onUpdateDenseControl(
                                                    'componentSize',
                                                    event.target.value as 'small' | 'medium',
                                                );
                                            }}
                                            value={denseControls.componentSize}
                                        >
                                            <MenuItem value="medium">Medium</MenuItem>
                                            <MenuItem value="small">Small</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={denseControls.denseFormMargins}
                                                onChange={event => {
                                                    onUpdateDenseControl(
                                                        'denseFormMargins',
                                                        event.target.checked,
                                                    );
                                                }}
                                            />
                                        }
                                        label="Dense form margins"
                                    />

                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={denseControls.disableGlobalGutters}
                                                onChange={event => {
                                                    onUpdateDenseControl(
                                                        'disableGlobalGutters',
                                                        event.target.checked,
                                                    );
                                                }}
                                            />
                                        }
                                        label="Disable global gutters"
                                    />
                                </Stack>
                            </DensityControlCard>

                            <DensityControlCard
                                description="Supported props on list-like components, toolbars, and tables already shown on the page."
                                title="Page Surfaces"
                            >
                                <Stack spacing={1}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={denseControls.denseLists}
                                                onChange={event => {
                                                    onUpdateDenseControl('denseLists', event.target.checked);
                                                }}
                                            />
                                        }
                                        label="Dense lists and menu lists"
                                    />

                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={denseControls.listDisablePadding}
                                                onChange={event => {
                                                    onUpdateDenseControl(
                                                        'listDisablePadding',
                                                        event.target.checked,
                                                    );
                                                }}
                                            />
                                        }
                                        label="Disable list padding"
                                    />

                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={denseControls.toolbarDense}
                                                onChange={event => {
                                                    onUpdateDenseControl(
                                                        'toolbarDense',
                                                        event.target.checked,
                                                    );
                                                }}
                                            />
                                        }
                                        label="Dense toolbar"
                                    />

                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={denseControls.toolbarDisableGutters}
                                                onChange={event => {
                                                    onUpdateDenseControl(
                                                        'toolbarDisableGutters',
                                                        event.target.checked,
                                                    );
                                                }}
                                            />
                                        }
                                        label="Disable toolbar gutters"
                                    />

                                    <FormControl size="small">
                                        <InputLabel id="mui-dense-table-size-label">Table size</InputLabel>
                                        <Select
                                            label="Table size"
                                            labelId="mui-dense-table-size-label"
                                            onChange={event => {
                                                onUpdateDenseControl(
                                                    'tableSize',
                                                    event.target.value as 'small' | 'medium',
                                                );
                                            }}
                                            value={denseControls.tableSize}
                                        >
                                            <MenuItem value="medium">Medium</MenuItem>
                                            <MenuItem value="small">Small</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </DensityControlCard>

                            <DensityControlCard
                                description="Directly changes the `spacing` props used by the page shell and representative layout demos."
                                title="Layout Scale"
                            >
                                <Typography variant="body2">
                                    Layout scale: {denseControls.layoutScale.toFixed(2)}x
                                </Typography>
                                <Slider
                                    marks
                                    max={1}
                                    min={0.2}
                                    onChange={(_event, value) => {
                                        onUpdateDenseControl('layoutScale', value as number);
                                    }}
                                    step={0.05}
                                    value={denseControls.layoutScale}
                                    valueLabelDisplay="auto"
                                />
                            </DensityControlCard>

                            <DensityControlCard
                                description="Public `gap` prop on the current `ImageList` demo. Tile height now follows the intrinsic image size."
                                title="Image Tiles"
                            >
                                <Stack spacing={1}>
                                    <Typography variant="body2">Gap: {denseControls.imageGap}px</Typography>
                                    <Slider
                                        max={12}
                                        min={0}
                                        onChange={(_event, value) => {
                                            onUpdateDenseControl('imageGap', value as number);
                                        }}
                                        step={1}
                                        value={denseControls.imageGap}
                                        valueLabelDisplay="auto"
                                    />
                                </Stack>
                            </DensityControlCard>

                            <DensityControlCard
                                description="DenseDataGrid controls for overall density, auto-sized row and header heights, a direct header-filters toggle, and CSS-length vertical spacing."
                                title="Data Grid Pro"
                            >
                                <Stack spacing={1}>
                                    <FormControl size="small">
                                        <InputLabel id="mui-dense-grid-density-label">
                                            Grid density
                                        </InputLabel>
                                        <Select
                                            label="Grid density"
                                            labelId="mui-dense-grid-density-label"
                                            onChange={event => {
                                                onUpdateDenseControl(
                                                    'dataGridDensity',
                                                    event.target.value as
                                                        | 'comfortable'
                                                        | 'standard'
                                                        | 'compact',
                                                );
                                            }}
                                            value={denseControls.dataGridDensity}
                                        >
                                            <MenuItem value="comfortable">Comfortable</MenuItem>
                                            <MenuItem value="standard">Standard</MenuItem>
                                            <MenuItem value="compact">Compact</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={denseControls.dataGridHeaderFilters}
                                                onChange={event => {
                                                    onUpdateDenseControl(
                                                        'dataGridHeaderFilters',
                                                        event.target.checked,
                                                    );
                                                }}
                                            />
                                        }
                                        label="Show header filters"
                                    />

                                    <Typography variant="body2">
                                        Row height: {formatPixelValue(rowMetrics.rowHeight)}px (auto)
                                    </Typography>

                                    <Typography variant="body2">
                                        Column header height:{' '}
                                        {formatPixelValue(rowMetrics.columnHeaderHeight)}px (auto)
                                    </Typography>
                                    <Typography color="textSecondary" variant="caption">
                                        Uses the live body text line-height and DPR{' '}
                                        {formatPixelValue(rowMetrics.devicePixelRatio)}.
                                    </Typography>
                                    <Typography color="textSecondary" variant="caption">
                                        Header filters inherit the computed header height unless a caller
                                        passes `headerFilterHeight` directly to `DataGridPro`.
                                    </Typography>

                                    <Typography variant="body2">
                                        Text vertical padding: {denseControls.dataGridTextVerticalPadding}
                                    </Typography>
                                    <ButtonGroup aria-label="Text vertical padding examples" size="small">
                                        <Button
                                            onClick={() => {
                                                onUpdateDenseControl('dataGridTextVerticalPadding', '1px');
                                            }}
                                            variant={
                                                denseControls.dataGridTextVerticalPadding === '1px'
                                                    ? 'contained'
                                                    : 'outlined'
                                            }
                                        >
                                            1px
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                onUpdateDenseControl('dataGridTextVerticalPadding', '0.5cap');
                                            }}
                                            variant={
                                                denseControls.dataGridTextVerticalPadding === '0.5cap'
                                                    ? 'contained'
                                                    : 'outlined'
                                            }
                                        >
                                            0.5cap
                                        </Button>
                                    </ButtonGroup>
                                    <TextField
                                        helperText="Any CSS length. Examples: 1px, 0.5cap, 0.35em, 0.25rem."
                                        id="mui-dense-grid-text-vertical-padding"
                                        label="Text vertical padding"
                                        onChange={event => {
                                            onUpdateDenseControl(
                                                'dataGridTextVerticalPadding',
                                                event.target.value,
                                            );
                                        }}
                                        placeholder="0.5cap"
                                        size="small"
                                        value={denseControls.dataGridTextVerticalPadding}
                                    />
                                </Stack>
                            </DensityControlCard>

                            <DensityControlCard
                                description="Directly changes `itemChildrenIndentation` on the current tree demos."
                                title="Tree View"
                            >
                                <Typography variant="body2">
                                    Tree indentation: {denseControls.treeIndentation}px
                                </Typography>
                                <Slider
                                    max={24}
                                    min={0}
                                    onChange={(_event, value) => {
                                        onUpdateDenseControl('treeIndentation', value as number);
                                    }}
                                    step={2}
                                    value={denseControls.treeIndentation}
                                    valueLabelDisplay="auto"
                                />
                            </DensityControlCard>
                        </div>
                    </Stack>
                </Paper>

                <Paper className="mui-dense-advanced-panel" variant="outlined">
                    <Stack spacing={2.5}>
                        <div className="mui-dense-advanced-panel__header">
                            <div>
                                <Typography component="h2" variant="h5">
                                    Advanced Density Controls
                                </Typography>
                                <Typography color="textSecondary" variant="body2">
                                    Controls that go beyond the prop-based density layer above and use theme
                                    overrides plus documented component hooks.
                                </Typography>
                            </div>

                            <Button onClick={onResetDenseFeatures} variant="outlined">
                                Reset advanced controls
                            </Button>
                        </div>

                        <Alert severity="warning" variant="outlined">
                            These controls are more fragile than the baseline controls above. Resetting here
                            clears only these implementation-level overrides and leaves the current preset or
                            custom prop state intact.
                        </Alert>

                        <div className="mui-dense-advanced-groups">
                            <section className="mui-dense-advanced-group">
                                <div className="mui-dense-advanced-group__heading">
                                    <Typography variant="subtitle1">Theme Override Controls</Typography>
                                    <Typography color="textSecondary" variant="body2">
                                        Representative overrides driven through
                                        `theme.components.*.styleOverrides`.
                                    </Typography>
                                </div>

                                <div className="mui-dense-advanced-grid">
                                    {GALLERY_THEME_OVERRIDE_CONTROLS.map(definition => (
                                        <AdvancedControlTile
                                            checked={denseControls[definition.key]}
                                            definition={definition}
                                            key={definition.key}
                                            onChange={nextValue => {
                                                onUpdateDenseFeature(definition.key, nextValue);
                                            }}
                                        />
                                    ))}
                                </div>
                            </section>

                            <section className="mui-dense-advanced-group">
                                <div className="mui-dense-advanced-group__heading">
                                    <Typography variant="subtitle1">Tree View Overrides</Typography>
                                    <Typography color="textSecondary" variant="body2">
                                        Tree-specific layout tightening through documented classes and state
                                        hooks.
                                    </Typography>
                                </div>

                                <div className="mui-dense-advanced-grid">
                                    {GALLERY_TREE_VIEW_CONTROLS.map(definition => (
                                        <AdvancedControlTile
                                            checked={denseControls[definition.key]}
                                            definition={definition}
                                            key={definition.key}
                                            onChange={nextValue => {
                                                onUpdateDenseFeature(definition.key, nextValue);
                                            }}
                                        />
                                    ))}
                                </div>
                            </section>
                        </div>
                    </Stack>
                </Paper>
            </Stack>
        </aside>
    );
}
