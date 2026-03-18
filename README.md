# Wrath

Wrath is a Vite + React + TypeScript frontend scaffold.

At the moment, the app renders a basic React Aria tree with direct, intentionally minimal styling so the widget behavior can be evaluated before a more deliberate visual design pass.

## Requirements

- Node.js
- npm

## Getting Started

Install dependencies:

```bash
npm install
```

One-time setup (per clone):

```bash
npm run setup
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

- The current tree widget uses `react-aria-components` with direct CSS styling rather than a starter kit.
- The current styling is deliberately sparse so the raw widget behavior is easy to evaluate.
- The Vite base path is configured as relative in [`vite.config.ts`](./vite.config.ts), so built assets can be served from an arbitrary path prefix.
- Keep asset and resource URLs relative rather than absolute.
- If client-side routing is added later, it should use hash routing rather than path-based routing.

## Current Structure

- [`src/app.tsx`](./src/app.tsx): main React application and hard-coded tree data
- [`src/app.test.tsx`](./src/app.test.tsx): browser test for the rendered tree shell
- [`src/main.tsx`](./src/main.tsx): React bootstrap entry point
- [`src/main.css`](./src/main.css): intentionally minimal tree and page styling
- [`index.html`](./index.html): app host page
- [`vite.config.ts`](./vite.config.ts): Vite and Vitest configuration
- [`eslint.config.mjs`](./eslint.config.mjs): ESLint flat config
- [`.prettierrc.json`](./.prettierrc.json): Prettier configuration

## License

This project is licensed under the BSD 3-Clause License. See [`LICENSE`](./LICENSE).
