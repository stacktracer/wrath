import { useMemo, useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import {
    DEFAULT_DENSE_THEME_FEATURES,
    DENSE_THEME_FEATURE_PRESETS,
    type DenseColorMode,
    type DenseDataGridMetrics,
    type DensePreset,
    type DenseThemeFeatures,
    createDenseTheme,
    getPreferredColorMode,
} from './dense';
import {
    type GalleryDensityControls,
    GALLERY_DENSITY_PRESETS,
    type GalleryPresetSelection,
    adaptGalleryControlsToDenseConfig,
} from './gallery-density';
import { GallerySidebar } from './gallery-sidebar';
import { GalleryWorkspace } from './gallery-workspace';

const DEFAULT_DENSE_DATA_GRID_METRICS: DenseDataGridMetrics = {
    checkboxHeight: 0,
    columnHeaderHeight: 0,
    devicePixelRatio: typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1,
    rowHeight: 0,
    textLineHeight: 0,
    xHeight: 0,
};

export function App() {
    const [densityControls, setDensityControls] = useState<GalleryDensityControls>(
        GALLERY_DENSITY_PRESETS.dense,
    );
    const [densityPreset, setDensityPreset] = useState<GalleryPresetSelection>('dense');
    const [colorMode, setColorMode] = useState<DenseColorMode>(() => getPreferredColorMode());
    const [animationsDisabled, setAnimationsDisabled] = useState(true);
    const [themeFeatures, setThemeFeatures] = useState<DenseThemeFeatures>(DENSE_THEME_FEATURE_PRESETS.dense);
    const [dataGridMetrics, setDataGridMetrics] = useState<DenseDataGridMetrics>(
        DEFAULT_DENSE_DATA_GRID_METRICS,
    );
    const densityTheme = useMemo(
        () =>
            createDenseTheme({
                animationsDisabled,
                colorMode,
                config: adaptGalleryControlsToDenseConfig(densityControls),
                features: themeFeatures,
            }),
        [animationsDisabled, colorMode, densityControls, themeFeatures],
    );

    const applyDensityPreset = (preset: DensePreset) => {
        setDensityControls(GALLERY_DENSITY_PRESETS[preset]);
        setThemeFeatures(DENSE_THEME_FEATURE_PRESETS[preset]);
        setDensityPreset(preset);
    };

    const updateDensityControl = <Key extends keyof GalleryDensityControls>(
        key: Key,
        value: GalleryDensityControls[Key],
    ) => {
        setDensityPreset('custom');
        setDensityControls(current => ({
            ...current,
            [key]: value,
        }));
    };

    const updateThemeFeature = <Key extends keyof DenseThemeFeatures>(
        key: Key,
        value: DenseThemeFeatures[Key],
    ) => {
        setThemeFeatures(current => ({
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
                            animationsDisabled={animationsDisabled}
                            colorMode={colorMode}
                            densityControls={densityControls}
                            densityPreset={densityPreset}
                            onApplyDensityPreset={applyDensityPreset}
                            onColorModeChange={setColorMode}
                            onResetThemeFeatures={() => {
                                setThemeFeatures(DEFAULT_DENSE_THEME_FEATURES);
                            }}
                            onResetToDefault={() => {
                                applyDensityPreset('default');
                                setAnimationsDisabled(false);
                                setColorMode(getPreferredColorMode());
                            }}
                            onSetAnimationsDisabled={setAnimationsDisabled}
                            onUpdateDensityControl={updateDensityControl}
                            onUpdateThemeFeature={updateThemeFeature}
                            rowMetrics={dataGridMetrics}
                            themeFeatures={themeFeatures}
                        />
                        <GalleryWorkspace
                            compactInputsEnabled={themeFeatures.compactInputs}
                            densityControls={densityControls}
                            onDataGridMetricsChange={setDataGridMetrics}
                        />
                    </div>
                </Container>
            </div>
        </ThemeProvider>
    );
}
