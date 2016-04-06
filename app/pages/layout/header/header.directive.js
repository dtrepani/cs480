(function() {
	'use strict';

	angular
		.module('app')
		.directive('spHeader', headerDirective);

	function headerDirective() {
		return {
			link: link,
			templateUrl: 'pages/layout/header/header.html',
			controller: 'HeaderController',
			controllerAs: 'vm',
			bindToController: true
		};

		function link(scope, element, attrs) {
		}
	}
})();