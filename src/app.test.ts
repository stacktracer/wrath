import { beforeEach, describe, expect, it } from 'vitest';

import { renderApp } from './app';

describe('renderApp', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('renders the current application shell', () => {
        const host = document.createElement('div');
        document.body.append(host);

        const shell = renderApp(host);

        expect(shell.className).toBe('app-shell');
        expect(host.querySelector('.app-card')).not.toBeNull();
        expect(host.querySelector('.app-title')?.textContent).toBe('Wrath');
        expect(host.querySelector('.app-copy')?.textContent).toBe(
            'Blueprint and the prototype tree have been removed.',
        );
    });
});
