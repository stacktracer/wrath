import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { App } from './app';

// RTL would register cleanup automatically if a global afterEach were defined,
// but that's not the case here so we register cleanup explicitly
afterEach(() => {
    cleanup();
});

describe('App', () => {
    it('renders the tree shell with the default expanded branch', () => {
        render(<App />);

        expect(screen.getByRole('heading', { name: 'Wrath' })).toBeTruthy();
        expect(screen.getByRole('treegrid', { name: 'Project tree' })).toBeTruthy();
        expect(screen.getByText('Workspace')).toBeTruthy();
        expect(screen.getByText('Archive')).toBeTruthy();
    });

    it('leaf tree items have no child-items marker; branch items do', () => {
        render(<App />);

        const tree = screen.getByRole('treegrid', { name: 'Project tree' });

        // today.txt is a leaf under Notes, which is expanded by default
        const leafItem = within(tree).getByText('today.txt').closest('.tree-item');
        expect(leafItem?.hasAttribute('data-has-child-items')).toBe(false);

        // Notes is a branch node, expanded by default
        const branchItem = within(tree).getByText('Notes').closest('.tree-item');
        expect(branchItem?.hasAttribute('data-has-child-items')).toBe(true);
    });

    it('renders the file table', () => {
        render(<App />);

        expect(screen.getByRole('columnheader', { name: 'Modified' })).toBeTruthy();
        expect(screen.getByText('2 KB')).toBeTruthy();
        expect(screen.getByText('Yesterday')).toBeTruthy();
    });
});
