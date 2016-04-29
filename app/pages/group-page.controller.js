(function() {
	'use strict';

	angular
		.module('app')
		.controller('GroupPageController', GroupPageController);

	GroupPageController.$inject = ['$stateParams'];
	function GroupPageController($stateParams) {
		this.groupId = $stateParams.groupId;
	}
})();