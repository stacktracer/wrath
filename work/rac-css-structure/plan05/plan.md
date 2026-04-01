# Plan05: Rebuild The RAC CSS Value-Classification Model

`plan03` cleaned up important import, carrier, and ownership issues. `plan04` diagnosed why the remaining factoring complaints still felt obviously valid afterward: the CSS architecture is under-classifying meaningful design decisions.

This pass is for fixing that directly.

The core problem is not "there should be more tokens" in the abstract. The problem is that too many recurring values never had to answer a serious classification question. They were allowed to remain raw because the working mental model was too small:

- public semantic token
- or literal

That is not enough. This pass must actively classify suspicious value families into four buckets:

- alias primitive
- shared semantic role
- family-local `--_...` token
- intentional literal

If a value family does not go through that classification step, this pass has failed, even if the resulting CSS looks cleaner locally.

## Required Context

Read these before starting implementation:

1. `work/rac-css-structure/plan03/plan.md`
2. `work/rac-css-structure/plan03/conclusions.md`
3. `work/rac-css-structure/plan03/outcome.md`
4. `work/rac-css-structure/plan04/exec.md`
5. `work/rac-css-structure/plan04/outcome.md`

Re-read `plan04/outcome.md` immediately before making any code edits.

## Constraints

- Stay local to `src/rac/`.
- Keep using plain CSS and direct RAC styling with `.react-aria-*` roots plus RAC `data-*` state hooks.
- Do not introduce wrapper components, utility classes, CSS Modules, Tailwind, or a new styling library.
- Do not widen private `--_...` tokens into a public API unless there is an explicit, well-defended reason.
- Do not mass-tokenize literals just to reduce grep noise.
- Do not let a token-count target drive the work mechanically. The point is better classification, not larger inventories for their own sake.
- In CSS function-heavy spots such as `color-mix(...)`, gradients, shadows, transforms, and similar expressions, treat the whole function call as the candidate value under review, not just its numeric arguments. If the expression encodes a reusable design decision, factor the expression itself into an appropriate variable tier.
- Any literal intentionally left in a component CSS file must carry a short comment justifying why it remains literal there. This is intentionally a little ugly: the extra local cognitive load is part of the pressure to avoid casual literals in component CSS.

## Success Criteria

This pass should produce all of the following:

1. A written classification inventory for the suspicious recurring value families.
2. Real CSS edits that move values into better layers.
3. A semantic surface that is broader than the current spacing-heavy set, but still bounded and legible.
4. Stronger family-local `--_...` factoring where one component family has several coordinated values.
5. A literal policy that still permits true one-offs, but no longer lets repeated design decisions slip through unclassified.
6. Verification that the complained-about value families materially changed.

If the outcome can be summarized only as "docs are clearer now," the pass did not go far enough.

## Benchmark Value Families

At minimum, classify and make an explicit decision for these families:

1. Typography emphasis
    - examples: `font-weight: 600`, `font-weight: 700`
2. Shared shape roles
    - examples: `border-radius: 999px`, `50%`, control radius versus fully rounded radius
3. Shared control and item sizing
    - examples: `2.5rem`, `2.75rem`, `1.75rem`, `1.15rem`
4. Focus geometry
    - examples: outline offsets of `1px`, `2px`, `3px`
5. Contrast strokes and thumb/swatch outlines
    - examples: `2px solid #ffffff`, dark halo shadows around light thumbs
6. Shared state emphasis
    - examples: recurring `color-mix(...)` percentages for hover, selected, invalid, disabled, overlay translucency, and border emphasis
7. Coordinated family-local geometry
    - examples: switch track size, switch thumb size, switch thumb travel, calendar cell size, color thumb size
8. Reusable function expressions
    - examples: full `color-mix(...)` calls, gradient expressions, shadow formulas, and transforms that may deserve naming as complete values rather than as bags of literals

Each family does not need the same answer. The important part is that each one gets an answer.

## Deliverables

Produce these artifacts during execution:

- `work/rac-css-structure/plan05/classification.md`
    - the candidate value-family inventory and final bucket decisions
- `work/rac-css-structure/plan05/exec.md`
    - implementation log and checkpoint notes
- `work/rac-css-structure/plan05/outcome.md`
    - summary of actual code moves, final diagnoses, and any deferred follow-ups

## Step 1: Build The Classification Inventory Before Editing

Before changing CSS, create `classification.md`.

For each candidate family, record:

- representative current declarations
- current files
- what design decision the values are expressing
- whether the best home is:
    - alias
    - semantic
    - family-local `--_...`
    - literal
- if the answer is literal, why naming it would make the system worse rather than better

Do not allow "seems fine as a literal" without a concrete reason.

Also record a short quantitative baseline for the specific families under review:

- count of `font-weight: 600` and `font-weight: 700`
- count of `999px`
- count of hard-coded thumb/swatch white borders
- count of recurring focus-offset literals
- count of recurring `color-mix(...)` formulas grouped by role rather than just raw total
- count of repeated full function expressions that appear reusable as complete named values

