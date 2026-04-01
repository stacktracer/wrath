# Wrath

TypeScript + React + Vite frontend scaffold for isolated UI experiments.

## Getting Started

Install dependencies:

```bash
npm install
```

Configure git hooks (idempotent):

```bash
npm run setup
```

Verify:

```bash
npm run lint
npm run test
npm run build
```

Start the dev server, then open `http://localhost:5173/` in a browser.

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Notes

- Built assets use a relative base path in [`vite.config.ts`](./vite.config.ts), so the app can be served from an arbitrary path prefix.
- The current RAC experiment lives under [`src/rac/`](./src/rac/) and now renders a component gallery rather than a two-widget comparison.
- RAC styles are organized locally under [`src/rac/styles/`](./src/rac/styles/).
- Use [`src/rac/styles/components.css`](./src/rac/styles/components.css) for component styles without gallery or host-shell scaffolding.
- Use [`src/rac/styles/index.css`](./src/rac/styles/index.css) only for the full RAC gallery page; it imports the component bundle plus the gallery shell in [`src/rac/styles/gallery.css`](./src/rac/styles/gallery.css).
- Light theme and comfortable density are the root defaults.
- Subtree overrides use `data-theme` and `data-density="compact"`.
- The experiment index page is [`src/index.html`](./src/index.html), which links to the current experiment host pages.

## License

This project is licensed under the BSD 3-Clause License. See [`LICENSE`](./LICENSE).
