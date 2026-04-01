import './styles/components.css';

import { type ReactNode, type Ref, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import {
    Button,
    ColorArea,
    ColorField,
    ColorPicker,
    ColorSlider,
    ColorThumb,
    Dialog,
    DialogTrigger,
    DropIndicator,
    DropIndicatorContext,
    FieldError,
    Input,
    Label,
    ListBox,
    ListBoxItem,
    OverlayArrow,
    Popover,
    SelectionIndicator,
    SliderTrack,
    TextField,
    parseColor,
} from 'react-aria-components';
import { page } from 'vitest/browser';
import { afterEach, describe, expect, it } from 'vitest';

let activeRoot: Root | null = null;

function nextFrame() {
    return new Promise<void>(resolve => {
        requestAnimationFrame(() => resolve());
    });
}

function mount(node: ReactNode) {
    document.body.innerHTML = '<div id="test-root"></div>';
    const container = document.getElementById('test-root');

    if (!container) {
        throw new Error('Expected test root container.');
    }

    activeRoot = createRoot(container);
    activeRoot.render(node);
}

function injectConsumerOverride(cssText: string) {
    const style = document.createElement('style');
    style.dataset.testOverride = 'true';
    style.textContent = cssText;
    document.head.append(style);
    return style;
}

function HarnessShell({ children }: { children: ReactNode }) {
    return (
        <>
            <div>Plain host fragment</div>
            <div data-test-root="">{children}</div>
        </>
    );
}

function PortalFixture() {
    const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null);

    return (
        <div data-test-root="" data-theme="dark" data-density="compact">
            <DialogTrigger defaultOpen>
                <Button>Open default portal</Button>
                <Popover isNonModal>
                    <OverlayArrow>
                        <svg aria-hidden="true" viewBox="0 0 12 12">
                            <path d="M0 0h12v12H0z" />
                        </svg>
                    </OverlayArrow>
                    <Dialog aria-label="Default portal dialog">Default portal dialog</Dialog>
                </Popover>
            </DialogTrigger>

            <div
                data-portal-sandbox=""
                ref={node => {
                    if (node) {
                        setPortalContainer(current => current ?? node);
                    }
                }}
            />

            {portalContainer ? (
                <DialogTrigger defaultOpen>
                    <Button>Open custom portal</Button>
                    <Popover isNonModal UNSTABLE_portalContainer={portalContainer}>
                        <OverlayArrow>
                            <svg aria-hidden="true" viewBox="0 0 12 12">
                                <path d="M0 0h12v12H0z" />
                            </svg>
                        </OverlayArrow>
                        <Dialog aria-label="Custom portal dialog">Custom portal dialog</Dialog>
                    </Popover>
                </DialogTrigger>
            ) : null}
        </div>
    );
}

function StaticDropIndicatorDemo() {
    return (
        <DropIndicatorContext.Provider
            value={{
                render: (_props, ref) => (
                    <div
                        className="react-aria-DropIndicator"
                        data-drop-target="true"
                        ref={ref as Ref<HTMLDivElement>}
                    >
                        Queued insert position
                    </div>
                ),
            }}
        >
            <DropIndicator target={{ type: 'root' }} />
        </DropIndicatorContext.Provider>
    );
}

function ProviderAndScaffoldFixture() {
    return (
        <div data-test-root="">
            <ListBox
                aria-label="Sentinel selection list"
                defaultSelectedKeys={['selected-item']}
                selectionMode="single"
            >
                <ListBoxItem id="selected-item" textValue="Selected item">
                    <SelectionIndicator>•</SelectionIndicator>
                    <span>Selected item</span>
                </ListBoxItem>
            </ListBox>

            <ColorPicker defaultValue={parseColor('#4f7cff')}>
                <ColorArea
                    aria-label="Saturation and brightness"
                    colorSpace="hsb"
                    xChannel="saturation"
                    yChannel="brightness"
                >
                    <ColorThumb />
                </ColorArea>

                <ColorSlider aria-label="Hue" channel="hue" colorSpace="hsb">
                    <SliderTrack>
                        <ColorThumb />
                    </SliderTrack>
                </ColorSlider>

                <ColorField>
                    <Label>Hex</Label>
                    <Input />
                </ColorField>
            </ColorPicker>

            <StaticDropIndicatorDemo />
        </div>
    );
}

afterEach(() => {
    activeRoot?.unmount();
    activeRoot = null;
    document.body.innerHTML = '';
    document.head.querySelectorAll('[data-test-override]').forEach(node => node.remove());
});

