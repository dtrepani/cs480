(function() {
	'use strict';

	angular
		.module('app')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$rootScope', 'userInfo', 'headerService'];
	function HeaderController($rootScope, userInfo, headerService) {
		var vm = this;
		vm.user = userInfo.user;
		console.log(vm.user);
		vm.url = userInfo.url;

		activate();

		function activate() {
			$rootScope.$on('updateUser', updateUser);
		}

		function updateUser() {
			headerService.getUser().then(function(response) {
				vm.user = response.user;
				vm.url = response.url;
			});
		}
	}
})();