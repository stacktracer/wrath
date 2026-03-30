# Primer

## Could We Adopt The Library Itself?

Probably not `@primer/css` as our primary styling system.

- Primer CSS is explicitly in KTLO mode, and the repo README says existing utilities should be reused while newer complete patterns should come from `primer/react` or `primer/view_components`.
- The CSS package is SCSS-first and utility-class-heavy, which is a poor fit for RAC styled directly with `data-*` selectors.
- `@primer/primitives` is more plausible as a dependency than `@primer/css`, because it is just CSS variables and theme files. Even there, we would still be adopting Primer's token vocabulary and theme model, not our own.

## Token Tiers, Names, And Structure

Primer now documents three token tiers: `base`, `functional`, and `component/pattern`.

- Base tokens map directly to raw values. Examples: `base-size-4`, `base-color-green-5`, `base-fontWeight-semibold`.
- Functional tokens represent global UI patterns. Examples: `bgColor-inset`, `borderColor-default`, `boxShadow-inset-thick`.
- Component/pattern tokens are only for component CSS. Examples: `button-primary-bgColor-hover`, `control-danger-borderColor-rest`, `text-codeInline-fontSize`.

The naming convention has more structure than our likely final system:

- `prefix` exists for special namespaces like `brand`.
- `namespace` identifies the tier, such as `base`.
- `pattern` names the component or group of decisions.
- `variant` is a single modifier such as `danger` or `small`.
- `property` is required and usually matches a CSS property.
- `scale` covers ordinals like density, thickness, speed, or state.

Primer also uses explicit size modifiers and conventions such as `condensed | normal | spacious`, `thin | thick | thicker`, and `narrow | regular | wide`.

