import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { App } from './app';

let host: HTMLDivElement;
let root: Root;

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('App', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        host = document.createElement('div');
        document.body.append(host);
        root = createRoot(host);
    });

    afterEach(() => {
        act(() => {
            root.unmount();
        });
    });

    it('renders the tree shell with the default expanded branch', () => {
        act(() => {
            root.render(<App />);
        });

        expect(host.querySelector('.app-title')?.textContent).toBe('Wrath');
        expect(host.querySelector('.app-tree')).not.toBeNull();
        expect(host.textContent).toContain('Workspace');
        expect(host.textContent).toContain('today.txt');
        expect(host.textContent).toContain('Archive');
    });
});
