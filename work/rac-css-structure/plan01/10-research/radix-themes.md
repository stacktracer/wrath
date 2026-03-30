# Radix Themes

## Sources

- Docs: https://www.radix-ui.com/themes/docs/overview/styling
- Docs: https://www.radix-ui.com/themes/docs/overview/getting-started
- Docs: https://www.radix-ui.com/themes/docs/theme/overview
- Docs: https://www.radix-ui.com/themes/docs/theme/color
- Docs: https://www.radix-ui.com/themes/docs/theme/dark-mode
- Docs: https://www.radix-ui.com/themes/docs/theme/spacing
- Docs: https://www.radix-ui.com/themes/docs/components/theme
- Docs: https://www.radix-ui.com/themes/docs/components/button
- Docs: https://www.radix-ui.com/themes/docs/components/badge
- Docs: https://github.com/radix-ui/themes
- Source: https://raw.githubusercontent.com/radix-ui/themes/main/packages/radix-ui-themes/src/styles/index.css
- Source: https://raw.githubusercontent.com/radix-ui/themes/main/packages/radix-ui-themes/src/styles/tokens/base.css
- Source: https://raw.githubusercontent.com/radix-ui/themes/main/packages/radix-ui-themes/src/styles/tokens/color.css
- Source: https://raw.githubusercontent.com/radix-ui/themes/main/packages/radix-ui-themes/src/components/button.tsx
- Source: https://raw.githubusercontent.com/radix-ui/themes/main/packages/radix-ui-themes/src/components/button.css
- Source: https://raw.githubusercontent.com/radix-ui/themes/main/packages/radix-ui-themes/src/components/badge.tsx
- Discussion/issue pages used for user-reported friction:
    - https://github.com/radix-ui/themes/issues/761
    - https://github.com/radix-ui/themes/issues
    - https://github.com/radix-ui/themes/discussions

## Could We Adopt The Library Itself?

Probably not as the styling foundation for our RAC work.

Radix Themes is a React component library, not just a token set. Its own styling model is built around curated component props, internal CSS classes, and a root `Theme` provider. That is useful if we want to use Radix Themes components directly, but it is a mismatch for our goal of styling RAC components directly with `data-*` selectors and owning the CSS locally.

What _is_ attractive is the token layer and the general discipline:

- vanilla CSS under the hood
- CSS variables as the public styling surface
- a small number of theme knobs
- a bias toward coherent defaults over unrestricted overrides

If we adopted anything here, it would be the token philosophy and some naming patterns, not the component library wholesale.

## Token Tiers And Naming

Radix Themes is effectively a two-and-a-half tier system:

- Primitive scales and aliases: `--space-1` through `--space-9`, `--font-size-*`, `--line-height-*`, `--letter-spacing-*`, `--radius-*`, `--shadow-*`, and color steps like `--gray-1` through `--gray-12` and the other palette steps.
- Semantic theme tokens: `--color-background`, `--color-overlay`, `--color-panel-solid`, `--color-panel-translucent`, `--color-surface`, plus functional color tokens such as `--gray-surface`, `--gray-indicator`, `--gray-track`, `--gray-contrast`, and the corresponding accent/focus tokens.
- Component-local tokens: component CSS introduces its own private variables when needed. The clearest example I found is Button’s `--button-ghost-padding-x` and `--button-ghost-padding-y`.

The naming is very regular. Numeric scales are small and predictable, while semantic tokens are descriptive and tied to UI function rather than component names.

## Semantic Tokens Vs Component-Local Tokens

The semantic layer is shared across the whole system. It describes surfaces, backgrounds, overlays, focus, and the meaning of a color role. Those tokens are intended to be reused across multiple components and custom pieces.

Component-local tokens exist only when a specific component needs internal tuning. Button’s ghost variant is a good example: it uses local padding variables to preserve optical alignment without leaking that behavior into the rest of the system.

That separation is the main strength of the system. The weak point, from our perspective, is that the semantic layer is still tightly bound to Radix Themes’ component vocabulary, not to a generic RAC-style state model.

## Variants

Variants are mostly prop-driven and intentionally curated.

- Theme-level variants: `appearance`, `accentColor`, `grayColor`, `panelBackground`, `radius`, `scaling`, and `hasBackground`.
- Component-level variants: `variant`, `size`, `color`, `highContrast`, `radius`, `loading`, and `asChild`.

The docs present these as the supported customization surface. Source confirms that the component CSS maps those choices into internal classes such as `.rt-variant-ghost` and `.rt-r-size-1` rather than exposing a free-form styling API.

For Button, the visible variants are `classic`, `solid`, `soft`, `surface`, `outline`, and `ghost`. Badge exposes `solid`, `soft`, `surface`, and `outline`.

