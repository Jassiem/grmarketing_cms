function EditMessageCtrl($scope, apiService, $location, $stateParams) {
	$scope.formData = {
		title: '',
		contents: ''
	}

	$scope.init = function() {
		//get message data
		apiService.apiCall(function(data, status) {
			if(status === 200) {
				$scope.formData.title = data.message.title;
				$scope.formData.contents = data.message.contents;
			} else {}
		}, 'GET', '/api/get-message', {message_id: $stateParams.id});
	};
	$scope.init();

	$scope.editMessage = function() {
		// check if form is valid
    if ($scope.form.editmessage.$valid === false) {
      $scope.showErrors = true;
      return;
    }

    // add key for rails strong parameters and user data
    $scope.formData.id = $stateParams.id;
    $scope.formData = {message: $scope.formData};

    // send form data to rails api
    apiService.apiCall(function(data, status){
      if(status == 200) {
        $scope.cancel();
      }
      else {
        $scope.errorMessage = 'Unable to edit message.';
      }

    }, 'POST', '/api/edit-message', $scope.formData);
	};

	$scope.cancel = function() {
		$location.url('/messages');
	}

};

EditMessageCtrl.$inject = ['$scope', 'apiService', '$location', '$stateParams'];