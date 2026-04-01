# Plan05 Execution Log

## Context Check

Required context re-read before editing:

- `plan03/plan.md`
- `plan03/conclusions.md`
- `plan03/outcome.md`
- `plan04/exec.md`
- `plan04/outcome.md`

Immediate reminder from `plan04/outcome.md`:

- the old review drifted because it treated too many meaningful design decisions as literals or documentation questions instead of forcing a classification decision

## Checkpoint 1: Post-Classification Re-Read

Re-read the original complaints from `plan04/plan.md` after finishing `classification.md`.

Main takeaways before editing:

- the complaints are still directly visible in the live CSS
- several values want different homes, not one universal "tokenize/don't tokenize" answer
- full function expressions such as `color-mix(...)` need classification as complete values, not just as bags of numeric arguments

## Checkpoint 2: Planned Material Changes Before Editing

This pass will materially change:

1. shared font-weight usage
2. fully rounded radius usage
3. focus-offset usage
4. shared control min-height usage
5. thumb/swatch contrast outlines
6. recurring state-emphasis `color-mix(...)` expressions
7. local family geometry in choice controls, color controls, date/time, primitives, and overlays

## Checkpoint 3: Post-Edit Count Pass

After editing and re-running the baseline greps:

- `font-weight: 600` in component CSS: `0`
- `font-weight: 700` in component CSS: `0`
- `999px` in component CSS: `0`
- hard-coded white thumb/swatch borders in component CSS: `0`
- raw numeric focus offsets in component CSS: `0`

Additional observations:

- `semantic.css` now defines `27` shared roles, up from `9`
- the remaining `color-mix(...)` calls inside component stylesheets are now family-local `--_...` token definitions with justification comments
- ordinary component declarations no longer contain raw `color-mix(...)` state formulas, raw `600`/`700` weights, raw `999px` radii, raw thumb borders, or raw focus-offset numbers

## Checkpoint 4: Final Re-Read Against The Complaints

Re-read the original complaint set after the refactor.

Result:

- the "too few semantic tokens" complaint is materially addressed without pushing every one-off into the shared surface
- the `font-weight: 600` complaint is resolved through alias plus semantic roles
- the `999px` complaint is resolved through `--radius-full` and `--shape-full-radius`
- the hard-coded thumb border complaint is resolved through shared thumb-contrast roles
- the `color-mix(...)` complaint is addressed in both ways:
    - shared state formulas moved into `semantic.css`
    - local formulas moved into commented family-local `--_...` tokens instead of staying inline

## Verification

Ran successfully on April 1, 2026:

- `npm run format`
- `npm run lint`
- `npm run test`
- `npm run build`

Residual note:

- the known large RAC experiment bundle warning still appears during `npm run build`
