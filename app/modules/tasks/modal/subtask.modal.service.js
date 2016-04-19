(function() {
	'use strict';

	angular
		.module('app')
		.factory('subtaskModalService', subtaskModalService);

	subtaskModalService.$inject = ['$uibModal', 'labelService', 'subtasksService'];
	function subtaskModalService($uibModal, labelService, subtasksService) {
		return {
			openSubtaskModal: openSubtaskModal
		};

		function openSubtaskModal(subtask, task) {
			$uibModal.open({
				controller: 'ModalController',
				controllerAs: 'vm',
				templateUrl: 'modules/tasks/modal/subtask.modal.html',
				resolve: {
					groups: task,
					item: subtask
				}
			}).result
				.then(function(res) {
					subtasksService.createOrUpdateSubtask(res.subtask, res.task);
				}, function(res) {
					if (typeof res !== 'string') {
						subtasksService.deleteSubtask(res.subtask, res.task);
					}
				});
		}
	}
})();
