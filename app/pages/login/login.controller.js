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

		/**
		* LoginService will redirect if there is no error. Thus, there's only a
		* need to return a promise if there's an error.
		*/
		function login() {
			vm.loading = true;
			loginService.login(vm.user)
				.then(function(response) {
					vm.loading = false;
					vm.error = response;
				});
		}
	}
})();