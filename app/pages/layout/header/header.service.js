(function() {
	'use strict';

	angular
		.module('app')
		.factory('headerService', headerService);

	headerService.$inject = ['sessionService'];
	function headerService(sessionService) {
		return {
			getUser: getUser
		};

		/**
		* Get the username of the logged in user.
		* @return {name: string|false, url: string}  Username (or false if not logged in) and url to redirect to in the header.
		*/
		function getUser() {
			sessionService.getVar('name')
				.then(getNameComplete);

			function getNameComplete(response) {
				if (response.data === 'false') {
					return {name: false, url: '/login'};
				}

				return {name: response, url: '/dashboard'};
			}
		}
	}
})();
