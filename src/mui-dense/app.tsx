import { useMemo, useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { DEFAULT_DENSE_SETTINGS, type DenseDataGridMetrics, createDenseTheme } from './lib';
import {
    adaptGalleryControlsToDenseSettings,
    type DenseFeatureKey,
    type GalleryDensePreset,
    type GalleryDenseControls,
    GALLERY_DENSE_PRESETS,
    type GalleryPresetSelection,
} from './gallery-dense';
import { GallerySidebar } from './gallery-sidebar';
import { GalleryWorkspace } from './gallery-workspace';

const DEFAULT_DENSE_DATA_GRID_METRICS: DenseDataGridMetrics = {
    columnHeaderHeight: 0,
    devicePixelRatio: typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1,
    rowHeight: 0,
};

function getPreferredColorMode(): 'light' | 'dark' {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return 'light';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function App() {
    const [denseControls, setDenseControls] = useState<GalleryDenseControls>(GALLERY_DENSE_PRESETS.dense);
    const [densePreset, setDensePreset] = useState<GalleryPresetSelection>('dense');
    const [colorMode, setColorMode] = useState<'light' | 'dark'>(() => getPreferredColorMode());
    const [dataGridMetrics, setDataGridMetrics] = useState<DenseDataGridMetrics>(
        DEFAULT_DENSE_DATA_GRID_METRICS,
    );
    const denseSettings = useMemo(() => adaptGalleryControlsToDenseSettings(denseControls), [denseControls]);
    const denseTheme = useMemo(
        () => createDenseTheme(denseSettings, { mode: colorMode }),
        [colorMode, denseSettings],
    );

    const applyDensePreset = (preset: GalleryDensePreset) => {
        setDenseControls(GALLERY_DENSE_PRESETS[preset]);
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

    const updateDenseFeature = (key: DenseFeatureKey, value: boolean) => {
        setDenseControls(current => ({
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
                            colorMode={colorMode}
                            denseControls={denseControls}
                            densePreset={densePreset}
                            onApplyDensePreset={applyDensePreset}
                            onColorModeChange={setColorMode}
                            onResetDenseFeatures={() => {
                                setDenseControls(current => ({
                                    ...current,
                                    compactAccordionSummary: DEFAULT_DENSE_SETTINGS.compactAccordionSummary,
                                    compactButtonsAndChips: DEFAULT_DENSE_SETTINGS.compactButtonsAndChips,
                                    compactIconButtons: DEFAULT_DENSE_SETTINGS.compactIconButtons,
                                    compactInputs: DEFAULT_DENSE_SETTINGS.compactInputs,
                                    compactListsAndMenus: DEFAULT_DENSE_SETTINGS.compactListsAndMenus,
                                    compactTableCells: DEFAULT_DENSE_SETTINGS.compactTableCells,
                                    compactTreeItems: DEFAULT_DENSE_SETTINGS.compactTreeItems,
                                }));
                            }}
                            onResetToDefault={() => {
                                setDenseControls(GALLERY_DENSE_PRESETS.default);
                                setDensePreset('default');
                                setColorMode(getPreferredColorMode());
                            }}
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
