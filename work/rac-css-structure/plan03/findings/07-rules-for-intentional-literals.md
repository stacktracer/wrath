# 07 Rules For Intentional Literals

## Disposition

Real. Not empty. This is the umbrella track for literal policy across the RAC styling surface, and it should absorb the overlap with theme literals, component literals, and private-token boundary questions instead of splitting them back out.

`02-theme-aliasing-and-literals.md` and `04-literals-in-component-files.md` are the same question at different layers: which raw values should stay raw, and which ones should be promoted. `03-component-local-token-boundary.md` is only a subcase of that question when a family-local `--_...` token is being used to hold a value that might still be better as a literal. There is no separate contract boundary worth tracking here.

## Why This Matters

The current CSS does not have a written rule for intentional literals, but it clearly relies on them in several different ways:

- `src/rac/styles/alias.css` intentionally owns raw palette, size, radius, border, shadow, and motion primitives.
- `src/rac/styles/themes.css` intentionally uses leaf literals for light/dark surfaces, overlays, contrast, and shadows.
- component families intentionally use literals for anatomy-specific geometry, such as pill radii, minimum control heights, thin separators, and fixed thumb sizes.
- `src/rac/styles/document.css` intentionally uses host-shell and gallery-scaffold literals that are not RAC component contract at all.

That means the real decision is not "should literals exist?" They already do. The decision is:

- which literals are stable enough to remain literal by policy
- which literals are repeated enough to justify alias or semantic promotion
- which values belong in private `--_...` tokens because they are family-local tuning knobs
- which values are really document-shell scaffolding and should stay outside the RAC styling contract

Without that rule, future edits will keep oscillating between over-tokenizing obvious anatomy and leaving accidental leaks unclassified.

## Evidence

Representative intentional-literal sites:

