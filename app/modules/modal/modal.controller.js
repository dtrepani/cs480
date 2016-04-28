(function() {
	'use strict';

	angular
		.module('app')
		.controller('ModalController', ModalController);

	ModalController.$inject = ['$uibModalInstance', 'groups', 'item', 'eventModalService'];
	function ModalController($uibModalInstance, groups, item, eventModalService) {
		var vm = this;
		vm.groups = groups;
		vm.item = item;

		vm.cancel = cancel;
		vm.close = close;
		vm.confirm = confirm;
		vm.remove = remove;
		vm.toggleAllDay = toggleAllDay;

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

		function toggleAllDay(event) {
			eventModalService.toggleAllDay(event);
		}
	}
})();