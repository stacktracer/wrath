# Plan03 Step 1 Issues Inventory

## Step 1A Gate Result

Continue past the gate.

The current CSS is not obviously broken, but deeper review is justified because at least four primary-contract risks are already visible from local inspection and the shared harness:

- the semantic layer is materially thinner than intended and its boundary with density is ambiguous
- there is no durable non-gallery component-style entrypoint, and `src/rac/main.tsx` imports the full gallery shell through [`src/rac/styles/index.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/index.css)
- selector-scoped theme and density carriers do not survive the default portal path in the current structure
- the styling surface depends on a mix of documented RAC hooks, explicit `UNSTABLE_*` APIs, source-observed emitted CSS variables, and gallery-only helper classes that are not yet separated cleanly

That combination is enough to justify Step 1B and later subagent work. A `document only` stop would leave the most important override and ownership questions unresolved.

## Step 1 Harness

Canonical Step 1 artifact:

- browser spec: [`src/rac/customization-contract.test.tsx`](/home/mike/Documents/projects/wrath/code/src/rac/customization-contract.test.tsx)
- test-only component-style slice: [`src/rac/styles/test/customization-harness.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/test/customization-harness.css)

Intent:

- import alias, semantic, theme, density, and component-family CSS
- exclude [`src/rac/styles/document.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/document.css)
- provide one checked-in non-gallery fixture and baseline evidence for:
    - post-import token overrides
    - subtree theme and density carriers
    - default portal vs custom portal carrier behavior
    - provider-only and scaffolding-dependent surfaces
    - invalid-state differentiation

Verification run for the harness:

- `npm run format` passed on March 30, 2026
- `npm run lint` passed on March 30, 2026
- `npm run test` passed on March 30, 2026
- `npm run build` passed on March 30, 2026
- build still emits the known large RAC experiment chunk warning noted in [`plan02/outcome.md`](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/plan02/outcome.md)

Important boundary:

- the harness CSS slice is test-only review infrastructure, not an accepted public import contract
- if Step 3 rejects a durable non-gallery split, this slice should stay test-local only

## Current Import And Ownership Baseline

Current live import chain:

- [`src/rac/main.tsx`](/home/mike/Documents/projects/wrath/code/src/rac/main.tsx) imports [`src/rac/styles/index.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/index.css)
- [`src/rac/styles/index.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/index.css) imports:
    - alias
    - semantic
    - themes
    - density
    - document
    - every component-family stylesheet

Immediate implication:

- current consumers cannot import component styles without also importing the host-shell and gallery helper layer
- the only real entrypoint today is production-shaped for the gallery, not for a non-gallery consumer

## Quantitative Baseline

### Token Counts

- semantic token definitions in [`src/rac/styles/semantic.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/semantic.css): `9`
- unique component-local private token names currently defined across component and document CSS: `5`
    - `--_button-bg`
    - `--_button-border`
    - `--_button-color`
    - `--_card-padding`
    - `--_list-item-bg-selected`

### Literal Pattern Counts

Repo-wide rough counts under `src/rac/styles/`:

- `px` literals: `70`
- `rem` literals: `81`
- numeric `font-weight` literals: `9`
- hex color literals: `60`
- `rgba()` / `rgb()` calls: `31`
- `color-mix()` calls: `42`

Files with the highest concentration of these patterns:

- [`src/rac/styles/themes.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/themes.css): `41`
- [`src/rac/styles/document.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/document.css): `33`
- [`src/rac/styles/components/color.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/color.css): `19`
- [`src/rac/styles/components/choice-controls.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/choice-controls.css): `18`
- [`src/rac/styles/components/date-time.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/date-time.css): `16`
- [`src/rac/styles/components/overlays.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/overlays.css): `14`

### State And Selector Pattern Counts

Rough counts:

- `[data-hovered]`: `12`
- `[data-selected]`: `14`
- `[data-focus-visible]`: `17`
- `[data-invalid]`: `2`
- `[data-disabled]`: `5`
- `:hover`: `3`
- `:focus` without `-visible`: `2`

