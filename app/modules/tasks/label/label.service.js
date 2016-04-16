(function() {
	'use strict';

	angular
		.module('app')
		.factory('labelService', labelService);

	labelService.$inject = ['$http', '$log', 'crudService', 'sessionService'];
	function labelService($http, $log, crudService, sessionService) {
		var vm = this;  // jshint ignore:line
		vm.label = new crudService('label');

		return {
			createLabel: createLabel,
			deleteLabel: deleteLabel,
			getLabels: getLabels,
			updateLabel: updateLabel
		};

		function createLabel(label) {
			return vm.label.create(label).then(promiseComplete);
		}

		function deleteLabel(id) {
			return vm.label.remove(id).then(promiseComplete);
		}

		function getLabels() {
			return sessionService.getVar('id')
				.then(getLabelWithUserID);

			function getLabelWithUserID(response) {
				var res = response.data;
				if (res.success) {
					return vm.label.getWhere('person_id=' + res.data, '').then(promiseComplete);
				}
				return res.title;
			}
		}

		function updateLabel(id, label) {
			return vm.label.update(id, label).then(promiseComplete);
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
