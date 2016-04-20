(function() {
	'use strict';

	angular
		.module('app')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['user'];
	function HeaderController(user) {
		this.user = user;
	}
})();