(function() {
	'use strict';

	angular
		.module('app')
		.factory('appService', appService);

	appService.$inject = ['$location', '$log', 'sessionService'];
	function appService($location, $log, sessionService) {
		return {
			checkAuthentication: checkAuthentication
		};

		function checkAuthentication() {
			sessionService.getVar('name')
				.then(checkAuthenticationComplete);

			function checkAuthenticationComplete(response) {
				if (response.data.success === false) {
					$location.url('/login');
				}
			}
		}
	}
})();
