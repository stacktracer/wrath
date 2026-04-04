import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme, type SxProps, type Theme } from '@mui/material/styles';
import type { SystemStyleObject } from '@mui/system';
import { DataGridPro, type DataGridProProps, gridClasses } from '@mui/x-data-grid-pro';

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

type DenseDataGridSizingTuning = {
    fallbackTextLineHeightRatio: number;
    fallbackXHeightRatio: number;
};
type DenseDataGridSettings = DenseSettings['dataGrid'];

export type DenseDataGridMetrics = {
    checkboxHeight: number;
    columnHeaderHeight: number;
    devicePixelRatio: number;
    rowHeight: number;
    textLineHeight: number;
    xHeight: number;
};

export type DenseDataGridProps = Omit<DataGridProProps, 'columnHeaderHeight' | 'density' | 'rowHeight'> & {
    dense?: Partial<DenseDataGridSettings>;
    onMetricsChange?: (metrics: DenseDataGridMetrics) => void;
};

const DEFAULT_DENSE_DATA_GRID_SETTINGS: DenseDataGridSettings = {
    contentVerticalPadding: '1px',
    density: 'standard',
};

const DEFAULT_DENSE_DATA_GRID_SIZING_TUNING: DenseDataGridSizingTuning = {
    fallbackTextLineHeightRatio: 1.43,
    fallbackXHeightRatio: 0.57,
};

const DENSE_DATA_GRID_METRICS_EPSILON = 0.01;

function resolveDenseDataGridSizingTuning(
    tuning: Partial<DenseDataGridSizingTuning> | undefined,
): DenseDataGridSizingTuning {
    return {
        fallbackTextLineHeightRatio:
            tuning?.fallbackTextLineHeightRatio ??
            DEFAULT_DENSE_DATA_GRID_SIZING_TUNING.fallbackTextLineHeightRatio,
        fallbackXHeightRatio:
            tuning?.fallbackXHeightRatio ?? DEFAULT_DENSE_DATA_GRID_SIZING_TUNING.fallbackXHeightRatio,
    };
}

function resolveDenseDataGridSettings(
    dense: Partial<DenseDataGridSettings> | undefined,
): DenseDataGridSettings {
    return {
        contentVerticalPadding: normalizeDenseDataGridContentVerticalPadding(dense?.contentVerticalPadding),
        density: dense?.density ?? DEFAULT_DENSE_DATA_GRID_SETTINGS.density,
    };
}

function normalizeDenseDataGridContentVerticalPadding(contentVerticalPadding: string | undefined) {
    const normalized = contentVerticalPadding?.trim();

    return normalized && normalized.length > 0
        ? normalized
        : DEFAULT_DENSE_DATA_GRID_SETTINGS.contentVerticalPadding;
}

function resolveSupportedDenseDataGridContentVerticalPadding(contentVerticalPadding: string) {
    const normalized = normalizeDenseDataGridContentVerticalPadding(contentVerticalPadding);

    if (
        typeof window === 'undefined' ||
        typeof window.CSS?.supports !== 'function' ||
        window.CSS.supports('padding-top', normalized)
    ) {
        return normalized;
    }

    return DEFAULT_DENSE_DATA_GRID_SETTINGS.contentVerticalPadding;
}

function resolveDenseDataGridContentVerticalPaddingPixels(contentVerticalPaddingProbe: HTMLElement) {
    return parsePixelValue(
        window.getComputedStyle(contentVerticalPaddingProbe).paddingTop,
        Number.parseFloat(DEFAULT_DENSE_DATA_GRID_SETTINGS.contentVerticalPadding) || 1,
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
    checkboxHeight,
    contentVerticalPaddingPixels,
    devicePixelRatio,
    textLineHeight,
    xHeight,
}: {
    checkboxHeight: number;
    contentVerticalPaddingPixels: number;
    devicePixelRatio: number;
    textLineHeight: number;
    xHeight: number;
}): DenseDataGridMetrics {
    const contentVerticalPadding = contentVerticalPaddingPixels * 2;
    const computedHeight = snapToDevicePixel(
        Math.max(textLineHeight, checkboxHeight) + contentVerticalPadding,
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
        checkboxHeight: 0,
        contentVerticalPaddingPixels:
            Number.parseFloat(DEFAULT_DENSE_DATA_GRID_SETTINGS.contentVerticalPadding) || 1,
        devicePixelRatio,
        textLineHeight: baseBodyFontSize * resolvedTuning.fallbackTextLineHeightRatio,
        xHeight: fallbackXHeight,
    });
}

export function DenseDataGrid({ dense, onMetricsChange, sx, ...dataGridProps }: DenseDataGridProps) {
    const theme = useTheme();
    const [devicePixelRatio, setDevicePixelRatio] = useState(() =>
        typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1,
    );
    const resolvedDense = resolveDenseDataGridSettings(dense);
    const resolvedContentVerticalPadding = resolveSupportedDenseDataGridContentVerticalPadding(
        resolvedDense.contentVerticalPadding,
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
    const contentVerticalPaddingProbeRef = useRef<HTMLSpanElement | null>(null);
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
        const contentVerticalPaddingProbe = contentVerticalPaddingProbeRef.current;
        const xHeightProbe = xHeightProbeRef.current;

        if (body2TextProbe === null || contentVerticalPaddingProbe === null || xHeightProbe === null) {
            return undefined;
        }

        const frame = window.requestAnimationFrame(() => {
            // These hidden probes let the grid size itself from the same typography the page already uses.
            // We read `body2` line height from computed styles, resolve the requested extra vertical padding by
            // letting the browser compute a hidden probe, and sample the rendered checkbox icon because selection
            // columns can demand more height than plain text alone. We size to the visible content that must fit
            // inside the row, not to the checkbox root's invisible hit-target padding. The final row/header size is
            // the taller of the text line or checkbox icon, plus the caller-requested extra vertical padding. We
            // still capture a `1ex` probe for diagnostics, but it no longer contributes hidden slack when the caller
            // asks for `0px`.
            const computedStyles = window.getComputedStyle(body2TextProbe);
            const textLineHeight = parsePixelValue(
                computedStyles.lineHeight,
                baseBodyFontSize * DEFAULT_DENSE_DATA_GRID_SIZING_TUNING.fallbackTextLineHeightRatio,
            );
            const contentVerticalPaddingPixels =
                resolveDenseDataGridContentVerticalPaddingPixels(contentVerticalPaddingProbe);
            const xHeight =
                xHeightProbe.getBoundingClientRect().height ||
                baseBodyFontSize * DEFAULT_DENSE_DATA_GRID_SIZING_TUNING.fallbackXHeightRatio;
            const checkboxProbe = gridRootRef.current?.querySelector<SVGSVGElement>(
                `.${gridClasses.cellCheckbox} svg, .${gridClasses.columnHeaderCheckbox} svg`,
            );
            const checkboxHeight = checkboxProbe?.getBoundingClientRect().height ?? 0;
            const nextMetrics = createDenseDataGridMetrics({
                checkboxHeight,
                contentVerticalPaddingPixels,
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
    }, [baseBodyFontSize, devicePixelRatio, resolvedContentVerticalPadding, resolvedDense.density]);

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
                    ref={contentVerticalPaddingProbeRef}
                    sx={currentTheme => ({
                        ...currentTheme.typography.body2,
                        boxSizing: 'content-box',
                        display: 'block',
                        height: 0,
                        paddingBlock: resolvedContentVerticalPadding,
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
