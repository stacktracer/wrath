# Tailwind

## Could We Adopt The Library Itself?

Probably not as the primary styling foundation for our RAC + plain CSS constraints. Tailwind v4 still centers styling in utility classes, even though it now exposes more of its system through CSS directives and variables. That is a good fit for teams willing to author styles in markup, but it is a mismatch for a workflow that wants direct CSS selectors on RAC `data-*` state hooks.

Tailwind is still worth studying because it shows how far a CSS-variable-driven token system can go, and it has a workable story for custom variants, selector-scoped dark mode, and shared theme CSS. But if we adopt anything here, I think it is the token/variant structure rather than the library itself. This is an inference from the docs and discussions below.

## Token Tiers And Naming

Tailwind v4 has one explicit token layer: `@theme` variables. The namespaces are the API boundary. For example, `--color-*` generates color utilities, `--spacing-*` generates spacing and sizing utilities, `--radius-*` generates rounding utilities, and `--breakpoint-*` generates responsive variants. The docs list the main namespaces and map them directly to utility families rather than to semantic component concepts.

The default theme lives in the source repo as a large `@theme default { ... }` block in [`packages/tailwindcss/theme.css`](https://github.com/tailwindlabs/tailwindcss/blob/main/packages/tailwindcss/theme.css#L1251-L2108). It includes low-level primitives like `--color-red-50`, `--spacing`, `--breakpoint-sm`, `--radius-md`, and `--shadow-md`, plus derived defaults such as `--default-font-family`.

What Tailwind does not give you is a built-in semantic/component split. A team can invent semantic names like `--color-primary` or `--text-muted`, but Tailwind treats those as theme variables that generate utilities, not as a distinct semantic token tier. Component-local tokens are therefore just ordinary CSS custom properties or custom CSS rules layered on top.

## Semantic Versus Component-Local Tokens

Tailwind’s theme variables are global by default and intended to be reused across the whole system. The docs explicitly say theme variables are turned into regular CSS variables at compile time, and that shared theme CSS can be imported from other projects or published as a package.

For component-local differences, Tailwind expects ordinary CSS. You can add rules in `@layer components`, use custom CSS, or reference theme variables from component rules. There is no special component-token mechanism beyond that.

One important wrinkle is selector-scoped tokens. A discussion about `@theme` variables defined under `[data-theme]` selectors shows that plain aliasing can fail in v4 unless you use `@theme inline`, because otherwise generated utilities resolve through the wrong variable layer. That makes selector-scoped theming possible, but not especially frictionless.

## Variants

Variants are a first-class part of the system. Built-in variants cover pseudo-classes, pseudo-elements, responsive breakpoints, container queries, media queries, ARIA state, `data-*` attributes, RTL/LTR, open state, inert state, and more. They stack, so you can combine things like `dark:md:hover:*`.

Tailwind also lets you define custom variants with `@custom-variant`, and use variants inside authored CSS with `@variant`. For RAC specifically, the `data-*` story is compatible in principle because Tailwind already supports `data-[...]` utilities and custom attribute-based variants such as the documented `data-theme` example in the dark-mode guide.

The tradeoff is that the state logic still lives in utility prefixes, not in direct selectors in authored CSS. That is powerful, but it pushes more mental load into class strings.

## Interactive States

Tailwind covers the usual interactive states well: `hover`, `focus`, `focus-visible`, `active`, `disabled`, `aria-*`, `data-[...]`, `group-*`, and `peer-*`. The docs are explicit that these variants are designed so you can style conditional states without leaving the markup.

For our constraints, the useful part is that Tailwind understands the same state sources RAC exposes through `data-*` attributes. The less useful part is that the idiom is still utility-first, so the authoring surface is different from “plain CSS selectors targeting RAC state attributes.”

## Themes And Dark Mode

Tailwind’s default dark mode is driven by `prefers-color-scheme`. If you want selector-driven dark mode, you override the `dark` variant with `@custom-variant dark (&:where(.dark, .dark *));` or with a data attribute selector such as `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));`.

The source repo’s [`preflight.css`](https://raw.githubusercontent.com/tailwindlabs/tailwindcss/main/packages/tailwindcss/preflight.css) and `theme.css` show the split cleanly: Preflight is a base reset, and theme variables are emitted as global CSS variables. The docs also note that if you import Tailwind piecemeal, options like `theme(static)` and `theme(inline)` belong on the `theme.css` import, while `source()` belongs on `utilities.css`.

My read is that Tailwind’s theming model is very good at global theme switches, including data-attribute-driven theme switching, but it is not optimized for many small local theme islands unless you are comfortable with the CSS-directive syntax and its edge cases.

## Escape Hatches

Tailwind has a lot of them:

- Plain CSS alongside Tailwind.
- `@layer base` and `@layer components`.
- `@utility` for custom utilities.
- `@variant` for using variants in authored CSS.
- `@custom-variant` for project-specific variants.
- Arbitrary values and arbitrary variants.
- `@apply` for inlining utilities into custom CSS.
- `@reference` for Vue, Svelte, or CSS modules that need access to theme vars and utilities.
- `@source` for files not discovered by automatic content scanning.
- `@config` and `@plugin` for legacy v3 compatibility.

This is a lot of escape surface. It is flexible, but it also means the framework can be bent in several incompatible directions at once.

## Compatibility With Our Constraints

Strong fits:

- CSS variables are first-class.
- `data-*` and ARIA state selectors are supported.
- Dark mode can be driven by a class or data attribute.
- Shared theme CSS can be imported and reused.
- Tailwind’s token namespaces make it easy to think in coarse global knobs.

Weak fits:

- The center of gravity is utility classes in markup, not plain CSS selectors.
- There is no dedicated semantic-token versus component-token split.
- Preflight is opinionated and global by default.
- The CSS directive syntax adds another language surface that mixed-experience teams must learn.

## Day-To-Day Authoring Experience

Tailwind is productive once the team internalizes the utility vocabulary and the token namespaces. A developer can usually make safe changes by adjusting theme variables or by adding a utility class, but “safe” depends on knowing which namespace controls which output and how variants compose.

The docs and discussion threads suggest that the v4 CSS-first experience is still mentally expensive for many users. This is especially true for teams migrating from `tailwind.config.js`, teams using `resolveConfig` in JS, and teams who need Tailwind values in runtime code. My inference is that Tailwind shifts the burden from JavaScript config knowledge to CSS-directive and utility-syntax knowledge rather than removing the burden.

## Compact Variant Thought Experiment

For a `compact` mode, Tailwind would probably model the global knobs by overriding spacing, radius, and maybe shadow theme variables in a compact theme file or selector-scoped theme block. Component-level differences would then be layered in `@layer components` or via custom utilities for any one-off padding, gap, or density exceptions.

What it would not give us is a clean semantic/component token ladder out of the box. We would still need to decide which adjustments belong in theme variables, which belong in shared component CSS, and which belong in component-specific overrides. Tailwind supports that split mechanically, but it does not prescribe a strong architecture for it.

## What Users Complain About

The recurring complaints in Tailwind’s own discussions are:

- CSS configuration in v4 is harder to discover than `tailwind.config.js`, and some users see it as a step backward for IDE support and maintainability.
- `@apply` feels under-documented or broken in v4 for some real projects, especially outside Vue/Svelte-style component CSS.
- `resolveConfig` removal or de-emphasis breaks JS consumers that used Tailwind as a runtime design-token source.
- `@theme` plus selector-scoped variables can be surprising, especially with `data-theme` and `inline`.
- Preflight/global reset behavior is still a source of confusion, especially when importing Tailwind into existing apps or libraries.

## Sources

- [Theme variables docs](https://tailwindcss.com/docs/customizing-spacing/)
- [Adding custom styles docs](https://tailwindcss.com/docs/adding-custom-styles)
- [Hover, focus, and other states docs](https://tailwindcss.com/docs/hover-focus-and-other-states)
- [Dark mode docs](https://tailwindcss.com/docs/dark-mode)
- [Functions and directives docs](https://tailwindcss.com/docs/functions-and-directives)
- [Preflight docs](https://tailwindcss.com/docs/preflight)
- [Tailwind source `theme.css`](https://github.com/tailwindlabs/tailwindcss/blob/main/packages/tailwindcss/theme.css)
- [Tailwind source `preflight.css`](https://raw.githubusercontent.com/tailwindlabs/tailwindcss/main/packages/tailwindcss/preflight.css)
- [Discussion: CSS config is a terrible idea](https://github.com/tailwindlabs/tailwindcss/discussions/15531)
- [Discussion: `@theme` with data-theme selectors](https://github.com/tailwindlabs/tailwindcss/discussions/15122)
- [Issue: cannot disable preflight styles](https://github.com/tailwindlabs/tailwindcss/issues/15723)
- [Discussion: global reset affecting imported libraries](https://github.com/tailwindlabs/tailwindcss/discussions/16597)
- [Discussion: `@apply` broken in v4](https://github.com/tailwindlabs/tailwindcss/discussions/16429)
- [Discussion: `resolveConfig` in Tailwind 4](https://github.com/tailwindlabs/tailwindcss/discussions/14764)
