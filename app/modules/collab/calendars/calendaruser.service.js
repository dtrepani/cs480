(function() {
	'use strict';

	angular
		.module('app')
		.factory('calendarUserService', calendarUserService);

	calendarUserService.$inject = ['crudService'];
	function calendarUserService(crudService) {
		var vm = this;  // jshint ignore:line
		vm.calendarUser = new crudService('calendarUser');

		return {
			createCalendarUser: createCalendarUser,
			createOrUpdateCalendarUser: createOrUpdateCalendarUser,
			deleteCalendarUser: deleteCalendarUser,
			getSharedCalendars: getSharedCalendars,
			getSharedUsersForCalendar: getSharedUsersForCalendar,
			getEventsForCalendar: getEventsForCalendar,
			updateCalendarUser: updateCalendarUser
		};

		function createCalendarUser(calendarUser) {
			return vm.calendarUser.create(calendarUser).then(promiseComplete);
		}

		function createOrUpdateCalendarUser(calendarUser) {
			if (!calendarUser.calendarUser_id) {
				return createCalendarUser(calendarUser);
			}
			return updateCalendarUser(calendarUser.calendarUser_id, calendarUser);
		}

		function deleteCalendarUser(id) {
			return vm.calendarUser.remove(id).then(promiseComplete);
		}

		// TODO: fix this filthy override done for the sake of time.
		function getSharedCalendars() {
			return vm.calendarUser.getWhere('groups', {}).then(promiseComplete);
		}

		function getSharedUsersForCalendar() {
			return vm.calendarUser.getWhere('users', {}).then(promiseComplete);
		}

		function getEventsForCalendar() {
			return vm.calendarUser.getWhere('activities', {}).then(promiseComplete);
		}

		function updateCalendarUser(id, calendarUser) {
			return vm.calendarUser.update(id, calendarUser).then(promiseComplete);
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
