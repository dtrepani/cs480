(function() {
	'use strict';

	angular
		.module('app')
		.controller('ModalController', ModalController);

	ModalController.$inject = ['$uibModalInstance', 'groups', 'item'];
	function ModalController($uibModalInstance, groups, item) {
		var vm = this;
		vm.groups = groups;
		vm.item = item;

		vm.cancel = cancel;
		vm.close = close;
		vm.confirm = confirm;
		vm.remove = remove;

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		function close() {
			$uibModalInstance.close();
		}

		function confirm(data) {
			$uibModalInstance.close(data);
		}

		function remove(data) {
			$uibModalInstance.dismiss(data);
		}
	}
})();