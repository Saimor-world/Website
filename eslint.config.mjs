import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

const __dirname = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'coverage/**', 'test-results/**', 'playwright-report/**', '.qa/**', 'next-env.d.ts', '_scratch/**'],
  },
  ...compat.extends('next/core-web-vitals'),
];

export default eslintConfig;
