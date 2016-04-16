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

		function openEventModal(event) {
			if (angular.isString(event.due)) {
				event.due = new Date(event.due.replace(/(.+) (.+)/, "$1T$2Z"));
			}
			if (angular.isString(event.reminder)) {
				event.reminder = new Date(event.reminder.replace(/(.+) (.+)/, "$1T$2Z"));
			}

			return $uibModal.open({
				controller: 'ModalController',
				controllerAs: 'vm',
				templateUrl: 'modules/events/modal/event.modal.html',
				resolve: {
					groups: calendarService.getCalendars(),
					item: event
				}
			}).result
				.then(function(response) {
					return eventsService.createOrUpdateEvent(response)
						.then(eventsService.getEvents);
				}, function(response) {
					if (typeof response !== 'string') {
						return eventsService.deleteEvent(response)
							.then(eventsService.getEvents);
					}
				});
		}
	}
})();
