import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    test: {
      exclude: ['src/**/*.int.spec.ts'],
      include: ['src/**/*.spec.ts'],
      name: 'Unit',
    },
  },
  {
    test: {
      include: ['src/**/*.int.spec.ts'],
      name: 'Integration',
    },
  },
]);