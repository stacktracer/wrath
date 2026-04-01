# Plan03 Conclusions

## Summary

The current RAC CSS is usable, but its customization surface is harder to reason about than it needs to be. The highest-payoff fixes are not a mass token expansion or a new abstraction layer. They are:

- make the baseline semantic-vs-density split unambiguous
- separate component styles from gallery/host-shell styles
- document a literal policy instead of trying to eliminate literals wholesale
- document the selector/markup contract that the repo is actually relying on

The review does **not** justify moving styling out of `src/rac/`, adding wrapper components, introducing a utility layer, or adding a broad reset.

## Per-Issue Disposition

### Accepted Issues

| issue                             | disposition                                           | decision                                                                                                                         |
| --------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `01` semantic vs density boundary | fix now                                               | `semantic.css` owns baseline shared geometry; `density.css` owns only the compact delta                                          |
| `05` shared state modeling        | document only for now                                 | keep focus ring shared; keep other state formulas family-local until a stronger cross-family state model clearly pays for itself |
| `06` document layer ownership     | fix now                                               | create a durable component-style entrypoint and rename the gallery/host-shell file so ownership is obvious                       |
| `07` intentional literals rule    | fix now, mostly as guidance                           | preserve literals intentionally in the right places; do not mass-tokenize                                                        |
| `08` selector and markup contract | fix now, mostly as guidance plus import-boundary work | explicitly classify RAC roots/state hooks vs repo-local helper classes and authored attributes                                   |

### Rejected Or Downgraded As Standalone Tracks

| issue                               | disposition               | decision                                                                                               |
| ----------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------ |
| `02` theme aliasing and literals    | merged into `07`          | theme literals are part of the general literal-policy question                                         |
| `03` component-local token boundary | merged into `07` and `06` | the real question is when a value deserves a private token, and `--_card-padding` is a gallery concern |
| `04` literals in component files    | merged into `07`          | component literals are evidence for the umbrella policy question                                       |
| `09` motion                         | defer                     | keep the existing small shared motion layer; do not expand the motion surface in this pass             |

## Accepted Contract Decisions

### Token And Density Layering

- `semantic.css` is the baseline shared geometry layer.
- `density.css` is an override layer for `compact` only.
- Comfortable density remains the default baseline and should not be restated in `density.css`.
- No new semantic tokens are justified in this pass.

Representative rewrite:

```css
/* semantic.css */
:root {
    --control-gap: var(--space-2);
    --control-padding-inline: var(--space-3);
    --control-padding-block: calc(var(--space-2) + 1px);
}

/* density.css */
[data-density='compact'] {
    --control-gap: var(--space-1);
    --control-padding-inline: var(--space-2);
    --control-padding-block: var(--space-2);
}
```

### Theme And Carrier Contract

- Light comfortable is the default non-gallery baseline.
- Theme defaults should exist at `:root`, so unscoped consumers and default-portaled overlays have a stable baseline.
- Subtree theme overrides remain selector-scoped with `data-theme`.
- Density defaults come from the semantic baseline; `data-density='compact'` remains the only supported density override.

### Overlay Contract

- default-portaled overlays retain the base light/comfortable contract through `:root` defaults
- default-portaled overlays do **not** preserve nested subtree theme/density overrides
- subtree-specific theme or density overrides that must survive portal boundaries require a custom portal container inside the intended carrier subtree

### Import Contract

- real non-gallery consumers should import `src/rac/styles/components.css`
- gallery/host-shell styling stays separate and is not part of the component-style contract
- `src/rac/styles/index.css` remains the full gallery entrypoint
- vendored font loading remains owned by the component-style entrypoint through `alias.css`

### Style Scope

- component selectors are document-global when `components.css` is imported
- host-level element selectors are not allowed in `components.css`
- gallery/host-shell globals are allowed only in the gallery-owned stylesheet

### Cascade Contract

- consumer overrides are defined by post-import source order
- internal files may continue to depend on import order
- `@layer` stays out of scope in this pass

### Selector And Markup Contract

Intended styling hooks:

