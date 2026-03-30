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
- RAC styles are organized locally under [`src/rac/styles/`](./src/rac/styles/) using:
    - alias tokens
    - semantic tokens
    - selector-scoped themes
    - density overrides
    - component-family stylesheets
- The experiment index page is [`src/index.html`](./src/index.html), which links to the current experiment host pages.

## License

This project is licensed under the BSD 3-Clause License. See [`LICENSE`](./LICENSE).
