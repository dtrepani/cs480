(function() {
	'use strict';

	/**
	* Used to access session variables.
	*/

	angular
		.module('app')
		.factory('sessionService', sessionService);

	sessionService.$inject = ['$http', '$log'];
	function sessionService($http, $log) {
		var vm = this;  // jshint ignore:line
		vm.base = 'api/session/sessionVarManager.php?var=';

		return {
			getVar: getVar,
			setVar: setVar
		};

		/**
		* @param  {string} $name Variable name to get from session.
		* @return {string} 		 Variable value or false on failure.
		*/
		function getVar($name) {
			return $http.get(vm.base + $name)
				.then(promiseComplete)
				.catch(promiseFailed);
		}

		/**
		* @param {string} $name Variable name to get from session.
		* @return {bool} 		True on success or false on failure.
		*/
		function setVar($name, $value) {
			return $http.post(vm.base + $name, $value)
				.then(promiseComplete)
				.catch(promiseFailed);
		}

		function promiseComplete(response) {
			return response;
		}

		function promiseFailed(error) {
			$log.error(error);
			return false;
		}
	}
})();
