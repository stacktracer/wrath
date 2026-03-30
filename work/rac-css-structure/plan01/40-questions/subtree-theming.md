# Subtree Theming

## Conclusion

Support subtree theming, but treat it as a rare, deliberate capability rather than a normal day-to-day styling tool.

The pattern is clearly real and useful across the prior art. Radix Themes explicitly supports nesting `Theme` to modify a specific subtree, with inherited configuration. React Spectrum supports nested `Provider` themes for different parts of an app, including dark subtrees inside light apps. Open Props even documents “section theme” as a first-class use case. Primer allows theme data attributes on a high-level element and says `ThemeProvider` can be nested for isolated behavior. Tailwind can also scope theme variants to a subtree via custom selectors such as `[data-theme=dark]`.

That said, the shared lesson is not “theme islands everywhere.” It is “theme islands are an escape hatch for coarse, visibly distinct regions.” The systems that make subtree theming easy still keep the global theme surface small and explicit. Their nesting examples are about dark dialogs, forced local appearance, or a section with its own visual identity, not about routine per-component retuning.

For RAC + plain CSS, the safest policy is:

1. Make subtree theming supported and documented.
2. Allow it mainly for coarse boundaries such as app shells, dialogs, previews, embedded experiences, or intentionally distinct sections.
3. Discourage using subtree themes to paper over ordinary component-level tweaks; use semantic tokens, component-local tokens, or local CSS for that.
4. Keep the allowed theme knobs small, so nested islands do not become a second, harder-to-reason-about token system.

So the answer is closer to “rare but legitimate” than either “normal” or “effectively discouraged.” If we make it normal, we will fragment the semantic layer. If we discourage it too hard, we lose a useful tool that multiple mature systems already rely on.

## Evidence

- [Radix Themes Theme nesting](https://www.radix-ui.com/themes/docs/components/theme)
- [Radix Themes dark mode](https://www.radix-ui.com/themes/docs/theme/dark-mode)
- [React Spectrum theming](https://react-spectrum.adobe.com/v3/theming.html)
- [React Spectrum Provider](https://react-spectrum.adobe.com/react-spectrum/Provider.html)
- [Open Props theme switch / section theme](https://open-props.style/)
- [Primer Primitives theming](https://primer.style/product/primitives/)
- [Primer Brand theming](https://primer.style/brand/introduction/theming/)
- [Tailwind dark mode and custom variants](https://tailwindcss.com/docs/dark-mode)
- [Tailwind custom variants](https://tailwindcss.com/docs/adding-custom-styles#adding-custom-variants)
