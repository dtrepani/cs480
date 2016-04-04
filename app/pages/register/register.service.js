(function() {
	'use strict';

	angular
		.module('app')
		.factory('registerService', registerService);

	registerService.$inject = ['$location', 'crudService'];
	function registerService($location, crudService) {
		var vm = this;  // jshint ignore:line
		vm.crud = new crudService('user');

		return {
			register: register
		};

		function register(user) {
			return vm.crud.create(user)
				.then(registrationComplete);

			function registrationComplete(response) {
				if (response === "1") {
					$location.url("/login");
				}
				return 'Username taken.';
			}
		}
	}
})();