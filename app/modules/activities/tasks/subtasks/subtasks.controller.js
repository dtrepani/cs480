(function() {
	'use strict';

	angular
		.module('app')
		.controller('SubtasksController', SubtasksController);

	SubtasksController.$inject = ['subtasksService', 'subtaskModalService'];
	function SubtasksController(subtasksService, subtaskModalService) {
		var st = this;
		st.showSubtaskModal = showSubtaskModal;
		st.toggleCompleted = toggleCompleted;

		function showSubtaskModal(subtask) {
			subtaskModalService.openSubtaskModal(subtask, st.task);
		}

		function toggleCompleted(subtask) {
			subtasksService.toggleCompleted(subtask);
		}

		function updateSubtasks(response) {
			if (response) {
				st.subtasks = response;
			}
		}
	}
})();