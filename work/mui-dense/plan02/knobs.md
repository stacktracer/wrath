# Plan02 Knob Inventory

## Scope

This inventory is intentionally scoped to the packages currently installed in this repo and the component families already shown on the `src/mui-dense/` hodgepodge page:

- `@mui/material`
- `@mui/x-data-grid-pro`
- `@mui/x-tree-view`
- `@mui/x-tree-view-pro`

It is not a full inventory of the broader MUI ecosystem.

## Set 1: Deliberately Public Density Knobs

These are the knobs MUI deliberately exposes as ordinary props, theme primitives, CSS-variable support, `sx`, or other straightforward public API.

### Global and Theme-Level Knobs

| Knob family                 | Examples in the current stack                                                 | Density effect                                                                                                  |
| --------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Theme spacing primitives    | `createTheme({ spacing })`                                                    | Changes the baseline spacing unit that many MUI gaps, paddings, and margins derive from.                        |
| Theme typography primitives | `createTheme({ typography })`, variant font sizes, line heights, font weights | Shrinks or expands the amount of text and vertical rhythm that fits in a fixed area.                            |
| Theme shape primitives      | `createTheme({ shape })`                                                      | Lower density impact than spacing or typography, but still public and global.                                   |
| Theme CSS variable mode     | `createTheme({ cssVariables })`                                               | Keeps global theme values addressable as CSS vars during experiments.                                           |
| Theme default props         | `theme.components.Mui*.defaultProps`                                          | Lets the experiment flip public props across whole component families without per-instance edits.               |
| Root-level `sx`             | `sx` on the component root                                                    | Allows explicit spacing, font-size, height, and width adjustments without reaching into undocumented structure. |

### `@mui/material`: Representative Public Knobs on the Current Page

| Group                    | Knob family                                     | Representative examples                                                                                                             |
| ------------------------ | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Inputs and form controls | compact size props                              | `size="small"` on `TextField`, `Autocomplete`, `Radio`, `Switch`, `Slider`                                                          |
| Inputs and form controls | dense form margins                              | `margin="dense"` on `FormControl`, `InputLabel`, `FormHelperText`, `InputBase`-based inputs                                         |
| Inputs and form controls | label suppression                               | `hiddenLabel` on `FormControl`                                                                                                      |
| Lists and menus          | dense list behavior                             | `dense` on `List`, `ListItem`, `ListItemButton`, `MenuItem`                                                                         |
| Lists and menus          | gutter and padding toggles                      | `disableGutters`, `disablePadding` on list-like and container-like components                                                       |
| Navigation and actions   | compact action size props                       | `size` on `Button`, `ButtonGroup`, `IconButton`, `Fab`, `Chip`, `Pagination`, `PaginationItem`, `ToggleButton`, `ToggleButtonGroup` |
| App chrome and surfaces  | toolbar density                                 | `variant="dense"` and `disableGutters` on `Toolbar`                                                                                 |
| App chrome and surfaces  | accordion chrome                                | `disableGutters` on `Accordion`                                                                                                     |
| Layout containers        | layout spacing props                            | `spacing` on `Stack` and `Grid`                                                                                                     |
| Layout containers        | container gutters                               | `disableGutters` on `Container`                                                                                                     |
| Media and tiles          | tile compaction                                 | `gap` and `rowHeight` on `ImageList`                                                                                                |
| Tabular data             | compact table sizing                            | `size="small"` on `Table` and `TableCell`                                                                                           |
| Overlays                 | width constraints that change perceived density | `maxWidth` on `Dialog`                                                                                                              |

### `@mui/x-data-grid-pro`: Public Knobs

| Knob family           | Examples                                           | Density effect                                                           |
| --------------------- | -------------------------------------------------- | ------------------------------------------------------------------------ |
| Built-in density mode | `density="compact" \| "standard" \| "comfortable"` | Changes a broad set of grid spacings through a supported API.            |
| Explicit row sizing   | `rowHeight`, `getRowHeight()`                      | Controls vertical packing of rows.                                       |
| Header sizing         | `columnHeaderHeight`, `headerFilterHeight`         | Controls header density separately from rows.                            |
| Root-level styling    | root `sx`                                          | Allows supported top-level spacing or font adjustments on the grid root. |

### `@mui/x-tree-view` and `@mui/x-tree-view-pro`: Public Knobs

| Knob family        | Examples                  | Density effect                                                              |
| ------------------ | ------------------------- | --------------------------------------------------------------------------- |
| Indentation        | `itemChildrenIndentation` | Changes how much horizontal space each nesting level consumes.              |
| Root-level styling | root `sx`                 | Allows supported top-level spacing and typography changes on the tree root. |

## Set 3: Gray-Area Density Knobs

These are still reachable through documented or semi-documented extension surfaces, but they stop being simple "set a public prop" changes. They usually require knowing slot names, utility classes, or component structure that MUI considers part of its styling surface rather than its simplest public API.

### Global and Cross-Cutting Gray-Area Knobs

| Knob family            | Examples in the current stack                   | Why this is Set 3                                                                                         |
| ---------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Theme style overrides  | `theme.components.Mui*.styleOverrides`          | Publicly supported, but density changes require knowledge of slot names and component-specific structure. |
| Theme variants         | `theme.components.Mui*.variants`                | Supported, but they package implementation-shaped styling logic rather than simple prop flips.            |
| Slots and slot props   | `slots`, `slotProps`                            | Supported, but aimed at internal subparts rather than top-level density props.                            |
| Utility classes        | `classes` props and exported utility class maps | Stable enough to target, but more structure-coupled than ordinary props.                                  |
| Documented state hooks | Tree View `data-*` state attributes             | Supported hooks, but they are useful mainly when writing implementation-aware CSS.                        |

