(function() {
	'use strict';

	angular
		.module('app')
		.controller('TasksController', TasksController);

	TasksController.$inject = ['$rootScope', 'tasksService', 'labelService', 'taskModalService'];
	function TasksController($rootScope, tasksService, labelService, taskModalService) {
		var vm = this;
		vm.labels = [];
		vm.tasks = [];
		vm.showTaskModal = showTaskModal;
		vm.toggleCompleted = toggleCompleted;

		activate();

		function activate() {
			updateLabels();
			updateTasks();

			$rootScope.$on('updateLabels', updateLabels);
			$rootScope.$on('updateTasks', updateTasks);
		}

		function showTaskModal(task) {
			taskModalService.openTaskModal(task, vm.labels);
		}

		function toggleCompleted(task) {
			tasksService.toggleCompleted(task);
		}

		function updateLabels() {
			vm.labels = labelService.getLabels();
		}

		function updateTasks() {
			vm.tasks = tasksService.getTasks();
		}
	}
})();