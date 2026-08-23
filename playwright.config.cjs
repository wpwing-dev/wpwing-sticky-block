const { defineConfig } = require( '@playwright/test' );

module.exports = defineConfig( {
	testDir: './tests/e2e',
	testMatch: '**/*.spec.js',
	workers: 1,
	use: {
		browserName: 'chromium',
		headless: true,
		launchOptions: {
			executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
			args: [ '--no-sandbox', '--disable-dev-shm-usage' ],
		},
	},
} );
