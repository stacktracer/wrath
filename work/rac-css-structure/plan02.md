# Full RAC CSS Implementation Plan

This document is a self-contained implementation plan for building a long-lived plain-CSS styling system for React Aria Components in this repo.

It assumes:

- we are styling `react-aria-components` directly
- we are not adopting Tailwind, React Spectrum, Radix Themes, Primer, or Open Props as the styling foundation
- the first pass must cover **all RAC components that own a visual surface**
- the audience is an experienced programmer who has not read the other research files

## Goal

Create a CSS architecture for `src/rac/` that:

- uses plain CSS and CSS variables
- styles RAC components directly with CSS selectors and RAC `data-*` state hooks
- keeps the public design vocabulary small enough for a mixed-experience team
- supports light/dark themes and a `compact` density mode
- covers every RAC component with visual surface in the first pass
- avoids wrapper components and avoids a broad global reset

## Constraints And Non-Goals

- Use plain CSS only. Do not use CSS Modules.
- Keep all styling local to `src/rac/`.
- Because this will grow beyond one stylesheet, use a local `src/rac/styles/` subdirectory.
- Do not add a Tailwind-like utility layer, prop-driven variant system, or wrapper component library.
- Do not depend on Open Props or another external token package for the alias layer.
- Do not add a broad reset or preflight to the core styling layer.
- Do not treat subtree theming as a routine everyday tool. Support it, but keep it rare and deliberate.

## Decisions Already Made

These decisions should be treated as settled unless implementation exposes a concrete problem:

- Use a strict three-tier token model:
    - alias tokens for raw scales and palette values
    - semantic tokens for shared UI roles
    - component-local tokens for exceptions
- Keep the semantic layer in the low dozens:
    - target roughly `24-32` semantic tokens
    - soft ceiling around `40`
- Semantic tokens should use generic role names such as `surface-*`, `text-*`, `border-*`, `focus-*`, `overlay-*`, `accent-*`, `control-*`, `density-*`, and `space-*`.
- Do not make component-shaped names semantic by default.
- Component-local tokens should use a private prefix: `--_...`
- Use one public density mode, `compact`, backed by a few internal token families:
    - layout spacing
    - control sizing/padding
    - typography stays separate by default
- Support subtree theming through selector-scoped variables, but document it as rare and coarse-grained.
- Keep the public variant surface small:
    - `size` or `density` where geometry changes
    - `tone` or `intent` where meaning changes
    - structural axes like `orientation` or `placement` only when they are truly part of the component contract
- Treat hover, focus, selected, disabled, expanded, open, entering, and exiting as state hooks, not public variants.

## Definition Of “Needs Styling”

The rule is:

- If a component owns a visual surface or visible affordance, it needs styling coverage.
- If a component only provides behavior, layout plumbing, triggering, or accessibility wiring around other visible components, it does not need its own styling contract.

This plan covers all components in the first category.

## Full First-Pass Scope

The first pass must cover these RAC visual components.

### Core Visible Primitives

- `Breadcrumb`
- `Breadcrumbs`
- `Button`
- `FieldError`
- `Form`
- `Group`
- `Header`
- `Heading`
- `Input`
- `Keyboard`
- `Label`
- `Link`
- `SelectionIndicator`
- `Separator`
- `Text`
- `TextArea`
- `TextField`

### Choice And Toggle Controls

- `Checkbox`
- `CheckboxGroup`
- `Radio`
- `RadioGroup`
- `Switch`
- `ToggleButton`
- `ToggleButtonGroup`

### Selection And List Controls

- `ComboBox`
- `ComboBoxValue`
- `ListBox`
- `ListBoxItem`
- `ListBoxLoadMoreItem`
- `ListBoxSection`
- `Menu`
- `MenuItem`
- `MenuSection`
- `SearchField`
- `Select`
- `SelectValue`
- `Tag`
- `TagGroup`
- `TagList`

### Data Display And Structured Collections

- `Cell`
- `Column`
- `ColumnResizer`
- `GridList`
- `GridListHeader`
- `GridListItem`
- `GridListLoadMoreItem`
- `GridListSection`
- `Meter`
- `ProgressBar`
- `ResizableTableContainer`
- `Row`
- `Table`
- `TableBody`
- `TableHeader`
- `TableLoadMoreItem`
- `Tree`
- `TreeHeader`
- `TreeItem`
- `TreeItemContent`
- `TreeLoadMoreItem`
- `TreeSection`

### Overlays, Disclosure, And Layering

