import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['dist/', 'coverage/', 'node_modules/'],
    },
    {
        files: ['**/*.js', '**/*.mjs'],
        ...js.configs.recommended,
        languageOptions: {
            ...js.configs.recommended.languageOptions,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        rules: {
            ...js.configs.recommended.rules,
            curly: ['error', 'all'],
            eqeqeq: ['error', 'always'],
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                document: 'readonly',
                window: 'readonly',
            },
        },
        rules: {
            curly: ['error', 'all'],
            eqeqeq: ['error', 'always'],
            'no-undef': 'off',
            'no-fallthrough': 'error',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
        },
    },
);
