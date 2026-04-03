import { describe, expect, it } from 'vitest';

import { DENSITY_PRESETS } from './density-controls';
import { createDensityTheme } from './density-theme';

describe('mui-dense animation policy', () => {
    it('turns off transition timing and ripples when animations are disabled', () => {
        const theme = createDensityTheme(DENSITY_PRESETS.dense, 'dark', true);

        expect(theme.transitions.create(['opacity'])).toBe('none');
        expect(theme.transitions.duration.standard).toBe(0);
        expect(theme.transitions.easing.easeInOut).toBe('linear');
        expect(theme.components?.MuiButtonBase?.defaultProps).toMatchObject({
            disableRipple: true,
        });
        expect(theme.components?.MuiCssBaseline?.styleOverrides).toBeDefined();
        expect(theme.components?.MuiCircularProgress?.styleOverrides).toBeDefined();
    });

    it('leaves the normal motion system intact when animations stay enabled', () => {
        const theme = createDensityTheme(DENSITY_PRESETS.default, 'light', false);

        expect(theme.transitions.duration.standard).toBeGreaterThan(0);
        expect(theme.components?.MuiButtonBase?.defaultProps).toMatchObject({
            disableRipple: false,
        });
        expect(theme.components?.MuiCssBaseline).toBeUndefined();
        expect(theme.components?.MuiCircularProgress).toBeUndefined();
    });
});