- `.react-aria-*` root classes
- documented RAC `data-*` state hooks
- explicit RAC slots only where the component contract exposes them

Repo-local conventions that stay internal:

- `.rac-*` helper classes
- `data-tone` on gallery helpers such as status pills
- source-observed context wiring such as `SelectionIndicatorContext` and `DropIndicatorContext`
- `UNSTABLE_portalContainer`

Family-local helper anatomy remains acceptable where needed, for example:

- `.rac-choice-indicator`
- `.rac-switch-track`
- `.rac-switch-thumb`

These remain internal implementation detail unless later docs deliberately promote them.

### Literal Policy

Literals remain allowed in four buckets:

1. Alias-layer primitives are raw by definition.
2. Theme leaf values may stay literal when they are concrete theme data rather than reusable primitives.
3. Anatomy-specific geometry and alignment fixes may stay literal when promoting them would not create a useful cross-family knob.
4. Gallery and host-shell literals stay outside the component contract.

Private `--_...` tokens should be used only when:

- a value is reused meaningfully inside one family
- the family benefits from a clear local tuning knob
- the value does not justify promotion to a semantic token

Private `--_...` names remain private. This review does not widen them into public API.

## Normalized Contract Table

| artifact                      | source          | stability                          | support level                      | scope / owner                              | public override status              |
| ----------------------------- | --------------- | ---------------------------------- | ---------------------------------- | ------------------------------------------ | ----------------------------------- |
| `.react-aria-*` roots         | RAC source/docs | documented RAC contract            | internal implementation dependency | component roots                            | intended styling hook               |
| RAC `data-*` states           | RAC source/docs | documented RAC contract            | internal implementation dependency | component states                           | intended styling hook               |
| `components.css`              | repo-local      | repo-local convention              | supported local import surface     | RAC component styles                       | supported non-gallery entrypoint    |
| gallery stylesheet            | repo-local      | repo-local convention              | internal implementation dependency | gallery host shell and helpers             | not component contract              |
| `data-theme` / `data-density` | repo-local      | repo-local convention              | supported local carrier convention | theme and density carriers                 | supported within the RAC experiment |
| `UNSTABLE_portalContainer`    | RAC source/docs | documented but explicitly unstable | internal implementation dependency | overlay demos and subtree portal overrides | not a stable supported contract     |
| `.rac-*` helpers              | repo-local      | repo-local convention              | internal implementation dependency | gallery shell or family-local anatomy      | not a public contract               |
| private `--_...` tokens       | repo-local      | repo-local convention              | internal implementation dependency | family-local tuning                        | not a public contract               |

## Benchmark Summary

### Material Wins Expected From Accepted Fixes

- coherent spacing and control sizing work will touch one baseline layer instead of split baseline-plus-density defaults
- non-gallery consumers get a real component-style import path
- same-page coexistence with nearby host content becomes explicit and mechanically checked
- default-portaled overlays gain a stable root default theme/density contract
- maintainers get explicit rules for literals, helper classes, and selector usage

### Benchmarks Explicitly Not Solved In This Pass

- shared-state retuning still requires family-local edits for selected, hover, disabled, invalid, and danger treatments
- subtree-specific theme and density overrides still do not survive the default portal path
- no new family-level public override surface is created beyond the existing semantic tokens and carrier conventions

## Public-Surface Delta

- semantic token count before: `9`
- semantic token count after planned code changes: `9`
- new supported import surface: `src/rac/styles/components.css`
- gallery-only file role becomes explicit through a rename
- no new public selector families are added
- no new public private-token names are added

## Change Direction Chosen For This Pass

Implement now:

1. Add a durable `components.css` entrypoint and use it as the source of truth for component styles.
2. Rename the current gallery/host-shell stylesheet so its ownership is obvious.
3. Make `semantic.css` the only baseline geometry source and reduce `density.css` to compact-only overrides.
4. Put light theme defaults at `:root`.
5. Update browser-backed regression coverage to lock the accepted import, carrier, and portal contract.
6. Update durable docs to capture the contract and literal policy.

Defer:

1. A broader shared-state token model.
2. Any larger semantic-token expansion.
3. A scoped-root styling model.
