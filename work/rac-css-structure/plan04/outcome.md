# Plan04 Outcome

## Diagnosis

### 1. The value-classification model is underpowered

The current CSS review mindset has been acting as if every suspicious value must answer one question:

- public semantic token, or literal?

That is too small a model. A healthy CSS system here needs four buckets:

- alias primitive
- shared semantic role
- family-local `--_...` token
- intentional literal

Because the review kept collapsing the first three into the last two, meaningful design decisions stayed unnamed.

Visible symptoms:

- `font-weight: 600` instead of a named weight primitive or role
- `999px` instead of a named full-round radius
- `2px solid #ffffff` instead of separately named width and contrast-stroke decisions
- repeated `color-mix(...)` percentages left inline at point of use

### 2. The semantic layer was treated as a liability to minimize, not a model to complete

The current semantic layer in [`src/rac/styles/semantic.css`](../../src/rac/styles/semantic.css) has only `9` tokens, and most of them are spacing-related. Earlier planning expected something more like a bounded but real semantic surface, roughly in the `24-32` range.

That gap matters. The current system barely models:

- typography emphasis
- shared size roles
- shared shape roles
- state-emphasis strength
- contrast/chrome details that recur across families

The result is not simplicity. It is hidden complexity, redistributed into raw numbers inside component files.

### 3. "Intentional literal" became a loophole

The repo correctly needed a literal policy. Not every value should become a token.

But the plan03 execution path made it too easy to stop at "this could plausibly stay literal" instead of proving one of the stronger claims:

- this is truly primitive data
- this is truly a theme leaf
- this is truly a family-local relationship
- this is truly one-off anatomy

When the burden of proof is weak, literal retention wins by default, even for values that clearly represent reusable decisions.

### 4. The review and verification loop was aimed at the wrong target

Plan03 was good at import-boundary cleanup, carrier defaults, and overlay behavior. Those were real wins.

But for the complaint set that triggered plan04, the missing verification was different:

- enumerate candidate knobs
- classify each one
- show which ones became alias, semantic, local, or literal
- re-read the complaint list against the live CSS after implementation

That did not happen, so the execution could make only modest structural changes while still claiming success.

## Suggestions

### 1. Make value classification explicit before editing

For future restructures, start with a small table for every suspicious recurring value family:

- what is the value family?
- what design decision does it encode?
- what scope does it have: primitive, shared, family-local, or one-off?
- if it stays literal, why is naming it worse?

Do not let "intentional literal" pass without a specific reason.

### 2. Rebuild the semantic inventory around real cross-cutting roles

Do not limit semantic thinking to spacing. Build a bounded inventory that at least considers:

- control sizing and minimum heights
- typography emphasis roles
- shared shape roles, including a full-round shape
- focus geometry
- shared state-emphasis roles for selected, hover, invalid, disabled, and similar treatments
- shared chrome/contrast roles such as thumb or swatch outline treatment

Not every candidate belongs in the public semantic layer. But each one should be evaluated there before being pushed down.

### 3. Fill the missing alias layer holes

Some current literals want names even before the semantic layer starts.

Likely missing primitive candidates:

- font-weight scale names
- a full-round radius token
- possibly a few other raw geometry constants that recur without carrying component meaning

If a number is durable raw design data, name it once and stop scattering it.

### 4. Use family-local `--_...` tokens more aggressively for local relationships

Where one family has several coordinated values, factor them locally instead of leaving them as parallel literals.

Likely candidates include:

- switch track size, thumb size, and thumb travel
- color thumb border and focus offset treatment
- calendar cell geometry
- keyboard keycap padding and surface treatment

That keeps the public surface bounded while still making local design intent legible.

### 5. Stop encoding reusable state/emphasis decisions directly in `color-mix(...)`

The percentages are not the real abstraction. The real abstraction is the visual role:

- subtle hover wash
- soft selected fill
- stronger selected border
- muted disabled surface
- overlay translucency level

When those roles recur, name them once. If the computed value should vary by theme, put the final color in the theme layer instead of repeating the formula in every component file.

### 6. Add stronger execution checkpoints next time

A future plan should require:

- rereading the complaint list before implementation
- rereading it after implementation
- a candidate-knob inventory with explicit accept/reject calls
- a before/after grep or count for the value families under scrutiny
- a short "what materially changed?" section that must name concrete declarations that moved to better layers

If that section is thin, the execution is not done.

## Bonus Gripes

### 1. On keeping density in a separate file

Yes: keeping the `compact` block in `semantic.css` is a sane default, and probably the better default for a small experiment like this.

The important architectural rule is not "every cross-cutting axis gets its own file." The important rule is:

- baseline shared roles are defined once
- cross-cutting overrides rewrite those roles, not component anatomy directly
- file splits are only for readability, not for semantic correctness

So no, we should not end up with `24` files for permutations. The split should be by independent axis when that helps comprehension, not by permutation, and not by ideology. For the current repo size, co-locating compact overrides in `semantic.css` would likely be simpler and easier to scan.

### 2. On how plan03 execution looked at the obvious issues and barely changed anything

We got both planning and execution wrong in a specific way.

Planning was too permissive:

- it allowed contract cleanup and documentation wins to satisfy the pass
- it did not force a candidate-knob classification exercise
- it did not require a direct sanity check against the complaints after edits

Execution followed that permissive shape:

- it solved the import/carrier issues that were easiest to prove
- it accepted the rest under a broad "intentional literal" umbrella
- it never had to demonstrate that the visible factoring complaints were materially better

So yes, future plans should explicitly require rereading the plan during and after execution. More importantly, they should require proof that the complained-about values were actually reclassified, not merely re-described.
