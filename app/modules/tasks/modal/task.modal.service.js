(function() {
	'use strict';

	angular
		.module('app')
		.factory('taskModalService', taskModalService);

	taskModalService.$inject = ['$uibModal', 'tasksService', 'formatService'];
	function taskModalService($uibModal, tasksService, formatService) {
		var vm = this; // jshint ignore: line

		return {
			openTaskModal: openTaskModal
		};

		/**
		* Without cloning the task, any changes made in the modal will be reflected
		* in the main window regardless of if the changes were saved or not, which
		* means a user would not be able to cancel their changes unless they refresh.
		*/
		function openTaskModal(task, labels) {
			var clonedTask = {};
			angular.extend(clonedTask, task);
			formatService.formatForDisplay(clonedTask);

			return $uibModal.open({
				controller: 'ModalController',
				controllerAs: 'vm',
				templateUrl: 'modules/tasks/modal/task.modal.html',
				resolve: {
					groups: function() { return labels; },
					item: clonedTask
				}
			}).result
				.then(function(response) {
					response = formatService.formatForStorage(response);
					return tasksService.createOrUpdateTask(response)
						.then(tasksService.getTasks);
				}, function(response) {
					if (Number(response)) {
						return tasksService.deleteTask(response)
							.then(tasksService.getTasks);
					}
				});
		}
	}
})();
