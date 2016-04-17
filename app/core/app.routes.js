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
					isAuthenticated: ['accessService', isAuthenticated],
					tasks: ['tasksService', getTasks],
					events: ['eventsService', getEvents],
					labels: ['labelService', getLabels],
					calendars: ['calendarService', getCalendars]
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

		function getCalendars(calendarService) {
			return calendarService.getCalendars();
		}

		function getEvents(eventsService) {
			return eventsService.getEvents();
		}

		function getLabels(labelService) {
			return labelService.getLabels();
		}

		function getTasks(tasksService) {
			return tasksService.getTasks();
		}

		function isAuthenticated(accessService) {
			return accessService.isAuthenticated();
		}

		function isAdmin(accessService) {
			return accessService.isAdmin();
		}
	}
})();