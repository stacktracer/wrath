import {
    Alert,
    Button,
    ButtonGroup,
    Chip,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Slider,
    Stack,
    Switch,
    Typography,
} from '@mui/material';

import { formatPixelValue } from './dense-data-grid';
import {
    ALL_ADVANCED_CONTROLS,
    type AdvancedDensityControls,
    DENSITY_PRESET_LABELS,
    type DensityControls,
    type DensityPreset,
    type DensityPresetSelection,
    type GalleryColorMode,
    THEME_OVERRIDE_CONTROLS,
    UTILITY_AND_SLOT_CONTROLS,
} from './density-controls';
import { AdvancedControlTile, DensityControlCard } from './gallery-shell';

type GallerySidebarProps = {
    advancedDensityControls: AdvancedDensityControls;
    animationsDisabled: boolean;
    colorMode: GalleryColorMode;
    densityControls: DensityControls;
    densityPreset: DensityPresetSelection;
    onApplyDensityPreset: (preset: DensityPreset) => void;
    onColorModeChange: (mode: GalleryColorMode) => void;
    onResetAdvancedControls: () => void;
    onResetToDefault: () => void;
    onSetAnimationsDisabled: (disabled: boolean) => void;
    onUpdateAdvancedDensityControl: <Key extends keyof AdvancedDensityControls>(
        key: Key,
        value: AdvancedDensityControls[Key],
    ) => void;
    onUpdateDensityControl: <Key extends keyof DensityControls>(
        key: Key,
        value: DensityControls[Key],
    ) => void;
    rowMetrics: {
        columnHeaderHeight: number;
        devicePixelRatio: number;
        rowHeight: number;
    };
};

