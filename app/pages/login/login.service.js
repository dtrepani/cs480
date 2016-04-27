(function() {
	'use strict';

	angular
		.module('app')
		.factory('loginService', loginService);

	loginService.$inject = ['$rootScope', '$http', '$state', '$log', 'cacheService'];
	function loginService($rootScope, $http, $state, $log, cacheService) {
		return {
			login: login
		};

		function login(user) {
			user.name = user.name.toLowerCase().trim();

			return $http.post('api/user/loginManager.php', user)
				.then(loginComplete)
				.catch(loginFailed);

			function loginComplete(response) {
				if (response.data.success === false) {
					return response.data.title;
				}

				cacheService.cacheAll();
				$rootScope.$broadcast('updateUser');
				$state.go('dashboard');
			}

			function loginFailed(error) {
				$log.error(error);
				return 'Something went wrong. Please try again.';
			}
		}
	}
})();