This baseline is not busywork. It is the proof target for the end of the pass.

## Step 2: Decide The Missing Alias Primitives

Review `src/rac/styles/alias.css` specifically for durable raw values that should have names before semantic mapping begins.

Candidates to consider explicitly:

- font-weight scale names
- a fully rounded radius token
- any other raw geometry constants that recur across families without carrying higher-level meaning

A value belongs here when it is:

- durable
- low-level
- broadly reusable
- not specific to one component family

Do not promote state formulas or component-specific geometry into the alias layer.

## Step 3: Expand The Semantic Layer Around Real Shared Roles

Review `src/rac/styles/semantic.css` after Step 2 and broaden it beyond spacing-only concerns.

At minimum, evaluate whether the semantic layer should directly model:

- typography emphasis roles
- shared control sizing roles
- shared shape roles
- focus geometry roles
- shared state-emphasis roles
- contrast/chrome roles that recur across multiple families

Do not add a token merely because two files share a number.

Do add a token when all of the following are true:

- the value encodes a real design decision
- the decision recurs across several families
- naming it improves future tuning more than it increases cognitive load

The old soft ceiling still applies: prefer a bounded semantic surface, likely somewhere in the rough `24-40` range after this pass. But do not pre-commit to a number and then backsolve the design model to fit it.

## Step 4: Strengthen Family-Local `--_...` Layers

Revisit component-family files and add private tokens where the family clearly has an internal mini-system that should be legible as such.

Priority candidates:

- `src/rac/styles/components/choice-controls.css`
- `src/rac/styles/components/color.css`
- `src/rac/styles/components/date-time.css`
- `src/rac/styles/components/range-and-progress.css`
- `src/rac/styles/components/primitives.css`

Use family-local tokens when:

- several declarations in one family move together
- the relationship is meaningful within that family
- the value does not justify semantic promotion

Do not create `--_...` names that simply rename a one-off literal and then get used once.

## Step 5: Reclassify Shared State And Emphasis Formulas

Audit recurring `color-mix(...)` formulas and similar state treatments.

Do not start from percentages. Start from roles, and treat the complete function call as a candidate design value when it recurs.

Examples of roles that may deserve shared treatment:

- subtle hover wash
- soft selected fill
- selected border emphasis
- invalid border emphasis
- disabled surface muting
- overlay translucency level

For each recurring role, decide whether the right home is:

- a theme leaf token in `themes.css`
- a semantic role in `semantic.css`
- a family-local token
- or an intentional literal because the treatment is genuinely local

The main question is not "can these all share one number?" It is "which of these are actually the same design decision?"

If the answer is yes, prefer naming the resulting expression itself, for example a shared hover/selected/background role, rather than merely naming a percentage inside the function and leaving the expression inline everywhere.

## Step 6: Update The Written Contract

After the code edits, update the source-adjacent guidance in `src/rac/styles/README.md` if the supported layering rules or naming guidance changed.

Specifically document:

- the expanded value-classification model
- when alias vs semantic vs family-local is expected
- the stronger burden of proof for retaining a repeated literal

Keep the guidance short and operational. It should help the next maintainer make the next decision correctly.

Also document the literal-comment rule for component CSS:

- if a literal survives in a component file, add a short comment explaining why that literal stays local instead of moving to alias, semantic, or family-local token layers
- keep these comments terse and decision-focused
- do not add such comments in alias or theme files just because those files intentionally own raw design data

## Step 7: Add Stronger Execution Checkpoints

During execution, add mandatory checkpoints in `exec.md`:

1. After completing `classification.md`, pause and re-read the original complaints from `plan04/plan.md`.
2. Before editing CSS, write a short list of the value families that will materially change in this pass.
3. After editing CSS, run the same grep/count checks captured in Step 1.
4. Re-read `classification.md`, `exec.md`, and the complaint list together.
5. In `outcome.md`, include a section named `What Materially Changed`.

That section must name concrete value-family outcomes, for example:

- `font-weight` literals replaced by named aliases or roles
- `999px` replaced by a named full-round token
- thumb outline treatment factored into a shared role or family-local system
- repeated selected-state mixes consolidated into named roles where appropriate

If that section is thin or vague, the pass is incomplete.

## Step 8: Verification

Because this pass changes source CSS, run the normal verification steps before finishing:

- `npm run format`
- `npm run lint`
- relevant tests
- `npm run test` if the changes touch the styling contract broadly
- `npm run build` because this pass will affect styles and likely entrypoint-visible rendering

If any of these fail, fix them or stop and explain the blocker.

## Expected Direction

The expected outcome is not a huge new abstraction stack.

The expected outcome is:

- a healthier alias layer
- a more complete semantic layer
- more legible family-local systems
- fewer unexplained repeated literals
- better evidence that the CSS is expressing real design decisions instead of hiding them

That is the standard this pass should meet.
