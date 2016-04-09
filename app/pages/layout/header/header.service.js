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
				.then(getNameComplete);

			function getNameComplete(response) {
				var res = response.data;

				if (res.success === false) {
					return {name: false, url: '#/login'};
				}
				return {name: res.data, url: '#/dashboard'};
			}
		}
	}
})();
