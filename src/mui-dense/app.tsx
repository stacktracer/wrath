import { useMemo, useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useDenseDataGridMetrics } from './dense-data-grid';
import {
    type AdvancedDensityControls,
    ADVANCED_DENSITY_PRESETS,
    type DensityControls,
    DENSITY_PRESETS,
    DENSE_ADVANCED_DENSITY_CONTROLS,
    type DensityPreset,
    type DensityPresetSelection,
    type GalleryColorMode,
    DEFAULT_ADVANCED_DENSITY_CONTROLS,
} from './density-controls';
import {
    createAdvancedDensityThemeOptions,
    createDensityTheme,
    getPreferredColorMode,
} from './density-theme';
import { GallerySidebar } from './gallery-sidebar';
import { GalleryWorkspace } from './gallery-workspace';

export function App() {
    const [densityControls, setDensityControls] = useState<DensityControls>(DENSITY_PRESETS.dense);
    const [densityPreset, setDensityPreset] = useState<DensityPresetSelection>('dense');
    const [colorMode, setColorMode] = useState<GalleryColorMode>(() => getPreferredColorMode());
    const [animationsDisabled, setAnimationsDisabled] = useState(true);
    const [advancedDensityControls, setAdvancedDensityControls] = useState<AdvancedDensityControls>(
        DENSE_ADVANCED_DENSITY_CONTROLS,
    );
    const baseDensityTheme = useMemo(
        () => createDensityTheme(densityControls, colorMode, animationsDisabled),
        [animationsDisabled, colorMode, densityControls],
    );
    const densityTheme = useMemo(
        () => createTheme(baseDensityTheme, createAdvancedDensityThemeOptions(advancedDensityControls)),
        [advancedDensityControls, baseDensityTheme],
    );
    const dataGridMetrics = useDenseDataGridMetrics({
        dataGridDensity: densityControls.dataGridDensity,
        typographyScale: densityControls.typographyScale,
    });

    const applyDensityPreset = (preset: DensityPreset) => {
        setDensityControls(DENSITY_PRESETS[preset]);
        setAdvancedDensityControls(ADVANCED_DENSITY_PRESETS[preset]);
        setDensityPreset(preset);
    };

    const updateDensityControl = <Key extends keyof DensityControls>(
        key: Key,
        value: DensityControls[Key],
    ) => {
        setDensityPreset('custom');
        setDensityControls(current => ({
            ...current,
            [key]: value,
        }));
    };

    const updateAdvancedDensityControl = <Key extends keyof AdvancedDensityControls>(
        key: Key,
        value: AdvancedDensityControls[Key],
    ) => {
        setAdvancedDensityControls(current => ({
            ...current,
            [key]: value,
        }));
    };

    return (
        <ThemeProvider theme={densityTheme}>
            <CssBaseline />

            <div className="mui-dense-app" data-mui-dense-color-mode={colorMode}>
                <Container className="mui-dense-shell" maxWidth="xl">
                    <div className="mui-dense-workspace">
                        <GallerySidebar
                            advancedDensityControls={advancedDensityControls}
                            animationsDisabled={animationsDisabled}
                            colorMode={colorMode}
                            densityControls={densityControls}
                            densityPreset={densityPreset}
                            onApplyDensityPreset={applyDensityPreset}
                            onColorModeChange={setColorMode}
                            onResetAdvancedControls={() => {
                                setAdvancedDensityControls(DEFAULT_ADVANCED_DENSITY_CONTROLS);
                            }}
                            onResetToDefault={() => {
                                applyDensityPreset('default');
                                setAnimationsDisabled(false);
                                setColorMode(getPreferredColorMode());
                            }}
                            onSetAnimationsDisabled={setAnimationsDisabled}
                            onUpdateAdvancedDensityControl={updateAdvancedDensityControl}
                            onUpdateDensityControl={updateDensityControl}
                            rowMetrics={dataGridMetrics.metrics}
                        />
                        <GalleryWorkspace
                            advancedDensityControls={advancedDensityControls}
                            dataGridMetrics={dataGridMetrics}
                            densityControls={densityControls}
                            densityTheme={densityTheme}
                        />
                    </div>
                </Container>
            </div>
        </ThemeProvider>
    );
}
