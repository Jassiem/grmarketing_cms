function EventCtrl($scope, $location, apiService) {
	$scope.showErrors = false;
  $scope.errorMessage;
	$scope.form = {};

  $scope.formData = {};
  $scope.minDate = new Date();

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['MM/dd/yyyy'];
  $scope.format = $scope.formats[0];

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

  $scope.today = function() {
    $scope.formData.event_date = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.formData.event_date = null;
  };

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

};

EventCtrl.$inject= ['$scope', '$location', 'apiService'];