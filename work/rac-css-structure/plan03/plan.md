# Plan03: Review And Improve The RAC CSS Customization Surface

This plan is about pressure-testing the current CSS structure after the first implementation pass. The goal is not to assume that every literal or every file boundary is wrong. The goal is to find which current choices make customization harder, make coherent global tuning harder, or make safe local adjustments harder to reason about.

The baseline for comparison is still `plan02/plan.md`. That file explicitly wanted:

- direct RAC styling rather than wrapper-component escape hatches
- a solution that stays local to `src/rac/`
- a meaningful semantic layer
- a real component-local `--_...` layer
- a separate but clear density model
- `document.css` to stay minimal and obviously host-shell-oriented
- a semantic surface that stays in the rough `24-32` range, with a soft ceiling around `40`

The current CSS appears to have drifted from parts of that intent. This plan starts by treating the main concerns as hypotheses to validate.

`plan02/exec.md` and `plan02/outcome.md` are also required context for this review, because they record deliberate compromises, implementation notes, and follow-up questions that should not be mistaken for accidental drift.

## Potential Issues To Validate

1. The semantic layer is thinner than intended, and its boundary with density is unclear.
   - `semantic.css` currently defines only a small set of focus, control, and layout tokens.
   - `density.css` repeats the comfortable defaults and overrides the same token names.
   - It is not yet clear whether this is a good separation of concerns, or whether it creates duplication and confusion about where the "real" defaults live.

2. `themes.css` mixes alias-backed values with raw literals in a way that may weaken the alias -> semantic -> component-local story.
   - Some theme values are derived from alias tokens.
   - Others are raw hex, `rgba()`, or shadow literals.
   - This may be fine for some values, but the rule is unclear, which makes later theme customization harder to do consistently.

3. The component-local token layer is much weaker than planned.
   - `plan02` expected family files to map semantic tokens into local `--_...` tokens where family-specific tuning was needed.
   - In the current CSS, private tokens exist only in a few places.
   - Many family files style directly from semantic tokens, alias tokens, or literals, leaving little structured room for safe local tuning.

4. Component files frequently bypass the intended token layers with raw `px`, `rem`, font-weight, radius, and color values.
   - Some of these may be harmless implementation details.
   - Some may be missing aliases, missing semantic tokens, or missing family-local tokens.
   - Right now the distinction is not explicit, which makes the customization story hard to trust.

5. Shared state styling may be coherent visually today, but it is not modeled coherently in the CSS architecture.
   - Hover, selected, pressed, disabled, focus, invalid, error, and danger treatments are often expressed with one-off `color-mix()` formulas, offsets, and radius adjustments inside each family file.
   - That may make future tuning fragile, because changing interaction contrast or emphasis may require touching many files independently.
   - Compound state precedence may also be unclear, especially where RAC stacks several state hooks on the same element.

9. Motion may be an unreviewed shared axis.
   - The current CSS already uses shared duration and easing tokens alongside family-local transitions and overlay animations.
   - It is not yet clear whether motion belongs in this review as a supported cross-family tuning surface, should be fenced as local implementation detail, or should be explicitly deferred.

6. `document.css` has unclear ownership, unclear scope, and probably the wrong name.
   - The file currently contains:
     - minimal document-level rules
     - app-shell layout
     - gallery card styling
     - helper layout classes
     - demo-only scaffolding
     - some visuals that look closer to component demo helpers than document styles
   - That makes it hard to tell what is host-page baseline, what is gallery-specific, and what is meant to be reusable.
   - It is also unclear whether host-level element selectors should be allowed at all, or whether they should be fenced tightly to the experiment shell.

7. The current structure may be missing a clear rule for which values should stay literal on purpose.
   - Some literals may be the right choice because they are intrinsic to a specific anatomy or CSS trick.
   - Others may be accidental leaks from implementation expedience.
   - Without a rule, future authors are likely to make inconsistent choices.

