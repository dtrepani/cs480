(function() {
	'use strict';

	angular
		.module('app')
		.filter('inGroups', inGroups);

	inGroups.$inject = [];
	function inGroups() {
		return function(activities, groups) {
			if (!groups) {
				return activities;
			}

			var activitiesInGroups = [];

			for (var i = 0; i < activities.length; i++) {
				if (activities[i].label_id === groups ||
					activities[i].calendar_id === groups
				) {
					activitiesInGroups.push(activities[i]);
				}
			}

			return activitiesInGroups;
		};
	}
})();