Observations:

- the surface is mainly RAC `data-*` driven, which is good
- browser pseudo-classes are still mixed in for links, buttons, fields, and choice controls
- invalid and disabled treatment are much less systematically represented than hover, selected, and focus-visible

### Helper And Carrier Usage Audit

Repo-wide usage:

- `data-theme` carriers are defined only in [`src/rac/styles/themes.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/themes.css) and authored only in [`src/rac/app.tsx`](/home/mike/Documents/projects/wrath/code/src/rac/app.tsx)
- `data-density` carriers are defined only in [`src/rac/styles/density.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/density.css) and authored only in [`src/rac/app.tsx`](/home/mike/Documents/projects/wrath/code/src/rac/app.tsx)
- `data-tone` is a repo-local authored attribute used by:
    - button tone variants in [`src/rac/styles/components/buttons.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/buttons.css)
    - status-pill helpers in [`src/rac/styles/document.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/document.css)
    - demo markup in [`src/rac/app.tsx`](/home/mike/Documents/projects/wrath/code/src/rac/app.tsx)
- `.rac-*` helpers are almost entirely scoped to the gallery host in [`src/rac/app.tsx`](/home/mike/Documents/projects/wrath/code/src/rac/app.tsx) and [`src/rac/styles/document.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/document.css), with a smaller helper subset owned by [`src/rac/styles/components/choice-controls.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/choice-controls.css)

### Cascade And Specificity Baseline

Import order today:

1. alias
2. semantic
3. themes
4. density
5. document
6. component families

Practical implications:

- consumer overrides currently rely on post-import source order, not `@layer`
- internal styling also relies on import order and inherited token resolution
- selector weight is generally low, but several families depend on authored structure:
    - [`src/rac/styles/components/disclosure.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/disclosure.css): `.react-aria-Disclosure > .react-aria-Button[slot='trigger']`
    - [`src/rac/styles/components/list-and-select.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/list-and-select.css): `.react-aria-ComboBox > .react-aria-Group`
    - [`src/rac/styles/components/toast.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/toast.css): `.react-aria-ToastContent .react-aria-Text[slot='title']`
    - [`src/rac/styles/components/tree.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/tree.css): `.react-aria-TreeItem .react-aria-Button`

## Shared Component-Family Sample Matrix

Fixed Step 1 research sample:

- core visible primitives: `Link`, `Text`, `FieldError`, `SelectionIndicator`
- choice and toggle controls: `Button`, `ToggleButton`, `Checkbox`, `Switch`
- selection and list controls: `Select`, `ComboBox`, `ListBox`, `Menu`, `Tag`
- data display and structured collections: `GridList`, `Table`, `Tree`
- overlays and disclosure: `Popover`, `Tooltip`, `Modal`, `Disclosure`, `Tabs`, `DropZone`, `DropIndicator`
- date and time: `DateField`, `DatePicker`, `Calendar`, `RangeCalendar`
- color: `ColorPicker`, `ColorArea`, `ColorField`, `ColorThumb`
- slider and range: `Slider`, `ProgressBar`, `Meter`
- toolbar: `Toolbar`
- unstable toast: `UNSTABLE_Toast`, `UNSTABLE_ToastRegion`

Awkward contracts explicitly carried forward from `plan02`:

- provider-only `ColorPicker`
- context-driven `DropIndicator`
- `SelectionIndicator` context limits
- default portal and non-modal overlay behavior

## Shared Dependency Ledger

Pinned package:

- `react-aria-components@1.16.0`

Current dependency table:

