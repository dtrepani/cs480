(function() {
	'use strict';

	angular
		.module('app')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$scope', 'headerService'];
	function HeaderController($scope, headerService) {
		var vm = this;
		vm.name = '';
		vm.url = '';

		headerService.getUser()
			.then(getUserComplete);

		function getUserComplete(response) {
			$scope.$evalAsync(function() {
				vm.name = (response.name === false) ? 'Login' : response.name;
				vm.url = response.url;
			});
		}
	}
})();