- [`src/rac/styles/themes.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/themes.css): `#ffffff`, `rgba(...)`, and shadow literals in theme leaf mappings.
- [`src/rac/styles/components/buttons.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/buttons.css): `min-block-size: 2.5rem;` and `color-mix(...)` values for tone and selected states.
- [`src/rac/styles/components/choice-controls.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/choice-controls.css): `inline-size: 1.2rem;`, `block-size: 1.2rem;`, `inline-size: 2.75rem;`, `block-size: 1.6rem;`, and `translateX(1.1rem)`.
- [`src/rac/styles/components/list-and-select.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/list-and-select.css): `min-height: 2.75rem;` and the private `--_list-item-bg-selected` token.
- [`src/rac/styles/components/date-time.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/date-time.css): `min-height: 2.75rem;`, `padding: 0.3rem 0.45rem;`, `inline-size: 2.3rem;`, and `border-radius: 999px;`.
- [`src/rac/styles/components/overlays.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/overlays.css): `max-inline-size: min(30rem, calc(100vw - 2rem));`, `inline-size: 0.875rem;`, and `@keyframes` motion literals.
- [`src/rac/styles/document.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/document.css): gallery-shell backgrounds, card padding, pill styling, and helper layout literals.

Why these might be acceptable:

- some values are leaf theme choices and are intentionally concrete
- some values are intrinsic to the anatomy, such as circular chips, separators, and compact control chrome
- some values are alignment fixes, such as `calc(var(--control-padding-block) - 1px)`
- some values are host/demo scaffolding and should not be lifted into the component contract at all

Why they might still be a problem:

- the repo has no explicit rule for when a literal is deliberately stable versus merely unabstracted
- the current mixture makes it hard to tell whether a repeated literal should become alias, semantic, private, or remain literal
- private tokens are currently used only sparingly, so the line between "local knob" and "unnecessary extra layer" is not yet obvious

Exact question to answer:

> When a value is repeated in RAC CSS, should the default be "tokenize it," "keep it literal because it is anatomy or theme leaf data," or "hide it behind a private `--_...` token only when a family-local tuning knob is clearly justified"?

## Benchmark Impact

Fixed result template:

- result
- files touched or relied on
- markup changes required
- selector-weight increase required
- private-token dependency
- concrete observable

| benchmark task                                                                         | result             | files touched or relied on                                                                                                                                                                                                               | markup changes required   | selector-weight increase required | private-token dependency                           | concrete observable                                                                                                                                                          |
| -------------------------------------------------------------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | --------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tighten spacing and control sizing coherently across several families                  | works with caveats | `src/rac/styles/semantic.css`, `src/rac/styles/density.css`, `src/rac/styles/components/buttons.css`, `src/rac/styles/components/fields.css`, `src/rac/styles/components/list-and-select.css`, `src/rac/styles/components/date-time.css` | no                        | no                                | no                                                 | shared geometry is centralized, but fixed literals like `2.5rem`, `2.75rem`, `8rem`, `999px`, and `calc(... - 1px)` remain intentional anatomy boundaries                    |
| Leave one intentionally literal value alone and explain why                            | works              | `src/rac/styles/themes.css`, `src/rac/styles/components/choice-controls.css`, `src/rac/styles/components/range-and-progress.css`, `src/rac/styles/components/overlays.css`, `src/rac/styles/document.css`                                | no                        | no                                | no                                                 | theme leaf colors, pill radii, thumb sizes, and shell backgrounds can be justified as concrete design data rather than missing tokens                                        |
| Introduce or classify one new family-local value without broadening the public surface | works with caveats | `src/rac/styles/components/buttons.css`, `src/rac/styles/components/list-and-select.css`                                                                                                                                                 | no                        | no                                | yes, if repeated pressure exists inside one family | `--_button-*` and `--_list-item-bg-selected` show that a private token can be useful, but only when the value is actually a local tuning knob and not just a renamed literal |
| Decide the baseline non-gallery theme and density carrier contract                     | works with caveats | `src/rac/styles/themes.css`, `src/rac/styles/density.css`, `src/rac/styles/document.css`, `src/rac/app.tsx`                                                                                                                              | yes, for carrier wrappers | no                                | no                                                 | literals in theme and document layers do not answer the carrier question; they only define what the carrier is controlling                                                   |

Primary benchmark judgment:

- intentional-literal classification: works with caveats
- family-local tuning without collateral damage: works with caveats
- cross-family coherence: works with caveats, but only when the literal is truly cross-cutting
- public-surface restraint: works, provided private tokens stay private by default

## Dependency Classification

| artifact                                                                                             | source                                                    | stability                           | support level                      | scope / owner                          | public override status                                         |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ----------------------------------- | ---------------------------------- | -------------------------------------- | -------------------------------------------------------------- |
| raw palette, scale, radius, shadow, and motion primitives                                            | `src/rac/styles/alias.css`                                | repo-local design primitive layer   | internal implementation dependency | RAC styling foundation                 | not a public override surface                                  |
| light/dark leaf theme literals                                                                       | `src/rac/styles/themes.css`                               | repo-local theme mapping layer      | internal implementation dependency | theme leaf values and contrast choices | not a public override surface                                  |
| anatomy-specific fixed sizes and offsets                                                             | component family files under `src/rac/styles/components/` | repo-local implementation detail    | internal implementation dependency | per-family geometry and alignment      | not a public override surface unless later findings promote it |
| `--_button-bg`, `--_button-border`, `--_button-color`, `--_list-item-bg-selected`, `--_card-padding` | component and document styles                             | repo-local private-token convention | internal implementation dependency | family-local or gallery-local tuning   | explicitly not public contract                                 |
| gallery-shell and helper literals                                                                    | `src/rac/styles/document.css`                             | repo-local experiment scaffolding   | internal implementation dependency | host-shell and demo layout             | not RAC styling contract                                       |

## Scope And Guardrails

- Do not convert every literal into a token; many values are correct precisely because they are concrete.
- Do not widen `--_...` names into public API just to avoid making a judgment call.
- Do not promote theme leaf values into alias tokens unless the same value is genuinely reused as a primitive scale.
- Do not treat document-shell literals as component styling defects.
- Do not split theme-literal, component-literal, and private-token questions back into separate findings; they are one policy problem.

## Files Reviewed

- [`src/rac/styles/alias.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/alias.css)
- [`src/rac/styles/semantic.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/semantic.css)
- [`src/rac/styles/themes.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/themes.css)
- [`src/rac/styles/density.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/density.css)
- [`src/rac/styles/document.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/document.css)
- [`src/rac/styles/components/buttons.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/buttons.css)
- [`src/rac/styles/components/choice-controls.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/choice-controls.css)
- [`src/rac/styles/components/list-and-select.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/list-and-select.css)
- [`src/rac/styles/components/date-time.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/date-time.css)
- [`src/rac/styles/components/overlays.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/overlays.css)
- [`src/rac/styles/components/range-and-progress.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/range-and-progress.css)
- [`src/rac/styles/components/tags.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/tags.css)
- [`src/rac/styles/components/menu.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/menu.css)
- [`src/rac/styles/components/grid-list.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/grid-list.css)
- [`src/rac/styles/components/table.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/table.css)
- [`src/rac/styles/components/tree.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/tree.css)
- [`src/rac/styles/components/primitives.css`](/home/mike/Documents/projects/wrath/code/src/rac/styles/components/primitives.css)
