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

function requireTreeItem(labelText: string) {
    const content = requireTreeItemContent(labelText);
    const treeItem = content.closest('[role="treeitem"]');

    if (!(treeItem instanceof HTMLElement)) {
        throw new Error(`Expected tree item for label: ${labelText}`);
    }

    return treeItem;
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

        const originalMatchMedia = window.matchMedia?.bind(window);
        window.matchMedia = (query: string) => {
            if (query === '(prefers-color-scheme: dark)') {
                return {
                    addEventListener: () => {},
                    addListener: () => {},
                    dispatchEvent: () => false,
                    matches: true,
                    media: query,
                    onchange: null,
                    removeEventListener: () => {},
                    removeListener: () => {},
                };
            }

            if (originalMatchMedia) {
                return originalMatchMedia(query);
            }

            return {
                addEventListener: () => {},
                addListener: () => {},
                dispatchEvent: () => false,
                matches: false,
                media: query,
                onchange: null,
                removeEventListener: () => {},
                removeListener: () => {},
            };
        };

        await import('./main');

        await expect.element(page.getByRole('heading', { level: 1, name: 'MUI Dense' })).toBeVisible();
        await expect
            .element(page.getByRole('heading', { level: 2, name: /^Gallery Controls$/ }))
            .toBeVisible();
        await expect
            .element(page.getByRole('heading', { level: 2, name: /^Advanced Density Controls$/ }))
            .toBeVisible();
        await expect.element(page.getByRole('complementary', { name: 'UI controls sidebar' })).toBeVisible();
        await expect.element(page.getByRole('main')).toBeVisible();
        await expect.element(page.getByText('MUI X Pro license')).toBeVisible();
        await expect.element(page.getByRole('heading', { level: 2, name: 'Tables' })).toBeVisible();
        await expect.element(page.getByRole('heading', { level: 2, name: 'Trees' })).toBeVisible();
        await expect.element(page.getByRole('heading', { level: 3, name: 'SimpleTreeView' })).toBeVisible();

        const appRoot = requireElement('.mui-dense-app');
        const shell = requireElement('.mui-dense-shell');
        const appearanceCard = requireDensityCard('Appearance');
        const densityPresetCard = requireDensityCard('Density Preset');
        const spacingBaseCard = requireDensityCard('Spacing Base');
        const darkModeInput = requireLabeledControlInput('Dark mode');
        const disableAnimationsInput = requireLabeledControlInput('Disable animations');
        const disableGlobalGuttersInput = requireLabeledControlInput('Disable global gutters');

        expect(document.body.textContent).not.toContain('Preset:');
        expect(document.body.textContent).not.toContain('Active advanced overrides');
        expect(document.body.textContent).not.toContain('Tighten Data Grid cells and headers');
        expect(document.body.textContent).not.toContain('Compact Data Grid toolbar and quick filter');
        expect(appearanceCard.getBoundingClientRect().top).toBeLessThan(
            spacingBaseCard.getBoundingClientRect().top,
        );
        expect(densityPresetCard.getBoundingClientRect().top).toBeLessThan(
            spacingBaseCard.getBoundingClientRect().top,
        );
        expect(darkModeInput.checked).toBe(true);
        expect(appRoot.getAttribute('data-mui-dense-color-mode')).toBe('dark');
        expect(disableAnimationsInput.checked).toBe(true);
        expect(disableGlobalGuttersInput.checked).toBe(true);
        expect(window.getComputedStyle(shell).paddingTop).toBe('0px');
        expect(window.getComputedStyle(shell).paddingBottom).toBe('0px');
        darkModeInput.click();
        await nextFrame();
        expect(appRoot.getAttribute('data-mui-dense-color-mode')).toBe('light');
        darkModeInput.click();
        await nextFrame();
        expect(appRoot.getAttribute('data-mui-dense-color-mode')).toBe('dark');
        disableAnimationsInput.click();
        await nextFrame();
        expect(appearanceCard.textContent).toContain('Animations: On');
        disableAnimationsInput.click();
        await nextFrame();
        disableGlobalGuttersInput.click();
        await nextFrame();
        expect(window.getComputedStyle(shell).paddingTop).toBe('0px');
        expect(window.getComputedStyle(shell).paddingBottom).toBe('0px');
        disableGlobalGuttersInput.click();
        await nextFrame();
        expect(window.getComputedStyle(shell).paddingTop).toBe('0px');
        expect(window.getComputedStyle(shell).paddingBottom).toBe('0px');
        requireTextButton('Dense').click();
        await nextFrame();

        const showHeaderFiltersInput = requireLabeledControlInput('Show header filters');
        const [layoutScaleSlider] = requireSliderInputsInDensityCard('Layout Scale');
        const [typographyScaleSlider] = requireSliderInputsInDensityCard('Typography Scale');
        const imageTileSliders = requireSliderInputsInDensityCard('Image Tiles');
        const dataGridDensityCard = requireDensityCard('Data Grid Pro');
        const dataGridContentVerticalPaddingInput = requireInput('mui-dense-grid-content-vertical-padding');
        const [treeIndentationSlider] = requireSliderInputsInDensityCard('Tree View');
        const choiceInputsCard = requireDemoCard('Choice inputs');
        const filledInput = requireInput('mui-dense-filled-input');
        const filledInputRoot = filledInput.closest('.MuiInputBase-root');
        const notesTextarea = document.querySelector('textarea[aria-label="Notes"]');
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
        const cardsAndPapersCard = requireDemoCard('Cards and papers');
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
        const simpleTreeCard = requireDemoCard('SimpleTreeView');
        const richTreeCard = requireDemoCard('RichTreeView');
        const richTreeProCard = requireDemoCard('RichTreeViewPro');
        const richTreeAnalyticsItem = requireTreeItem('Analytics');
        const transitionsCard = requireDemoCard('Transitions');
        const speedDialCard = requireDemoCard('Speed dial');
        const utilityHelpersCard = requireDemoCard('Utility helpers');
        const zoomCard = requireDemoCard('Zoom transition');
        const tableCard = requireDemoCard('Table');
        const dataGridCard = requireDemoCard('DataGridPro');
        const appChromeCard = requireDemoCard('App bar and mobile stepper');
        const appChromeStepper = appChromeCard.querySelector('.MuiMobileStepper-root');
        const portalTargetSurface = utilityHelpersCard.querySelector('.mui-dense-portal-target');
        const pageSnackbar = () => document.body.querySelector('.MuiSnackbar-root');
        const spinnerAnimationToggleButton = requireTextButton('Show spinner');
        const statusCardSpinnerSlot = spinnerAnimationToggleButton.parentElement?.lastElementChild;
        const transitionToggleButton = requireTextButton('Hide elements');
        const zoomToggleButton = requireTextButton('Hide element');
        const inputsSection = requireElement('#inputs');
        const inputsCardTitles = Array.from(
            inputsSection.querySelectorAll<HTMLElement>('.mui-dense-demo__header h3'),
        ).map(candidate => candidate.textContent?.trim());
        const dataDisplaySection = requireElement('#data-display');
        const dataDisplayCardTitles = Array.from(
            dataDisplaySection.querySelectorAll<HTMLElement>('.mui-dense-demo__header h3'),
        ).map(candidate => candidate.textContent?.trim());
        const treesSection = requireElement('#trees');
        const treesCardTitles = Array.from(
            treesSection.querySelectorAll<HTMLElement>('.mui-dense-demo__header h3'),
        ).map(candidate => candidate.textContent?.trim());
        const navigationSection = requireElement('#navigation');
        const navigationCardTitles = Array.from(
            navigationSection.querySelectorAll<HTMLElement>('.mui-dense-demo__header h3'),
        ).map(candidate => candidate.textContent?.trim());
        const layoutSection = requireElement('#layout');
        const layoutCardTitles = Array.from(
            layoutSection.querySelectorAll<HTMLElement>('.mui-dense-demo__header h3'),
        ).map(candidate => candidate.textContent?.trim());
        const overlaysSection = requireElement('#overlays');
        const overlaysCardTitles = Array.from(
            overlaysSection.querySelectorAll<HTMLElement>('.mui-dense-demo__header h3'),
        ).map(candidate => candidate.textContent?.trim());
        const drawersCard = requireDemoCard('Drawers');
        const tablesSection = requireElement('#tables');
        const tableSectionCardTitles = Array.from(
            tablesSection.querySelectorAll<HTMLElement>('.mui-dense-demo__header h3'),
        ).map(candidate => candidate.textContent?.trim());
        const tableContainer = tableCard.querySelector('.MuiTableContainer-root');
        const dataGridRoot = dataGridCard.querySelector('.MuiDataGrid-root');
        const dataGridHeaders = dataGridCard.querySelector('.MuiDataGrid-columnHeaders');

        expect(showHeaderFiltersInput.checked).toBe(false);
        expect(Number(layoutScaleSlider.value)).toBe(0.2);
        expect(Number(typographyScaleSlider.value)).toBe(1);
        expect(imageTileSliders).toHaveLength(1);
        expect(Number(imageTileSliders[0].value)).toBe(4);
        expect(dataGridContentVerticalPaddingInput.value).toBe('1px');
        expect(dataGridDensityCard.textContent).not.toContain('Header filter height:');
        expect(Number(treeIndentationSlider.value)).toBe(12);
        expect(window.getComputedStyle(choiceInputsCard).rowGap).toBe('8px');
        expect(window.getComputedStyle(choiceInputsCard).backgroundColor).toBe('rgb(0, 0, 0)');
        expect(window.getComputedStyle(choiceInputsCard).borderTopLeftRadius).toBe('4px');
        expect(readPx(simpleTreeCard, 'max-width')).toBe(395);
        expect(readPx(richTreeCard, 'max-width')).toBe(395);
        expect(readPx(richTreeProCard, 'max-width')).toBe(395);
        expect(readPx(utilityHelpersCard, 'max-width')).toBe(395);
        expect(readPx(zoomCard, 'max-width')).toBe(395);
        expect(readPx(tableCard, 'max-width')).toBe(667);
        expect(readPx(dataGridCard, 'max-width')).toBe(1111);
        expect(readPx(appChromeCard, 'max-width')).toBe(1000);
        expect(
            Math.abs(
                speedDialCard.getBoundingClientRect().width -
                    cardsAndPapersCard.getBoundingClientRect().width,
            ),
        ).toBeLessThanOrEqual(1);
        expect(
            Math.abs(
                transitionsCard.getBoundingClientRect().width - drawersCard.getBoundingClientRect().width,
            ),
        ).toBeLessThanOrEqual(1);
        expect(inputsCardTitles).toEqual([
            'Selection controls',
            'Text entry',
            'Choice inputs',
            'Action surfaces',
        ]);
        expect(dataDisplayCardTitles).toEqual([
            'Images',
            'Status and feedback visuals',
            'Lists and menu lists',
            'Identity, badges, and chips',
        ]);
        expect(treesCardTitles).toEqual(['RichTreeViewPro', 'RichTreeView', 'SimpleTreeView']);
        expect(navigationCardTitles).toEqual([
            'Steppers',
            'Paging and destination switching',
            'App bar and mobile stepper',
            'Tabs and breadcrumb trails',
        ]);
        expect(layoutCardTitles).toEqual([
            'Cards and papers',
            'Containers and grid systems',
            'Accordion',
            'Scoped baseline',
        ]);
        expect(overlaysCardTitles).toEqual([
            'Speed dial',
            'Transitions',
            'Zoom transition',
            'Dialog',
            'Modal surfaces and transient feedback',
            'Anchored overlays',
            'Drawers',
        ]);
        expect(tableSectionCardTitles).toEqual(['DataGridPro', 'Table']);
        expect(appRoot.getAttribute('data-mui-dense-color-mode')).toBe('dark');
        expect(appearanceCard.textContent).toContain('Mode: Dark');
        expect(appearanceCard.textContent).toContain('Animations: Off');
        await expect.element(page.getByText(/^Row height: .*px \(auto\)$/)).toBeVisible();
        await expect.element(page.getByText(/^Column header height: .*px \(auto\)$/)).toBeVisible();
        expect(dashboardTitleLabel).toBeInstanceOf(HTMLLabelElement);
        expect(imageList).toBeInstanceOf(HTMLElement);
        expect(firstImageTile).toBeInstanceOf(HTMLElement);
        expect(firstImage).toBeInstanceOf(HTMLImageElement);
        expect(speedDialShell).toBeInstanceOf(HTMLElement);
        expect(routeClusterLabel).toBeInstanceOf(HTMLLabelElement);
        expect(filledInputRoot).toBeInstanceOf(HTMLElement);
        expect(notesTextarea).toBeInstanceOf(HTMLTextAreaElement);
        expect(denseOutlinedInputRoot).toBeInstanceOf(HTMLElement);
        expect(statusCardSpinnerSlot).toBeInstanceOf(HTMLElement);
        expect(tableContainer).toBeInstanceOf(HTMLElement);
        expect(dataGridRoot).toBeInstanceOf(HTMLElement);
        expect(dataGridHeaders).toBeInstanceOf(HTMLElement);
        expect(appChromeStepper).toBeInstanceOf(HTMLElement);
        expect(portalTargetSurface).toBeInstanceOf(HTMLElement);
        expect(window.getComputedStyle(filledLabel).transitionDuration).toBe('0s');
        expect(window.getComputedStyle(appChromeStepper as HTMLElement).position).toBe('static');
        expect(window.getComputedStyle(notesTextarea as HTMLTextAreaElement).resize).toBe('vertical');
        expect(window.getComputedStyle(notesTextarea as HTMLTextAreaElement).maxWidth).toBe('100%');
        expect(window.getComputedStyle(portalTargetSurface as HTMLElement).gap).toBe('8px');
        expect(window.getComputedStyle(portalTargetSurface as HTMLElement).flexWrap).toBe('wrap');
        expect(readPx(statusCardSpinnerSlot, 'width')).toBe(40);
        expect(readPx(statusCardSpinnerSlot, 'height')).toBe(40);
        expect((statusCardSpinnerSlot as HTMLElement).querySelector('[role="progressbar"]')).toBeNull();
        expect(window.getComputedStyle(dataGridRoot as HTMLElement).backgroundColor).toBe(
            window.getComputedStyle(tableContainer as HTMLElement).backgroundColor,
        );
        expect(window.getComputedStyle(dataGridHeaders as HTMLElement).backgroundColor).toBe(
            window.getComputedStyle(tableContainer as HTMLElement).backgroundColor,
        );
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
        expect(
            Math.abs(
                (notesTextarea as HTMLTextAreaElement).getBoundingClientRect().width -
                    (filledInputRoot as HTMLElement).getBoundingClientRect().width,
            ),
        ).toBeLessThanOrEqual(2);
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
        expect(utilityHelpersCard.textContent).toContain(
            'Portal renders a child into a different DOM container.',
        );
        expect(utilityHelpersCard.textContent).toContain(
            'NoSsr skips server-side rendering and only mounts its children in the browser.',
        );
        expect(utilityHelpersCard.textContent).toContain(
            'TrapFocus keeps keyboard focus inside the small region below while it is open.',
        );
        expect(pageSnackbar()).toBeNull();
        expect(richTreeAnalyticsItem.getAttribute('aria-expanded')).toBe('true');
        const spinnerSlotRectBefore = (statusCardSpinnerSlot as HTMLElement).getBoundingClientRect();
        spinnerAnimationToggleButton.click();
        await nextFrame();
        const statusCardSpinner = (statusCardSpinnerSlot as HTMLElement).querySelector(
            '[role="progressbar"]',
        );
        const statusCardSpinnerCircle = statusCardSpinner?.querySelector('.MuiCircularProgress-circle');
        expect(requireTextButton('Hide spinner')).toBeInstanceOf(HTMLButtonElement);
        expect(statusCardSpinner).toBeInstanceOf(HTMLElement);
        expect(statusCardSpinnerCircle).toBeInstanceOf(SVGCircleElement);
        expect(window.getComputedStyle(statusCardSpinner as HTMLElement).animationDuration).toBe('1.4s');
        expect(window.getComputedStyle(statusCardSpinner as HTMLElement).animationIterationCount).toBe(
            'infinite',
        );
        expect(window.getComputedStyle(statusCardSpinnerCircle as SVGCircleElement).animationDuration).toBe(
            '1.4s',
        );
        const spinnerSlotRectAfterShow = (statusCardSpinnerSlot as HTMLElement).getBoundingClientRect();
        expect(Math.abs(spinnerSlotRectAfterShow.width - spinnerSlotRectBefore.width)).toBeLessThanOrEqual(1);
        expect(Math.abs(spinnerSlotRectAfterShow.height - spinnerSlotRectBefore.height)).toBeLessThanOrEqual(
            1,
        );
        requireTextButton('Hide spinner').click();
        await nextFrame();
        expect(requireTextButton('Show spinner')).toBeInstanceOf(HTMLButtonElement);
        expect((statusCardSpinnerSlot as HTMLElement).querySelector('[role="progressbar"]')).toBeNull();
        const spinnerSlotRectAfterHide = (statusCardSpinnerSlot as HTMLElement).getBoundingClientRect();
        expect(Math.abs(spinnerSlotRectAfterHide.width - spinnerSlotRectBefore.width)).toBeLessThanOrEqual(1);
        expect(Math.abs(spinnerSlotRectAfterHide.height - spinnerSlotRectBefore.height)).toBeLessThanOrEqual(
            1,
        );
        await page.getByRole('button', { name: 'Open snackbar' }).click();
        await nextFrame();
        expect(pageSnackbar()).toBeInstanceOf(HTMLElement);
        expect(pageSnackbar()?.textContent).toContain('Background poller connected');
        transitionToggleButton.click();
        await nextFrame();
        expect(requireTextButton('Show elements')).toBeInstanceOf(HTMLButtonElement);
        requireTextButton('Show elements').click();
        await nextFrame();
        expect(requireTextButton('Hide elements')).toBeInstanceOf(HTMLButtonElement);
        zoomToggleButton.click();
        await nextFrame();
        expect(requireTextButton('Show element')).toBeInstanceOf(HTMLButtonElement);
        requireTextButton('Show element').click();
        await nextFrame();
        expect(requireTextButton('Hide element')).toBeInstanceOf(HTMLButtonElement);
        expect(requireTextButton('Open trapped-focus region')).toBeInstanceOf(HTMLButtonElement);

        await page.getByRole('button', { name: 'Dense+' }).click();
        await nextFrame();

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

        expect(requireTextButton('Dense+').className).toContain('MuiButton-contained');

        await nextFrame();

        const sidebarScroller = document.querySelector('.mui-dense-sidebar__scroller');
        const mainPane = document.querySelector('.mui-dense-main');

        expect(sidebarScroller).toBeInstanceOf(HTMLElement);
        expect(mainPane).toBeInstanceOf(HTMLElement);

        const sidebar = sidebarScroller as HTMLElement;
        const main = mainPane as HTMLElement;

        expect(document.documentElement.scrollHeight).toBeLessThanOrEqual(window.innerHeight + 1);
        expect(Math.abs(sidebar.getBoundingClientRect().top - main.getBoundingClientRect().top)).toBeLessThan(
            2,
        );
        expect(sidebar.getBoundingClientRect().left).toBeGreaterThan(main.getBoundingClientRect().left);
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

        await page.getByRole('button', { name: 'Show backdrop' }).click();
        await nextFrame();

        const backdropSpinner = document.body.querySelector('.MuiBackdrop-root [role="progressbar"]');
        const backdropSpinnerCircle = backdropSpinner?.querySelector('.MuiCircularProgress-circle');

        expect(backdropSpinner).toBeInstanceOf(HTMLElement);
        expect(backdropSpinnerCircle).toBeInstanceOf(SVGCircleElement);
        expect(window.getComputedStyle(backdropSpinner as HTMLElement).animationDuration).toBe('1.4s');
        expect(window.getComputedStyle(backdropSpinnerCircle as SVGCircleElement).animationDuration).toBe(
            '1.4s',
        );

        (document.body.querySelector('.MuiBackdrop-root') as HTMLElement | null)?.click();
        await nextFrame();
    });
});
