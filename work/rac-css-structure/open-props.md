# Open Props

## Could we adopt the library itself as a dependency, instead of just taking inspiration from it and rolling our own?

Open Props is adoptable as a dependency for token primitives, but it is not a component library and it does not solve RAC-specific styling. The project explicitly ships CSS, PostCSS, JSON, and JavaScript entry points, plus optional scoped and prefixed builds, so it is easy to consume as raw design tokens.

For our purposes, the useful part is the token substrate: colors, spacing, radii, shadows, motion, media, and theme aliases. The part it does not provide is the semantic/component layer we need for RAC states, component ownership, and local overrides. So the library is plausible as an upstream source of values, but not as a replacement for our own CSS architecture.

## What are the token tiers, and how are they named?

Open Props is mostly a flat token system organized into prop packs rather than a deep token hierarchy. The main packs are colors, gradients, shadows, aspect ratios, typography, easings, animations, sizes, borders, z-indexes, and media queries.

The naming is scale-based and terse:

- Colors are hue scales like `--gray-0` through `--gray-12`, `--blue-0` through `--blue-12`, and so on.
- Sizing is `--size-*`, `--size-fluid-*`, `--size-content-*`, `--size-header-*`, plus `--size-xxs` through `--size-xxl`.
- Typography uses `--font-size-00` through `--font-size-8` and `--font-size-fluid-0` through `--font-size-fluid-3`.
- Geometry uses `--radius-1` through `--radius-6`, `--border-size-1` through `--border-size-5`, and `--shadow-1` through `--shadow-6`.
- Z-index uses `--layer-1` through `--layer-5`, plus `--layer-important`.

There is also a semantic theme layer in the docs: `--brand`, `--text-1`, `--text-2`, and `--surface-1` through `--surface-4`, with theme-specific values like `--text-1-light` and `--text-1-dark`.

## How do semantic tokens differ from component-local tokens?

Semantic tokens are the theme-agnostic aliases that downstream code is meant to consume. In the docs, `--text-1`, `--surface-1`, and similar names are remapped to light or dark values so component CSS can stay theme-neutral.

Component-local tokens are not a first-class concept in the core library. Open Props expects downstream authors to create local custom properties when a component needs private tuning. The docs' example with `--_accent-1`, `--_accent-2`, `--_bg`, and `--_ink` is the clearest pattern here: underscore-prefixed variables are local scratch space, not shared system tokens.

That means Open Props gives us good raw material for a semantic layer, but we would still need to define the actual semantic vocabulary for our app.

## How are variants expressed?

Variants are expressed mostly by choosing different imports, not by changing a component API. Examples in the docs include `normalize.light.css`, `normalize.dark.css`, `theme.light.switch.min.css`, `theme.dark.switch.min.css`, `buttons.*`, and shadow-DOM-scoped or prefixed builds.

The repo also ships multiple versions of the same token family, such as `colors.css`, `colors-hsl.css`, `colors-oklch.css`, and `shadows.light.css` / `shadows.dark.css`. Those are token-form variants, not semantic component variants.

There is no built-in `compact` concept. If we used Open Props, a compact variant would still be something we define on top of it.

## How are interactive states styled?

The core prop packs do not style interactive states for you. State styling is left to downstream CSS. The docs show ordinary selectors like `:hover` and state-gated motion with `@media (--motionOK)`.

Open Props does provide environment-state custom media like `--motionOK`, `--motionNotOK`, `--OSdark`, `--forcedColors`, and `--highContrast`. Those help with motion and accessibility gating, but they are not component interaction states.

That is compatible with RAC's `data-*` selectors, but Open Props does not prescribe or optimize for that pattern.

## How are themes and dark mode handled?

Themes are one of the stronger parts of Open Props. The docs say normalize has light and dark built in, and the theme-switch imports scope the same values to selectors. The selector set includes `.light`, `.light-theme`, `[data-theme="light"]`, and the matching dark forms.

Theme handling is alias-based: theme-specific variables like `--text-1-light` and `--text-1-dark` feed theme-agnostic aliases like `--text-1`. That keeps downstream component CSS from needing to know whether the current mode is light or dark.

