# 06. Document Layer Ownership

## Disposition

**Real issue. Keep as a separate track.**

This is not materially overlapping with the active token or literal tracks:

- `03-component-local-token-boundary.md` is about whether `--_...` belongs at a family boundary.
- `04-literals-in-component-files.md` is about whether a value should stay literal or be promoted into a token layer.
- this track is about which stylesheet owns the host shell, gallery scaffolding, and document baseline.

`03-component-local-token-boundary.md` already points here for `--_card-padding`, which is another sign that the ownership question is distinct rather than duplicated.

## Why This Is A Real Issue

`src/rac/styles/document.css` is doing several different jobs at once:

- pure document baseline lives at the top of the file, including `*`, `html`, `body`, and `#app` rules
- host-shell layout starts at `.rac-app` and `.rac-hero`
- gallery section framing follows with `.rac-hero-grid`, `.rac-section-grid`, and `.rac-gallery-section`
- helper/layout conventions continue with `.rac-stack-*`, `.rac-inline-*`, `.rac-form-*`, `.rac-list-*`, `.rac-collection-*`, and `.rac-toolbar-cluster`
- demo-scaffold concerns also live there, such as `.rac-demo-card`, `.rac-theme-panel`, `.rac-overlay-sandbox`, `.rac-color-picker-shell`, and `.rac-toast-actions`

That makes the ownership boundary hard to explain. A reader cannot tell whether `document.css` is meant to be:

- the durable host-page baseline
- the gallery shell
- a reusable helper layer
- or a temporary demo-scaffolding bucket

The import graph makes the same ambiguity visible. `src/rac/styles/index.css` imports [`document.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/document.css#L1) unconditionally, so any consumer that imports the experiment stylesheet gets the host shell and gallery helpers too. At the same time, the benchmark harness intentionally excludes `document.css`, which proves the non-gallery contract is already being modeled separately in practice.

## Benchmark / Result

- primary benchmark: non-gallery consumer import-boundary behavior, with same-page coexistence against nearby host content
- result: **fails for the durable non-gallery boundary, works only with caveats for the gallery page itself**
- observable: the current gallery renders correctly, but the supported component-style slice is only reachable by explicitly excluding `document.css`
- markup changes required: no for the current gallery, yes if the host shell and helper layer are split into separate ownership buckets
- selector-weight increase required: no
- private-token dependency: yes, via `--_card-padding` in [`document.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/document.css#L88)

## Dependency Classification

- `html`, `body`, `#app` selectors: repo-local host-shell baseline, internal implementation dependency
- `.rac-app`, `.rac-hero`, `.rac-section-*`, `.rac-gallery-section`: gallery-shell ownership, internal implementation dependency
- `.rac-stack-*`, `.rac-inline-*`, `.rac-form-*`, `.rac-list-*`, `.rac-collection-*`, `.rac-toolbar-cluster`: helper-convention dependency, not a supported external contract
- `.rac-demo-card`, `.rac-theme-panel`, `.rac-overlay-sandbox`, `.rac-color-picker-shell`, `.rac-toast-actions`: demo-scaffolding dependency, should stay local unless explicitly promoted
- `--_card-padding`: private component/helper token, internal implementation dependency, not an external override surface
- `data-tone` as used by `.rac-status-pill`: repo-local authored attribute, not a RAC contract

## Supported Question

Should `document.css` remain the intentionally coupled experiment-shell stylesheet for this phase, or should the host baseline and gallery/helper layers be split so the durable non-gallery import path can stay free of demo scaffolding?

## Files Reviewed

- [`src/rac/styles/document.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/document.css)
- [`src/rac/styles/index.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/index.css)
- [`src/rac/main.tsx`](/home/mike/Documents/projects/wrath/code/src/rac/main.tsx)
- [`src/rac/index.html`](/home/mike/Documents/projects/wrath/code/src/rac/index.html)
- [`src/rac/app.tsx`](/home/mike/Documents/projects/wrath/code/src/rac/app.tsx)
- [`src/rac/styles/test/customization-harness.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/test/customization-harness.css)
