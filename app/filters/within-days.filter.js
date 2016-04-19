(function() {
	'use strict';

	angular
		.module('app')
		.filter('withinDays', withinDays);

	withinDays.$inject = ['moment'];
	function withinDays(moment) {
		return function(tasks, numOfDays) {
			if (!numOfDays) {
				return tasks;
			}

			var tasksWithinDays = [];

			for (var i = 0; i < tasks.length; i++) {
				var result;

				if (!tasks[i].due || (tasks[i].due &&
					moment(tasks[i].due).isBefore(moment().add(numOfDays, 'days')))
				) {
					tasksWithinDays.push(tasks[i]);
				}
			}

			return tasksWithinDays;
		};
	}
})();