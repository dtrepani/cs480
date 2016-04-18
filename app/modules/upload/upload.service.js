(function() {
	'use strict';

	angular
		.module('app')
		.factory('uploadService', uploadService);

	uploadService.$inject = ['$http', '$log'];
	function uploadService($http, $log) {
		return {
			uploadFile: uploadFile
		};

		function uploadFile(file) {
			var formData = new FormData();
			formData.append('file', file);

			return $http.post('api/upload/uploadManager.php', formData, {
				transformRequest: angular.identity,
				headers: { 'Content-Type': undefined }
			})
				.then(function(res) {
					if (res.data.success) {
						return res.data.data;
					}
					$log.error(res.title);
					return '';
				})
				.catch(function(res) {
					$log.error(res);
				});
		}
	}
})();