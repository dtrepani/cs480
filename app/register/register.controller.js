(function() {
	'use strict';

	angular
		.module('app')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['registerService'];
	function RegisterController(registerService) {
		var vm = this;

		vm.register = register;

		function register() {
			registerService.register(vm.user);
		}
	}
})();