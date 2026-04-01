# 02. Theme Aliasing And Literals

## Disposition

**Materially overlapping with `07-rules-for-intentional-literals.md`; merged there and not pursued as a separate track.**

## Why

`src/rac/styles/themes.css` does mix alias-backed values with raw literals, but that is not a separate contract problem from the broader literal-policy question.

The theme file is already the leaf mapping layer in the current stack:

- `alias.css` owns raw palette, scale, radius, shadow, and font primitives
- `semantic.css` owns shared UI roles
- `themes.css` maps those roles to light/dark values

In that position, some literals are expected. The specific examples here are mostly leaf theme values such as:

- white / near-white surfaces
- dark/light text inversions
- translucent overlays and borders
- shadow values

Those are the same sort of “should this remain literal?” decisions that the dedicated intentional-literals track is meant to classify across the whole RAC styling surface. Splitting them out here would duplicate the same benchmark question without adding a different ownership boundary.

## Benchmark / Result

- result: merged into the broader literal-policy track
- files relied on: [`src/rac/styles/alias.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/alias.css), [`src/rac/styles/semantic.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/semantic.css), [`src/rac/styles/themes.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/themes.css)
- benchmark impact: no separate delta beyond the existing Step 1 baseline
- supported question that remains: which literals should stay literal by policy, regardless of whether they appear in theme, document, or component CSS

## Dependency Classification

No new external RAC dependency was identified for this track.

The relevant contracts are repo-local layering conventions:

- `alias.css` and `semantic.css` are internal implementation layers
- `themes.css` is a repo-local theme mapping layer
- `data-theme` is the carrier convention for theme selection, already covered in the Step 1 baseline

## Scope Narrowed

This track stops here. Any follow-up about theme literals should be handled in the merged literal-policy findings, not as a separate theme-aliasing issue.