| artifact                                                                                                           | source                                                                                                                                                                                                                   | stability                                  | support level                      | scope / owner                                  | public override status                          |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ | ---------------------------------- | ---------------------------------------------- | ----------------------------------------------- |
| `.react-aria-*` default root classes                                                                               | package source comments and `defaultClassName` assignments in `node_modules/react-aria-components/src/*.tsx`                                                                                                             | documented RAC contract                    | internal implementation dependency | RAC components                                 | not yet documented locally as external contract |
| `[data-hovered]`, `[data-focus-visible]`, `[data-selected]`, `[data-disabled]`, `[data-invalid]`, `[data-pressed]` | package source comments with `@selector` and emitted attributes in component source                                                                                                                                      | documented RAC contract                    | internal implementation dependency | RAC state hooks                                | locally treated as intended styling hooks       |
| `UNSTABLE_portalContainer`                                                                                         | package source comments in [`node_modules/react-aria-components/src/Popover.tsx`](/home/mike/Documents/projects/wrath/code/node_modules/react-aria-components/src/Popover.tsx) and related overlay files                 | documented but explicitly unstable RAC API | internal implementation dependency | overlay gallery scaffolding and plan03 harness | must not be widened casually                    |
| `SelectionIndicatorContext` visibility behavior                                                                    | package source in [`node_modules/react-aria-components/src/SelectionIndicator.tsx`](/home/mike/Documents/projects/wrath/code/node_modules/react-aria-components/src/SelectionIndicator.tsx) plus collection integrations | source-observed RAC behavior               | internal implementation dependency | selected-item families                         | not a supported authored override surface       |
| `DropIndicatorContext` custom render path                                                                          | package source in [`node_modules/react-aria-components/src/DragAndDrop.tsx`](/home/mike/Documents/projects/wrath/code/node_modules/react-aria-components/src/DragAndDrop.tsx)                                            | source-observed RAC behavior               | internal implementation dependency | drop-indicator demo scaffolding                | not a supported authored override surface       |
| `--tree-item-level`                                                                                                | package source in [`node_modules/react-aria-components/src/Tree.tsx`](/home/mike/Documents/projects/wrath/code/node_modules/react-aria-components/src/Tree.tsx)                                                          | source-observed RAC behavior               | internal implementation dependency | tree indentation                               | not a supported authored override surface       |
| `--trigger-anchor-point`                                                                                           | package source in [`node_modules/react-aria-components/src/Popover.tsx`](/home/mike/Documents/projects/wrath/code/node_modules/react-aria-components/src/Popover.tsx)                                                    | source-observed RAC behavior               | internal implementation dependency | currently unused in repo CSS                   | none                                            |

Upgrade-risk summary:

- highest explicit risk: `UNSTABLE_portalContainer`
- medium source-observed risk: `SelectionIndicatorContext`, `DropIndicatorContext`, `--tree-item-level`, `--trigger-anchor-point`
- lower risk but still repo-contract-sensitive: default `.react-aria-*` classes and `data-*` state hooks if the repo wants to bless them beyond internal usage

## Benchmark Baseline

Fixed result template:

- result
- files touched or relied on
- markup changes required
- selector-weight increase required
- private-token dependency
- concrete observable

### Task Results

1. Tighten spacing and control sizing coherently across several families.
    - result: works with caveats
    - files: [`src/rac/styles/semantic.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/semantic.css), [`src/rac/styles/density.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/density.css), several family files with literal min sizes and offsets
    - markup changes: no
    - selector-weight increase: no
    - private-token dependency: no
    - observable: shared padding tokens propagate, but literal sizes like `2.5rem`, `2.75rem`, `1.15rem`, and `999px` prevent a single coherent geometry retune

2. Tune one component family locally without changing unrelated families.
    - result: works with caveats
    - files: usually the owning family file directly
    - markup changes: no
    - selector-weight increase: no
    - private-token dependency: often no, because there is no strong private-token layer to target
    - observable: local edits are possible, but family-local tuning often means editing raw declarations rather than adjusting a deliberate `--_...` boundary