Source link: [Token names](https://primer.style/product/primitives/token-names/).

## Semantic Tokens Vs Component-Local Tokens

The boundary is fairly clear in the docs, but the system is broader than a minimal semantic-token layer.

- Semantic tokens in Primer are the functional tokens. They cover cross-component roles like background, border, text, shadow, and spacing scales.
- Component-local tokens are the component/pattern tokens. They exist when one component needs its own rest/hover/active/disabled values or a component-specific font size, spacing, or shadow.
- The docs encourage generic pattern names when possible, so a token like `control-*` can cover buttons, inputs, and interactive list items rather than proliferating per-component names too early.

For our purposes, this is the useful part of Primer's model: a small global token set, then a local override layer when a component truly needs it.

Source links: [Token names](https://primer.style/product/primitives/token-names/), [Colors utility docs](https://www.primer.style/product/css-utilities/colors/).

## Variants

Variants are mostly expressed as token variants and class modifiers.

- In tokens, the variant block encodes things like `danger`, `primary`, `small`, or `emphasis`.
- In CSS, Primer CSS expresses variants with modifier classes like `.btn-primary`, `.btn-outline`, `.btn-danger`, `.btn-sm`, and `.btn-large`.
- The utilities also use size/density variants like spacing scales and responsive suffixes.

This is a class-centric variant model, not a selector-by-state model built around component data attributes.

Source links: [Token names](https://primer.style/product/primitives/token-names/), [Primer CSS button source](https://raw.githubusercontent.com/primer/css/main/src/buttons/button.scss).

## Interactive States

Primer styles interaction with a mixture of pseudo-classes, ARIA attributes, and open-state selectors.

- The button source styles `:hover`, `:active`, `:focus`, `:focus-visible`, `:disabled`, `[aria-disabled='true']`, `[aria-selected='true']`, and `[open] > &`.
- Global base styles add focus treatment for `a`, `button`, `[role='button']`, `input[type='radio']`, and `input[type='checkbox']`, and they include a forced-colors branch for Windows high contrast.
- Component tokens carry rest/hover/active/disabled values, which keeps state styling centralized once the class or selector is chosen.

This is compatible with RAC state selectors in spirit, but Primer's existing implementation is not built around RAC's `data-*` hooks.

Source links: [Primer CSS base source](https://raw.githubusercontent.com/primer/css/main/src/base/base.scss), [Primer CSS button source](https://raw.githubusercontent.com/primer/css/main/src/buttons/button.scss), [Primer CSS utilities source](https://raw.githubusercontent.com/primer/css/main/src/utilities/colors.scss).

## Themes And Dark Mode

Primer's theming model is strong and explicit.

- `@primer/primitives` exposes CSS variables through theme files.
- The documented theme control uses `data-color-mode`, `data-light-theme`, and `data-dark-theme` on `body` or another high-level element.
- Supported modes include `auto`, `light`, and `dark`.
- The published theme set includes light, dark, dimmed, colorblind, high-contrast, and tritanopia variants.
- Primer's neutral scales invert between light and dark themes so many functional tokens can stay stable across modes.

For a long-lived app, this is good. For us, the main question is whether we want Primer's theme taxonomy or only the raw idea of theme-scoped CSS variables.

Source links: [Primitives](https://primer.style/product/primitives/), [Color considerations](https://primer.style/accessibility/design-guidance/color-considerations/), [Primer Primitives repo](https://github.com/primer/primitives).

## Escape Hatches

Primer gives several escape hatches, but they are more permissive than guarded.

- Any selector can override CSS custom properties, and the docs explicitly show `body` or a unique class as the override point.
- The legacy React theme object resolves to CSS variables, which means there is a compatibility bridge but also a second naming surface.
- Primer CSS utilities are available when you want a fast local override, but they rely on `!important`, which weakens local ownership and can create cascade surprises.

That flexibility is useful, but it is not a strong guardrail system.

Source links: [Overwrite variables with sass](https://github.com/primer/css/discussions/1881), [Primitives](https://primer.style/product/primitives/), [Primer CSS utilities source](https://raw.githubusercontent.com/primer/css/main/src/utilities/colors.scss).

## Compatibility With Our Constraints

Compatible:

- CSS variables are the center of gravity.
- The system already separates global primitives from component-specific tokens.
- Theme switching is data-attribute driven at the document level.

Incompatible or awkward:

- `@primer/css` is SCSS and utility-class oriented, not plain CSS authored directly around RAC component selectors.
- The package is KTLO, so adopting it would mean building on a frozen legacy surface.
- Primer's utility layer is intentionally broad and global, which is the opposite of our preference for local ownership unless reuse is clearly established.

The best fit for us is inspiration from the token hierarchy and theme behavior, not direct adoption of the CSS package.

## Day-To-Day Authoring Experience

Primer asks developers to learn a global scale, a naming system, and a utility vocabulary.

- For common layout and color work, developers can compose utility classes quickly.
- For component work, they need to know when to use component tokens versus functional tokens versus raw overrides.
- Safe changes are guided by documented scales, but the cost is that the mental model is fairly large and split across docs, utilities, and component source.

This is productive for teams that are already fluent in Primer. It is heavier than what we want if we are trying to keep RAC styling small and locally obvious.

## Compact Variant

Primer would express `compact` in multiple layers.

- Global knobs: smaller spacing scale values, especially for stack gaps, padding, and control spacing.
- Semantic tokens: density-aware values like `condensed` versus `normal` for layout and padding.
- Component overrides: per-component size classes like `.btn-sm` or component-specific tokens such as `button-*-bgColor-*` and `buttonCounter-*`.

The structure is workable, but it is not especially compact in terms of authoring surface area. It tends to add a density vocabulary rather than collapsing everything into one simple knob.

## What Users Complain About

The strongest complaint signals are transition and clarity problems, not just aesthetics.

- Users asked when Primer would move from SCSS variables to CSS custom properties.
- Users asked how to overwrite variables in Sass and how the theming model works.
- There is an explicit discussion about SASS compile errors caused by newer SCSS features and the fact that users may need precompiled CSS instead.
- The repo itself says Primer CSS is KTLO, which is another signal that the old CSS surface is no longer the primary investment area.

That points to a maintenance burden and a confusing migration story.

Source links: [Primer CSS discussions](https://github.com/primer/css/discussions) for the threads titled `What's the timeline for moving to custom properties?`, `Theming is unclear to me.`, `Overwrite variables with sass`, and `SASS compile error`; [SASS compile error](https://github.com/primer/css/discussions/2513); [Primer CSS repo README](https://github.com/primer/css).

## Source Links

- [Primer CSS repo README](https://github.com/primer/css)
- [Primer CSS root source](https://raw.githubusercontent.com/primer/css/main/src/index.scss)
- [Primer CSS core source](https://raw.githubusercontent.com/primer/css/main/src/core/index.scss)
- [Primer CSS product source](https://raw.githubusercontent.com/primer/css/main/src/product/index.scss)
- [Primer CSS base source](https://raw.githubusercontent.com/primer/css/main/src/base/base.scss)
- [Primer CSS typography utilities source](https://raw.githubusercontent.com/primer/css/main/src/utilities/typography.scss)
- [Primer CSS color utilities source](https://raw.githubusercontent.com/primer/css/main/src/utilities/colors.scss)
- [Primer CSS button source](https://raw.githubusercontent.com/primer/css/main/src/buttons/button.scss)
- [Primer Primitives repo README](https://github.com/primer/primitives)
- [Primitives](https://primer.style/product/primitives/)
- [Colors utility docs](https://www.primer.style/product/css-utilities/colors/)
- [Color considerations](https://primer.style/accessibility/design-guidance/color-considerations/)
- [Size](https://primer.style/product/primitives/size/)
- [Typography](https://primer.style/product/primitives/typography/)
- [Token names](https://primer.style/product/primitives/token-names/)
