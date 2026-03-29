# Wrath

TypeScript + React + Vite frontend scaffold.

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

## License

This project is licensed under the BSD 3-Clause License. See [`LICENSE`](./LICENSE).
