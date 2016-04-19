(function() {
	'use strict';

	angular
		.module('app')
		.directive('spSidebar', sidebarDirective);

	function sidebarDirective() {
		return {
			templateUrl: 'pages/layout/sidebar/sidebar.html',
			controller: 'SidebarController',
			controllerAs: 'vm',
			bindToController: true,
			link: link
		};

		function link(scope, element, attrs) {
			// scope.$watch(attrs.sidebarDirective, toggleSidebar);

			// function toggleSidebar(collapsed) {
			// 	if (collapsed) {
			// 		element.removeClass('collapsed');
			// 	} else {
			// 		element.addClass('collapsed');
			// 	}
			// }

			scope.vm.collapse = true;
		}
	}
})();