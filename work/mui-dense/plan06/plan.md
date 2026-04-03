# MUI Dense, Plan06

`plan05` made the experiment readable. The remaining problem is API shape: `app.tsx` still assembles dense policy directly, `density-controls.ts` still mixes reusable policy with gallery copy, and `dense-data-grid.ts` still exposes plumbing that ordinary app code should not need. Extracting the current modules as they are would still ship an experiment-shaped library.

This pass should define the first real app-facing surface: a local dense library directory with a narrow entrypoint for presets, a small dense config object, one theme builder, and one MUI X density surface. The gallery can keep richer controls, but it should reach that layer through an adapter and **the same top-level API that a real app would use**. Reusable policy belongs in the dense layer; gallery-only labels and explanatory metadata do not.

The wrapper decision should stay open in general, but Data Grid already looks like a clear case where the low-level wiring should be hidden. Expose either a thin `DenseDataGrid` or an equally thin helper surface that preserves normal `DataGridPro` access, hides measurement plumbing, and allows a small amount of app-level cell edge-padding tuning in `px` or `ex`. Broader wrappers should wait until gallery migration shows stable shared JSX or `sx` policy that theme/config cannot carry cleanly.

<!-- prettier-ignore -->
<blockquote><details><summary>Comments</summary>

- MAH: Explain "the wrapper question" here, or include a reference to an external explanation.

- CDX: I rewrote the paragraph to name the actual decision directly: how much app-facing density policy should live in wrappers versus theme/config builders. It should now stand on its own without needing a back-reference.

- MAH: Looks good. Resolved.

<!-- prettier-ignore -->
</details></blockquote><br>

<!-- prettier-ignore -->
<blockquote><details><summary>Comments</summary>

- MAH: I think I'd like to see `DenseDataGrid` parameterized in a way that allows application-level tuning of how much space/padding there is between cell content and cell edges, in either `px` or `ex` units. I recognize the difficulty that not all cells contain text, but practically speaking, most cells do contain text.

- CDX: Agreed. I added that as a plan requirement for the Data Grid surface, while keeping the boundary narrow: consumers should get a small content-padding tuning knob without being pushed down into refs, probes, or the full measurement path.

- MAH: Resolved.

<!-- prettier-ignore -->
</details></blockquote><br>

Validation should come from consumption. `app.tsx` should become a consumer of the dense entrypoint, with the sidebar translating gallery controls into the smaller library-facing config. Tests should target the public dense entrypoint and Data Grid surface, not just the gallery page. The desired end state is one local dense library directory and a gallery that proves it is usable by a real consumer.

<!-- prettier-ignore -->
<blockquote><details><summary>Comments</summary>

- MAH: Add emphasis, somehow, to the fragment "call the same top-level dense API that a real app would use." That's a critical piece of this plan. Maybe bold it; maybe repeat it earlier in the file as a critical ingredient. Emphasize it strongly, somehow.

- CDX: Agreed. I repeated that requirement earlier in the plan and bolded it here so the gallery's role as an ordinary consumer reads as the main validation criterion, not a secondary implementation detail.

- MAH: Good. Resolved.

<!-- prettier-ignore -->
</details></blockquote><br>
