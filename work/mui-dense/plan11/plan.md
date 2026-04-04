# MUI Dense, Plan11

`plan10` improved the `cellBlockPadding` API, but it also made a preexisting rendering bug easier to see: large block padding values clip Data Grid text, header labels, and header checkboxes. The current wrapper applies `paddingBlock` to the outer `.MuiDataGrid-cell` and `.MuiDataGrid-columnHeader` slots even though MUI X also gives those slots fixed height, fixed line-height, and `overflow: hidden`. That is the wrong place for a knob whose job is to create more vertical breathing room.

First update the browser tests enough to catch the clipping regression and the API narrowing. If a perfect automated "not clipped" assertion is impractical, add the strongest DOM-level regression coverage available for a large padding case and record any remaining manual risk in `outcome.md`.

Then fix the issue by changing where `DenseDataGrid` applies block padding. Do not preserve the current outer-slot approach if it keeps fighting MUI X's height model. The target is concrete: values such as `20px`, `2cap`, or `3ex` should add visible vertical space without clipping plain text cells, row checkboxes, header labels, or header checkboxes. Keep the measurement model aligned with the rendered styling so the metrics describe the same box the user sees.

Use the same pass to narrow `DenseDataGridOptions`. `headerFilters` and `headerFilterHeight` read more like ordinary Data Grid feature props than dense policy, so remove them from the reusable dense API unless execution turns up a compelling reason the wrapper must own them. The likely end state is that `DenseDataGrid` stops omitting those props from `DataGridProProps`, callers pass them directly, and the gallery keeps any related controls local instead of threading them through `DenseSettings`.

Ideal behavior would be to auto-compute the height of the a header filter, then add the same cell block padding we're adding in the cells and column headers. That way the wrapper can auto-size the filter row without needing extra settings. If there's not a clean way to compute the height of a header filter, include in `outcome.md` a discussion of options for handling the situation. Options might include approaches for approximating header filter height, using a multiple of row height or column header height, or punting entirely and making it the application's problem to specify a pixel height.

<!-- prettier-ignore -->
<blockquote><details><summary>Comments</summary>

- CDX: This leaves one ownership question open after the earlier API-narrowing paragraph. If `headerFilters` / `headerFilterHeight` move out of `DenseDataGridOptions`, should `DenseDataGrid` still derive a default header-filter height when callers enable header filters but omit the prop, or should the wrapper stop owning filter-row sizing entirely and just pass through MUI behavior? The execution shape changes depending on which boundary you want.

- MAH: Took a stab at clarifying. Is that sufficient?

- CDX: Yes. This now reads as: move the knobs out of the dense API, but still prefer wrapper-owned auto-sizing for the filter row when that can be done cleanly. That is specific enough for execution.

- MAH: Resolved.

<!-- prettier-ignore -->
</details></blockquote><br>

Update the README if the public `DenseDataGrid` surface changes materially from `plan10`.
