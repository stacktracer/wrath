# 03. Component-Local Token Boundary

## Disposition

- `result`: materially overlaps with `04-literals-in-component-files`, and partly with `06-document-layer-ownership`; drop this as a standalone track.
- `why`: the current private-token question is not separable from the literal-vs-token classification question. The only private-token sites in `src/rac/styles/` are the button tone/state tokens, one list-selection token, and one document helper padding token. That means the real decision is already “which values should be semantic, private, or literal?” rather than “is there a separate component-local boundary problem?”

## Benchmark Framing

- `primary benchmark`: family-local tuning without collateral damage.
- `current result`: works with caveats.
- `concrete observable`: local retuning is possible, but the current `--_...` footprint is too small to justify a separate boundary track; the meaningful improvement path is to classify the existing values correctly, not to invent a larger private-token layer.
- `distinct payoff`: no separate benchmark win is visible for a standalone token-boundary issue beyond what the literal and document-ownership tracks already cover.

## Dependency Classification

- `--_button-bg`, `--_button-border`, `--_button-color`: repo-local convention; internal implementation dependency; not a supported external override surface.
- `--_list-item-bg-selected`: repo-local convention; internal implementation dependency; not a supported external override surface.
- `--_card-padding`: gallery/document helper state, not a component-local contract.

## Scope Narrowing

- Keep this question folded into `04-literals-in-component-files` for token-classification decisions.
- Keep `--_card-padding` folded into `06-document-layer-ownership` because it is a document/helper concern, not a family boundary concern.
- Do not widen `--_...` names into public contract.

## Files Reviewed

- `src/rac/styles/components/buttons.css`
- `src/rac/styles/components/list-and-select.css`
- `src/rac/styles/document.css`
