(function() {
	'use strict';

	angular
		.module('app', ['ngRoute'])
		.controller('AppController', AppController);

	AppController.$inject = ['$rootScope', '$location', 'appService'];
	function AppController($rootScope, $location, appService) {
		$rootScope.$on('$locationChangeStart', checkAuthentication);

		function checkAuthentication() {
			console.log('changed route');
			appService.isAuthenticated();
		}
	}
})();