8. The selector and markup contract may be driftier than the plan currently acknowledges.
   - `plan02` wanted the primary styling surface to stay centered on RAC roots and RAC state hooks.
   - The current implementation relies on `.react-aria-*` root selectors, RAC state hooks, project-local helper classes, anatomy selectors, custom attributes, and some authored child DOM or render scaffolding.
   - Some of those may be good and necessary.
   - Others may be accidental public surface area that makes customization harder to understand and maintain.
   - The current CSS also mixes browser pseudo-classes with RAC-emitted state hooks, and the intended rule for when each is acceptable is not yet explicit.

## Decision Criteria

Use the same criteria for every issue under review.

1. Does this choice make it harder to change several components coherently with one knob?
2. Does this choice make it harder to tune one component family without surprising unrelated families?
3. Does fixing it reduce or increase cognitive load for everyday CSS authors?
4. Is the value or rule genuinely cross-cutting, or is it just local anatomy pretending to be shared?
5. If a literal remains, can we explain clearly why it should stay literal?
6. If a token is added, is its payoff near enough to justify the extra concept?
7. Does the proposed fix increase markup-authoring cost by requiring extra wrappers, extra helper attributes, or more consumer-authored anatomy?

## Benchmark Customization Tasks

Use a small fixed set of benchmark tasks when evaluating proposals, so the review stays tied to actual author work instead of only abstract cleanliness.

Important boundary: component-local `--_...` tokens remain private by default. This plan should not silently turn them into a supported external override surface. If a family-level public override is warranted, `conclusions.md` should define a separate documented public surface rather than freezing `--_...` names into contract.

Unless `conclusions.md` explicitly widens the audience, the default supported consumer for this review is CSS authored within the RAC experiment itself, not a generalized external package consumer.

Use one standard override harness for all baseline, research, and final verification work. At minimum, that harness should:

- include at least one minimal non-gallery fixture, so gallery-specific scaffolding does not define the supported override contract by accident
- consume the durable non-gallery RAC component-style entrypoint if one exists, rather than importing gallery or host-shell CSS by accident
- if no durable non-gallery entrypoint exists yet, use a temporary test-local component-only import slice derived from the current import graph, explicitly exclude gallery and host-shell CSS, and do not treat that temporary slice as a durable contract unless `conclusions.md` later accepts one
- use one source-of-truth composition rule for the temporary component-only slice versus gallery and host CSS during the review, and only promote that into a durable split with import-drift regression if `conclusions.md` explicitly accepts it
- apply overrides from a post-import consumer layer outside the owning stylesheet
- avoid raising selector weight unless the task is explicitly about a supported selector convention
- make any required markup hooks explicit
- be reusable for both manual checks and automated regression coverage
- be the single authoritative fixture or spec used from Step 1 onward
- be one checked-in, runnable artifact rather than several loosely similar setups
- live under `src/rac/` and run through the normal browser-test path
- default to a browser spec or test fixture rather than a new HTML host page or durable entrypoint unless Step 3 deliberately approves that extra surface
- support browser-rendered assertions for portal behavior, computed styles, specificity-sensitive cases, and focus geometry
- define one deterministic state-driving contract for benchmark evidence, including keyboard-driven `data-focus-visible`, pointer-driven hover and press states, and an explicit fallback approach for states that cannot be reached reliably through supported user-event sequences alone
- use the intended supported font-loading path for typography-sensitive checks, or mark those checks provisional until font ownership is decided

Freeze explicit benchmark modes in Step 1 so every findings file evaluates proposals against the same contract assumptions. At minimum:

- the current surface as it exists now
- a mode with no theme or density carrier present
- a mode with no new family-level public override surface
- a provisional minimal public surface only when a reviewer is explicitly arguing for one
- a mode that goes through the real non-gallery consumer import boundary
- a same-page coexistence mode with nearby non-RAC host content
- a mode that exercises the default portal path
- a mode that uses custom portal containers when portal behavior is under review
- if a fenced opt-in scope remains under consideration, a coexistence mode with two sibling scoped RAC islands plus an unscoped host fragment

