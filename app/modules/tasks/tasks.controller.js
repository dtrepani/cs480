(function() {
	'use strict';

	angular
		.module('app')
		.controller('TasksController', TasksController);

	TasksController.$inject = ['tasksService'];
	function TasksController(tasksService) {
		var vm = this;
		vm.tasks = {};
		vm.showTaskDialog = showTaskDialog;

		activate();

		function activate() {
			tasksService.getTasks().then(updateTasks);
		}

		function showTaskDialog(task) {
			tasksService.openTaskModal(task).then(updateTasks);
		}

		function updateTasks(response) {
			if (response) {
				vm.tasks = response;
			}
		}
	}
})();