3. Apply a subtree theme or density override to one contained region.
    - result: works
    - files: [`src/rac/styles/themes.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/themes.css), [`src/rac/styles/density.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/density.css)
    - markup changes: yes, carrier wrapper with `data-theme` / `data-density`
    - selector-weight increase: no
    - private-token dependency: no
    - observable: nested carrier test in the harness changes button padding and background without extra selectors

4. Verify overlay behavior across real portal boundaries.
    - result: fails for default portal, works with caveats for custom portal container
    - files: [`src/rac/styles/themes.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/themes.css), [`src/rac/styles/density.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/overlays.css), harness spec
    - markup changes: no for default portal, yes for custom portal container
    - selector-weight increase: no
    - private-token dependency: no
    - observable: default-portaled popover loses `--surface-overlay`; custom portal container retains it

5. Override an approved custom selector or helper convention from outside the owning stylesheet.
    - result: works with caveats
    - files: harness post-import override layer, current family CSS
    - markup changes: only when helper anatomy is required by the component contract
    - selector-weight increase: not for token overrides; unclear for helper-class overrides
    - private-token dependency: no in the harness baseline
    - observable: post-import override of `--control-padding-inline` succeeds without selector escalation

6. Leave an intentionally literal value alone and explain why.
    - result: works with caveats
    - files: several family files
    - markup changes: no
    - selector-weight increase: no
    - private-token dependency: no
    - observable: literals like `1px`, `2px`, `999px`, and some `min()` expressions are plausibly anatomy-specific, but the repo has no written rule for when that is intentional

7. Introduce or classify a new family-local value or state treatment without broadening the public surface.
    - result: works with caveats
    - files: family-local CSS
    - markup changes: no
    - selector-weight increase: no
    - private-token dependency: weak
    - observable: the repo can add a local declaration, but there is little existing private-token scaffolding to guide authors toward a consistent local boundary

8. Evaluate cross-family typography independently from density.
    - result: works with caveats
    - files: alias typography tokens plus family files and document helpers
    - markup changes: no
    - selector-weight increase: no
    - private-token dependency: no
    - observable: type scales are tokenized, but font-weight literals remain scattered in component and document CSS

9. Author or migrate one component-family rule under the current conventions.
    - result: works with caveats
    - files: owning family file
    - markup changes: sometimes, because anatomy helpers or slot selectors are involved
    - selector-weight increase: no
    - private-token dependency: mixed
    - observable: the workflow is legible for simple rules, but layer boundaries are not explicit enough to tell future authors where a new shared value belongs

10. Classify and tune one provider-only or scaffolding-dependent family.

- result: works with caveats
- files: [`src/rac/app.tsx`](/home/mike/Documents/projects/wrath/code/src/rac/app.tsx), [`src/rac/styles/components/color.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/color.css), [`src/rac/styles/components/overlays.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/overlays.css)
- markup changes: yes
- selector-weight increase: no
- private-token dependency: no
- observable: the harness can render `ColorPicker` children and a context-backed `DropIndicator`, but both require source knowledge that is not documented as part of the local contract

11. Decide the baseline non-gallery theme and density carrier contract.

- result: fails
- files: current main import path and scoped theme/density files
- markup changes: yes, but the required wrapper is not documented as a real consumer contract
- selector-weight increase: no
- private-token dependency: no
- observable: there is no durable non-gallery entrypoint and no settled answer for whether defaults live at `:root`, on an app wrapper, or only on explicit `data-*` carriers

12. Retune one shared state treatment across multiple families.

- result: fails
- files: buttons, choice-controls, list-and-select, menu, grid-list, table, tree, tags, date-time, overlays
- markup changes: no
- selector-weight increase: no
- private-token dependency: sometimes
- observable: hover, selected, focus, disabled, and invalid/danger behavior is expressed through many family-local `color-mix()` formulas and literal offsets

13. Decide the style-scope contract.

- result: fails
- files: [`src/rac/styles/index.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/index.css), [`src/rac/styles/document.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/document.css), harness slice
- markup changes: currently yes for carriers, unclear for base selectors
- selector-weight increase: no
- private-token dependency: no
- observable: the full bundle is document-global when imported, but only some of it is clearly intended to be global

