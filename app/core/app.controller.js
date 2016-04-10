(function() {
	'use strict';

	angular
		.module('app', ['ngRoute'])
		.controller('AppController', AppController);

	AppController.$inject = ['$rootScope', 'appService'];
	function AppController($rootScope, appService) {
		$rootScope.$on('$routeChangeError', appService.routeChangeError);
	}
})();