(function() {
	'use strict';

	angular
		.module('app')
		.controller('TasksController', TasksController);

	TasksController.$inject = ['tasksService'];
	function TasksController(tasksService) {
		var vm = this;
		vm.tasks = {};

		activate();

		function activate() {
			tasksService.getTasks().then(function(response) { vm.tasks = response; });
		}
	}
})();