Some packs also adapt directly to OS color scheme. The shadows pack, for example, changes `--shadow-color`, `--shadow-strength`, and inner-shadow highlights under `@media (--OSdark)`.

## What are the escape hatches?

Open Props offers a lot of escape hatches:

- Import only the packs you want.
- Use the JS or JSON outputs instead of CSS.
- Use the PostCSS path when you want generated imports.
- Generate prefixed builds with `--op-*` names.
- Generate `:host`-scoped builds for shadow DOM.
- Use selector-based theme switch imports for subtree overrides.
- Define local `--_foo` variables when a single component needs a private override.

That makes it flexible, but it also means the library is permissive rather than enforcing much structure.

## What parts are compatible or incompatible with our constraints?

Compatible:

- It is plain CSS first, with optional JS and JSON exports.
- It is token-oriented, so it can fit a RAC + plain CSS stack well.
- Its selector-based theme switching can coexist with RAC `data-*` styling.

Incompatible or awkward:

- `@custom-media` is explicitly tied to PostCSS support, so some of the nicer media-query conveniences are not native plain CSS.
- The system is global and utility-like, not component-owned, so it does not give us local guardrails by itself.
- It does not model RAC state or component variants directly.
- CDN usage is at odds with our offline/vendored posture, even though npm consumption is fine.

## What is the day-to-day authoring experience for app developers? How much do they need to learn before they can make safe changes?

The day-to-day experience is straightforward if developers stay inside the documented scales. The naming is predictable, the docs are example-heavy, and the surface area is intentionally broad but shallow.

The main thing developers need to learn is which prop pack to reach for and which alias tier to use. After that, safe changes are mostly a matter of choosing the right scale value and not inventing one-off numbers.

The harder work happens one layer above the library: deciding what the semantic aliases should be for our app. Open Props does not answer that for us, so a team can move quickly using it, but still drift if the semantic layer is not designed carefully.

## For a concrete case like a `compact` variant, how would this system express the global knobs, the semantic tokens, and the component-specific overrides?

Open Props does not define compactness itself, so we would have to build that structure on top of it.

- Global knobs: reduce the consumed `--size-*`, `--size-fluid-*`, `--radius-*`, and maybe `--shadow-*` values in a compact subtree or compact theme.
- Semantic tokens: define density aliases like `--space-control`, `--space-inline`, `--space-stack`, `--control-height`, and `--icon-text-gap`, then map them to smaller Open Props values in compact mode.
- Component-specific overrides: override local component vars only where the semantic layer is still too coarse, for example a table row, tree row, or menu item that needs a special spacing adjustment.

That is a workable pattern, but the compactness logic would live in our CSS, not in Open Props itself.

## What do users complain about?

The open issues and PR titles show recurring friction around setup and ergonomics rather than around the token values themselves.

- `Installation is Confusing`
- `Add a more detailed documentation on setup`
- `Using container as custom media queries`
- `Reduced motion by default for Animations`
- `Handle Closed <dialog> and <popover> Animations`
- `Logical Animation Directions`
- `Add trig helper props and some @property props for animation`
- `Lightning CSS to replace postcss build commands`

The pattern is pretty clear: users like the token idea, but they want easier setup, better motion/media ergonomics, and more automation around the build pipeline.

## Sources

- https://open-props.style/
- https://github.com/argyleink/open-props
- https://github.com/argyleink/open-props/blob/main/src/index.css
- https://raw.githubusercontent.com/argyleink/open-props/refs/heads/main/src/props.colors.css
- https://raw.githubusercontent.com/argyleink/open-props/refs/heads/main/src/props.sizes.css
- https://raw.githubusercontent.com/argyleink/open-props/refs/heads/main/src/props.shadows.css
- https://raw.githubusercontent.com/argyleink/open-props/refs/heads/main/src/props.media.css
- https://open-props.style/?source=techstories.org
- https://github.com/argyleink/open-props/issues
- https://github.com/argyleink/open-props/pulls
- https://github.com/argyleink/open-props/issues/536
