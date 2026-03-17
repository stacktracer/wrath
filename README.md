# Wrath

Wrath is a small Vite + TypeScript frontend scaffold.

At the moment, the app renders a minimal single-screen shell with a light/dark theme that follows `prefers-color-scheme`.

## Requirements

- Node.js
- npm

## Getting Started

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Quality Checks

Format the repository:

```bash
npm run format
```

Check formatting without changing files:

```bash
npm run format:check
```

Run the linter:

```bash
npm run lint
```

Run the linter with automatic fixes where available:

```bash
npm run lint:fix
```

Run the browser test suite once:

```bash
npm run test
```

Run the browser test suite in watch mode:

```bash
npm run test:watch
```

A pre-commit hook runs formatting and linting before commits. GitHub Actions runs formatting checks, linting, browser tests, and the production build on pushes and pull requests.

## Project Notes

- The Vite base path is configured as relative in [`vite.config.ts`](./vite.config.ts), so built assets can be served from an arbitrary path prefix.
- Keep asset and resource URLs relative rather than absolute.
- If client-side routing is added later, it should use hash routing rather than path-based routing.

## Current Structure

- [`src/main.ts`](./src/main.ts): app entry point and DOM assembly
- [`src/main.css`](./src/main.css): page styling
- [`index.html`](./index.html): app host page
- [`vite.config.ts`](./vite.config.ts): Vite configuration
- [`eslint.config.mjs`](./eslint.config.mjs): ESLint flat config
- [`.prettierrc.json`](./.prettierrc.json): Prettier configuration

## License

This project is licensed under the BSD 3-Clause License. See [`LICENSE`](./LICENSE).
