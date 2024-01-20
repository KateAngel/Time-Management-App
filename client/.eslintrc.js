module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:react-hooks/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        indent: 'off',
        curly: ['warn', 'all'],
        'prettier/prettier': 'warn',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/explicit-member-accessibility': [
            'warn',
            { accessibility: 'no-public' },
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/member-delimiter-style': [
            'warn',
            { multiline: { delimiter: 'none' } },
        ],
        '@typescript-eslint/no-object-literal-type-assertion': 'off',
        '@typescript-eslint/prefer-interface': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-extra-semi': 'off',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            { varsIgnorePattern: 'h' },
        ],
        '@typescript-eslint/no-unnecessary-type-constraint': 'off',

        'no-console': 'warn',

        'padding-line-between-statements': [
            'warn',
            {
                blankLine: 'always',
                prev: '*',
                next: [
                    'block-like',
                    'multiline-expression',
                    'multiline-const',
                    'return',
                ],
            },
            {
                blankLine: 'always',
                prev: ['block-like', 'multiline-expression', 'multiline-const'],
                next: '*',
            },
        ],
        'react/prop-types': 'off',
        'react-hooks/rules-of-hooks': 'warn',
        'react-hooks/exhaustive-deps': 'warn',
        'react/self-closing-comp': ['warn', { component: true, html: true }],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',
        'react/display-name': 'off',
    },
    overrides: [
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
}
