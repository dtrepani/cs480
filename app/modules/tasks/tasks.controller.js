(function() {
	'use strict';

	angular
		.module('app')
		.controller('TasksController', TasksController);

	TasksController.$inject = ['tasksService'];
	function TasksController(tasksService) {
		var vm = this;
	}
})();