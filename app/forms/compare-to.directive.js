(function() {
	'use strict';

	/**
	* Compare an input field to another field, determined by the dev.
	*/

	angular
		.module('app')
		.directive('spCompareTo', compareTo);

	function compareTo() {
		return {
			require: 'ngModel',
			scope: {
				otherModel: '=spCompareTo'
			},
			link: link
		};

		function link(scope, element, attrs, ngModel) {
			ngModel.$validators.spCompareTo = compareValues;

			scope.$watchCollection('otherModel', validateOnChange);

			function compareValues(viewValue) {
				return (viewValue === scope.otherModel.$viewValue);
			}

			function validateOnChange() {
				ngModel.$validate();
			}
		}
	}
})();