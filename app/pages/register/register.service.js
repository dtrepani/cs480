(function() {
	'use strict';

	angular
		.module('app')
		.factory('registerService', registerService);

	registerService.$inject = ['$location', '$log', 'crudService'];
	function registerService($location, $log, crudService) {
		var vm = this;  // jshint ignore:line
		vm.crud = new crudService('user');

		return {
			register: register
		};

		function register(user) {
			user.name = user.name.toLowerCase().trim();

			return vm.crud.create(user)
				.then(registrationComplete);

			function registrationComplete(response) {
				if (response.success === 'false') {
					$log.error(response.title);
					return response.title;
				}
				$location.url('/login');
			}
		}
	}
})();