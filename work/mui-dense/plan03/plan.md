# MUI Dense, Plan03

Use the Set 1 inventory from `mui-dense/plan02/knobs.md` to add live density controls to the `src/mui-dense/` hodgepodge page using only straightforward public MUI APIs.

Keep this work inside `src/mui-dense/`. Do not introduce shared abstractions unless they clearly pay for themselves within this experiment.

## Goal

Add an on-page controls panel that lets us dynamically adjust the highest-value Set 1 density knobs and immediately inspect the result across the existing hodgepodge page.

## Constraints

- Stay within Set 1 from `plan02/knobs.md`.
- Do not use undocumented DOM selectors, generated class names, or private MUI internals.
- Do not use Set 3 mechanisms like slot-targeted style overrides, utility-class targeting, or slot-level customization except where they are already needed just to render existing MUI components.
- Keep the page usable in `vite dev`; this is an experiment page, not product UI.

## Controls To Add

Add a "Density Controls" section near the top of the page with a reset action and a small set of named presets.

### Presets

Provide at least these presets:

- `Default`: matches the current MUI defaults as closely as practical
- `Dense`: visibly denser than default while staying conservative
- `Dense+`: aggressively denser, still using only Set 1 mechanisms

### Global Set 1 Controls

Drive these through local React state and a derived MUI theme:

- spacing scale
    - apply through `createTheme({ spacing })`
    - provide a small numeric range centered on the current default
- typography scale
    - apply through `createTheme({ typography })`
    - change the base font size and the main body/display variants used on the page
- component family default size
    - fan out through `theme.components.*.defaultProps`
    - cover the families on the current page where `size="small"` is a real supported option
- global gutter toggle
    - use `defaultProps` where possible for families like `Container`

### Page-Level Public Controls

Add controls for the current hodgepodge surface that can be applied without leaving Set 1:

- list density
    - `dense` for list-like components
    - `disablePadding` / `disableGutters` where those props already exist
- toolbar density
    - `variant="dense"`
    - `disableGutters`
- table density
    - `size="small"` for table components
- layout spacing
    - `Stack` and `Grid` spacing used by the hodgepodge page layout
- image tile density
    - `ImageList` gap and row height

### MUI X Public Controls

Add dedicated controls for the existing MUI X demos:

- Data Grid Pro
    - `density`
    - `rowHeight`
    - `columnHeaderHeight`
    - `headerFilterHeight`
- Tree View
    - `itemChildrenIndentation`

## Implementation Notes

- Keep the control state local to the experiment.
- Build one derived theme from the control state and apply it via `ThemeProvider`.
- Prefer `theme.components.*.defaultProps` and ordinary component props over per-instance special cases.
- If a current demo component cannot participate through Set 1 knobs, leave it unchanged in this plan.
- Preserve the current default-styled nature of the experiment outside the density controls themselves.

## Verification

- Update or extend tests so they confirm the controls render and that at least one preset/reset path works.
- Run:
    - `npm run format`
    - `npm run lint`
    - `npm run test`
    - `npm run build`

## Completion Notes

Record execution notes in `exec.md` and final status in `outcome.md`.

## Amendment: Wide-Screen Reflow

Adjust the hodgepodge layout so it makes substantially better use of very wide browser windows, including multi-monitor setups.

Keep this amendment scoped to page layout and card placement, not to component styling. The point is to expose more demos at once on wide screens, while preserving the existing mobile and normal-desktop behavior.

Specifically:

- relax or remove width constraints that prevent the page from using the available browser width
- update the gallery grid so demo cards reflow into more columns on very wide screens instead of leaving large unused margins
- keep cards readable; do not make individual cards so wide that they become harder to scan
- preserve the current single-column or low-column behavior on narrower screens
- keep the implementation local to `src/mui-dense/`

This amendment is feasible and should be treated as part of `plan03`, because it affects the usability of the public-knob density lab rather than introducing a new density mechanism.
