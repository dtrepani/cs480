(function() {
	'use strict';

	angular
		.module('app')
		.controller('ActivityController', ActivityController);

	ActivityController.$inject = ['isAuthenticated'];
	function ActivityController(isAuthenticated) {
		var vm = this;
	}
})();