# Component-Local Token Naming

## Conclusion

Use a private prefix for component-local tokens, and standardize it across the RAC styling system. The convention I would pick is a leading underscore on local custom properties, with the component name after it when that helps searchability: for example, `--_button-ghost-padding-x`, `--_menu-icon-gap`, or `--_table-row-padding-y`.

That gives us three useful properties at once:

- shared semantic tokens stay obviously public, like `--surface-*`, `--text-*`, or `--control-*`
- component-private values are easy to spot in CSS review
- a token that starts with `--_` reads as implementation detail, not as part of the public design vocabulary

If a value is meant to be reused outside the owning component stylesheet, it should not be treated as component-local anymore. Promote it to the semantic layer or document it as an intentional public component token.

## Why This Convention

The prior art splits the problem in the same direction, even if the names differ:

- Open Props uses underscore-prefixed scratch variables like `--_accent-1`, `--_bg`, and `--_ink` for local component tuning.
- Spectrum CSS uses `--mod-*` variables as component-specific override hooks.
- Primer keeps shared naming distinct from component/pattern naming, which makes it clear when a token is only meant for a specific component family.
- Radix Themes uses component-scoped names such as `--button-ghost-padding-x`, but those names do not have a strong visual marker that they are private rather than semantic.

For our use case, the main goal is not just uniqueness. It is making the ownership boundary obvious to mixed-experience developers reading plain CSS directly.

## Practical Rule

- Shared semantic token: no private prefix.
- Component-local scratch token: `--_component-detail`.
- Documented public component knob, if we decide to expose one: keep it separate from private scratch vars so the boundary is obvious.

## Sources

- [Open Props docs](https://open-props.style/)
- [Open Props source / examples](https://github.com/argyleink/open-props)
- [Primer token names](https://primer.style/product/primitives/token-names/)
- [Spectrum CSS repo README](https://github.com/adobe/spectrum-css)
- [Radix Themes button docs](https://www.radix-ui.com/themes/docs/components/button)
- [Local notes: open-props.md](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/open-props.md)
- [Local notes: primer.md](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/primer.md)
- [Local notes: radix-themes.md](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/radix-themes.md)
