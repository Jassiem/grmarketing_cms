function StoriesCtrl($scope, apiService) {
  $scope.allStories = [];

  $scope.getStories = function() {
  	apiService.apiCall(function(data, status) {
  		if(status === 200) {
  			$scope.allStories = data.all_stories;
  			$scope.errorMessage = '';
  		} else {
  			$scope.errorMessage = 'No stories to display';
  		}
  	}, 'GET', '/api/get-stories', {});
  };
  $scope.getStories();

  $scope.deleteStory = function(storyId, index) {
    apiService.apiCall(function(data, status) {
      if(status === 200) {
        $scope.allStories.splice(index,1);
      } else {
      }
    }, 'GET', '/api/delete-story', {story_id: storyId});
  }
};

StoriesCtrl.$inject = ['$scope', 'apiService'];