14. Verify whether default-portaled overlays retain base component styling under the current contract.

- result: fails
- files: overlay component CSS plus theme carriers
- markup changes: no
- selector-weight increase: no
- private-token dependency: no
- observable: default-portaled popovers keep class selectors but lose required scoped token carriers, so effective styling is incomplete

15. Verify coexistence with nearby non-RAC host content.

- result: works with caveats
- files: harness slice and full gallery bundle
- markup changes: no in the harness; full bundle still styles `html`, `body`, and `#app`
- selector-weight increase: no
- private-token dependency: no
- observable: the component-only harness leaves `document.body` unstyled, but the shipped gallery entrypoint does not

Threshold result:

- at least one benchmark currently fails
- some override paths still depend on direct family edits rather than clean boundaries
- the import and ownership contract is still too ambiguous to document safely

Step 2 is warranted.

## Candidate Issues

### 01. Semantic Layer And Density Boundary

- relevant files:
    - [`src/rac/styles/semantic.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/semantic.css)
    - [`src/rac/styles/density.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/density.css)
- representative declarations:
    - `--control-padding-block: calc(var(--space-2) + 1px);`
    - repeated comfortable defaults in both files
- why it might be a problem:
    - defaults live in two places
    - the semantic layer only defines `9` tokens, well below the intended `24-32` range
    - density currently looks like an alternate default source rather than a focused override axis
- why it might be acceptable:
    - the current app is still small
    - a tiny semantic surface may reduce cognitive load if it still covers the benchmark tasks
- exact research question:
    - should comfortable defaults live only in semantic tokens, with density as a thin override layer, or is the current split justified by a real authoring benefit?

### 02. Theme Aliasing And Literal Usage

