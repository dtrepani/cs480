(function() {
	'use strict';

	angular
		.module('app')
		.directive('spFileChange', spFileChange);

	spFileChange.$inject = ['$parse'];
	function spFileChange($parse) {
		return {
			restrict: 'A',
			controller: 'UploadController',
			controllerAs: 'uc',
			link: link,
			scope: {
				spFileChange: '=',
			}
		};

		function link(scope, element, attrs) {
			var maxFileSize = 2 * 1024 * 1024;
			var fileModel = $parse(attrs.spFileChange);
			element[0].addEventListener('change', fileHandler, false);

			function fileHandler(event) {
				scope.$apply(function() {
					var file = element[0].files[0];

					if (file.size <= maxFileSize) {
						scope.uc.uploadFile(file)
							.then(function(filePath) { scope.spFileChange = filePath; });
					} else {
						alert("File must be less than " + (maxFileSize / 1024 / 1024) + "MB.");// jshint ignore:line
					}
				});
			}
		}
	}
})();