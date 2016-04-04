(function() {
	'use strict';

	angular
		.module('app')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['loginService'];
	function LoginController(loginService) {
		var vm = this;
		vm.loading = false;
		vm.error = '';

		vm.login = login;

		function login() {
			vm.loading = true;
			loginService.login(vm.user)
				.then(loginComplete);

			function loginComplete(response) {
				vm.loading = false;
				vm.error = response;
			}
		}
	}
})();