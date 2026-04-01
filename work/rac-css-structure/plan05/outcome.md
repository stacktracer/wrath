# Plan05 Outcome

## Final Status

Plan05 was executed as a real CSS refactor rather than another documentation-only pass.

The implementation rebuilt the RAC value-classification model across three layers:

- alias primitives for durable raw values
- a broader but still bounded semantic layer for true cross-family roles
- stronger family-local `--_...` systems for local geometry, shell treatments, and state formulas

## What Materially Changed

### 1. Alias primitives now name the raw values that were previously anonymous

In [`src/rac/styles/alias.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/alias.css):

- added `--radius-full`
- added `--font-weight-regular`
- added `--font-weight-semibold`
- added `--font-weight-bold`

That moved "fully rounded" and "emphasis weight" out of magic-number status before semantic mapping even begins.

### 2. The shared semantic layer now models real cross-family roles

In [`src/rac/styles/semantic.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/semantic.css):

- semantic token count grew from `9` to `27`
- added shared typography roles
- added shared focus-offset roles
- added shared control-height roles
- added a shared full-round shape role
- added shared thumb-contrast roles
- added shared cross-family state fills and borders where the same design decision really recurs

The resulting layer is materially broader than the old spacing-heavy surface, but it no longer tries to absorb one-off family formulas just because they involve `color-mix(...)`.

### 3. Component CSS no longer hides the original complaints in raw declarations

Across the component files under [`src/rac/styles/components/`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components):

- `font-weight: 600` count went from `3` to `0`
- `font-weight: 700` count went from `2` to `0`
- `999px` count went from `9` to `0`
- hard-coded white thumb/swatch border count went from `2` to `0`
- raw numeric focus-offset literals went from `9` to `0`

The remaining function expressions are now named in one of two ways:

- truly shared formulas live in [`src/rac/styles/semantic.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/semantic.css)
- family-specific formulas live in commented `--_...` tokens inside the owning component file

### 4. Family-local mini-systems are now legible where the geometry is genuinely local

Notable family-local upgrades:

- [`src/rac/styles/components/choice-controls.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/choice-controls.css)
    - switch track/thumb/travel system
    - radio group column width
    - choice indicator size
- [`src/rac/styles/components/color.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/color.css)
    - area, wheel, swatch, and thumb sizing
    - swatch highlight and selected-border treatment
- [`src/rac/styles/components/date-time.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/date-time.css)
    - segment padding
    - calendar cell size and grid spacing
    - calendar-specific selection rings
- [`src/rac/styles/components/primitives.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/primitives.css)
    - keycap sizing and keycap surface treatment
- [`src/rac/styles/components/overlays.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/overlays.css)
    - overlay size clamps
    - tooltip surface
    - drag/drop insertion chrome
    - local pop-in transforms

This is the missing middle layer that `plan04` identified.

### 5. The component styles now carry explicit pressure against casual literals

Where literals still remain in component CSS, they now sit behind commented family-local `--_...` tokens or direct justification comments.

That is intentionally a little uglier. The point is to make every remaining literal pay rent by explaining itself.

## Files Updated

Primary code changes:

- [`src/rac/styles/alias.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/alias.css)
- [`src/rac/styles/semantic.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/semantic.css)
- [`src/rac/styles/README.md`](/home/mike/Documents/projects/wrath/code/src/rac/styles/README.md)
- the affected component-family files under [`src/rac/styles/components/`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components)

Plan05 execution artifacts:

- [`work/rac-css-structure/plan05/classification.md`](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/plan05/classification.md)
- [`work/rac-css-structure/plan05/exec.md`](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/plan05/exec.md)
- [`work/rac-css-structure/plan05/outcome.md`](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/plan05/outcome.md)

## Verification

Ran successfully on April 1, 2026:

- `npm run format`
- `npm run lint`
- `npm run test`
- `npm run build`

Residual note:

- the known large RAC experiment bundle warning still appears during `npm run build`

## Follow-Up Questions

- Whether any of the currently family-local state formulas should later graduate into shared semantic roles if the same treatment starts recurring again.
- Whether the remaining family-local `color-mix(...)` definitions should be further consolidated once more real reuse appears, especially in shell/background treatments such as tabs and toolbar.
