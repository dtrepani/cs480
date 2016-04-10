(function() {
	'use strict';

	angular
		.module('app')
		.config(appConfig);

	appConfig.$inject = ['$routeProvider'];
	function appConfig($routeProvider) {
		$routeProvider
			.when('/login', {
				templateUrl: 'modules/login/login.html',
				controller: 'LoginController',
				controllerAs: 'vm',
			})
			.when('/logout', {
				templateUrl: 'modules/logout/logout.html',
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
				controllerAs: 'vm',
				resolve: {
					isAuthenticated: ['accessService', isAuthenticated]
				}
			})
			.when('/admin', {
				templateUrl: 'pages/admin/admin.html',
				controller: 'AdminController',
				controllerAs: 'vm',
				resolve: {
					isAdmin: ['accessService', isAdmin]
				}
			})
			.otherwise({
				redirectTo: '/login'
			});

		function isAuthenticated(accessService) {
			return accessService.isAuthenticated();
		}

		function isAdmin(accessService) {
			return accessService.isAdmin();
		}
	}
})();