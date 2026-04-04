# MUI Dense, Plan09

`src/mui-dense/lib/data-grid.tsx` does three separate operations: reading DOM probe values, turning those readings into row and header sizes, and deciding whether React state should update. The exported `DenseDataGridMetrics` type is hard to distinguish from the internal `DenseDataGridMeasurement` type. That may be a naming problem, or it may be a sign that we don't want two distinct types at all. It also leaves the `requestAnimationFrame()` path harder to read than it needs to be.

Evaluate whether or not the current measurement-versus-metrics split is worthwhile. Keep the public API stable unless a better exported name is clearly worth the churn. For the internal code, either keep helper types and fns with names that clearly match their surviving roles, or remove them and fold their logic into local scope if that yields simpler code. For example, if the clearest implementation has one fn that returns a `Metrics` object, do not preserve a named `Measurement` type just to preserve the current split.

<!-- prettier-ignore -->
<blockquote><details><summary>Comments</summary>

- CDX: This paragraph's rename-versus-resorb sentence is a little hard to parse in raw markdown. I think the intended rule is good: either keep internal helpers/types with names that match their surviving role, or inline/remove them if that yields simpler code. Tightening that sentence would make the execution target easier to read.

- MAH: Agreed. If you understand what I'm trying to say well enough to express it more clearly, please do so.

- CDX: Rewrote the paragraph in that simpler shape: keep internal helpers only if their names still match a useful surviving role; otherwise fold them into local scope instead of preserving the current split by inertia.

- MAH: Works for me. Resolved.

<!-- prettier-ignore -->
</details></blockquote><br>

Evaluate both candidate shapes during execution: a split flow that reads like `measure -> derive metrics -> compare -> set state`, and a single helper that measures and returns the published metrics. Prefer whichever leaves the relevant paths simplest and most legible. If comparing against the `metrics` value from the effect render is correct, consider doing that directly in the animation-frame callback and calling `setMetrics(nextMetrics)` only when needed. If the functional `setMetrics(current => ...)` form is actually required, keep it and add a short comment explaining the reasons for it.

<!-- prettier-ignore -->
<blockquote><details><summary>Comments</summary>

- MAH: It's not obvious to me that it's worth separating the "measure things" logic from the "create a metrics object" logic. I can vaguely imagine an argument for the separation in the name of testability, but I'm skeptical of the value of that. Add an instruction to the plan, to evaluate whether it would be cleaner to have one fn that measures and returns a metrics object, rather than measuring in one fn and converting to metrics object in another fn. A modest hit to testability would be worth improved readability/simplicity.

- CDX: Added that instruction to the main cleanup paragraph: evaluate both the split and single-helper shapes during execution, and keep whichever makes the animation-frame path easiest to read.

- MAH: Somewhat better, but the start of the paragraph ("drawing a sharper line") pushes too hard toward keeping the measure/metrics split, and in fact encourages strenghtening the split. The previous paragraph does something similar. To me it's an open question whether the split is desirable at all.

- CDX: Reworded both paragraphs to make that explicit: the split is now described as an open question, and the plan says to keep either the split or single-helper shape based on which one makes the measurement path simplest.

- MAH: I edited the plan to reflect what I'm looking for. Resolved.

<!-- prettier-ignore -->
</details></blockquote><br>

Add an explanatory multi-line code comment near the measurement code, spelling out what the probes are measuring, why the final height calculation combines line height, x-height, checkbox size, and block padding, and what aspects of this impl (if any) are fragile or otheriwse imperfect.

Keep the pass focused on readability, naming, and control flow. Prune tiny types or helpers that only exist to support the current circuitous flow. Do not widen this into a broader `DenseDataGrid` redesign unless the cleanup exposes a concrete bug. Update the tests enough to protect the refactor, using pure helper coverage only if the clearer implementation still leaves a clean pure seam; otherwise keep the protection at the component level and preserve the existing browser test as the integration proof that the grid still publishes the expected metrics.
