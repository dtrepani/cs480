(function() {
	'use strict';

	angular
		.module('app')
		.factory('appService', appService);

	appService.$inject = ['$location', 'statusService'];
	function appService($location, statusService) {
		return {
			routeChangeError: routeChangeError
		};

		function routeChangeError(event, current, previous, rejection) {
			if (rejection === statusService.UNAUTHORIZED) {
				$location.path('/login');
			} else if (rejection === statusService.FORBIDDEN) {
				$location.path('/forbidden');
			}
		}
	}
})();
