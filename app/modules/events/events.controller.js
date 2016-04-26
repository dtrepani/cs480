(function() {
	'use strict';

	angular
		.module('app')
		.controller('EventsController', EventsController);

	EventsController.$inject = ['moment', 'calendarWidgetService', 'calendarService', 'eventsService', 'eventModalService'];
	function EventsController(moment, calendarWidgetService, calendarService, eventsService, eventModalService) {
		var vm = this;
		vm.events = function() { return eventsService.getEvents(); };
		vm.calendar = function() { return calendarService.getCalendars(); };

		vm.today = null;
		vm.selectedDay = null;
		vm.month = null;

		vm.isSameDayAsSelected = isSameDayAsSelected;
		vm.getEndOfDay = getEndOfDay;
		vm.selectDay = selectDay;
		vm.showEventModal = showEventModal;
		vm.lastMonth = lastMonth;
		vm.nextMonth = nextMonth;

		activate();

		function activate() {
			vm.today = calendarWidgetService.getToday();
			vm.selectedDay = vm.today;
			vm.month = calendarWidgetService.getMonth(vm.today);
		}

		function getEndOfDay(day) {
			return calendarWidgetService.getEndOfDay(day);
		}

		function isSameDayAsSelected(day) {
			return calendarWidgetService.isSameDay(day, vm.selectedDay);
		}

		function selectDay(day) {
			vm.selectedDay = day.fullDate;
		}

		function showEventModal(event) {
			eventModalService.openEventModal(event, vm.calendars);
		}

		function lastMonth() {
			vm.month = calendarWidgetService.lastMonth(vm.month);
		}

		function nextMonth() {
			vm.month = calendarWidgetService.nextMonth(vm.month);
		}
	}
})();