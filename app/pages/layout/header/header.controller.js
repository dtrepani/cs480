(function() {
	'use strict';

	angular
		.module('app')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = [ 'headerService' ];
	function HeaderController(headerService) {
		var vm = this;
		vm.name = '';
		vm.url = '';

		headerService.getUser()
			.then(getUserComplete);

		function getUserComplete(response) {
			vm.name = (response.name === false) ? 'Login' : response.name;
			vm.url = response.url;
		}
	}
})();