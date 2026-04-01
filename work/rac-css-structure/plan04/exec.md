# Plan04 Execution Log

## Notes

- Read `plan04/plan.md` steps 1-7 before reading the bonus gripes, as instructed.
- Treated the closing sentence in Step 5, "After you've looped 10 times, proceed to Step 5," as an obvious typo and continued to Step 6.

## Hypothesis And Prior-Art Findings

### Initial Hypothesis

The underlying mindset problem is not just "too few semantic tokens" or "too many literals." It is that the value-classification model collapsed into an impoverished binary:

- either a value becomes a public semantic token
- or it stays a literal

That binary left two important buckets underused:

- alias primitives that should have names because they represent durable raw design values such as font weights or a fully rounded radius
- family-local `--_...` tokens that should exist when several declarations inside one family are really one local design relationship

Once those two buckets fell out of the mental model, the review started treating many clearly intentional design decisions as if they were harmless anatomy details. That is how we ended up with only `9` semantic tokens in [`src/rac/styles/semantic.css`](../../src/rac/styles/semantic.css) while component files still contain repeated decisions like:

- `font-weight: 600`
- `border-radius: 999px`
- `2px solid #ffffff`
- many recurring `color-mix(...)` percentages
- several repeated control and thumb sizes expressed directly in `rem`

The problem is not that every one of those should be a public semantic token. The problem is that too few of them were forced through a serious classification pass.

### Prior-Art Findings

