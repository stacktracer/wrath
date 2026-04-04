# MUI Dense, Plan08

The `DenseSettings` interface is pretty good, but its relationship to the MUI `Theme` interface is awkward. A `DenseSettings` has a `theme` field, but then the `DenseSettings` is combined with additional settings (`light`/`dark` and `animationsDisabled`) to create a MUI `Theme`. The word `theme` means two different things, with quite different relationships to `DenseSettings`.

There's also `DenseSettings` vs `DenseThemeOptions`. They are similar to each other, but not identical. They also complicate the understanding of the relationship between `DenseSettings` and MUI `Theme`.

Tangentially, `light`/`dark` isn't the right API boundary. Instead, accept a palette object directly, of type `PaletteOptions?`, so that our API isn't needlessly constraining the palette options MUI already supports.

<!-- prettier-ignore -->
<blockquote><details><summary>Comments</summary>

- CDX: It would help to name the intended input type here. I think this wants MUI palette options such as `ThemeOptions['palette']`, not a realized `Palette`, so callers can pass ordinary theme config rather than needing an already-created theme object.

- MAH: Yep, `ThemeOptions['palette']`, aka `PaletteOptions?`, sounds right to me. Resolved.

<!-- prettier-ignore -->
</details></blockquote><br>

Hoist all fields from `DenseThemeOptions` and `DenseThemeFeatures` into `DenseSettings`, and include a `disableAnimations` field (rename of `animationsDisabled`) in `DenseSettings` as well. Have `createDenseTheme()` take a `DenseSettings` and a palette. Write a less circuitous impl of `createDenseTheme()`, and delete any of its helper fns that are no longer necessary.

<!-- prettier-ignore -->
<blockquote><details><summary>Comments</summary>

- CDX: This leaves `animationsDisabled` implicit. Please decide in the plan whether it should also move into `DenseSettings`, or stay as a separate `createDenseTheme()` argument because it is app/session policy rather than dense policy.

- MAH: Good call; I definitely had in mind putting `animationsDisabled` inside `DenseSettings`, but I forgot to say so. Fixed the oversight in plan text. Also said to rename it `disableAnimations`, for consistency with the names of other settings. Resolved.

<!-- prettier-ignore -->
</details></blockquote><br>