describe('rac customization contract harness', () => {
    it('uses the component-only entrypoint without host-shell leakage and allows post-import token overrides', async () => {
        mount(
            <HarnessShell>
                <Button data-tone="accent">Promote token</Button>
            </HarnessShell>,
        );

        await expect.element(page.getByRole('button', { name: 'Promote token' })).toBeVisible();

        expect(getComputedStyle(document.body).backgroundImage).toBe('none');

        const button = document.querySelector('.react-aria-Button');
        if (!(button instanceof HTMLElement)) {
            throw new Error('Expected button element in harness.');
        }

        expect(getComputedStyle(button).paddingLeft).toBe('12px');
        expect(getComputedStyle(button).backgroundColor).not.toBe('rgba(0, 0, 0, 0)');

        injectConsumerOverride(
            `
                [data-test-root] {
                    --control-padding-inline: var(--space-5);
                }
            `,
        );
        await nextFrame();

        expect(getComputedStyle(button).paddingLeft).toBe('20px');
    });

    it('supports nested theme and density carriers without gallery scaffolding', async () => {
        mount(
            <HarnessShell>
                <Button>Outer button</Button>
                <div data-theme="dark" data-density="compact">
                    <Button>Inner button</Button>
                </div>
            </HarnessShell>,
        );

        await expect.element(page.getByRole('button', { name: 'Outer button' })).toBeVisible();
        await expect.element(page.getByRole('button', { name: 'Inner button' })).toBeVisible();

        const buttons = Array.from(document.querySelectorAll('.react-aria-Button'));
        const [outerButton, innerButton] = buttons;

        if (!(outerButton instanceof HTMLElement) || !(innerButton instanceof HTMLElement)) {
            throw new Error('Expected outer and inner buttons.');
        }

        expect(getComputedStyle(outerButton).paddingLeft).toBe('12px');
        expect(getComputedStyle(innerButton).paddingLeft).toBe('8px');
        expect(getComputedStyle(outerButton).backgroundColor).not.toBe(
            getComputedStyle(innerButton).backgroundColor,
        );
    });

    it('keeps root defaults on default-portaled overlays and preserves subtree overrides via custom portal containers', async () => {
        mount(<PortalFixture />);

        await expect.element(page.getByRole('dialog', { name: 'Default portal dialog' })).toBeVisible();
        await expect.element(page.getByRole('dialog', { name: 'Custom portal dialog' })).toBeVisible();

        const defaultDialog = document.querySelector('[aria-label="Default portal dialog"]');
        const customDialog = document.querySelector('[aria-label="Custom portal dialog"]');

        const defaultPopover = defaultDialog?.closest('.react-aria-Popover');
        const customPopover = customDialog?.closest('.react-aria-Popover');

        if (!(defaultPopover instanceof HTMLElement) || !(customPopover instanceof HTMLElement)) {
            throw new Error('Expected default and custom popovers.');
        }

        expect(defaultPopover.closest('[data-test-root]')).toBeNull();
        expect(customPopover.closest('[data-test-root]')).not.toBeNull();
        expect(getComputedStyle(defaultPopover).getPropertyValue('--surface-overlay').trim()).not.toBe('');
        expect(getComputedStyle(customPopover).getPropertyValue('--surface-overlay').trim()).not.toBe('');
        expect(getComputedStyle(defaultPopover).backgroundColor).not.toBe(
            getComputedStyle(customPopover).backgroundColor,
        );
    });

    it('renders provider-only and scaffold-dependent sentinel surfaces in a minimal fixture', async () => {
        mount(<ProviderAndScaffoldFixture />);

        await expect.element(page.getByRole('listbox', { name: 'Sentinel selection list' })).toBeVisible();
        await expect.element(page.getByRole('group', { name: /Saturation and brightness/i })).toBeVisible();
        await expect.element(page.getByRole('textbox', { name: 'Hex' })).toBeVisible();
        await expect.element(page.getByText('Queued insert position')).toBeVisible();

        const selectedItem = document.querySelector('.react-aria-ListBoxItem[data-selected]');
        const dropIndicator = document.querySelector('.react-aria-DropIndicator[data-drop-target]');
        const colorArea = document.querySelector('.react-aria-ColorArea');

        expect(selectedItem).not.toBeNull();
        expect(dropIndicator).not.toBeNull();
        expect(colorArea).not.toBeNull();
    });

    it('keeps invalid field styling distinct from the default field state', async () => {
        mount(
            <div data-test-root="">
                <TextField>
                    <Label>Normal field</Label>
                    <Input />
                </TextField>
                <TextField isInvalid>
                    <Label>Invalid field</Label>
                    <Input />
                    <FieldError>Validation failed.</FieldError>
                </TextField>
            </div>,
        );

        await expect.element(page.getByLabelText('Normal field')).toBeVisible();
        await expect.element(page.getByLabelText('Invalid field')).toBeVisible();

        const inputs = Array.from(document.querySelectorAll('.react-aria-Input'));
        const [normalField, invalidField] = inputs;

        if (!(normalField instanceof HTMLElement) || !(invalidField instanceof HTMLElement)) {
            throw new Error('Expected normal and invalid field inputs.');
        }

        const normalBorder = getComputedStyle(normalField).borderColor;
        const invalidBorder = getComputedStyle(invalidField).borderColor;

        expect(normalBorder).not.toBe(invalidBorder);
    });
});
