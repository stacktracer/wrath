# Plan02 Execution Notes

## Initial Read

- The repo is still very small: one RAC experiment, one stylesheet, one token file, one mount test.
- `plan.md` is materially more ambitious than the current app. This is a ground-up gallery and CSS-architecture replacement, not an incremental refactor.

## API Surprises

- `ColorPicker` is a state/composition provider and does not own a DOM node. It can be part of the gallery, but there is no direct CSS selector for the component itself.
- `DropIndicator` also does not have a simple standalone public rendering path. It is normally emitted from drag-and-drop collection contexts. If I need a visible static sample in the gallery, I will have to use its exported context rather than a normal standalone usage pattern.
- Several overlay components portal by default. To keep the gallery readable while still showing open overlay states, it is probably worth using local portal containers for the demo surface rather than letting every open example escape to `document.body`.

## Mid-Implementation Notes

- The RAC app is now a full gallery rather than the previous table/tree comparison.
- CSS moved into `src/rac/styles/` with the planned import order and family split.
- The overlay gallery uses local portal containers so open popovers, tooltips, and modal examples can remain visible without taking over the entire document.
- The first build after the gallery landed succeeded, but Vite emitted a chunk-size warning because this experiment imports a very large swath of RAC. That is acceptable for the experiment page, but it is worth remembering that the gallery is intentionally not production-shaped.

## Late Lessons

- `SelectionIndicator` cannot be dropped arbitrarily into any selected-looking control. It requires `SharedElementTransition` context, so it works naturally in families like `ListBox`, `Menu`, `Tree`, `Table`, `RadioGroup`, and `TagGroup`, but not in `Checkbox` without additional scaffolding.
- The color demos are sensitive to color-space alignment. A hue `ColorSlider` needed an explicit `colorSpace="hsb"` so it could speak the same channel vocabulary as the `ColorArea` and `ColorWheel`.
- React Aria field composition will warn if `defaultValue` is put on `Input` / `TextArea` children instead of the owning field component. The stable pattern is to keep value props on `TextField`, `SearchField`, `NumberField`, `ColorField`, and similar roots.

## Post-Implementation Regression

- The first overlay gallery pass still had an interaction bug: open `Popover` demos looked visually local because of the custom portal container, but RAC still rendered a fixed underlay unless `isNonModal` was set.
- That underlay explained the browser symptoms immediately: no page scrolling, no text selection, and no interaction with controls outside the overlay examples.
- The fix was to keep the always-open popover and menu demos `isNonModal`, and to keep the modal example launchable rather than booting open.
