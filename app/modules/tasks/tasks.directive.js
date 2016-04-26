(function() {
	'use strict';

	angular
		.module('app')
		.directive('spTasks', tasksDirective);

	function tasksDirective() {
		return {
			templateUrl: 'modules/tasks/tasks.html',
			controller: 'TasksController',
			controllerAs: 'vm',
			bindToController: true,
			scope: {
				order: '=',
				days: '=withinDays',
				inLabels: '=inGroups'
			}
		};
	}
})();