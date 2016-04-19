(function() {
	'use strict';

	/**
	* To be used in conjunction with autofocus attribute to auto-focus
	* modal inputs.
	*/

	angular
		.module('app')
		.directive('spAutoFocus', autoFocusDirective);

	function autoFocusDirective() {
		return {
			restrict: 'A',
			link: link
		};

		function link(scope, element, attrs, ngModel) {
			element[0].focus();
		}
	}
})();