(function() {
	'use strict';

	angular
		.module('app')
		.directive('spTasks', tasksDirective);

	function tasksDirective() {
		return {
			link: link,
			templateUrl: 'modules/tasks/tasks.html',
			controller: 'TasksController',
			controllerAs: 'vm',
			bindToController: true
		};

		function link(scope, element, attrs) {
		}
	}
})();