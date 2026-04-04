# MUI Dense, Plan07

`plan06` proved that the gallery can consume a local reusable layer, but the API is still shaped more like internal wiring than something a product team would adopt directly. A caller still has to assemble several moving parts: preset selection, advanced theme-feature toggles, theme-builder inputs, the Data Grid wrapper, and gallery-shaped adapter glue.

<!-- prettier-ignore -->
<blockquote><details><summary>Comments</summary>

- MAH: What do you mean by "split across several concepts"?

- CDX: Clarified the paragraph to name the separate moving parts directly: presets, advanced feature toggles, theme-building inputs, the grid wrapper, and gallery-only adapter glue were still separate concerns a consumer had to coordinate.

- MAH: Nice. Resolved.

<!-- prettier-ignore -->
</details></blockquote><br>

A consuming app should be able to enter through `lib/`, choose a dense preset, optionally override a few dense settings, build the theme with `createDenseTheme`, and render `DenseDataGrid` without learning implementation internals or anything about gallery state. The gallery can keep its richer local controls, but it should translate them into that same feature-named preset/config surface rather than maintain a parallel model.

Reusable mui-dense policy should stay mostly in MUI theme logic, default props, style overrides, and thin TSX wrappers. If some gallery CSS is actually required for mui-dense behavior, first try to move that policy into the theme or wrapper layer and remove the CSS. If some required policy is still cleaner in CSS, note it in `outcome.md` so we can decide later whether it belongs in the reusable layer.

Validation should come from consumption. When this pass is done, the gallery should import from `lib/`, use the feature-named API directly, and keep only gallery-specific metadata and translation logic outside that directory. Tests should target that same public surface.
