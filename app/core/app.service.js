(function() {
	'use strict';

	angular
		.module('app')
		.factory('appService', appService);

	appService.$inject = ['$rootScope', '$state', 'statusService'];
	function appService($rootScope, $state, statusService) {
		return {
			init: init
		};

		function init() {
			$rootScope.$on('$stateChangeError', stateChangeError);
		}

		function stateChangeError(event, toState, toParams, fromState, fromParams, error) {
			if (error === statusService.UNAUTHORIZED) {
				event.preventDefault();
				$state.go('login');
			}
		}
	}
})();
