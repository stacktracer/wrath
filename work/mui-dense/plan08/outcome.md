# MUI Dense, Plan08 Outcome

This pass flattened the app-facing dense settings shape. `DenseSettings` no longer contains nested `theme` and `features` objects; those fields now live directly on `DenseSettings`, alongside `disableAnimations` and the still-nested `dataGrid` settings. That removes the old naming collision where `DenseSettings.theme` was not itself a full MUI `Theme`, and it gives `createDenseTheme()` a cleaner input model.

The theme builder now takes `createDenseTheme(denseSettings, palette)`, where `palette` is ordinary MUI palette options rather than a local light/dark enum. The reusable library no longer exports a color-mode helper. The gallery still keeps a local light/dark toggle because that is a page-level control, but it now turns that into a palette object at the call site instead of passing a library-specific color-mode API through the reusable layer.

The implementation also got less circuitous. `createDenseTheme()` now builds the theme in one pass instead of splitting the work into separate base-theme and feature-theme helpers. The gallery state followed the same flattening: advanced dense overrides now live in the same local dense-controls object as the baseline dense settings, but they still preserve the old preset-selection behavior by not forcing the preset buttons into `custom` when only the advanced overrides change.
