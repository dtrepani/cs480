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
			.state('admin', {
				url: '/admin',
				parent: 'root',
				views: {
					'content@': {
						templateUrl: 'pages/admin/admin.html',
						controller: 'AdminController',
						controllerAs: 'vm',
						resolve: {
							isAuthenticated: ['accessService', isAuthenticated],
							isAdmin: ['accessService', isAdmin],
							users: ['userService', getUsers]
						}
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
			.state('calendars', {
				url: '/calendars',
				parent: 'root'
			})
				.state('calendars.calendar', {
					url: '/:groupId',
					views: {
						'content@': {
							templateUrl: "pages/calendar/calendar.html",
							controller: 'GroupPageController',
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
					url: '/:groupId',
					views: {
						'content@': {
							templateUrl: "pages/tasks/label.html",
							controller: 'GroupPageController',
							controllerAs: 'vm',
							resolve: {
								isAuthenticated: ['accessService', isAuthenticated]
							}
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

		function getSharedCalendars(calendarUserService) {
			return calendarUserService.getSharedCalendars();
		}

		function getSharedLabels(labelUserService) {
			return labelUserService.getSharedLabels();
		}

		function getUser(headerService) {
			return headerService.getUser();
		}

		function getUsers(userService) {
			return userService.getUsers();
		}

		function isAuthenticated(accessService) {
			return accessService.isAuthenticated();
		}

		function isAdmin(accessService) {
			return accessService.isAdmin();
		}
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.run(runBlock);

	runBlock.$inject = ['appService'];
	function runBlock(appService) {
		appService.init();
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.factory('appService', appService);

	appService.$inject = ['$rootScope', '$state', 'statusService'];
	function appService($rootScope, $state, statusService) {
		return {
			init: init
		};

		function init() {
			$rootScope.$on('$stateChangeError', stateChangeError);
		}

		function stateChangeError(event, toState, toParams, fromState, fromParams, error) {
			if (error === statusService.UNAUTHORIZED) {
				event.preventDefault();
				$state.go('login');
			} else if (toState.name === 'admin' && error === statusService.FORBIDDEN) {
				// event.preventDefault();
				// $state.go('dashboard');
			}
		}
	}
})();

(function() {
	'use strict';

	angular
		.module('app')
		.filter('inGroups', inGroups);

	inGroups.$inject = [];
	function inGroups() {
		return function(activities, groups) {
			if (!groups) {
				return activities;
			}

			var activitiesInGroups = [];

			for (var i = 0; i < activities.length; i++) {
				if (activities[i].label_id === groups ||
					activities[i].calendar_id === groups
				) {
					activitiesInGroups.push(activities[i]);
				}
			}

			return activitiesInGroups;
		};
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.filter('sameDayAs', sameDayAs);

	sameDayAs.$inject = ['moment'];
	function sameDayAs(moment) {
		return function(events, day) {
			var sameDayEvents = [];

			for (var i = 0; i < events.length; i++) {
				var result = day.isSame(moment(events[i].dt_start), 'day');

				if (!result) {
					result = day.isSame(moment(events[i].dt_end), 'day');
				}

				if(result) {
					sameDayEvents.push(events[i]);
				}
			}

			return sameDayEvents;
		};
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.filter('withinDays', withinDays);

	withinDays.$inject = ['moment'];
	function withinDays(moment) {
		return function(tasks, numOfDays) {
			if (!numOfDays) {
				return tasks;
			}

			var tasksWithinDays = [];

			for (var i = 0; i < tasks.length; i++) {
				var result;

				if (!tasks[i].due || (tasks[i].due &&
					moment(tasks[i].due).isBefore(moment().add(numOfDays, 'days')))
				) {
					tasksWithinDays.push(tasks[i]);
				}
			}

			return tasksWithinDays;
		};
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.controller('GroupPageController', GroupPageController);

	GroupPageController.$inject = ['$stateParams'];
	function GroupPageController($stateParams) {
		this.groupId = $stateParams.groupId;
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.service('cacheService', cacheService);

	cacheService.$inject = ['$rootScope', 'crudService'];
	function cacheService($rootScope, crudService) {
		var vm = this; // jshint ignore: line
		vm.calendars = [];
		vm.events = [];
		vm.labels = [];
		vm.tasks = [];

		return {
			cacheAll: cacheAll,
			cacheCalendars: cacheCalendars,
			cacheEvents: cacheEvents,
			cacheLabels: cacheLabels,
			cacheTasks: cacheTasks,
			clearCache: clearCache,

			getAll: getAll,
			getCalendars: getCalendars,
			getEvents: getEvents,
			getLabels: getLabels,
			getTasks: getTasks
		};

		// TODO: Ideally one API call.
		function cacheAll() {
			cacheCalendars();
			cacheEvents();
			cacheLabels();
			cacheTasks();
		}

		function cacheCalendars() {
			vm.calendar = new crudService('calendar');
			vm.calendar.getByUser()
				.then(function(response) {
					vm.calendars = getResult(response);
					updateCalendars();
				});
		}

		function cacheEvents() {
			vm.event = new crudService('event');
			vm.event.getByUser()
				.then(function(response) {
					vm.events = getResult(response);
					updateEvents();
				});
		}

		function cacheLabels() {
			vm.label = new crudService('label');
			vm.label.getByUser()
				.then(function(response) {
					vm.labels = getResult(response);
					updateLabels();
				});
		}

		function cacheTasks() {
			vm.task = new crudService('task');
			vm.task.getByUser()
				.then(function(response) {
					vm.tasks = getResult(response);
					updateTasks();
				});
		}

		function clearCache() {
			vm.calendars = [];
			vm.events = [];
			vm.labels = [];
			vm.tasks = [];

			updateCalendars();
			updateEvents();
			updateLabels();
			updateTasks();
		}

		function getResult(response) {
			var result = response.data;
			return result.success ? result.data : result.title;
		}

		function getAll() {
			return {
				calendars: getCalendars(),
				events: getEvents(),
				labels: getLabels(),
				tasks: getTasks()
			};
		}

		function getCalendars() {
			return vm.calendars;
		}

		function getEvents() {
			return vm.events;
		}

		function getLabels() {
			return vm.labels;
		}

		function getTasks() {
			return vm.tasks;
		}

		function updateCalendars() {
			$rootScope.$broadcast('updateCalendars');
		}

		function updateEvents() {
			$rootScope.$broadcast('updateEvents');
		}

		function updateLabels() {
			$rootScope.$broadcast('updateLabels');
		}

		function updateTasks() {
			$rootScope.$broadcast('updateTasks');
		}
	}
})();

(function() {
	'use strict';

	/**
	* Used to access the api of the various item types.
	* An instance of crud must be created in order to use the service.
	*
	* All promises return 'success' and either 'data' on success or, on error, 'title'
	* with a general error and 'details' with more details.
	*/

	angular
		.module('app')
		.factory('crudService', crudService);

	crudService.$inject = ['$http', '$log'];
	function crudService($http, $log) {
		var crud = init;
		crud.prototype = {
			get: get,
			getByUser: getByUser,
			getWhere: getWhere,
			create: create,
			update: update,
			remove: remove,
			removeWhere: removeWhere,
			removeUnecessaryKeys: removeUnecessaryKeys
		};

		return crud;

		/**
		* Initialize the base url using the type of item to be called on.
		* Activities and their parents have a specific subfolder to be pointed to,
		* while others do not.
		*
		* @param {string} type Type of item.
		*/
		function init(type) {
			/* jshint ignore:start */
			this.type = type;
			this.base = 'api/';
			switch (type) {
				case 'event':
				case 'calendar':
					this.base += 'activity/calendar/';
					break;
				case 'label':
				case 'task':
					this.base += 'activity/task/';
					break;
				case 'labelUser':
				case 'calendarUser':
					this.base += 'collab/';
					break;
				default:
					this.base += type + '/';
			}
			this.base += type + 'Manager.php';
			/* jshint ignore:end */
		}

		/**
		* @param	{string}	id		ID of item type to get.
		* @return	{string[]}			Promise with 'data' == query results on success.
		*/
		function get(id) {
			return $http.get(this.base, {params: { id: id }}) // jshint ignore:line
				.then(promiseComplete)
				.catch(promiseFailed);
		}
		/**
		* @return	{string[]}			Promise with 'data' == query results on success.
		*/
		function getByUser() {
			return $http.get(this.base, {params: {byUser: true}}) // jshint ignore:line
				.then(promiseComplete)
				.catch(promiseFailed);
		}

		function getWhere(where, bindings) {
			return $http.get(this.base, {params: { where: where, bindings: JSON.stringify(bindings) }}) // jshint ignore:line
				.then(promiseComplete)
				.catch(promiseFailed);
		}

		/**
		* @param	{mixed[]}	data	Data of item to create.
		* @return	{string[]}			Promise with 'data' === 1 on success.
		*/
		function create(data) {
			data = this.removeUnecessaryKeys(data);  // jshint ignore:line
			return $http.post(this.base, data) // jshint ignore:line
				.then(promiseComplete)
				.catch(promiseFailed);
		}

		/**
		* @param	{string}	id		ID of item type to update.
		* @param	{mixed[]}	data	Data of item to update.
		*
		* @return	{string[]}			Promise with 'data' === '1' on success.
		*/
		function update(id, data) {
			data = this.removeUnecessaryKeys(data);  // jshint ignore:line
			return $http.put(this.base, data, {params: { id: id }}) // jshint ignore:line
				.then(promiseComplete)
				.catch(promiseFailed);
		}

		/**
		* @param	{string}	id		ID of item type to delete.
		* @return	{string[]}			Promise with 'data' === 1 on success.
		*/
		function remove(id) {
			return $http.delete(this.base, {params: { id: id }}) // jshint ignore:line
				.then(promiseComplete)
				.catch(promiseFailed);
		}

		/**
		* @param 	{string}	where 	Where clause.
		* @return	{string[]}			Promise with 'data' >= 0 on success.
		*/
		function removeWhere(where) {
			return $http.delete(this.base + '?usewhere=true&where=' + escape(where)) // jshint ignore:line
				.then(promiseComplete)
				.catch(promiseFailed);
		}

		function promiseComplete(response) {
			return response;
		}

		function promiseFailed(error) {
			$log.error(error);
			return {
				success: 'false',
				title: 'Error when querying server.',
				message: error
			};
		}

		/**
		* Item data passed in may still have their ids or alias fields (for activities)
		* embedded, which will can cause errors in the SQL.
		*
		* @param	{mixed[]} data
		* @return	{mixed[]}
		*/
		function removeUnecessaryKeys(data) {
			var toDelete = ['id', 'person_id', this.type + '_id', 'activity_info_id', 'parent_name'];  // jshint ignore:line
			for (var i = 0; i < toDelete.length; i++) {
				delete data[toDelete[i]];
			}
			return data;
		}
	}
})();

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
		* @param	{string} $name	Variable name to get from session.
		* @return	{string} 		Promise or error on fail.
		*/
		function getVar($name) {
			return $http.get(vm.base + $name)
				.then(promiseComplete)
				.catch(promiseFailed);
		}

		/**
		* @param	{string} $name	Variable name to get from session.
		* @return	{string} 		Promise or error on fail.
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
			return {
				success: 'false',
				title: 'Error when accessing variable.',
				message: error
			};
		}
	}
})();

(function() {
	'use strict';

	/**
	* To be used in conjunction with autofocus attribute to auto-focus
	* modal inputs.
	*/

	angular
		.module('app')
		.directive('spAutoFocus', autoFocusDirective);

	function autoFocusDirective() {
		return {
			restrict: 'A',
			link: link
		};

		function link(scope, element, attrs, ngModel) {
			element[0].focus();
		}
	}
})();
(function() {
	'use strict';

	/**
	* Compare an input field to another field, determined by the dev.
	*/

	angular
		.module('app')
		.directive('spCompareTo', compareToDirective);

	function compareToDirective() {
		return {
			require: 'ngModel',
			scope: {
				otherModel: '=spCompareTo'
			},
			link: link
		};

		function link(scope, element, attrs, ngModel) {
			var unbindWatch = scope.$watch('otherModel', validateOnChange);
			ngModel.$validators.spCompareTo = compareValues;
			element.on('$destroy', cleanUp);

			function cleanUp() {
				unbindWatch();
			}

			function compareValues(viewValue) {
				return (viewValue === scope.otherModel.$viewValue);
			}

			function validateOnChange(newValue, oldValue) {
				ngModel.$validate();
			}
		}
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.controller('LogoutController', LogoutController);

	LogoutController.$inject = ['logoutService'];
	function LogoutController(logoutService) {
		activate();

		function activate() {
			logoutService.logout();
		}
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.factory('logoutService', logoutService);

	logoutService.$inject = ['$rootScope', '$http', '$state', '$log', 'cacheService'];
	function logoutService($rootScope, $http, $state, $log, cacheService) {
		return {
			logout: logout
		};

		function logout() {
			return $http.post('api/user/logoutManager.php')
				.then(logoutComplete)
				.catch(logoutFailed);

			function logoutComplete(response) {
				cacheService.clearCache();
				$rootScope.$broadcast('updateUser');
				$state.go('login');
			}

			function logoutFailed(error) {
				$log.error(error);
			}
		}
	}
})();

(function() {
	'use strict';

	/**
	* The formats of the task and event modals.
	* Display format is used for a user-friendly date.
	* Storage format is used to store into the database.
	*/

	angular
		.module('app')
		.factory('formatService', formatService);

	formatService.$inject = ['moment'];
	function formatService(moment) {
		return {
			formatForDisplay: formatForDisplay,
			formatForStorage: formatForStorage,
			getDisplayFormat: getDisplayFormat,
			toDisplayFormat: toDisplayFormat,
			toStorageFormat: toStorageFormat
		};

		function formatForDisplay(activity) {
			if (activity.hasOwnProperty('dt_start')) {
				activity.all_day = parseInt(activity.all_day);
				activity.dt_start = toDisplayFormat(moment(activity.dt_start));
				activity.dt_end = toDisplayFormat(moment(activity.dt_end));
			} else {
				if (activity.hasOwnProperty('due') && activity.due) {
					activity.due = toDisplayFormat(moment(activity.due));
				}

				if (activity.hasOwnProperty('reminder') && activity.reminder) {
					activity.reminder = toDisplayFormat(moment(activity.reminder));
				}
			}
		}

		function formatForStorage(activity) {
			var displayFormat = getDisplayFormat();
			if (activity.hasOwnProperty('dt_start')) {
				activity.dt_start = toStorageFormat(moment(activity.dt_start, displayFormat));
				activity.dt_end = toStorageFormat(moment(activity.dt_end, displayFormat));
			} else {
				if (activity.hasOwnProperty('due') && activity.due) {
					activity.due = toStorageFormat(moment(activity.due, displayFormat));
				}

				if (activity.hasOwnProperty('reminder') && activity.reminder) {
					activity.reminder = toStorageFormat(moment(activity.reminder, displayFormat));
				}
			}
			return activity;
		}

		function getDisplayFormat() {
			return 'hh:mm a MM-DD-YYYY';
		}

		/**
		* @param {moment Object} activity
		*/
		function toDisplayFormat(activity) {
			return activity.format(getDisplayFormat());
		}

		/**
		* @param {moment Object} activity
		*/
		function toStorageFormat(activity) {
			return activity.format('YYYY-MM-DD HH:mm:ss');
		}
	}
})();

(function() {
	'use strict';

	angular
		.module('app')
		.controller('ModalController', ModalController);

	ModalController.$inject = ['$uibModalInstance', 'groups', 'item', 'eventModalService'];
	function ModalController($uibModalInstance, groups, item, eventModalService) {
		var vm = this;
		vm.groups = groups;
		vm.item = item;

		vm.cancel = cancel;
		vm.close = close;
		vm.confirm = confirm;
		vm.remove = remove;
		vm.toggleAllDay = toggleAllDay;

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		function close() {
			$uibModalInstance.close();
		}

		function confirm(data) {
			$uibModalInstance.close(data);
		}

		function remove(data) {
			$uibModalInstance.dismiss(data);
		}

		function toggleAllDay(event) {
			eventModalService.toggleAllDay(event);
		}
	}
})();
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
(function() {
	'use strict';

	angular
		.module('app')
		.directive('spFileChange', uploadDirective);

	uploadDirective.$inject = ['$parse'];
	function uploadDirective($parse) {
		return {
			restrict: 'A',
			controller: 'UploadController',
			controllerAs: 'uc',
			link: link,
			scope: {
				spFileChange: '=',
			}
		};

		function link(scope, element, attrs) {
			var maxFileSize = 2 * 1024 * 1024;
			var fileModel = $parse(attrs.spFileChange);
			element[0].addEventListener('change', fileHandler, false);

			function fileHandler(event) {
				scope.$apply(function() {
					var file = element[0].files[0];

					if (file.size <= maxFileSize) {
						scope.uc.uploadFile(file)
							.then(function(filePath) { scope.spFileChange = filePath; });
					} else {
						alert("File must be less than " + (maxFileSize / 1024 / 1024) + "MB.");// jshint ignore:line
					}
				});
			}
		}
	}
})();
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
(function() {
	'use strict';

	angular
		.module('app')
		.controller('AdminController', AdminController);

	AdminController.$inject = ['isAdmin', 'users', 'userService', 'userModalService'];
	function AdminController(isAdmin, users, userService, userModalService) {
		var vm = this;
		vm.isAdmin = isAdmin;
		vm.users = users;
		vm.showUserModal = showUserModal;

		activate();

		function activate() {
		}

		function getUsers() {
			userService.getUsers().then(function(response) { vm.users = response; });
		}

		function showUserModal(user) {
			userModalService.openUserModal(user)
				.then(function(response) { if (response) vm.users = response; });
		}
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['loginService'];
	function LoginController(loginService) {
		var vm = this;
		vm.loading = false;
		vm.error = '';

		vm.login = login;

		/**
		* LoginService will redirect if there is no error. Thus, there's only a
		* need to return a promise if there's an error.
		*/
		function login() {
			vm.loading = true;
			loginService.login(vm.user)
				.then(function(response) {
					vm.loading = false;
					vm.error = response;
				});
		}
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.factory('loginService', loginService);

	loginService.$inject = ['$rootScope', '$http', '$state', '$log', 'cacheService'];
	function loginService($rootScope, $http, $state, $log, cacheService) {
		return {
			login: login
		};

		function login(user) {
			user.name = user.name.toLowerCase().trim();

			return $http.post('api/user/loginManager.php', user)
				.then(loginComplete)
				.catch(loginFailed);

			function loginComplete(response) {
				if (response.data.success === false) {
					return response.data.title;
				}

				cacheService.cacheAll();
				$rootScope.$broadcast('updateUser');
				$state.go('dashboard');
			}

			function loginFailed(error) {
				$log.error(error);
				return 'Something went wrong. Please try again.';
			}
		}
	}
})();

(function() {
	'use strict';

	angular
		.module('app')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['registerService'];
	function RegisterController(registerService) {
		var vm = this;
		vm.error = '';
		vm.loading = false;
		vm.register = register;

		function register() {
			vm.loading = true;
			registerService.register(vm.user)
				.then(function(response) {
					vm.loading = false;
					vm.error = response;
				});
		}
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.factory('registerService', registerService);

	registerService.$inject = ['$state', '$log', 'crudService'];
	function registerService($state, $log, crudService) {
		var vm = this;  // jshint ignore:line
		vm.crud = new crudService('user');

		return {
			register: register
		};

		function register(user) {
			user.name = user.name.toLowerCase().trim();

			return vm.crud.create(user)
				.then(registrationComplete);

			function registrationComplete(response) {
				var result = response.data;
				if (!result.success) {
					$log.error(result.title);
					return result.title;
				} else {
					$state.go('login');
				}
			}
		}
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.factory('accessService', accessService);

	accessService.$inject = ['$q', 'sessionService', 'statusService'];
	function accessService($q, sessionService, statusService) {
		var deferred = $q.defer();

		return {
			isAuthenticated: isAuthenticated,
			isAdmin: isAdmin
		};

		function isAuthenticated() {
			return sessionService.getVar('name')
				.then(isAuthenticatedComplete);

			function isAuthenticatedComplete(response) {
				if (response.data.success !== false) {
					deferred.resolve(statusService.OK);
				} else {
					deferred.reject(statusService.UNAUTHORIZED);
				}

				return deferred.promise;
			}
		}

		function isAdmin() {
			return sessionService.getVar('admin')
				.then(isAdminComplete);

			function isAdminComplete(response) {
				var result = response.data;
				if (result.success === false || result.data === '0') {
					deferred.reject(statusService.FORBIDDEN);
				} else {
					deferred.resolve(statusService.OK);
				}

				return deferred.promise;
			}
		}
	}
})();

(function() {
	'use strict';

	/**
	* Status codes used when accessing various pages in the app.
	*/

	angular
		.module('app')
		.service('statusService', statusService);

	function statusService() {
		return {
			OK: 200,
			UNAUTHORIZED: 401,
			FORBIDDEN: 403
		};
	}
})();

(function() {
	'use strict';

	angular
		.module('app')
		.controller('EventsController', EventsController);

	EventsController.$inject = ['$rootScope', 'calendarWidgetService', 'calendarService', 'eventsService'];
	function EventsController($rootScope, calendarWidgetService, calendarService, eventsService) {
		var vm = this;
		vm.events = [];
		vm.calendar = [];

		vm.today = null;
		vm.selectedDay = null;
		vm.month = null;

		vm.dayClicked = dayClicked;
		vm.isSameDayAsSelected = isSameDayAsSelected;
		vm.showEventModal = showEventModal;
		vm.lastMonth = lastMonth;
		vm.nextMonth = nextMonth;

		activate();

		function activate() {
			updateCalendars();
			updateEvents();

			$rootScope.$on('updateCalendars', updateCalendars);
			$rootScope.$on('updateEvents', updateEvents);

			vm.today = calendarWidgetService.getToday();
			vm.selectedDay = vm.today;
			vm.month = calendarWidgetService.getMonth(vm.today);
		}

		function dayClicked(clickEvent, day) {
			vm.selectedDay = calendarWidgetService.dayClicked(clickEvent, day, vm.selectedDay, vm.calendars);
		}

		function isSameDayAsSelected(day) {
			return calendarWidgetService.isSameDay(day, vm.selectedDay);
		}

		function showEventModal(clickEvent, event) {
			calendarWidgetService.showEventModal(clickEvent, event, vm.calendars);
		}

		function lastMonth() {
			vm.month = calendarWidgetService.lastMonth(vm.month);
		}

		function nextMonth() {
			vm.month = calendarWidgetService.nextMonth(vm.month);
		}

		function updateCalendars() {
			vm.calendars = calendarService.getCalendars();
		}

		function updateEvents() {
			vm.events = eventsService.getEvents();
		}
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.directive('spEvents', eventsDirective);

	function eventsDirective() {
		return {
			templateUrl: 'modules/activities/events/events.html',
			controller: 'EventsController',
			controllerAs: 'vm',
			bindToController: true,
			scope: {
				inCalendars: '=inGroups'
			}
		};
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.factory('eventsService', eventsService);

	eventsService.$inject = ['crudService', 'cacheService'];
	function eventsService(crudService, cacheService) {
		var vm = this;  // jshint ignore:line
		vm.event = new crudService('event');

		return {
			createEvent: createEvent,
			createOrUpdateEvent: createOrUpdateEvent,
			deleteEvent: deleteEvent,
			getEvents: getEvents,
			updateEvent: updateEvent
		};

		function createEvent(event) {
			return vm.event.create(event).then(promiseComplete);
		}

		function createOrUpdateEvent(event) {
			if (!event.event_id) {
				return createEvent(event);
			}
			return updateEvent(event.event_id, event);
		}

		function deleteEvent(id) {
			return vm.event.remove(id).then(promiseComplete);
		}

		function getEvents() {
			return cacheService.getEvents();
		}

		function updateEvent(id, event) {
			return vm.event.update(id, event).then(promiseComplete);
		}

		function promiseComplete(response) {
			var res = response.data;
			if (res.success) {
				cacheService.cacheEvents();
				return res.data;
			}
			return res.title;
		}
	}
})();

(function() {
	'use strict';

	angular
		.module('app')
		.controller('RecurrenceController', RecurrenceController);

	RecurrenceController.$inject = ['recurrenceModalService'];
	function RecurrenceController(recurrenceModalService) {
		var rc = this;
		rc.showRecurrenceModal = showRecurrenceModal;

		function showRecurrenceModal() {
			if (rc.item.recurrence) {
				recurrenceModalService.openRecurrenceModal(rc.item);
			}
		}
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.directive('spRepeat', recurrenceDirective);

	function recurrenceDirective() {
		return {
			templateUrl: 'modules/activities/recurrence/recurrence.html',
			controller: 'RecurrenceController',
			controllerAs: 'rc',
			bindToController: true,
			scope: {
				item: '='
			}
		};
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.factory('recurrenceService', recurrenceService);

	function recurrenceService() {
		var recurrenceCols = {
			freq: ['hourly', 'daily', 'weekly', 'monthly', 'yearly'],
			days: ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'],
			by: ['by_hour', 'by_day', 'by_month_day', 'by_year_day', 'by_week_no', 'by_month']
		};

		return {
			clearRecurrence: clearRecurrence,
			constructRecurrence: constructRecurrence
		};

		function clearRecurrence(item) {
			item.recurrence = false;
		}

		function constructRecurrence(item) {

		}
	}
})();

(function() {
	'use strict';

	angular
		.module('app')
		.controller('TasksController', TasksController);

	TasksController.$inject = ['$rootScope', 'tasksService', 'labelService', 'taskModalService'];
	function TasksController($rootScope, tasksService, labelService, taskModalService) {
		var vm = this;
		vm.labels = [];
		vm.tasks = [];
		vm.showTaskModal = showTaskModal;
		vm.toggleCompleted = toggleCompleted;

		activate();

		function activate() {
			updateLabels();
			updateTasks();

			$rootScope.$on('updateLabels', updateLabels);
			$rootScope.$on('updateTasks', updateTasks);
		}

		function showTaskModal(task) {
			taskModalService.openTaskModal(task, vm.labels);
		}

		function toggleCompleted(task) {
			tasksService.toggleCompleted(task);
		}

		function updateLabels() {
			vm.labels = labelService.getLabels();
		}

		function updateTasks() {
			vm.tasks = tasksService.getTasks();
		}
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.directive('spTasks', tasksDirective);

	function tasksDirective() {
		return {
			templateUrl: 'modules/activities/tasks/tasks.html',
			controller: 'TasksController',
			controllerAs: 'vm',
			bindToController: true,
			scope: {
				order: '=',
				days: '=withinDays',
				inLabels: '=inGroups'
			}
		};
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.factory('tasksService', tasksService);

	tasksService.$inject = ['crudService', 'cacheService'];
	function tasksService(crudService, cacheService) {
		var vm = this;  // jshint ignore:line
		vm.task = new crudService('task');

		return {
			createTask: createTask,
			createOrUpdateTask: createOrUpdateTask,
			deleteTask: deleteTask,
			getTasks: getTasks,
			toggleCompleted: toggleCompleted,
			updateTask: updateTask
		};

		function createTask(task) {
			return vm.task.create(task).then(promiseComplete);
		}

		function createOrUpdateTask(task) {
			if (!task.task_id) {
				return createTask(task);
			}
			return updateTask(task.task_id, task);
		}

		function deleteTask(id) {
			return vm.task.remove(id).then(promiseComplete);
		}

		function getTasks() {
			return cacheService.getTasks();
		}

		function toggleCompleted(task) {
			task.completed = !parseInt(task.completed);
			return updateTask(task.task_id, task).then(getTasks);
		}

		function updateTask(id, task) {
			return vm.task.update(id, task).then(promiseComplete);
		}

		function promiseComplete(response) {
			var res = response.data;
			if (res.success) {
				cacheService.cacheTasks();
				return res.data;
			}
			return res.title;
		}
	}
})();

(function() {
	'use strict';

	angular
		.module('app')
		.factory('calendarUserService', calendarUserService);

	calendarUserService.$inject = ['crudService'];
	function calendarUserService(crudService) {
		var vm = this;  // jshint ignore:line
		vm.calendarUser = new crudService('calendarUser');

		return {
			createCalendarUser: createCalendarUser,
			createOrUpdateCalendarUser: createOrUpdateCalendarUser,
			deleteCalendarUser: deleteCalendarUser,
			getSharedCalendars: getSharedCalendars,
			getSharedUsersForCalendar: getSharedUsersForCalendar,
			getEventsForCalendar: getEventsForCalendar,
			updateCalendarUser: updateCalendarUser
		};

		function createCalendarUser(calendarUser) {
			return vm.calendarUser.create(calendarUser).then(promiseComplete);
		}

		function createOrUpdateCalendarUser(calendarUser) {
			if (!calendarUser.calendarUser_id) {
				return createCalendarUser(calendarUser);
			}
			return updateCalendarUser(calendarUser.calendarUser_id, calendarUser);
		}

		function deleteCalendarUser(id) {
			return vm.calendarUser.remove(id).then(promiseComplete);
		}

		// TODO: fix this filthy override done for the sake of time.
		function getSharedCalendars() {
			return vm.calendarUser.getWhere('groups', {}).then(promiseComplete);
		}

		function getSharedUsersForCalendar() {
			return vm.calendarUser.getWhere('users', {}).then(promiseComplete);
		}

		function getEventsForCalendar() {
			return vm.calendarUser.getWhere('activities', {}).then(promiseComplete);
		}

		function updateCalendarUser(id, calendarUser) {
			return vm.calendarUser.update(id, calendarUser).then(promiseComplete);
		}

		function promiseComplete(response) {
			var res = response.data;
			if (res.success) {
				return res.data;
			}
			return res.title;
		}
	}
})();

(function() {
	'use strict';

	angular
		.module('app')
		.factory('labelUserService', labelUserService);

	labelUserService.$inject = ['crudService'];
	function labelUserService(crudService) {
		var vm = this;  // jshint ignore:line
		vm.labelUser = new crudService('labelUser');

		return {
			createLabelUser: createLabelUser,
			createOrUpdateLabelUser: createOrUpdateLabelUser,
			deleteLabelUser: deleteLabelUser,
			getSharedLabels: getSharedLabels,
			getSharedUsersForLabel: getSharedUsersForLabel,
			getEventsForLabel: getEventsForLabel,
			updateLabelUser: updateLabelUser
		};

		function createLabelUser(labelUser) {
			return vm.labelUser.create(labelUser).then(promiseComplete);
		}

		function createOrUpdateLabelUser(labelUser) {
			if (!labelUser.labelUser_id) {
				return createLabelUser(labelUser);
			}
			return updateLabelUser(labelUser.labelUser_id, labelUser);
		}

		function deleteLabelUser(id) {
			return vm.labelUser.remove(id).then(promiseComplete);
		}

		// TODO: fix this filthy override done for the sake of time.
		function getSharedLabels() {
			return vm.labelUser.getWhere('groups', {}).then(promiseComplete);
		}

		function getSharedUsersForLabel() {
			return vm.labelUser.getWhere('users', {}).then(promiseComplete);
		}

		function getEventsForLabel() {
			return vm.labelUser.getWhere('activities', {}).then(promiseComplete);
		}

		function updateLabelUser(id, labelUser) {
			return vm.labelUser.update(id, labelUser).then(promiseComplete);
		}

		function promiseComplete(response) {
			var res = response.data;
			if (res.success) {
				return res.data;
			}
			return res.title;
		}
	}
})();

(function() {
	'use strict';

	// TODO: separate into labelUser and calendarUser modal services

	angular
		.module('app')
		.factory('collabModalService', collabModalService);

	collabModalService.$inject = ['$uibModal', 'tasksService'];
	function collabModalService($uibModal, tasksService) {
		return {
			openCollabModal: openCollabModal
		};

		/**
		* Without cloning the item, any changes made in the modal will be reflected
		* in the main window regardless of if the changes were saved or not, which
		* means a user would not be able to cancel their changes unless they refresh.
		*/
		function openCollabModal(item, labels) {
			var clonedItem = {};
			angular.extend(clonedItem, item);

			return $uibModal.open({
				controller: 'ModalController',
				controllerAs: 'vm',
				templateUrl: 'modules/collab/modal.modal.html',
				resolve: {
					groups: {},
					item: clonedItem
				}
			}).result
				.then(function(response) {
					return tasksService.createOrUpdateTask(response)
						.then(tasksService.getTasks);
				}, function(response) {
					if (Number(response)) {
						return tasksService.deleteTask(response)
							.then(tasksService.getTasks);
					}
				});
		}
	}
})();

(function() {
	'use strict';

	angular
		.module('app')
		.factory('userModalService', userModalService);

	userModalService.$inject = ['$uibModal', 'userService'];
	function userModalService($uibModal, userService) {
		return {
			openUserModal: openUserModal
		};

		/**
		* Without cloning the user, any changes made in the modal will be reflected
		* in the main window regardless of if the changes were saved or not, which
		* means a user would not be able to cancel their changes unless they refresh.
		*/
		function openUserModal(user) {
			var clonedUser = {};
			angular.extend(clonedUser, user);

			return $uibModal.open({
				controller: 'ModalController',
				controllerAs: 'vm',
				templateUrl: 'pages/admin/modal/user.modal.html',
				resolve: {
					groups: {},
					item: clonedUser
				}
			}).result
				.then(function(response) {
					return userService.createOrUpdateUser(response)
						.then(userService.getUsers);
				}, function(response) {
					if (Number(response)) {
						return userService.deleteUser(response)
							.then(userService.getUsers);
					}
				});
		}
	}
})();

(function() {
	'use strict';

	angular
		.module('app')
		.factory('userService', userService);

	userService.$inject = ['crudService'];
	function userService(crudService) {
		var vm = this;  // jshint ignore:line
		vm.user = new crudService('user');

		return {
			createUser: createUser,
			createOrUpdateUser: createOrUpdateUser,
			deleteUser: deleteUser,
			getUsers: getUsers,
			updateUser: updateUser
		};

		function createUser(user) {
			return vm.user.create(user).then(promiseComplete);
		}

		function createOrUpdateUser(user) {
			if (!user.id) {
				return createUser(user);
			}
			return updateUser(user.id, user);
		}

		function deleteUser(id) {
			return vm.user.remove(id).then(promiseComplete);
		}

		function getUsers() {
			return vm.user.getWhere('', {}).then(promiseComplete);
		}

		function updateUser(id, user) {
			return vm.user.update(id, user).then(promiseComplete);
		}

		function promiseComplete(response) {
			var res = response.data;
			if (res.success) {
				return res.data;
			}
			return res.title;
		}
	}
})();

(function() {
	'use strict';

	angular
		.module('app')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$rootScope', 'user', 'headerService'];
	function HeaderController($rootScope, user, headerService) {
		var vm = this;
		vm.user = user;

		activate();

		function activate() {
			$rootScope.$on('updateUser', updateUser);
		}

		function updateUser() {
			headerService.getUser().then(function(response) {
				vm.user = response;
			});
		}
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.factory('headerService', headerService);

	headerService.$inject = ['$http', '$log', 'sessionService'];
	function headerService($http, $log, sessionService) {
		return {
			getUser: getUser
		};

		function getUser() {
			return sessionService.getVar('all')
				.then(getNameComplete);

			function getNameComplete(response) {
				var result = response.data;

				if (result.success === false) {
					return { name: '', avatar: 'content/img/user.png' };
				}

				return result.data;
			}
		}
	}
})();

(function() {
	'use strict';

	angular
		.module('app')
		.controller('SidebarController', SidebarController);

	SidebarController.$inject = ['$rootScope', 'labelService', 'calendarService', 'sidebarService'];
	function SidebarController($rootScope, labelService, calendarService, sidebarService) {
		var vm = this;
		vm.collapsed = {};
		vm.labels = [];
		vm.calendars = [];

		vm.toggleSidebar = toggleSidebar;
		vm.toggleCalendars = toggleCalendars;
		vm.toggleLabels = toggleLabels;

		activate();

		function activate() {
			updateCalendars();
			updateLabels();

			vm.collapsed = sidebarService.getCollapsed();

			$rootScope.$on('updateCalendars', updateCalendars);
			$rootScope.$on('updateLabels', updateLabels);
		}

		function toggleSidebar() {
			vm.collapsed = sidebarService.toggleSidebar();
		}

		function toggleCalendars() {
			vm.collapsed = sidebarService.toggleCalendars();
		}

		function toggleLabels() {
			vm.collapsed = sidebarService.toggleLabels();
		}

		function updateCalendars() {
			vm.calendars = calendarService.getCalendars();
		}

		function updateLabels() {
			vm.labels = labelService.getLabels();
		}
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.factory('sidebarService', sidebarService);

	sidebarService.$inject = ['$window'];
	function sidebarService($window) {
		var vm = this; // jshint ignore: line
		vm.collapsed = {};

		activate();

		return {
			getCollapsed: getCollapsed,
			toggleSidebar: toggleSidebar,
			toggleCalendars: toggleCalendars,
			toggleLabels: toggleLabels
		};

		function activate() {
			if ($window.innerWidth < 600) {
				vm.collapsed = {
					sidebar: true,
					calendars: true,
					labels: true
				};
			} else {
				vm.collapsed = {
					sidebar: false,
					calendars: false,
					labels: false
				};
			}
		}

		function getCollapsed() {
			return vm.collapsed;
		}

		function toggleSidebar() {
			vm.collapsed.sidebar = !vm.collapsed.sidebar;
			if (vm.collapsed.sidebar) {
				vm.collapsed.calendars = true;
				vm.collapsed.labels = true;
			}
			return vm.collapsed;
		}

		function toggleCalendars() {
			vm.collapsed.calendars = !vm.collapsed.calendars;
			if (!vm.collapsed.calendars) {
				vm.collapsed.sidebar = false;
			}
			return vm.collapsed;
		}

		function toggleLabels() {
			vm.collapsed.labels = !vm.collapsed.labels;
			if (!vm.collapsed.labels) {
				vm.collapsed.sidebar = false;
			}
			return vm.collapsed;
		}
	}
})();

(function() {
	'use strict';

	angular
		.module('app')
		.factory('calendarService', calendarService);

	calendarService.$inject = ['crudService', 'cacheService'];
	function calendarService(crudService, cacheService) {
		var vm = this;  // jshint ignore:line
		vm.calendar = new crudService('calendar');

		return {
			createCalendar: createCalendar,
			deleteCalendar: deleteCalendar,
			getCalendars: getCalendars,
			updateCalendar: updateCalendar
		};

		function createCalendar(calendar) {
			return vm.calendar.create(calendar).then(promiseComplete);
		}

		function deleteCalendar(id) {
			return vm.calendar.remove(id).then(promiseComplete);
		}

		function getCalendars() {
			return cacheService.getCalendars();
		}

		function updateCalendar(id, calendar) {
			return vm.calendar.update(id, calendar).then(promiseComplete);
		}

		function promiseComplete(response) {
			var result = response.data;
			if (result.success) {
				cacheService.cacheCalendars();
				return result.data;
			}
			return result.title;
		}
	}
})();

(function() {
	'use strict';

	angular
		.module('app')
		.factory('eventModalService', eventModalService);

	eventModalService.$inject = ['$uibModal', 'moment', 'eventsService', 'formatService'];
	function eventModalService($uibModal, moment, eventsService, formatService) {
		return {
			openEventModal: openEventModal,
			toggleAllDay: toggleAllDay
		};

		/**
		* Without cloning the event, any changes made in the modal will be reflected
		* in the main window regardless of if the changes were saved or not, which
		* means a user would not be able to cancel their changes unless they refresh.
		*/
		function openEventModal(event, calendars) {
			var clonedEvent = {};
			angular.extend(clonedEvent, event);
			formatService.formatForDisplay(clonedEvent);

			return $uibModal.open({
				controller: 'ModalController',
				controllerAs: 'vm',
				templateUrl: 'modules/activities/events/modal/event.modal.html',
				resolve: {
					groups: function() { return calendars; },
					item: clonedEvent
				}
			}).result
				.then(function(response) {
					formatService.formatForStorage(response);
					return eventsService.createOrUpdateEvent(response)
						.then(eventsService.getEvents);
				}, function(response) {
					if (Number(response)) {
						return eventsService.deleteEvent(response)
							.then(eventsService.getEvents);
					}
				});
		}

		function toggleAllDay(event) {
			var display = formatService.getDisplayFormat();

			if (event.all_day) {
				event.dt_start = formatService.toDisplayFormat(moment(event.dt_start, display).startOf('day'));
				event.dt_end = formatService.toDisplayFormat(moment(event.dt_start, display).endOf('day'));
			} else {
				var currentHour = moment().startOf('hour').hour();
				event.dt_start = formatService.toDisplayFormat(moment(event.dt_start, display).hour(currentHour));
				event.dt_end = formatService.toDisplayFormat(moment(event.dt_start, display).hour(currentHour).add(1, 'hours'));
			}
		}
	}
})();

(function() {
	'use strict';

	angular
		.module('app')
		.factory('calendarWidgetService', calendarWidgetService);

	calendarWidgetService.$inject = ['moment', 'eventModalService'];
	function calendarWidgetService(moment, eventModalService) {
		return {
			dayClicked: dayClicked,
			getMonth: getMonth,
			getToday: getToday,
			getWeek: getWeek,
			isSameDay: isSameDay,
			lastMonth: lastMonth,
			nextMonth: nextMonth,
			showEventModal: showEventModal
		};

		function dayClicked(clickEvent, day, selectedDay, calendars) {
			if (isSameDay(day.fullDate, selectedDay)) {
				showEventModal(
					clickEvent,
					{
						dt_start: day.fullDate,
						dt_end: day.fullDate.clone().endOf('day'),
						all_day: 1,
					},
					calendars
				);
				return selectedDay;
			}
			return day.fullDate;
		}
		/**
		* @param {Moment Object} aDay Day to build month around.
		* @return {Moment Object[][]}
		*/
		function getMonth(aDay) {
			var month = [];
			var day = aDay.clone().date(1).startOf('week');
			for (var i = 0; i < 6; i++) {
				month.push(getWeek(day, aDay.month()));
				day = day.add(1, 'weeks');
			}
			return month;
		}

		function getToday() {
			return moment();
		}

		/**
		* @param {Moment Object}	startDay	Starting day of a week.
		* @param {int}				targetMonth	Month number being built.
		*
		* @return {Moment Object[]}
		*/
		function getWeek(startDay, targetMonth) {
			var week = [];

			var day = startDay.clone();
			for (var i = 0; i < 7; i++) {
				week.push({
					number: day.date(),
					isTargetMonth: (day.month() === targetMonth),
					isToday: day.isSame(moment(), 'day'),
					fullDate: day
				});
				day = day.clone().add(1, 'days');
			}

			return week;
		}

		/**
		* @param {Moment Object}	day1
		* @param {Moment Object}	day2
		*
		* @return {bool}
		*/
		function isSameDay(day1, day2) {
			return day1.isSame(day2, 'day');
		}

		/**
		* Since srcMonth is an array of days by weeks, it contains days not in the
		* source month. The first day of the third week of the given month is
		* guaranteed to be a day within the source month.
		*
		* @param {Moment Object}	srcMonth
		* @return {Moment Object[]}
		*/
		function lastMonth(srcMonth) {
			return getMonth(srcMonth[3][0].fullDate.clone().subtract(1, 'months'));
		}

		/**
		* @see lastMonth()
		*/
		function nextMonth(srcMonth) {
			return getMonth(srcMonth[3][0].fullDate.clone().add(1, 'months'));
		}

		function showEventModal(clickEvent, event, calendars) {
			clickEvent.stopPropagation();
			eventModalService.openEventModal(event, calendars);
		}
	}
})();

(function() {
	'use strict';

	angular
		.module('app')
		.factory('recurrenceModalService', recurrenceModalService);

	recurrenceModalService.$inject = ['$uibModal', 'recurrenceService'];
	function recurrenceModalService($uibModal, recurrenceService) {
		var rc = this; // jshint ignore: line
		var recurrenceInfo = {
			freq: ['hourly', 'daily', 'weekly', 'monthly', 'yearly'],
			days: ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']
		};

		return {
			openRecurrenceModal: openRecurrenceModal
		};

		function openRecurrenceModal(item) {
			return $uibModal.open({
				controller: 'ModalController',
				controllerAs: 'vm',
				templateUrl: 'modules/activities/recurrence/modal/recurrence.modal.html',
				resolve: {
					groups: function() { return recurrenceInfo; },
					item: item
				}
			}).result
				.then(function(response) {
					recurrenceService.constructRecurrence(item);
				}, function(response) {
					recurrenceService.clearRecurrence(item);
				});
		}
	}
})();

(function() {
	'use strict';

	angular
		.module('app')
		.factory('labelService', labelService);

	labelService.$inject = ['crudService', 'cacheService'];
	function labelService(crudService, cacheService) {
		var vm = this;  // jshint ignore:line
		vm.label = new crudService('label');

		return {
			createLabel: createLabel,
			deleteLabel: deleteLabel,
			getLabels: getLabels,
			updateLabel: updateLabel
		};

		function createLabel(label) {
			return vm.label.create(label).then(promiseComplete);
		}

		function deleteLabel(id) {
			return vm.label.remove(id).then(promiseComplete);
		}

		function getLabels() {
			return cacheService.getLabels();
		}

		function updateLabel(id, label) {
			return vm.label.update(id, label).then(promiseComplete);
		}

		function promiseComplete(response) {
			var res = response.data;
			if (res.success) {
				cacheService.cacheLabels();
				return res.data;
			}
			return res.title;
		}
	}
})();

(function() {
	'use strict';

	angular
		.module('app')
		.factory('subtaskModalService', subtaskModalService);

	subtaskModalService.$inject = ['$uibModal', 'labelService', 'subtasksService'];
	function subtaskModalService($uibModal, labelService, subtasksService) {
		return {
			openSubtaskModal: openSubtaskModal
		};

		/**
		* Without cloning the subtask, any changes made in the modal will be reflected
		* in the main window regardless of if the changes were saved or not, which
		* means a user would not be able to cancel their changes unless they refresh.
		*/
		function openSubtaskModal(subtask, task) {
			var clonedSubtask = {};
			angular.extend(clonedSubtask, subtask);

			$uibModal.open({
				controller: 'ModalController',
				controllerAs: 'vm',
				templateUrl: 'modules/activities/tasks/modal/subtask.modal.html',
				resolve: {
					groups: task,
					item: clonedSubtask
				}
			}).result
				.then(function(res) {
					subtasksService.createOrUpdateSubtask(res.subtask, res.task);
				}, function(res) {
					if (typeof res !== 'string') {
						subtasksService.deleteSubtask(res.subtask, res.task);
					}
				});
		}
	}
})();

(function() {
	'use strict';

	angular
		.module('app')
		.factory('taskModalService', taskModalService);

	taskModalService.$inject = ['$uibModal', 'tasksService', 'formatService'];
	function taskModalService($uibModal, tasksService, formatService) {
		var vm = this; // jshint ignore: line

		return {
			openTaskModal: openTaskModal
		};

		/**
		* Without cloning the task, any changes made in the modal will be reflected
		* in the main window regardless of if the changes were saved or not, which
		* means a user would not be able to cancel their changes unless they refresh.
		*/
		function openTaskModal(task, labels) {
			var clonedTask = {};
			angular.extend(clonedTask, task);
			formatService.formatForDisplay(clonedTask);

			return $uibModal.open({
				controller: 'ModalController',
				controllerAs: 'vm',
				templateUrl: 'modules/activities/tasks/modal/task.modal.html',
				resolve: {
					groups: function() { return labels; },
					item: clonedTask
				}
			}).result
				.then(function(response) {
					response = formatService.formatForStorage(response);
					return tasksService.createOrUpdateTask(response)
						.then(tasksService.getTasks);
				}, function(response) {
					if (Number(response)) {
						return tasksService.deleteTask(response)
							.then(tasksService.getTasks);
					}
				});
		}
	}
})();

(function() {
	'use strict';

	angular
		.module('app')
		.controller('SubtasksController', SubtasksController);

	SubtasksController.$inject = ['subtasksService', 'subtaskModalService'];
	function SubtasksController(subtasksService, subtaskModalService) {
		var st = this;
		st.showSubtaskModal = showSubtaskModal;
		st.toggleCompleted = toggleCompleted;

		function showSubtaskModal(subtask) {
			subtaskModalService.openSubtaskModal(subtask, st.task);
		}

		function toggleCompleted(subtask) {
			subtasksService.toggleCompleted(subtask);
		}

		function updateSubtasks(response) {
			if (response) {
				st.subtasks = response;
			}
		}
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.directive('spSubtasks', subtasksDirective);

	function subtasksDirective() {
		return {
			templateUrl: 'modules/activities/tasks/subtasks/subtasks.html',
			controller: 'SubtasksController',
			controllerAs: 'st',
			bindToController: true,
			scope: {
				task: '='
			}
		};
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.factory('subtasksService', subtasksService);

	subtasksService.$inject = ['$http', '$log'];
	function subtasksService($http, $log) {
		return {
			createOrUpdateSubtask: createOrUpdateSubtask,
			deleteSubtask: deleteSubtask,
			toggleCompleted: toggleCompleted
		};

		function createOrUpdateSubtask(subtask, task) {
			if (!task.subtasks) {
				task.subtasks = {
					currentId: 1,
					list: []
				};
			}

			if (subtask.id === undefined) {
				subtask.id = task.subtasks.currentId++;
				subtask.completed = false;
				task.subtasks.list.push(subtask);
			}
		}

		function deleteSubtask(subtask, task) {
			task.subtasks.list.splice(task.subtasks.list.indexOf(subtask), 1);
		}

		function toggleCompleted(subtask) {
			subtask.completed = !subtask.completed;
		}
	}
})();
