import { type ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, Typography, type TypographyProps } from '@mui/material';
import { useTheme, type SxProps, type Theme } from '@mui/material/styles';
import type { SystemStyleObject } from '@mui/system';
import { DataGridPro, gridClasses, type DataGridProProps } from '@mui/x-data-grid-pro';

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

export type DenseDataGridLineHeights = {
    header?: number;
    row?: number;
};

export type DenseDataGridMetrics = {
    columnHeaderHeight: number;
    devicePixelRatio: number;
    rowHeight: number;
};

export type DenseDataGridHeightProps = Pick<DataGridProProps, 'columnHeaderHeight' | 'rowHeight'>;

export type DenseDataGridSizingInput = DenseDataGridLineHeights & {
    devicePixelRatio: number;
    fallbackFontSize?: number;
    textVerticalPaddingPixels: number;
};

export type DenseDataGridTextProbeDefinition = {
    children?: ReactNode;
    sx?: SxProps<Theme>;
    variant?: TypographyProps['variant'];
};

type DenseDataGridProbeTypographyOverride = {
    font?: string;
    fontWeight?: number | string;
    letterSpacing?: string;
};

type DenseDataGridBaseProps = Omit<DataGridProProps, 'columnHeaderHeight' | 'density' | 'rowHeight'> & {
    dense?: Partial<DenseDataGridSettings>;
};

type DenseDataGridMetricsProps = {
    headerProbe?: never;
    metrics: DenseDataGridMetrics;
    onMetricsChange?: never;
    rowProbe?: never;
};

type DenseDataGridProbeProps = {
    headerProbe?: DenseDataGridTextProbeDefinition;
    metrics?: undefined;
    onMetricsChange?: (metrics: DenseDataGridMetrics) => void;
    rowProbe?: DenseDataGridTextProbeDefinition;
};

export type DenseDataGridProps = DenseDataGridBaseProps &
    (DenseDataGridMetricsProps | DenseDataGridProbeProps);

const DEFAULT_DENSE_DATA_GRID_SETTINGS: DenseDataGridSettings = {
    textVerticalPadding: '1px',
    density: 'compact',
};

const DEFAULT_DENSE_DATA_GRID_FALLBACK_TEXT_LINE_HEIGHT_RATIO = 1.43;

const DEFAULT_DENSE_DATA_GRID_ROW_PROBE: Required<DenseDataGridTextProbeDefinition> = {
    children: 'Body2 probe',
    sx: {},
    variant: 'body2',
};

const DEFAULT_DENSE_DATA_GRID_HEADER_PROBE: Required<DenseDataGridTextProbeDefinition> = {
    children: 'Header probe',
    sx: theme => ({
        fontWeight: theme.typography.fontWeightMedium,
    }),
    variant: 'body2',
};

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

function resolveDenseDataGridFallbackTextVerticalPaddingPixels(textVerticalPadding: string) {
    const normalized = normalizeDenseDataGridTextVerticalPadding(textVerticalPadding);

    if (normalized === '0') {
        return 0;
    }

    if (/^-?(?:\d+|\d*\.\d+)px$/u.test(normalized)) {
        return parsePixelValue(
            normalized,
            Number.parseFloat(DEFAULT_DENSE_DATA_GRID_SETTINGS.textVerticalPadding) || 1,
        );
    }

    return Number.parseFloat(DEFAULT_DENSE_DATA_GRID_SETTINGS.textVerticalPadding) || 1;
}

function measureDenseDataGridTextVerticalPaddingPixels(textVerticalPaddingProbe: HTMLElement) {
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

    return Math.max(1, Math.ceil(targetHeight / densityFactor - DENSE_DATA_GRID_METRICS_EPSILON));
}

function resolveDenseDataGridFallbackLineHeight(fallbackFontSize: number) {
    return fallbackFontSize * DEFAULT_DENSE_DATA_GRID_FALLBACK_TEXT_LINE_HEIGHT_RATIO;
}

function resolveDenseDataGridLineHeights({
    fallbackFontSize = 14,
    header,
    row,
}: DenseDataGridLineHeights & { fallbackFontSize?: number }) {
    const resolvedRow = row ?? resolveDenseDataGridFallbackLineHeight(fallbackFontSize);
    const resolvedHeader = header ?? resolvedRow;

    return {
        header: resolvedHeader,
        row: resolvedRow,
    };
}

