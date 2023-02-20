const path = require('node:path');
const config = require('@sapphire/eslint-config');

module.exports = {
	...config,
	parserOptions: {
		...config.parserOptions,
		project: path.join(__dirname, 'tsconfig.eslint.json')
	},
	rules: {
		...config.rules,
		'@typescript-eslint/no-base-to-string': 0,
		'@typescript-eslint/no-throw-literal': 0,
		'no-catch-shadow': 0
	},
	overrides: [
		{
			files: ['src/commands/**/*.ts'],
			rules: {
				'@typescript-eslint/require-await': 0
			}
		},
		{
			files: ['**/**/database/**/*.ts'],
			rules: {
				'@typescript-eslint/explicit-member-accessibility': 0,
				'@typescript-eslint/no-inferrable-types': 0
			}
		}
	]
};