At minimum, test proposals against these tasks:

1. Tighten spacing and control sizing coherently across several component families without restyling everything else.
2. Tune one component family locally without changing unrelated families, using a documented public family-level override only if `conclusions.md` explicitly decides that such a public surface is needed.
3. Apply a subtree theme or density override to one contained gallery region.
4. Verify whether overlays keep or lose theme and density behavior across real portal boundaries under at least two consumer setups:
   - document-scoped carriers such as `html`, `body`, or `#app`
   - nested app or subtree-scoped carriers
5. Override an approved custom selector or helper convention from outside the owning stylesheet without raising selector weight.
6. Leave one intentionally literal value alone and explain why it should not become a token.
7. Introduce or classify one new family-local value or state treatment without growing the public surface unnecessarily.
8. Evaluate one cross-family typography adjustment independently from density, including whether it belongs in the public semantic surface at all.
9. Author or migrate one component-family rule under the proposed conventions, measuring whether the workflow stays legible for the next maintainer.
10. Classify and tune one provider-only or scaffolding-dependent family without promoting demo-only structure into the public contract.
11. Decide the baseline non-gallery theme and density carrier contract: whether defaults live at `:root`, on a required app wrapper, or must always be authored with explicit `data-*` attributes.
12. Retune one shared state treatment across multiple families, such as focus ring, selected emphasis, disabled contrast, invalid or danger signaling, or compound-state precedence, through whatever shared surface the review is considering.
13. Decide the style-scope contract: whether RAC base tokens and component selectors are intentionally document-global when imported or must sit behind a stable opt-in scope.
14. Verify whether default-portaled overlays retain base component styling under the accepted scope contract, not just theme and density carriers.
15. Verify coexistence between RAC styles and nearby non-RAC host content under the accepted scope contract, and if a fenced opt-in scope is still a live option, include two sibling scoped RAC islands plus an unscoped host fragment without style bleed or missing defaults.

Treat the benchmark set as weighted, not flat.

Primary benchmarks:

- coherent cross-family tuning
- family-local tuning without collateral damage
- subtree theme and density behavior
- portal and overlay contract behavior
- non-gallery carrier and import-boundary behavior
- shared-state retuning

Secondary benchmarks:

- intentionally literal values
- maintainer authoring ergonomics
- provider-only or scaffolding-dependent cases
- cross-family typography
- other edge cases that do not define the main contract

## Step 1: Build A Structured Issue Inventory

Before delegating, do one careful local pass over the current CSS and write `work/rac-css-structure/plan03/issues.md`.

Step 1A is a lightweight local gate before creating heavier review infrastructure.

That gate should ask:

- do the current concerns hold up on quick inspection?
- is there a plausible material benchmark win or meaningful risk reduction available?
- do the current docs already cover the real contract well enough that this is mostly a documentation problem?

Before Step 1A concludes that the work is `document only`, do at least one minimal hands-on probe against a primary benchmark using the planned shared fixture when it already exists, or a stripped-down provisional probe when it does not. That probe should exercise at least one real override path rather than relying only on static reading.

If the answer is effectively "no further work is justified," it is valid to stop there with a `document only` outcome.

Step 1A should still leave a minimal durable artifact, such as a short gate summary in `plan03/outcome.md`, recording:

- the main concerns that were checked
- why deeper review was not justified
- any documentation actions still required

If the gate says deeper review is justified, continue to Step 1B and define and freeze the standard override harness in a small fixture or spec that can be reused throughout the rest of the plan.

Everything below this point in Step 1 belongs to Step 1B only after that positive gate.

Verify that harness immediately before using it as shared evidence:

- `npm run format`
- `npm run lint`
- the relevant browser-backed spec
- `npm run build` if the harness adds an entrypoint or host page

That pass should include both:

