# Tailwind Inventory

Tailwind CSS is not a component library, so there is no public component catalog to list.

The official docs describe Tailwind as a utility-first CSS framework that scans source files, generates styles, and exposes design tokens and CSS directives rather than reusable UI components.

## Closest Public Building Blocks

These are the public Tailwind-facing primitives that matter if you are trying to understand the project’s API surface:

- `@import` for pulling in Tailwind CSS
- `@theme` for defining theme variables and design tokens
- `@source` for adding source files to class detection
- `@utility` for defining custom utilities
- `@variant` for applying variants in authored CSS
- `@custom-variant` for defining custom variants
- `@apply` for inlining utility classes in custom CSS
- `@reference` for importing theme context without emitting duplicate CSS
- `@config` for legacy JavaScript config compatibility
- `@plugin` for legacy plugin compatibility
- `--alpha()` and `--spacing()` as Tailwind-specific build-time functions
- generated utility classes such as spacing, color, typography, layout, and state variants
- Preflight base styles

## What This Means For RAC

There is no Tailwind-equivalent list of components like `Button`, `Dialog`, or `Table`.

If we were treating Tailwind as a prior-art reference for RAC styling, the closest comparable surfaces would be:

- design tokens in `@theme`
- utility generation
- custom variants
- base styles / Preflight

## Sources

- Official docs home: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- Utility-first overview: [Styling with utility classes](https://tailwindcss.com/docs/utility-first/)
- Functions and directives: [Functions and directives](https://tailwindcss.com/docs/functions-and-directives)
- Theme variables: [Theme variables](https://tailwindcss.com/docs/customizing-spacing/)
- Preflight: [Preflight](https://tailwindcss.com/docs/preflight/)
- Compatibility: [Compatibility](https://tailwindcss.com/docs/compatibility)
- Official repository README: [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss)
