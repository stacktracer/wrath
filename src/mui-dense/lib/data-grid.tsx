import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme, type SxProps, type Theme } from '@mui/material/styles';
import type { SystemStyleObject } from '@mui/system';
import { DataGridPro, type DataGridProProps, gridClasses } from '@mui/x-data-grid-pro';

import type { DenseDataGridOptions } from './types';

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

type DenseDataGridSizingTuning = {
    checkboxPadding: number;
    fallbackTextLineHeightRatio: number;
    fallbackXHeightRatio: number;
};

export type DenseDataGridDensity = NonNullable<DataGridProProps['density']>;

export type DenseDataGridMetrics = {
    checkboxHeight: number;
    columnHeaderHeight: number;
    devicePixelRatio: number;
    rowHeight: number;
    textLineHeight: number;
    xHeight: number;
};

export type DenseDataGridProps = Omit<DataGridProProps, 'columnHeaderHeight' | 'density' | 'rowHeight'> & {
    dense?: Partial<DenseDataGridOptions>;
    onMetricsChange?: (metrics: DenseDataGridMetrics) => void;
};

export const DEFAULT_DENSE_DATA_GRID_OPTIONS: DenseDataGridOptions = {
    cellBlockPadding: '1px',
    density: 'standard',
};

const DEFAULT_DENSE_DATA_GRID_SIZING_TUNING: DenseDataGridSizingTuning = {
    checkboxPadding: 6,
    fallbackTextLineHeightRatio: 1.43,
    fallbackXHeightRatio: 0.57,
};

const DENSE_DATA_GRID_METRICS_EPSILON = 0.01;

function resolveDenseDataGridSizingTuning(
    tuning: Partial<DenseDataGridSizingTuning> | undefined,
): DenseDataGridSizingTuning {
    return {
        checkboxPadding: tuning?.checkboxPadding ?? DEFAULT_DENSE_DATA_GRID_SIZING_TUNING.checkboxPadding,
        fallbackTextLineHeightRatio:
            tuning?.fallbackTextLineHeightRatio ??
            DEFAULT_DENSE_DATA_GRID_SIZING_TUNING.fallbackTextLineHeightRatio,
        fallbackXHeightRatio:
            tuning?.fallbackXHeightRatio ?? DEFAULT_DENSE_DATA_GRID_SIZING_TUNING.fallbackXHeightRatio,
    };
}

function resolveDenseDataGridOptions(dense: Partial<DenseDataGridOptions> | undefined): DenseDataGridOptions {
    return {
        cellBlockPadding: normalizeDenseDataGridCellBlockPadding(dense?.cellBlockPadding),
        density: dense?.density ?? DEFAULT_DENSE_DATA_GRID_OPTIONS.density,
    };
}

function normalizeDenseDataGridCellBlockPadding(cellBlockPadding: string | undefined) {
    const normalized = cellBlockPadding?.trim();

    return normalized && normalized.length > 0
        ? normalized
        : DEFAULT_DENSE_DATA_GRID_OPTIONS.cellBlockPadding;
}

function resolveSupportedDenseDataGridCellBlockPadding(cellBlockPadding: string) {
    const normalized = normalizeDenseDataGridCellBlockPadding(cellBlockPadding);

    if (
        typeof window === 'undefined' ||
        typeof window.CSS?.supports !== 'function' ||
        window.CSS.supports('padding-top', normalized)
    ) {
        return normalized;
    }

    return DEFAULT_DENSE_DATA_GRID_OPTIONS.cellBlockPadding;
}

