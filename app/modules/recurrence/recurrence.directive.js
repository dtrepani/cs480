(function() {
	'use strict';

	angular
		.module('app')
		.directive('spRepeat', recurrenceDirective);

	function recurrenceDirective() {
		return {
			templateUrl: 'modules/recurrence/recurrence.html',
			controller: 'RecurrenceController',
			controllerAs: 'rc',
			bindToController: true,
			scope: {
				item: '='
			}
		};
	}
})();