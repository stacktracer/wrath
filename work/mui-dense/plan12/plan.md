# MUI Dense, Plan12

`plan11` fixed the clipping bug, but the reusable surface still mixes gallery ownership with weak library naming. `src/mui-dense/lib/index.ts` still exports `DENSE_PRESETS`, `src/mui-dense/lib/presets.ts` mostly exists to hold gallery presets plus the baseline settings object, `src/mui-dense/lib/types.ts` still has `DenseDataGridOptions` and `DenseDataGridDensity`, and `cellBlockPadding` no longer matches the behavior because `0px` still leaves obvious extra vertical space.

This pass should make `lib` read like a small app-facing library. Keep `DEFAULT_DENSE_SETTINGS` reusable, but colocate it with `DenseSettings` instead of keeping a presets file for it, renaming the file if appropriate. Move `DENSE_PRESETS` out of `lib` and into the gallery layer, and move `DensePreset` with it or drop the named type if preset keys alone are enough. After that change, the reusable exports should be the baseline settings, the theme builder, and the grid wrapper, not the gallery preset table.

<!-- prettier-ignore -->
<blockquote><details><summary>Comments</summary>

- CDX: This paragraph says to colocate `DEFAULT_DENSE_SETTINGS` with `DenseSettings`, but today `DenseSettings` lives in `types.ts`. I think the intent is good, but the plan may want to make explicit that execution can rename that file or introduce a better-named replacement such as `settings.ts`, rather than preserving a misleading `types.ts` filename just to satisfy the colocating requirement.

- MAH: Tweaked. Good enough?

- CDX: Yes. This makes the file-shape intent explicit enough for execution.

- MAH: Resolved.

<!-- prettier-ignore -->
</details></blockquote><br>

Use the same pass to simplify the grid settings naming. Either inline the grid sub-shape directly inside `DenseSettings`, or keep a helper only if doing so is truly helpful, in which case give it a better name such as `DenseDataGridSettings`. Drop `DenseDataGridDensity` and write the density field the same way the rest of `DenseSettings` is written, as a string-literal union. Rename `cellBlockPadding` to something that actually conveys "extra vertical space around cell and header content"; `cellContentVerticalPadding` is a reasonable starting point but longer than ideal, so execution can choose a shorter name as long as its meaning is still clear.

The zero case needs a real behavioral fix, not just a rename. In `src/mui-dense/lib/data-grid.tsx`, `0px` still produces padding-like slack, so the sizing math is still adding extra space even when the caller asks for none. Trace that through the measurement model rather than through CSS alone. The desired behavior is simple: zero adds no caller-controlled vertical padding beyond the intrinsic height needed to avoid clipping text or checkboxes. Update the direct tests and README to match the smaller surface and renamed setting, with regression coverage that proves `0px` materially shrinks row and header heights relative to `1px`. Write `outcome.md` with any remaining ambiguity about intrinsic height versus caller-controlled extra padding.
