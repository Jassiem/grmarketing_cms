function EventsCtrl($scope, apiService) {
  $scope.allEvents = [];

  $scope.getEvents = function() {
  	apiService.apiCall(function(data, status) {
  		if(status === 200) {
  			$scope.allEvents = data.all_events;
  			console.log($scope.allEvents);
  			$scope.errorMessage = '';
  		} else {
  			$scope.errorMessage = 'No events to display';
  		}
  	}, 'GET', '/api/get-events', {});
  };

  $scope.getEvents();
};

EventsCtrl.$inject = ['$scope', 'apiService'];