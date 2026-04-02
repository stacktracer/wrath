# Plan04 Execution Log

## Result

`plan04` was completed successfully on top of the existing `plan03` Set 1 controls.

The `mui-dense` experiment now includes a separate "Advanced Density Controls" panel that composes additive Set 3 compaction on top of the current Set 1 state through:

- `theme.components.*.styleOverrides`
- exported `gridClasses`
- documented Data Grid `slotProps`
- `treeItemClasses` and documented Tree View `data-*` state hooks

The implementation lives in:

- [`src/mui-dense/app.tsx`](../../../src/mui-dense/app.tsx)
- [`src/mui-dense/styles/index.css`](../../../src/mui-dense/styles/index.css)
- [`src/mui-dense/app.test.tsx`](../../../src/mui-dense/app.test.tsx)
- [`README.md`](../../../README.md)

## Verification

The following commands completed successfully after the implementation:

- `npm run format`
- `npm run lint`
- `npm run test`
- `npm run build`

## Notes

- Set 1 and Set 3 state remain separate. The rendered theme is derived in one place so Set 1 is applied first and Set 3 layers on top.
- Resetting the advanced panel clears only Set 3 state and leaves the current Set 1 preset or custom state intact.
- No experiment-only `variants` were introduced. `styleOverrides` were sufficient for the implemented Set 3 controls.
- The later side-panel amendments were also completed: on wider screens, both the Set 1 and Set 3 controls now live in a separately scrollable sidebar, and the component gallery now scrolls in its own adjacent `main` pane instead of using the page body as the primary desktop scroll surface.
- The later `Fix Reversed "Tighten" Controls` amendment was also completed: the button/chip, icon-button, input, and tree compaction toggles now derive from the active Set 1 baseline instead of replacing it with hard-coded values that could reverse direction under `Dense` or `Dense+`.
