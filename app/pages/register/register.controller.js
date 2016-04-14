(function() {
	'use strict';

	angular
		.module('app')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['registerService'];
	function RegisterController(registerService) {
		var vm = this;
		vm.error = '';
		vm.loading = false;
		vm.register = register;

		function register() {
			vm.loading = true;
			registerService.register(vm.user)
				.then(function(response) {
					vm.loading = false;
					vm.error = response;
				});
		}
	}
})();