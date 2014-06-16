function EditStoryCtrl($scope, apiService, $location, $stateParams) {
	$scope.formData = {
		title: '',
		content: '',
		url: ''
	}

	$scope.init = function() {
		//get story data
		apiService.apiCall(function(data, status) {
			if(status === 200) {
				$scope.formData.title = data.story.title;
				$scope.formData.content = data.story.content;
				$scope.formData.url = data.story.url;
			} else {}
		}, 'GET', '/api/get-story', {story_id: $stateParams.id});
	};
	$scope.init();

	$scope.editStory = function() {
		// check if form is valid
    if ($scope.form.editstory.$valid === false) {
      $scope.showErrors = true;
      return;
    }

    // add key for rails strong parameters and user data
    $scope.formData.id = $stateParams.id;
    $scope.formData = {story: $scope.formData};

    // send form data to rails api
    apiService.apiCall(function(data, status){
      if(status == 200) {
        $scope.cancel();
      }
      else {
        $scope.errorMessage = 'Unable to edit story.';
      }

    }, 'POST', '/api/edit-story', $scope.formData);
	};

	$scope.cancel = function() {
		$location.url('/stories');
	}

};

EditStoryCtrl.$inject = ['$scope', 'apiService', '$location', '$stateParams'];