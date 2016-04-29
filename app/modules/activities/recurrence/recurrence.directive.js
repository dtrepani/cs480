(function() {
	'use strict';

	angular
		.module('app')
		.directive('spRepeat', recurrenceDirective);

	function recurrenceDirective() {
		return {
			templateUrl: 'modules/activities/recurrence/recurrence.html',
			controller: 'RecurrenceController',
			controllerAs: 'rc',
			bindToController: true,
			scope: {
				item: '='
			}
		};
	}
})();