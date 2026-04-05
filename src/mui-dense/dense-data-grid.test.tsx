import { type ReactNode, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createRoot, type Root } from 'react-dom/client';
import { gridClasses } from '@mui/x-data-grid-pro';
import { page } from 'vitest/browser';
import { afterEach, describe, expect, it } from 'vitest';

import {
    DenseDataGrid,
    createDenseDataGridMetrics,
    createDenseTheme,
    type DenseDataGridMetrics,
    type DenseDataGridTextProbeDefinition,
} from './lib';
import { GALLERY_DENSE_PRESETS, adaptGalleryControlsToDenseSettings } from './gallery-dense';

const DENSE_SETTINGS = adaptGalleryControlsToDenseSettings(GALLERY_DENSE_PRESETS.dense);

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

function requireGridCell(field: string, cellText?: string) {
    const cells = Array.from(
        document.querySelectorAll<HTMLElement>(`[role="gridcell"][data-field="${field}"]`),
    );
    const cell =
        cellText === undefined
            ? cells[0]
            : cells.find(candidate => candidate.textContent?.trim().includes(cellText));

    if (!(cell instanceof HTMLElement)) {
        throw new Error(`Expected grid cell for field: ${field}`);
    }

    return cell;
}

function requireGridHeaderFilterCell(field: string) {
    const headerFilterCell = document.querySelector<HTMLElement>(
        `[role="columnheader"][data-field="${field}"].${gridClasses['columnHeader--filter']}`,
    );

    if (!(headerFilterCell instanceof HTMLElement)) {
        throw new Error(`Expected header filter cell for field: ${field}`);
    }

    return headerFilterCell;
}

function requireGridCheckboxSlot(selector: string) {
    const checkboxSlot = document.querySelector<HTMLElement>(selector);

    if (!(checkboxSlot instanceof HTMLElement)) {
        throw new Error(`Expected grid checkbox slot for selector: ${selector}`);
    }

    return checkboxSlot;
}

function requireChildElement(parent: ParentNode, selector: string) {
    const element = parent.querySelector(selector);

    if (!(element instanceof HTMLElement)) {
        throw new Error(`Expected child element for selector: ${selector}`);
    }

    return element;
}

function getTextRangeRect(element: HTMLElement) {
    const range = document.createRange();
    range.selectNodeContents(element);

    return range.getBoundingClientRect();
}

function expectHeightClose(actual: number, expected: number) {
    expect(Math.abs(actual - expected)).toBeLessThanOrEqual(1);
}

