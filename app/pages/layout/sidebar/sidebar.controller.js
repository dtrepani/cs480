(function() {
	'use strict';

	angular
		.module('app')
		.controller('SidebarController', SidebarController);

	SidebarController.$inject = ['labels', 'calendars'];
	function SidebarController(labels, calendars) {
		var vm = this;
		vm.collapsed = true;
		vm.labels = labels;
		vm.calendars = calendars;
	}
})();