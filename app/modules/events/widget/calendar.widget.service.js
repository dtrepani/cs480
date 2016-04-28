(function() {
	'use strict';

	angular
		.module('app')
		.factory('calendarWidgetService', calendarWidgetService);

	calendarWidgetService.$inject = ['moment', 'eventModalService'];
	function calendarWidgetService(moment, eventModalService) {
		return {
			dayClicked: dayClicked,
			getMonth: getMonth,
			getToday: getToday,
			getWeek: getWeek,
			isSameDay: isSameDay,
			lastMonth: lastMonth,
			nextMonth: nextMonth,
			showEventModal: showEventModal
		};

		function dayClicked(clickEvent, day, selectedDay, calendars) {
			if (isSameDay(day.fullDate, selectedDay)) {
				showEventModal(
					clickEvent,
					{
						dt_start: day.fullDate,
						dt_end: day.fullDate.clone().endOf('day'),
						all_day: 1,
					},
					calendars
				);
				return selectedDay;
			}
			return day.fullDate;
		}
		/**
		* @param {Moment Object} aDay Day to build month around.
		* @return {Moment Object[][]}
		*/
		function getMonth(aDay) {
			var month = [];
			var day = aDay.clone().date(1).startOf('week');
			for (var i = 0; i < 6; i++) {
				month.push(getWeek(day, aDay.month()));
				day = day.add(1, 'weeks');
			}
			return month;
		}

		function getToday() {
			return moment();
		}

		/**
		* @param {Moment Object}	startDay	Starting day of a week.
		* @param {int}				targetMonth	Month number being built.
		*
		* @return {Moment Object[]}
		*/
		function getWeek(startDay, targetMonth) {
			var week = [];

			var day = startDay.clone();
			for (var i = 0; i < 7; i++) {
				week.push({
					number: day.date(),
					isTargetMonth: (day.month() === targetMonth),
					isToday: day.isSame(moment(), 'day'),
					fullDate: day
				});
				day = day.clone().add(1, 'days');
			}

			return week;
		}

		/**
		* @param {Moment Object}	day1
		* @param {Moment Object}	day2
		*
		* @return {bool}
		*/
		function isSameDay(day1, day2) {
			return day1.isSame(day2, 'day');
		}

		/**
		* Since srcMonth is an array of days by weeks, it contains days not in the
		* source month. The first day of the third week of the given month is
		* guaranteed to be a day within the source month.
		*
		* @param {Moment Object}	srcMonth
		* @return {Moment Object[]}
		*/
		function lastMonth(srcMonth) {
			return getMonth(srcMonth[3][0].fullDate.clone().subtract(1, 'months'));
		}

		/**
		* @see lastMonth()
		*/
		function nextMonth(srcMonth) {
			return getMonth(srcMonth[3][0].fullDate.clone().add(1, 'months'));
		}

		function showEventModal(clickEvent, event, calendars) {
			clickEvent.stopPropagation();
			eventModalService.openEventModal(event, calendars);
		}
	}
})();
