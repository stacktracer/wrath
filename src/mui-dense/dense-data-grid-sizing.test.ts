import { describe, expect, it } from 'vitest';

import { createDenseDataGridHeightProps, createDenseDataGridMetrics, snapToDevicePixel } from './lib';

describe('mui-dense data grid sizing helpers', () => {
    it('falls back missing line heights in the intended order', () => {
        expect(
            createDenseDataGridMetrics({
                devicePixelRatio: 1,
                fallbackFontSize: 10,
                textVerticalPaddingPixels: 1,
            }),
        ).toMatchObject({
            columnHeaderHeight: 17,
            devicePixelRatio: 1,
            rowHeight: 17,
        });

        expect(
            createDenseDataGridMetrics({
                devicePixelRatio: 1,
                fallbackFontSize: 10,
                row: 18,
                textVerticalPaddingPixels: 1,
            }),
        ).toMatchObject({
            columnHeaderHeight: 20,
            devicePixelRatio: 1,
            rowHeight: 20,
        });
    });

    it('supports separate row and header line heights and snaps them to device pixels', () => {
        const metrics = createDenseDataGridMetrics({
            devicePixelRatio: 1.5,
            header: 21.4,
            row: 19.1,
            textVerticalPaddingPixels: 0.75,
        });

        expect(metrics).toMatchObject({
            columnHeaderHeight: 23.33,
            devicePixelRatio: 1.5,
            rowHeight: 20.67,
        });
        expect(snapToDevicePixel(20.01, 2)).toBe(20.5);
    });

    it('compensates for MUI density factors when creating DataGrid height props', () => {
        const metrics = {
            columnHeaderHeight: 29,
            devicePixelRatio: 1,
            rowHeight: 21,
        };

        expect(createDenseDataGridHeightProps(metrics, 'standard')).toEqual({
            columnHeaderHeight: 29,
            rowHeight: 21,
        });
        expect(createDenseDataGridHeightProps(metrics, 'compact')).toEqual({
            columnHeaderHeight: 42,
            rowHeight: 30,
        });
        expect(createDenseDataGridHeightProps(metrics, 'comfortable')).toEqual({
            columnHeaderHeight: 23,
            rowHeight: 17,
        });
    });
});
