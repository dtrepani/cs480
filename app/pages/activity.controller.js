(function() {
	'use strict';

	angular
		.module('app')
		.controller('ActivityController', ActivityController);

	ActivityController.$inject = ['isAuthenticated', 'items', 'groups'];
	function ActivityController(isAuthenticated, items, groups) {
		var vm = this;
		vm.items = items;
		vm.groups = groups;
	}
})();