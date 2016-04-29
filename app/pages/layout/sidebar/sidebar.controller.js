(function() {
	'use strict';

	angular
		.module('app')
		.controller('SidebarController', SidebarController);

	SidebarController.$inject = ['$rootScope', 'sharedCalendars', 'sharedLabels', 'labelService', 'calendarService', 'sidebarService'];
	function SidebarController($rootScope, sharedCalendars, sharedLabels, labelService, calendarService, sidebarService) {
		var vm = this;
		vm.collapsed = {};
		vm.labels = [];
		vm.calendars = [];
		vm.sharedCalendars = sharedCalendars;
		vm.sharedLabels = sharedLabels;

		vm.toggleSidebar = toggleSidebar;
		vm.toggleCalendars = toggleCalendars;
		vm.toggleLabels = toggleLabels;

		activate();

		function activate() {
			updateCalendars();
			updateLabels();

			vm.collapsed = sidebarService.getCollapsed();

			$rootScope.$on('updateCalendars', updateCalendars);
			$rootScope.$on('updateLabels', updateLabels);
		}

		function toggleSidebar() {
			vm.collapsed = sidebarService.toggleSidebar();
		}

		function toggleCalendars() {
			vm.collapsed = sidebarService.toggleCalendars();
		}

		function toggleLabels() {
			vm.collapsed = sidebarService.toggleLabels();
		}

		function updateCalendars() {
			vm.calendars = calendarService.getCalendars();
		}

		function updateLabels() {
			vm.labels = labelService.getLabels();
		}
	}
})();