# Radix Themes Component Inventory

This inventory is based on the official Radix Themes docs and the package export surface in [`packages/radix-ui-themes/src/components/index.tsx`](https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/src/components/index.tsx).

Radix Themes is documented as a pre-styled component library with vanilla CSS and a small theme surface. Relevant docs pages include [Getting started](https://www.radix-ui.com/themes/docs/overview/getting-started), [Styling](https://www.radix-ui.com/themes/docs/overview/styling), [Layout](https://www.radix-ui.com/themes/docs/overview/layout), and [Theme overview](https://www.radix-ui.com/themes/docs/theme/overview).

## User-Facing Components

- AspectRatio
- Avatar
- Badge
- Blockquote
- Box
- Button
- Card
- Checkbox
- Code
- Container
- Em
- Flex
- Grid
- Heading
- IconButton
- Inset
- Kbd
- Link
- Progress
- Quote
- Radio
- ScrollArea
- Section
- Separator
- Skeleton
- Slider
- Spinner
- Strong
- Switch
- Text
- TextArea
- Theme
- ThemePanel
- Tooltip

## Compound Component Namespaces

These are public component families that expand into multiple visible parts in the docs and source.

- AlertDialog
- Callout
- CheckboxCards
- CheckboxGroup
- ContextMenu
- DataList
- Dialog
- DropdownMenu
- HoverCard
- Popover
- RadioCards
- RadioGroup
- SegmentedControl
- Select
- TabNav
- Table
- Tabs
- TextField

## Public Helpers And Structural Components

These exports are public, but they are not primary styling targets.

- AccessibleIcon
- Portal
- Reset
- Slot
- Slottable
- VisuallyHidden

## Notes

- The source export file is the clearest authoritative inventory for the package surface.
- I kept the compound families at the namespace level rather than enumerating every nested slot export, because the docs present them as single public families.
- I excluded hooks, contexts, types, and icons from this inventory.
