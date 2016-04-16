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
		vm.close = close;
		vm.cancel = cancel;
		vm.confirm = confirm;
		vm.remove = remove;

		function close() {
			$uibModalInstance.close();
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		function remove(data) {
			$uibModalInstance.dismiss(data);
		}

		function confirm(data) {
			$uibModalInstance.close(data);
		}
	}
})();