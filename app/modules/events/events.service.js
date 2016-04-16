(function() {
	'use strict';

	angular
		.module('app')
		.factory('eventsService', eventsService);

	eventsService.$inject = ['$http', '$log', 'crudService', 'sessionService'];
	function eventsService($http, $log, crudService, sessionService) {
		var vm = this;  // jshint ignore:line
		vm.event = new crudService('event');

		return {
			createEvent: createEvent,
			createOrUpdateEvent: createOrUpdateEvent,
			deleteEvent: deleteEvent,
			getEvents: getEvents,
			updateEvent: updateEvent
		};

		function createEvent(event) {
			return vm.event.create(event).then(promiseComplete);
		}

		function createOrUpdateEvent(event) {
			if (!event.event_id) {
				return createEvent(event);
			}
			return updateEvent(event.event_id, event);
		}

		function deleteEvent(id) {
			return vm.event.remove(id).then(promiseComplete);
		}

		function getEvents() {
			return sessionService.getVar('id')
				.then(getEventWithUserID);

			function getEventWithUserID(response) {
				var res = response.data;
				if (res.success) {
					return vm.event.getWhere('', res.data).then(promiseComplete);
				}
				return res.title;
			}
		}

		function updateEvent(id, event) {
			return vm.event.update(id, event).then(promiseComplete);
		}

		function promiseComplete(response) {
			var res = response.data;
			if (res.success) {
				return res.data;
			}
			return res.title;
		}
	}
})();
