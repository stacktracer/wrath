import { describe, expect, it } from 'vitest';

import { DEFAULT_DENSE_SETTINGS, createDenseTheme } from './lib';
import { GALLERY_DENSE_PRESETS, adaptGalleryControlsToDenseSettings } from './gallery-dense';

const DENSE_SETTINGS = adaptGalleryControlsToDenseSettings(GALLERY_DENSE_PRESETS.dense);

describe('mui-dense public theme builder', () => {
    it('turns off transition timing and ripples when animations are disabled', () => {
        const theme = createDenseTheme(DENSE_SETTINGS, { mode: 'dark' });

        expect(theme.transitions.create(['opacity'])).toBe('none');
        expect(theme.transitions.duration.standard).toBe(0);
        expect(theme.transitions.easing.easeInOut).toBe('linear');
        expect(theme.palette.mode).toBe('dark');
        expect(theme.components?.MuiButtonBase?.defaultProps).toMatchObject({
            disableRipple: true,
        });
        expect(theme.components?.MuiCssBaseline?.styleOverrides).toBeDefined();
        expect(theme.components?.MuiCircularProgress?.styleOverrides).toBeDefined();
    });

    it('leaves the normal motion system intact when animations stay enabled', () => {
        const theme = createDenseTheme(DEFAULT_DENSE_SETTINGS, { mode: 'light' });

        expect(theme.transitions.duration.standard).toBeGreaterThan(0);
        expect(theme.palette.mode).toBe('light');
        expect(theme.components?.MuiButtonBase?.defaultProps).toMatchObject({
            disableRipple: false,
        });
        expect(theme.components?.MuiCssBaseline).toBeUndefined();
        expect(theme.components?.MuiCircularProgress).toBeUndefined();
    });

    it('applies the dense feature preset through the same top-level builder apps would call', () => {
        const theme = createDenseTheme(DENSE_SETTINGS, { mode: 'dark' });
        const inputLabelOverride = theme.components?.MuiInputLabel?.styleOverrides?.root as
            | ((args: {
                  ownerState: {
                      size?: 'small' | 'medium';
                      shrink?: boolean;
                      variant?: 'standard' | 'filled' | 'outlined';
                  };
              }) => { transform?: string })
            | undefined;

        expect(theme.components?.MuiButton?.styleOverrides?.containedSizeMedium).toMatchObject({
            padding: '7px 12px 3px',
        });
        expect(theme.components?.MuiButton?.styleOverrides?.containedSizeSmall).toMatchObject({
            padding: '4px 8px 0px',
        });
        expect(theme.components?.MuiButton?.styleOverrides?.outlinedSizeSmall).toMatchObject({
            padding: '4px 7px 0px',
        });
        expect(theme.components?.MuiChip?.styleOverrides?.label).toMatchObject({
            transform: 'translateY(1.5px)',
        });
        expect(theme.components?.MuiChip?.styleOverrides?.labelSmall).toMatchObject({
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
