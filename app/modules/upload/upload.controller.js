(function() {
	'use strict';

	angular
		.module('app')
		.controller('UploadController', UploadController);

	UploadController.$inject = ['$scope', '$http', 'uploadService'];
	function UploadController($scope, $http, uploadService) {
		var uc = this;
		uc.uploadFile = uploadFile;

		function uploadFile(file, oldFile) {
			return uploadService.uploadFile(file)
				.then(function(filePath) { return filePath; });
		}
	}
})();