- `Dialog`
- `Disclosure`
- `DisclosureGroup`
- `DisclosurePanel`
- `DropIndicator`
- `DropZone`
- `Modal`
- `ModalOverlay`
- `OverlayArrow`
- `Popover`
- `Tab`
- `TabList`
- `TabPanel`
- `TabPanels`
- `Tabs`
- `Tooltip`

### Date And Time

- `Calendar`
- `CalendarCell`
- `CalendarGrid`
- `CalendarGridBody`
- `CalendarGridHeader`
- `CalendarHeaderCell`
- `DateField`
- `DateInput`
- `DatePicker`
- `DateRangePicker`
- `DateSegment`
- `RangeCalendar`
- `TimeField`

### Color

- `ColorArea`
- `ColorField`
- `ColorPicker`
- `ColorSlider`
- `ColorSwatch`
- `ColorSwatchPicker`
- `ColorSwatchPickerItem`
- `ColorThumb`
- `ColorWheel`
- `ColorWheelTrack`

### Slider And Range

- `NumberField`
- `Slider`
- `SliderOutput`
- `SliderThumb`
- `SliderTrack`

### Toolbar

- `Toolbar`

### Unstable Toast

- `UNSTABLE_Toast`
- `UNSTABLE_ToastContent`
- `UNSTABLE_ToastList`
- `UNSTABLE_ToastRegion`

## Explicitly Out Of Scope For Direct Styling

These are public RAC exports, but they are not direct styling targets:

- `Autocomplete`
- `Collection`
- `DialogTrigger`
- `FileTrigger`
- `Focusable`
- `MenuTrigger`
- `Pressable`
- `Section`
- `SharedElement`
- `SharedElementTransition`
- `SubmenuTrigger`
- `TooltipTrigger`
- `Virtualizer`
- `VisuallyHidden`

## Recommended File Layout

Move the RAC CSS into a dedicated local styles directory.

```text
src/rac/
  app.tsx
  app.test.tsx
  index.html
  main.tsx
  styles/
    index.css
    alias.css
    semantic.css
    themes.css
    density.css
    document.css
    components/
      primitives.css
      buttons.css
      choice-controls.css
      fields.css
      list-and-select.css
      menu.css
      tags.css
      grid-list.css
      table.css
      tree.css
      disclosure.css
      overlays.css
      tabs.css
      date-time.css
      color.css
      range-and-progress.css
      toolbar.css
      toast.css
```

Update `src/rac/main.tsx` to import only:

```ts
import './styles/index.css';
```

## CSS Import Order

Keep the CSS ordered from most general to most specific:

1. `alias.css`
2. `semantic.css`
3. `themes.css`
4. `density.css`
5. `document.css`
6. component family CSS files

That gives normal CSS import order enough structure without introducing more abstraction.

## Token Architecture

### 1. Alias Tokens

Alias tokens are raw scales and palette values. They should be boring, local, and stable.

Use alias families like:

- color scales, e.g. `--gray-0` through `--gray-12`, `--accent-0` through `--accent-12`
- space scale, e.g. `--space-0` through `--space-8`
- size scale, e.g. `--size-0` through `--size-8`
- radius scale, e.g. `--radius-0` through `--radius-4`
- shadow scale, e.g. `--shadow-1` through `--shadow-3`
- border width scale, e.g. `--border-1`, `--border-2`
- motion scale, e.g. `--duration-fast`, `--duration-normal`, `--ease-standard`
- typography scales if needed, e.g. `--font-size-1` through `--font-size-5`, `--line-height-1` through `--line-height-4`

Do not expose alias tokens as the everyday authoring interface. They exist to feed the semantic layer.

### 2. Semantic Tokens

Semantic tokens are the small public vocabulary that app developers should learn.

Start with a concrete inventory in roughly this range:

- `--surface-page`
- `--surface-panel`
- `--surface-raised`
- `--surface-overlay`
- `--accent-bg`
- `--accent-fg`
- `--text-primary`
- `--text-secondary`
- `--text-muted`
- `--text-inverse`
- `--text-link`
- `--border-subtle`
- `--border-strong`
- `--focus-ring-color`
- `--focus-ring-width`
- `--focus-ring-offset`
- `--overlay-backdrop`
- `--overlay-shadow`
- `--control-bg`
- `--control-bg-hover`
- `--control-bg-pressed`
- `--control-bg-disabled`
- `--control-fg`
- `--control-border`
- `--control-radius`
- `--control-gap`
- `--control-padding-inline`
- `--control-padding-block`
- `--danger-bg`
- `--danger-fg`
- `--danger-border`

Rules:

