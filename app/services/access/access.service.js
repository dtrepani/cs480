(function() {
	'use strict';

	angular
		.module('app')
		.factory('accessService', accessService);

	accessService.$inject = ['$q', 'sessionService', 'statusService'];
	function accessService($q, sessionService, statusService) {
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
			return sessionService.getVar('admin')
				.then(isAdminComplete);

			function isAdminComplete(response) {
				var result = response.data;
				if (result.success !== false && result.data == 1) {
					deferred.resolve(statusService.OK);
				} else {
					deferred.reject(statusService.FORBIDDEN);
				}

				return deferred.promise;
			}
		}
	}
})();
