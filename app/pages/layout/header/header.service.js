(function() {
	'use strict';

	angular
		.module('app')
		.factory('headerService', headerService);

	headerService.$inject = ['$http', '$log', 'sessionService'];
	function headerService($http, $log, sessionService) {
		return {
			getUser: getUser
		};

		function getUser() {
			return sessionService.getVar('name')
				.then(getNameComplete)
				.catch(getNameFailed);

			function getNameComplete(response) {
				if (response.data === 'false') {
					return {name: false, url: '#/login'};
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
