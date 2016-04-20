(function() {
	'use strict';

	angular
		.module('app')
		.factory('appService', appService);

	appService.$inject = ['$location', 'statusService'];
	function appService($location, statusService) {
		return {
			stateChangeError: stateChangeError
		};

		function stateChangeError(event, unfoundState, fromState, fromParams) {
			if (fromParams === statusService.UNAUTHORIZED) {
				$location.path('/login');
			} else if (fromParams === statusService.FORBIDDEN) {
				$location.path('/forbidden');
			}
		}
	}
})();
