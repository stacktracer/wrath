# Plan02 Review

All six concerns from the previous review were addressed cleanly. A few new things caught my eye on this read:

## 1. `--control-bg-disabled` is conspicuously missing

The semantic layer has `--control-bg`, `--control-bg-hover`, and `--control-bg-pressed`, but not `--control-bg-disabled`. Disabled state is at least as universal as hover and pressed — it applies across buttons, inputs, choice controls, list items, and more. Its absence means every family will invent its own disabled background, which is exactly the kind of drift the semantic layer is meant to prevent. The asymmetry seems like an oversight given that hover and pressed are already there.

## 2. No `--text-link` (or equivalent)

There's no semantic token for link/interactive text color. Links appear not just in `Link` components but inline within dialog body text, table cells, descriptions, and so on. Without a shared token, link color will either silently reuse `--text-primary` (wrong — links need visual distinction) or get invented as a local token in `primitives.css` that other families can't easily reach. A `--text-link` token seems clearly cross-cutting enough to belong in the semantic layer.

## 3. `--surface-accent` is underspecified relative to the others

The other `surface-*` tokens have clear, stable meanings: page background, panel background, raised card, overlay background. `--surface-accent` is less obvious — is it the background of an accent-tinted panel? The background of a filled accent button? Those are different things at different levels of the token hierarchy. If it's meant for button-fill use, it arguably belongs in the `control-*` family rather than `surface-*`.

---

None of these are blockers, but `--control-bg-disabled` in particular will surface on the very first component implemented and seems like a straightforward addition.
