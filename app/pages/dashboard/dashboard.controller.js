(function() {
	'use strict';

	angular
		.module('app')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['isAuthenticated', 'tasks', 'events', 'labels', 'calendars'];
	function DashboardController(isAuthenticated, tasks, events, labels, calendars) {
		var vm = this;
		vm.tasks = tasks;
		vm.events = events;
		vm.labels = labels;
		vm.calendars = calendars;
	}
})();