- If a name only makes sense for one component’s anatomy, do not add it here.
- If a token is only used by one family, keep it component-local.
- Add new semantic tokens only when at least three unrelated component families benefit from them.
- Do not start with one all-purpose `--control-height` token or one all-purpose `--control-bg-selected` token. Treat those as component-local until a stable shared pattern actually emerges.

### 3. Component-Local Tokens

Each component family may define private scratch variables using `--_...`.

Examples:

- `--_button-min-inline-size`
- `--_menu-item-padding-inline`
- `--_table-row-bg-hover`
- `--_calendar-cell-size`

Rules:

- component-local tokens belong in the family stylesheet that owns them
- treat `--_...` as private implementation detail
- if a local token becomes widely reused, promote it to the semantic layer

## Theme Model

Use selector-scoped variables for themes.

Recommended selectors:

- default theme on the RAC root, e.g. `[data-theme="light"]`
- dark theme on the same root or a subtree, e.g. `[data-theme="dark"]`

Rules:

- define semantic token values in `themes.css`
- keep the theme surface small
- allow nested theme islands, but only for coarse boundaries such as dialogs, previews, embedded sections, or intentionally distinct regions
- do not use theme islands as a substitute for component-local tuning

## Density Model

Use one public density switch:

- `[data-density="comfortable"]`
- `[data-density="compact"]`

Back it with several token families:

- layout spacing
- control sizing and padding
- icon/text gaps and similar shared interaction geometry

Typography should stay separate by default. Do not automatically shrink text when `compact` is enabled unless a concrete requirement proves that necessary.

## Reset And Document Styles

Do not build a global reset or preflight into the component styling system.

`document.css` may include only minimal host-shell rules such as:

- app background and foreground
- font family assignment
- app shell spacing
- a minimal box-sizing baseline if needed

Keep these shell styles clearly separate from component family CSS so they can be recognized as host-page concerns rather than the component contract.

## Selector Strategy

The default path is:

- style RAC components directly
- use documented RAC `data-*` state hooks
- use plain CSS selectors

Examples of the kinds of hooks to use:

- `[data-hovered]`
- `[data-pressed]`
- `[data-selected]`
- `[data-disabled]`
- `[data-invalid]`
- `[data-focus-visible]`
- `[data-open]`
- `[data-expanded]`
- `[data-placement]`
- `[data-entering]`
- `[data-exiting]`

Do not build a modifier-class taxonomy when RAC already exposes a matching state hook.

## Class Naming Strategy

Prefer RAC’s own component roots and state attributes as the primary styling surface.

If a component needs an explicit project-local selector:

- add `className` directly to the RAC component that owns the visual surface
- keep the class local and boring, e.g. `.rac-table`, `.rac-menu`, `.rac-calendar`
- do not create wrapper components just to attach classes

Do not rely on fragile descendant selectors into undocumented internals.

## Family Ownership Map

Use one stylesheet per component family or closely related family cluster.

### `primitives.css`

Own:

- `Breadcrumb`
- `Breadcrumbs`
- `FieldError`
- `Form`
- `Group`
- `Header`
- `Heading`
- `Keyboard`
- `Label`
- `Link`
- `SelectionIndicator`
- `Separator`
- `Text`

### `buttons.css`

Own:

- `Button`
- `ToggleButton`
- `ToggleButtonGroup`

### `choice-controls.css`

Own:

- `Checkbox`
- `CheckboxGroup`
- `Radio`
- `RadioGroup`
- `Switch`

### `fields.css`

Own:

- `Input`
- `TextArea`
- `TextField`
- `SearchField`
- `NumberField`

### `list-and-select.css`

Own:

- `ComboBox`
- `ComboBoxValue`
- `ListBox`
- `ListBoxItem`
- `ListBoxLoadMoreItem`
- `ListBoxSection`
- `Select`
- `SelectValue`

### `menu.css`

Own:

- `Menu`
- `MenuItem`
- `MenuSection`

### `tags.css`

Own:

- `Tag`
- `TagGroup`
- `TagList`

### `grid-list.css`

Own:

- `GridList`
- `GridListHeader`
- `GridListItem`
- `GridListLoadMoreItem`
- `GridListSection`

### `table.css`

Own:

- `ResizableTableContainer`
- `Table`
- `TableHeader`
- `TableBody`
- `Column`
- `ColumnResizer`
- `Row`
- `Cell`
- `TableLoadMoreItem`

### `tree.css`

Own:

- `Tree`
- `TreeHeader`
- `TreeItem`
- `TreeItemContent`
- `TreeLoadMoreItem`
- `TreeSection`

### `disclosure.css`

Own:

- `Disclosure`
- `DisclosureGroup`
- `DisclosurePanel`

### `overlays.css`

Own:

