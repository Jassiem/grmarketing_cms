function MessageCtrl ($scope, apiService, $location) {
	$scope.showErrors = false;
  $scope.errorMessage;
	$scope.form = {};

  $scope.formData = {};

	$scope.createMessage = function() {
		// check if form is valid
    if ($scope.form.createmessage.$valid === false) {
      $scope.showErrors = true;
      return;
    }

    // add key for rails strong parameters and user data
    $scope.formData = {message: $scope.formData};

    // send form data to rails api
    apiService.apiCall(function(data, status){
      if(status == 200) {
        $scope.cancel();
      }
      else {
        $scope.errorMessage = 'Unable to create message.';
      }

    }, 'POST', '/api/create-message', $scope.formData);
	};

	$scope.cancel = function() {
		$location.url('/message');
	}
};

MessageCtrl.$inject = ['$scope', 'apiService', '$location'];