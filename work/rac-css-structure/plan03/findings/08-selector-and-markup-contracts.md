# 08 Selector And Markup Contracts

## Disposition

Real issue. Do not merge or drop.

This does overlap partially with the shared-state track and the document-ownership track, but not enough to merge:

- `05-shared-state-modeling.md` is about how hover, selected, focus-visible, disabled, and invalid are modeled across families.
- `07-document-ownership-and-scope.md` is about whether `document.css` is the right place for host-shell and gallery scaffolding.
- this track is about which selectors, slots, helper classes, authored descendants, and custom attributes are actually part of the styling contract.

The contract question remains even if state formulas and file ownership were perfectly cleaned up. The current surface still mixes documented RAC hooks, source-observed internals, and repo-local helper markup in a way that needs explicit classification.

## Why This Matters

The RAC styling surface is not limited to tokens. It also depends on:

- default RAC root classes such as `.react-aria-Button` and `.react-aria-Popover`
- documented RAC state hooks such as `[data-hovered]`, `[data-selected]`, `[data-focus-visible]`, `[data-disabled]`, and `[data-invalid]`
- slot and ancestry selectors such as `.react-aria-Disclosure > .react-aria-Button[slot='trigger']`
- repo-local helper classes such as `.rac-tree-row`, `.rac-choice-indicator`, and `.rac-status-pill`
- repo-local authored attributes such as `data-tone`, `data-theme`, and `data-density`
- source-observed RAC contexts and unstable portal APIs used to make provider-only or portaled examples visible

That is a real contract surface, not just an implementation detail. Without a written rule for what is supported versus incidental, later authors will keep guessing where they are allowed to style, what markup they are allowed to rely on, and which selectors are safe to treat as durable.

## Evidence

Representative local selectors and markup hooks:

