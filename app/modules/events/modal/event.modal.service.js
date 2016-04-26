(function() {
	'use strict';

	angular
		.module('app')
		.factory('eventModalService', eventModalService);

	eventModalService.$inject = ['$uibModal', 'calendarService', 'eventsService'];
	function eventModalService($uibModal, calendarService, eventsService) {
		var vm = this;  // jshint ignore:line

		return {
			openEventModal: openEventModal
		};

		function openEventModal(event, calendars) {
			return $uibModal.open({
				controller: 'ModalController',
				controllerAs: 'vm',
				templateUrl: 'modules/events/modal/event.modal.html',
				resolve: {
					groups: function() { return calendars; },
					item: event
				}
			}).result
				.then(function(response) {
					return eventsService.createOrUpdateEvent(response)
						.then(eventsService.getEvents);
				}, function(response) {
					if (Number(response)) {
						return eventsService.deleteEvent(response)
							.then(eventsService.getEvents);
					}
				});
		}
	}
})();
