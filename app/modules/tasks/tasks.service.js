(function() {
	'use strict';

	angular
		.module('app')
		.factory('tasksService', tasksService);

	tasksService.$inject = ['$http', '$log', '$uibModal', 'crudService', 'sessionService'];
	function tasksService($http, $log, $uibModal, crudService, sessionService) {
		var vm = this;  // jshint ignore:line
		vm.task = new crudService('task');

		return {
			createOrUpdateTask: createOrUpdateTask,
			deleteTask: deleteTask,
			getTasks: getTasks,
			openTaskModal: openTaskModal
		};

		function createOrUpdateTask(task) {
			if (!task.task_id) {
				return vm.task.create(task).then(promiseComplete);
			}
			return vm.task.update(task.task_id, task).then(promiseComplete);
		}

		function deleteTask(task) {
			return vm.task.remove(task.task_id).then(promiseComplete);
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

		function openTaskModal(task) {
			if (angular.isString(task.due)) {
				task.due = new Date(task.due.replace(/(.+) (.+)/, "$1T$2Z"));
			}
			if (angular.isString(task.reminder)) {
				task.reminder = new Date(task.reminder.replace(/(.+) (.+)/, "$1T$2Z"));
			}

			return $uibModal.open({
				controller: 'ModalController',
				controllerAs: 'vm',
				templateUrl: 'modules/tasks/modal/task.modal.html',
				resolve: {
					item: task
				}
			}).result
				.then(function(response) {
					return createOrUpdateTask(response).then(getTasks);
				}, function(response) {
					if (response.task_id) {
						return deleteTask(response).then(getTasks);
					}
				});
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
