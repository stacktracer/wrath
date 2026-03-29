# Synthesis

## Common Themes From The Digest Files

- None of the five prior-art systems look like a good direct dependency for this RAC experiment's styling layer. React Spectrum and Radix Themes are too closed and prop-driven, Tailwind centers the authoring model on utilities and directives, Primer CSS is legacy/SCSS-heavy, and Open Props is only a token substrate rather than a full architecture.
- The strongest shared recommendation is a strict three-tier token model:
    - alias tokens for raw scales and palette values
    - semantic tokens for shared UI concepts
    - component-local tokens for real divergence
- The semantic layer should stay deliberately small and cross-cutting. It should cover recurring concerns like surfaces, text, border, focus, spacing, density, and perhaps a few control/layout roles, not per-component quirks.
- The default authoring path should be plain CSS targeting RAC `data-*` state hooks directly. The digests consistently reject shifting the center of gravity to utility classes, prop taxonomies, or framework-specific styling APIs.
- Themes and dark mode should be handled with selector-scoped CSS variables at a high level, with a small number of global knobs and a predictable switching mechanism such as `data-theme`.
- Density or `compact` behavior should be modeled through semantic spacing and sizing tokens first, then component-local overrides only where the shared density model proves too coarse.
- Escape hatches matter, but they should be narrow and legible. The safest recurring boundary is: broad customization through CSS variables, day-to-day styling through local CSS selectors, and component-local tokens for exceptions.

## Important Findings That Were Not Just Common Themes

- Open Props is the only reviewed project that looks plausibly adoptable as a dependency, but only as an alias-token source. The notes also make clear that adopting it would not reduce the hard part of the work, which is defining the semantic vocabulary and the local override rules for RAC.
- Primer's `base -> functional -> component/pattern` split is the closest named analogue to the structure we want. Its naming system is probably worth borrowing from selectively, especially the idea that some tokens should describe reusable patterns like `control-*` rather than immediately becoming per-component names.
- Radix Themes is a strong example of the value of a deliberately small theme surface. The tradeoff shown in the notes is useful: coherence improves when the global knobs stay few, but flexibility drops fast if the component API becomes the only supported styling surface.
- React Spectrum is the clearest negative lesson. Its guardrails are strong precisely because consumers are not expected to own the styling. That is useful as a warning sign for our work: if our "safe path" becomes too closed, we will recreate the same mismatch that pushes Spectrum users toward React Aria Components in the first place.
- Tailwind is useful mainly as a caution about escape-hatch sprawl. It shows how powerful a CSS-variable-based theme system can be, but also how quickly the learning surface expands once utilities, directives, custom variants, arbitrary values, and reset behavior all become part of the model.
- The digests do not really disagree with each other. The differences are more about emphasis:
    - coherence pushes for harder boundaries and stricter guardrails
    - flexibility pushes for careful theme islands and explicit escape-hatch limits
    - ergonomics pushes for the smallest token vocabulary and the fewest extra concepts

## Open Questions That Still Matter

- What is the target ceiling for the semantic token layer? The notes repeatedly argue for "small," but we still need an actual working range that a mixed-experience team can hold in memory.
- Which semantic names should exist at all? In particular, do we want generic roles like `control-*`, `surface-*`, and `text-*`, or more domain-specific names such as `icon-text-gap`, `row-padding-x`, and `panel-padding`?
- Should density be one global axis such as `compact`, or a small family of related knobs such as layout density, control density, and typography scale?
- How should component-local tokens be named so they are obviously not shared semantic tokens? A private prefix or naming convention may be worth standardizing.
- How much subtree theming do we want to support? The research supports selector-scoped theme islands, but it is still unclear whether they should be normal, rare, or effectively discouraged.
- Do we want any reset or preflight layer at all, given how often Tailwind and other systems surface integration problems around global base styles?
- Should we import an external alias layer like Open Props, or is owning the raw alias tokens locally the cleaner long-term tradeoff?
- Which variants deserve first-class support beyond token changes? The notes suggest that many variant systems become large quickly, but we still need to decide what a minimal supported variant surface looks like for RAC components.
