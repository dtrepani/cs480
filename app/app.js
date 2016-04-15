(function() {
	'use strict';

	angular
		.module('app', ['ngRoute', 'ui.bootstrap'])
		.controller('AppController', AppController);

	AppController.$inject = ['$rootScope', 'appService'];
	function AppController($rootScope, appService) {
		$rootScope.$on('$routeChangeError', appService.routeChangeError);
	}
})();
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
(function() {
	'use strict';

	angular
		.module('app')
		.factory('appService', appService);

	appService.$inject = ['$location', 'statusService'];
	function appService($location, statusService) {
		return {
			routeChangeError: routeChangeError
		};

		function routeChangeError(event, current, previous, rejection) {
			if (rejection === statusService.UNAUTHORIZED) {
				$location.path('/login');
			} else if (rejection === statusService.FORBIDDEN) {
				$location.path('/forbidden');
			}
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
			return $http.get(this.base + '?id=' + id) // jshint ignore:line
				.then(promiseComplete)
				.catch(promiseFailed);
		}

		/**
		* @param 	{string}	where 	Where clause.
		* @param	{string}	userID	For activities (tasks, events), the corresponding
		*								user for the activity. Pass empty string
		*								otherwise.
		* @return	{string[]}			Promise with 'data' == query results on success.
		*/
		function getWhere(where, userID) {
			return $http.get(this.base + '?where=true&id=' + userID, where) // jshint ignore:line
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
			return $http.put(this.base + '?id=' + id, data) // jshint ignore:line
				.then(promiseComplete)
				.catch(promiseFailed);
		}

		/**
		* @param	{string}	id		ID of item type to delete.
		* @return	{string[]}			Promise with 'data' === 1 on success.
		*/
		function remove(id) {
			return $http.delete(this.base + '?id=' + id) // jshint ignore:line
				.then(promiseComplete)
				.catch(promiseFailed);
		}

		/**
		* @param 	{string}	where 	Where clause.
		* @param	{string}	userID	For activities (tasks, events), the corresponding
		*								user for the activity. Pass empty string
		*								otherwise.
		* @return	{string[]}			Promise with 'data' >= 0 on success.
		*/
		function removeWhere(where, userID) {
			return $http.delete(this.base + '?where=true&id=' + userID, where) // jshint ignore:line
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
	* Compare an input field to another field, determined by the dev.
	*/

	angular
		.module('app')
		.directive('spCompareTo', compareTo);

	function compareTo() {
		var directive = {
			require: 'ngModel',
			scope: {
				otherModel: '=spCompareTo'
			},
			link: link
		};
		return directive;

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

	loginService.$inject = ['$http', '$location', '$log'];
	function loginService($http, $location, $log) {
		var vm = this;  // jshint ignore:line

		return {
			login: login
		};

		function login(user) {
			return $http.post('api/user/loginManager.php', user)
				.then(loginComplete)
				.catch(loginFailed);

			function loginComplete(response) {
				if (response.data.success === false) {
					return response.data.title;
				}
				$location.path('/dashboard');
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
		.controller('ModalController', ModalController);

	ModalController.$inject = ['$uibModalInstance', 'item'];
	function ModalController($uibModalInstance, item) {
		var vm = this;
		vm.item = item;
		vm.close = close;
		vm.cancel = cancel;
		vm.confirm = confirm;
		vm.remove = remove;

		function close() {
			$uibModalInstance.close();
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		function remove(data) {
			$uibModalInstance.dismiss(data);
		}

		function confirm(data) {
			$uibModalInstance.close(data);
		}
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.controller('TasksController', TasksController);

	TasksController.$inject = ['tasksService'];
	function TasksController(tasksService) {
		var vm = this;
		vm.tasks = {};
		vm.showTaskDialog = showTaskDialog;

		activate();

		function activate() {
			tasksService.getTasks().then(updateTasks);
		}

		function showTaskDialog(task) {
			tasksService.openTaskModal(task).then(updateTasks);
		}

		function updateTasks(response) {
			if (response) {
				vm.tasks = response;
			}
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
			templateUrl: 'modules/tasks/tasks.html',
			controller: 'TasksController',
			controllerAs: 'vm',
			bindToController: true
		};
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.factory('tasksService', tasksService);

	tasksService.$inject = ['$http', '$log', '$uibModal', 'crudService', 'sessionService'];
	function tasksService($http, $log, $uibModal, crudService, sessionService) {
		var vm = this;  // jshint ignore:line
		vm.task = new crudService('task');

		return {
			createOrUpdateTask: createOrUpdateTask,
			deleteTask: deleteTask,
			getTasks: getTasks,
			openTaskModal: openTaskModal
		};

		function createOrUpdateTask(task) {
			if (!task.task_id) {
				return vm.task.create(task).then(promiseComplete);
			}
			return vm.task.update(task.task_id, task).then(promiseComplete);
		}

		function deleteTask(task) {
			return vm.task.remove(task.task_id).then(promiseComplete);
		}

		function getTasks() {
			return sessionService.getVar('id')
				.then(getTaskWithUserID);

			function getTaskWithUserID(response) {
				var res = response.data;
				if (res.success) {
					return vm.task.getWhere('', res.data).then(promiseComplete);
				}
				return res.title;
			}
		}

		function openTaskModal(task) {
			if (angular.isString(task.due)) {
				task.due = new Date(task.due.replace(/(.+) (.+)/, "$1T$2Z"));
			}
			if (angular.isString(task.reminder)) {
				task.reminder = new Date(task.reminder.replace(/(.+) (.+)/, "$1T$2Z"));
			}

			return $uibModal.open({
				controller: 'ModalController',
				controllerAs: 'vm',
				templateUrl: 'modules/tasks/modal/task.modal.html',
				resolve: {
					item: task
				}
			}).result
				.then(function(response) {
					return createOrUpdateTask(response).then(getTasks);
				}, function(response) {
					if (response.task_id) {
						return deleteTask(response).then(getTasks);
					}
				});
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
		.controller('DashboardController', DashboardController);

	function DashboardController() {

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

	registerService.$inject = ['$location', '$log', 'crudService'];
	function registerService($location, $log, crudService) {
		var vm = this;  // jshint ignore:line
		vm.crud = new crudService('user');

		return {
			register: register
		};

		function register(user) {
			return vm.crud.create(user)
				.then(registrationComplete);

			function registrationComplete(response) {
				if (response.success === 'false') {
					$log.error(response.title);
					return response.title;
				}
				$location.url('/login');
			}
		}
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.factory('accessService', accessService);

	accessService.$inject = ['$location', '$q', 'sessionService', 'statusService'];
	function accessService($location, $q, sessionService, statusService) {
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
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$scope', 'headerService'];
	function HeaderController($scope, headerService) {
		var vm = this;
		vm.name = '';
		vm.url = '';

		headerService.getUser()
			.then(getUserComplete);

		function getUserComplete(response) {
			$scope.$evalAsync(function() {
				vm.name = (response.name === false) ? 'Login' : response.name;
				vm.url = response.url;
			});
		}
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.directive('spHeader', headerDirective);

	function headerDirective() {
		return {
			link: link,
			templateUrl: 'pages/layout/header/header.html',
			controller: 'HeaderController',
			controllerAs: 'vm',
			bindToController: true
		};

		function link(scope, element, attrs) {
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
			return sessionService.getVar('name')
				.then(getNameComplete);

			function getNameComplete(response) {
				var res = response.data;

				if (res.success === false) {
					return {name: false, url: '#/login'};
				}
				return {name: res.data, url: '#/dashboard'};
			}
		}
	}
})();

(function() {
	'use strict';

	angular
		.module('app')
		.controller('SidebarController', SidebarController);

	function SidebarController() {
		var vm = this;

		vm.collapsed = true;

		vm.toggleSidebar = function() {
			vm.collapsed = !vm.collapsed;
		};
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.directive('spSidebar', sidebarDirective);

	function sidebarDirective() {
		return {
			link: link,
			templateUrl: 'pages/layout/sidebar/sidebar.html',
			controller: 'SidebarController',
			controllerAs: 'vm',
			bindToController: true
		};

		function link(scope, element, attrs) {
			scope.$watch(attrs.sidebarDirective, toggleSidebar);

			function toggleSidebar(collapsed) {
				if (collapsed) {
					element.removeClass('collapsed');
				} else {
					element.addClass('collapsed');
				}
			}
		}
	}
})();