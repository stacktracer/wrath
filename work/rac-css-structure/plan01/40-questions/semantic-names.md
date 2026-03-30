# Semantic Names

## Conclusion

The semantic layer should be made of generic, cross-cutting roles, not component-shaped nouns.

Use names like `control-*`, `surface-*`, `border-*`, `focus-*`, and `overlay-*` for things that recur across multiple components and can stay stable as the UI evolves. That is the pattern the stronger prior art converges on: Primer explicitly recommends generic pattern names like `control` for buttons, inputs, and ActionList items, Open Props keeps its semantic layer to broad roles like `text-*` and `surface-*`, and Radix Themes organizes semantics around shared color/surface roles rather than per-component anatomy.

Do not promote `icon-text-gap`, `row-padding-x`, or `panel-padding` into the semantic tier by default. Those names are too specific to one layout or one component family. If they are needed at all, they belong in component-local tokens, ideally with an obvious private naming convention.

## Practical Rule

If a token can be reused unchanged in buttons, inputs, menus, rows, and trees, it can be semantic.
If it only makes sense for one component's anatomy, it should be local.

That means the semantic vocabulary should describe roles and relationships, not DOM fragments. Good semantic names answer questions like:

- What kind of surface is this?
- What kind of text or foreground role is this?
- What kind of border, focus, overlay, or accent role is this?
- What kind of reusable control spacing or density is this?

Bad semantic names answer questions like:

- Where exactly is this gap used?
- Which component currently owns this padding?
- Which row or panel happened to need this value first?

## What I Would Keep

A small shared set is enough. The names should be broad enough to stay reusable but narrow enough to be meaningful. I would expect families such as:

- `surface-*`
- `text-*` or `fg-*`
- `border-*`
- `focus-*`
- `overlay-*`
- `accent-*`
- `control-*`
- `density-*`
- `space-*`

`control-*` is the best example of a useful semantic family because it can cover multiple interactive components without collapsing into a single component name.

`text-*` is the least safe of the generic examples because it is easy to confuse with typography scales or text content. If we keep it, it should be reserved for foreground/text color roles only.

## What I Would Not Keep

I would not make these semantic names:

- `row-padding-x`
- `panel-padding`
- `icon-text-gap`

Those are useful values, but they are local implementation details unless the same relationship is truly shared by several unrelated components. If the concept is shared, promote it to a generic pattern name like `control-gap` or `control-padding-inline`. If it is not shared, keep it private to the component.

## Naming Boundary

The cleanest split is:

- shared semantic roles: generic, reusable, stable
- component-local tokens: private, specific, and easy to spot

Primer is the clearest source for this split. Its token docs explicitly say that the `control` pattern should be generic when possible, while component/pattern tokens are for component CSS only. Radix Themes and Open Props reinforce the same basic lesson: shared roles should stay broad, and narrow details should stay local.

## Sources

- [Primer token names](https://primer.style/product/primitives/token-names/)
- [Primer Primitives overview](https://primer.style/product/primitives/)
- [Radix Themes color docs](https://www.radix-ui.com/themes/docs/theme/color)
- [Radix Themes spacing docs](https://www.radix-ui.com/themes/docs/theme/spacing)
- [Radix Themes theme overview](https://www.radix-ui.com/themes/docs/theme/overview)
- [Open Props homepage](https://open-props.style/)
- [Tailwind theme variables docs](https://tailwindcss.com/docs/customizing-spacing/)
- [Tailwind dark mode docs](https://tailwindcss.com/docs/dark-mode)
- [Local notes: Primer](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/plan01/10-research/primer.md)
- [Local notes: Radix Themes](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/plan01/10-research/radix-themes.md)
- [Local notes: Open Props](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/plan01/10-research/open-props.md)
- [Local notes: Tailwind](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/plan01/10-research/tailwind.md)