## Interactive States

Interactive states are handled inside the component styles, not as an open consumer-facing state contract.

- The docs say `asChild` adds styling for hover and focus states when a component renders as another element.
- Loading and disabled behavior are first-class component props on some components like Button.
- The source uses private CSS classes and internal styles for the state behavior rather than asking app authors to target state attributes.

That is a good guardrail for consistency, but it is the opposite of the RAC model we want here, where state is intentionally surfaced through `data-*` hooks for direct styling.

## Themes And Dark Mode

The `Theme` component is the central control plane. It can set `appearance`, `accentColor`, `grayColor`, `panelBackground`, `radius`, and `scaling`.

Dark mode is class-driven:

- root `Theme` defaults to light
- `appearance="dark"` forces dark appearance
- `next-themes` integration is explicitly documented using class switching
- the supported class names are `light`, `light-theme`, `dark`, and `dark-theme`

The color token source also reflects this model. It defines light values under `.radix-themes` and dark overrides under `.dark` / `.dark-theme`, with nested theme inheritance behavior.

## Escape Hatches

Radix Themes does have escape hatches, but they are controlled ones:

- `className` and `style` exist on most components
- `asChild` lets you swap the rendered element while keeping theme styles
- custom components are expected to reuse Theme tokens, Radix Primitives, and Radix Colors
- `tokens.css`, `components.css`, and `utilities.css` can be imported separately when you need control over CSS ordering
- individual color CSS files can be imported if bundle size matters
- portals can be wrapped in another `Theme` to restore token access

The docs also explicitly say that if you need to override a lot of styles, that is a signal to either use the component as-is, build your own component on the same building blocks, or reconsider whether Radix Themes is the right fit.

## Compatibility With Our Constraints

Compatible:

- The implementation is vanilla CSS, so there is no hidden CSS-in-JS runtime.
- CSS variables are the primary extension surface.
- The token discipline is strong and would be easy to mirror in plain CSS.

Incompatible:

- The public styling model is prop-driven, not `data-*` selector driven.
- Components are relatively closed, so broad stylistic divergence is not the intended use case.
- The system centers on Radix Themes components and their own props, which would add a second component vocabulary on top of RAC.
- The import-order caveats with Next.js and Tailwind are real friction points if our app grows a mixed CSS stack.

My read: Radix Themes is compatible as inspiration and as a token reference, but not as the primary dependency for this project unless we decide to abandon the direct-RAC styling model.

## Day-To-Day Authoring Experience

For app developers, the experience is intentionally constrained.

They mostly learn:

- the root `Theme` knobs
- per-component `size` / `variant` / `color` / `radius` props
- when `asChild` is appropriate
- which token family to use for custom components

That is a short learning curve for safe changes, which is a plus. The tradeoff is that more bespoke design work becomes harder, because the library discourages deep overrides and nudges authors back toward the token system or a custom component built from lower-level primitives.

## Compact Variant Example

Radix Themes does not have a single cross-component `compact` mode. The closest built-in mechanisms are:

- `Theme scaling="95%"` or another preset scaling value
- smaller component `size` props, such as `Button size="1"` or `Badge size="1"`
- `radius` and `panelBackground` adjustments at the theme level

For a compact data table or menu, I would expect this system to express the change as a mix of:

- global density via `Theme scaling`
- semantic token reuse for spaces, typography, and colors
- component-specific size props or local CSS variables where one component needs to diverge

The key limitation is that the compactness knob is not unified. It is distributed across global scaling, per-component sizes, and occasional local CSS overrides.

## What Users Complain About

The main complaints visible in the docs and issue tracker are about rigidity and integration friction:

- styles are relatively closed and hard to override
- Next.js import order can break the expected cascade
- Tailwind base styles can interfere with Radix Themes buttons
- custom portals need an extra `Theme` wrapper to inherit tokens
- users ask for more control over class-based styling and custom palettes

Representative links:

- https://github.com/radix-ui/themes/issues/761
- https://www.radix-ui.com/themes/docs/overview/styling
- https://www.radix-ui.com/themes/docs/overview/styling#common-issues
- https://www.radix-ui.com/themes/docs/overview/styling#tailwind
- https://github.com/radix-ui/themes/discussions

## Bottom Line For Our Project

Radix Themes is a good model for a small, coherent token system with clear global knobs and a controlled component API. It is not a good direct fit for our RAC experiment because it does not expose the kind of open `data-*`-driven styling contract we want.

The most reusable lesson is the split between a small semantic surface and a smaller set of component-local overrides, with disciplined naming and a strong preference for stable theme knobs over ad hoc CSS overrides.
