import type { RefObject } from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gridClasses } from '@mui/x-data-grid-pro';

import type { AutoDataGridMetrics, DensityControls } from './density-controls';

export type DenseDataGridTuning = {
    checkboxPadding: number;
    fallbackTextLineHeightRatio: number;
    fallbackXHeightRatio: number;
    textPadding: number;
};

type DenseDataGridMeasurement = {
    checkboxHeight: number;
    devicePixelRatio: number;
    textLineHeight: number;
    tuning?: Partial<DenseDataGridTuning>;
    xHeight: number;
};

type UseDenseDataGridMetricsOptions = {
    dataGridDensity: DensityControls['dataGridDensity'];
    typographyScale: number;
    tuning?: Partial<DenseDataGridTuning>;
};

export type DenseDataGridMetricsState = {
    body2ProbeRef: RefObject<HTMLSpanElement | null>;
    exProbeRef: RefObject<HTMLSpanElement | null>;
    formattedColumnHeaderHeight: string;
    formattedRowHeight: string;
    metrics: AutoDataGridMetrics;
    rootRef: RefObject<HTMLDivElement | null>;
};

export const DEFAULT_DENSE_DATA_GRID_TUNING: DenseDataGridTuning = {
    checkboxPadding: 6,
    fallbackTextLineHeightRatio: 1.43,
    fallbackXHeightRatio: 0.57,
    textPadding: 2,
};

function resolveDenseDataGridTuning(tuning: Partial<DenseDataGridTuning> | undefined): DenseDataGridTuning {
    return {
        checkboxPadding: tuning?.checkboxPadding ?? DEFAULT_DENSE_DATA_GRID_TUNING.checkboxPadding,
        fallbackTextLineHeightRatio:
            tuning?.fallbackTextLineHeightRatio ?? DEFAULT_DENSE_DATA_GRID_TUNING.fallbackTextLineHeightRatio,
        fallbackXHeightRatio:
            tuning?.fallbackXHeightRatio ?? DEFAULT_DENSE_DATA_GRID_TUNING.fallbackXHeightRatio,
        textPadding: tuning?.textPadding ?? DEFAULT_DENSE_DATA_GRID_TUNING.textPadding,
    };
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

export function calculateDenseDataGridMetrics({
    checkboxHeight,
    devicePixelRatio,
    textLineHeight,
    tuning,
    xHeight,
}: DenseDataGridMeasurement): AutoDataGridMetrics {
    const resolvedTuning = resolveDenseDataGridTuning(tuning);
    const computedHeight = snapToDevicePixel(
        Math.max(
            textLineHeight + xHeight + resolvedTuning.textPadding,
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

export function createFallbackDenseDataGridMetrics(
    typographyScale: number,
    devicePixelRatio: number,
    tuning?: Partial<DenseDataGridTuning>,
): AutoDataGridMetrics {
    const resolvedTuning = resolveDenseDataGridTuning(tuning);
    const baseBodyFontSize = 14 * typographyScale;

    return calculateDenseDataGridMetrics({
        checkboxHeight: 0,
        devicePixelRatio,
        textLineHeight: baseBodyFontSize * resolvedTuning.fallbackTextLineHeightRatio,
        tuning: resolvedTuning,
        xHeight: baseBodyFontSize * resolvedTuning.fallbackXHeightRatio,
    });
}

export function useDenseDataGridMetrics({
    dataGridDensity,
    typographyScale,
    tuning,
}: UseDenseDataGridMetricsOptions): DenseDataGridMetricsState {
    const [devicePixelRatio, setDevicePixelRatio] = useState(() =>
        typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1,
    );
    const [metrics, setMetrics] = useState<AutoDataGridMetrics>(() =>
        createFallbackDenseDataGridMetrics(
            typographyScale,
            typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1,
            tuning,
        ),
    );
    const rootRef = useRef<HTMLDivElement | null>(null);
    const body2ProbeRef = useRef<HTMLSpanElement | null>(null);
    const exProbeRef = useRef<HTMLSpanElement | null>(null);
    const resolvedTuning = resolveDenseDataGridTuning(tuning);

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
            const fallbackBodyFontSize = 14 * typographyScale;
            const textLineHeight = parsePixelValue(
                computedStyles.lineHeight,
                fallbackBodyFontSize * resolvedTuning.fallbackTextLineHeightRatio,
            );
            const xHeight =
                exProbe.getBoundingClientRect().height ||
                fallbackBodyFontSize * resolvedTuning.fallbackXHeightRatio;
            const checkboxProbe = rootRef.current?.querySelector<HTMLElement>(
                `.${gridClasses.cellCheckbox} .MuiSvgIcon-root, .${gridClasses.columnHeaderCheckbox} .MuiSvgIcon-root`,
            );
            const checkboxHeight = checkboxProbe?.getBoundingClientRect().height ?? 0;
            const nextMetrics = calculateDenseDataGridMetrics({
                checkboxHeight,
                devicePixelRatio,
                textLineHeight,
                tuning: resolvedTuning,
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
        dataGridDensity,
        devicePixelRatio,
        resolvedTuning.checkboxPadding,
        resolvedTuning.fallbackTextLineHeightRatio,
        resolvedTuning.fallbackXHeightRatio,
        resolvedTuning.textPadding,
        typographyScale,
    ]);

    return {
        body2ProbeRef,
        exProbeRef,
        formattedColumnHeaderHeight: `${formatPixelValue(metrics.columnHeaderHeight)}px`,
        formattedRowHeight: `${formatPixelValue(metrics.rowHeight)}px`,
        metrics,
        rootRef,
    };
}
