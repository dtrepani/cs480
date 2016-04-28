(function() {
	'use strict';

	angular
		.module('app')
		.controller('EventsController', EventsController);

	EventsController.$inject = ['$rootScope', 'calendarWidgetService', 'calendarService', 'eventsService'];
	function EventsController($rootScope, calendarWidgetService, calendarService, eventsService) {
		var vm = this;
		vm.events = [];
		vm.calendar = [];

		vm.today = null;
		vm.selectedDay = null;
		vm.month = null;

		vm.dayClicked = dayClicked;
		vm.isSameDayAsSelected = isSameDayAsSelected;
		vm.showEventModal = showEventModal;
		vm.lastMonth = lastMonth;
		vm.nextMonth = nextMonth;

		activate();

		function activate() {
			updateCalendars();
			updateEvents();

			$rootScope.$on('updateCalendars', updateCalendars);
			$rootScope.$on('updateEvents', updateEvents);

			vm.today = calendarWidgetService.getToday();
			vm.selectedDay = vm.today;
			vm.month = calendarWidgetService.getMonth(vm.today);
		}

		function dayClicked(clickEvent, day) {
			vm.selectedDay = calendarWidgetService.dayClicked(clickEvent, day, vm.selectedDay, vm.calendars);
		}

		function isSameDayAsSelected(day) {
			return calendarWidgetService.isSameDay(day, vm.selectedDay);
		}

		function showEventModal(clickEvent, event) {
			calendarWidgetService.showEventModal(clickEvent, event, vm.calendars);
		}

		function lastMonth() {
			vm.month = calendarWidgetService.lastMonth(vm.month);
		}

		function nextMonth() {
			vm.month = calendarWidgetService.nextMonth(vm.month);
		}

		function updateCalendars() {
			vm.calendars = calendarService.getCalendars();
		}

		function updateEvents() {
			vm.events = eventsService.getEvents();
		}
	}
})();