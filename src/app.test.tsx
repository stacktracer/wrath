import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from './app';

describe('App', () => {
    it('renders the tree shell with the default expanded branch', () => {
        render(<App />);

        expect(screen.getByRole('heading', { name: 'Wrath' })).toBeTruthy();
        expect(screen.getByRole('treegrid', { name: 'Project tree' })).toBeTruthy();
        expect(screen.getByText('Workspace')).toBeTruthy();
        expect(screen.getByText('Archive')).toBeTruthy();
    });

    it('renders the file table', () => {
        render(<App />);

        expect(screen.getAllByRole('columnheader', { name: 'Modified' }).length).toBeGreaterThan(0);
        expect(screen.getAllByText('2 KB').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Yesterday').length).toBeGreaterThan(0);
    });
});