function expectRectWithin(inner: DOMRect, outer: DOMRect, tolerance = 1.5) {
    expect(inner.top).toBeGreaterThanOrEqual(outer.top - tolerance);
    expect(inner.bottom).toBeLessThanOrEqual(outer.bottom + tolerance);
    expect(inner.left).toBeGreaterThanOrEqual(outer.left - tolerance);
    expect(inner.right).toBeLessThanOrEqual(outer.right + tolerance);
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

function DenseDataGridHarness({
    explicitMetrics,
    headerProbe,
    textVerticalPadding,
    headerFilters = false,
    rowProbe,
}: {
    explicitMetrics?: DenseDataGridMetrics;
    headerProbe?: DenseDataGridTextProbeDefinition;
    textVerticalPadding?: string;
    headerFilters?: boolean;
    rowProbe?: DenseDataGridTextProbeDefinition;
}) {
    const [measuredMetrics, setMeasuredMetrics] = useState<DenseDataGridMetrics | null>(null);
    const metrics = explicitMetrics ?? measuredMetrics;
    const resolvedDense =
        textVerticalPadding === undefined
            ? DENSE_SETTINGS.dataGrid
            : {
                  ...DENSE_SETTINGS.dataGrid,
                  textVerticalPadding,
              };

    return (
        <ThemeProvider theme={createDenseTheme(DENSE_SETTINGS, { mode: 'light' })}>
            <div
                style={{
                    height: '360px',
                    width: '720px',
                }}
            >
                {explicitMetrics === undefined ? (
                    <DenseDataGrid
                        dense={resolvedDense}
                        headerProbe={headerProbe}
                        onMetricsChange={setMeasuredMetrics}
                        rowProbe={rowProbe}
                        checkboxSelection
                        columns={GRID_COLUMNS}
                        disableRowSelectionOnClick
                        headerFilters={headerFilters}
                        rows={GRID_ROWS}
                    />
                ) : (
                    <DenseDataGrid
                        dense={resolvedDense}
                        metrics={metrics}
                        checkboxSelection
                        columns={GRID_COLUMNS}
                        disableRowSelectionOnClick
                        headerFilters={headerFilters}
                        rows={GRID_ROWS}
                    />
                )}
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
    it('aligns the default probe metrics with the DataGrid typography', async () => {
        await page.viewport(1000, 700);
        mount(<DenseDataGridHarness />);

        await expect.element(page.getByRole('grid')).toBeVisible();
        await waitForMetrics();

        const metrics = requireMetrics();
        const laneCell = requireGridCell('lane', 'ATL to LHR');
        const laneHeader = requireGridColumnHeader('lane');

        expect(metrics.rowHeight).toBeGreaterThan(0);
        expect(metrics.columnHeaderHeight).toBeGreaterThan(0);
        expect(metrics.devicePixelRatio).toBeGreaterThan(0);
        expectHeightClose(laneCell.getBoundingClientRect().height, metrics.rowHeight);
        expectHeightClose(laneHeader.getBoundingClientRect().height, metrics.columnHeaderHeight);
    });

    it('lets 0px remove the extra text padding that 1px adds', async () => {
        await page.viewport(1000, 700);
        mount(<DenseDataGridHarness textVerticalPadding="0px" />);

        await expect.element(page.getByRole('grid')).toBeVisible();
        await waitForMetrics();

        const zeroMetrics = requireMetrics();
        const zeroLaneCell = requireGridCell('lane', 'ATL to LHR');
        const zeroLaneHeader = requireGridColumnHeader('lane');
        const zeroLaneHeaderTitle = requireChildElement(zeroLaneHeader, `.${gridClasses.columnHeaderTitle}`);

        expectRectWithin(getTextRangeRect(zeroLaneCell), zeroLaneCell.getBoundingClientRect());
        expectRectWithin(getTextRangeRect(zeroLaneHeaderTitle), zeroLaneHeader.getBoundingClientRect());

        activeRoot?.unmount();
        activeRoot = null;
        document.body.innerHTML = '';

        mount(<DenseDataGridHarness textVerticalPadding="1px" />);

        await expect.element(page.getByRole('grid')).toBeVisible();
        await waitForMetrics();

        const onePixelMetrics = requireMetrics();

        expect(zeroMetrics.rowHeight).toBeLessThan(onePixelMetrics.rowHeight);
        expect(zeroMetrics.columnHeaderHeight).toBeLessThan(onePixelMetrics.columnHeaderHeight);
    });

    it('keeps large text vertical padding inside the rendered slots without clipping content', async () => {
        await page.viewport(1000, 700);
        mount(<DenseDataGridHarness textVerticalPadding="20px" headerFilters />);

        await expect.element(page.getByRole('grid')).toBeVisible();
        await waitForMetrics();

        const metrics = requireMetrics();
        const laneCell = requireGridCell('lane', 'ATL to LHR');
        const laneHeader = requireGridColumnHeader('lane');
        const laneHeaderTitle = requireChildElement(laneHeader, `.${gridClasses.columnHeaderTitle}`);
        const laneHeaderFilterCell = requireGridHeaderFilterCell('lane');
        const laneHeaderFilterInput = requireChildElement(laneHeaderFilterCell, '.MuiInputBase-root');
        const rowCheckboxCell = requireGridCheckboxSlot(`.${gridClasses.cellCheckbox}[role="gridcell"]`);
        const rowCheckboxInput = requireChildElement(rowCheckboxCell, `.${gridClasses.checkboxInput}`);
        const headerCheckboxCell = requireGridCheckboxSlot(`.${gridClasses.columnHeaderCheckbox}`);
        const headerCheckboxInput = requireChildElement(headerCheckboxCell, `.${gridClasses.checkboxInput}`);

        expect(metrics.rowHeight).toBeGreaterThan(30);
        expect(metrics.columnHeaderHeight).toBeGreaterThan(30);
        expectHeightClose(laneCell.getBoundingClientRect().height, metrics.rowHeight);
        expectHeightClose(laneHeader.getBoundingClientRect().height, metrics.columnHeaderHeight);
        expectHeightClose(laneHeaderFilterCell.getBoundingClientRect().height, metrics.columnHeaderHeight);
        expectRectWithin(getTextRangeRect(laneCell), laneCell.getBoundingClientRect());
        expectRectWithin(getTextRangeRect(laneHeaderTitle), laneHeader.getBoundingClientRect());
        expectRectWithin(rowCheckboxInput.getBoundingClientRect(), rowCheckboxCell.getBoundingClientRect());
        expectRectWithin(
            headerCheckboxInput.getBoundingClientRect(),
            headerCheckboxCell.getBoundingClientRect(),
        );
        expectRectWithin(
            laneHeaderFilterInput.getBoundingClientRect(),
            laneHeaderFilterCell.getBoundingClientRect(),
        );
    });

    it('accepts separate row and header metrics without changing the wrapper API again', async () => {
        await page.viewport(1000, 700);
        mount(
            <DenseDataGridHarness
                explicitMetrics={createDenseDataGridMetrics({
                    devicePixelRatio: 1,
                    header: 28,
                    row: 18,
                    textVerticalPaddingPixels: 1,
                })}
            />,
        );

        await expect.element(page.getByRole('grid')).toBeVisible();
        await waitForMetrics();

        const metrics = requireMetrics();
        const laneCell = requireGridCell('lane', 'ATL to LHR');
        const laneHeader = requireGridColumnHeader('lane');

        expect(metrics.columnHeaderHeight).toBeGreaterThan(metrics.rowHeight);
        expectHeightClose(laneCell.getBoundingClientRect().height, metrics.rowHeight);
        expectHeightClose(laneHeader.getBoundingClientRect().height, metrics.columnHeaderHeight);
    });
});
