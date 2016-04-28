(function() {
	'use strict';

	angular
		.module('app')
		.controller('AdminController', AdminController);

	AdminController.$inject = ['users', 'userService', 'userModalService'];
	function AdminController(users, userService, userModalService) {
		var vm = this;
		vm.users = users;
		vm.showUserModal = showUserModal;

		activate();

		function activate() {
		}

		function getUsers() {
			userService.getUsers().then(function(response) { vm.users = response; });
		}

		function showUserModal(user) {
			userModalService.openUserModal(user)
				.then(function(response) { if (response) vm.users = response; });
		}
	}
})();