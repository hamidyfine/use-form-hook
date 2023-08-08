module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    extends: [
        'react-app',
        'react-app/jest',
        'plugin:react-hooks/recommended',
        'plugin:json/recommended',
    ],
    rules: {
        'arrow-parens': 'off',
        'class-methods-use-this': 'off',
        'comma-dangle': ['error', 'always-multiline'],
        'eol-last': ['error', 'always'],
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-named-as-default': 'off',
        'import/no-unresolved': 'off',
        'indent': ['error', 4],
        'jsx-a11y/label-has-associated-control': 'off',
        'key-spacing': ['error'],
        'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
        'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
        'max-len': ['error', { code: 256 }],
        'newline-before-return': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? ['error', { allow: ['warn', 'error'] }] : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-multiple-empty-lines': 'off',
        'no-prototype-builtins': 'off',
        'no-trailing-spaces': ['error', { ignoreComments: true, skipBlankLines: true }],
        'no-underscore-dangle': 'off',
        'padded-blocks': ['error', 'never'],
        'quotes': ['error', 'single'],
        'react/boolean-prop-naming': ['error', { rule: '^(is|has|should)_[a-z]+(_[a-z]+)*$' }],
        'react/jsx-closing-bracket-location': 'error',
        'react/jsx-curly-newline': 'error',
        'react/jsx-first-prop-new-line': ['error', 'multiline'],
        'react/jsx-max-props-per-line': ['error', { 'maximum': 1, 'when': 'always' }],
        'react/jsx-props-no-multi-spaces': 'error',
        'react/jsx-sort-props': ['error', { callbacksLast: true, shorthandFirst: true, reservedFirst: true, multiline: 'first' }],
        'react/jsx-tag-spacing': ['error'],
        'require-jsdoc': 'off',
        'semi': 'error',
        'space-in-parens': 'off',
    },
};