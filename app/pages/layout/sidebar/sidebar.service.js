(function() {
	'use strict';

	angular
		.module('app')
		.factory('sidebarService', sidebarService);

	sidebarService.$inject = ['$window'];
	function sidebarService($window) {
		var vm = this; // jshint ignore: line
		vm.collapsed = {};

		activate();

		return {
			getCollapsed: getCollapsed,
			toggleSidebar: toggleSidebar,
			toggleCalendars: toggleCalendars,
			toggleLabels: toggleLabels
		};

		function activate() {
			if ($window.innerWidth < 600) {
				vm.collapsed = {
					sidebar: true,
					calendars: true,
					labels: true
				};
			} else {
				vm.collapsed = {
					sidebar: false,
					calendars: false,
					labels: false
				};
			}
		}

		function getCollapsed() {
			return vm.collapsed;
		}

		function toggleSidebar() {
			vm.collapsed.sidebar = !vm.collapsed.sidebar;
			if (vm.collapsed.sidebar) {
				vm.collapsed.calendars = true;
				vm.collapsed.labels = true;
			}
			return vm.collapsed;
		}

		function toggleCalendars() {
			vm.collapsed.calendars = !vm.collapsed.calendars;
			if (!vm.collapsed.calendars) {
				vm.collapsed.sidebar = false;
			}
			return vm.collapsed;
		}

		function toggleLabels() {
			vm.collapsed.labels = !vm.collapsed.labels;
			if (!vm.collapsed.labels) {
				vm.collapsed.sidebar = false;
			}
			return vm.collapsed;
		}
	}
})();
