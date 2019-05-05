const HtmlReporter = require('protractor-beautiful-reporter');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
	// allScriptsTimeout: 11000,

	seleniumAddress: 'http://localhost:4444/wd/hub',
	// seleniumServerJar: './selenium-server-standalone-3.141.59.jar',
	// capabilities: {
	// 	'browserName': 'chrome',
	// 	chromeOptions: {
	// 		args: ["incognito", "disable-extensions", "start-maximized"]
	// 	}
	// },

	multiCapabilities: [
		{
			'browserName': 'chrome',
			shardTestFiles: true,
			maxInstances: 1,
			chromeOptions:
      {
      	args: ['--incognito', '--disable-gpu'],
      },
		},

	],
	specs: ['./src/test/login.spec.js'],

	// directConnect: false,
	directConnect: true,
	baseUrl: 'http://18.182.46.19:8080/exam/login',
	framework: 'jasmine',
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 150000,
		DEFAULT_TIMEOUT_INTERVAL: 150000,
	},
	onPrepare: function () {
		var AllureReporter = require('jasmine-allure-reporter');


		require('jasmine-reporters');
		let globals = require('protractor');
		let browser = globals.browser;

		browser.manage().window().maximize();
		browser.manage().timeouts().implicitlyWait(5000);
		browser.manage().timeouts().setScriptTimeout(30000);

		jasmine.getEnv().addReporter(new HtmlReporter({
			baseDirectory: './Reports/html/', docName: 'htmlReport.html'
		}).getJasmine2Reporter());

		jasmine.getEnv().addReporter(new SpecReporter({
			spec: {
				displayStackTrace: true,
			},
		}));
		jasmine.getEnv().addReporter(new AllureReporter({
			resultsDir: 'allure-results'
		}));
	}

};