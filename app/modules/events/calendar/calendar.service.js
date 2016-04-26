(function() {
	'use strict';

	angular
		.module('app')
		.factory('calendarService', calendarService);

	calendarService.$inject = ['crudService', 'cacheService'];
	function calendarService(crudService, cacheService) {
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
			return cacheService.getCalendars();
		}

		function updateCalendar(id, calendar) {
			return vm.calendar.update(id, calendar).then(promiseComplete);
		}

		function promiseComplete(response) {
			var result = response.data;
			if (result.success) {
				cacheService.cacheCalendars();
				return result.data;
			}
			return result.title;
		}
	}
})();
