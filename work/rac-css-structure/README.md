# RAC CSS Structure Notes

This workstream is now organized by planning iteration instead of keeping every note at the top level.

## Layout

- `plan01/`
    - Original research-and-synthesis cycle.
    - `plan.md` is the first planning document.
    - `10-research/` contains the prior-art notes.
    - `20-digest/` contains the three cross-cutting digest passes.
    - `30-synthesis/` contains the synthesis output from the first planning round.
    - `40-questions/` contains focused follow-up writeups for the open questions that remained after the main synthesis pass.
- `plan02/`
    - Implementation planning and execution.
    - `10-components-to-style/` contains the component-surface inventories carried forward into implementation planning.
    - `plan.md` is the concrete implementation plan.
    - `20-plan-review/` contains the plan review batches that were applied to or discussed against `plan.md`.
    - `20-plan-review/unsure.md` records rejected or unresolved review comments.
    - `exec.md` is the implementation log.
    - `outcome.md` is the final status and follow-up log.
    - `20-plan-review/run-poller.sh` is the helper for monitoring new plan02 review files.
- `plan03/`
    - Post-implementation review and cleanup of the RAC CSS customization surface.
    - `plan.md` is the review plan.
    - `issues.md` is the Step 1 inventory and baseline.
    - `findings/` contains the issue-track findings files.
    - `conclusions.md` records the accepted contract decisions.
    - `exec.md` is the execution backlog derived from those conclusions.
    - `outcome.md` is the final status and follow-up log for the review pass.

## Suggested Read Order

1. `plan01/plan.md`
2. `plan01/10-research/` as needed
3. `plan01/20-digest/*.md`
4. `plan01/30-synthesis/synthesis.md`
5. `plan01/40-questions/` as needed
6. `plan02/10-components-to-style/` as needed
7. `plan02/plan.md`
8. `plan02/exec.md`
9. `plan02/outcome.md`
10. `plan03/plan.md`
11. `plan03/issues.md`
12. `plan03/findings/`
13. `plan03/conclusions.md`
14. `plan03/outcome.md`
