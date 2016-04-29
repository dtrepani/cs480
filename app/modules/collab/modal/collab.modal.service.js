(function() {
	'use strict';

	// TODO: separate into labelUser and calendarUser modal services

	angular
		.module('app')
		.factory('collabModalService', collabModalService);

	collabModalService.$inject = ['$uibModal', 'tasksService'];
	function collabModalService($uibModal, tasksService) {
		return {
			openCollabModal: openCollabModal
		};

		/**
		* Without cloning the item, any changes made in the modal will be reflected
		* in the main window regardless of if the changes were saved or not, which
		* means a user would not be able to cancel their changes unless they refresh.
		*/
		function openCollabModal(item, labels) {
			var clonedItem = {};
			angular.extend(clonedItem, item);

			return $uibModal.open({
				controller: 'ModalController',
				controllerAs: 'vm',
				templateUrl: 'modules/collab/modal.modal.html',
				resolve: {
					groups: {},
					item: clonedItem
				}
			}).result
				.then(function(response) {
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
