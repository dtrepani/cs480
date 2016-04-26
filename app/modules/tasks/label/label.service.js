(function() {
	'use strict';

	angular
		.module('app')
		.factory('labelService', labelService);

	labelService.$inject = ['crudService', 'cacheService'];
	function labelService(crudService, cacheService) {
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
			return cacheService.getLabels();
		}

		function updateLabel(id, label) {
			return vm.label.update(id, label).then(promiseComplete);
		}

		function promiseComplete(response) {
			var res = response.data;
			if (res.success) {
				cacheService.cacheLabels();
				return res.data;
			}
			return res.title;
		}
	}
})();
