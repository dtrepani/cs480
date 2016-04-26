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
			return sessionService.getVar('all')
				.then(getNameComplete);

			function getNameComplete(response) {
				var result = response.data;

				if (result.success === false) {
					return {user: {name: false}, url: '#/login'};
				}

				return {user: result.data, url: '#/dashboard'};
			}
		}
	}
})();
