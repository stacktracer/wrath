# React Spectrum

## Could we adopt the library itself as a dependency, instead of just taking inspiration from it and rolling our own?

Probably not for our target use case.

React Spectrum is positioned as a complete implementation of Spectrum, Adobe’s design system, with strong accessibility and cross-device behavior built in. The docs and maintainers are explicit that customizing Spectrum styling is discouraged and that `UNSAFE_className` / `UNSAFE_style` are last-resort escape hatches, not a supported customization path. For a team that wants plain CSS, RAC-style direct selectors, and local ownership of styling decisions, React Spectrum is a mismatch unless we are willing to accept the Spectrum visual language as the product baseline.

The official guidance for teams that want their own design system is to start from React Aria Components and own all styling, rather than forking or heavily overriding React Spectrum.

## What are the token tiers, and how are they named?

There are two closely related token stories here:

1. In React Spectrum theming, a `Theme` object is split into `global`, `light`, `dark`, `medium`, and `large` CSS modules. `global` is shared across schemes and scales; the others vary by color scheme or platform scale.
2. In Spectrum CSS, the token package exposes CSS custom properties under the `@spectrum-css/tokens` package, and component CSS maps token-driven properties to `--spectrum-*` variables, with component-local customization hooks via `--mod-*` variables.

Naming is explicit and highly structured. At the token level, the naming looks like `--spectrum-global-color-blue-50` and similar `--spectrum-*` identifiers. That structure is friendly for consistency but large and highly prescriptive.

## How do semantic tokens differ from component-local tokens?

React Spectrum itself does not present a clean, public “semantic token versus component token” taxonomy the way we are thinking about it. Instead, the public docs expose:

1. Global theme modules for cross-cutting values.
2. Spectrum color/spacing/size values consumed by style props.
3. Component-local overrides only through unsafe props or internal CSS variables in the Spectrum CSS ecosystem.

In Spectrum CSS, the useful distinction is practical rather than conceptual:

1. `@spectrum-css/tokens` provides the shared design-token layer.
2. Component CSS consumes those tokens through `--spectrum-*` values.
3. Component-specific `--mod-*` hooks exist for per-component overrides.

That is workable, but it is not the small, intentionally named semantic-token layer we want for RAC. It is closer to “system tokens plus per-component knobs” than to a clean, curated semantic vocabulary.

## How are variants expressed?

Variants are expressed in a few different ways:

1. React Spectrum components expose limited variant props and style props, but the docs are clear that internal styles are not generally open to override.
2. Theme variants are expressed through `Provider` theme selection plus `colorScheme` and `scale`.
3. In Spectrum CSS, visual-language variants are expressed with context classes like `.spectrum`, `.spectrum--legacy`, `.spectrum--express`, `.spectrum--medium`, `.spectrum--large`, `.spectrum--light`, and `.spectrum--dark`.

For a `compact`-style requirement, React Spectrum does not really advertise a first-class “compact mode” abstraction. You would mostly be expected to build a custom component or use limited layout props, not globally retune component density.

## How are interactive states styled?

Interactive states are mostly handled inside the library/component system rather than by consumers styling states directly.

In the S2 style macro, conditional styling can target UI states like hover, press, selected, disabled, and forced-colors. Conditions are expressed as object keys, and the last matching condition wins. The macro uses cascade layers to avoid specificity problems.

For direct Spectrum components, consumers are intentionally shielded from the internal DOM and CSS. The docs emphasize that stateful internal styles like padding, colors, borders, and text styles are not intended to be overridden. That gives good guardrails, but it also limits our ability to style RAC components directly with `data-*` selectors in the way we want.

## How are themes and dark mode handled?

Themes are central to the model.

React Spectrum automatically tracks operating-system color scheme via `prefers-color-scheme`, and `Provider` can force a color scheme with `colorScheme="light"` or `colorScheme="dark"`. Theme objects can also be nested, so a subtree can adopt a different scheme or scale. The default theme set includes `defaultTheme`, `darkTheme`, and `lightTheme`.

