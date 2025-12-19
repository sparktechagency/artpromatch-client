import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off', // unused variables ইগনোর করার জন্য
      'react/no-unescaped-entities': 'off', // উদ্ধৃতি চিহ্ন (') বা স্পেশাল ক্যারেক্টার এরর বন্ধ করতে
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off', // অপশনাল চেইনিং এরর বন্ধ করতে
      'react-hooks/exhaustive-deps': 'off', // useEffect ডিপেন্ডেন্সি ওয়ার্নিং বন্ধ করতে
    },
  },
];

export default eslintConfig;