function resolveDenseDataGridCellBlockPaddingPixels(cellBlockPaddingProbe: HTMLElement) {
    return parsePixelValue(
        window.getComputedStyle(cellBlockPaddingProbe).paddingTop,
        Number.parseFloat(DEFAULT_DENSE_DATA_GRID_OPTIONS.cellBlockPadding) || 1,
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

const DENSE_DATA_GRID_DENSITY_FACTORS: Record<DenseDataGridDensity, number> = {
    comfortable: 1.3,
    standard: 1,
    compact: 0.7,
};

function resolveDenseDataGridHeightProp(targetHeight: number, density: DenseDataGridDensity) {
    const densityFactor = DENSE_DATA_GRID_DENSITY_FACTORS[density] ?? 1;

    return Math.max(1, Math.ceil(targetHeight / densityFactor));
}

function createDenseDataGridMetrics({
    cellBlockPaddingPixels,
    checkboxHeight,
    devicePixelRatio,
    textLineHeight,
    tuning,
    xHeight,
}: {
    cellBlockPaddingPixels: number;
    checkboxHeight: number;
    devicePixelRatio: number;
    textLineHeight: number;
    tuning?: Partial<DenseDataGridSizingTuning>;
    xHeight: number;
}): DenseDataGridMetrics {
    const resolvedTuning = resolveDenseDataGridSizingTuning(tuning);
    const textPadding = cellBlockPaddingPixels * 2;
    const computedHeight = snapToDevicePixel(
        Math.max(
            textLineHeight + xHeight + textPadding,
            checkboxHeight > 0 ? checkboxHeight + resolvedTuning.checkboxPadding : 0,
        ),
        devicePixelRatio,
    );

    return {
        checkboxHeight: Number(checkboxHeight.toFixed(2)),
        columnHeaderHeight: computedHeight,
        devicePixelRatio,
        rowHeight: computedHeight,
        textLineHeight: Number(textLineHeight.toFixed(2)),
        xHeight: Number(xHeight.toFixed(2)),
    };
}

function areDenseDataGridMetricsEqual(left: DenseDataGridMetrics, right: DenseDataGridMetrics) {
    const areClose = (leftValue: number, rightValue: number) =>
        Math.abs(leftValue - rightValue) < DENSE_DATA_GRID_METRICS_EPSILON;

    return (
        left.devicePixelRatio === right.devicePixelRatio &&
        areClose(left.rowHeight, right.rowHeight) &&
        areClose(left.columnHeaderHeight, right.columnHeaderHeight) &&
        areClose(left.textLineHeight, right.textLineHeight) &&
        areClose(left.xHeight, right.xHeight) &&
        areClose(left.checkboxHeight, right.checkboxHeight)
    );
}

function createFallbackDenseDataGridMetrics(
    baseBodyFontSize: number,
    devicePixelRatio: number,
    tuning?: Partial<DenseDataGridSizingTuning>,
): DenseDataGridMetrics {
    const resolvedTuning = resolveDenseDataGridSizingTuning(tuning);
    const fallbackXHeight = baseBodyFontSize * resolvedTuning.fallbackXHeightRatio;

    return createDenseDataGridMetrics({
        cellBlockPaddingPixels: Number.parseFloat(DEFAULT_DENSE_DATA_GRID_OPTIONS.cellBlockPadding) || 1,
        checkboxHeight: 0,
        devicePixelRatio,
        textLineHeight: baseBodyFontSize * resolvedTuning.fallbackTextLineHeightRatio,
        tuning: resolvedTuning,
        xHeight: fallbackXHeight,
    });
}

export function DenseDataGrid({ dense, onMetricsChange, sx, ...dataGridProps }: DenseDataGridProps) {
    const theme = useTheme();
    const [devicePixelRatio, setDevicePixelRatio] = useState(() =>
        typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1,
    );
    const resolvedDense = resolveDenseDataGridOptions(dense);
    const resolvedCellBlockPadding = resolveSupportedDenseDataGridCellBlockPadding(
        resolvedDense.cellBlockPadding,
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
    const gridRootRef = useRef<HTMLDivElement | null>(null);
    const body2TextProbeRef = useRef<HTMLSpanElement | null>(null);
    const cellBlockPaddingProbeRef = useRef<HTMLSpanElement | null>(null);
    const xHeightProbeRef = useRef<HTMLSpanElement | null>(null);

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
        const cellBlockPaddingProbe = cellBlockPaddingProbeRef.current;
        const xHeightProbe = xHeightProbeRef.current;

        if (body2TextProbe === null || cellBlockPaddingProbe === null || xHeightProbe === null) {
            return undefined;
        }

        const frame = window.requestAnimationFrame(() => {
            // These hidden probes let the grid size itself from the same typography the page already uses.
            // We read `body2` line height from computed styles, use a `1ex` probe as an approximation of lowercase
            // text height, resolve the requested cell padding by letting the browser compute the padding probe, and
            // sample the checkbox icon because selection columns can demand more height than text alone. The final
            // row/header size is the taller of the text stack plus resolved block padding or the checkbox icon plus
            // tuned breathing room. This remains a little fragile because it depends on MUI X class selectors and
            // on font-relative units such as `ex` and `cap`, which can vary slightly by font and browser.
            const computedStyles = window.getComputedStyle(body2TextProbe);
            const textLineHeight = parsePixelValue(
                computedStyles.lineHeight,
                baseBodyFontSize * DEFAULT_DENSE_DATA_GRID_SIZING_TUNING.fallbackTextLineHeightRatio,
            );
            const cellBlockPaddingPixels = resolveDenseDataGridCellBlockPaddingPixels(cellBlockPaddingProbe);
            const xHeight =
                xHeightProbe.getBoundingClientRect().height ||
                baseBodyFontSize * DEFAULT_DENSE_DATA_GRID_SIZING_TUNING.fallbackXHeightRatio;
            const checkboxProbe = gridRootRef.current?.querySelector<HTMLElement>(
                `.${gridClasses.cellCheckbox} .MuiSvgIcon-root, .${gridClasses.columnHeaderCheckbox} .MuiSvgIcon-root`,
            );
            const checkboxHeight = checkboxProbe?.getBoundingClientRect().height ?? 0;
            const nextMetrics = createDenseDataGridMetrics({
                cellBlockPaddingPixels,
                checkboxHeight,
                devicePixelRatio,
                textLineHeight,
                xHeight,
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
    }, [baseBodyFontSize, devicePixelRatio, resolvedCellBlockPadding, resolvedDense.density]);

    useEffect(() => {
        onMetricsChange?.(metrics);
    }, [metrics, onMetricsChange]);

    return (
        <>
            <div
                ref={gridRootRef}
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
                    ref={cellBlockPaddingProbeRef}
                    sx={currentTheme => ({
                        ...currentTheme.typography.body2,
                        boxSizing: 'content-box',
                        display: 'block',
                        height: 0,
                        paddingBlock: resolvedCellBlockPadding,
                        width: 0,
                    })}
                />
                <Box
                    component="span"
                    ref={xHeightProbeRef}
                    sx={currentTheme => ({
                        ...currentTheme.typography.body2,
                        display: 'block',
                        height: '1ex',
                        width: 0,
                    })}
                />
            </div>
        </>
    );
}
