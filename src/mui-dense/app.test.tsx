import { treeItemClasses } from '@mui/x-tree-view';
import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';

function requireElement(selector: string) {
    const element = document.querySelector(selector);

    if (!(element instanceof HTMLElement)) {
        throw new Error(`Expected element for selector: ${selector}`);
    }

    return element;
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

function requireGridColumnHeader(field: string) {
    const header = document.querySelector<HTMLElement>(`[role="columnheader"][data-field="${field}"]`);

    if (!(header instanceof HTMLElement)) {
        throw new Error(`Expected grid column header for field: ${field}`);
    }

    return header;
}

function requireInput(id: string) {
    const element = document.getElementById(id);

    if (!(element instanceof HTMLInputElement)) {
        throw new Error(`Expected input with id: ${id}`);
    }

    return element;
}

function requireLabeledControlInput(labelText: string) {
    const control = Array.from(document.querySelectorAll<HTMLElement>('.MuiFormControlLabel-root')).find(
        candidate => candidate.textContent?.trim() === labelText,
    );

    if (!control) {
        throw new Error(`Expected labeled control: ${labelText}`);
    }

    const input = control.querySelector('input');

    if (!(input instanceof HTMLInputElement)) {
        throw new Error(`Expected input for labeled control: ${labelText}`);
    }

    return input;
}

function requireSliderInputsInDensityCard(titleText: string) {
    const card = requireDensityCard(titleText);
    const inputs = Array.from(card.querySelectorAll('.MuiSlider-root input')).filter(
        (candidate): candidate is HTMLInputElement => candidate instanceof HTMLInputElement,
    );

    if (inputs.length === 0) {
        throw new Error(`Expected slider inputs for density control card: ${titleText}`);
    }

    return inputs;
}

function requireDensityCard(titleText: string) {
    const card = Array.from(document.querySelectorAll<HTMLElement>('.mui-dense-density-card')).find(
        candidate => candidate.textContent?.includes(titleText),
    );

    if (!(card instanceof HTMLElement)) {
        throw new Error(`Expected density control card: ${titleText}`);
    }

    return card;
}

function requireTextButton(labelText: string) {
    const button = Array.from(document.querySelectorAll('button')).find(
        candidate => candidate.textContent?.trim() === labelText,
    );

    if (!(button instanceof HTMLButtonElement)) {
        throw new Error(`Expected button: ${labelText}`);
    }

    return button;
}

function requireDemoCard(titleText: string) {
    const card = Array.from(document.querySelectorAll<HTMLElement>('.mui-dense-demo')).find(candidate => {
        const heading = candidate.querySelector('h3');

        return heading?.textContent?.trim() === titleText;
    });

    if (!(card instanceof HTMLElement)) {
        throw new Error(`Expected demo card: ${titleText}`);
    }

    return card;
}

function requireTreeItemContent(labelText: string) {
    const label = Array.from(document.querySelectorAll<HTMLElement>(`.${treeItemClasses.label}`)).find(
        candidate => candidate.textContent?.trim() === labelText,
    );

    if (!label) {
        throw new Error(`Expected tree label: ${labelText}`);
    }

    const content = label.closest(`.${treeItemClasses.content}`);

    if (!(content instanceof HTMLElement)) {
        throw new Error(`Expected tree item content for label: ${labelText}`);
    }

    return content;
}

function readPx(element: Element, property: string) {
    return Number.parseFloat(window.getComputedStyle(element).getPropertyValue(property));
}

async function nextFrame() {
    await new Promise<void>(resolve => {
        window.requestAnimationFrame(() => {
            resolve();
        });
    });
}

async function clickAdvancedControl(labelText: string) {
    const control = Array.from(
        document.querySelectorAll<HTMLElement>('.mui-dense-advanced-card .MuiFormControlLabel-root'),
    ).find(candidate => candidate.textContent?.trim() === labelText);

    if (!control) {
        throw new Error(`Expected advanced control: ${labelText}`);
    }

    control.click();
    await nextFrame();
}

describe('mui-dense page', () => {
    it('mounts the MUI dense gallery entrypoint', async () => {
        await page.viewport(1600, 900);
        document.body.innerHTML = '<div id="app"></div>';

        await import('./main');

        await expect
            .element(page.getByRole('heading', { level: 1, name: 'MUI Dense Gallery' }))
            .toBeVisible();
        await expect.element(page.getByRole('heading', { level: 2, name: /^UI Controls$/ })).toBeVisible();
        await expect
            .element(page.getByRole('heading', { level: 2, name: /^Advanced Density Controls$/ }))
            .toBeVisible();
        await expect.element(page.getByRole('complementary', { name: 'UI controls sidebar' })).toBeVisible();
        await expect.element(page.getByRole('main')).toBeVisible();
        await expect.element(page.getByText('MUI X Pro license')).toBeVisible();
        await expect.element(page.getByRole('heading', { level: 3, name: 'Tree views' })).toBeVisible();
        await expect.element(page.getByText('No advanced overrides are active.')).toBeVisible();

        const appRoot = requireElement('.mui-dense-app');
        const colorModeCard = requireDensityCard('Color Mode');
        const densityPresetCard = requireDensityCard('Density Preset');
        const spacingBaseCard = requireDensityCard('Spacing Base');
        const darkModeInput = requireLabeledControlInput('Dark mode');

        expect(document.body.textContent).not.toContain('Preset:');
        expect(colorModeCard.getBoundingClientRect().top).toBeLessThan(
            spacingBaseCard.getBoundingClientRect().top,
        );
        expect(densityPresetCard.getBoundingClientRect().top).toBeLessThan(
            spacingBaseCard.getBoundingClientRect().top,
        );
        expect(darkModeInput.checked).toBe(false);
        darkModeInput.click();
        await nextFrame();
        expect(appRoot.getAttribute('data-mui-dense-color-mode')).toBe('dark');

        await page.getByRole('button', { exact: true, name: 'Dense' }).click();
        await nextFrame();
        await new Promise<void>(resolve => {
            window.setTimeout(() => {
                resolve();
            }, 250);
        });

        const showHeaderFiltersInput = requireLabeledControlInput('Show header filters');
        const [layoutScaleSlider] = requireSliderInputsInDensityCard('Layout Scale');
        const [typographyScaleSlider] = requireSliderInputsInDensityCard('Typography Scale');
        const imageTileSliders = requireSliderInputsInDensityCard('Image Tiles');
        const dataGridSliders = requireSliderInputsInDensityCard('Data Grid Pro');
        const [dataGridHeaderFilterHeightSlider] = dataGridSliders;
        const [treeIndentationSlider] = requireSliderInputsInDensityCard('Tree View');
        const choiceInputsCard = requireDemoCard('Choice inputs');
        const filledInput = requireInput('mui-dense-filled-input');
        const filledInputRoot = filledInput.closest('.MuiInputBase-root');
        const laneGridCell = requireGridCell('lane', 'ATL to LHR');
        const laneGridCellContent = laneGridCell.firstElementChild;
        const laneGridHeader = requireGridColumnHeader('lane');
        const laneGridHeaderTitleContainer = laneGridHeader.querySelector(
            '.MuiDataGrid-columnHeaderTitleContainer',
        );
        const laneGridHeaderTitleContainerContent = laneGridHeader.querySelector(
            '.MuiDataGrid-columnHeaderTitleContainerContent',
        );
        const laneGridHeaderContent =
            laneGridHeaderTitleContainerContent?.querySelector(':scope > *') ?? null;
        const dashboardTitleLabel = Array.from(document.querySelectorAll('label')).find(
            candidate => candidate.textContent?.trim() === 'Dashboard title',
        );
        const imagesCard = requireDemoCard('Images');
        const imageList = imagesCard.querySelector('.MuiImageList-root');
        const firstImageTile = imageList?.querySelector('.MuiImageListItem-root');
        const firstImage = firstImageTile?.querySelector('img');
        const filledLabel = requireElement('label[for="mui-dense-filled-input"]');
        const standardLabel = requireElement('label[for="mui-dense-standard-input"]');
        const denseOutlinedLabel = requireElement('label[for="mui-dense-outlined-input"]');
        const denseOutlinedInput = requireInput('mui-dense-outlined-input');
        const denseOutlinedInputRoot = denseOutlinedInput.closest('.MuiInputBase-root');
        const nativeSelectLabel = requireElement('label[for="mui-dense-native-select"]');
        const routeClusterLabel = Array.from(document.querySelectorAll('label')).find(
            candidate => candidate.textContent?.trim() === 'Route cluster',
        );
        const speedDialShell = requireDemoCard('Speed dial').querySelector('.mui-dense-speed-dial-shell');
        const densityPresetLabel = requireElement('#mui-dense-select-label');

        expect(showHeaderFiltersInput.checked).toBe(false);
        expect(Number(layoutScaleSlider.value)).toBe(0.2);
        expect(Number(typographyScaleSlider.value)).toBe(1);
        expect(imageTileSliders).toHaveLength(1);
        expect(Number(imageTileSliders[0].value)).toBe(4);
        expect(dataGridSliders).toHaveLength(1);
        expect(Number(dataGridHeaderFilterHeightSlider.value)).toBe(52);
        expect(dataGridHeaderFilterHeightSlider.disabled).toBe(true);
        expect(Number(treeIndentationSlider.value)).toBe(12);
        expect(window.getComputedStyle(choiceInputsCard).rowGap).toBe('8px');
        expect(window.getComputedStyle(choiceInputsCard).backgroundColor).toBe('rgb(0, 0, 0)');
        expect(window.getComputedStyle(choiceInputsCard).borderTopLeftRadius).toBe('4px');
        expect(appRoot.getAttribute('data-mui-dense-color-mode')).toBe('dark');
        expect(colorModeCard.textContent).toContain('Mode: Dark');
        await expect.element(page.getByText('Row height: 30px (auto)')).toBeVisible();
        await expect.element(page.getByText('Column header height: 30px (auto)')).toBeVisible();
        expect(dashboardTitleLabel).toBeInstanceOf(HTMLLabelElement);
        expect(imageList).toBeInstanceOf(HTMLElement);
        expect(firstImageTile).toBeInstanceOf(HTMLElement);
        expect(firstImage).toBeInstanceOf(HTMLImageElement);
        expect(speedDialShell).toBeInstanceOf(HTMLElement);
        expect(routeClusterLabel).toBeInstanceOf(HTMLLabelElement);
        expect(filledInputRoot).toBeInstanceOf(HTMLElement);
        expect(denseOutlinedInputRoot).toBeInstanceOf(HTMLElement);
        expect(filledLabel.className).toContain('MuiInputLabel-sizeSmall');
        expect(standardLabel.className).toContain('MuiInputLabel-sizeSmall');
        expect(denseOutlinedLabel.className).toContain('MuiInputLabel-sizeSmall');
        expect(nativeSelectLabel.className).toContain('MuiInputLabel-sizeSmall');
        expect(densityPresetLabel.className).toContain('MuiInputLabel-sizeSmall');
        expect(new DOMMatrix(window.getComputedStyle(filledLabel).transform).m41).toBeCloseTo(12);
        expect(new DOMMatrix(window.getComputedStyle(filledLabel).transform).m42).toBeCloseTo(2);
        expect(window.getComputedStyle(nativeSelectLabel).transform).toBe(
            window.getComputedStyle(standardLabel).transform,
        );
        expect(window.getComputedStyle(denseOutlinedLabel).transform).toBe(
            window.getComputedStyle(dashboardTitleLabel as HTMLLabelElement).transform,
        );
        expect(window.getComputedStyle(densityPresetLabel).transform).toBe(
            window.getComputedStyle(routeClusterLabel as HTMLLabelElement).transform,
        );
        expect(
            (denseOutlinedInputRoot as HTMLElement).getBoundingClientRect().top -
                (filledInputRoot as HTMLElement).getBoundingClientRect().bottom,
        ).toBeGreaterThanOrEqual(4);
        expect(window.getComputedStyle(imageList as HTMLElement).overflowY).toBe('visible');
        expect(window.getComputedStyle(firstImageTile as HTMLElement).overflow).toBe('hidden');
        expect(Math.round((firstImage as HTMLImageElement).getBoundingClientRect().height)).toBe(
            Math.round((firstImageTile as HTMLElement).getBoundingClientRect().height),
        );
        expect(laneGridCellContent).toBeInstanceOf(HTMLElement);
        expect(window.getComputedStyle(laneGridCellContent as HTMLElement).display).toBe('flex');
        expect(window.getComputedStyle(laneGridCellContent as HTMLElement).alignItems).toBe('center');
        expect(
            new DOMMatrix(window.getComputedStyle(laneGridCellContent as HTMLElement).transform).m42,
        ).toBeCloseTo(2);
        expect(laneGridHeaderTitleContainer).toBeInstanceOf(HTMLElement);
        expect(laneGridHeaderTitleContainerContent).toBeInstanceOf(HTMLElement);
        expect(laneGridHeaderContent).toBeInstanceOf(HTMLElement);
        expect(window.getComputedStyle(laneGridHeaderContent as HTMLElement).display).toBe('flex');
        expect(window.getComputedStyle(laneGridHeaderContent as HTMLElement).alignItems).toBe('center');
        expect(
            new DOMMatrix(window.getComputedStyle(laneGridHeaderContent as HTMLElement).transform).m42,
        ).toBeCloseTo(2);
        expect(
            Math.round((laneGridHeaderTitleContainerContent as HTMLElement).getBoundingClientRect().height),
        ).toBe(Math.round((laneGridHeaderTitleContainer as HTMLElement).getBoundingClientRect().height));
        expect(window.getComputedStyle(speedDialShell as HTMLElement).overflow).toBe('visible');
        expect(window.getComputedStyle(speedDialShell as HTMLElement).paddingTop).toBe('8px');
        expect(requireLabeledControlInput('Tighten tree item layout and states').checked).toBe(true);
        expect(requireLabeledControlInput('Tighten table cell padding').checked).toBe(true);
        expect(requireLabeledControlInput('Tighten accordion summary spacing').checked).toBe(true);
        expect(requireLabeledControlInput('Tighten menu and list rows').checked).toBe(true);
        expect(requireLabeledControlInput('Tighten input root and text padding').checked).toBe(true);
        expect(requireLabeledControlInput('Tighten icon button box size').checked).toBe(true);
        expect(requireLabeledControlInput('Tighten button and chip padding').checked).toBe(true);
        expect(requireTextButton('Dense').className).toContain('MuiButton-contained');
        await expect.element(page.getByText('7 advanced overrides active.')).toBeVisible();

        await page.getByRole('button', { name: 'Dense+' }).click();
        await nextFrame();

        await expect.element(page.getByText('No advanced overrides are active.')).toBeVisible();

        const compactButton = requireElement('[data-testid="mui-dense-compact-button"]');
        const compactChipLabel = requireElement('[data-testid="mui-dense-compact-chip"] .MuiChip-label');
        const compactIconButton = requireElement('[data-testid="mui-dense-compact-icon-button"]');
        const outlinedInput = requireInput('mui-dense-outlined-input');
        const outlinedLabel = requireElement('label[for="mui-dense-outlined-input"]');
        const treeItemContent = requireTreeItemContent('Control room');

        const buttonPaddingBefore = readPx(compactButton, 'padding-left');
        const chipPaddingBefore = readPx(compactChipLabel, 'padding-left');
        await clickAdvancedControl('Tighten button and chip padding');
        expect(readPx(compactButton, 'padding-left')).toBeLessThanOrEqual(buttonPaddingBefore);
        expect(readPx(compactButton, 'padding-top')).toBeGreaterThan(readPx(compactButton, 'padding-bottom'));
        expect(readPx(compactChipLabel, 'padding-left')).toBeLessThan(chipPaddingBefore);
        expect(window.getComputedStyle(compactChipLabel).display).toBe('flex');
        await clickAdvancedControl('Tighten button and chip padding');

        const iconButtonPaddingBefore = readPx(compactIconButton, 'padding-top');
        await clickAdvancedControl('Tighten icon button box size');
        expect(readPx(compactIconButton, 'padding-top')).toBeLessThan(iconButtonPaddingBefore);
        await clickAdvancedControl('Tighten icon button box size');

        const outlinedInputPaddingBefore = readPx(outlinedInput, 'padding-top');
        const outlinedInputFontSizeBefore = readPx(outlinedInput, 'font-size');
        await clickAdvancedControl('Tighten input root and text padding');
        const outlinedInputPaddingAfter = readPx(outlinedInput, 'padding-top');
        const outlinedInputFontSizeAfter = readPx(outlinedInput, 'font-size');
        const outlinedLabelRect = outlinedLabel.getBoundingClientRect();
        const outlinedInputRect = outlinedInput.getBoundingClientRect();
        expect(outlinedInputPaddingAfter).toBeLessThan(outlinedInputPaddingBefore);
        expect(outlinedInputFontSizeAfter).toBeLessThanOrEqual(outlinedInputFontSizeBefore);
        expect(outlinedLabelRect.bottom).toBeLessThanOrEqual(
            outlinedInputRect.top + outlinedInputPaddingAfter,
        );
        await clickAdvancedControl('Tighten input root and text padding');

        const treePaddingBefore = readPx(treeItemContent, 'padding-left');
        const treeGapBefore = readPx(treeItemContent, 'gap');
        await clickAdvancedControl('Tighten tree item layout and states');
        expect(readPx(treeItemContent, 'padding-left')).toBeLessThan(treePaddingBefore);
        expect(readPx(treeItemContent, 'gap')).toBeLessThanOrEqual(treeGapBefore);

        await page.getByText('Compact Data Grid toolbar and quick filter').click();

        expect(requireTextButton('Dense+').className).toContain('MuiButton-contained');
        await expect.element(page.getByText('2 advanced overrides active.')).toBeVisible();

        await nextFrame();

        const sidebarScroller = document.querySelector('.mui-dense-sidebar__scroller');
        const mainPane = document.querySelector('.mui-dense-main');

        expect(sidebarScroller).toBeInstanceOf(HTMLElement);
        expect(mainPane).toBeInstanceOf(HTMLElement);

        const sidebar = sidebarScroller as HTMLElement;
        const main = mainPane as HTMLElement;

        expect(document.documentElement.scrollHeight).toBeLessThanOrEqual(window.innerHeight + 1);
        expect(window.getComputedStyle(sidebar).overflowY).toBe('auto');
        expect(window.getComputedStyle(main).overflowY).toBe('auto');
        expect(sidebar.scrollHeight).toBeGreaterThanOrEqual(sidebar.clientHeight);
        expect(main.scrollHeight).toBeGreaterThanOrEqual(main.clientHeight);

        sidebar.scrollTop = 160;
        main.scrollTop = 320;

        await nextFrame();

        if (sidebar.scrollHeight > sidebar.clientHeight) {
            expect(sidebar.scrollTop).toBeGreaterThan(0);
        } else {
            expect(sidebar.scrollTop).toBe(0);
        }
        if (main.scrollHeight > main.clientHeight) {
            expect(main.scrollTop).toBeGreaterThan(0);
        } else {
            expect(main.scrollTop).toBe(0);
        }
        expect(document.documentElement.scrollTop).toBe(0);
    });
});
