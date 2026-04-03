# Agents

## General

- Weigh costs and benefits before introducing a new abstraction.
    - Especially consider the cost of increasing developers' cognitive load.
    - Estimate how far in the future the abstraction will pay off, and discount the payoff value accordingly.
- Use plain CSS. Do not use CSS Modules.
- Do not replace vendored fonts with CDN references. Fonts are vendored as WOFF2 files in `src/fonts/` so the app does not require internet connectivity.
- Keep HTML host pages relative and colocated with the code they bootstrap.
- Use relative asset and resource URLs so the app can be relocated without rebuilding.
- Keep client-side routes in the URL fragment (hash routing) rather than path segments.
- When committing:
    - Prefer commits that capture a coherent thought.
    - Split work into coherent, self-contained commits when possible.
    - Write messages that will make it easy later for other devs to identify commits relevant to what they're working on.
    - Use imperative mood for the subject line.

## Writing Plans

- Start from the real decision the reader needs to make, not from a full inventory of everything you know.
- Keep the plan short enough that a busy reviewer can read it carefully in one pass.
- Prefer a few strong paragraphs over a long outline with many headings and subheadings.
- Describe the problem in terms of the current codebase, not generic engineering advice.
- Call out the couplings, fragilities, and constraints that are most likely to drive the implementation shape.
- Separate what must be decided now from details that can safely wait until execution.
- Write at a high enough level that the executor still has room to make good local decisions.
- Be explicit about the desired end state so the team can evaluate tradeoffs against a concrete target.
- Distinguish stable reusable policy from local experiments, workarounds, or implementation-shaped glue.
- Recommend the smallest abstractions that seem justified now; do not smuggle a framework rewrite into a plan.
- Include specific examples when they sharpen the argument, but stop before the plan turns into pseudocode.
- Use structure only where it helps comprehension; if extra headings do not add signal, leave them out.
- Write so the plan is easy to revise after review, because the first draft is usually not the final shape.
- After executing a `plan.md`, write a sibling `outcome.md`.
- Use `outcome.md` to record where the work actually landed, what changed from the plan, and any important open questions or discoveries that came out during execution.
- Write `outcome.md` in the same general style as `plan.md`: short prose, not a long outline, with separate sections only where they help distinguish conceptually separate issues.
- When creating a new comment thread:
    - Put it immediately below the specific paragraph it is about, not in a separate review section.
    - Add a line containing only `<!-- prettier-ignore -->`.
    - On the next line, add the opening tags on one line: `<blockquote><details><summary>Comments</summary>`.
    - Leave a blank line, then write the thread as ordinary Markdown list items like `- CDX: ...`, with blank lines between list items.
    - After the last list item, leave a blank line, add another line containing only `<!-- prettier-ignore -->`, and then add the closing tags on one line: `</details></blockquote><br>`.
- A thread is resolved if and only if its final comment ends with the complete sentence `Resolved.`.
- When addressing a comment, if you decide the plan should be changed, update the plan text and reply in the thread. If you decide the plan shouldn't be changed, reply in the thread and explain your reasoning.
- Keep thread replies short and concrete so the raw markdown stays readable.
- Prefer addressing review comments by clarifying the plan text, not by building a long side conversation around unchanged plan text.
- Unless explicitly directed otherwise, don't mark a thread resolved yourself; leave resolution to the reviewer.

## Verification

- After modifying source code or project config files, run `npm run format` and `npm run lint` before considering the task complete.
- Update `README.md` when the edits warrant it, e.g. by changing project behavior, setup, workflow, or structure.
- Run relevant tests after modifying code. For structural changes, run `npm run test`.
- Run `npm run build` after changes that affect entrypoints, HTML pages, styles, tokens, or Vite configuration.
- Resolve linter or test failures if you can; otherwise stop and ask what to do.
- Write tests so failures help indicate what may need to change to resolve them.

## Experiments

- The current phase involves multiple experiments, kept as isolated from each other as practical without duplicating scaffolding.
- If additional experiments are added before the real app replaces them, put each one directly under `src/<name>/`.
- Each experiment directory should own its HTML host page, TSX entrypoints, tests, tokens, and styles.
- Keep styles, tokens, and tiny setup code inside the owning experiment unless reuse is clearly established.
- Default to local ownership during this phase: keep styles, tokens, and any experiment-specific CSS files inside the owning experiment directory.
- If an experiment grows beyond one stylesheet, add a local `styles/` subdirectory inside that experiment rather than inventing a shared CSS bucket too early.
- During this phase, do not assume tokens are shared. Start by keeping them local to the owning experiment.
- Load vendored fonts from the page or experiment that uses them rather than assuming they are globally shared.
- `src/index.html` is the minimal experiment index page for this phase.
- Update `src/index.html` when experiments are added, removed, or renamed.

### React Aria Components (`rac`)

- `src/rac/` owns the RAC experiment's HTML, TSX, tests, tokens, and CSS.
- Keep RAC-specific implementation details, component experiments, styling decisions, and tokens inside this directory unless they are clearly reused elsewhere.
- Use direct RAC styling with `data-*` selectors unless the point of the experiment is to evaluate a different abstraction.
- RAC-specific tokens currently live in `src/rac/tokens.css`.
- RAC components are used directly with `className` props; there are no custom wrapper components unless a specific experiment deliberately evaluates a different pattern.
- States (hover, selected, focus, expanded, etc.) are styled by targeting RAC's `data-*` attributes, e.g. `[data-selected]`, `[data-focus-visible]`, `[data-expanded]`.
- Variants are styled using data attributes rather than modifier classes when RAC state already exposes the needed hook.
