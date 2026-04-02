# MUI Dense, Plan04

Use Set 3 from `mui-dense/plan02/knobs.md` to add a second layer of live density controls to the `src/mui-dense/` hodgepodge page.

This plan is explicitly for the gray-area mechanisms that are still documented or semi-documented, but that depend on slot names, utility classes, or implementation-shaped styling hooks.

## Goal

Add an "Advanced Density Controls" layer for Set 3 knobs so we can evaluate how much extra density MUI yields before we drop into clearly unsupported internals.

## Constraints

- Stay within Set 3 from `plan02/knobs.md`.
- Do not use Set 2 mechanisms from `plan05`, including undocumented descendants, generated class names, or private MUI internals.
- Keep Set 3 controls visually and conceptually separate from the simpler Set 1 controls.
- Make it obvious in the UI and docs that these controls are more fragile than the Set 1 controls.
- Compose Set 3 on top of the existing `plan03` Set 1 controls rather than replacing them.

## Controls To Add

Add a distinct "Advanced Density Controls" section with its own reset path.

This section should clearly state that its controls apply on top of the current Set 1 density state. Resetting the advanced section should reset only Set 3 state, not the simpler Set 1 controls or presets.

### Theme Override Controls

Drive supported slot-aware overrides through `theme.components.*.styleOverrides`.

Use `variants` only if a control naturally maps to an existing public prop combination already present on the page. Do not invent new experiment-only variants just to carry Set 3 density rules.

Add representative controls for:

- button and chip padding / minimum height
- icon button box size
- input root padding and input text padding
- menu item and list item button row height
- accordion summary spacing
- table cell vertical and horizontal padding

### Utility-Class and Slot-Based Controls

Use only documented utility classes, `classes`, `slotProps`, and state hooks.

Add representative controls for:

- Data Grid Pro cell padding and header padding using `MuiDataGrid` overrides and documented grid utility classes
- Data Grid Pro toolbar and quick-filter compaction through documented slot props
- Tree item content height, label spacing, and state-specific tweaks using `MuiTreeItem` overrides, `treeItemClasses`, and documented `data-*` attributes

## Implementation Notes

- Keep the implementation isolated to `src/mui-dense/`.
- Keep Set 1 and Set 3 state separate, but derive the rendered theme and per-demo props from both in one place so the composition order is explicit.
- Apply Set 1 first, then layer Set 3 overrides on top as additive compaction deltas or toggles.
- Prefer a single place that derives Set 3 overrides from control state, instead of scattering ad hoc inline selectors through the page.
- Where a control depends on a specific slot or utility class, label it in code and in the UI so the mechanism is obvious.
- Every advanced control should have at least one current demo where the effect is clearly visible at normal browser zoom. If a knob does not produce a clear visible effect on an existing demo, either skip it or add a tiny local target in the same card that makes the effect obvious.
- Do not silently upgrade a Set 3 control into a Set 2 selector. If a desired control needs undocumented descendants, defer it to `plan05`.

## Verification

- Extend tests to cover rendering of the advanced controls and at least one advanced-control state change.
- Run:
    - `npm run format`
    - `npm run lint`
    - `npm run test`
    - `npm run build`

## Completion Notes

Record execution notes in `exec.md` and final status in `outcome.md`.

If any candidate Set 3 knobs were skipped, record them in `outcome.md` with a short reason for each skip.

## Amendment: Scroll-Separated Controls Side Panel

Rework the density-lab page layout so the knob controls live in a side panel that can be scrolled separately from the component gallery.

Treat this as a layout and control-surface amendment to the combined Set 1 + Set 3 density lab, not as a new density mechanism.

Specifically:

