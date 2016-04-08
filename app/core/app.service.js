(function() {
	'use strict';

	angular
		.module('app')
		.factory('appService', appService);

	appService.$inject = ['$location', 'sessionService'];
	function appService($location, sessionService) {
		return {
			checkAuthentication: checkAuthentication
		};

		function checkAuthentication() {
			sessionService.getVar('name')
				.then(isAuthenticatedComplete);

			function isAuthenticatedComplete(response) {
				if (response.data === 'false') {
					$location.url('/login');
				}
			}
		}
	}
})();
