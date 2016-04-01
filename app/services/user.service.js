(function() {
	'use strict';

	angular
		.module('app')
		.factory('userService', userService);

	userService.$inject = ['$http', '$log'];
	function userService($http, $log) {
		return {
			getUser: getUser,
			createUser: createUser,
			updateUser: updateUser,
			deleteUser: deleteUser
		};

		function getUser(id) {
			return $http.get('api/managers/userManager.php?id=' + id)
				.then(promiseComplete)
				.catch(promiseFailed);
		}

		function createUser(user) {
			return $http.post('api/managers/userManager.php', user)
				.then(promiseComplete)
				.catch(promiseFailed);
		}

		function updateUser(id, user) {
			return $http.put('api/managers/userManager.php?id=' + id, user)
				.then(promiseComplete)
				.catch(promiseFailed);
		}

		function deleteUser(id) {
			return $http.post('api/managers/userManager.php?id=' + id)
				.then(promiseComplete)
				.catch(promiseFailed);
		}

		function promiseComplete(response) {
			return response.data.success;
		}

		function promiseFailed(error) {
			$log.error(error);
			return false;
		}
	}
})();
