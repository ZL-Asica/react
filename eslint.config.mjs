import { zlAsicaTsReactConfig } from 'eslint-config-zl-asica';

export default [
  ...zlAsicaTsReactConfig,
  {
    rules: {
      'unicorn/filename-case': 'off',
      'import/group-exports': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/no-object-as-default-parameter': 'off',
    },
  },
];
