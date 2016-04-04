(function() {
	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$routeProvider'];
	function config($routeProvider) {
		$routeProvider
			.when('/login', {
				templateUrl: 'pages/login/login.html',
				controller: 'LoginController',
				controllerAs: 'vm'
			})
			.when('/logout', {
				templateUrl: 'pages/logout/logout.html',
				controller: 'LogoutController',
				controllerAs: 'vm'
			})
			.when('/register', {
				templateUrl: 'pages/register/register.html',
				controller: 'RegisterController',
				controllerAs: 'vm'
			})
			.when('/dashboard', {
				templateUrl: 'pages/dashboard/dashboard.html',
				controller: 'DashboardController',
				controllerAs: 'vm'
			})
			.otherwise({
				redirectTo: '/dashboard'
			});
	}
})();