function measureDenseDataGridLineHeight(element: HTMLElement | null, fallback: number) {
    if (element === null) {
        return fallback;
    }

    return parsePixelValue(window.getComputedStyle(element).lineHeight, fallback);
}

export function measureDenseDataGridLineHeights({
    fallbackFontSize = 14,
    headerElement,
    rowElement,
}: {
    fallbackFontSize?: number;
    headerElement?: HTMLElement | null;
    rowElement?: HTMLElement | null;
}) {
    const fallbackRow = resolveDenseDataGridFallbackLineHeight(fallbackFontSize);
    const row = measureDenseDataGridLineHeight(rowElement ?? null, fallbackRow);
    const header = measureDenseDataGridLineHeight(headerElement ?? null, row);

    return {
        header,
        row,
    };
}

export function createDenseDataGridMetrics({
    devicePixelRatio,
    fallbackFontSize = 14,
    header,
    row,
    textVerticalPaddingPixels,
}: DenseDataGridSizingInput): DenseDataGridMetrics {
    const resolvedLineHeights = resolveDenseDataGridLineHeights({
        fallbackFontSize,
        header,
        row,
    });
    const textVerticalPadding = textVerticalPaddingPixels * 2;

    return {
        columnHeaderHeight: snapToDevicePixel(
            resolvedLineHeights.header + textVerticalPadding,
            devicePixelRatio,
        ),
        devicePixelRatio,
        rowHeight: snapToDevicePixel(resolvedLineHeights.row + textVerticalPadding, devicePixelRatio),
    };
}