- a CSS inventory
- a repo-wide usage audit for the current tokens, helper classes, and custom attributes that participate in the RAC styling surface
- rereading `plan02/exec.md` and `plan02/outcome.md` so the inventory can distinguish intentional compromise from drift
- defining the canonical override harness early enough that Step 1 baselines, subagent findings, and final verification all use the same setup
- reading the current durable docs, including `README.md` and `work/rac-css-structure/README.md`, so documented conventions are treated as part of the current contract
- a benchmark baseline that records how each benchmark customization task works against the current CSS now, including files touched, selectors or tokens changed, extra helper hooks required, and whether override weight stays low
- a shared dependency ledger for RAC roots, state hooks, RAC-emitted CSS custom properties, unstable APIs, and other reused contracts, recorded once with the pinned package version plus stability and support-level labels
- build that shared dependency ledger from version-matched evidence for the installed `react-aria-components` package in this repo
- a shared component-family sample matrix for the main research tracks, with any later expansion required to explain why the fixed sample was insufficient
- include in that fixed sample at least one representative from each `plan02` family cluster, plus the awkward contracts already surfaced in `plan02/exec.md`
- a baseline note for current motion behavior, including existing transitions or animations and whether `prefers-reduced-motion` is honored

Treat the styling surface broadly during this pass. It includes not only selectors and attributes, but also RAC-emitted CSS custom properties and any other contracts that current CSS relies on for styling or geometry.

For each candidate issue above:

- record the relevant files
- record a few representative declarations
- state why it might be a problem
- state why it might be acceptable
- state the exact question that later research needs to answer

Also include a lightweight quantitative baseline:

- current semantic token count
- current `--_...` token count
- rough counts of recurring literal patterns, grouped by kind
- rough counts of recurring state-pattern formulas, grouped by kind
- where those patterns cluster
- where the currently exposed tokens, helper classes, and custom attributes are actually used in the repo
- a cascade and specificity baseline, including:
  - representative selector weight
  - import-order dependencies
  - cases where overrides depend on descendant structure or unusually specific selectors
- a small mandatory pre-change default-appearance baseline for representative default states, captured as screenshots or computed-style assertions for a sentinel set of components
- include in that sentinel set the awkward contracts already surfaced in `plan02/exec.md`, including:
  - provider-only `ColorPicker`
  - `DropIndicator` scaffolding
  - `SelectionIndicator` context limits
  - the non-modal and default-portal overlay path
- benchmark-task results captured through the standard override harness, using a fixed result template:
  - works / works with caveats / fails
  - files touched
  - markup changes required
  - selector-weight increase required
  - whether the path depends on a private token
  - the concrete success observable for the task, such as a target element and computed-style assertion

Also include a shared decision matrix for disputed values and patterns. For each item, record the current location plus the leading candidates for where it belongs:

- alias token
- semantic token
- component-local `--_...` token
- intentional literal
- host-shell or gallery-only concern that should stay outside the RAC customization contract

Also add any newly discovered issue that materially affects customization safety or coherent look-and-feel tuning.

The point of `issues.md` is to keep the subagent work grounded in the actual CSS, not in vague skepticism about literals.

If the Step 1 gate or baseline already shows that the current CSS is good enough against the benchmark tasks, and no plausible next step offers a material benchmark win or meaningful risk reduction, it is valid to stop after Step 1 with a `document only` outcome instead of forcing the later steps.

Treat the threshold for continuing past Step 1 as intentionally high. Continue only if at least one benchmark currently fails, requires selector-weight escalation, depends on private-token overrides, or relies on upgrade-risky RAC behavior, or if the import/ownership contract is still too ambiguous to document safely.

If the work stops after Step 1, still write `work/rac-css-structure/plan03/outcome.md` so the gate result, benchmark summary, and any required documentation actions are recorded as an intentional stopping point rather than an abandoned draft.

## Step 2: Split Into Subagents For Focused Research

