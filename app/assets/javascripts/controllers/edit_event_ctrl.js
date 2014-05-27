function EditEventCtrl($scope, apiService, $location, $stateParams) {
	$scope.formData = {
		name: '',
		description: '',
		event_date: ''
	}

	$scope.minDate = new Date();

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['MM/dd/yyyy'];
  $scope.format = $scope.formats[0];

	$scope.init = function() {
		//get event data
		apiService.apiCall(function(data, status) {
			if(status === 200) {
				$scope.formData.name = data.event.name;
				$scope.formData.description = data.event.description;
				$scope.formData.event_date = data.event.event_date;
			} else {}
		}, 'GET', '/api/get-event', {event_id: $stateParams.id});
	};
	$scope.init();

	$scope.editEvent = function() {
		// check if form is valid
    if ($scope.form.editevent.$valid === false) {
      $scope.showErrors = true;
      return;
    }

    // add key for rails strong parameters and user data
    $scope.formData.id = $stateParams.id;
    $scope.formData = {event: $scope.formData};

    // send form data to rails api
    apiService.apiCall(function(data, status){
      if(status == 200) {
        $scope.cancel();
      }
      else {
        $scope.errorMessage = 'Unable to edit event.';
      }

    }, 'POST', '/api/edit-event', $scope.formData);
	};

	$scope.cancel = function() {
		$location.url('/events');
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

EditEventCtrl.$inject = ['$scope', 'apiService', '$location', '$stateParams'];