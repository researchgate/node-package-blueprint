module.exports = {
  plugins: [
    'stylelint-scss',
    'stylelint-order',
  ],
  rules: {
    'at-rule-blacklist': ['debug'],
    'at-rule-no-vendor-prefix': true,
    'block-no-empty': true,
    'block-opening-brace-space-before': 'always',
    'color-hex-length': 'short',
    'color-hex-case': 'lower',
    'color-named': 'never',
    'color-no-invalid-hex': true,
    'declaration-bang-space-before': 'always',
    'declaration-bang-space-after': 'never',
    'declaration-block-no-duplicate-properties':[ true, { 'ignore': [ 'consecutive-duplicates' ] } ],
    'declaration-block-semicolon-newline-after': 'always',
    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',
    'declaration-block-trailing-semicolon': 'always',
    'function-comma-space-after': 'always',
    'function-parentheses-space-inside': 'never',
    'declaration-property-value-blacklist': {
        '/^border(-(left|right|bottom|top))?$/': 'none'
    },
    'indentation': 2,
    'length-zero-no-unit': true,
    'no-missing-end-of-source-newline': true,
    'no-duplicate-selectors': true,
    'number-no-trailing-zeros': true,
    'number-leading-zero': 'always',
    'media-feature-name-no-vendor-prefix': true,
    'property-no-unknown': true,
    'property-no-vendor-prefix': true,
    'scss/at-else-empty-line-before': 'never',
    'scss/at-function-pattern': '^[a-z0-9-_]+$',
    'scss/at-mixin-pattern': '^[a-z0-9-_]+$',
    'scss/dollar-variable-pattern': '^[a-z0-9-_]+$',
    'scss/percent-placeholder-pattern': '^[a-z0-9-_]+$',
    'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/at-extend-no-missing-placeholder': true,
    'selector-list-comma-newline-after': 'always',
    'selector-max-empty-lines': 0,
    'selector-no-vendor-prefix': true,
    'shorthand-property-no-redundant-values': true,
    'string-quotes': 'single',
    'unit-whitelist': ['em', 'rem', 'pt', 'px', 'vh', 'vw', 'deg', 'ms', 's', '%', 'dppx', 'dpi'],
    'value-no-vendor-prefix': true,
    'block-opening-brace-space-before': 'always',
    'function-url-quotes': 'always',
    'declaration-no-important': true,
    'max-empty-lines': 1,
    'max-nesting-depth': 4,
    'order/order': [
        'custom-properties',
        'dollar-variables',
        {
            'type': 'at-rule',
            'name': 'extend'
        },
        {
            'type': 'at-rule',
            'name': 'include',
            'hasBlock': false
        },
        'declarations',
        {
            'type': 'at-rule',
            'name': 'include',
            'hasBlock': true
        }
    ],
    'rule-empty-line-before': [ 'always', { 'except': ['first-nested'], 'ignore': ['after-comment'] } ],
    'scss/at-import-no-partial-leading-underscore': true,
    'selector-class-pattern': ['^([\.\%])?([a-z]*(#{.*?})*[-]?[a-z0-9\-]*)(\.[a-z0-9\-]*)?(__(#{.*?})*[a-z0-9]*[-]?[a-z0-9\-]*)?(--(#{.*?})*[a-z0-9]*[-]?[a-z0-9\-]*)?(\:[a-z]*)*$', {
        'resolveNestedSelectors': true
    }],
    'selector-max-compound-selectors': 4,
    'selector-max-id': 0,
    'selector-no-qualifying-type': true,
    'selector-max-type': 0,
    'selector-pseudo-element-colon-notation': 'double',
  }
}
