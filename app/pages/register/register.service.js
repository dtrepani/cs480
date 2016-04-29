(function() {
	'use strict';

	angular
		.module('app')
		.factory('registerService', registerService);

	registerService.$inject = ['$state', '$log', 'crudService'];
	function registerService($state, $log, crudService) {
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
				var result = response.data;
				if (!result.success) {
					$log.error(result.title);
					return result.title;
				} else {
					$state.go('login');
				}
			}
		}
	}
})();