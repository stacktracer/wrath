# MUI Dense, Plan13

`plan12` left `DenseDataGrid` in an awkward middle state. The wrapper now has a cleaner text-driven sizing rule, but it still picks that typography for itself by probing `body2` inside `lib`. That is convenient for the gallery, but not for a reusable boundary: an application can change row or header text styling without changing `DenseSettings`, and then the computed heights are based on the wrong typography.

This pass should separate sizing policy from measurement. `lib` should expose an opt-in layered API: a pure core that turns row and header line heights plus `textVerticalPadding`, device-pixel snapping, and MUI density compensation into the heights that `DataGridPro` needs, with optional measurement helpers above that core. That upper layer may include a caller-invoked attach-probe helper that mounts hidden probes alongside the grid host. Keep the decision to invoke any helper with the caller rather than inside `DenseDataGrid`. The reusable path may measure caller-provided representative content, but it should not depend on reading live grid cells or other MUI implementation details.

<!-- prettier-ignore -->
<blockquote><details><summary>Comments</summary>

- MAH: Clarify "burying it inside." I think we're on the same page; just clarify the wording. I think what we want to convey there is burying the control-flow, the decision to run the logic.

- CDX: Clarified. The plan now says to keep the decision to invoke any helper with the caller rather than inside `DenseDataGrid`.

- MAH: Resolved.

<!-- prettier-ignore -->
</details></blockquote><br>

<!-- prettier-ignore -->
<blockquote><details><summary>Comments</summary>

- MAH: Clarify "near a grid component." Near in what sense?

- CDX: Clarified. The plan now says the attach-probe helper would mount hidden probes alongside the grid host.

- MAH: Resolved.

<!-- prettier-ignore -->
</details></blockquote><br>

<!-- prettier-ignore -->
<blockquote><details><summary>Comments</summary>

- MAH: Update the final thought "do not make the reusable story depend on sampling live grid internals." Make sure that instruction doesn't prohibit or interfere with the option to attach a probe.

- CDX: Clarified. The restriction now targets reading live grid cells or other MUI implementation details, not caller-invoked probe attachment.

- MAH: Resolved.

<!-- prettier-ignore -->
</details></blockquote><br>

The utility should accept optional row and header line heights. If row line height is omitted, let `lib` fall back to a documented default; if header line height is omitted, let it fall back to row line height. Use the gallery to prove both that API shape and the intended call patterns: direct line-height inputs, lower-level measurement helpers, and possibly an attach-probe convenience built on top of those lower-level pieces.

<!-- prettier-ignore -->
<blockquote><details><summary>Comments</summary>

- MAH: Pretty sure what we want here is to accept row and header line heights separately, and to make each of them optional. If row line height is unspecified it falls back to some default. If header line height is unspecified it falls back to row line height. Unless I'm missing something, we ~~need~~ **don't need** the proving exercise; that's the answer that will serve callers best.

- CDX: Agreed. I changed the plan text to make that the target API shape instead of leaving it as an execution-time choice. The gallery exercise now proves the fallback behavior rather than deciding whether the split is needed.

- MAH: Cool, and thank you for understanding what I meant despite the missing "don't". Resolved.

<!-- prettier-ignore -->
</details></blockquote><br>

Validation should come from both purity and consumption. Add direct tests for the pure sizing utility that lock down padding resolution, device-pixel snapping, and density-factor compensation without rendering the grid, then keep a browser-level proof that the gallery supplies the text knowledge and the grid follows it. If row and header text can diverge without forcing another `lib` rewrite, that is the strongest proof point. Record in `outcome.md` what `lib` still owns.

<!-- prettier-ignore -->
<blockquote><details><summary>Comments</summary>

- MAH: I may be misunderstanding this part ... but I definitely want `lib` to contain helper code for converting text info (in some form -- maybe text metrics, maybe text style, maybe a DOM element whose text we want to measure), and ancillary settings like row vertical padding, into row height. We probably don't want that baked into a component impl that lives in `lib`, where a caller can't control it. But we absolutely want `lib` to provide that kind of functionality to a caller in an opt-in fashion.

- CDX: Agreed. I rewrote the paragraph to say that more directly: keep a pure line-height-to-grid-height core in `lib`, and allow a small opt-in helper there if it cleanly derives those line heights from caller-provided text information.

- MAH: I disagree with the line about moving probe logic out of `lib`. We want the logic in `lib`; there is no doubt in my mind that we want the logic in `lib`. What we don't want in `lib` is the control flow -- leave it up to the caller whether the probe logic ever gets invoked. `lib` does all the impl work; all the caller has to do is decide whether to use the `lib`-provided logic, or its own custom impl instead.

- CDX: Agreed. I changed the plan text to draw that boundary explicitly: keep probe implementation in `lib`, but move the decision to invoke it out of `DenseDataGrid` and up to the caller.

- MAH: For me the phrase "have the gallery decide ... what representative text it should measure" leaves the meaning of the word "text" ambiguous. Is the gallery deciding ... the text string to measure? the text metrics? the computed-style? the text DOM element?

- CDX: Clarified. The plan now says the caller chooses the representative input contract for the helper, for example a hidden probe element or another caller-owned description of the intended row/header text styling.

- MAH: Yeah that's close now. But leave open the possibility that `lib` will provide a utility that creates a hidden probe and attaches it to a DataGrid component. That's what strikes me as the likely sweet spot for most callers. `lib` can also expose the lower-level utility fns to the caller, to maximize the caller's options. But a "most callers should just call this attach-probe" fn, built on top of the lower-level utility fns, would lower the burden `lib` places on callers, without robbing callers of their control.

- CDX: Agreed. I changed the plan text to leave room for that layered shape explicitly: pure sizing core, lower-level measurement helpers, and possibly a higher-level attach-probe helper in `lib`, as long as the caller still decides whether to use it.

- MAH: Resolved.

<!-- prettier-ignore -->
</details></blockquote><br>
