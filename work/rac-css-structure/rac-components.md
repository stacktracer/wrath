# React Aria Components Inventory

This list is based on the root exports of `react-aria-components@1.16.0` in this repo, using `node_modules/react-aria-components/src/index.ts`.

## Components To Style

These are the visible RAC components and visible subparts we should expect to style if we want full app-level coverage.

- Core visible primitives: `Breadcrumb`, `Breadcrumbs`, `Button`, `FieldError`, `Form`, `Group`, `Header`, `Heading`, `Input`, `Keyboard`, `Label`, `Link`, `SelectionIndicator`, `Separator`, `Text`, `TextArea`, `TextField`
- Choice and toggle controls: `Checkbox`, `CheckboxGroup`, `Radio`, `RadioGroup`, `Switch`, `ToggleButton`, `ToggleButtonGroup`
- Selection and list controls: `ComboBox`, `ComboBoxValue`, `ListBox`, `ListBoxItem`, `ListBoxLoadMoreItem`, `ListBoxSection`, `Menu`, `MenuItem`, `MenuSection`, `SearchField`, `Select`, `SelectValue`, `Tag`, `TagGroup`, `TagList`
- Data display and structured collections: `Cell`, `Column`, `ColumnResizer`, `GridList`, `GridListHeader`, `GridListItem`, `GridListLoadMoreItem`, `GridListSection`, `Meter`, `ProgressBar`, `ResizableTableContainer`, `Row`, `Table`, `TableBody`, `TableHeader`, `TableLoadMoreItem`, `Tree`, `TreeHeader`, `TreeItem`, `TreeItemContent`, `TreeLoadMoreItem`, `TreeSection`
- Overlays, disclosure, and layering: `Dialog`, `Disclosure`, `DisclosureGroup`, `DisclosurePanel`, `DropIndicator`, `DropZone`, `Modal`, `ModalOverlay`, `OverlayArrow`, `Popover`, `Tab`, `TabList`, `TabPanel`, `TabPanels`, `Tabs`, `Tooltip`
- Date and time: `Calendar`, `CalendarCell`, `CalendarGrid`, `CalendarGridBody`, `CalendarGridHeader`, `CalendarHeaderCell`, `DateField`, `DateInput`, `DatePicker`, `DateRangePicker`, `DateSegment`, `RangeCalendar`, `TimeField`
- Color: `ColorArea`, `ColorField`, `ColorPicker`, `ColorSlider`, `ColorSwatch`, `ColorSwatchPicker`, `ColorSwatchPickerItem`, `ColorThumb`, `ColorWheel`, `ColorWheelTrack`
- Slider and range: `NumberField`, `Slider`, `SliderOutput`, `SliderThumb`, `SliderTrack`
- Toolbar: `Toolbar`
- Toast, if adopted despite the unstable API: `UNSTABLE_Toast`, `UNSTABLE_ToastContent`, `UNSTABLE_ToastList`, `UNSTABLE_ToastRegion`

## Components Not To Style

These are behavior, layout, trigger, or accessibility helpers rather than visual styling targets. Style the visible child or surrounding component family instead.

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

## Component Categories

Included:

- React component exports from the package root
- the unstable toast component exports
- the component re-exports `Focusable`, `Pressable`, and `VisuallyHidden`

Omitted:

- contexts
- hooks
- types
- utility exports
- non-component helpers such as `TableLayout` and `useTableOptions`

### Core And Shared

- Autocomplete
- Breadcrumb
- Breadcrumbs
- Button
- Collection
- FieldError
- Form
- Group
- Header
- Heading
- Input
- Keyboard
- Label
- Link
- Section
- SelectionIndicator
- Separator
- Text
- TextArea
- TextField
- Virtualizer

### Choice And Toggle Controls

- Checkbox
- CheckboxGroup
- Radio
- RadioGroup
- Switch
- ToggleButton
- ToggleButtonGroup

### Selection, Menus, And Tags

- ComboBox
- ComboBoxValue
- ListBox
- ListBoxItem
- ListBoxLoadMoreItem
- ListBoxSection
- Menu
- MenuItem
- MenuSection
- MenuTrigger
- SearchField
- Select
- SelectValue
- SubmenuTrigger
- Tag
- TagGroup
- TagList

### Data Display And Structured Collections

- Cell
- Column
- ColumnResizer
- GridList
- GridListHeader
- GridListItem
- GridListLoadMoreItem
- GridListSection
- Meter
- ProgressBar
- ResizableTableContainer
- Row
- Table
- TableBody
- TableHeader
- TableLoadMoreItem
- Tree
- TreeHeader
- TreeItem
- TreeItemContent
- TreeLoadMoreItem
- TreeSection

### Disclosure, Tabs, And Layering

- Dialog
- DialogTrigger
- Disclosure
- DisclosureGroup
- DisclosurePanel
- DropIndicator
- DropZone
- Modal
- ModalOverlay
- OverlayArrow
- Popover
- Tab
- TabList
- TabPanel
- TabPanels
- Tabs
- Tooltip
- TooltipTrigger

### Date And Time

- Calendar
- CalendarCell
- CalendarGrid
- CalendarGridBody
- CalendarGridHeader
- CalendarHeaderCell
- DateField
- DateInput
- DatePicker
- DateRangePicker
- DateSegment
- RangeCalendar
- TimeField

### Color

- ColorArea
- ColorField
- ColorPicker
- ColorSlider
- ColorSwatch
- ColorSwatchPicker
- ColorSwatchPickerItem
- ColorThumb
- ColorWheel
- ColorWheelTrack

### Slider And Range

- NumberField
- Slider
- SliderOutput
- SliderThumb
- SliderTrack

### Motion

- SharedElement
- SharedElementTransition

### Toolbar And File Triggers

- FileTrigger
- Toolbar

### Unstable Toast

- UNSTABLE_Toast
- UNSTABLE_ToastContent
- UNSTABLE_ToastList
- UNSTABLE_ToastRegion

### Re-Exported From `react-aria`

- Focusable
- Pressable
- VisuallyHidden
