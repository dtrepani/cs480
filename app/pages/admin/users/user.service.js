(function() {
	'use strict';

	angular
		.module('app')
		.factory('userService', userService);

	userService.$inject = ['crudService'];
	function userService(crudService) {
		var vm = this;  // jshint ignore:line
		vm.user = new crudService('user');

		return {
			createUser: createUser,
			createOrUpdateUser: createOrUpdateUser,
			deleteUser: deleteUser,
			getUsers: getUsers,
			updateUser: updateUser
		};

		function createUser(user) {
			return vm.user.create(user).then(promiseComplete);
		}

		function createOrUpdateUser(user) {
			if (!user.id) {
				return createUser(user);
			}
			return updateUser(user.id, user);
		}

		function deleteUser(id) {
			return vm.user.remove(id).then(promiseComplete);
		}

		function getUsers() {
			return vm.user.getWhere('', {}).then(promiseComplete);
		}

		function updateUser(id, user) {
			return vm.user.update(id, user).then(promiseComplete);
		}

		function promiseComplete(response) {
			var res = response.data;
			if (res.success) {
				return res.data;
			}
			return res.title;
		}
	}
})();
