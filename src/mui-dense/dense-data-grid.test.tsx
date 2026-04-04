import { type ReactNode, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createRoot, type Root } from 'react-dom/client';
import { page } from 'vitest/browser';
import { afterEach, describe, expect, it } from 'vitest';

import { DenseDataGrid, type DenseDataGridMetrics, DENSE_PRESETS, createDenseTheme } from './lib';

const GRID_COLUMNS = [
    {
        field: 'lane',
        flex: 1,
        headerName: 'Lane',
    },
    {
        field: 'status',
        flex: 1,
        headerName: 'Status',
    },
] as const;

const GRID_ROWS = [
    {
        id: 1,
        lane: 'ATL to LHR',
        status: 'Queued',
    },
    {
        id: 2,
        lane: 'JFK to AMS',
        status: 'Released',
    },
] as const;

let activeRoot: Root | null = null;

function mount(node: ReactNode) {
    document.body.innerHTML = '<div id="test-root"></div>';
    const container = document.getElementById('test-root');

    if (!container) {
        throw new Error('Expected test root container.');
    }

    activeRoot = createRoot(container);
    activeRoot.render(node);
}

function requireMetrics() {
    const metrics = document.querySelector<HTMLOutputElement>('[data-testid="dense-grid-metrics"]');

    if (!metrics || metrics.textContent === null || metrics.textContent === 'pending') {
        throw new Error('Expected DenseDataGrid metrics output.');
    }

    return JSON.parse(metrics.textContent) as DenseDataGridMetrics;
}

function requireGridColumnHeader(field: string) {
    const header = document.querySelector<HTMLElement>(`[role="columnheader"][data-field="${field}"]`);

    if (!(header instanceof HTMLElement)) {
        throw new Error(`Expected grid column header for field: ${field}`);
    }

    return header;
}

async function nextFrame() {
    await new Promise<void>(resolve => {
        requestAnimationFrame(() => {
            resolve();
        });
    });
}

async function waitForMetrics() {
    for (let attempt = 0; attempt < 10; attempt += 1) {
        await nextFrame();

        const metrics = document.querySelector<HTMLOutputElement>('[data-testid="dense-grid-metrics"]');
        if (metrics?.textContent && metrics.textContent !== 'pending') {
            return;
        }
    }

    throw new Error('DenseDataGrid did not publish metrics in time.');
}

function DenseDataGridHarness({ cellBlockPadding }: { cellBlockPadding?: string }) {
    const [metrics, setMetrics] = useState<DenseDataGridMetrics | null>(null);

    return (
        <ThemeProvider theme={createDenseTheme(DENSE_PRESETS.dense, { mode: 'light' })}>
            <div
                style={{
                    height: '360px',
                    width: '720px',
                }}
            >
                <DenseDataGrid
                    dense={
                        cellBlockPadding === undefined
                            ? DENSE_PRESETS.dense.dataGrid
                            : {
                                  ...DENSE_PRESETS.dense.dataGrid,
                                  cellBlockPadding,
                              }
                    }
                    checkboxSelection
                    columns={GRID_COLUMNS}
                    disableRowSelectionOnClick
                    rows={GRID_ROWS}
                    onMetricsChange={setMetrics}
                />
            </div>

            <output data-testid="dense-grid-metrics">{metrics ? JSON.stringify(metrics) : 'pending'}</output>
        </ThemeProvider>
    );
}

afterEach(() => {
    activeRoot?.unmount();
    activeRoot = null;
    document.body.innerHTML = '';
});

describe('mui-dense DenseDataGrid', () => {
    it('publishes measured metrics and applies the default block padding', async () => {
        await page.viewport(1000, 700);
        mount(<DenseDataGridHarness />);

        await expect.element(page.getByRole('grid')).toBeVisible();
        await waitForMetrics();

        const metrics = requireMetrics();
        const laneHeader = requireGridColumnHeader('lane');

        expect(metrics.rowHeight).toBe(30);
        expect(metrics.columnHeaderHeight).toBe(30);
        expect(metrics.devicePixelRatio).toBeGreaterThan(0);
        expect(getComputedStyle(laneHeader).paddingTop).toBe('1px');
        expect(getComputedStyle(laneHeader).paddingBottom).toBe('1px');
    });

    it('supports cap-based block padding for apps that want a text-relative tuning knob', async () => {
        await page.viewport(1000, 700);
        mount(<DenseDataGridHarness cellBlockPadding="0.5cap" />);

        await expect.element(page.getByRole('grid')).toBeVisible();
        await waitForMetrics();

        const metrics = requireMetrics();
        const laneHeader = requireGridColumnHeader('lane');

        expect(metrics.rowHeight).toBeGreaterThan(30);
        expect(metrics.columnHeaderHeight).toBeGreaterThan(30);
        expect(Number.parseFloat(getComputedStyle(laneHeader).paddingTop)).toBeGreaterThan(3);
    });
});
