function EditPetitionCtrl($scope, apiService, $location, $stateParams) {
	$scope.formData = {
		name: '',
		contents: ''
	}

	$scope.init = function() {
		//get petition data
		apiService.apiCall(function(data, status) {
			if(status === 200) {
				$scope.formData.name = data.petition.name;
				$scope.formData.contents = data.petition.contents;
			} else {}
		}, 'GET', '/api/get-petition', {petition_id: $stateParams.id});
	};
	$scope.init();

	$scope.editPetition = function() {
		// check if form is valid
    if ($scope.form.editpetition.$valid === false) {
      $scope.showErrors = true;
      return;
    }

    // add key for rails strong parameters and user data
    $scope.formData.id = $stateParams.id;
    $scope.formData = {petition: $scope.formData};

    // send form data to rails api
    apiService.apiCall(function(data, status){
      if(status == 200) {
        $scope.cancel();
      }
      else {
        $scope.errorMessage = 'Unable to edit petition.';
      }

    }, 'POST', '/api/edit-petition', $scope.formData);
	};

	$scope.cancel = function() {
		$location.url('/petitions');
	}

};

EditPetitionCtrl.$inject = ['$scope', 'apiService', '$location', '$stateParams'];