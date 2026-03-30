# External Alias Layer Source

## Conclusion

Prefer owning the raw alias tokens locally. Open Props is a good reference and a plausible upstream source of raw values, but it is not the cleaner long-term baseline for this RAC styling layer.

## Why

Open Props gives us a useful raw substrate:

- clear scale-based tokens for color, size, radius, shadow, motion, and media
- selector-scoped theme switching through `.light`, `.dark`, and `data-theme`
- a documented pattern for local scratch variables like `--_foo`
- plain CSS output, plus JSON and JS forms if we ever need them

But it does not solve the hard part we actually need to own:

- the semantic vocabulary for RAC
- the boundary between shared semantic tokens and component-local tokens
- the compact/density model
- the guardrails around subtree theming and exceptions

That means importing Open Props would still leave us with the central design work, while also adding an external naming surface and dependency cadence we do not need.

## Tradeoff

The main benefit of importing Open Props would be avoiding the initial work of defining alias scales. The downside is that alias scales are the cheapest layer for us to own locally. Once we depend on Open Props, we inherit its naming, bundle shape, and release decisions even though the real value in this project is in the semantic layer above it.

For this project, that is the wrong place to spend complexity. The alias layer should be boring and stable. The more important decisions are the ones that encode our product vocabulary and our RAC-specific styling constraints.

## Practical Recommendation

- Own the raw alias tokens locally.
- Borrow Open Props naming patterns only where they are obviously better than inventing our own.
- Treat Open Props as reference material, not as the canonical source of truth.
- If we ever reuse it directly, do so only as an explicit, narrow build input rather than the foundation of the system.

## Sources

- [Open Props site](https://open-props.style/)
- [Open Props repository](https://github.com/argyleink/open-props)
- [Open Props `src/index.css`](https://github.com/argyleink/open-props/blob/main/src/index.css)
- [Open Props `src/props.colors.css`](https://raw.githubusercontent.com/argyleink/open-props/refs/heads/main/src/props.colors.css)
- [Open Props `src/props.media.css`](https://raw.githubusercontent.com/argyleink/open-props/refs/heads/main/src/props.media.css)
- [work/rac-css-structure/plan01/10-research/open-props.md](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/plan01/10-research/open-props.md)
- [work/rac-css-structure/plan01/20-digest/coherence.md](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/plan01/20-digest/coherence.md)
- [work/rac-css-structure/plan01/20-digest/flexibility.md](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/plan01/20-digest/flexibility.md)
- [work/rac-css-structure/plan01/20-digest/ergonomics.md](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/plan01/20-digest/ergonomics.md)
