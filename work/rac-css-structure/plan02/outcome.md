# Plan02 Outcome

## Final Status

- `plan.md` has been executed to a practical first-pass completion.
- `src/rac/` now uses a local `styles/` directory with:
    - `alias.css`
    - `semantic.css`
    - `themes.css`
    - `density.css`
    - `document.css`
    - component-family stylesheets under `styles/components/`
- `src/rac/app.tsx` is now a RAC gallery rather than the old table/tree comparison.
- The gallery renders representative coverage for the visual-surface families in the plan, including:
    - primitives
    - buttons and choice controls
    - fields
    - list/select/menu/tags
    - grid list / table / tree
    - tabs / disclosure / toolbar
    - date and time controls
    - color controls
    - range / meter / progress
    - overlays / drop surfaces / toast
- The overlay gallery was adjusted after first render testing so the page stays interactive:
    - always-open popover/menu demos now use non-modal popovers
    - the modal example is launchable rather than mounted open on load
- `work/rac-css-structure/plan02/exec.md` was kept as the running implementation log.

## Verification

- `npm run format` passed.
- `npm run lint` passed.
- `npm run test` passed.
- `npm run build` passed.

## Unresolved Questions

- The RAC gallery produces a large JS bundle and Vite warns about chunk size. That is acceptable for this experiment page, but if the gallery remains a long-lived part of the repo we should decide later whether to split it by route or lazy-load parts of it.
- `ColorPicker` is still a provider rather than a direct DOM styling target. That is not a blocker, but it is worth remembering when we talk about “coverage” for the color family.
- `DropIndicator` still requires demo-specific scaffolding because RAC does not offer a simple standalone rendering path for it.

## Todo Items

- Decide later whether the gallery should stay as a single eagerly-loaded page or be split if it starts affecting normal experiment ergonomics.
- As real app work begins, pressure-test the current semantic token set and demote anything that turns out not to be genuinely cross-family.