- [Primer token names](https://primer.style/product/primitives/token-names/) separates `base`, `functional`, and `component/pattern` tokens. Two details matter here:
  - token names always include the property, which forces authors to name the actual design decision rather than stash a naked number
  - patterns should be generic when possible, and Primer explicitly gives `control` as the example of a name that should influence several related components
- [Radix Themes styling](https://www.radix-ui.com/themes/docs/overview/styling) keeps the public surface relatively small, but still exposes the same CSS variables that power its own components so custom components can stay aligned. That is a small public surface plus rich internal structure, not small surface plus raw literals everywhere.
- [Radix Themes theme overview](https://www.radix-ui.com/themes/docs/theme/overview) and [spacing](https://www.radix-ui.com/themes/docs/theme/spacing) make `scaling` an explicit axis. Layout-affecting values scale together rather than being left as unrelated local numbers.
- [Radix Themes radius](https://www.radix-ui.com/themes/docs/theme/radius) is especially relevant to the `999px` complaint. Radix has a `full` radius setting, a `--radius-full` variable, and a `--radius-thumb` variable. It does not leave "big enough to be fully rounded" as an unnamed nuisance literal.
- [MUI density](https://mui.com/material-ui/customization/density/) says density is applied "either via lower spacing, or simply by reducing the size" depending on the component. That is a useful reminder that density is a cross-cutting axis, but its manifestation still has to be modeled per component family.
- [MUI spacing](https://mui.com/material-ui/customization/spacing/) keeps spacing on a named scale instead of proliferating arbitrary local lengths.
- [Spectrum Web Components styles](https://opensource.adobe.com/spectrum-web-components/tools/styles/) defines tokens not just for colors and spacing, but also for typography, sizing, font weights, and semantically named component constants like swatch border color and button minimum width multipliers. That is direct evidence that mature systems do not stop after a handful of spacing knobs.
- [Spectrum Web Components theme API](https://opensource.adobe.com/spectrum-web-components/tools/theme/api/) scopes tokens through a theme element and exposes scale as a first-class configuration input.
- [Open Props home](https://open-props.style/) is a clear example of a broad alias layer: sizes, borders, shadows, typography, and so on are already named before component CSS starts.
- [Open Props `buttons.css`](https://app.unpkg.com/open-props%401.5.15/files/src/extra/buttons.css) is the cleanest evidence for the missing local layer. It uses shared tokens like radius and font-weight, then adds local scratch variables such as `--_accent`, `--_text`, `--_size`, `--_bg`, and `--_border` inside the component stylesheet. That is exactly the layer our current review underused.

## Iteration Log

### Loop 1

Re-read result:

- The current local guidance in [`src/rac/styles/README.md`](../../src/rac/styles/README.md) is mostly about boundaries and permissions, not about how to classify a suspicious value.

Hypothesis revision:

- The review optimized for avoiding abstraction, not for expressing intent.

Implication:

- Missing names are not neutral. They force future maintainers to reverse-engineer intent from numbers.

### Loop 2

Re-read result:

- The current semantic layer is only focus ring, control padding/gap/radius, and three layout gaps.

Hypothesis revision:

- We treated the soft token-count ceiling from earlier planning as a reason to stay tiny, instead of as a warning not to grow without discipline.

Implication:

- With only `9` semantic tokens, the system was underfit before any component-local judgment calls even began.

### Loop 3

Re-read result:

- Complaints like `font-weight: 600` and `999px` are not really arguments for more semantic tokens specifically. They are arguments for more named values somewhere.

Hypothesis revision:

- A missing alias layer is part of the bug. We have font sizes and radii, but no named font-weight scale and no named full-radius value.

Implication:

- Some of the current literals should have become alias primitives, not semantic tokens.

### Loop 4

Re-read result:

- Files such as [`choice-controls.css`](../../src/rac/styles/components/choice-controls.css) and [`color.css`](../../src/rac/styles/components/color.css) contain groups of values that move together within a family: track size, thumb size, thumb travel, thumb border, and so on.

Hypothesis revision:

- The family-local `--_...` layer is not merely "weaker than planned"; it is weak enough that repeated local relationships were forced to stay as ungrouped literals.

Implication:

- Some of the current pressure should be relieved with private family-local tokens rather than by further enlarging the public surface.

### Loop 5

Re-read result:

- `color-mix(...)` percentages repeat heavily across component files, but they are not all doing the same job. Some encode subtle hover wash, some selected emphasis, some border contrast, some panel translucency.

Hypothesis revision:

- The real missing abstraction is not "ban percentages." It is "name the intensity roles that recur."

Implication:

- Repeated mix percentages should be classified into:
  - theme leaf values when they are theme-specific concrete colors
  - semantic state/emphasis tokens when they are shared visual roles
  - family-local tokens when they are local to one anatomy

### Loop 6

Re-read result:

- [`plan03/findings/07-rules-for-intentional-literals.md`](../plan03/findings/07-rules-for-intentional-literals.md) correctly argued that not every literal should be tokenized, but its policy is permissive enough that it became easy to stop short.

Hypothesis revision:

- "Intentional literal" became too available as an answer. It described acceptable buckets, but it did not force authors to prove that a value was truly local or truly leaf-level.

Implication:

- A literal policy without a stronger classification burden turns into a loophole.

### Loop 7

Re-read result:

- The component files show several cross-cutting value families beyond spacing:
  - control heights
  - emphasis font weights
  - fully rounded versus control-rounded shapes
  - thumb and indicator geometry
  - focus offsets
  - selected/hover/invalid emphasis strengths

Hypothesis revision:

- The semantic model stayed too spacing-centric. It never broadened into a general catalog of durable UI roles.

Implication:

- The complaint "far too few semantic tokens" is correct because the current semantic surface barely models typography, shape, or state emphasis.

### Loop 8

Re-read result:

- Prior art converges on the same layered pattern:
  - named primitives or scales
  - a bounded set of shared roles
  - local component variables where needed

Hypothesis revision:

- Our review drifted because it behaved as if only the middle layer mattered.

Implication:

- Without all three layers being healthy, the middle layer gets unfairly squeezed between raw literals and overbroad public API fears.

### Loop 9

Re-read result:

- `plan03` benchmark work centered on import boundaries, carriers, overlays, and public-surface restraint. Those were real issues, but they did not directly test whether the value classification improved.

Hypothesis revision:

- The plan and execution validated the wrong things for this complaint set. They were better at contract cleanup than at pressure-testing the semantic/local factoring.

Implication:

- A future review needs an explicit deliverable that inventories suspicious value families and forces accept/reject decisions for each candidate knob.

### Loop 10

Re-read result:

- The same pattern appears from every angle: the architecture talked a lot about keeping concepts few, but not enough about naming the concepts that were already present in the design.

Final hypothesis:

- The underlying mindset issue is abstraction aversion masquerading as discipline. We correctly feared token sprawl, but overcorrected into leaving too many meaningful design decisions unnamed. That underfit the semantic layer, underused the alias and private local layers, and let literal policy substitute for actual factoring.

Implication:

- The fix is not "tokenize everything." The fix is a stricter value-classification workflow and a broader, but still bounded, model of what counts as a reusable design decision.
