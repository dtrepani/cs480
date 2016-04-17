(function() {
	'use strict';

	angular
		.module('app')
		.controller('EventsController', EventsController);

	EventsController.$inject = ['moment', 'calendarWidgetService', 'eventsService', 'eventModalService'];
	function EventsController(moment, calendarWidgetService, eventsService, eventModalService) {
		var vm = this;
		vm.isSameDayAsSelected = isSameDayAsSelected;
		vm.getEndOfDay = getEndOfDay;
		vm.selectDay = selectDay;
		vm.showEventModal = showEventModal;

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
			eventModalService.openEventModal(event, vm.calendars).then(updateEvents);
		}

		function updateEvents(response) {
			if (response) {
				vm.events = response;
			}
		}
	}
})();