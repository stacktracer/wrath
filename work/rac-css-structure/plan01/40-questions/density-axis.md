# Density Axis

## Conclusion

Use one user-facing density mode as the public entry point, but do not implement density as one undifferentiated scalar. The better structure is a small family of related knobs under that mode: layout spacing, control sizing/padding, and a separate typography scale that stays independent unless a later requirement proves it should move with density.

In other words, prefer `compact` as the switch people think in, but back it with multiple token families. That keeps the mental model small without forcing every UI concern to scale together.

## Why This Is The Better Boundary

The prior art does not really support a single all-purpose density knob that controls everything equally.

- Cloudscape treats compactness as a system-wide mode, but what actually changes is the spacing scale propagated through components, not a magic scalar that rewrites all dimensions.
- SAP’s compact density keeps font size the same while shrinking control dimensions and spacing, which is a strong sign that typography should not automatically be folded into density.
- Atlassian separates space tokens from typography tokens and explicitly describes spacing as the foundation for future density support, which suggests density is built from multiple foundations rather than one global value.
- Material UI applies density per component in some cases, with some components using lower spacing and others simply using smaller sizes.
- Radix Themes and React Spectrum both lean toward a small global scale plus component-level exceptions, not a sprawling density vocabulary.

The pattern is consistent: a single top-level density mode is useful, but the implementation needs a few related token families so different surfaces can adjust appropriately.

## Practical Shape For RAC

For RAC, I would start with:

- `compact` or `comfortable` as the document or subtree mode.
- Shared spacing tokens that affect layouts, lists, tables, menus, tree rows, and similar surfaces.
- Shared control-size tokens for padding, hit area, and icon/text gaps inside interactive components.
- Typography tokens that remain separate by default, so text can stay readable even when spacing tightens.

Component-local overrides should stay the escape hatch for outliers: a table row, tree row, or menu item that genuinely needs a different compactness profile can opt out through local CSS variables without inventing a new public density axis.

## What I Would Not Do

- I would not expose a separate public knob for every component family from day one.
- I would not make typography part of density by default.
- I would not assume that one compact value should shrink every control, layout, and text surface in the same way.

That would add cognitive load without buying much flexibility. The useful middle ground is one public density mode with a few internal token families.

## Sources

- [Plan context](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/plan01/plan.md)
- [React Spectrum notes](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/plan01/10-research/react-spectrum.md)
- [Tailwind notes](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/plan01/10-research/tailwind.md)
- [Open Props notes](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/plan01/10-research/open-props.md)
- [Radix Themes notes](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/plan01/10-research/radix-themes.md)
- [Primer notes](/home/mike/Documents/projects/wrath/code/work/rac-css-structure/plan01/10-research/primer.md)
- [Atlassian spacing](https://atlassian.design/foundations/spacing/)
- [Atlassian typography](https://atlassian.design/foundations/typography/)
- [Atlassian design tokens](https://atlassian.design/foundations/tokens/design-tokens/)
- [Cloudscape content density](https://cloudscape.design/foundation/visual-foundation/content-density/)
- [Material UI density](https://mui.com/material-ui/customization/density/)
- [SAP content density (cozy and compact)](https://experience.sap.com/fiori-design-web/cozy-compact/)
