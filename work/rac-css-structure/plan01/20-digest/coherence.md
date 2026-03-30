# Digest: Coherence And Guardrails

## Recommendations

- Adopt a strict three-tier CSS variable model: low-level aliases, shared semantic tokens, and component-local tokens. The prior art mostly converges on this shape, even when the names differ.
- Keep the semantic tier intentionally small and cross-cutting. It should describe recurring UI roles like surface, text, border, spacing, density, and focus, not per-component quirks.
- Treat component-local tokens as the only sanctioned place for one-off differences. If a value only helps one component, it should not become a semantic token.
- Make the public path for styling RAC components be plain CSS selectors against stable `data-*` state hooks. Avoid pushing day-to-day styling into utility classes, prop APIs, or framework-specific macros.
- Prefer selector-scoped theme switching at a high level, with a small set of global theme knobs. Dark mode should be a coherent theme state, not a collection of ad hoc per-component overrides.
- Document a compact/density model as a coherent global knob first, then allow component-specific divergence only when the global knob is insufficient.
- Keep escape hatches explicit and narrow. The safe path should be stable tokens and local CSS; anything broader should be easy to spot as exceptional rather than normal.
- Avoid adopting a library whose primary interaction model is incompatible with RAC styling. Token sources can be borrowed; component systems with closed styling surfaces should not be the baseline.

## Guardrails

- Do not let aliases, semantic tokens, and component tokens blur together. If a token is shared system-wide, it should be named and documented as such.
- Do not introduce a large variant vocabulary unless it can be justified by repeated usage across multiple components.
- Do not rely on global resets or broad utility layers as the primary styling mechanism. Those mechanisms create hidden coupling and make local ownership harder.
- Do not require developers to learn multiple styling languages just to make a safe change. The direct CSS path should remain the default.
- Do not make component-local exceptions invisible. If a component deviates from the semantic system, that deviation should be easy to find in the component CSS.

## Open Questions

- How many semantic tokens is the right ceiling before the system becomes too broad to hold in working memory?
- Which token names are broad enough to be reusable but still specific enough to stay meaningful?
- Should component-local tokens use an explicit prefix or naming convention that makes them obviously non-semantic?
- How should density be represented: one global `compact` knob, a few density scales, or per-component size variants?
- What theme state should be considered global enough to deserve top-level support, and what should stay local to a subtree?
- What is the smallest escape-hatch surface that still lets advanced teams do real work without eroding the default path?
- Should imported token packages be allowed only as raw value sources, with all semantic and component tokens owned locally?
- How much variant support is worth standardizing before it starts to compete with the token model itself?
