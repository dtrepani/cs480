(function() {
	'use strict';

	angular
		.module('app')
		.factory('eventModalService', eventModalService);

	eventModalService.$inject = ['$uibModal', 'moment', 'eventsService', 'formatService'];
	function eventModalService($uibModal, moment, eventsService, formatService) {
		return {
			openEventModal: openEventModal,
			toggleAllDay: toggleAllDay
		};

		/**
		* Without cloning the event, any changes made in the modal will be reflected
		* in the main window regardless of if the changes were saved or not, which
		* means a user would not be able to cancel their changes unless they refresh.
		*/
		function openEventModal(event, calendars) {
			var clonedEvent = {};
			angular.extend(clonedEvent, event);
			formatService.formatForDisplay(clonedEvent);

			return $uibModal.open({
				controller: 'ModalController',
				controllerAs: 'vm',
				templateUrl: 'modules/activities/events/modal/event.modal.html',
				resolve: {
					groups: function() { return calendars; },
					item: clonedEvent
				}
			}).result
				.then(function(response) {
					formatService.formatForStorage(response);
					return eventsService.createOrUpdateEvent(response)
						.then(eventsService.getEvents);
				}, function(response) {
					if (Number(response)) {
						return eventsService.deleteEvent(response)
							.then(eventsService.getEvents);
					}
				});
		}

		function toggleAllDay(event) {
			var display = formatService.getDisplayFormat();

			if (event.all_day) {
				event.dt_start = formatService.toDisplayFormat(moment(event.dt_start, display).startOf('day'));
				event.dt_end = formatService.toDisplayFormat(moment(event.dt_start, display).endOf('day'));
			} else {
				var currentHour = moment().startOf('hour').hour();
				event.dt_start = formatService.toDisplayFormat(moment(event.dt_start, display).hour(currentHour));
				event.dt_end = formatService.toDisplayFormat(moment(event.dt_start, display).hour(currentHour).add(1, 'hours'));
			}
		}
	}
})();
