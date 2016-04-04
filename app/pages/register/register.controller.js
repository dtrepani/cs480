(function() {
	'use strict';

	angular
		.module('app')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['registerService'];
	function RegisterController(registerService) {
		var vm = this;
		vm.loading = false;
		vm.error = '';

		vm.register = register;

		function register() {
			vm.loading = true;
			registerService.register(vm.user)
				.then(registrationComplete);

			function registrationComplete(response) {
				vm.loading = false;
				vm.error = response;
			}
		}
	}
})();