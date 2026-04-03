import { describe, expect, it } from 'vitest';

import { DENSE_ADVANCED_DENSITY_CONTROLS, DENSITY_PRESETS } from './density-controls';
import { createAdvancedDensityThemeOptions, createDensityTheme } from './density-theme';

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

describe('mui-dense advanced theme options', () => {
    it('nudges compact button and chip labels slightly downward', () => {
        const options = createAdvancedDensityThemeOptions(DENSE_ADVANCED_DENSITY_CONTROLS);
        const inputLabelOverride = options.components?.MuiInputLabel?.styleOverrides?.root as
            | ((args: {
                  ownerState: {
                      size?: 'small' | 'medium';
                      shrink?: boolean;
                      variant?: 'standard' | 'filled' | 'outlined';
                  };
              }) => { transform?: string })
            | undefined;

        expect(options.components?.MuiButton?.styleOverrides?.containedSizeMedium).toMatchObject({
            padding: '7px 12px 3px',
        });
        expect(options.components?.MuiButton?.styleOverrides?.containedSizeSmall).toMatchObject({
            padding: '4px 8px 0px',
        });
        expect(options.components?.MuiButton?.styleOverrides?.outlinedSizeSmall).toMatchObject({
            padding: '4px 7px 0px',
        });
        expect(options.components?.MuiChip?.styleOverrides?.label).toMatchObject({
            transform: 'translateY(1.5px)',
        });
        expect(options.components?.MuiChip?.styleOverrides?.labelSmall).toMatchObject({
            transform: 'translateY(1.5px)',
        });
        expect(
            inputLabelOverride?.({ ownerState: { shrink: false, size: 'small', variant: 'outlined' } }),
        ).toMatchObject({
            transform: 'translate(14px, 6px) scale(1)',
        });
        expect(
            inputLabelOverride?.({ ownerState: { shrink: false, size: 'small', variant: 'filled' } }),
        ).toMatchObject({
            transform: 'translate(12px, 11px) scale(1)',
        });
    });
});
