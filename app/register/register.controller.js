(function() {
	'use strict';

	angular
		.module('app')
		.controller('RegisterController', RegisterController);

	function RegisterController() {
		var vm = this;

		vm.register = register;

		function register() {
		}
	}
})();