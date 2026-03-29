# Reset / Preflight

## Conclusion

Do not make a broad reset or preflight layer part of the RAC + plain CSS styling foundation.

If we need any baseline normalization at all, keep it opt-in, narrow, and colocated with the host app or page shell. The default architecture should start from authored component CSS and stable `data-*` hooks, not from a global stylesheet that silently rewrites browser defaults across the document.

## Why

- Tailwind’s Preflight is explicitly opinionated and global. Its own docs show it resets margins, borders, headings, lists, images, form controls, placeholders, and hidden handling across the document. That is useful when Tailwind owns the whole stack, but it is exactly the kind of hidden coupling that becomes painful in mixed systems.
- Tailwind’s docs also say Preflight can be disabled by omitting its import, which is a strong signal that even Tailwind treats it as optional rather than mandatory.
- The Tailwind v4 issue tracker and discussions show real confusion around disabling Preflight and real breakage when a library’s reset leaks into a larger app. That is the failure mode we want to avoid for RAC.
- Radix Themes documents a concrete collision where Tailwind base styles interfere with its buttons. Their recommended workarounds are all about isolating or removing the global base layer, which reinforces the same lesson.
- Primer’s base styles are much smaller and more targeted than Tailwind’s Preflight, but they are still global. They show that a narrow base can help, yet they also underline that any global reset should stay minimal and deliberate.
- Open Props is the closest example of a gentler baseline: its normalize story is minimal and theme-aware rather than a broad opinionated reset. That is a better shape if we ever decide we need one.

## Practical Stance

- Default: no reset/preflight in the core RAC styling package.
- Acceptable fallback: a small normalize file for app shells or host pages, limited to boring browser inconsistencies.
- Not acceptable as the default: rewriting headings, lists, form controls, borders, and replaced elements in a way that changes the authoring baseline everywhere.
- If we ever add normalization, keep it separate from token tiers and component styling so it is easy to opt into or omit.

## Sources

- [Tailwind Preflight docs](https://tailwindcss.com/docs/preflight)
- [Tailwind v4 issue: cannot disable preflight styles](https://github.com/tailwindlabs/tailwindcss/issues/15723)
- [Tailwind v4 issue: global reset affecting imported libraries](https://github.com/tailwindlabs/tailwindcss/issues/16552)
- [Tailwind discussion: global reset affecting imported libraries](https://github.com/tailwindlabs/tailwindcss/discussions/16597)
- [Tailwind source: preflight.css](https://raw.githubusercontent.com/tailwindlabs/tailwindcss/main/packages/tailwindcss/preflight.css)
- [Radix Themes styling docs](https://www.radix-ui.com/themes/docs/overview/styling)
- [Primer CSS base source](https://raw.githubusercontent.com/primer/css/main/src/base/base.scss)
- [Primer CSS discussions and utilities docs](https://www.primer.style/product/css-utilities/)
- [Open Props homepage](https://open-props.style/)
- [Open Props repo](https://github.com/argyleink/open-props)
