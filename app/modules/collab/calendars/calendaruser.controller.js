(function() {
	'use strict';

	angular
		.module('app')
		.controller('CalendarUserController', CalendarUserController);

	CalendarUserController.$inject = ['calendarUserService'];
	function CalendarUserController(calendarUserService) {
		var vm = this;
		// vm.labels = [];
		// vm.tasks = [];
	}
})();