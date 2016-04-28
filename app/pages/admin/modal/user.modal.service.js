(function() {
	'use strict';

	angular
		.module('app')
		.factory('userModalService', userModalService);

	userModalService.$inject = ['$uibModal', 'userService'];
	function userModalService($uibModal, userService) {
		return {
			openUserModal: openUserModal
		};

		/**
		* Without cloning the user, any changes made in the modal will be reflected
		* in the main window regardless of if the changes were saved or not, which
		* means a user would not be able to cancel their changes unless they refresh.
		*/
		function openUserModal(user) {
			var clonedUser = {};
			angular.extend(clonedUser, user);

			return $uibModal.open({
				controller: 'ModalController',
				controllerAs: 'vm',
				templateUrl: 'pages/admin/modal/user.modal.html',
				resolve: {
					groups: {},
					item: clonedUser
				}
			}).result
				.then(function(response) {
					return userService.createOrUpdateUser(response)
						.then(userService.getUsers);
				}, function(response) {
					if (Number(response)) {
						return userService.deleteUser(response)
							.then(userService.getUsers);
					}
				});
		}
	}
})();
