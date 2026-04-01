# Plan03 Finding 04: Literals In Component Files

## Disposition

Materially overlapping with finding 07, `Rules For Intentional Literals`.

## Why This Is Not A Separate Track

The component files do contain many raw literals, including:

- [`src/rac/styles/components/color.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/color.css)
- [`src/rac/styles/components/choice-controls.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/choice-controls.css)
- [`src/rac/styles/components/date-time.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/date-time.css)
- [`src/rac/styles/components/overlays.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/overlays.css)
- [`src/rac/styles/components/range-and-progress.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/range-and-progress.css)
- [`src/rac/styles/components/table.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/table.css)

Representative literals include:

- `min-block-size: 2.75rem;`
- `border-radius: 999px;`
- `border: 2px solid #ffffff;`
- `font-weight: 600;`
- `inline-size: 1px;`

That is evidence of the same underlying question, not a separate defect class. The real benchmark question is whether a literal should stay literal, be promoted to a component-local token, or be lifted into a broader semantic/alias layer. That decision is already owned by finding 07 and the benchmark task that asks authors to leave one intentionally literal value alone and explain why.

## Benchmark / Dependency Classification

- benchmark result: merge into finding 07; no separate result needed
- dependency class: existing token-layer classification problem, not a new RAC contract or selector dependency
- public-surface impact: none by itself

## Final Triage

Drop as a standalone finding and treat component-file literals as supporting evidence for finding 07.
