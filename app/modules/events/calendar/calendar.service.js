(function() {
	'use strict';

	angular
		.module('app')
		.factory('calendarService', calendarService);

	calendarService.$inject = ['$http', '$log', 'crudService', 'sessionService'];
	function calendarService($http, $log, crudService, sessionService) {
		var vm = this;  // jshint ignore:line
		vm.calendar = new crudService('calendar');

		return {
			createCalendar: createCalendar,
			deleteCalendar: deleteCalendar,
			getCalendars: getCalendars,
			updateCalendar: updateCalendar
		};

		function createCalendar(calendar) {
			return vm.calendar.create(calendar).then(promiseComplete);
		}

		function deleteCalendar(id) {
			return vm.calendar.remove(id).then(promiseComplete);
		}

		function getCalendars() {
			return sessionService.getVar('id')
				.then(getCalendarWithUserID);

			function getCalendarWithUserID(response) {
				var res = response.data;
				if (res.success) {
					return vm.calendar.getWhere('person_id=' + res.data, '').then(promiseComplete);
				}
				return res.title;
			}
		}

		function updateCalendar(id, calendar) {
			return vm.calendar.update(id, calendar).then(promiseComplete);
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
