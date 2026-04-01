import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';

describe('mui-dense page', () => {
    it('mounts the MUI dense gallery entrypoint', async () => {
        document.body.innerHTML = '<div id="app"></div>';

        await import('./main');

        await expect
            .element(page.getByRole('heading', { level: 1, name: 'MUI Dense Hodgepodge' }))
            .toBeVisible();
        await expect.element(page.getByText('MUI X Pro license')).toBeVisible();
        await expect.element(page.getByRole('heading', { level: 3, name: 'Tree views' })).toBeVisible();
    });
});
