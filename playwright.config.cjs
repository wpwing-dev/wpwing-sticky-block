const { defineConfig } = require( '@playwright/test' );

module.exports = defineConfig( {
	testDir: './tests/e2e',
	testMatch: '**/*.spec.js',
	workers: 1,
	projects: [
		{
			name: 'frontend',
			testMatch: '**/sticky-behavior.spec.js',
			use: {
				browserName: 'chromium',
				headless: true,
				launchOptions: {
					executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
					args: [ '--no-sandbox', '--disable-dev-shm-usage' ],
				},
			},
		},
		{
			name: 'backend',
			testMatch: '**/wordpress-editor.spec.js',
			use: {
				baseURL: process.env.WP_BASE_URL || 'https://sticky-block.local',
				browserName: 'chromium',
				headless: true,
				ignoreHTTPSErrors: true,
				launchOptions: {
					executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
					args: [ '--no-sandbox', '--disable-dev-shm-usage' ],
				},
			},
		},
	],
} );