After `issues.md` exists, keep triage inside the subagent step rather than resolving it locally first.

Spawn one subagent per provisional issue track, with one owned findings file per subagent under `work/rac-css-structure/plan03/findings/`.

Suggested findings files:

- `01-semantic-density-boundary.md`
- `02-theme-aliasing-and-literals.md`
- `03-component-local-token-boundary.md`
- `04-literals-in-component-files.md`
- `05-shared-state-modeling.md`
- `06-document-layer-ownership.md`
- `07-rules-for-intentional-literals.md`
- `08-selector-and-markup-contracts.md`

Do not add a dedicated motion findings track unless Step 1 showed that motion materially affects benchmark outcomes or accessibility risk. Otherwise, record motion as deferred or local-only in the conclusions.

Each subagent should:

- begin by deciding whether its provisional issue is real, empty, or materially overlapping with another active track
- if it concludes the issue should be merged or dropped, record that disposition and the reasoning in its findings file before stopping or narrowing scope
- reread this file and the relevant parts of `plan02/plan.md`
- reread `plan02/exec.md` and `plan02/outcome.md` when they are relevant to the issue under review
- read `plan03/issues.md`
- use the shared decision matrix from `issues.md` as the common starting point for boundary judgments
- read the CSS files needed for its issue
- read any markup or host files needed to understand ownership boundaries, especially `src/rac/app.tsx`, `src/rac/index.html`, and `src/rac/main.tsx` when the issue involves themes, density, gallery helpers, or `document.css`
- when the issue involves selector hooks, attributes, or RAC anatomy assumptions, check RAC documentation or source as a source of truth before treating a dependency as stable
- when the issue involves RAC-emitted CSS custom properties or other style-surface contracts, audit those with the same care as selector hooks
- for selector-sensitive families that rely on slots, child combinators, or authored anatomy, test at least one alternate supported RAC composition beyond the gallery markup
- use evidence that matches the installed `react-aria-components` version in this repo, not a newer or older release
- treat the Step 1 dependency ledger as the shared source of truth for repo-wide RAC selector, state-hook, CSS-custom-property, and unstable-API classification, extending it only when issue-specific dependencies were not already recorded there
- label each such dependency by stability:
  - documented RAC contract
  - documented but explicitly unstable RAC API
  - source-observed RAC behavior
  - repo-local convention
- label each such dependency by support level as well:
  - supported external override surface
  - internal implementation dependency
- for every retained external RAC dependency, record:
  - a citation to the installed package source or other version-matched evidence for the repo’s pinned `react-aria-components` version
- for any dependency labeled `documented but explicitly unstable RAC API` or `source-observed RAC behavior`, record:
  - the exact `react-aria-components` version in use
  - the likely upgrade risk
- do not recommend increasing reliance on `documented but explicitly unstable RAC API` or `source-observed RAC behavior` unless there is no sufficiently stable documented alternative and the payoff is explicitly justified
- decide whether the issue is real, overstated, or not a problem
- if it is real, propose specific improvements
- discuss tradeoffs, including cognitive-load cost
- judge the proposed improvements against the benchmark customization tasks in this file
- rerun every primary benchmark the issue can affect, and cite the frozen Step 1 result for the rest unless the finding is proposing a change there
- when making claims about overrideability, selector weight, portal behavior, or benchmark outcomes, use the shared harness directly or cite the Step 1 baseline artifact
- use the fixed benchmark result template from Step 1 so findings are directly comparable
- distinguish clearly between:
  - values that should become alias tokens
  - values that should become semantic tokens
  - values that should become component-local `--_...` tokens
  - values that should stay literal
- stop after writing its findings file

Each findings file should answer:

1. Is this actually a problem?
2. Why does it matter for customization safety or coherent tuning?
3. What concrete improvements are plausible?
4. What should explicitly not change?
5. Which files would likely be affected?

The document-layer/import-boundary findings track should explicitly own:

