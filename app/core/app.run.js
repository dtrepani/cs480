(function() {
	'use strict';

	angular
		.module('app')
		.run(runBlock);

	runBlock.$inject = ['appService'];
	function runBlock(appService) {
		appService.init();
	}
})();