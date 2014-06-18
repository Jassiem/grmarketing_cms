function EventsCtrl($scope, apiService) {
  $scope.allEvents = [];

  $scope.getEvents = function() {
  	apiService.apiCall(function(data, status) {
  		if(status === 200) {
  			$scope.allEvents = data.all_events;
  			$scope.errorMessage = '';
  		} else {
  			$scope.errorMessage = 'No events to display';
  		}
  	}, 'GET', '/api/get-events', {});
  };
  $scope.getEvents();

  $scope.deleteEvent = function(eventId, index) {
    apiService.apiCall(function(data, status) {
      if(status === 200) {
        $scope.allEvents.splice(index,1);
      } else {
      }
    }, 'POST', '/api/delete-event', {event_id: eventId});
  }
};

EventsCtrl.$inject = ['$scope', 'apiService'];