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

		function openTaskModal(task, labels) {
			return $uibModal.open({
				controller: 'ModalController',
				controllerAs: 'vm',
				templateUrl: 'modules/tasks/modal/task.modal.html',
				resolve: {
					groups: function() { return labels; },
					item: task
				}
			}).result
				.then(function(response) {
					return tasksService.createOrUpdateTask(response)
						.then(tasksService.getTasks);
				}, function(response) {
					if (typeof response !== 'string') {
						return tasksService.deleteTask(response)
							.then(tasksService.getTasks);
					}
				});
		}
	}
})();