- move the full density-control surface into the side panel, not just the Set 3 controls
- keep Set 1 and Set 3 visually separated within that panel, with their current reset semantics unchanged
- make the side panel independently scrollable from the component gallery so long control lists do not force the user to lose their place in the demos
- keep the main component gallery scroll behavior natural and uninterrupted
- preserve the current wide-screen reflow benefits for the gallery area after the control panel is moved aside
- on narrower screens, fall back to a stacked or otherwise practical layout instead of forcing an unusably narrow sidebar
- keep the implementation local to `src/mui-dense/`

Implementation notes for this amendment:

- prefer a straightforward page-shell layout over a new abstraction
- keep the control panel usable at typical desktop heights; assume it may need its own `overflow-y`
- do not merge Set 1 and Set 3 state or reset behavior just because the controls share one sidebar
- preserve the existing warning and explanatory text that clarifies the Set 3 layer is more fragile

Verification additions for this amendment:

- extend tests to confirm the side-panel layout still renders both Set 1 and Set 3 control headings
- keep the existing interaction test coverage for at least one Set 1 control and one Set 3 control

## Amendment: Independently Scrollable Gallery Pane

Refine the side-panel layout so the component gallery itself also has its own scroll container on wider screens.

This amendment tightens the previous side-panel work: the goal is not just for the controls to scroll separately, but for the gallery pane to be scrollable without moving the knobs.

Specifically:

- on wider screens, make the control sidebar and the component-gallery pane separate vertical scroll regions
- keep the AppBar outside those scroll regions so the page still has a stable top frame
- preserve the current Set 1 and Set 3 control behavior and visual separation
- keep the wide-screen gallery reflow behavior inside the independently scrollable gallery pane
- on narrower screens, fall back to the simpler stacked page flow rather than forcing nested scrolling in cramped layouts

Implementation notes for this amendment:

- prefer a simple two-column workspace with an `aside` and a `main` pane over a more abstract layout system
- if viewport-height math is needed, anchor it to the existing page shell rather than hard-coding fragile assumptions in multiple places
- avoid making the whole page body the primary scroll surface on desktop once the independent panes are active

Verification additions for this amendment:

- extend tests to confirm the sidebar still renders and that the gallery pane remains mounted
- keep the existing Set 1 and Set 3 interaction checks

## Amendment: Fix Reversed "Tighten" Controls

The current implementation surfaced a composition bug: several Set 3 controls labeled `Tighten ...` can make the active UI less dense when layered on top of the current Set 1 state.

Treat this as an implementation correction to `plan04`, not as evidence that these knobs should be reclassified.

Specifically:

- fix the controls currently labeled:
    - `Tighten button and chip padding`
    - `Tighten icon button box size`
    - `Tighten input root and text padding`
    - `Tighten tree item layout and states`
- ensure each of those controls produces an equal-or-denser result than the same page state with that control off
- preserve the existing Set 1 + Set 3 composition model; the fix is to make Set 3 compaction relative to the active baseline, not to remove the layering model

Implementation notes for this amendment:

- do not hard-code absolute compaction values that can become larger than the active Set 1 baseline
- derive these Set 3 overrides from the active Set 1 density state or the already-derived baseline theme so the control direction stays correct under `Default`, `Dense`, and `Dense+`
- prefer additive negative deltas or conditional reductions over replacement values that ignore the current component size, typography scale, or tree indentation
- for text-entry components, preserve the label/input geometry contract; the fix must not cause floating-label overlap or enlarge input text when the control is enabled
- for tree-view compaction, ensure the control does not increase effective row spacing or indentation relative to the current Set 1 tree state
- if a candidate Set 3 control cannot be made directionally correct with documented or semi-documented hooks, record that in `outcome.md` and defer the knob to `plan05` rather than keeping a misleading toggle

Verification additions for this amendment:

- extend tests beyond state changes and assert at least one style or geometry delta for each corrected `Tighten` control
- for each corrected control, verify the enabled state does not increase the targeted spacing metric relative to the disabled state under at least one dense preset
- keep the existing Set 1 and Set 3 rendering and interaction coverage
