import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';

describe('rac page', () => {
    it('mounts the RAC entrypoint into the host page', async () => {
        document.body.innerHTML = '<div id="app"></div>';

        await import('./main');

        await expect
            .element(page.getByRole('heading', { name: 'Table and tree comparison' }))
            .toBeInTheDocument();
        await expect.element(page.getByText('React Aria Components')).toBeVisible();
        await expect
            .element(
                page.getByText(/The RAC experiment now mounts a plain table and a plain tree side-by-side/),
            )
            .toBeVisible();
        await expect.element(page.getByRole('heading', { name: 'Major airports' })).toBeVisible();
        await expect.element(page.getByRole('heading', { name: 'Consumer vehicles' })).toBeVisible();
        await expect.element(page.getByLabelText('Major airports')).toBeVisible();
        await expect
            .element(page.getByText('Hartsfield-Jackson Atlanta International Airport'))
            .toBeVisible();
        await expect.element(page.getByText('Heathrow Airport')).toBeVisible();
        await expect.element(page.getByText('Toyota')).toBeVisible();
        await expect.element(page.getByText('Camry')).toBeVisible();
    });
});
