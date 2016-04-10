(function() {
	'use strict';

	angular
		.module('app')
		.factory('loginService', loginService);

	loginService.$inject = ['$http', '$location', '$log'];
	function loginService($http, $location, $log) {
		var vm = this;  // jshint ignore:line

		return {
			login: login
		};

		function login(user) {
			return $http.post('api/managers/loginManager.php', user)
				.then(loginComplete)
				.catch(loginFailed);

			function loginComplete(response) {
				if (response.data.success === false) {
					return response.data.title;
				}
				$location.path('/dashboard');
			}

			function loginFailed(error) {
				$log.error(error);
				return 'Something went wrong. Please try again.';
			}
		}
	}
})();
