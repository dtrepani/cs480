(function() {
	'use strict';

	angular
		.module('app')
		.controller('SidebarController', SidebarController);

	SidebarController.$inject = ['$rootScope', 'labelService', 'calendarService'];
	function SidebarController($rootScope, labelService, calendarService) {
		var vm = this;
		vm.collapsed = true;
		vm.labels = [];
		vm.calendars = [];

		activate();

		function activate() {
			updateCalendars();
			updateLabels();

			$rootScope.$on('updateCalendars', updateCalendars);
			$rootScope.$on('updateLabels', updateLabels);
		}

		function updateCalendars() {
			vm.calendars = calendarService.getCalendars();
		}

		function updateLabels() {
			vm.labels = labelService.getLabels();
		}
	}
})();