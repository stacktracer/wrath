# Semantic Token Ceiling

## Conclusion

My recommendation is a semantic token layer in the **low dozens**, with a working target of **24-32 tokens** and a practical soft ceiling of **around 40**. If the semantic layer grows past **40-50**, it is probably doing too much and should be split into component-local tokens, narrower semantic subfamilies, or raw alias scales.

That is an inference from the prior art and from the team constraint in `work/rac-css-structure/plan01/plan.md`: a mixed-experience team needs a vocabulary that is small enough to remember, but still large enough to cover recurring cross-cutting concerns.

## Why This Range

The shared pattern across the notes is not “make semantic tokens tiny”; it is “keep the shared semantic layer deliberately small and cross-cutting.”

- [Open Props](open-props.md) shows the most compact semantic alias layer: `--brand`, `--text-1`, `--text-2`, and `--surface-1` through `--surface-4`, with everything else staying in raw scales.
- [Radix Themes](radix-themes.md) keeps the public theme surface similarly compact: a few global knobs like `appearance`, `accentColor`, `grayColor`, `radius`, and `scaling`, plus semantic color roles such as background, overlay, surface, and functional accent/gray tokens.
- [Primer](primer.md) explicitly separates `base`, `functional`, and `component/pattern` tokens, and its docs recommend generic patterns like `control` so shared tokens do not explode into per-component names too early.
- [Tailwind](tailwind.md) is the cautionary counterexample: it has broad token namespaces and lots of escape hatches, but no strong semantic/component boundary. That is useful for flexibility, but it is not a good memory model for a mixed-experience team.

The practical reading is that the semantic layer should cover recurring concerns like:

- surfaces and backgrounds
- text and foreground
- borders and separators
- focus and interaction affordances
- spacing and gaps that recur across components
- density and size-related knobs

Once that layer starts trying to encode component quirks, the vocabulary grows faster than the team’s ability to hold it in memory.

## Rule Of Thumb

- **20-30 tokens**: ideal if the product space is still unsettled and we want strong coherence.
- **30-40 tokens**: acceptable if the naming is clean and the tokens are genuinely cross-cutting.
- **40-50 tokens**: review carefully; this is where the semantic layer starts to turn into a taxonomy.
- **50+ tokens**: too broad for the role the semantic layer is supposed to play.

If a new semantic token only helps one or two components, it should probably be a component-local token instead. If it helps many components but still feels awkward to name, that is a signal to revisit the alias layer or the underlying component pattern, not to keep growing the semantic vocabulary.

## Sources

- `work/rac-css-structure/plan01/plan.md`
- `work/rac-css-structure/plan01/10-research/open-props.md`
- `work/rac-css-structure/plan01/10-research/radix-themes.md`
- `work/rac-css-structure/plan01/10-research/primer.md`
- `work/rac-css-structure/plan01/10-research/tailwind.md`
- https://open-props.style/
- https://www.radix-ui.com/themes/docs/overview/styling
- https://www.radix-ui.com/themes/docs/theme/spacing
- https://www.radix-ui.com/themes/docs/theme/color
- https://primer.style/product/primitives/token-names/
- https://tailwindcss.com/docs/theme
