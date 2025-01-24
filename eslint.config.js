// eslint.config.cjs
const js = require('@eslint/js');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const unusedImports = require('eslint-plugin-unused-imports');
/**
 * This is the new "flat config" style.
 * We export an array of config objects, each describing
 * how ESLint should handle certain files.
 */
module.exports = [
	// 1) Rules for all JavaScript files
	{
		files: ['**/*.{js,mjs,cjs}'],
    // base recommended JS rules
		...js.configs.recommended, 
		rules: {
			// Add your custom JS-only rules here if you want
		},
	},

	// 2) Rules for all TypeScript files
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
		// The new flat config "languageOptions" replaces parserOptions
		languageOptions: {
      // @typescript-eslint/parser
			parser: tsParser, 
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		// Register the TypeScript ESLint plugin
		plugins: {
			'@typescript-eslint': tsPlugin,
      'unused-imports': unusedImports,
		},
		// Merge in the recommended rule sets from both JS & TS
		rules: {
			// Start with the recommended JS rules
			...js.configs.recommended.rules,
			// Merge in recommended TS plugin rules
			...tsPlugin.configs.recommended.rules,

			// Now add or override with your custom rules:
			'arrow-spacing': ['warn', { before: true, after: true }],
			'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
			'comma-dangle': ['error', 'always-multiline'],
			'comma-spacing': 'error',
			'comma-style': 'error',
			curly: ['error', 'multi-line', 'consistent'],
			'dot-location': ['error', 'property'],
			'handle-callback-err': 'off',
			indent: ['error', 4],
			'keyword-spacing': 'error',
			'max-nested-callbacks': ['error', { max: 4 }],
			'max-statements-per-line': ['error', { max: 2 }],
			'no-console': 'off',
			'no-empty-function': 'error',
			'no-floating-decimal': 'error',
			'no-inline-comments': 'error',
			'no-lonely-if': 'error',
			'no-multi-spaces': 'error',
			'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1, maxBOF: 0 }],
			'no-shadow': ['error', { allow: ['err', 'resolve', 'reject'] }],
			'no-trailing-spaces': 'error',
			'no-var': 'error',
      'no-undef': 'off',
			// 'no-undef': 'off', // Typical to turn off for TS, as TS does its own
			'object-curly-spacing': ['error', 'always'],
			'prefer-const': 'error',
			quotes: ['error', 'single'],
			semi: ['error', 'always'],
			'space-before-blocks': 'error',
			'space-before-function-paren': [
				'error',
				{
					anonymous: 'never',
					named: 'never',
					asyncArrow: 'always',
				},
			],
			'space-in-parens': 'error',
			'space-infix-ops': 'error',
			'space-unary-ops': 'error',
			'spaced-comment': 'error',
			yoda: 'error',
		},
	},
];
