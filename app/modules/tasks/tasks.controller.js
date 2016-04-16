(function() {
	'use strict';

	angular
		.module('app')
		.controller('TasksController', TasksController);

	TasksController.$inject = ['tasksService', 'taskModalService'];
	function TasksController(tasksService, taskModalService) {
		var vm = this;
		vm.tasks = [];
		vm.showTaskDialog = showTaskDialog;
		vm.toggleCompleted = toggleCompleted;

		activate();

		function activate() {
			tasksService.getTasks().then(updateTasks);
		}

		function showTaskDialog(task) {
			taskModalService.openTaskModal(task).then(updateTasks);
		}

		function toggleCompleted(task) {
			tasksService.toggleCompleted(task).then(updateTasks);
		}

		function updateTasks(response) {
			if (response) {
				vm.tasks = response;
			}
		}
	}
})();