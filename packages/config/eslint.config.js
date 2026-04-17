import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,tsx}'],
    ignores: ['node_modules/', '.output/', '.nuxt/', 'dist/'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {},
  },
  eslintConfigPrettier,
  eslintPluginPrettier,
  globalIgnores([
    'node_modules/*',
    '*/**/.output',
    '*/**/.nuxt',
    '*/**/dist/*',
  ]),
]);
