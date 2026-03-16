import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    base: './',
    test: {
        include: ['src/**/*.test.ts'],
        browser: {
            provider: playwright(),
            enabled: false,
            headless: true,
            instances: [{ browser: 'chromium' }],
        },
    },
});
