(function() {
	'use strict';

	angular
		.module('app')
		.factory('recurrenceModalService', recurrenceModalService);

	recurrenceModalService.$inject = ['$uibModal', 'recurrenceService'];
	function recurrenceModalService($uibModal, recurrenceService) {
		var rc = this; // jshint ignore: line
		var recurrenceInfo = {
			freq: ['hourly', 'daily', 'weekly', 'monthly', 'yearly'],
			days: ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']
		};

		return {
			openRecurrenceModal: openRecurrenceModal
		};

		function openRecurrenceModal(item) {
			return $uibModal.open({
				controller: 'ModalController',
				controllerAs: 'vm',
				templateUrl: 'modules/activities/recurrence/modal/recurrence.modal.html',
				resolve: {
					groups: function() { return recurrenceInfo; },
					item: item
				}
			}).result
				.then(function(response) {
					recurrenceService.constructRecurrence(item);
				}, function(response) {
					recurrenceService.clearRecurrence(item);
				});
		}
	}
})();
