# Implementation Plan Review

Issues found in `full-rac-css-implementation-plan.md`, in rough order of concern.

## 1. `--border-focus` duplicates the `--focus-ring-*` family

The semantic token list has both `--border-focus` (in the border family) and `--focus-ring-color` / `--focus-ring-width` / `--focus-ring-offset`. These cover the same concern via different mechanisms — `border` vs `outline`/ring. Modern RAC focus styling almost always uses `outline`, not a border change. Having both will cause inconsistency: some components will end up using `--border-focus` and others `--focus-ring-color`, and they won't behave the same way geometrically.

Recommendation: drop `--border-focus` and keep only the `--focus-ring-*` family.

## 2. `--control-height` is probably too coarse to be semantic

A single height token for all controls will break down fast. A Button, Input, and Checkbox all have different natural heights, and they diverge further under `compact`. This token will invite constant component-level overrides that defeat its purpose.

Recommendation: treat control height as a component-local token, or split into a small scale like `--control-height-sm` / `--control-height-md` if a shared scale is actually warranted.

## 3. `--control-bg-selected` may be too broad for the semantic layer

"Selected" means visually different things across components — a selected `Tab` doesn't look like a selected `ListBoxItem`, which doesn't look like a selected `ToggleButton`. If they all share `--control-bg-selected`, you either get unwanted visual uniformity, or every component overrides it anyway, making it not actually semantic.

Recommendation: start this as a component-local token and promote it only if a genuinely shared selected-background pattern emerges.

## 4. Only `--danger-fg` and `--danger-border`, no `--danger-bg`

Filled danger buttons and error-state inputs need a background. The omission looks like an oversight. If `danger` is a semantic role at all, it probably needs at minimum `fg`, `bg`, and `border`.

## 5. `select-and-list.css` is doing too much

This file owns 13 components: ComboBox, ListBox, ListBoxItem, ListBoxLoadMoreItem, ListBoxSection, Menu, MenuItem, MenuSection, Select, SelectValue, Tag, TagGroup, and TagList. These components have quite different anatomy and interaction models. Menu/MenuItem and Tag/TagGroup in particular feel like they should be in separate files. The grouping reads more like "things that didn't fit elsewhere" than a coherent family.

Recommendation: split into at least `menu.css`, `list-and-select.css`, and `tags.css`, or some similar breakdown that reflects actual structural similarity.

## 6. `SharedElement` probably should not be a styling target

`SharedElement` is a layout/transition primitive that wraps other components during view transitions. It does not own a persistent visual surface in the normal sense. Styling it in `motion.css` alongside motion tokens may be a category error.

Recommendation: treat `SharedElement` as out of scope for direct styling, similar to `SharedElementTransition`. If it does need styling in a specific context, handle it locally at the use site.
