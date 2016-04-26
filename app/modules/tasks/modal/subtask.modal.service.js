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

		/**
		* Without cloning the subtask, any changes made in the modal will be reflected
		* in the main window regardless of if the changes were saved or not, which
		* means a user would not be able to cancel their changes unless they refresh.
		*/
		function openSubtaskModal(subtask, task) {
			var clonedSubtask = {};
			angular.extend(clonedSubtask, subtask);

			$uibModal.open({
				controller: 'ModalController',
				controllerAs: 'vm',
				templateUrl: 'modules/tasks/modal/subtask.modal.html',
				resolve: {
					groups: task,
					item: clonedSubtask
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