- component-style entrypoint shape
- `document.css` separation or renaming
- font-loading ownership
- proof that the non-gallery entrypoint does not leak host-shell styling

The selector/markup-contract findings should additionally classify non-RAC selectors and attributes as one of:

- intended public convention
- family-local anatomy helper
- gallery or host helper
- accidental contract

They should also classify the RAC selector dependencies themselves, including `.react-aria-*` roots and state hooks, by stability:

- documented RAC contract
- documented but explicitly unstable RAC API
- source-observed RAC behavior

Subagents should not edit CSS in this step.

## Step 3: Review The Findings And Decide What To Fix

Read all findings files, compare them against the actual CSS, and write `work/rac-css-structure/plan03/conclusions.md`.

`conclusions.md` should contain:

- accepted issues
- rejected or downgraded issues
- per-issue disposition, such as:
  - fix now
  - document only
  - defer
- the decision for each accepted issue
- the reasoning behind each decision
- the preferred fix direction
- for any proposed structural change to token layering, selector rules, or file roles, a representative scratch rewrite or pseudo-diff that demonstrates the change stays legible in practice
- values or patterns that should intentionally remain literal
- dependencies between fixes
- any naming changes, including whether `document.css` should be renamed or split
- a clear statement that the review does not solve customization pain by moving styling out of `src/rac/`, introducing wrapper components, adding a utility layer, or broadening resets unless Step 1 showed the direct-RAC/plain-CSS approach cannot satisfy the benchmark tasks
- a selector and markup contract summary that classifies non-RAC selectors and attributes as:
  - RAC-emitted CSS custom properties or other style-surface contracts, labeled as documented contract, documented but explicitly unstable RAC API, or source-observed behavior
  - RAC root selectors and state hooks, labeled as documented contract, documented but explicitly unstable RAC API, or source-observed behavior
  - authored child DOM and render scaffolding, labeled as intended supported structure, gallery-only structure, or accidental contract
  - intended public convention
  - family-local anatomy helper
  - gallery or host helper
  - accidental contract
- a normalized contract table for findings and conclusions, using consistent columns such as:
  - artifact
  - source
  - stability
  - support level
  - scope or owner
  - public override status
- a benchmark-task summary using the fixed result template, so before/after comparisons are concrete rather than impressionistic
- an explicit overlay contract decision for theme and density behavior across portal boundaries:
  - survives default portals
  - survives only custom portal containers
  - does not survive portals
  - and the supported consumer setup for each case
- an explicit decision about whether default-portaled overlays retain base component styling under the accepted scope contract
- an explicit baseline theme and density carrier decision for non-gallery consumers:
  - `:root`
  - required app wrapper
  - explicit `data-*` attributes
- an explicit non-gallery import-contract decision:
  - what a real consumer should import for RAC component styles
  - what remains gallery or host-shell only
  - who owns vendored font loading and other resource-backed typography prerequisites
  - proof that the chosen component-style entrypoint does not leak host-shell or page styling
  - whether any durable split comes from one source-of-truth manifest and avoids material CSS duplication; otherwise it should remain test-local only
- an explicit style-scope decision:
  - document-global when imported
  - fenced behind a stable opt-in root or scope
- an explicit cascade contract decision, including:
  - whether consumer overrides are defined by post-import source order
  - whether internal files are allowed to depend on import order
  - whether `@layer` is intentionally out of scope
- an explicit host-layer selector decision:
  - whether global element selectors are allowed at all
  - if allowed, where they must be fenced
- an explicit state-selector decision for browser pseudo-classes versus RAC-emitted state hooks
- an explicit decision about whether any family-level public override surface is needed beyond semantic tokens, and if so what that surface is
- for any approved public override path that affects a portaled component, an explicit statement of whether it survives default portals and what consumer setup is supported
- an upgrade-risk summary for any dependency that remains justified only by documented but explicitly unstable RAC API or source-observed RAC behavior
- for each retained dependency that remains justified only by documented but explicitly unstable RAC API or source-observed RAC behavior, an explicit disposition:
  - replace with a documented hook
  - fence behind a repo-local convention
  - accept the risk, with justification
