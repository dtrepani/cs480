(function() {
	'use strict';

	angular
		.module('app')
		.factory('registerService', registerService);

	registerService.$inject = ['$http', '$location', '$log'];
	function registerService($http, $location, $log) {
		return {
			registerUser: registerUser
		};

		function registerUser(user) {
			return $http.post('api/createUser.php', user)
				.then(registerUserComplete)
				.catch(registerUserFailed);

			function registerUserComplete(response) {
				console.log(response.data);
				return response.data;
			}

			function registerUserFailed(error) {
				$log.error(error);
			}
		}
	}
})();
