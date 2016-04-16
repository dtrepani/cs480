(function() {
	'use strict';

	angular
		.module('app')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['isAuthenticated', 'tasks', 'events'];
	function DashboardController(isAuthenticated, tasks, events) {
		var vm = this;
		vm.tasks = tasks;
		vm.events = events;
	}
})();