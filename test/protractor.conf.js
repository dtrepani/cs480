exports.config = {
	allScriptsTimeout: 11000,

	specs: [
		'e2e/*.js'
	],

	capabilities: {
		'browserName': 'chrome' // REMEMBER: PhantomJS can cause crashing with AngularJS
	},

	baseUrl: 'http://localhost:8080/client/app',

	framework: 'jasmine',

	jasmineNodeOpts: {
		defaultTimeoutInterval: 30000,
		showColors: true,
		print: function() {} // Remove dots from protractor
	},

	// Enable the karma-equivalent of spec-style reporting of specs.
	onPrepare: function() {
		var SpecReporter = require('jasmine-spec-reporter');
		jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
	}
};