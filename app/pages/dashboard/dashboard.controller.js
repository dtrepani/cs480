(function() {
	'use strict';

	angular
		.module('app')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['isAuthenticated'];
	function DashboardController(isAuthenticated) {
		var vm = this;
	}
})();