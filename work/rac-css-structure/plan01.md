# Designing a CSS structure for long-term use

We are departing from "short-term experiment" thinking, and setting our sights on long-term usage. In fact the experiment here is not about building an app -- it is about building a styling setup that supports RAC + plain CSS, which we will be able to use long-term to build long-lived applications. Application development will include teams of developers at various experience levels.

We want to be able to adjust styling using tens of knobs, rather than by many hundreds or thousands of lines of detailed CSS. We want to make adjustments that apply to all components at once, in a coherent way -- for example, the spacing between the collapse/expand icon and item text in a tree row, and the spacing between icon and text in a menu item, are probably related, and we want a single knob that adjusts both of them, as well as other related spacings.

In tension with the goal of styling everything coherently using a small set of knobs, we will inevitably need style variants that apply to some instances of components but not others. Maybe there's a `compact` data table that has smaller padding than normal. Maybe also `compact` versions of other components, that all use a coherent set of spacings.

Ideally we would give devs full flexibility to customize styles however they need to, while also providing guardrails to make it difficult to accidentally customize in a way that damages coherence of the look and feel. Those goals are very much in tension.

This is a substantial task. If we had to figure it out ourselves, it would take us a long time, and a lot of experimentation. Fortunately, there is a great deal of open-source prior art that we can use for inspiration.

The general scheme for this sort of CSS structure seems pretty clear (though if you learn otherwise, let's discuss):

- Use CSS variables, in three tiers:
    - Aliases, e.g. `--space-1` as an alias for `2px`. Tailwind does something similar to this with utility classes; it may be a good place to look, even though it's not technically using CSS variable aliases.
    - Semantic tokens, e.g. "horizontal spacing between icon and text." These won't come from Tailwind; maybe React Spectrum. Not only will it be a challenge to identify these, it will also be a challenge to name them.
    - Component tokens, e.g. "horizontal spacing between icon and text, for this one component that for some reason needs to differ from the rest."
- Expect to end up with between 20 and 100 semantic tokens. There is tension here -- a smaller set is better, unless it's so small it sacrifices necessary functionality. "As small as possible, but no smaller." This will require weighing options and trying to find a sweet spot in the trade-off continuum.

Afaict, standard CSS with CSS variables is plenty flexible for what we want, and if we learn our prior-art lessons well, we can structure our CSS in ways that trade off flexibility with guidance toward coherence and maintainability.

So step 0, let's decompose this problem into a manageable number of steps:

Subagent mechanics note: the context for a subagent comes from two places: this shared plan file, and the short prompt used when spawning that specific subagent. No separate context file is required. Put durable shared context here in `plan.md`; put task ownership and any one-off instructions in the spawn prompt.

1. Identify relevant open-source prior art:
    - React Spectrum
    - Tailwind
    - Open Props
    - Radix Themes
    - Primer

2. For each prior-art project identified above, spawn a subagent to do the following:
    - Keep the shared context in this file. When spawning the subagent, give it a short prompt that says which single project it owns, which single work file it owns, and that it should reread this file before doing anything else. Do not rely on the subagent inferring which project it owns from surrounding chatter.
    - Example spawn prompt: "Investigate React Spectrum only. Own `work/rac-css-structure/react-spectrum.md`. Reread `work/rac-css-structure/plan.md`, then answer the common questions from that file in your work file. Stop after completing Step 2. Do not execute Steps 3 or 4 yet."
    - The subagent's work file should be named after the project, e.g. `react-spectrum.md`, `tailwind.md`, etc.
    - Reread this file to understand the goals of the investigation
    - Keep these constraints in mind while investigating: plain CSS, RAC styled directly with `data-*` selectors, local ownership unless reuse is clearly established, and a strong bias against abstractions that increase cognitive load without paying for themselves quickly.
    - Create or update the work file under `work/rac-css-structure/` for the specific project
    - Organize the work file using headings that mirror the common questions below, so the project files are easy to compare later
    - Learn how the project in question structures its CSS
    - As you learn, record what you're learning in the work file you created above
    - Read the API docs
    - Read the CSS stylesheets directly from the source repository
    - Read about developer experiences using the project -- what works well, what doesn't
    - Record links to the specific docs, source files, and discussion threads you relied on, so later synthesis can trace claims back to sources
    - Could we adopt the library itself as a dependency, instead of just taking inspiration from it and rolling our own?
    - What are the token tiers, and how are they named?
    - How do semantic tokens differ from component-local tokens?
    - How are variants expressed?
    - How are interactive states styled?
    - How are themes and dark mode handled?
    - What are the escape hatches?
    - What parts are compatible or incompatible with our constraints?
    - What is the day-to-day authoring experience for app developers? How much do they need to learn before they can make safe changes?
    - For a concrete case like a `compact` variant, how would this system express the global knobs, the semantic tokens, and the component-specific overrides?
    - What do users complain about?
    - Stop once the work file can answer the questions above with enough detail to compare the project against the others. Do not try to produce the final recommendation for our project in these per-project notes.

3. Digest the notes, by spawning a small number of subagents and having them each read all the project notes in this dir, then write their recommendations and questions to a new file:
    - The idea here is to get multiple somewhat independent takes on all the notes, without paying for a bunch of near-duplicate outputs. Three digest subagents is probably enough.
    - Give each digest subagent a different emphasis, so the outputs are complementary rather than interchangeable:
        - coherence and guardrails
        - flexibility and escape hatches
        - developer ergonomics and cognitive load
    - Keep the shared context in this file. When spawning the subagent, give it a short prompt assigning it a unique filename to write its output to, and instruct it to reread `plan.md`, then read all per-project notes in this subdir.
    - Each digest subagent should ignore files whose names contain `digest`, and also ignore `synthesis.md`, so the digest files stay independent of one another.
    - Example spawn prompt: "Own `work/rac-css-structure/digest-coherence.md`. Reread `work/rac-css-structure/plan.md`, then read all `.md` files in `work/rac-css-structure/` except `plan.md`, files whose names contain `digest`, and `synthesis.md`. Focus on coherence and guardrails. Based on those files, write to `work/rac-css-structure/digest-coherence.md` a set of recommendations for our project, and a set of open questions. Do not execute Step 4 yet."

4. Synthesize:
    - Read all files in `work/rac-css-structure/` whose filenames contain the word `digest`.
    - When a digest makes a surprising claim, or when digest files disagree, check the underlying per-project notes before deciding what to say in the synthesis.
    - In a new file called `work/rac-css-structure/synthesis.md`, write:
        - common themes from the digest files
        - digest findings that are not common themes but are nevertheless thought provoking, promising, or important
        - open questions that still matter after reading both the digests and the underlying project notes

After that, pause and let's discuss.
