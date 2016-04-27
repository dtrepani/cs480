(function() {
	'use strict';

	angular
		.module('app')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$rootScope', 'user', 'headerService'];
	function HeaderController($rootScope, user, headerService) {
		var vm = this;
		vm.user = user;

		activate();

		function activate() {
			$rootScope.$on('updateUser', updateUser);
		}

		function updateUser() {
			headerService.getUser().then(function(response) {
				vm.user = response;
			});
		}
	}
})();