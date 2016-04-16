(function() {
	'use strict';

	angular
		.module('app')
		.controller('EventsController', EventsController);

	EventsController.$inject = ['calendarWidgetService', 'eventsService', 'eventModalService'];
	function EventsController(calendarWidgetService, eventsService, eventModalService) {
		var vm = this;
		vm.isSameDayAsSelected = isSameDayAsSelected;
		vm.selectDay = selectDay;
		vm.showEventModal = showEventModal;

		activate();

		function activate() {
			vm.today = calendarWidgetService.getToday();
			vm.selectedDay = vm.today;
			vm.month = calendarWidgetService.getMonth(vm.today);
		}

		function isSameDayAsSelected(day) {
			return calendarWidgetService.isSameDay(day.fullDate, vm.selectedDay);
		}

		function selectDay(day) {
			vm.selectedDay = day.fullDate;
		}

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