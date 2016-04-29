(function() {
	'use strict';

	angular
		.module('app')
		.factory('subtasksService', subtasksService);

	subtasksService.$inject = ['$http', '$log'];
	function subtasksService($http, $log) {
		return {
			createOrUpdateSubtask: createOrUpdateSubtask,
			deleteSubtask: deleteSubtask,
			toggleCompleted: toggleCompleted
		};

		function createOrUpdateSubtask(subtask, task) {
			if (!task.subtasks) {
				task.subtasks = {
					currentId: 1,
					list: []
				};
			}

			if (subtask.id === undefined) {
				subtask.id = task.subtasks.currentId++;
				subtask.completed = false;
				task.subtasks.list.push(subtask);
			}
		}

		function deleteSubtask(subtask, task) {
			task.subtasks.list.splice(task.subtasks.list.indexOf(subtask), 1);
		}

		function toggleCompleted(subtask) {
			subtask.completed = !subtask.completed;
		}
	}
})();
