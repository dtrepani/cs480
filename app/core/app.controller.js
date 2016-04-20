(function() {
	'use strict';

	angular
		.module('app', ['ui.router', 'ui.bootstrap', 'angularMoment'])
		.controller('AppController', AppController);

	AppController.$inject = ['$rootScope', 'appService'];
	function AppController($rootScope, appService) {
		$rootScope.$on('$stateChangeError', appService.stateChangeError);
	}
})();