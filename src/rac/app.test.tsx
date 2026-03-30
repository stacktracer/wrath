import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';

describe('rac page', () => {
    it('mounts the RAC entrypoint into the host page', async () => {
        document.body.innerHTML = '<div id="app"></div>';

        await import('./main');

        await expect
            .element(page.getByRole('heading', { name: 'RAC Gallery and CSS Structure' }))
            .toBeInTheDocument();
        await expect.element(page.getByText('Nested dark compact island')).toBeVisible();
        await expect
            .element(page.getByText(/long-lived plain-CSS structure for React Aria Components/i))
            .toBeVisible();
        await expect.element(page.getByLabelText('Major airports')).toBeVisible();
        await expect.element(page.getByLabelText('Service tree')).toBeVisible();
        await expect.element(page.getByLabelText('Shipment lanes')).toBeVisible();
        await expect.element(page.getByText('Drop manifest bundle or paste it here')).toBeVisible();
        await expect.element(page.getByText('Queued insert position')).toBeVisible();
        await expect.element(page.getByText('Layout audit preview')).toBeVisible();
        await expect.element(page.getByText('Slotting report ready')).toBeVisible();
    });
});
