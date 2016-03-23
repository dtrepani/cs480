(function() {
	'use strict';

	angular
		.module('app')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['registerService'];
	function RegisterController(registerService) {
		var vm = this;

		vm.registerUser = registerUser;

		function registerUser() {
			registerService.registerUser(vm.user);
		}
	}
})();