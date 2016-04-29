(function() {
	'use strict';

	angular
		.module('app')
		.directive('spEvents', eventsDirective);

	function eventsDirective() {
		return {
			templateUrl: 'modules/activities/events/events.html',
			controller: 'EventsController',
			controllerAs: 'vm',
			bindToController: true
		};
	}
})();