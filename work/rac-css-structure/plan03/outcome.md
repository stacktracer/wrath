# Plan03 Outcome

## Final Status

Plan03 was executed through review, findings, conclusions, and a focused implementation pass.

Implemented outcomes:

- added a durable non-gallery component-style entrypoint at [`src/rac/styles/components.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components.css)
- renamed the old gallery/host-shell stylesheet from `document.css` to [`src/rac/styles/gallery.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/gallery.css)
- changed [`src/rac/styles/index.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/index.css) to import `components.css` plus `gallery.css`
- made the light theme the root default in [`src/rac/styles/themes.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/themes.css)
- reduced [`src/rac/styles/density.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/density.css) to compact-only overrides, leaving the baseline geometry in [`src/rac/styles/semantic.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/semantic.css)
- updated the browser-backed contract harness in [`src/rac/customization-contract.test.tsx`](/home/mike/Documents/projects/wrath/code/src/rac/customization-contract.test.tsx) to use the accepted durable entrypoint and accepted portal/carrier contract
- added durable author guidance in [`src/rac/styles/README.md`](/home/mike/Documents/projects/wrath/code/src/rac/styles/README.md)
- updated [`README.md`](/home/mike/Documents/projects/wrath/code/README.md) and [`work/rac-css-structure/README.md`](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/README.md)

Research artifacts produced:

- [`work/rac-css-structure/plan03/issues.md`](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/plan03/issues.md)
- findings under [`work/rac-css-structure/plan03/findings/`](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/plan03/findings)
- [`work/rac-css-structure/plan03/conclusions.md`](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/plan03/conclusions.md)
- [`work/rac-css-structure/plan03/exec.md`](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/plan03/exec.md)

## Realized Wins

- Non-gallery consumers now have a real component-style import path instead of implicitly importing gallery shell styling.
- The semantic-vs-density split is clearer: baseline geometry lives in `semantic.css`, and `density.css` is only the compact delta.
- Default-portaled overlays now fall back to the root light/comfortable baseline instead of losing all scoped theme tokens.
- Same-page coexistence is mechanically checked with the durable component-only entrypoint rather than a temporary test-only import slice.
- The repo now has explicit guidance for:
    - import boundaries
    - root defaults vs subtree overrides
    - selector and helper-class ownership
    - intentional literals vs private `--_...` tokens

## Deliberate Non-Fixes

These findings were accepted but not turned into broad CSS rewrites in this pass:

- shared-state modeling beyond the already-shared focus ring remains largely family-local
- no new semantic token family was added for selected, hover, disabled, invalid, or danger state formulas
- no scoped-root styling model was introduced
- no broad public family-level override surface was added beyond semantic tokens and documented theme/density carriers

That was intentional. The review found clearer wins in import-boundary clarity and baseline ownership than in a larger state-token refactor.

## Verification

Ran successfully on March 30, 2026:

- `npm run format`
- `npm run lint`
- `npm run test`
- `npm run build`

Residual note:

- the known large RAC experiment bundle warning still appears during `npm run build`

## Deviations From `exec.md`

No material deviation in direction.

The main practical simplification was that the durable component-style entrypoint made the temporary Step 1 test-only CSS slice unnecessary, so the browser harness was updated to import `components.css` directly instead of preserving a separate review-only manifest.

## Follow-Up Questions

- Whether the repo should eventually promote any part of the current family-local state formulas into a shared semantic state surface.
- Whether button `data-tone` should remain a repo-local family convention or be documented more explicitly as a supported family-level override hook.
- Whether any of the remaining source-observed RAC dependencies should be fenced further or replaced if the experiment turns into a long-lived app foundation.
