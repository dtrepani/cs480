(function() {
	'use strict';

	angular
		.module('app', ['ngRoute'])
		.controller('AppController', AppController);

	function AppController() {
	}
})();
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
(function() {
	'use strict';

	angular
		.module('app')
		.factory('userService', userService);

	userService.$inject = ['$http', '$log'];
	function userService($http, $log) {
		return {
			getUser: getUser,
			createUser: createUser,
			updateUser: updateUser,
			deleteUser: deleteUser
		};

		function getUser(id) {
			return $http.get('api/managers/userManager.php?id=' + id)
				.then(promiseComplete)
				.catch(promiseFailed);
		}

		function createUser(user) {
			return $http.post('api/managers/userManager.php', user)
				.then(promiseComplete)
				.catch(promiseFailed);
		}

		function updateUser(id, user) {
			return $http.put('api/managers/userManager.php?id=' + id, user)
				.then(promiseComplete)
				.catch(promiseFailed);
		}

		function deleteUser(id) {
			return $http.post('api/managers/userManager.php?id=' + id)
				.then(promiseComplete)
				.catch(promiseFailed);
		}

		function promiseComplete(response) {
			return response.data.success;
		}

		function promiseFailed(error) {
			$log.error(error);
			return false;
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
			templateUrl: 'modules/sidebar/sidebar.html',
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
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$location', 'loginService'];
	function LoginController($location, loginService) {
		var vm = this;
		vm.loading = false;
		vm.error = '';
		vm.login = login;

		function login() {
			vm.loading = true;

			loginService.login(vm.user)
				.then(loginComplete);

			function loginComplete(response) {
				if (response.success) {
					$location.url("/dashboard");
				} else {
					vm.loading = false;
					vm.error = response.result;
				}
			}
		}
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.factory('loginService', loginService);

	loginService.$inject = ['$http', '$log'];
	function loginService($http, $log) {
		return {
			login: login
		};

		function login(user) {
			return $http.post('api/managers/loginManager.php', user)
				.then(loginComplete)
				.catch(loginFailed);

			function loginComplete(response) {
				return response.data;
			}

			function loginFailed(error) {
				$log.error(error);
				return {
					success: false,
					result: error
				};
			}
		}
	}
})();

(function() {
	'use strict';

	angular
		.module('app')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['$location', 'userService'];
	function RegisterController($location, userService) {
		var vm = this;
		vm.loading = false;
		vm.registerUser = registerUser;

		function registerUser() {
			vm.loading = true;

			userService.createUser(vm.user)
				.then(registerUserComplete);

			function registerUserComplete(success) {
				if (success) {
					$location.url("/login");
				} else {
					vm.loading = false;
				}
			}
		}
	}
})();