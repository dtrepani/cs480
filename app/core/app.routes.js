(function() {
	'use strict';

	angular
		.module('app')
		.config(appConfig);

	appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function appConfig($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('root', {
				url: '',
				templateUrl: 'index.html',
				abstract: true,
				resolve: {
					cache: ['cacheService', cacheAll],
					user: ['headerService', getUser]
				},
				views: {
					'header': {
						templateUrl: 'pages/layout/header/header.html',
						controller: 'HeaderController',
						controllerAs: 'hc'
					},
					'sidebar': {
						templateUrl: 'pages/layout/sidebar/sidebar.html',
						controller: 'SidebarController',
						controllerAs: 'sc'
					}
				}
			})
			.state('login', {
				url: '/login',
				parent: 'root',
				views: {
					'content@': {
						templateUrl: 'modules/login/login.html',
						controller: 'LoginController',
						controllerAs: 'vm'
					}
				}
			})
			.state('logout', {
				url: '/logout',
				parent: 'root',
				views: {
					'content@': {
						templateUrl: 'modules/logout/logout.html',
						controller: 'LogoutController',
						controllerAs: 'vm'
					}
				}
			})
			.state('register', {
				url: '/register',
				parent: 'root',
				views: {
					'content@': {
						templateUrl: 'pages/register/register.html',
						controller: 'RegisterController',
						controllerAs: 'vm'
					}
				}
			})
			.state('dashboard', {
				url: '/dashboard',
				parent: 'root',
				views: {
					'content@': {
						templateUrl: 'pages/dashboard/dashboard.html',
						controller: 'DashboardController',
						controllerAs: 'vm',
						resolve: {
							isAuthenticated: ['accessService', isAuthenticated]
						}
					}
				}
			})
			.state('labels', {
				url: '/labels',
				parent: 'root'
			})
			.state('labels.label', {
				url: '/:labelId',
				views: {
					'content@': {
						template: "In progress"
					}
				}
			})
			.state('inbox', {
				url: '/inbox',
				parent: 'root',
				views: {
					'content@': {
						templateUrl: 'pages/tasks/inbox.html',
						controller: 'ActivityController',
						controllerAs: 'vm',
						resolve: {
							isAuthenticated: ['accessService', isAuthenticated],
							items: ['tasksService', getTasks],
							groups: ['labelService', getLabels]
						}
					}
				}
			})
			.state('today', {
				url: '/today',
				parent: 'root',
				views: {
					'content@': {
						templateUrl: 'pages/tasks/today.html',
						controller: 'ActivityController',
						controllerAs: 'vm',
						resolve: {
							isAuthenticated: ['accessService', isAuthenticated],
							items: ['tasksService', getTasks],
							groups: ['labelService', getLabels]
						}
					}
				}
			})
			.state('week', {
				url: '/week',
				parent: 'root',
				views: {
					'content@': {
						templateUrl: 'pages/tasks/week.html',
						controller: 'ActivityController',
						controllerAs: 'vm',
						resolve: {
							isAuthenticated: ['accessService', isAuthenticated],
							items: ['tasksService', getTasks],
							groups: ['labelService', getLabels]
						}
					}
				}
			})
			.state('calendar', {
				url: '/calendar',
				parent: 'root',
				views: {
					'content@': {
						templateUrl: 'pages/calendar/calendar.html',
						controller: 'ActivityController',
						controllerAs: 'vm',
						resolve: {
							isAuthenticated: ['accessService', isAuthenticated],
							items: ['eventsService', getEvents],
							groups: ['calendarService', getCalendars]
						}
					}
				}
			});

		$urlRouterProvider.otherwise('/dashboard');

		function cacheAll(cacheService) {
			return cacheService.cacheAll();
		}

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

		function getUser(headerService) {
			return headerService.getUser();
		}

		function isAuthenticated(accessService) {
			return accessService.isAuthenticated();
		}
	}
})();