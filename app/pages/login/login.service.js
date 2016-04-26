(function() {
	'use strict';

	angular
		.module('app')
		.factory('loginService', loginService);

	loginService.$inject = ['$http', '$location', '$log', 'cacheService'];
	function loginService($http, $location, $log, cacheService) {
		var vm = this;  // jshint ignore:line

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
				$location.path('/dashboard');
			}

			function loginFailed(error) {
				$log.error(error);
				return 'Something went wrong. Please try again.';
			}
		}
	}
})();
