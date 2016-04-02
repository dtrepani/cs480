(function() {
	'use strict';

	angular
		.module('app')
		.factory('loginService', loginService);

	loginService.$inject = ['$http', '$log'];
	function loginService($http, $log) {
		return {
			login: login
		};

		function login(user) {
			return $http.post('api/managers/loginManager.php', user)
				.then(loginComplete)
				.catch(loginFailed);

			function loginComplete(response) {
				return response.data;
			}

			function loginFailed(error) {
				$log.error(error);
				return false;
			}
		}
	}
})();
