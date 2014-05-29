function StoryCtrl ($scope, apiService, $location) {
	$scope.showErrors = false;
  $scope.errorMessage;
	$scope.form = {};

  $scope.formData = {};

	$scope.createStory = function() {
		// check if form is valid
    if ($scope.form.createstory.$valid === false) {
      $scope.showErrors = true;
      return;
    }

    // add key for rails strong parameters and user data
    $scope.formData = {story: $scope.formData};

    // send form data to rails api
    apiService.apiCall(function(data, status){
      if(status == 200) {
        $scope.cancel();
      }
      else {
        $scope.errorMessage = 'Unable to create story.';
      }

    }, 'POST', '/api/create-story', $scope.formData);
	};

	$scope.cancel = function() {
		$location.url('/story');
	}
};

StoryCtrl.$inject = ['$scope', 'apiService', '$location'];