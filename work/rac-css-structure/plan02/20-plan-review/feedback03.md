# Plan02 Review

All previous concerns were addressed in this revision. One new concern:

## `--accent-bg` has no companion `--accent-fg`

The `accent-*` family currently contains only `--accent-bg`. But wherever an accent background is used — a primary/accent button, an accent-tinted badge, a filled accent surface — the foreground color (text, icon) over that background also needs to be a semantic token. It will differ between light and dark themes (likely white in both, but not guaranteed), and it may differ from `--text-inverse`.

The `--danger-*` family sets the right precedent: it defines `bg`, `fg`, and `border` as a complete role. The `accent-*` family should follow the same pattern.

Without `--accent-fg`, the first dev to implement an accent button will either hard-code a foreground color or invent a local `--_button-accent-fg` token that doesn't survive theme switching cleanly.

Recommendation: add `--accent-fg` alongside `--accent-bg`. Whether `--accent-border` is also needed can be deferred until a use case appears.
