# 05 Shared State Modeling

## Disposition

Real issue. Do not merge or drop.

This is not just a theme-token problem or a literal-value cleanup problem. The same interaction intents are being modeled separately in many family stylesheets, and compound-state precedence is handled ad hoc in each file. That creates a genuine cross-family tuning problem even if every remaining literal were normalized.

The issue is also not empty: there is a clear benchmark win available if shared interaction states can be retuned coherently without editing each family independently. The current surface only reaches that outcome through repeated local formulas.

## Evidence

- [buttons.css](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/buttons.css#L1) models hover, pressed, focus-visible, disabled, tone, and selected state with separate formulas and private button tokens.
- [choice-controls.css](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/choice-controls.css#L10) repeats hover, focus-visible, disabled, and selected logic for checkbox, radio, and switch families.
- [list-and-select.css](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/list-and-select.css#L37) adds a local selected-background token, then reuses separate hover, selected, focus-visible, and disabled rules.
- [menu.css](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/menu.css#L16) uses its own hover, selected, focus-visible, and disabled formulas.
- [grid-list.css](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/grid-list.css#L24), [table.css](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/table.css#L18), [tags.css](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/tags.css#L12), [tree.css](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/tree.css#L23), and [date-time.css](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/date-time.css#L76) all encode the same shared state vocabulary with different local color mixes, offsets, and precedence rules.
- [fields.css](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/fields.css#L53) and [date-time.css](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/date-time.css#L20) show invalid-state handling, but the invalid treatment is still family-local rather than shared.
- [overlays.css](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/overlays.css#L79) shows the same pattern for drop-target and focus-visible treatment.

The main overlap with other active tracks is only partial:

- It overlaps with the token-surface review insofar as these state formulas use semantic and private tokens.
- It does not collapse into the literal-value review, because the core question is not whether a color should be a literal or a token. The question is whether shared interaction states deserve a coherent shared model at all.

## Benchmark Result

Fixed result template:

- result: works with caveats
- files touched or relied on: [buttons.css](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/buttons.css), [choice-controls.css](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/choice-controls.css), [list-and-select.css](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/list-and-select.css), [menu.css](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/menu.css), [grid-list.css](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/grid-list.css), [table.css](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/table.css), [tags.css](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/tags.css), [tree.css](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/tree.css), [date-time.css](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/date-time.css), [fields.css](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/fields.css), [overlays.css](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/overlays.css)
- markup changes required: no for the common states already emitted by RAC; yes only for special-case contracts such as `DropIndicator` scaffolding or other provider/context-driven surfaces
- selector-weight increase required: no
- private-token dependency: weak but present; the current solution uses family-local `--_...` tokens in a few places and otherwise falls back to repeated formulas
- concrete observable: the same hover/selected/focus/disabled/invalid intent is restyled separately per family, so coherent retuning means touching several files and rechecking compound precedence by hand

Primary benchmark judgment:

- coherent cross-family tuning: works with caveats
- family-local tuning without collateral damage: works
- subtree theme and density behavior: not the point of this issue
- portal and overlay contract behavior: not the point of this issue
- non-gallery carrier and import-boundary behavior: not the point of this issue
- shared-state retuning: works with caveats, but only through repeated local edits

## Dependency Classification

- documented RAC contract: `[data-hovered]`, `[data-selected]`, `[data-pressed]`, `[data-focus-visible]`, `[data-disabled]`, and `[data-invalid]` are the shared state hooks this issue depends on.
- internal implementation dependency: the current `color-mix()` formulas, local state-specific literals, and a few family-local private tokens such as `--_button-bg` and `--_list-item-bg-selected`.
- source-observed implementation detail: compound precedence is currently encoded per family rather than through a shared state lattice.
- not a supported public override surface: none of the private state formulas here should be treated as externally stable contract names.

## Open Question

Should RAC styling in this repo grow a small shared state model for cross-family interaction treatment, or should hover/selected/pressed/focus/disabled/invalid/danger remain family-local implementation details?

The answer needs to define:

- which states are genuinely cross-family and which are anatomy-specific
- whether selected beats hover, pressed beats selected, and how invalid or disabled suppresses other emphasis
- whether the shared surface, if any, is semantic token based, private-token based, or intentionally absent
