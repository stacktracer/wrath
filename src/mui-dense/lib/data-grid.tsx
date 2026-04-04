import { Box, Typography } from '@mui/material';
import { useTheme, type SxProps, type Theme } from '@mui/material/styles';
import type { SystemStyleObject } from '@mui/system';
import { DataGridPro, gridClasses, type DataGridProProps } from '@mui/x-data-grid-pro';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import type { DenseSettings } from './settings';

const HIDDEN_PROBE_STYLE = {
    height: 0,
    left: '-10000px',
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'fixed',
    top: 0,
    visibility: 'hidden',
    width: 0,
} as const;

type DenseDataGridSettings = DenseSettings['dataGrid'];

export type DenseDataGridMetrics = {
    columnHeaderHeight: number;
    devicePixelRatio: number;
    rowHeight: number;
};

export type DenseDataGridProps = Omit<DataGridProProps, 'columnHeaderHeight' | 'density' | 'rowHeight'> & {
    dense?: Partial<DenseDataGridSettings>;
    onMetricsChange?: (metrics: DenseDataGridMetrics) => void;
};

const DEFAULT_DENSE_DATA_GRID_SETTINGS: DenseDataGridSettings = {
    textVerticalPadding: '1px',
    density: 'compact',
};

const DEFAULT_DENSE_DATA_GRID_FALLBACK_TEXT_LINE_HEIGHT_RATIO = 1.43;

const DENSE_DATA_GRID_METRICS_EPSILON = 0.01;

function resolveDenseDataGridSettings(
    dense: Partial<DenseDataGridSettings> | undefined,
): DenseDataGridSettings {
    return {
        textVerticalPadding: normalizeDenseDataGridTextVerticalPadding(dense?.textVerticalPadding),
        density: dense?.density ?? DEFAULT_DENSE_DATA_GRID_SETTINGS.density,
    };
}

function normalizeDenseDataGridTextVerticalPadding(textVerticalPadding: string | undefined) {
    const normalized = textVerticalPadding?.trim();

    return normalized && normalized.length > 0
        ? normalized
        : DEFAULT_DENSE_DATA_GRID_SETTINGS.textVerticalPadding;
}

function resolveSupportedDenseDataGridTextVerticalPadding(textVerticalPadding: string) {
    const normalized = normalizeDenseDataGridTextVerticalPadding(textVerticalPadding);

    if (
        typeof window === 'undefined' ||
        typeof window.CSS?.supports !== 'function' ||
        window.CSS.supports('padding-top', normalized)
    ) {
        return normalized;
    }

    return DEFAULT_DENSE_DATA_GRID_SETTINGS.textVerticalPadding;
}

function resolveDenseDataGridTextVerticalPaddingPixels(textVerticalPaddingProbe: HTMLElement) {
    return parsePixelValue(
        window.getComputedStyle(textVerticalPaddingProbe).paddingTop,
        Number.parseFloat(DEFAULT_DENSE_DATA_GRID_SETTINGS.textVerticalPadding) || 1,
    );
}

function resolveDenseDataGridCallerSx(callerSx: SxProps<Theme>, theme: Theme): SystemStyleObject<Theme> {
    if (Array.isArray(callerSx)) {
        return callerSx.reduce<SystemStyleObject<Theme>>((mergedSx, item) => {
            if (!item) {
                return mergedSx;
            }

            return {
                ...mergedSx,
                ...resolveDenseDataGridCallerSx(item, theme),
            };
        }, {});
    }

    return typeof callerSx === 'function'
        ? (callerSx(theme) as SystemStyleObject<Theme>)
        : (callerSx as SystemStyleObject<Theme>);
}

