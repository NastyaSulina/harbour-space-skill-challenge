import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-plugin-prettier/recommended'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
    globalIgnores(['dist', 'node_modules']),
    {
        files: ['src/**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            importPlugin.flatConfigs.recommended,
            importPlugin.flatConfigs.typescript,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            reactX.configs['recommended-typescript'],
            reactDom.configs.recommended,
            prettier,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        settings: {
            'import/resolver': {
                typescript: {
                    project: './tsconfig.app.json',
                },
                node: true,
            },
        },
        rules: {
            'prettier/prettier': ['error'],

            'import/order': [
                'error',
                {
                    groups: [
                        'external',
                        'builtin',
                        'index',
                        'sibling',
                        'parent',
                        'internal',
                        'type',
                    ],
                    pathGroups: [
                        { pattern: '@app/**', group: 'internal', position: 'before' },
                        { pattern: '@pages/**', group: 'internal', position: 'before' },
                        { pattern: '@widgets/**', group: 'internal', position: 'before' },
                        { pattern: '@features/**', group: 'internal', position: 'before' },
                        { pattern: '@entities/**', group: 'internal', position: 'before' },
                        { pattern: '@shared/**', group: 'internal', position: 'before' },
                    ],
                    'newlines-between': 'always',
                },
            ],
            'import/no-extraneous-dependencies': 'off',
            'import/prefer-default-export': 'off',
        },
    },
])