- [`src/rac/styles/components/buttons.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/buttons.css#L1) styles `.react-aria-Button` and `.react-aria-ToggleButton` directly, then branches on `[data-hovered]`, `[data-pressed]`, `[data-focus-visible]`, `[data-disabled]`, and `data-tone`.
- [`src/rac/styles/components/choice-controls.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/choice-controls.css#L1) uses shared RAC roots but also relies on authored child markup like `.rac-choice-indicator` and `.rac-switch-track`.
- [`src/rac/styles/components/list-and-select.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/list-and-select.css#L1) mixes RAC roots, RAC slots, and a private token on `.react-aria-ListBox`.
- [`src/rac/styles/components/disclosure.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/disclosure.css#L13) depends on a child trigger element and `[slot='trigger']`.
- [`src/rac/styles/components/overlays.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/overlays.css#L1) styles overlay roots, but the current gallery and test harness need `UNSTABLE_portalContainer` to keep the open-state examples local.
- [`src/rac/styles/document.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/document.css#L1) defines the host-shell and gallery helper classes that the app markup leans on.
- [`src/rac/app.tsx`](/home/mike/Documents/projects/wrath/code/src/rac/app.tsx#L288) and [`src/rac/app.tsx`](/home/mike/Documents/projects/wrath/code/src/rac/app.tsx#L406) show the gallery depending on those helper classes and authored attributes.

Package-source contracts that matter here:

- [`node_modules/react-aria-components/src/Button.tsx`](/home/mike/Documents/projects/wrath/code/node_modules/react-aria-components/src/Button.tsx) and related files document the root class and `data-*` hooks as intended styling selectors.
- [`node_modules/react-aria-components/src/Popover.tsx`](/home/mike/Documents/projects/wrath/code/node_modules/react-aria-components/src/Popover.tsx) exposes `UNSTABLE_portalContainer` and `data-trigger` / `data-placement` / `data-entering` / `data-exiting`.
- [`node_modules/react-aria-components/src/SelectionIndicator.tsx`](/home/mike/Documents/projects/wrath/code/node_modules/react-aria-components/src/SelectionIndicator.tsx) and [`node_modules/react-aria-components/src/DragAndDrop.tsx`](/home/mike/Documents/projects/wrath/code/node_modules/react-aria-components/src/DragAndDrop.tsx) show source-observed context contracts that are useful in the gallery but should not be treated as broad public markup guarantees.

## Benchmark Impact

Fixed result template:

- result
- files touched or relied on
- markup changes required
- selector-weight increase required
- private-token dependency
- concrete observable

| benchmark task                                                                                                                     | result             | files touched or relied on                                                                                                                                                              | markup changes required                                                                           | selector-weight increase required                                                           | private-token dependency                         | concrete observable                                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Override an approved custom selector or helper convention from outside the owning stylesheet                                       | works with caveats | `src/rac/styles/document.css`, `src/rac/app.tsx`, `src/rac/styles/components/*`                                                                                                         | sometimes, because helper classes and child anatomy are required by the component contract        | no for token-only overrides, yes when the selector contract depends on authored descendants | weak                                             | post-import token overrides work cleanly, but helper-class and ancestry-based rules still depend on undocumented markup shape                        |
| Classify and tune one provider-only or scaffolding-dependent family without promoting demo-only structure into the public contract | works with caveats | `src/rac/app.tsx`, `src/rac/customization-contract.test.tsx`, `node_modules/react-aria-components/src/SelectionIndicator.tsx`, `node_modules/react-aria-components/src/DragAndDrop.tsx` | yes                                                                                               | no                                                                                          | yes, indirectly through source-observed contexts | `ColorPicker` and `DropIndicator` need scaffolded examples, so the markup contract is already special-case even before CSS is changed                |
| Decide the style-scope contract for RAC roots and selectors                                                                        | works with caveats | `src/rac/styles/index.css`, `src/rac/main.tsx`, `src/rac/styles/components/*`, `src/rac/styles/document.css`                                                                            | no for current gallery import, yes if the repo later wants an opt-in scope boundary               | no                                                                                          | no                                               | current consumers get the full selector surface as soon as `styles/index.css` is imported, but the repo has not yet said whether that is intentional |
| Verify coexistence between RAC styles and nearby non-RAC host content                                                              | works with caveats | `src/rac/app.tsx`, `src/rac/styles/document.css`, `src/rac/index.html`                                                                                                                  | no for the current gallery shell, but the host shell is doing more than a minimal baseline should | no                                                                                          | no                                               | the page coexists with host content, but only because gallery scaffolding is part of the imported surface                                            |

## Dependency Classification

| artifact                                                                                                           | source                                                                     | stability                                               | support level                      | scope / owner                                | public override status                                                              |
| ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- | ------------------------------------------------------- | ---------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------- |
| `.react-aria-*` default root classes                                                                               | RAC source comments and `defaultClassName` assignments                     | documented RAC contract                                 | internal implementation dependency | RAC component roots                          | intended styling hook, but not a repo-local public contract unless documented later |
| `[data-hovered]`, `[data-selected]`, `[data-focus-visible]`, `[data-disabled]`, `[data-invalid]`, `[data-pressed]` | RAC source comments and emitted attributes                                 | documented RAC contract                                 | internal implementation dependency | RAC state hooks                              | intended styling hook                                                               |
| `[slot='trigger']`, `[slot='close']`, `[slot='description']`, other authored slots                                 | RAC source and local markup                                                | documented as component structure, but anatomy-specific | internal implementation dependency | component-specific descendants               | acceptable only where the component contract explicitly exposes the slot            |
| `UNSTABLE_portalContainer`                                                                                         | RAC source and comments in overlay files                                   | documented but unstable RAC API                         | internal implementation dependency | overlay gallery and test harness             | not a stable public contract                                                        |
| `SelectionIndicatorContext`, `DropIndicatorContext`                                                                | RAC source-observed context behavior                                       | source-observed implementation detail                   | internal implementation dependency | selected-item and drop-indicator scaffolding | not a supported authored override surface                                           |
| `data-theme`, `data-density`, `data-tone`                                                                          | repo-local authored attributes in `src/rac/app.tsx` and `src/rac/styles/*` | repo-local convention                                   | internal implementation dependency | theme, density, and gallery helper styling   | not a public RAC contract                                                           |
| `.rac-*` helper classes                                                                                            | repo-local markup and document styles                                      | repo-local convention                                   | internal implementation dependency | gallery/document scaffolding                 | not a public RAC contract                                                           |

## Scope Narrowing

This track stays separate from the shared-state and document-ownership findings.

The follow-up question here is narrower and more actionable:

- which selector families are intentionally supported as styling hooks
- which markup hooks are part of the RAC component contract
- which helper classes and authored descendants are local implementation detail
- whether the repo wants a stable opt-in scope or accepts the current document-global import behavior

## Files Reviewed

- `src/rac/app.tsx`
- `src/rac/index.html`
- `src/rac/main.tsx`
- `src/rac/styles/index.css`
- `src/rac/styles/document.css`
- `src/rac/styles/components/buttons.css`
- `src/rac/styles/components/choice-controls.css`
- `src/rac/styles/components/list-and-select.css`
- `src/rac/styles/components/disclosure.css`
- `src/rac/styles/components/overlays.css`
- `src/rac/styles/components/primitives.css`
- `src/rac/styles/components/menu.css`
- `src/rac/styles/components/tabs.css`
- `src/rac/styles/components/table.css`
- `src/rac/styles/components/tree.css`
- `src/rac/styles/components/toast.css`
- `src/rac/styles/components/color.css`
- `src/rac/styles/components/date-time.css`
- `src/rac/styles/components/range-and-progress.css`
- `node_modules/react-aria-components/src/Button.tsx`
- `node_modules/react-aria-components/src/Popover.tsx`
- `node_modules/react-aria-components/src/SelectionIndicator.tsx`
- `node_modules/react-aria-components/src/DragAndDrop.tsx`
