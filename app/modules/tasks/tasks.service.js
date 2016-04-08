(function() {
	'use strict';

	angular
		.module('app')
		.factory('tasksService', tasksService);

	tasksService.$inject = ['$http', '$log'];
	function tasksService($http, $log) {
		var vm = this;  // jshint ignore:line

		return {
		};

	}
})();
