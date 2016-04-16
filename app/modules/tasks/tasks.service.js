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
			createTask: createTask,
			createOrUpdateTask: createOrUpdateTask,
			deleteTask: deleteTask,
			getTasks: getTasks,
			toggleCompleted: toggleCompleted,
			updateTask: updateTask
		};

		function createTask(task) {
			return vm.task.create(task).then(promiseComplete);
		}

		function createOrUpdateTask(task) {
			if (!task.task_id) {
				return createTask(task);
			}
			return updateTask(task.task_id, task);
		}

		function deleteTask(id) {
			return vm.task.remove(id).then(promiseComplete);
		}

		function getTasks() {
			return sessionService.getVar('id')
				.then(getTaskWithUserID);

			function getTaskWithUserID(response) {
				var res = response.data;
				if (res.success) {
					return vm.task.getWhere('', res.data).then(promiseComplete);
				}
				return res.title;
			}
		}

		function toggleCompleted(task) {
			task.completed = !parseInt(task.completed);
			return updateTask(task.task_id, task).then(getTasks);
		}

		function updateTask(id, task) {
			return vm.task.update(id, task).then(promiseComplete);
		}

		function promiseComplete(response) {
			var res = response.data;
			if (res.success) {
				return res.data;
			}
			return res.title;
		}
	}
})();
