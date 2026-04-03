# Plan05 Outcome

## First-Pass Scope

`plan05` stayed with the smaller first pass. The work did not try to create a shared cross-experiment density package yet. Instead it cleaned up `src/mui-dense/` into local modules with clearer seams so the experiment is easier to read and the later reuse decision can be made against code that already has named boundaries.

`app.tsx` is now mostly a composition root. Density presets, theme derivation, advanced overrides, Data Grid sizing, gallery shell pieces, and the bulk of the gallery content no longer all live in one file.

## Thin Wrappers

I did not land on introducing thin wrappers around ordinary MUI controls in this pass. The refactor did not surface a convincing repeated `sx` or JSX policy for things like `TextField`, `Button`, or `Select` that would justify freezing a wrapper shape yet. Most of the stable compaction policy still fit more naturally in preset data, theme builders, style overrides, and documented slot props.

The one area that still looks like a plausible wrapper candidate is the Data Grid path. That code has a more distinct behavioral boundary than the rest of the page, and it already wants an API that owns measurement, compact-toolbar slot props, and header/body alignment policy together. If wrappers are added later, a dense Data Grid still looks like the first serious candidate.

## Data Grid Sizing

The main execution question from the plan was whether the Data Grid auto-height logic should be treated as gallery glue or as a real part of the densification API. The refactor landed on the second position. The logic now lives behind an explicit local API in `dense-data-grid.ts` instead of being buried inside the page component, and it already supports a small amount of parameterization rather than hard-coding every measurement constant inline.

That does not prove the current shape is the final reusable API. The measurement path still depends on live DOM probes, current typography geometry, checkbox icon size, and device-pixel snapping. But it is now isolated as a thing a real app could plausibly call, which was the important first step.

## Stability Boundary

The split that emerged is roughly: `density-controls.ts` holds reusable preset and control data, `density-theme.ts` holds reusable MUI-theme policy, `dense-data-grid.ts` holds MUI-X-specific density glue, and the `gallery-*` files hold the shell and demo-only content. That is not a perfect taxonomy, but it is much closer to the stability boundary the plan was aiming for than the old single-file layout.

One useful outcome is that the experiment now makes the couplings more honest. The reusable-looking parts are separated from the page-only parts, and the especially fragile MUI-X behavior is no longer mixed into the same bucket as preset definitions or ordinary theme defaults.

## Tests

The browser test stayed in place as the full-page regression net, but the trickier extracted logic now has direct tests for preset data, animation policy, and Data Grid sizing calculations. That was one of the more important practical wins from the refactor, because it reduces how much future work has to be validated by mounting the entire gallery page.

This still is not the final testing shape. The gallery test is large, and some visually fragile behaviors are still only covered there. But the code is no longer forcing every density question through one browser-heavy test.
