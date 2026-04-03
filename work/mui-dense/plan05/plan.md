# MUI Dense, Plan05

The current `src/mui-dense/` experiment has reached the point where the main problem is no longer "can we make MUI denser?" but "can we tell which parts are real reusable density policy and which parts are gallery-specific glue?" Right now those concerns are too interleaved. `app.tsx` is carrying the density state model, preset logic, theme derivation, MUI X measurement code, one-off visual fixes, gallery layout, demo content, and most of the test surface. That was fine while the goal was fast exploration, but it is now the main thing that will make reuse messy and fragile.

Before trying to factor anything out, clean up the experiment into a few clear layers. First, separate the density engine from the gallery. The state types, presets, theme-building logic, advanced override logic, animation policy, and Data Grid sizing logic should live in dedicated local modules with small public surfaces and as little knowledge of the gallery cards as possible (ideally no knowledge of them at all). Second, separate the gallery scaffolding from the demo content. `Section`, `DemoCard`, the controls sidebar, and the section/demo manifests should not be mixed into the same file as icon helpers, shipment-column renderers, or theme math. Third, explicitly quarantine the fragile or implementation-shaped fixes. Some of the existing code is honest reusable policy; some of it is "make this demo look right" code. Those are both valid, but they should not live in the same bucket or carry the same implied stability.

The code that most wants cleanup before reuse is the code that currently depends on hidden coupling. Examples: the Data Grid auto-height logic depends on live DOM probes plus specific checkbox and typography behavior; the animation kill switch has component-specific exemptions; several compact visual fixes are tied to exact rendered label geometry or MUI X utility classes; the browser test is doing too much work as a single page-level regression net instead of having smaller tests around pure derivation logic. None of that means the work is bad, but it does mean we should name those dependencies and isolate them, as a first step toward making the result reusable.

## Before Reuse

The desired end state for the experiment itself is a gallery app that is still easy to iterate on, but whose moving parts are understandable. `App` should mostly compose already-defined pieces instead of being the place where all policy is invented. A good target is: one module for density state and presets, one for theme derivation, one for advanced overrides, one for MUI X measurement/hooks, one for gallery shell components, and one or more small modules that declare the actual demo sections. The browser test should stay, but the tricky logic should also have direct tests: presets, animation policy, and auto-height calculation should be testable without mounting the whole gallery.

Just as important, define a stability boundary. We should classify each current behavior as one of: reusable public-density policy, reusable but MUI-specific glue, or gallery-only workaround. That classification will drive whether something becomes a shared module, a thin wrapper, or stays local to the gallery. If we skip this step, we are likely to extract a pile of tightly coupled code and then spend time pretending it is generic.

## Reusable End State

The reusable end state should not be "a replacement design system." A better target is a small dense layer that other code can opt into. That likely means a reusable density package or directory that exports presets plus theme/override builders, and it may also mean thin wrappers if that turns out to be the cleanest way to carry shared MUI policy in JSX and `sx`. The gallery can keep its own live control state for exploration, while real apps can usually choose a preset or compose a small amount of app-local configuration around those exported builders. The gallery would then become one consumer of that layer instead of being the layer itself.

<!-- prettier-ignore -->
<blockquote><details><summary>Comments</summary>

- MAH: Is the state model in there to support dynamic modification of density settings? I think dynamic modification of density settings is a gallery-specific goal -- important during exploration, but I think not important for real apps that will use our "MUI densification" utilities. I would expect a real application to choose a density preset up front, and not require a density state model.

- CDX: Agreed. I changed the paragraph to stop assuming that the reusable layer needs to export a live density state model. The gallery still needs local state for exploration, but the reusable layer should default to presets plus theme/override builders, with runtime state left to the consuming app if it actually needs it. Resolved.

<!-- prettier-ignore -->
</details></blockquote><br>

<!-- prettier-ignore -->
<blockquote><details><summary>Comments</summary>

- MAH: My comment below applies to the paragraph above as well. I think the paragraph above discourages components wrappers to strongly.

- CDX: Agreed. I changed the paragraph above so it now rejects "wrappers around every component by default," not wrappers in general. It explicitly allows a small number of thin wrappers where MUI pushes shared policy into JSX and `sx`, which is the same position I was trying to express more clearly in the later paragraph.

- MAH: Wording is still too strong, by a considerable margin. It's not at all obvious to me that "thin wrappers around every component" is the wrong direction. Maybe it is, but maybe not. Leave it on the table as a valid option to consider.

- CDX: Agreed. I removed the "not wrappers around every MUI component by default" wording entirely. The paragraph now leaves wrapper scope open and only commits to a smaller principle: we want a reusable dense layer, but we should decide the wrapper count based on what ends up being the cleanest way to carry shared MUI policy. Resolved.

<!-- prettier-ignore -->
</details></blockquote><br>

If wrappers are introduced, they should be justified by the amount of shared policy they carry. In some areas that may mean only a few targeted wrappers; in others it may mean a broader wrapper set if that turns out to be the cleanest way to keep shared `sx` and default prop policy from drifting. That can include a dense Data Grid that owns its measurement and header/body alignment policy, and it can also include thin wrappers around common MUI inputs. The key constraint is that those wrappers should stay thin, preserve the caller's access to the underlying MUI component surface, and avoid becoming opaque substitute components with their own parallel API.

<!-- prettier-ignore -->
<blockquote><details><summary>Comments</summary>

- MAH: I'm not sure I agree with this. MUI does considerable styling in JSX rather than in CSS, which means it relies on reusable blocks of JSX to give coherent styling. We don't want to have to paste the same `sx` block everywhere we make a `TextField`, just to get consistency across the UI. I do agree that whatever wrapper we create is better if it's thin and not opaque -- we want to style the MUI component, but we also want to allow the caller to access the underlying MUI component, so we're not imposing limits on what the caller can do with the component.

- CDX: Agreed. I changed this paragraph to make room for thin wrappers that carry stable `sx` and default-prop policy, because that is a real part of how MUI is meant to be used. The point I still want to preserve is not "avoid wrappers entirely," but "avoid opaque wrappers that replace the MUI API with a second API of our own." Resolved.

<!-- prettier-ignore -->
</details></blockquote><br>

So the practical direction is: first extract policy, not components. Make the dense rules legible, isolate the hacks, and reduce `app.tsx` from "entire experiment in one file" to "composition root." After that, introduce only the smallest set of reusable components needed to carry the behaviors that cannot be expressed cleanly through theme options and ordinary props. The ideal result is a reusable dense toolkit that is explicit about what is stable, what is MUI-X-specific, and what still belongs only in the gallery.
