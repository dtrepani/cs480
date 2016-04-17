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