export function createDenseDataGridHeightProps(
    metrics: DenseDataGridMetrics,
    density: DenseDataGridSettings['density'],
): DenseDataGridHeightProps {
    return {
        columnHeaderHeight: resolveDenseDataGridHeightProp(metrics.columnHeaderHeight, density),
        rowHeight: resolveDenseDataGridHeightProp(metrics.rowHeight, density),
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

function useDenseDataGridDevicePixelRatio() {
    const [devicePixelRatio, setDevicePixelRatio] = useState(() =>
        typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1,
    );

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

    return devicePixelRatio;
}

function readDenseDataGridProbeTypographyOverride(gridRoot: HTMLElement | null) {
    if (gridRoot === null) {
        return null;
    }

    const computedStyles = window.getComputedStyle(gridRoot);
    const font = computedStyles.font || undefined;
    const fontWeight = computedStyles.getPropertyValue('--unstable_DataGrid-headWeight').trim() || undefined;
    const letterSpacing = computedStyles.letterSpacing || undefined;

    return {
        header: {
            ...(font ? { font } : {}),
            ...(fontWeight ? { fontWeight } : {}),
            ...(letterSpacing ? { letterSpacing } : {}),
        },
        row: {
            ...(font ? { font } : {}),
            ...(letterSpacing ? { letterSpacing } : {}),
        },
    };
}

function areDenseDataGridProbeTypographyOverridesEqual(
    left: {
        header: DenseDataGridProbeTypographyOverride;
        row: DenseDataGridProbeTypographyOverride;
    } | null,
    right: {
        header: DenseDataGridProbeTypographyOverride;
        row: DenseDataGridProbeTypographyOverride;
    } | null,
) {
    if (left === right) {
        return true;
    }

    if (left === null || right === null) {
        return false;
    }

    const areEqual = (
        leftOverride: DenseDataGridProbeTypographyOverride,
        rightOverride: DenseDataGridProbeTypographyOverride,
    ) =>
        leftOverride.font === rightOverride.font &&
        leftOverride.fontWeight === rightOverride.fontWeight &&
        leftOverride.letterSpacing === rightOverride.letterSpacing;

    return areEqual(left.row, right.row) && areEqual(left.header, right.header);
}

function renderDenseDataGridTextProbe({
    computedTypographyOverride,
    defaultProbe,
    probe,
    probeRef,
}: {
    computedTypographyOverride?: DenseDataGridProbeTypographyOverride;
    defaultProbe: Required<DenseDataGridTextProbeDefinition>;
    probe: DenseDataGridTextProbeDefinition | undefined;
    probeRef: React.RefObject<HTMLSpanElement | null>;
}) {
    const resolvedChildren = probe?.children ?? defaultProbe.children;
    const resolvedVariant = probe?.variant ?? defaultProbe.variant;
    const shouldUseComputedTypography = probe?.sx === undefined && probe?.variant === undefined;

    return (
        <Typography
            component="span"
            ref={probeRef}
            sx={theme => ({
                ...resolveDenseDataGridProbeTypographyStyles(theme, resolvedVariant),
                ...(defaultProbe.sx ? resolveDenseDataGridCallerSx(defaultProbe.sx, theme) : {}),
                ...(shouldUseComputedTypography ? computedTypographyOverride : {}),
                ...(probe?.sx ? resolveDenseDataGridCallerSx(probe.sx, theme) : {}),
            })}
            variant={resolvedVariant}
        >
            {resolvedChildren}
        </Typography>
    );
}

function resolveDenseDataGridProbeTypographyStyles(
    theme: Theme,
    variant: DenseDataGridTextProbeDefinition['variant'],
): SystemStyleObject<Theme> {
    if (typeof variant === 'string' && variant !== 'inherit' && variant in theme.typography) {
        return theme.typography[variant as keyof Theme['typography']] as SystemStyleObject<Theme>;
    }

    return theme.typography.body2 as SystemStyleObject<Theme>;
}

type DenseDataGridInternalProbeProps = {
    fallbackFontSize: number;
    gridRoot: HTMLElement | null;
    headerProbe?: DenseDataGridTextProbeDefinition;
    onMetricsChange: (metrics: DenseDataGridMetrics) => void;
    rowProbe?: DenseDataGridTextProbeDefinition;
    textVerticalPadding: string;
};

function DenseDataGridInternalProbe({
    fallbackFontSize,
    gridRoot,
    headerProbe,
    onMetricsChange,
    rowProbe,
    textVerticalPadding,
}: DenseDataGridInternalProbeProps) {
    const theme = useTheme();
    const devicePixelRatio = useDenseDataGridDevicePixelRatio();
    const resolvedTextVerticalPadding = resolveSupportedDenseDataGridTextVerticalPadding(textVerticalPadding);
    const rowProbeRef = useRef<HTMLSpanElement | null>(null);
    const headerProbeRef = useRef<HTMLSpanElement | null>(null);
    const textVerticalPaddingProbeRef = useRef<HTMLSpanElement | null>(null);
    const resolvedRowProbe = rowProbe ?? DEFAULT_DENSE_DATA_GRID_ROW_PROBE;
    const [defaultProbeTypographyOverride, setDefaultProbeTypographyOverride] = useState(() =>
        readDenseDataGridProbeTypographyOverride(gridRoot),
    );

    useLayoutEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const nextOverride = readDenseDataGridProbeTypographyOverride(gridRoot);

        setDefaultProbeTypographyOverride(currentOverride =>
            areDenseDataGridProbeTypographyOverridesEqual(currentOverride, nextOverride)
                ? currentOverride
                : nextOverride,
        );
    }, [gridRoot, theme]);

    useLayoutEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const rowElement = rowProbeRef.current;
        const textVerticalPaddingProbe = textVerticalPaddingProbeRef.current;

        if (rowElement === null || textVerticalPaddingProbe === null) {
            return undefined;
        }

        const frame = window.requestAnimationFrame(() => {
            const lineHeights = measureDenseDataGridLineHeights({
                fallbackFontSize,
                headerElement: headerProbeRef.current,
                rowElement,
            });

            onMetricsChange(
                createDenseDataGridMetrics({
                    devicePixelRatio,
                    fallbackFontSize,
                    header: lineHeights.header,
                    row: lineHeights.row,
                    textVerticalPaddingPixels:
                        measureDenseDataGridTextVerticalPaddingPixels(textVerticalPaddingProbe),
                }),
            );
        });

        return () => {
            window.cancelAnimationFrame(frame);
        };
    }, [
        defaultProbeTypographyOverride,
        devicePixelRatio,
        fallbackFontSize,
        headerProbe,
        onMetricsChange,
        resolvedTextVerticalPadding,
        rowProbe,
    ]);

    return (
        <div aria-hidden="true" style={HIDDEN_PROBE_STYLE}>
            {renderDenseDataGridTextProbe({
                computedTypographyOverride: defaultProbeTypographyOverride?.row,
                defaultProbe: DEFAULT_DENSE_DATA_GRID_ROW_PROBE,
                probe: rowProbe,
                probeRef: rowProbeRef,
            })}
            {renderDenseDataGridTextProbe({
                computedTypographyOverride: defaultProbeTypographyOverride?.header,
                defaultProbe: DEFAULT_DENSE_DATA_GRID_HEADER_PROBE,
                probe: headerProbe,
                probeRef: headerProbeRef,
            })}
            <Box
                component="span"
                ref={textVerticalPaddingProbeRef}
                sx={currentTheme => ({
                    ...resolveDenseDataGridProbeTypographyStyles(currentTheme, resolvedRowProbe.variant),
                    ...(resolvedRowProbe.sx
                        ? resolveDenseDataGridCallerSx(resolvedRowProbe.sx, currentTheme)
                        : {}),
                    ...(rowProbe?.sx === undefined && rowProbe?.variant === undefined
                        ? defaultProbeTypographyOverride?.row
                        : {}),
                    boxSizing: 'content-box',
                    display: 'block',
                    height: 0,
                    paddingBlock: resolvedTextVerticalPadding,
                    width: 0,
                })}
            />
        </div>
    );
}

