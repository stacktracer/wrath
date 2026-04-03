import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme, type SxProps, type Theme } from '@mui/material/styles';
import type { SystemStyleObject } from '@mui/system';
import { DataGridPro, type DataGridProProps, gridClasses } from '@mui/x-data-grid-pro';

const HIDDEN_MEASUREMENT_STYLE = {
    height: 0,
    left: '-10000px',
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'fixed',
    top: 0,
    visibility: 'hidden',
    width: 0,
} as const;

type DenseDataGridMeasurementTuning = {
    checkboxPadding: number;
    fallbackTextLineHeightRatio: number;
    fallbackXHeightRatio: number;
};

type DenseDataGridMeasurement = {
    checkboxHeight: number;
    devicePixelRatio: number;
    textLineHeight: number;
    cellBlockPadding: DenseDataGridCellBlockPadding;
    tuning?: Partial<DenseDataGridMeasurementTuning>;
    xHeight: number;
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

export type DenseDataGridCellBlockPadding = {
    unit: 'px' | 'ex';
    value: number;
};

export type DenseDataGridProps = Omit<DataGridProProps, 'columnHeaderHeight' | 'rowHeight'> & {
    cellBlockPadding?: DenseDataGridCellBlockPadding;
    onMetricsChange?: (metrics: DenseDataGridMetrics) => void;
};

export const DEFAULT_DENSE_DATA_GRID_CELL_BLOCK_PADDING: DenseDataGridCellBlockPadding = {
    unit: 'px',
    value: 1,
};

const DEFAULT_DENSE_DATA_GRID_MEASUREMENT_TUNING: DenseDataGridMeasurementTuning = {
    checkboxPadding: 6,
    fallbackTextLineHeightRatio: 1.43,
    fallbackXHeightRatio: 0.57,
};

function resolveDenseDataGridMeasurementTuning(
    tuning: Partial<DenseDataGridMeasurementTuning> | undefined,
): DenseDataGridMeasurementTuning {
    return {
        checkboxPadding:
            tuning?.checkboxPadding ?? DEFAULT_DENSE_DATA_GRID_MEASUREMENT_TUNING.checkboxPadding,
        fallbackTextLineHeightRatio:
            tuning?.fallbackTextLineHeightRatio ??
            DEFAULT_DENSE_DATA_GRID_MEASUREMENT_TUNING.fallbackTextLineHeightRatio,
        fallbackXHeightRatio:
            tuning?.fallbackXHeightRatio ?? DEFAULT_DENSE_DATA_GRID_MEASUREMENT_TUNING.fallbackXHeightRatio,
    };
}

function resolveDenseDataGridCellBlockPadding(
    cellBlockPadding: DenseDataGridCellBlockPadding | undefined,
): DenseDataGridCellBlockPadding {
    return {
        unit: cellBlockPadding?.unit ?? DEFAULT_DENSE_DATA_GRID_CELL_BLOCK_PADDING.unit,
        value: Math.max(0, cellBlockPadding?.value ?? DEFAULT_DENSE_DATA_GRID_CELL_BLOCK_PADDING.value),
    };
}

function resolveDenseDataGridCellBlockPaddingPixels(
    cellBlockPadding: DenseDataGridCellBlockPadding,
    xHeight: number,
) {
    return cellBlockPadding.unit === 'ex' ? cellBlockPadding.value * xHeight : cellBlockPadding.value;
}

function formatDenseDataGridCellBlockPadding(cellBlockPadding: DenseDataGridCellBlockPadding) {
    return `${formatPixelValue(cellBlockPadding.value)}${cellBlockPadding.unit}`;
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

function createDenseDataGridSx(
    cellBlockPadding: DenseDataGridCellBlockPadding,
    callerSx: SxProps<Theme> | undefined,
): NonNullable<DataGridProProps['sx']> {
    const denseDataGridSx: SystemStyleObject<Theme> = {
        backgroundColor: 'background.paper',
        [`& .${gridClasses.cell}`]: {
            paddingBlock: formatDenseDataGridCellBlockPadding(cellBlockPadding),
        },
        [`& .${gridClasses.columnHeaders}`]: {
            backgroundColor: 'background.paper',
        },
        [`& .${gridClasses.columnHeader}`]: {
            backgroundColor: 'background.paper',
            paddingBlock: formatDenseDataGridCellBlockPadding(cellBlockPadding),
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

function calculateDenseDataGridMetrics({
    checkboxHeight,
    devicePixelRatio,
    textLineHeight,
    cellBlockPadding,
    tuning,
    xHeight,
}: DenseDataGridMeasurement): DenseDataGridMetrics {
    const resolvedTuning = resolveDenseDataGridMeasurementTuning(tuning);
    const textPadding = resolveDenseDataGridCellBlockPaddingPixels(cellBlockPadding, xHeight) * 2;
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

function createFallbackDenseDataGridMetrics(
    baseBodyFontSize: number,
    devicePixelRatio: number,
    cellBlockPadding?: DenseDataGridCellBlockPadding,
    tuning?: Partial<DenseDataGridMeasurementTuning>,
): DenseDataGridMetrics {
    const resolvedTuning = resolveDenseDataGridMeasurementTuning(tuning);
    const resolvedCellBlockPadding = resolveDenseDataGridCellBlockPadding(cellBlockPadding);
    const fallbackXHeight = baseBodyFontSize * resolvedTuning.fallbackXHeightRatio;

    return calculateDenseDataGridMetrics({
        checkboxHeight: 0,
        devicePixelRatio,
        textLineHeight: baseBodyFontSize * resolvedTuning.fallbackTextLineHeightRatio,
        cellBlockPadding: resolvedCellBlockPadding,
        tuning: resolvedTuning,
        xHeight: fallbackXHeight,
    });
}

export function DenseDataGrid({
    cellBlockPadding,
    density,
    onMetricsChange,
    sx,
    ...dataGridProps
}: DenseDataGridProps) {
    const theme = useTheme();
    const [devicePixelRatio, setDevicePixelRatio] = useState(() =>
        typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1,
    );
    const resolvedCellBlockPadding = resolveDenseDataGridCellBlockPadding(cellBlockPadding);
    const baseBodyFontSize = typeof theme.typography.fontSize === 'number' ? theme.typography.fontSize : 14;
    const [metrics, setMetrics] = useState<DenseDataGridMetrics>(() =>
        createFallbackDenseDataGridMetrics(
            baseBodyFontSize,
            typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1,
            resolvedCellBlockPadding,
        ),
    );
    const rootRef = useRef<HTMLDivElement | null>(null);
    const body2ProbeRef = useRef<HTMLSpanElement | null>(null);
    const exProbeRef = useRef<HTMLSpanElement | null>(null);

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

        const body2Probe = body2ProbeRef.current;
        const exProbe = exProbeRef.current;

        if (body2Probe === null || exProbe === null) {
            return undefined;
        }

        const frame = window.requestAnimationFrame(() => {
            const computedStyles = window.getComputedStyle(body2Probe);
            const textLineHeight = parsePixelValue(
                computedStyles.lineHeight,
                baseBodyFontSize * DEFAULT_DENSE_DATA_GRID_MEASUREMENT_TUNING.fallbackTextLineHeightRatio,
            );
            const xHeight =
                exProbe.getBoundingClientRect().height ||
                baseBodyFontSize * DEFAULT_DENSE_DATA_GRID_MEASUREMENT_TUNING.fallbackXHeightRatio;
            const checkboxProbe = rootRef.current?.querySelector<HTMLElement>(
                `.${gridClasses.cellCheckbox} .MuiSvgIcon-root, .${gridClasses.columnHeaderCheckbox} .MuiSvgIcon-root`,
            );
            const checkboxHeight = checkboxProbe?.getBoundingClientRect().height ?? 0;
            const nextMetrics = calculateDenseDataGridMetrics({
                checkboxHeight,
                devicePixelRatio,
                textLineHeight,
                cellBlockPadding: resolvedCellBlockPadding,
                xHeight,
            });

            setMetrics(current => {
                if (
                    current.devicePixelRatio === nextMetrics.devicePixelRatio &&
                    Math.abs(current.rowHeight - nextMetrics.rowHeight) < 0.01 &&
                    Math.abs(current.columnHeaderHeight - nextMetrics.columnHeaderHeight) < 0.01 &&
                    Math.abs(current.textLineHeight - nextMetrics.textLineHeight) < 0.01 &&
                    Math.abs(current.xHeight - nextMetrics.xHeight) < 0.01 &&
                    Math.abs(current.checkboxHeight - nextMetrics.checkboxHeight) < 0.01
                ) {
                    return current;
                }

                return nextMetrics;
            });
        });

        return () => {
            window.cancelAnimationFrame(frame);
        };
    }, [
        baseBodyFontSize,
        density,
        devicePixelRatio,
        resolvedCellBlockPadding.unit,
        resolvedCellBlockPadding.value,
    ]);

    useEffect(() => {
        onMetricsChange?.(metrics);
    }, [metrics, onMetricsChange]);

    return (
        <>
            <div
                ref={rootRef}
                style={{
                    height: '100%',
                    minWidth: 0,
                }}
            >
                <DataGridPro
                    {...dataGridProps}
                    columnHeaderHeight={metrics.columnHeaderHeight}
                    density={density}
                    rowHeight={metrics.rowHeight}
                    sx={createDenseDataGridSx(resolvedCellBlockPadding, sx)}
                />
            </div>

            <div aria-hidden="true" style={HIDDEN_MEASUREMENT_STYLE}>
                <Typography component="span" ref={body2ProbeRef} variant="body2">
                    Body2 probe
                </Typography>
                <Box
                    component="span"
                    ref={exProbeRef}
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
