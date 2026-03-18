import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    base: './',
    plugins: [react()],
    test: {
        include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
        browser: {
            provider: playwright(),
            enabled: true,
            headless: true,
            instances: [{ browser: 'chromium' }],
        },
    },
});
