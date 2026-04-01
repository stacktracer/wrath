# 01 Semantic-Density Boundary

## Disposition

Real, not empty, and not worth merging into the raw-literal track.

There is some overlap with `04-literals-in-component-files.md`, but it is not material enough to merge. That track is about value leakage inside component files. This track is about whether the semantic layer and the density layer have a clear ownership split. The current problem exists even if every component file were perfectly tokenized.

## Why This Matters

`src/rac/styles/semantic.css` currently defines the baseline control and layout geometry:

- `--focus-ring-width`
- `--focus-ring-offset`
- `--control-radius`
- `--control-gap`
- `--control-padding-inline`
- `--control-padding-block`
- `--space-layout-1`
- `--space-layout-2`
- `--space-layout-3`

`src/rac/styles/density.css` then restates the same comfortable values under `[data-density='comfortable']` and only changes them for `[data-density='compact']`.

That means the current boundary is ambiguous in practice:

- `semantic.css` looks like a source of defaults, but `density.css` also defines defaults.
- `density.css` looks like a delta layer, but it also repeats the non-delta values.
- coherent spacing retunes require touching two files for the same geometry knobs.

The result is not broken CSS. It is a blurry ownership model that makes future tuning harder to trust.

## Benchmark Impact

Fixed result template:

- result
- files touched or relied on
- markup changes required
- selector-weight increase required
- private-token dependency
- concrete observable

| benchmark task                                                        | result             | files touched or relied on                                                                                                   | markup changes required                             | selector-weight increase required | private-token dependency | concrete observable                                                                                                                                                            |
| --------------------------------------------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | --------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tighten spacing and control sizing coherently across several families | works with caveats | `src/rac/styles/semantic.css`, `src/rac/styles/density.css`, plus families that consume `--control-*` and `--space-layout-*` | no                                                  | no                                | no                       | the shared geometry knobs are centralized, but the comfortable defaults are duplicated across two token layers                                                                 |
| Apply a subtree theme or density override to one contained region     | works              | `src/rac/styles/density.css`, `src/rac/app.tsx`                                                                              | yes, for the carrier wrapper                        | no                                | no                       | nested `data-density` still changes control spacing as expected                                                                                                                |
| Decide the baseline non-gallery theme and density carrier contract    | works with caveats | `src/rac/app.tsx`, `src/rac/styles/themes.css`, `src/rac/styles/density.css`                                                 | yes, in practice the app author must place carriers | no                                | no                       | the current app uses explicit `data-theme` and `data-density`, but the docs do not yet explain whether the semantic layer or density layer owns the baseline geometry contract |

## Dependency Classification

These dependencies are relevant to this issue:

| artifact                                                        | source                                                                              | stability             | support level                      | scope / owner               | public override status        |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------- | ---------------------------------- | --------------------------- | ----------------------------- |
| `data-density`                                                  | repo-local convention in `src/rac/app.tsx` and `src/rac/styles/density.css`         | repo-local convention | internal implementation dependency | app shell and density layer | not a public override surface |
| `--control-gap`                                                 | repo-local token in `src/rac/styles/semantic.css` and `src/rac/styles/density.css`  | repo-local convention | internal implementation dependency | control spacing             | not a public override surface |
| `--control-padding-inline`                                      | repo-local token in `src/rac/styles/semantic.css` and `src/rac/styles/density.css`  | repo-local convention | internal implementation dependency | control geometry            | not a public override surface |
| `--control-padding-block`                                       | repo-local token in `src/rac/styles/semantic.css` and `src/rac/styles/density.css`  | repo-local convention | internal implementation dependency | control geometry            | not a public override surface |
| `--space-layout-1/2/3`                                          | repo-local tokens in `src/rac/styles/semantic.css` and `src/rac/styles/density.css` | repo-local convention | internal implementation dependency | layout spacing              | not a public override surface |
| `--focus-ring-width`, `--focus-ring-offset`, `--control-radius` | repo-local semantic tokens in `src/rac/styles/semantic.css`                         | repo-local convention | internal implementation dependency | cross-family geometry       | not a public override surface |

## Concrete Improvement Direction

The cleanest fix is to make one layer own the baseline and the other layer own only the delta.

Preferred direction:

- keep `semantic.css` as the single baseline for shared control and layout geometry
- keep `density.css` as the density override layer, with `compact` as the only meaningful alternate mode
- stop restating the comfortable values in `density.css` unless they are needed as an explicit compatibility bridge
- document the baseline geometry contract so future authors know where to tune a shared spacing change

That would preserve the current plain-CSS architecture, keep `compact` as the only public density mode, and reduce the cognitive load of deciding where a spacing change belongs.

## What Should Not Change

- Do not introduce wrapper components or a utility layer to solve this.
- Do not widen the public override surface beyond the existing semantic tokens unless later findings justify it.
- Do not remove subtree density support; the problem is ownership clarity, not the existence of density overrides.
- Do not move the concern into `document.css`; this is a token-layer issue, not a host-shell issue.

## Files Likely Affected

- `src/rac/styles/semantic.css`
- `src/rac/styles/density.css`
- possibly `src/rac/app.tsx` if the carrier contract or documentation text needs to match the final ownership split
