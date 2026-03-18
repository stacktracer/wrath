import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from './app';

describe('App', () => {
    it('renders the tree shell with the default expanded branch', () => {
        render(<App />);

        expect(screen.getByRole('heading', { name: 'Wrath' })).toBeTruthy();
        expect(screen.getByRole('treegrid', { name: 'Project tree' })).toBeTruthy();
        expect(screen.getByText('Workspace')).toBeTruthy();
        expect(screen.getByText('today.txt')).toBeTruthy();
        expect(screen.getByText('Archive')).toBeTruthy();
    });
});
