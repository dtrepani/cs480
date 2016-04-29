(function() {
	'use strict';

	angular
		.module('app')
		.factory('labelUserService', labelUserService);

	labelUserService.$inject = ['crudService'];
	function labelUserService(crudService) {
		var vm = this;  // jshint ignore:line
		vm.labelUser = new crudService('labelUser');

		return {
			createLabelUser: createLabelUser,
			createOrUpdateLabelUser: createOrUpdateLabelUser,
			deleteLabelUser: deleteLabelUser,
			getSharedLabels: getSharedLabels,
			getSharedUsersForLabel: getSharedUsersForLabel,
			getEventsForLabel: getEventsForLabel,
			updateLabelUser: updateLabelUser
		};

		function createLabelUser(labelUser) {
			return vm.labelUser.create(labelUser).then(promiseComplete);
		}

		function createOrUpdateLabelUser(labelUser) {
			if (!labelUser.labelUser_id) {
				return createLabelUser(labelUser);
			}
			return updateLabelUser(labelUser.labelUser_id, labelUser);
		}

		function deleteLabelUser(id) {
			return vm.labelUser.remove(id).then(promiseComplete);
		}

		// TODO: fix this filthy override done for the sake of time.
		function getSharedLabels() {
			return vm.labelUser.getWhere('groups', {}).then(promiseComplete);
		}

		function getSharedUsersForLabel() {
			return vm.labelUser.getWhere('users', {}).then(promiseComplete);
		}

		function getEventsForLabel() {
			return vm.labelUser.getWhere('activities', {}).then(promiseComplete);
		}

		function updateLabelUser(id, labelUser) {
			return vm.labelUser.update(id, labelUser).then(promiseComplete);
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