- for each unstable family that is already styled as a family, an explicit family-level disposition:
  - keep in durable guidance
  - fence as experimental-only
  - remove from the supported override contract
- a rule that documented but explicitly unstable RAC API or source-observed RAC behavior may justify local fencing or targeted tests, but cannot by itself justify new semantic tokens, selector conventions, or family-level public override surfaces
- for any removed, renamed, or materially redefined public-facing knob, selector, attribute, file role, or override path, an explicit migration decision:
  - keep compatibility
  - stage a migration
  - break immediately, with justification
- the net public-surface delta:
  - semantic token count before and after
  - whether the result stays in the target `24-32` range or, if not, why the lower or higher count is justified
  - any new or removed public knobs
  - any new or removed public selectors or conventions
  - any file or filename changes authors would need to learn
  - whether any review infrastructure created during Step 1 becomes a durable asset or is dropped because the outcome is `document only`

This is the step where we answer questions like:

- Should density remain a separate file?
- Should comfortable defaults live in `semantic.css`, `density.css`, or both?
- Which theme literals are acceptable?
- Which component literals should become `--_...` tokens rather than public semantics?

If Step 3 concludes that no proposal delivers a material benchmark win or meaningful risk reduction, it is valid to stop there with a `document only` outcome and skip Step 4 and Step 5, except for any small durability steps needed to keep retained unstable or source-observed dependencies annotated and, when testable, mechanically probed.

Use the same high threshold at Step 3. Continue only if a proposal clearly improves at least one primary benchmark, materially reduces upgrade or contract risk, or resolves an import/ownership ambiguity that cannot be left to documentation alone.

If the work stops after Step 3, still write `work/rac-css-structure/plan03/outcome.md` summarizing the decision, the benchmark results that justified stopping, and any documentation or follow-up tasks.

## Step 4: Turn The Conclusions Into An Execution Backlog

If `conclusions.md` identifies worthwhile work, create `work/rac-css-structure/plan03/exec.md` before editing CSS.

That file should:

- order the accepted fixes
- group related edits into coherent change sets
- call out risky refactors separately from low-risk cleanups
- define what to verify after each change set
- record the expected public-surface delta for each change set so we can spot cognitive-load creep before implementation starts
- if a change set touches a family, state, selector path, or override path that the current gallery does not already exercise, add a minimal gallery case or focused regression test before relying on the verification matrix
- carry forward the Step 1 override harness as the standard fixture for manual and automated override verification, so every check exercises the same post-import consumer layer rather than ad hoc local setup
- prefer focused tests and the shared override harness over expanding the gallery unless a scenario truly requires live gallery coverage

The execution order should favor:

1. clarifying boundaries and naming first
2. introducing missing token layers second
3. moving component families onto the clarified structure third
4. cosmetic cleanup last

## Step 5: Implement And Verify

Only after `conclusions.md` and `exec.md` exist should CSS edits begin.

Implementation should verify that:

- global tuning is more coherent after the changes
- local component tuning has a clearer home
- token layering is easier to explain than before
- `document.css` ownership is obvious, or the file has been renamed/split
- the default gallery look remains materially the same unless `conclusions.md` explicitly approved a visual change
- if any shared layer changed, including `alias.css`, `semantic.css`, `themes.css`, `density.css`, or shared selector conventions, a full-gallery smoke pass has been run across all visual-surface families
- overlay theme and density behavior has been checked both inside gallery-local portal containers and across the real default portal boundary
- a gallery verification matrix has been run for every affected component family, covering at least:
  - comfortable and compact density where relevant
  - light and dark theme where relevant
  - key interaction states touched by the refactor
  - compound state precedence where the same element can carry multiple states
  - representative helpers or gallery-only classes when `document.css` or host-shell files changed
