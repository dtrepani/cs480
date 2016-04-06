(function() {
	'use strict';

	angular
		.module('app')
		.factory('headerService', headerService);

	headerService.$inject = ['$http', '$log'];
	function headerService($http, $log) {
		var vm = this;  // jshint ignore:line

		return {
			getUser: getUser
		};

		function getUser() {
			return $http.get('api/session/sessionVarManager.php?var=name')
				.then(getNameComplete)
				.catch(getNameFailed);

			function getNameComplete(response) {
				console.log(response);
				if (response.data === 'false') {
					return {name: 'Login', url: '#/login'};
				}

				return {name: response.data, url: '#/dashboard'};
			}

			function getNameFailed(error) {
				$log.error(error);
				return 'Something went wrong. Please try again.';
			}
		}
	}
})();
