# Plan03 Execution Backlog

## Change Set 1: Separate Component Styles From Gallery Shell

Goal:

- create a durable non-gallery component-style entrypoint
- make the gallery/host-shell stylesheet role obvious

Planned edits:

- add `src/rac/styles/components.css`
- rename the current gallery/host-shell stylesheet from `document.css` to `gallery.css`
- update `src/rac/styles/index.css` so it imports `components.css` plus `gallery.css`
- update any local references, tests, and docs

Expected public-surface delta:

- add one supported local import surface: `components.css`
- remove the misleading implication that `document.css` is the component contract
- keep `.rac-*` helpers out of the component-style entrypoint

Verification:

- non-gallery browser harness uses `components.css`
- same-page host fragment remains unaffected by component-only import
- gallery still renders correctly through `index.css`

## Change Set 2: Clarify Baseline Theme And Density Ownership

Goal:

- make semantic vs density ownership unambiguous
- give default-portaled overlays a stable baseline theme

Planned edits:

- keep baseline geometry in `semantic.css`
- reduce `density.css` to compact-only overrides
- move light theme defaults to `:root` while preserving subtree dark overrides

Expected public-surface delta:

- no new public tokens
- explicit root default for theme baseline
- explicit compact-only density override contract

Verification:

- browser harness shows default component styling without a theme wrapper
- nested dark/compact subtree still overrides as expected
- default-portaled overlays retain root defaults
- custom portal containers still preserve subtree-specific overrides

## Change Set 3: Lock The Contract In Tests And Docs

Goal:

- make the accepted import, carrier, selector, and literal policy durable

Planned edits:

- update `src/rac/customization-contract.test.tsx` to use the accepted durable entrypoint and accepted portal contract
- update root `README.md`
- add source-adjacent RAC style guidance under `src/rac/styles/`
- record the final outcome in `work/rac-css-structure/plan03/outcome.md`

Expected public-surface delta:

- no new runtime styling surface
- clearer author guidance

Verification:

- `npm run format`
- `npm run lint`
- `npm run test`
- `npm run build`
