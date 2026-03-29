import { readdirSync, statSync } from 'node:fs';
import { relative, resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const srcRoot = resolve('src');
const viteCacheDir = resolve('node_modules/.vite');
function discoverPageEntries(directory: string): string[] {
    return readdirSync(directory).flatMap(entry => {
        if (
            entry.startsWith('.') ||
            entry === '__screenshots__' ||
            entry === 'fonts' ||
            entry === 'node_modules'
        ) {
            return [];
        }

        const entryPath = resolve(directory, entry);
        const stats = statSync(entryPath);

        if (!stats.isDirectory()) {
            return [];
        }

        const pageEntry = resolve(entryPath, 'index.html');
        try {
            return statSync(pageEntry).isFile() ? [pageEntry] : [];
        } catch {
            return [];
        }
    });
}

const rootIndex = resolve(srcRoot, 'index.html');
const htmlInputs = [rootIndex, ...discoverPageEntries(srcRoot)];
const rollupInput = Object.fromEntries(
    htmlInputs.map(htmlPath => {
        const name =
            htmlPath === rootIndex ? 'index' : relative(srcRoot, htmlPath).replace(/\/index\.html$/, '');
        return [name, htmlPath];
    }),
);

export default defineConfig({
    root: srcRoot,
    base: './',
    cacheDir: viteCacheDir,
    plugins: [react()],
    optimizeDeps: {
        include: ['react', 'react-dom/client', 'react-aria-components'],
    },
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: rollupInput,
        },
    },
    test: {
        include: ['**/*.test.ts', '**/*.test.tsx'],
        browser: {
            provider: playwright(),
            enabled: true,
            headless: true,
            instances: [{ browser: 'chromium' }],
        },
    },
});
