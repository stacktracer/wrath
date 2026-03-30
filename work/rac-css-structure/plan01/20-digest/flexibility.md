# Digest: Flexibility And Escape Hatches

## Recommendations

- Keep the default authoring model as plain CSS targeting RAC `data-*` state hooks. Tailwind and the component libraries all become less attractive once the styling surface shifts away from direct selectors.
- Make CSS variables the only supported escape hatch for broad customization. The prior art is consistent that global knobs work best when they stay in tokens, not in ad hoc overrides or utility layers.
- Split those variables into three levels and keep the boundary strict: alias tokens for raw spacing/color scales, semantic tokens for shared UI concepts, and component-local tokens only for real divergence. Primer and Radix Themes are the clearest evidence that this is the sustainable way to preserve flexibility without losing coherence.
- Treat component-local tokens as exceptional, not normal. Open Props is useful precisely because it does not try to solve everything; the component-specific tuning should live in our CSS, not in the base token substrate.
- Allow selector-scoped theme overrides, but keep them explicit and small. Tailwind and Open Props both show that theme islands can work, but they also create edge cases when variable resolution or reset behavior becomes too implicit.
- Prefer `data-theme`-style thematic switches over prop-driven styling APIs. That gives us a way to support local theme islands without introducing a second component vocabulary or a runtime styling abstraction.
- Define a compact mode through semantic density tokens first, then use per-component overrides only where the semantic layer is too coarse. The prior art suggests that a unified `compact` knob is usually an illusion unless the underlying spacing and sizing tokens already exist.
- Keep framework-specific escape hatches out of the core plan. `UNSAFE_*`, utility classes, `@apply`, and prop-driven variants all buy flexibility, but they also buy cognitive load and inconsistent authoring patterns.

## Open Questions

- What is the narrowest escape hatch we are willing to support as a first-class convention: selector-scoped theme overrides, component-local custom properties, or both?
- Should semantic tokens be allowed to vary by subtree, or should subtree variance be limited to component-local overrides only?
- Do we want one density system that spans all components, or separate density knobs for layout, controls, and navigation patterns?
- How much local divergence is acceptable before a component should stop using shared semantic tokens and define its own local variables?
- Should the project standardize a private naming convention for component-local scratch space, like Open Props’ `--_foo`, or keep local conventions entirely ad hoc?
- Do we want any global reset or preflight behavior at all, given how often broad resets become a source of integration friction?
- If a component needs a different compactness profile, should that be expressed as a new semantic token, a component-local override, or a distinct component variant?
- Are we willing to import an external token substrate such as Open Props, or is the extra naming layer not worth the dependency surface?
