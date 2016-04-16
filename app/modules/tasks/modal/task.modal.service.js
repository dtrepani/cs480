(function() {
	'use strict';

	angular
		.module('app')
		.factory('taskModalService', taskModalService);

	taskModalService.$inject = ['$uibModal', 'labelService', 'tasksService'];
	function taskModalService($uibModal, labelService, tasksService) {
		var vm = this;  // jshint ignore:line

		return {
			openTaskModal: openTaskModal
		};

		function openTaskModal(task) {
			if (angular.isString(task.due)) {
				task.due = new Date(task.due.replace(/(.+) (.+)/, "$1T$2Z"));
			}
			if (angular.isString(task.reminder)) {
				task.reminder = new Date(task.reminder.replace(/(.+) (.+)/, "$1T$2Z"));
			}

			return $uibModal.open({
				controller: 'ModalController',
				controllerAs: 'vm',
				templateUrl: 'modules/tasks/modal/task.modal.html',
				resolve: {
					groups: labelService.getLabels(),
					item: task
				}
			}).result
				.then(function(response) {
					return tasksService.createOrUpdateTask(response)
						.then(tasksService.getTasks);
				}, function(response) {
					if (response) {
						return tasksService.deleteTask(response)
							.then(tasksService.getTasks);
					}
				});
		}
	}
})();