Scale is separate from color: `medium` and `large` are used for fine pointer versus coarse pointer contexts, with `Provider scale` available as an override.

For our purposes, the important point is that React Spectrum treats theme as a first-class system concern rather than a local component concern. That is coherent, but it is not the same thing as lightweight local CSS ownership.

## What are the escape hatches?

There are two main escape hatches in the public React Spectrum docs:

1. `UNSAFE_className`
2. `UNSAFE_style`

They are explicitly described as risky and not for long-term use. The rationale is that internal DOM or CSS changes can break overrides. Spectrum also provides a `View` component and the S2 `style` macro for limited, supported customization, but those only cover a constrained set of properties.

In Spectrum CSS, the escape hatch is the `--mod-*` variable family for component-specific overrides, plus custom properties at theme/context boundaries. That is more CSS-native than `UNSAFE_*`, but it still pushes developers into framework-specific conventions instead of plain CSS authored locally.

## What parts are compatible or incompatible with our constraints?

Compatible:

1. The core idea of tokens layered under component styles.
2. Themes that can be nested and can switch color scheme / scale coherently.
3. Strong attention to accessibility and predictable interactive behavior.

Incompatible or a poor fit:

1. Consumers are not meant to style internal component details freely.
2. The supported customization surface is intentionally narrow.
3. The ecosystem leans on framework-specific abstractions like the `style` macro and `UNSAFE_*` props rather than plain CSS authored directly against stable `data-*` hooks.
4. React Spectrum’s recommended path for “build your own design system” is React Aria Components, not Spectrum customization.

## What is the day-to-day authoring experience for app developers? How much do they need to learn before they can make safe changes?

For safe changes, developers mostly learn:

1. `Provider`
2. Theme selection and `colorScheme` / `scale`
3. Limited style props such as margin, width, flex, and positioning
4. The difference between supported layout customization and unsupported internal styling

That is a relatively small learning surface if you stay inside the guardrails. The tradeoff is that once developers need meaningful visual customization, the path gets steep fast: they either accept the Spectrum baseline, use limited props, or move into unsafe/custom/forked territory.

## For a concrete case like a `compact` variant, how would this system express the global knobs, the semantic tokens, and the component-specific overrides?

My read is that React Spectrum would not express this as a clean “compact variant” stack for consumers.

What would be available:

1. Global knobs: theme `scale` and possibly alternate theme modules.
2. Semantic layer: Spectrum color/spacing values inside the supported style system.
3. Component-specific overrides: limited and mostly unsupported, or internal to Spectrum CSS via `--mod-*` variables.

If we tried to model `compact` in React Spectrum, we would likely have to do it by creating a separate theme or by forking component styles. That is much heavier than the kind of semantic-to-component token layering we are trying to design.

## What do users complain about?

The common complaints in the discussions I found are consistent:

1. People want to customize fonts or brand-specific styling, but the supported path is narrow.
2. People want to use Spectrum as a base and tweak it, but maintainers say that is not officially supported.
3. Teams with more complex apps feel blocked by S2 feature gaps or by the effort required to move off S1.
4. The safe styling model is seen as restrictive compared with using React Aria Components plus custom styling.

The maintainer guidance is consistent as well: if you need substantial visual ownership, use React Aria Components and own the styles yourself.

## Links used

- [React Spectrum README](https://github.com/adobe/react-spectrum) and repo overview lines about React Spectrum vs React Aria.
- [React Spectrum theming docs](https://react-spectrum.adobe.com/v3/theming.html).
- [React Spectrum styling docs](https://react-spectrum.adobe.com/v3/styling.html).
- [React Spectrum S2 styling docs](https://react-spectrum.adobe.com/styling).
- [Spectrum CSS README](https://github.com/adobe/spectrum-css).
- [Discussion #2385: Custom fonts as default](https://github.com/adobe/react-spectrum/discussions/2385).
- [Discussion #6231: React Aria Components with Spectrum CSS](https://github.com/adobe/react-spectrum/discussions/6231).
- [Discussion #7398: S2 Styles Question](https://github.com/adobe/react-spectrum/discussions/7398).
