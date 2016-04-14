(function() {
	'use strict';

	angular
		.module('app')
		.factory('tasksService', tasksService);

	tasksService.$inject = ['$http', '$log', 'crudService', 'sessionService'];
	function tasksService($http, $log, crudService, sessionService) {
		var vm = this;  // jshint ignore:line
		vm.task = new crudService('task');

		return {
			getTasks: getTasks
		};

		function getTasks() {
			return sessionService.getVar('id')
				.then(getTaskWithUserID);

			function getTaskWithUserID(response) {
				var res = response.data;
				if (res.success) {
					return vm.task.getWhere('', res.data).then(getWhereComplete);
				}
				return res.title;
			}

			function getWhereComplete(response) {
				var res = response.data;
				if (res.success) {
					return res.data;
				}
				return res.title;
			}
		}
	}
})();
