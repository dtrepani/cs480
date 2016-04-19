(function() {
	'use strict';

	angular
		.module('app')
		.factory('recurrenceService', recurrenceService);

	function recurrenceService() {
		var recurrenceCols = {
			freq: ['hourly', 'daily', 'weekly', 'monthly', 'yearly'],
			days: ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'],
			by: ['by_hour', 'by_day', 'by_month_day', 'by_year_day', 'by_week_no', 'by_month']
		};

		return {
			clearRecurrence: clearRecurrence,
			constructRecurrence: constructRecurrence
		};

		function clearRecurrence(item) {
			item.recurrence = false;
		}

		function constructRecurrence(item) {

		}
	}
})();