export function GallerySidebar({
    advancedDensityControls,
    animationsDisabled,
    colorMode,
    densityControls,
    densityPreset,
    onApplyDensityPreset,
    onColorModeChange,
    onResetAdvancedControls,
    onResetToDefault,
    onSetAnimationsDisabled,
    onUpdateAdvancedDensityControl,
    onUpdateDensityControl,
    rowMetrics,
}: GallerySidebarProps) {
    const activeAdvancedControls = ALL_ADVANCED_CONTROLS.filter(
        definition => advancedDensityControls[definition.key],
    );
    const currentAnimationModeLabel = animationsDisabled ? 'Off' : 'On';
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
                                                checked={animationsDisabled}
                                                onChange={event => {
                                                    onSetAnimationsDisabled(event.target.checked);
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
                                        {(['default', 'dense', 'densePlus'] as DensityPreset[]).map(
                                            preset => (
                                                <Button
                                                    key={preset}
                                                    onClick={() => {
                                                        onApplyDensityPreset(preset);
                                                    }}
                                                    variant={
                                                        densityPreset === preset ? 'contained' : 'outlined'
                                                    }
                                                >
                                                    {DENSITY_PRESET_LABELS[preset]}
                                                </Button>
                                            ),
                                        )}
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
                                    Spacing base: {densityControls.spacingBase}px
                                </Typography>
                                <Slider
                                    marks
                                    max={8}
                                    min={2}
                                    onChange={(_event, value) => {
                                        onUpdateDensityControl('spacingBase', value as number);
                                    }}
                                    step={1}
                                    value={densityControls.spacingBase}
                                    valueLabelDisplay="auto"
                                />
                            </DensityControlCard>

                            <DensityControlCard
                                description="Scales MUI's base typography size so the default variant ratios derive as usual throughout the gallery."
                                title="Typography Scale"
                            >
                                <Typography variant="body2">
                                    Typography: {Math.round(densityControls.typographyScale * 100)}%
                                </Typography>
                                <Slider
                                    marks
                                    max={1}
                                    min={0.65}
                                    onChange={(_event, value) => {
                                        onUpdateDensityControl('typographyScale', value as number);
                                    }}
                                    step={0.05}
                                    value={densityControls.typographyScale}
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
                                                onUpdateDensityControl(
                                                    'componentSize',
                                                    event.target.value as 'small' | 'medium',
                                                );
                                            }}
                                            value={densityControls.componentSize}
                                        >
                                            <MenuItem value="medium">Medium</MenuItem>
                                            <MenuItem value="small">Small</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={densityControls.denseFormMargins}
                                                onChange={event => {
                                                    onUpdateDensityControl(
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
                                                checked={densityControls.disableGlobalGutters}
                                                onChange={event => {
                                                    onUpdateDensityControl(
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
                                                checked={densityControls.denseLists}
                                                onChange={event => {
                                                    onUpdateDensityControl(
                                                        'denseLists',
                                                        event.target.checked,
                                                    );
                                                }}
                                            />
                                        }
                                        label="Dense lists and menu lists"
                                    />

                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={densityControls.listDisablePadding}
                                                onChange={event => {
                                                    onUpdateDensityControl(
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
                                                checked={densityControls.toolbarDense}
                                                onChange={event => {
                                                    onUpdateDensityControl(
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
                                                checked={densityControls.toolbarDisableGutters}
                                                onChange={event => {
                                                    onUpdateDensityControl(
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
                                                onUpdateDensityControl(
                                                    'tableSize',
                                                    event.target.value as 'small' | 'medium',
                                                );
                                            }}
                                            value={densityControls.tableSize}
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
                                    Layout scale: {densityControls.layoutScale.toFixed(2)}x
                                </Typography>
                                <Slider
                                    marks
                                    max={1}
                                    min={0.2}
                                    onChange={(_event, value) => {
                                        onUpdateDensityControl('layoutScale', value as number);
                                    }}
                                    step={0.05}
                                    value={densityControls.layoutScale}
                                    valueLabelDisplay="auto"
                                />
                            </DensityControlCard>

                            <DensityControlCard
                                description="Public `gap` prop on the current `ImageList` demo. Tile height now follows the intrinsic image size."
                                title="Image Tiles"
                            >
                                <Stack spacing={1}>
                                    <Typography variant="body2">Gap: {densityControls.imageGap}px</Typography>
                                    <Slider
                                        max={12}
                                        min={0}
                                        onChange={(_event, value) => {
                                            onUpdateDensityControl('imageGap', value as number);
                                        }}
                                        step={1}
                                        value={densityControls.imageGap}
                                        valueLabelDisplay="auto"
                                    />
                                </Stack>
                            </DensityControlCard>

                            <DensityControlCard
                                description="Supported DataGrid props for overall density, auto-sized row and header heights, and optional header filters."
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
                                                onUpdateDensityControl(
                                                    'dataGridDensity',
                                                    event.target.value as
                                                        | 'comfortable'
                                                        | 'standard'
                                                        | 'compact',
                                                );
                                            }}
                                            value={densityControls.dataGridDensity}
                                        >
                                            <MenuItem value="comfortable">Comfortable</MenuItem>
                                            <MenuItem value="standard">Standard</MenuItem>
                                            <MenuItem value="compact">Compact</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={densityControls.dataGridHeaderFilters}
                                                onChange={event => {
                                                    onUpdateDensityControl(
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
                                        Uses the live body text line-height, 1ex, checkbox icon size, and DPR{' '}
                                        {formatPixelValue(rowMetrics.devicePixelRatio)}.
                                    </Typography>

                                    <Typography variant="body2">
                                        Header filter height: {densityControls.dataGridHeaderFilterHeight}
                                        px
                                    </Typography>
                                    <Slider
                                        disabled={!densityControls.dataGridHeaderFilters}
                                        max={52}
                                        min={24}
                                        onChange={(_event, value) => {
                                            onUpdateDensityControl(
                                                'dataGridHeaderFilterHeight',
                                                value as number,
                                            );
                                        }}
                                        step={2}
                                        value={densityControls.dataGridHeaderFilterHeight}
                                        valueLabelDisplay="auto"
                                    />
                                </Stack>
                            </DensityControlCard>

                            <DensityControlCard
                                description="Directly changes `itemChildrenIndentation` on the current tree demos."
                                title="Tree View"
                            >
                                <Typography variant="body2">
                                    Tree indentation: {densityControls.treeIndentation}px
                                </Typography>
                                <Slider
                                    max={24}
                                    min={0}
                                    onChange={(_event, value) => {
                                        onUpdateDensityControl('treeIndentation', value as number);
                                    }}
                                    step={2}
                                    value={densityControls.treeIndentation}
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
                                    Set 3 controls that layer on top of the current Set 1 density state
                                    through slot-aware theme overrides, exported utility classes, and
                                    documented slot props.
                                </Typography>
                            </div>

                            <Button onClick={onResetAdvancedControls} variant="outlined">
                                Reset advanced controls
                            </Button>
                        </div>

                        <Alert severity="warning" variant="outlined">
                            These controls are more fragile than the plain prop-based layer above. Resetting
                            here clears only Set 3 overrides and leaves the current Set 1 preset or custom
                            state intact.
                        </Alert>

                        <Stack spacing={1}>
                            <Typography variant="subtitle2">Active advanced overrides</Typography>
                            <Typography color="textSecondary" variant="body2">
                                {activeAdvancedControls.length > 0
                                    ? `${activeAdvancedControls.length} advanced override${activeAdvancedControls.length === 1 ? '' : 's'} active.`
                                    : 'No advanced overrides are active.'}
                            </Typography>
                            {activeAdvancedControls.length > 0 ? (
                                <div className="mui-dense-advanced-summary">
                                    {activeAdvancedControls.map(definition => (
                                        <Chip
                                            key={definition.key}
                                            label={definition.label}
                                            size="small"
                                            variant="outlined"
                                        />
                                    ))}
                                </div>
                            ) : null}
                        </Stack>

                        <div className="mui-dense-advanced-groups">
                            <section className="mui-dense-advanced-group">
                                <div className="mui-dense-advanced-group__heading">
                                    <Typography variant="subtitle1">Theme Override Controls</Typography>
                                    <Typography color="textSecondary" variant="body2">
                                        Representative Set 3 overrides driven through
                                        `theme.components.*.styleOverrides`.
                                    </Typography>
                                </div>

                                <div className="mui-dense-advanced-grid">
                                    {THEME_OVERRIDE_CONTROLS.map(definition => (
                                        <AdvancedControlTile
                                            checked={advancedDensityControls[definition.key]}
                                            definition={definition}
                                            key={definition.key}
                                            onChange={nextValue => {
                                                onUpdateAdvancedDensityControl(definition.key, nextValue);
                                            }}
                                        />
                                    ))}
                                </div>
                            </section>

                            <section className="mui-dense-advanced-group">
                                <div className="mui-dense-advanced-group__heading">
                                    <Typography variant="subtitle1">
                                        Utility-Class and Slot Controls
                                    </Typography>
                                    <Typography color="textSecondary" variant="body2">
                                        These stay on exported class names, documented slot props, and Tree
                                        state hooks.
                                    </Typography>
                                </div>

                                <div className="mui-dense-advanced-grid">
                                    {UTILITY_AND_SLOT_CONTROLS.map(definition => (
                                        <AdvancedControlTile
                                            checked={advancedDensityControls[definition.key]}
                                            definition={definition}
                                            key={definition.key}
                                            onChange={nextValue => {
                                                onUpdateAdvancedDensityControl(definition.key, nextValue);
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
