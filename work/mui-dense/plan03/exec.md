# Plan03 Execution Log

## Result

`plan03` was completed successfully.

Before starting the implementation, the previously added `plan04` Set 3 work was stashed so `plan03` could be executed cleanly on top of the baseline page.

The `mui-dense` experiment now includes a public "Density Controls" panel that drives supported Set 1 density changes through:

- `createTheme({ spacing, typography })`
- `theme.components.*.defaultProps`
- direct supported props on `ImageList`, `DataGridPro`, and the Tree View demos

The implementation lives in:

- [`src/mui-dense/app.tsx`](../../../src/mui-dense/app.tsx)
- [`src/mui-dense/styles/index.css`](../../../src/mui-dense/styles/index.css)
- [`src/mui-dense/app.test.tsx`](../../../src/mui-dense/app.test.tsx)
- [`vite.config.ts`](../../../vite.config.ts)
- [`README.md`](../../../README.md)

The later wide-screen amendment was also completed as part of `plan03`:

- on viewports wider than 1800px, the main shell now drops the fixed `xl` cap so the page can use the available browser width
- the hodgepodge gallery switches to a slightly narrower minimum card width at that breakpoint so more demo cards can sit side by side on ultra-wide layouts
- the existing narrower-screen and mobile behavior remains unchanged

## Verification

The following commands completed successfully after the implementation:

- `npm run format`
- `npm run lint`
- `npm run test`
- `npm run build`

## Notes

- The density controls are intentionally limited to public Set 1 surfaces. They do not use slot-targeted overrides, utility-class selectors, or other Set 3 mechanisms.
- Browser tests again needed `@mui/material/styles` in `optimizeDeps.include` in [`vite.config.ts`](../../../vite.config.ts) because the new ThemeProvider import otherwise triggered a mid-run dependency re-optimization.
- `npm run test` still logs the expected MUI X missing-license warnings when `VITE_MUI_X_LICENSE_KEY` is unset.
- `npm run test` also logs the existing `GridLegacy` deprecation warning from the baseline gallery.
- `npm run build` still emits Vite's default chunk-size warning for the large `mui-dense` bundle, but the build succeeds.
