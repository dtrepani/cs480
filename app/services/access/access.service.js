(function() {
	'use strict';

	angular
		.module('app')
		.factory('accessService', accessService);

	accessService.$inject = ['$location', '$q', 'sessionService', 'statusService'];
	function accessService($location, $q, sessionService, statusService) {
		var deferred = $q.defer();

		return {
			isAuthenticated: isAuthenticated,
			isAdmin: isAdmin
		};

		function isAuthenticated() {
			return sessionService.getVar('name')
				.then(isAuthenticatedComplete);

			function isAuthenticatedComplete(response) {
				if (response.data.success !== false) {
					deferred.resolve(statusService.OK);
				} else {
					deferred.reject(statusService.UNAUTHORIZED);
				}

				return deferred.promise;
			}
		}

		function isAdmin() {

		}
	}
})();
