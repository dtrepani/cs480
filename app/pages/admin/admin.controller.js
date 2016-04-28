(function() {
	'use strict';

	angular
		.module('app')
		.controller('AdminController', AdminController);

	AdminController.$inject = ['isAdmin', 'users', 'userService', 'userModalService'];
	function AdminController(isAdmin, users, userService, userModalService) {
		var vm = this;
		vm.isAdmin = isAdmin;
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