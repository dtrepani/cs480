(function() {
	'use strict';

	angular
		.module('app')
		.directive('spSharedCalendars', calendarUserDirective);

	function calendarUserDirective() {
		return {
			templateUrl: 'modules/collab/collab.html',
			controller: 'CalendarUserController',
			controllerAs: 'vm',
			bindToController: true,
			scope: {
				items: '=',
				groups: '=',
			}
		};
	}
})();