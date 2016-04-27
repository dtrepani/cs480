(function() {
	'use strict';

	angular
		.module('app')
		.controller('EventsController', EventsController);

	EventsController.$inject = ['$rootScope', 'moment', 'calendarWidgetService', 'calendarService', 'eventsService', 'eventModalService'];
	function EventsController($rootScope, moment, calendarWidgetService, calendarService, eventsService, eventModalService) {
		var vm = this;
		vm.events = [];
		vm.calendar = [];

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
			updateCalendars();
			updateEvents();

			$rootScope.$on('updateCalendars', updateCalendars);
			$rootScope.$on('updateEvents', updateEvents);

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

		function showEventModal(clickEvent, event) {
			clickEvent.stopPropagation();
			eventModalService.openEventModal(event, vm.calendars);
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