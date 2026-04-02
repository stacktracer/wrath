# MUI Dense, Plan02

Read `plan.md` and `outcome.md` from `mui-dense/plan01/`. Understand the current status of the `src/mui-dense/` code, and the direction we are headed with it.

Identify three sets of knobs that affect the information density of MUI components:

1. Settings deliberately exposed as part of the public API, including CSS variables and props, `sx` props, and toolkit-wide JS variables
2. Settings that _can_ be changed, but really aren't intended to be changed, e.g. CSS blocks that target components' non-public internal structure
3. Settings that fall in the gray area in between Set 1 and Set 2

Record the three lists of knobs in `plan02/knobs.md`. If a set of knobs has structure to it, e.g. if there are groups of related knobs, write `knobs.md` in a way that reflects that structure.

Create a `mui-dense/plan03/` subdir, and write a `plan.md` inside for adding controls to the mui-dense hodgepodge page that allow dynamically adjusting the Set 1 knobs. ... Then write `mui-dense/plan04/plan.md` for adding controls for the Set 3 knobs. ... Then write `mui-dense/plan05/plan.md` for adding controls for the Set 2 knobs. (Yes, out of order. Despite the numbering, Set 3 is conceptually in between Set 1 and Set 2.)

During execution, don't modify anything under `src/`; this is sort of a meta-plan, for writing additional docs and follow-up plans.

Record execution notes in `exec.md`.

When you're done, record final status in `outcome.md`.
