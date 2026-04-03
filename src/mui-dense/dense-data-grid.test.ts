import { describe, expect, it } from 'vitest';

import { calculateDenseDataGridMetrics, createFallbackDenseDataGridMetrics } from './dense-data-grid';

describe('mui-dense Data Grid metrics', () => {
    it('computes fallback metrics from typography defaults', () => {
        const metrics = createFallbackDenseDataGridMetrics(1, 2);

        expect(metrics).toMatchObject({
            checkboxHeight: 0,
            columnHeaderHeight: 30,
            devicePixelRatio: 2,
            rowHeight: 30,
            textLineHeight: 20.02,
            xHeight: 7.98,
        });
    });

    it('lets checkbox geometry win when it needs more height', () => {
        const metrics = calculateDenseDataGridMetrics({
            checkboxHeight: 20,
            devicePixelRatio: 2,
            textLineHeight: 13,
            xHeight: 6,
        });

        expect(metrics.rowHeight).toBe(26);
        expect(metrics.columnHeaderHeight).toBe(26);
    });

    it('supports tuning overrides for callers that need different chrome allowances', () => {
        const metrics = calculateDenseDataGridMetrics({
            checkboxHeight: 0,
            devicePixelRatio: 1,
            textLineHeight: 12,
            tuning: {
                textPadding: 6,
            },
            xHeight: 5,
        });

        expect(metrics.rowHeight).toBe(23);
    });
});
