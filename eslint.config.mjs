import js from '@eslint/js';
import tsEslint from 'typescript-eslint';
import tsEslintParser from '@typescript-eslint/parser';
import vitest from 'eslint-plugin-vitest';
import eslintImport from 'eslint-plugin-import';
import { fixupPluginRules } from '@eslint/compat';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tsEslint.config(
  {
    ignores: ['**/*.js', '**/*.mjs', '.gitignore']
  },
  js.configs.recommended,
  tsEslint.configs.eslintRecommended,
  ...tsEslint.configs.strictTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      ecmaVersion: 2022,
      parser: tsEslintParser,
      parserOptions: {
        tsconfigDirName: import.meta.dirname,
        project: ['./tsconfig.json'],
      },
      globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
    },
  },
  {
    files: ['**/*.ts'],
    plugins: {
      import: fixupPluginRules(eslintImport),
    },
    rules: {
      ...eslintImport.configs.errors.rules,
      ...eslintImport.configs.warnings.rules,
      ...eslintImport.configs.typescript.rules,
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            accessors: 'explicit',
            constructors: 'explicit',
            methods: 'explicit',
            properties: 'off',
            parameterProperties: 'off',
          },
        },
      ],
      '@typescript-eslint/member-ordering': ['warn'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['classProperty'],
          format: ['strictCamelCase', 'UPPER_CASE', 'snake_case'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'typeParameter',
          format: ['StrictPascalCase'],
          prefix: ['T'],
        },
        {
          selector: ['typeLike'],
          format: ['StrictPascalCase'],
        },
        {
          selector: ['function', 'classMethod'],
          format: ['strictCamelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: ['variable'],
          format: ['StrictPascalCase', 'strictCamelCase'],
          modifiers: ['const', 'exported'],
          leadingUnderscore: 'allow',
        },
        {
          selector: ['parameter'],
          format: ['strictCamelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: ['variableLike'],
          format: ['strictCamelCase', 'UPPER_CASE', 'snake_case'],
        },
      ],
      '@typescript-eslint/no-deprecated': 'off',
      '@typescript-eslint/no-duplicate-type-constituents': 'off',
      '@typescript-eslint/no-dynamic-delete': 'error',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-invalid-void-type': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-floating-promises': ['error'],
      '@typescript-eslint/no-non-null-assertion': 'off',
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers': [
        'warn',
        {
          ignore: [0, 1],
          ignoreArrayIndexes: true,
          ignoreEnums: true,
          ignoreReadonlyClassProperties: true,
        },
      ],
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-unused-expressions': ['error'],
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-literal-enum-member': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': ['off'],
      '@typescript-eslint/prefer-optional-chain': 'off',
      '@typescript-eslint/prefer-readonly': ['warn'],
      '@typescript-eslint/promise-function-async': ['error'],
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/restrict-plus-operands': [
        'error',
        {
          skipCompoundAssignments: false,
        },
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
        },
      ],
      '@typescript-eslint/typedef': [
        'error',
        {
          arrayDestructuring: true,
          arrowParameter: true,
          memberVariableDeclaration: true,
          objectDestructuring: true,
          parameter: true,
          propertyDeclaration: true,
          variableDeclaration: true,
        },
      ],
      '@typescript-eslint/unified-signatures': 'error',
      'import/default': 'off',
      'import/namespace': 'off',
      'import/newline-after-import': 'error',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          groups: ['external', 'builtin', 'internal'],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: 'vitest',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'vitest-mock',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['vitest', 'vitest-mock'],
        },
      ],
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
      'sort-keys': [
        'error',
        'asc',
        {
          caseSensitive: false,
          natural: true,
        },
      ],
    },
    settings: {
      'import/resolver': {
        node: true,
        typescript: true,
      },
    },
  },
  {
    files: ['**/*.spec.ts'],
    plugins: {
      vitest
    },
    rules: {
      ...vitest.configs.recommended.rules,
      ...vitest.configs.all.rules,
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-empty-function': "off",
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      'vitest/consistent-test-filename': 'off',
      'vitest/max-expects': 'off',
      'vitest/no-hooks': 'off',
      'vitest/prefer-expect-assertions': 'off',
      'vitest/prefer-strict-equal': 'error',
      'vitest/valid-title': 'off',
    }, 
  },
);