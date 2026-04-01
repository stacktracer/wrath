# Plan05 Classification Inventory

## Baseline Counts

Counts captured before code edits:

- `font-weight: 600` in component CSS: `3`
- `font-weight: 700` in component CSS: `2`
- `999px` in component CSS: `9`
- hard-coded white thumb/swatch borders in component CSS: `2`
- focus-offset literals in component CSS:
    - `1px`: `1`
    - `2px`: `6`
    - `3px`: `2`
- recurring full `color-mix(...)` expressions grouped by role:
    - subtle hover wash on page/panel surfaces: choice controls, menu/list/tree/table/calendar/drop zone
    - soft selected fill on neutral or transparent surfaces: grid list, table, tree, color picker, overlays
    - soft selected fill on control surfaces: buttons, list box, tags
    - stronger accent border emphasis on selected state: buttons, tags, color picker, switch, list box, drop indicator, calendar
    - invalid border emphasis: fields, date/time

## Classification Table

| family                                    | representative declarations                                                               | current files                                                                             | design decision                                                      | chosen home                                         | reasoning                                                                                                  |
| ----------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| typography emphasis                       | `font-weight: 600`, `font-weight: 700`                                                    | `primitives.css`, `buttons.css`, `toast.css`                                              | repeated UI emphasis levels                                          | alias plus semantic                                 | raw weights should have primitive names; common UI emphasis should use semantic roles                      |
| full round shape                          | `border-radius: 999px`                                                                    | `choice-controls.css`, `color.css`, `date-time.css`, `range-and-progress.css`, `tags.css` | "fully rounded" is a durable shape role, not a nuisance literal      | alias plus semantic                                 | this is cross-family shape data and should not stay anonymous                                              |
| focus geometry                            | `outline-offset: 1px`, `2px`, `3px`, `-1px`, `-2px`                                       | several family files                                                                      | near / default / loose / inset focus placement                       | semantic                                            | offsets recur as shared geometry roles rather than one-off numbers                                         |
| control sizing                            | `min-block-size: 2.5rem`, `2.75rem`                                                       | `buttons.css`, `list-and-select.css`, `date-time.css`                                     | baseline control height versus field/select height                   | semantic                                            | these are cross-family control roles                                                                       |
| contrast stroke around thumbs             | `2px solid #ffffff`, `0 0 0 1px rgba(0, 0, 0, 0.22)`                                      | `color.css`, `range-and-progress.css`                                                     | contrasting outline treatment for thumb-like controls                | semantic                                            | same role appears in more than one family                                                                  |
| selected / hover / invalid formulas       | repeated full `color-mix(...)` calls                                                      | many family files                                                                         | shared state-emphasis roles                                          | semantic when cross-family, family-local when local | full expressions should move out of point-of-use declarations; not every expression deserves a global role |
| switch geometry                           | `2.75rem`, `1.6rem`, `1.1rem`, `0.15rem`, `translateX(1.1rem)`                            | `choice-controls.css`                                                                     | coordinated track/thumb/travel system                                | family-local `--_...`                               | this mini-system is meaningful only inside choice controls                                                 |
| color thumb / swatch geometry             | `1.1rem`, `2.75rem`, `18rem`, `15rem`                                                     | `color.css`                                                                               | coordinated color-control geometry                                   | family-local `--_...`                               | these sizes are specific to the color family                                                               |
| calendar cell geometry                    | `2.3rem`, `0.25rem`, `0.3rem 0.45rem`                                                     | `date-time.css`                                                                           | date segment and calendar cell fit                                   | family-local `--_...`                               | repeated within the family, not strong enough as global semantics                                          |
| keyboard keycap geometry                  | `1.75rem`, `0.18rem 0.45rem`                                                              | `primitives.css`                                                                          | keycap fit and typography                                            | family-local `--_...`                               | local anatomy, but should still be named inside the family                                                 |
| overlay geometry and motion               | `min(30rem, calc(100vw - 2rem))`, `0.875rem`, `8.5rem`, `translateY(0.35rem) scale(0.98)` | `overlays.css`                                                                            | overlay max width, arrow size, drop zone sizing, local pop-in motion | family-local `--_...`                               | these are local overlay concerns; the full expressions should still be named                               |
| toolbar / tab strip / menu shell formulas | `color-mix(...)` calls used once per family                                               | `toolbar.css`, `tabs.css`, `menu.css`                                                     | family-specific shell background treatment                           | family-local `--_...` or semantic if reused         | full expressions should not stay inline, but one-off formulas do not all need global promotion             |

## Literal Retention Rule For This Pass

If a literal remains in a component CSS file after the refactor:

- it must either live inside a family-local `--_...` token or directly on the declaration with a short justification comment
- the comment must explain why the value stays local instead of moving to alias, semantic, or a broader family-local mini-system
- zero values and obvious structural CSS such as `1fr`, `100%`, or `transparent` are not the main target of this pass unless they are part of a suspicious recurring expression

## Planned Material Changes

The value families expected to materially change in this pass are:

1. named font-weight roles replacing raw `600` and `700`
2. named full-round shape replacing `999px`
3. named focus-offset roles replacing repeated `1px` / `2px` / `3px` and inset negatives
4. named control-height roles replacing `2.5rem` / `2.75rem`
5. named thumb-contrast roles replacing hard-coded white borders and halo shadows
6. full `color-mix(...)` expressions moved into shared semantic roles or family-local `--_...` tokens instead of remaining inline in component rules
