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
			return $http({
				method: 'post',
				url: '../api/Database/CreateItem.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: {
					type: 'PERSON',
					name: user.name,
					password: user.password,
					email: user.email
				}
			})
				.then(registerUserComplete)
				.catch(registerUserFailed);

			function registerUserComplete(response) {
				return response.data;
			}

			function registerUserFailed(error) {
				$log.error(error);
			}
		}
	}
})();
