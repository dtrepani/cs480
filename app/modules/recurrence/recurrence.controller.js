(function() {
	'use strict';

	angular
		.module('app')
		.controller('RecurrenceController', RecurrenceController);

	RecurrenceController.$inject = ['recurrenceModalService'];
	function RecurrenceController(recurrenceModalService) {
		var rc = this;
		rc.showRecurrenceModal = showRecurrenceModal;

		function showRecurrenceModal() {
			if (rc.item.recurrence) {
				recurrenceModalService.openRecurrenceModal(rc.item);
			}
		}
	}
})();