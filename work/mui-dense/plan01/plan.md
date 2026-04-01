# MUI Dense, Plan01

Build a "MUI components hodgepodge" page we can use to try out adjustments to MUI styling knobs.

Include `@mui/material` and MUI X DataGrid Pro. Provide a clean way for a MUI X license key to be supplied without being hard-coded and/or git-committed. Config file, env var, something like that.

Start a new `mui-dense/` subdir under `src/`. It won't mirror `src/rac/` exactly, but organize the files in roughly the same way as in `src/rac/`. Add NPM dependencies to the top-level `package.json`.

Create a single-page app that shows representative samples of many (most? all?) MUI components. If it's feasible to show at least one of each component from `@mui/material` and MUI X DataGrid Pro -- possibly more than one of components that have substantially different flavors -- do that. If that's not feasible, split it into multiple pages, and make an ultra-simple table-of-contents page, unstyled, with hard-coded hyperlinks to the hodgepodge pages.

Give the hodgepodge page(s) enough CSS to lay out the components in some sort of grid. Don't add any CSS or and `sx` props for styling the components themselves; let the components use their default styles.

The ultimate goal, which is well beyond the scope of this plan, will be to use MUI to build wkstation displays with high information density. This will require adjusting the styling of MUI to substantially increase information density. This plan is specifically for building a hodgepodge page, to support subjective evaluation of style-adjustment experiments.

For now, simply make the hodgepodge page(s) so I can look at it by running `vite dev`. Don't adjust component styles. Don't provide controls for dynamic style adjustment. Make sure the hodgepodge page(s) successfully build and render; for now don't write automated tests that are more specific than that.

## Amendment: MUI X Tree View

Extend the hodgepodge scope to include MUI X Tree View. Include both a non-Pro Tree, and a Pro Tree using the existing MUI X license-key mechanism.

Add representative Tree View samples to the hodgepodge page. If feasible, show both flavors exposed by the Tree View package: a simple hard-coded tree and a richer item-driven tree. If showing both is not feasible, include at least one representative tree sample.

Keep the Tree View samples under the same constraints as the rest of this plan: enough CSS to place them in the page layout, but no custom styling of the Tree View components themselves beyond their default MUI appearance.

## Background

MUI has a great set of components, and attractive styling. Its ample padding and spacing, and its large default fonts, are appropriate for touch interfaces.

I want to use MUI for wkstation data visualization, at high information density. I want to try this even though it's not what MUI was designed for, and even though it will mean swimming against the current. For now I want to see two things: (1) how well we can get high density with minimal pain, and (2) and how painful it is to really get the high density we want.
