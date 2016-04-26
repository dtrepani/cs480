(function() {
	'use strict';

	angular
		.module('app')
		.controller('SidebarController', SidebarController);

	SidebarController.$inject = ['labelService', 'calendarService'];
	function SidebarController(labelService, calendarService) {
		var vm = this;
		vm.collapsed = true;
		vm.labels = function() { return labelService.getLabels(); };
		vm.calendars = function() { return calendarService.getCalendars(); };
	}
})();