function createDenseDataGridSx(callerSx: SxProps<Theme> | undefined): NonNullable<DataGridProProps['sx']> {
    const denseDataGridSx: SystemStyleObject<Theme> = {
        backgroundColor: 'background.paper',
        [`& .${gridClasses.columnHeaders}`]: {
            backgroundColor: 'background.paper',
        },
        [`& .${gridClasses.columnHeader}`]: {
            backgroundColor: 'background.paper',
        },
        [`& .${gridClasses.columnHeader} .${gridClasses.sortButton}`]: {
            backgroundColor: 'background.paper',
        },
        [`& .${gridClasses.columnHeaderTitleContainerContent}`]: {
            height: '100%',
        },
    };

    if (callerSx === undefined) {
        return denseDataGridSx;
    }

    return theme => ({
        ...denseDataGridSx,
        ...resolveDenseDataGridCallerSx(callerSx, theme),
    });
}

export function parsePixelValue(value: string, fallback: number) {
    const parsed = Number.parseFloat(value);

    return Number.isFinite(parsed) ? parsed : fallback;
}

export function snapToDevicePixel(value: number, devicePixelRatio: number) {
    const safeDevicePixelRatio = devicePixelRatio > 0 ? devicePixelRatio : 1;

    return Number((Math.ceil(value * safeDevicePixelRatio) / safeDevicePixelRatio).toFixed(2));
}

export function formatPixelValue(value: number) {
    return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/\.?0+$/, '');
}

// MUI X's internal density multipliers (see densitySelector in @mui/x-data-grid). DataGrid internally
// scaled the row-height value we pass it by one of these, depending on the density setting. We already
// compute row-height in px, so we divide by the scale factor before passing it to DataGrid, so that
// DataGrid will end up at the intended row-height.
const DENSE_DATA_GRID_DENSITY_FACTORS: Record<DenseDataGridSettings['density'], number> = {
    comfortable: 1.3,
    standard: 1,
    compact: 0.7,
};

function resolveDenseDataGridHeightProp(targetHeight: number, density: DenseDataGridSettings['density']) {
    const densityFactor = DENSE_DATA_GRID_DENSITY_FACTORS[density] ?? 1;

    return Math.max(1, Math.ceil(targetHeight / densityFactor));
}

function createDenseDataGridMetrics({
    textVerticalPaddingPixels,
    devicePixelRatio,
    textLineHeight,
}: {
    textVerticalPaddingPixels: number;
    devicePixelRatio: number;
    textLineHeight: number;
}): DenseDataGridMetrics {
    const textVerticalPadding = textVerticalPaddingPixels * 2;
    const computedHeight = snapToDevicePixel(textLineHeight + textVerticalPadding, devicePixelRatio);

    return {
        columnHeaderHeight: computedHeight,
        devicePixelRatio,
        rowHeight: computedHeight,
    };
}

function areDenseDataGridMetricsEqual(left: DenseDataGridMetrics, right: DenseDataGridMetrics) {
    const areClose = (leftValue: number, rightValue: number) =>
        Math.abs(leftValue - rightValue) < DENSE_DATA_GRID_METRICS_EPSILON;

    return (
        left.devicePixelRatio === right.devicePixelRatio &&
        areClose(left.rowHeight, right.rowHeight) &&
        areClose(left.columnHeaderHeight, right.columnHeaderHeight)
    );
}

function createFallbackDenseDataGridMetrics(
    baseBodyFontSize: number,
    devicePixelRatio: number,
): DenseDataGridMetrics {
    return createDenseDataGridMetrics({
        textVerticalPaddingPixels:
            Number.parseFloat(DEFAULT_DENSE_DATA_GRID_SETTINGS.textVerticalPadding) || 1,
        devicePixelRatio,
        textLineHeight: baseBodyFontSize * DEFAULT_DENSE_DATA_GRID_FALLBACK_TEXT_LINE_HEIGHT_RATIO,
    });
}