export function DenseDataGrid(props: DenseDataGridProps) {
    const theme = useTheme();
    const devicePixelRatio = useDenseDataGridDevicePixelRatio();
    const resolvedDense = resolveDenseDataGridSettings(props.dense);
    const fallbackFontSize = typeof theme.typography.fontSize === 'number' ? theme.typography.fontSize : 14;
    const explicitMetrics = props.metrics;
    let dataGridProps: Omit<DataGridProProps, 'columnHeaderHeight' | 'density' | 'rowHeight'>;
    let probeProps: DenseDataGridProbeProps | null = null;

    if (explicitMetrics !== undefined) {
        const { dense: _dense, metrics: _metrics, sx: _sx, ...restDataGridProps } = props;
        dataGridProps = restDataGridProps;
    } else {
        const {
            dense: _dense,
            headerProbe,
            metrics: _metrics,
            onMetricsChange,
            rowProbe,
            sx: _sx,
            ...restDataGridProps
        } = props;
        dataGridProps = restDataGridProps;
        probeProps = {
            headerProbe,
            onMetricsChange,
            rowProbe,
        };
    }

    const [gridRoot, setGridRoot] = useState<HTMLDivElement | null>(null);
    const [probeMetrics, setProbeMetrics] = useState<DenseDataGridMetrics>(() =>
        createDenseDataGridMetrics({
            devicePixelRatio,
            fallbackFontSize,
            textVerticalPaddingPixels: resolveDenseDataGridFallbackTextVerticalPaddingPixels(
                resolvedDense.textVerticalPadding,
            ),
        }),
    );
    const probeMetricsRef = useRef(probeMetrics);
    const hasPublishedMeasuredProbeMetricsRef = useRef(false);
    const externalOnMetricsChange = probeProps?.onMetricsChange;
    const resolvedMetrics = explicitMetrics ?? probeMetrics;
    const resolvedHeightProps = createDenseDataGridHeightProps(resolvedMetrics, resolvedDense.density);

    useEffect(() => {
        probeMetricsRef.current = probeMetrics;
    }, [probeMetrics]);

    const reportMeasuredMetrics = useCallback(
        (nextMetrics: DenseDataGridMetrics) => {
            const hasChanged = !areDenseDataGridMetricsEqual(probeMetricsRef.current, nextMetrics);
            const shouldPublish = hasChanged || !hasPublishedMeasuredProbeMetricsRef.current;

            // The first measured result can legitimately match the fallback metrics we started with.
            // Publish it anyway so callers can distinguish "probe completed" from "still on fallback".
            hasPublishedMeasuredProbeMetricsRef.current = true;

            if (hasChanged) {
                probeMetricsRef.current = nextMetrics;
                setProbeMetrics(nextMetrics);
            }

            if (shouldPublish) {
                externalOnMetricsChange?.(nextMetrics);
            }
        },
        [externalOnMetricsChange],
    );

    return (
        <div
            style={{
                height: '100%',
                minWidth: 0,
            }}
        >
            {probeProps ? (
                <DenseDataGridInternalProbe
                    fallbackFontSize={fallbackFontSize}
                    gridRoot={gridRoot}
                    headerProbe={probeProps.headerProbe}
                    onMetricsChange={reportMeasuredMetrics}
                    rowProbe={probeProps.rowProbe}
                    textVerticalPadding={resolvedDense.textVerticalPadding}
                />
            ) : null}
            <DataGridPro
                {...dataGridProps}
                {...resolvedHeightProps}
                ref={probeProps ? setGridRoot : undefined}
                density={resolvedDense.density}
                sx={createDenseDataGridSx(props.sx)}
            />
        </div>
    );
}
