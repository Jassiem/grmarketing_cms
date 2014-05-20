function EventCtrl($scope, $location, apiService) {
	$scope.showErrors = false;
  $scope.errorMessage;
	$scope.form = {};

  $scope.formData = {};

	$scope.createEvent = function() {
		// check if form is valid
    if ($scope.form.createevent.$valid === false) {
      $scope.showErrors = true;
      return;
    }

    // add key for rails strong parameters and user data
    $scope.formData = {event: $scope.formData};

    // send form data to rails api
    apiService.apiCall(function(data, status){
      if(status == 200) {
        $scope.cancel();
      }
      else {
        $scope.errorMessage = 'Unable to create event.';
      }

    }, 'POST', '/api/create-event', $scope.formData);
	};

	$scope.cancel = function() {
		$location.url('/event');
	}


};

EventCtrl.$inject= ['$scope', '$location', 'apiService'];