export function DenseDataGrid({ dense, onMetricsChange, sx, ...dataGridProps }: DenseDataGridProps) {
    const theme = useTheme();
    const [devicePixelRatio, setDevicePixelRatio] = useState(() =>
        typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1,
    );
    const resolvedDense = resolveDenseDataGridSettings(dense);
    const resolvedTextVerticalPadding = resolveSupportedDenseDataGridTextVerticalPadding(
        resolvedDense.textVerticalPadding,
    );
    const baseBodyFontSize = typeof theme.typography.fontSize === 'number' ? theme.typography.fontSize : 14;
    const [metrics, setMetrics] = useState<DenseDataGridMetrics>(() =>
        createFallbackDenseDataGridMetrics(
            baseBodyFontSize,
            typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1,
        ),
    );
    const resolvedRowHeight = resolveDenseDataGridHeightProp(metrics.rowHeight, resolvedDense.density);
    const resolvedColumnHeaderHeight = resolveDenseDataGridHeightProp(
        metrics.columnHeaderHeight,
        resolvedDense.density,
    );
    const body2TextProbeRef = useRef<HTMLSpanElement | null>(null);
    const textVerticalPaddingProbeRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const syncDevicePixelRatio = () => {
            setDevicePixelRatio(window.devicePixelRatio || 1);
        };

        syncDevicePixelRatio();
        window.addEventListener('resize', syncDevicePixelRatio);
        window.visualViewport?.addEventListener('resize', syncDevicePixelRatio);

        return () => {
            window.removeEventListener('resize', syncDevicePixelRatio);
            window.visualViewport?.removeEventListener('resize', syncDevicePixelRatio);
        };
    }, []);

    useLayoutEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const body2TextProbe = body2TextProbeRef.current;
        const textVerticalPaddingProbe = textVerticalPaddingProbeRef.current;

        if (body2TextProbe === null || textVerticalPaddingProbe === null) {
            return undefined;
        }

        const frame = window.requestAnimationFrame(() => {
            // These hidden probes let the grid size itself from the same typography the page already uses.
            // We read `body2` line height from computed styles and resolve the requested extra text padding by
            // letting the browser compute a hidden probe. The wrapper's automatic row and header heights are now
            // text-driven on purpose, so non-text content like selection checkboxes no longer changes the computed
            // size floor.
            const computedStyles = window.getComputedStyle(body2TextProbe);
            const textLineHeight = parsePixelValue(
                computedStyles.lineHeight,
                baseBodyFontSize * DEFAULT_DENSE_DATA_GRID_FALLBACK_TEXT_LINE_HEIGHT_RATIO,
            );
            const textVerticalPaddingPixels =
                resolveDenseDataGridTextVerticalPaddingPixels(textVerticalPaddingProbe);
            const nextMetrics = createDenseDataGridMetrics({
                textVerticalPaddingPixels,
                devicePixelRatio,
                textLineHeight,
            });

            // This runs in the next animation frame, so `currentMetrics` may not be the same as `metrics`.
            setMetrics(currentMetrics => {
                return areDenseDataGridMetricsEqual(currentMetrics, nextMetrics)
                    ? currentMetrics
                    : nextMetrics;
            });
        });

        return () => {
            window.cancelAnimationFrame(frame);
        };
    }, [baseBodyFontSize, devicePixelRatio, resolvedDense.density, resolvedTextVerticalPadding]);

    useEffect(() => {
        onMetricsChange?.(metrics);
    }, [metrics, onMetricsChange]);

    return (
        <>
            <div
                style={{
                    height: '100%',
                    minWidth: 0,
                }}
            >
                <DataGridPro
                    {...dataGridProps}
                    // MUI X multiplies explicit row and header heights by the current density factor.
                    // The wrapper metrics describe the rendered pixels, so compensate before handing them back.
                    columnHeaderHeight={resolvedColumnHeaderHeight}
                    density={resolvedDense.density}
                    rowHeight={resolvedRowHeight}
                    sx={createDenseDataGridSx(sx)}
                />
            </div>

            <div aria-hidden="true" style={HIDDEN_PROBE_STYLE}>
                <Typography component="span" ref={body2TextProbeRef} variant="body2">
                    Body2 probe
                </Typography>
                <Box
                    component="span"
                    ref={textVerticalPaddingProbeRef}
                    sx={currentTheme => ({
                        ...currentTheme.typography.body2,
                        boxSizing: 'content-box',
                        display: 'block',
                        height: 0,
                        paddingBlock: resolvedTextVerticalPadding,
                        width: 0,
                    })}
                />
            </div>
        </>
    );
}
