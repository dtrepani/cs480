(function() {
	'use strict';

	angular
		.module('app')
		.controller('TasksController', TasksController);

	TasksController.$inject = ['tasksService', 'labelService', 'taskModalService'];
	function TasksController(tasksService, labelService, taskModalService) {
		var vm = this;
		vm.tasks = function() { return tasksService.getTasks(); };
		vm.labels = function() { return labelService.getLabels(); };
		vm.showTaskModal = showTaskModal;
		vm.toggleCompleted = toggleCompleted;

		function showTaskModal(task) {
			taskModalService.openTaskModal(task, vm.labels());
		}

		function toggleCompleted(task) {
			tasksService.toggleCompleted(task);
		}
	}
})();