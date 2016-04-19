(function() {
	'use strict';

	angular
		.module('app')
		.directive('spSubtasks', subtasksDirective);

	function subtasksDirective() {
		return {
			templateUrl: 'modules/tasks/subtasks/subtasks.html',
			controller: 'SubtasksController',
			controllerAs: 'st',
			bindToController: true,
			scope: {
				task: '='
			}
		};
	}
})();