# Variant Surface

## Conclusion

Support only a very small set of first-class variant axes, and make them semantically specific instead of exposing a generic `variant` junk drawer.

My recommendation is:

- `size` or `density` for components whose geometry genuinely changes across a few stable modes.
- `tone` or `intent` for components where the public meaning depends on emphasis or status.
- structural variants like `orientation`, `placement`, or `icon-only` only when the component’s behavior or layout really changes, not just its pixels.

Everything else should stay in tokens, component-local CSS variables, or RAC `data-*` state hooks. In particular, hover/focus/selected/disabled/open are states, not public styling variants.

## Why This Boundary

The prior art is consistent about keeping variant vocabularies curated rather than open-ended.

- [Radix Themes](radix-themes.md) exposes a small set of props such as `size`, `variant`, `color`, and `radius`, but each component gets its own limited menu rather than a universal variant taxonomy.
- [Primer](primer.md) uses size and modifier variants like `btn-sm`, `btn-primary`, and `btn-danger`, but the class-based surface is still intentionally bounded.
- [React Spectrum](react-spectrum.md) is the cautionary example: it keeps the supported styling surface narrow and steers people away from arbitrary visual variants.
- [Tailwind](tailwind.md) shows the opposite extreme. It can represent almost any variant, but the mental model grows quickly once variants become a general-purpose language.
- [Open Props](open-props.md) does not really define component variants at all, which is a useful reminder that many visual differences are better handled as token selection than as a variant system.

The shared lesson is that variants are worth standardizing only when they are:

- repeated across multiple components or component families
- easy to name in a way that developers already understand
- large enough to justify a dedicated public axis
- stable enough that they will not become a dumping ground for one-off tweaks

## Practical Shape For RAC

For RAC + plain CSS, I would start with:

- `size` for components that have a real compact/regular/large geometry split.
- `tone` or `intent` for controls and status-bearing UI that need a tiny, well-defined set of visual roles.
- a few structural axes like `orientation` or `placement` only where they are part of the component contract.

I would not make every component support the same variant list. A button can reasonably have `size` and `tone`; a tree row may only need `density`-driven tokens; a dialog may not need any component variant beyond tokens and theme scope.

## What I Would Not Do

- I would not expose `loading`, `selected`, `open`, or `disabled` as styling variants. Those belong to RAC state attributes and component behavior.
- I would not create a broad `variant="..."` prop that accumulates unrelated meanings over time.
- I would not let color, spacing, or radius tweaks become their own variant family if tokens can already express them.
- I would not treat dark mode or subtree theming as component variants. Those are theme-scoped concerns.

If a change can be expressed as a token adjustment, it should usually stay a token adjustment. If it is a state, it should stay a state hook. Variants are for the few public choices that are genuinely part of the component’s contract.

## Sources

- `work/rac-css-structure/plan01/plan.md`
- `work/rac-css-structure/plan01/10-research/tailwind.md`
- `work/rac-css-structure/plan01/10-research/radix-themes.md`
- `work/rac-css-structure/plan01/10-research/primer.md`
- `work/rac-css-structure/plan01/10-research/open-props.md`
- `work/rac-css-structure/plan01/10-research/react-spectrum.md`
- https://tailwindcss.com/docs/hover-focus-and-other-states
- https://tailwindcss.com/docs/dark-mode
- https://tailwindcss.com/docs/customizing-spacing/
- https://www.radix-ui.com/themes/docs/theme/overview
- https://www.radix-ui.com/themes/docs/components/button
- https://www.radix-ui.com/themes/docs/components/icon-button
- https://primer.style/product/primitives/token-names/
- https://primer.style/product/css-utilities/colors/
- https://open-props.style/
- https://react-spectrum.adobe.com/v3/theming.html
- https://react-spectrum.adobe.com/styling
