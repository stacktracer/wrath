import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';

describe('rac page', () => {
    it('mounts the RAC entrypoint into the host page', async () => {
        document.body.innerHTML = '<div id="app"></div>';

        await import('./main');

        await expect.element(page.getByRole('heading', { name: 'React Aria scaffold' })).toBeInTheDocument();
        await expect.element(page.getByText('React Aria Components')).toBeVisible();
        await expect
            .element(page.getByText(/Build RAC-specific implementation work in this experiment area\./))
            .toBeVisible();
        await expect
            .element(
                page.getByText(
                    'Start in src/rac/ and keep experiment-specific styles in src/rac/styles.css.',
                ),
            )
            .toBeVisible();
    });
});
