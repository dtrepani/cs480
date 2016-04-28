(function() {
	'use strict';

	/**
	* The formats of the task and event modals.
	* Display format is used for a user-friendly date.
	* Storage format is used to store into the database.
	*/

	angular
		.module('app')
		.factory('formatService', formatService);

	formatService.$inject = ['moment'];
	function formatService(moment) {
		return {
			formatForDisplay: formatForDisplay,
			formatForStorage: formatForStorage,
			getDisplayFormat: getDisplayFormat,
			toDisplayFormat: toDisplayFormat,
			toStorageFormat: toStorageFormat
		};

		function formatForDisplay(activity) {
			if (activity.hasOwnProperty('dt_start')) {
				activity.all_day = parseInt(activity.all_day);
				activity.dt_start = toDisplayFormat(moment(activity.dt_start));
				activity.dt_end = toDisplayFormat(moment(activity.dt_end));
			} else {
				if (activity.hasOwnProperty('due') && activity.due) {
					activity.due = toDisplayFormat(moment(activity.due));
				}

				if (activity.hasOwnProperty('reminder') && activity.reminder) {
					activity.reminder = toDisplayFormat(moment(activity.reminder));
				}
			}
		}

		function formatForStorage(activity) {
			var displayFormat = getDisplayFormat();
			if (activity.hasOwnProperty('dt_start')) {
				activity.dt_start = toStorageFormat(moment(activity.dt_start, displayFormat));
				activity.dt_end = toStorageFormat(moment(activity.dt_end, displayFormat));
			} else {
				if (activity.hasOwnProperty('due') && activity.due) {
					activity.due = toStorageFormat(moment(activity.due, displayFormat));
				}

				if (activity.hasOwnProperty('reminder') && activity.reminder) {
					activity.reminder = toStorageFormat(moment(activity.reminder, displayFormat));
				}
			}
			return activity;
		}

		function getDisplayFormat() {
			return 'hh:mm a MM-DD-YYYY';
		}

		/**
		* @param {moment Object} activity
		*/
		function toDisplayFormat(activity) {
			return activity.format(getDisplayFormat());
		}

		/**
		* @param {moment Object} activity
		*/
		function toStorageFormat(activity) {
			return activity.format('YYYY-MM-DD HH:mm:ss');
		}
	}
})();
