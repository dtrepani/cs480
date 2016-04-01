(function() {
	'use strict';

	angular
		.module('app')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['$location', 'userService'];
	function RegisterController($location, userService) {
		var vm = this;
		vm.loading = false;
		vm.registerUser = registerUser;

		function registerUser() {
			vm.loading = true;

			userService.createUser(vm.user)
				.then(registerUserComplete);

			function registerUserComplete(success) {
				if (success) {
					$location.url("/login");
				} else {
					vm.loading = false;
				}
			}
		}
	}
})();