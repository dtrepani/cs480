(function() {
	'use strict';

	angular
		.module('app')
		.controller('EventsController', EventsController);

	EventsController.$inject = ['eventsService', 'eventModalService'];
	function EventsController(eventsService, eventModalService) {
		var vm = this;
		vm.showEventModal = showEventModal;

		function showEventModal(event) {
			eventModalService.openEventModal(event).then(updateEvents);
		}

		function updateEvents(response) {
			if (response) {
				vm.events = response;
			}
		}
	}
})();