- `Dialog`
- `DropIndicator`
- `DropZone`
- `Modal`
- `ModalOverlay`
- `OverlayArrow`
- `Popover`
- `Tooltip`

### `tabs.css`

Own:

- `Tabs`
- `TabList`
- `Tab`
- `TabPanels`
- `TabPanel`

### `date-time.css`

Own:

- `Calendar`
- `CalendarGrid`
- `CalendarGridHeader`
- `CalendarGridBody`
- `CalendarHeaderCell`
- `CalendarCell`
- `DateField`
- `DateInput`
- `DateSegment`
- `DatePicker`
- `DateRangePicker`
- `RangeCalendar`
- `TimeField`

### `color.css`

Own:

- `ColorArea`
- `ColorField`
- `ColorPicker`
- `ColorSlider`
- `ColorSwatch`
- `ColorSwatchPicker`
- `ColorSwatchPickerItem`
- `ColorThumb`
- `ColorWheel`
- `ColorWheelTrack`

### `range-and-progress.css`

Own:

- `Meter`
- `ProgressBar`
- `Slider`
- `SliderOutput`
- `SliderThumb`
- `SliderTrack`

### `toolbar.css`

Own:

- `Toolbar`

### `toast.css`

Own:

- `UNSTABLE_Toast`
- `UNSTABLE_ToastContent`
- `UNSTABLE_ToastList`
- `UNSTABLE_ToastRegion`

## Authoring Rules For Each Family File

Each family file should follow the same pattern:

1. Define the base visual surface.
2. Map semantic tokens to family-local `--_...` tokens if the family needs local tuning.
3. Style RAC states with `data-*` selectors.
4. Keep one-off layout or anatomy details private.
5. Expose a documented public component token only if semantic tokens are clearly too coarse and the need is stable.

For example:

- base values come from semantic tokens like `--control-bg`
- a family may translate them to `--_menu-item-bg` or `--_table-row-bg-hover`
- selectors then style `[data-hovered]`, `[data-selected]`, `[data-disabled]`, and so on

## Demo And Verification Surface

To style all visual-surface components in the first pass, the RAC app itself needs to render all of them.

Update `src/rac/app.tsx` so it becomes a component gallery rather than a two-widget experiment. The gallery should:

- render at least one example of every visual-surface component family
- include examples for key interactive and semantic states where they matter
- include at least one light theme view and one dark or nested-theme example
- include comfortable and compact density examples
- include representative collection-heavy widgets such as table, tree, menu, listbox, grid list, tabs, date pickers, color controls, overlays, and toast

Use hard-coded local demo data. Do not introduce app architecture just to support the gallery.

## Execution Order

Implement in this order:

1. Create `src/rac/styles/` and `styles/index.css`.
2. Move existing token and shell CSS into the new structure.
3. Build `alias.css`, `semantic.css`, `themes.css`, `density.css`, and `document.css`.
4. Convert `app.tsx` into a full RAC gallery that renders every visual-surface family.
5. Implement shared primitives and high-reuse families first:
    - `primitives.css`
    - `buttons.css`
    - `choice-controls.css`
    - `fields.css`
6. Implement collection and navigation families:
    - `list-and-select.css`
    - `menu.css`
    - `tags.css`
    - `grid-list.css`
    - `table.css`
    - `tree.css`
    - `tabs.css`
7. Implement overlays and disclosure:
    - `disclosure.css`
    - `overlays.css`
8. Implement complex widgets:
    - `date-time.css`
    - `color.css`
    - `range-and-progress.css`
9. Implement low-volume specialized families:
    - `toolbar.css`
    - `toast.css`
10. Review the semantic layer and push component-specific names back down into `--_...` locals where necessary.
11. Update documentation if the new structure changes authoring workflow.

## Definition Of Done

The work is done when all of the following are true:

- every RAC component listed in the scope above has visible CSS coverage
- behavior-only RAC helpers are not being styled as if they were visual components
- tokens are split into alias, semantic, and component-local layers
- semantic token count stays in the agreed range
- component-local tokens consistently use `--_...`
- themes are selector-scoped and density is driven by `data-density`
- there is no broad reset/preflight in the core styling system
- the RAC gallery renders every visual-surface family
- `npm run format` passes
- `npm run lint` passes
- `npm run test` passes
- `npm run build` passes

## Implementation Notes

- Favor a small number of meaningful CSS files over either one giant stylesheet or one file per export.
- Favor semantic reuse over inventing component-specific public knobs.
- When in doubt, choose the lower-abstraction option that an experienced teammate can understand by reading the CSS directly.
- If implementation pressure starts pushing many values into the semantic layer, stop and ask whether those values are actually component-local.
