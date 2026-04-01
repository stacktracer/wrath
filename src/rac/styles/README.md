# RAC Styles Contract

## Entry Points

- [`components.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components.css): durable component-style entrypoint for RAC surfaces without gallery or host-shell styling
- [`index.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/index.css): full gallery entrypoint
- [`gallery.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/gallery.css): gallery shell, host baseline, and demo helpers; not part of the component-style contract

## Layer Ownership

- [`alias.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/alias.css): raw primitives such as palette values, scales, radii, shadows, fonts, and motion tokens
- [`semantic.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/semantic.css): baseline shared UI roles and baseline control/layout geometry, including shared computed expressions such as state fills, state borders, and contrast treatments
- [`themes.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/themes.css): theme mapping
- [`density.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/density.css): compact-only density override
- component-family files under [`components/`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components): direct RAC component styling

## Theme And Density Contract

- Root defaults are light theme and comfortable density.
- Subtree theme overrides use `data-theme`.
- The only supported density override is `data-density="compact"`.
- Default-portaled overlays inherit the root defaults.
- Subtree-specific theme or density overrides do not survive the default portal path.
- If a subtree-specific override must survive a portal boundary, use a custom portal container inside that subtree.

## Selector Contract

Preferred styling hooks:

- `.react-aria-*` root classes
- documented RAC `data-*` state hooks such as `[data-hovered]`, `[data-selected]`, `[data-focus-visible]`, `[data-disabled]`, `[data-invalid]`, and `[data-pressed]`
- explicit RAC slots only where the component contract exposes them

Internal-only hooks:

- `.rac-*` helper classes
- gallery/helper attributes such as helper `data-tone`
- `UNSTABLE_portalContainer`
- source-observed context wiring such as `SelectionIndicatorContext` and `DropIndicatorContext`
- private `--_...` tokens

## Literal Policy

Classify suspicious values into one of four buckets:

- alias primitive
- shared semantic role
- family-local `--_...` token
- intentional literal

Literals are allowed when they are:

- alias-layer primitives
- theme leaf values that are concrete theme data rather than reusable primitives
- anatomy-specific geometry or alignment fixes
- gallery or host-shell values outside the component contract

Do not tokenize a value only because it is repeated once or twice.

Use a private `--_...` token only when a value is a real family-local tuning knob. Private names stay private.

When a function expression such as `color-mix(...)`, a gradient, a shadow formula, or a transform is the reusable design decision, factor the whole expression into a semantic token or family-local `--_...` token. Do not only factor the numeric arguments and leave the expression inline everywhere.

If a literal survives in a component stylesheet, add a short comment explaining why it stays local instead of moving to alias, semantic, or a broader family-local mini-system. The comment should be terse and decision-focused.

## Override Contract

- Consumer overrides rely on post-import source order.
- `@layer` is intentionally out of scope for this experiment.
- The default supported override surface is the shared semantic tokens and the documented theme/density carriers.
- This pass does not create a broad family-level public override surface beyond that.
