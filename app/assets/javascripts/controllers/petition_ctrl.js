function PetitionCtrl ($scope, apiService, $location) {
	$scope.showErrors = false;
  $scope.errorMessage;
	$scope.form = {};

  $scope.formData = {};

	$scope.createPetition = function() {
		// check if form is valid
    if ($scope.form.createpetition.$valid === false) {
      $scope.showErrors = true;
      return;
    }

    // add key for rails strong parameters and user data
    $scope.formData = {petition: $scope.formData};

    // send form data to rails api
    apiService.apiCall(function(data, status){
      if(status == 200) {
        $scope.cancel();
      }
      else {
        $scope.errorMessage = 'Unable to create event.';
      }

    }, 'POST', '/api/create-petition', $scope.formData);
	};

	$scope.cancel = function() {
		$location.url('/petition');
	}
};

PetitionCtrl.$inject = ['$scope', 'apiService', '$location'];