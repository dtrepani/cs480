(function() {
	'use strict';

	angular
		.module('app')
		.controller('LabelPageController', LabelPageController);

	LabelPageController.$inject = ['$stateParams'];
	function LabelPageController($stateParams) {
		this.labelId = $stateParams.labelId;
	}
})();