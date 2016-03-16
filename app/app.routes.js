(function() {
	'use strict';

	angular
		.module('app', ['ngRoute'])
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {
		$routeProvider
			.when('/login', {
				templateUrl: 'login/login.html',
				controller: 'LoginController',
				controllerAs: 'vm'
			})
			.when('/logout', {
				templateUrl: 'logout/logout.html',
				controller: 'LogoutController',
				controllerAs: 'vm'
			})
			.when('/register', {
				templateUrl: 'register/register.html',
				controller: 'RegisterController',
				controllerAs: 'vm'
			})
			.when('/dashboard', {
				templateUrl: 'dashboard/dashboard.html',
				controller: 'DashboardController',
				controllerAs: 'vm'
			})
			.otherwise({
				redirectTo: '/dashboard'
			});
	}
})();