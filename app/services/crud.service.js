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