### `@mui/material`: Representative Gray-Area Knobs

| Group               | Knob family                      | Representative examples                                                                                   |
| ------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Buttons and actions | slot-aware style overrides       | `MuiButton.styleOverrides.root`, `MuiIconButton.styleOverrides.root`, `MuiChip.styleOverrides.root`       |
| Inputs              | slot-aware style overrides       | `MuiInputBase`, `MuiOutlinedInput`, `MuiFilledInput`, `MuiInputLabel`, `MuiFormHelperText` slot overrides |
| Inputs and overlays | slot props for nested pieces     | `slotProps` on `Autocomplete`, `Dialog`, `Drawer`, `Popover`, `Tooltip`, `Slider`, `Modal`                |
| Lists and menus     | row-height and padding overrides | `MuiListItemButton`, `MuiMenuItem`, `MuiListSubheader` overrides keyed to documented slots/classes        |
| Layout and surfaces | documented slot overrides        | `MuiAccordionSummary`, `MuiCardHeader`, `MuiTableCell`, `MuiTabs`, `MuiTab`, `MuiToolbar`                 |

### `@mui/x-data-grid-pro`: Representative Gray-Area Knobs

| Knob family               | Examples                                                                           | Why this is Set 3                                                       |
| ------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Theme component overrides | `theme.components.MuiDataGrid.styleOverrides`                                      | Supported, but requires grid slot and class knowledge.                  |
| Utility-class targeting   | exported `gridClasses` such as density root classes, cell classes, header classes  | Stable styling hooks, but more implementation-shaped than direct props. |
| Slot customization        | `slots`, `slotProps` for toolbar, filter, panel, quick-filter, base inputs/buttons | Supported subpart customization rather than direct density props.       |

### `@mui/x-tree-view` and `@mui/x-tree-view-pro`: Representative Gray-Area Knobs

| Knob family                      | Examples                                                                                                    | Why this is Set 3                                                                        |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Theme component overrides        | `MuiSimpleTreeView`, `MuiRichTreeView`, `MuiRichTreeViewPro`, `MuiTreeItem` `styleOverrides` and `variants` | Supported, but slot- and structure-aware.                                                |
| Utility-class targeting          | `treeItemClasses` and tree-view `classes` props                                                             | Stable hooks, but tied to internal slot boundaries.                                      |
| Slot customization               | `slotProps` on tree views and tree items                                                                    | Lets the experiment reach nested pieces without dropping into unsupported DOM selectors. |
| Documented state data attributes | `data-expanded`, `data-selected`, `data-focused`, `data-disabled`, `data-editable`, `data-editing`          | Supported state hooks that still require implementation-aware styling.                   |

## Set 2: Unsupported or Explicitly Internal Density Knobs

These are the knobs that can be changed only by depending on non-public internal structure, unstable selectors, or package internals. They may still be useful for an experiment, but they should be treated as brittle by default.

### Cross-Cutting Unsupported Knobs

| Knob family                       | Representative examples                                                                           | Why this is Set 2                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Undocumented descendant selectors | CSS that reaches unnamed wrapper `div`s, implicit `span`s, or DOM-depth-specific descendants      | Depends on markup MUI is free to change.          |
| Generated class names             | Emotion hash classes or build-specific class strings                                              | Not stable across versions or builds.             |
| DOM-order assumptions             | `:nth-child(...)`, sibling-order selectors, selectors that assume a specific nested wrapper order | Breaks as soon as the component template changes. |
| Private JS internals              | importing private hooks, stores, or internal helpers                                              | Outside the supported API boundary.               |
| Package patching                  | editing vendored package code or monkey-patching runtime internals                                | Fragile and hard to carry forward.                |

### `@mui/material`: Representative Unsupported Knobs

| Group            | Representative examples                                                                                                     |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Inputs           | targeting unnamed wrappers inside `TextField`, `Select`, or `Autocomplete` that are not exposed as slots or utility classes |
| Buttons and tabs | depending on implicit inner markup or DOM order inside `Button`, `Tab`, or `ToggleButton`                                   |
| Menus and lists  | shrinking row layout by selecting descendants that are not documented slots/classes                                         |

### `@mui/x-data-grid-pro`: Representative Unsupported Knobs

| Group                     | Representative examples                                                                                                                              |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Virtualization structure  | selectors that assume a particular hierarchy for the virtual scroller, render zone, or nested wrappers not represented by documented utility classes |
| Header and cell internals | selectors that depend on undocumented descendants inside header-title, menu, or cell-editing markup                                                  |
| Panel internals           | selectors that reach undocumented substructure inside preference panels, filter panels, or popups                                                    |

### `@mui/x-tree-view` and `@mui/x-tree-view-pro`: Representative Unsupported Knobs

| Group                 | Representative examples                                                                                                                                         |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tree item descendants | selectors that depend on descendant nodes below `TreeItem` slots that are not exposed through `treeItemClasses`, `slotProps`, or documented `data-*` attributes |
| Reordering internals  | CSS or JS that assumes specific drag-and-drop overlay markup or internal plugin structure beyond documented props/classes                                       |
