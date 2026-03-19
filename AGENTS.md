## CSS Architecture

- All styles live in `src/styles/` as flat files: `tokens.css`, `base.css`, and one file per component (e.g. `tree.css`, `table.css`)
- All CSS files are imported in `src/main.tsx`; when adding a new component, add its CSS file there
- Do not use CSS Modules — plain CSS keeps RAC's `data-*` attribute selectors transparent and easy to read

## Styling Approach

- RAC components are used directly with `className` props; there are no custom wrapper components
- States (hover, selected, focus, expanded, etc.) are styled by targeting RAC's `data-*` attributes, e.g. `[data-selected]`, `[data-focus-visible]`, `[data-expanded]`
- Variants are styled using data attributes, not modifier classes

## Tokens

- Tokens live in `src/styles/tokens.css` as CSS custom properties on `:root`
- Tokenize values that are semantic and will be reused across multiple components: colors, font families (`--font-ui`, `--font-data`), data font size (`--font-size-data`)
- Do not tokenize component-specific values or values that merely happen to coincide — only tokenize when there is clear cross-component design intent

## Fonts

- Fonts are vendored as WOFF2 files in `src/fonts/` so the app works in air-gapped environments
- Do not replace vendored fonts with CDN references
- Font sampler pages (`font-sampler-sans.html`, `font-sampler-mono.html`) in the project root use CDN fonts for evaluation purposes only — this is intentional

## Avoid Absolute URL Paths

- Don't generate absolute URL paths
- The app may be served behind a proxy with an unpredictable path prefix
- Use relative asset and resource URLs so the app can be relocated without rebuilding
- Keep client-side routes in the URL fragment (hash routing) rather than path segments

## Keep WIP in Mind

- Review `WIP.md` to stay aware of work currently in progress

## Verify After Edits

- After modifying files, run `npm run format` and `npm run lint` before considering the task complete
- Update `README.md` when the edits warrant it, e.g. by changing project behavior, setup, workflow, or structure
- Resolve linter errors if you can; otherwise stop and ask the user what to do
- Run relevant tests after modifying code; for app changes, run `npm run test`
- Resolve test failures if you can; otherwise stop and ask the user what to do
- Write tests so failures help indicate what may need to change to resolve them
