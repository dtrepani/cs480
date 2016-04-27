(function() {
	'use strict';

	angular
		.module('app')
		.controller('LogoutController', LogoutController);

	LogoutController.$inject = ['logoutService'];
	function LogoutController(logoutService) {
		activate();

		function activate() {
			logoutService.logout();
		}
	}
})();