import { useMemo, useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import {
    DENSE_PRESETS,
    DEFAULT_DENSE_THEME_FEATURES,
    type DenseColorMode,
    type DenseDataGridMetrics,
    type DensePreset,
    type DenseSettings,
    type DenseThemeFeatures,
    createDenseTheme,
    getPreferredColorMode,
} from './lib';
import {
    adaptGalleryControlsToDenseSettings,
    type GalleryDenseControls,
    GALLERY_DENSE_PRESETS,
    type GalleryPresetSelection,
} from './gallery-dense';
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
    const [denseControls, setDenseControls] = useState<GalleryDenseControls>(GALLERY_DENSE_PRESETS.dense);
    const [densePreset, setDensePreset] = useState<GalleryPresetSelection>('dense');
    const [colorMode, setColorMode] = useState<DenseColorMode>(() => getPreferredColorMode());
    const [animationsDisabled, setAnimationsDisabled] = useState(true);
    const [denseFeatures, setDenseFeatures] = useState<DenseThemeFeatures>(DENSE_PRESETS.dense.features);
    const [dataGridMetrics, setDataGridMetrics] = useState<DenseDataGridMetrics>(
        DEFAULT_DENSE_DATA_GRID_METRICS,
    );
    const denseSettings = useMemo<DenseSettings>(
        () => adaptGalleryControlsToDenseSettings(denseControls, denseFeatures),
        [denseControls, denseFeatures],
    );
    const denseTheme = useMemo(
        () =>
            createDenseTheme({
                animationsDisabled,
                colorMode,
                dense: denseSettings,
            }),
        [animationsDisabled, colorMode, denseSettings],
    );

    const applyDensePreset = (preset: DensePreset) => {
        setDenseControls(GALLERY_DENSE_PRESETS[preset]);
        setDenseFeatures(DENSE_PRESETS[preset].features);
        setDensePreset(preset);
    };

    const updateDenseControl = <Key extends keyof GalleryDenseControls>(
        key: Key,
        value: GalleryDenseControls[Key],
    ) => {
        setDensePreset('custom');
        setDenseControls(current => ({
            ...current,
            [key]: value,
        }));
    };

    const updateDenseFeature = <Key extends keyof DenseThemeFeatures>(
        key: Key,
        value: DenseThemeFeatures[Key],
    ) => {
        setDenseFeatures(current => ({
            ...current,
            [key]: value,
        }));
    };

    return (
        <ThemeProvider theme={denseTheme}>
            <CssBaseline />

            <div className="mui-dense-app" data-mui-dense-color-mode={colorMode}>
                <Container className="mui-dense-shell" maxWidth="xl">
                    <div className="mui-dense-workspace">
                        <GallerySidebar
                            animationsDisabled={animationsDisabled}
                            colorMode={colorMode}
                            denseControls={denseControls}
                            denseFeatures={denseFeatures}
                            densePreset={densePreset}
                            onApplyDensePreset={applyDensePreset}
                            onColorModeChange={setColorMode}
                            onResetDenseFeatures={() => {
                                setDenseFeatures(DEFAULT_DENSE_THEME_FEATURES);
                            }}
                            onResetToDefault={() => {
                                setDenseControls(GALLERY_DENSE_PRESETS.default);
                                setDenseFeatures(DENSE_PRESETS.default.features);
                                setDensePreset('default');
                                setAnimationsDisabled(false);
                                setColorMode(getPreferredColorMode());
                            }}
                            onSetAnimationsDisabled={setAnimationsDisabled}
                            onUpdateDenseControl={updateDenseControl}
                            onUpdateDenseFeature={updateDenseFeature}
                            rowMetrics={dataGridMetrics}
                        />
                        <GalleryWorkspace
                            dense={denseSettings}
                            onDataGridMetricsChange={setDataGridMetrics}
                            uiControls={denseControls}
                        />
                    </div>
                </Container>
            </div>
        </ThemeProvider>
    );
}
