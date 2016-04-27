(function() {
	'use strict';

	angular
		.module('app')
		.factory('logoutService', logoutService);

	logoutService.$inject = ['$rootScope', '$http', '$state', '$log', 'cacheService'];
	function logoutService($rootScope, $http, $state, $log, cacheService) {
		return {
			logout: logout
		};

		function logout() {
			return $http.post('api/user/logoutManager.php')
				.then(logoutComplete)
				.catch(logoutFailed);

			function logoutComplete(response) {
				cacheService.clearCache();
				$rootScope.$broadcast('updateUser');
				$state.go('login');
			}

			function logoutFailed(error) {
				$log.error(error);
			}
		}
	}
})();
