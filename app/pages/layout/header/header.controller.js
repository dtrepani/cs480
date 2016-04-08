(function() {
	'use strict';

	angular
		.module('app')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$scope', '$log', 'headerService'];
	function HeaderController($scope, $log, headerService) {
		var vm = this;
		vm.name = '';
		vm.url = '';

		headerService.getUser()
			.then(getUserComplete)
			.catch(getUserFailed);

		function getUserComplete(response) {
			$scope.$evalAsync(function() {
				vm.name = (response.name === false) ? 'Login' : response.name;
				vm.url = response.url;
			});
		}

		function getUserFailed(error) {
			$log.error(error);
		}
	}
})();