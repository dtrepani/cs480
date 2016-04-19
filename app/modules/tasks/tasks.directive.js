(function() {
	'use strict';

	angular
		.module('app')
		.directive('spTasks', tasksDirective);

	tasksDirective.$inject = ['$filter'];
	function tasksDirective($filter) {
		return {
			templateUrl: 'modules/tasks/tasks.html',
			controller: 'TasksController',
			controllerAs: 'vm',
			bindToController: true,
			scope: {
				tasks: '=',
				labels: '=',
				order: '=',
				days: '=withinDays'
			}
		};
	}
})();