# Plan04

The CSS structure is still unsatisfying, even after executing `plan03`. Specific complaints:

1. There are far too few semantic tokens. Can it possibly be sufficient to have just three knobs for spacing?
2. Even a cursory glance at component styles leaves me with multiple concerns. The first block in the first file has `font-weight: 600`, which can't be right. There are also literals in `rem` units. Calls to `color-mix` with percentage literals. In the second file there's more than one `999px` literal, which can only be a value that is semantically intended as "big number," so why isn't that semantic token -- it's a nuisance param, but still it's a semantic one. The third file has hard-coded border literals like `2px solid #ffffff`. Are we factoring out a set of coherently adjustable knobs, or aren't we?

For this execution, do not spawn any subagents. Absorb all of the complaints above yourself. Don't just find bandaids for those specific complaints -- there is some general mindset issue that underlies all those, and I want to fundamentally correct the mindset.

Before you execute the steps of this plan, read all the steps, 1-7. Don't read the bonus gripes yet.

The plan:

1. Review `plan03` for context. Mainly `plan03/plan.md`, `plan03/conclusions.md`, and `plan03/outcome.md`, but look at other files from `plan03/` if you think they will be relevant.
2. Absorb all of the above complaints. Do it yourself; don't spawn any subagents. You own this problem; you will get to the bottom of it; you will uncover the underyling issues.
3. Identify abstract commonalities among the complaints. Generate a hypothesis about what might be off in the underlying mindset, that led to the poor CSS factoring decisions. Record your hypothesis in a new section in `exec.md`.
4. Search the web. Search relevant third-party projects, e.g. those listed in other `rac-css-structure` plans. Identify the principles that guide other devs and other projects away from the decisions that triggered the above complaints. Record your findings in `exec.md`, in the section where you recorded your hypothesis.
5. Pause. Re-read all of `exec.md`. Reflect. Then, with all that in mind, loop back to Step 2. Repeat until you've looped 10 times. After you've looped 10 times, proceed to Step 5.
6. Re-read all of `exec.md` one last time, then pause and reflect. Digest. Synthesize. Whatever. Boil down your thoughts to a diagnosis, or a small set of diagnoses, and a set of suggestions for straightening out the underlying mindset -- so that next time we try to restructure the CSS, we will get it right, and not end up with complaints like those above. Record your diagnosis (or diagnoses) and your suggestions in `outcome.md`.

## Bonus gripes

Two more things to respond to. Don't read these until after you finish everything above. After you finish everything above, read these while you still have all the context from above fresh in your mind. Record your responses to these at the end of `outcome.md`:

1. It seems dumb to factor "density" out into a separate file. When we have two or three more cross-cutting concern that all interact with each other here and there with density, what are we going to do, have 24 separate CSS files, one for each permutation? Surely the sane thing to do is keep the `compact` block, and later all the other cross-cutting blocks, in `semantic.css` ... right?

2. When we executed `plan03`, how on earth did we look at all the issues cited in the above complaints and conclude, yup, this is fine? Execution of `plan03` made almost no changes, which is weird given that the issues are so obvious. Did we get something wrong in planning? Maybe the plan needs to include explicit instructions to reread the plan during and after executing, to sanity check that execution is actually, you know, doing something? How do we plan better next time?