- for any shared theme or state refactor, accessibility checks have been run for:
  - focus visibility
  - contrast and legibility for selected, disabled, and danger states
  - light and dark parity for those checks
- if motion remains in scope after Step 3, motion checks have been run for:
  - cross-family duration and easing coherence where changes landed
  - reduced-motion behavior where transitions or animations are part of the supported contract
- when density or shared control-sizing rules change, target-size and focus-geometry checks have been run, especially for compact mode
- an override verification matrix has been run, covering at least:
  - one global semantic retune
  - one documented family-level public override, if `conclusions.md` explicitly approved such a surface
  - one subtree theme or density override
  - one example that is intentionally left literal, to confirm that the boundary still makes sense
- each accepted override path has been exercised from outside the owning stylesheet without increasing selector weight, so the plan proves the surface is practically overrideable and not just theoretically present
- if the accepted fixes establish or preserve a supported override surface, add at least one durable automated regression check that proves a representative global semantic override and a representative documented family-level override still work when such a family-level public override exists
- if the conclusions accept a specific overlay portal contract, add at least one durable automated regression check for that accepted contract
- add at least one browser-backed regression for the accepted default non-gallery theme and density carrier contract, including the negative case when explicit carriers are required for defaults
- if the conclusions accept a durable non-gallery component-style entrypoint or a scope contract, add at least one browser-backed regression that proves the approved entrypoint does not pull in gallery or host-shell styling and that the accepted same-page coexistence behavior with nearby non-RAC host content still matches the documented contract
- use the standard override harness for those manual and automated checks
- if any retained dependency still relies on documented but explicitly unstable RAC API or source-observed RAC behavior, add a short code-local annotation at the use site with the package version and rationale
- if any retained dependency still relies on documented but explicitly unstable RAC API or source-observed RAC behavior and is mechanically testable, add a targeted automated probe for it
- if a fix changes authored DOM scaffolding, portal strategy, slot or anatomy assumptions, or any source-observed RAC dependency, add a focused browser test for behavior as well as style
- `npm run format` passes after source edits
- `npm run lint` passes after source edits
- `npm run test` passes after structural edits
- `npm run build` passes after changes that affect styles, entrypoints, or host-page CSS

## Step 6: Update Durable Author Guidance

If the accepted fixes change naming, file roles, selector conventions, token boundaries, override rules, or clarify a contract through a `document only` conclusion, update the durable documentation before considering the work complete.

That update may be in:

- `README.md`
- a source-adjacent RAC styling guide under `src/rac/` or `src/rac/styles/`
- or both, depending on how broad the author-facing change is

Keep `work/rac-css-structure/` for rationale, planning history, and supporting notes rather than the primary day-to-day contract maintainers are expected to follow.

The documentation should capture at least:

- semantic vs component-local `--_...` rules
- which literals are intentionally allowed
- theme and density ownership rules
- approved custom selectors and attributes, if any
- the non-gallery import boundary and what consumers should import
- the style-scope and carrier contract
- any unstable-family or unstable-hook fences that remain part of the supported contract
- the supported overlay theme and density behavior across portal boundaries
- any approved family-level public override surface beyond the semantic layer, if one exists
- any renamed or split files and what they now own

## Step 7: Record The Outcome

Write `work/rac-css-structure/plan03/outcome.md` at the end of the workstream, whether the result is `document only` or a full implementation pass.

That file should capture:

- what actually happened, not just what was planned
- which benchmark wins were realized in practice
- which verification steps were run
- which contracts were clarified without code changes
- any deviations from `exec.md`
- any follow-up questions or deferred work

## Notes

- Do not treat "literal" as automatically bad. The real problem is unclear intent and unclear override boundaries.
- Do not grow the semantic layer casually. Many current literals may belong in family-local `--_...` tokens instead.
- If a proposed fix adds abstraction without making future customization materially safer or easier, reject it.
