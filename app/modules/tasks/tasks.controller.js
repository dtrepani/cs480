(function() {
	'use strict';

	angular
		.module('app')
		.controller('TasksController', TasksController);

	TasksController.$inject = ['tasksService', 'taskModalService'];
	function TasksController(tasksService, taskModalService) {
		var vm = this;
		vm.showTaskModal = showTaskModal;
		vm.toggleCompleted = toggleCompleted;

		function showTaskModal(task) {
			taskModalService.openTaskModal(task, vm.labels).then(updateTasks);
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