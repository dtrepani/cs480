(function() {
	'use strict';

	angular
		.module('app')
		.factory('calendarWidgetService', calendarWidgetService);

	calendarWidgetService.$inject = ['moment'];
	function calendarWidgetService(moment) {
		return {
			getMonth: getMonth,
			getWeek: getWeek,
			getToday: getToday,
			isSameDay: isSameDay
		};

		/**
		* @param {Moment Object} aDay Day to build month around.
		* @return {Moment Object[][]}
		*/
		function getMonth(aDay) {
			var month = [];
			var day = aDay.clone().date(1).startOf('week');
			for (var i = aDay.month(); i === aDay.month(); i = day.month()) {
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
	}
})();