- relevant file:
    - [`src/rac/styles/themes.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/themes.css)
- representative declarations:
    - alias-backed: `--surface-page: var(--gray-1);`
    - literal: `--surface-raised: #ffffff;`
    - literal shadow: `--overlay-shadow: 0 24px 72px rgba(0, 0, 0, 0.52);`
- why it might be a problem:
    - the rule for when theme tokens may stay literal is not explicit
    - theme customization may become ad hoc rather than coherent
- why it might be acceptable:
    - some theme values may be composite or theme-specific enough that alias indirection is not worth it
- exact research question:
    - which theme values genuinely benefit from alias backing, which should stay theme-literal, and what rule should authors follow?

### 03. Component-Local Token Boundary

- relevant files:
    - [`src/rac/styles/components/buttons.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/buttons.css)
    - [`src/rac/styles/components/list-and-select.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/list-and-select.css)
    - [`src/rac/styles/document.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/document.css)
- representative declarations:
    - `--_button-bg`
    - `--_list-item-bg-selected`
    - only `5` unique private-token names repo-wide
- why it might be a problem:
    - most families do not have an explicit safe local-tuning layer
    - authors are pushed toward editing raw declarations directly
- why it might be acceptable:
    - some families may be simple enough that a local token layer would be ceremonial
- exact research question:
    - where does a real private-token layer pay for itself, and where would it only add noise?

### 04. Literals In Component Files

- relevant files:
    - many component files, especially color, choice-controls, date-time, overlays, table, range-and-progress
- representative declarations:
    - `min-block-size: 2.75rem;`
    - `border-radius: 999px;`
    - `border: 2px solid #ffffff;`
    - `font-weight: 600;`
- why it might be a problem:
    - current literals blur the line between deliberate anatomy detail and missed shared value
    - geometry and typography retunes are harder to do coherently
- why it might be acceptable:
    - some literals are intrinsic to anatomy, focus offsets, or visual affordances
- exact research question:
    - which literal families should remain literal, which should be promoted, and at what token layer?

### 05. Shared State Modeling

- relevant files:
    - buttons, choice-controls, fields, list-and-select, menu, tags, grid-list, table, tree, date-time, overlays
- representative declarations:
    - repeated hover backgrounds via `color-mix()`
    - repeated focus outlines with varying offsets
    - invalid / danger borders mixed independently into fields and date-time
- why it might be a problem:
    - cross-family state retunes currently require touching many files
    - precedence between selected, hovered, focused, disabled, invalid, and danger is not documented as a shared rule
- why it might be acceptable:
    - some state treatment may genuinely belong to family anatomy
- exact research question:
    - which state treatments deserve a shared surface and which should remain family-local implementation detail?

### 06. Document Layer Ownership

- relevant files:
    - [`src/rac/styles/document.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/document.css)
    - [`src/rac/app.tsx`](/home/mike/Documents/projects/wrath/code/src/rac/app.tsx)
    - [`src/rac/main.tsx`](/home/mike/Documents/projects/wrath/code/src/rac/main.tsx)
- representative declarations:
    - global element selectors for `html`, `body`, `#app`
    - gallery layout helpers such as `.rac-section-grid`, `.rac-demo-card`, `.rac-overlay-sandbox`
    - visual helper anatomy such as `.rac-pill`, `.rac-status-pill`, `.rac-tree-row`
- why it might be a problem:
    - the file name suggests document baseline, but most contents are gallery shell and demo helpers
    - importing component CSS through the main bundle also imports page styling
- why it might be acceptable:
    - the repo is still in experiment mode and may not yet need a separate host-shell layer
- exact research question:
    - should this file be split, renamed, fenced, or left as-is with stronger documentation?

### 07. Rules For Intentional Literals

- relevant files:
    - all style layers
- representative declarations:
    - focus offsets, underlay sizes, chip radii, 1px lines, calendar cell sizes, slider thumb borders
- why it might be a problem:
    - without a rule, future authors will repeat the current inconsistency
- why it might be acceptable:
    - a lightweight written rule may be enough without structural changes
- exact research question:
    - what explicit rule should govern literals so maintainers can classify new values consistently?

### 08. Selector And Markup Contracts

- relevant files:
    - all component CSS
    - [`src/rac/app.tsx`](/home/mike/Documents/projects/wrath/code/src/rac/app.tsx)
    - installed RAC package source
- representative declarations:
    - `.react-aria-*` root selectors
    - RAC state hooks
    - slot selectors
    - helper anatomy such as `.rac-choice-indicator`, `.rac-switch-track`, `.rac-switch-thumb`
    - gallery helpers in `document.css`
- why it might be a problem:
    - the repo currently mixes documented RAC hooks, repo-local conventions, and gallery-only helper structure without a written boundary
    - the non-gallery contract cannot be described safely until these are classified
- why it might be acceptable:
    - the current selector mix may be the smallest practical way to style direct RAC components
- exact research question:
    - which selectors and authored attributes should be treated as supported convention, which are family-local helper anatomy, and which are gallery-only or accidental contract?

### 09. Motion As A Shared Axis

- relevant files:
    - [`src/rac/styles/alias.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/alias.css)
    - [`src/rac/styles/components/buttons.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/buttons.css)
    - [`src/rac/styles/components/choice-controls.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/choice-controls.css)
    - [`src/rac/styles/components/overlays.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/overlays.css)
- representative declarations:
    - shared duration and easing tokens in alias
    - `rac-pop-in` animation for overlays
    - family-local transition lists
- why it might be a problem:
    - motion is currently shared enough to affect cross-family feel
    - reduced-motion handling is not yet explicit in the local docs
- why it might be acceptable:
    - motion may be small enough to defer if it does not materially affect benchmark outcomes
- exact research question:
    - does motion need review as a supported cross-family tuning surface, or should it be documented as local-only for now?

## Notes For Step 2

- keep triage inside subagents
- each findings file should begin by deciding whether its provisional issue is real, empty, or materially overlapping another track
- if a track should be merged or dropped, the finding should record that explicitly rather than relying on local unstated triage
