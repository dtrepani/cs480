(function() {
	'use strict';

	angular
		.module('app', ['ui.router', 'ui.bootstrap', 'angularMoment'])
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
						templateUrl: 'pages/login/login.html',
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
						templateUrl: "pages/tasks/label.html",
						controller: 'LabelPageController',
						controllerAs: 'vm'
					}
				}
			})
			.state('inbox', {
				url: '/inbox',
				parent: 'root',
				views: {
					'content@': {
						templateUrl: 'pages/tasks/inbox.html',
						resolve: {
							isAuthenticated: ['accessService', isAuthenticated]
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
						resolve: {
							isAuthenticated: ['accessService', isAuthenticated]
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
						resolve: {
							isAuthenticated: ['accessService', isAuthenticated]
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
						resolve: {
							isAuthenticated: ['accessService', isAuthenticated]
						}
					}
				}
			});

		$urlRouterProvider.otherwise('/dashboard');

		function cacheAll(cacheService) {
			return cacheService.cacheAll();
		}

		function getUser(headerService) {
			return headerService.getUser();
		}

		function isAuthenticated(accessService) {
			return accessService.isAuthenticated();
		}
	}
})();