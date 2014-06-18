function PetitionsCtrl($scope, apiService) {
  $scope.allPetitions = [];

  $scope.getPetitions = function() {
  	apiService.apiCall(function(data, status) {
  		if(status === 200) {
  			$scope.allPetitions = data.all_petitions;
  			$scope.errorMessage = '';
  		} else {
  			$scope.errorMessage = 'No petitions to display';
  		}
  	}, 'GET', '/api/get-petitions', {});
  };
  $scope.getPetitions();

  $scope.deletePetition = function(petitionId, index) {
    apiService.apiCall(function(data, status) {
      if(status === 200) {
        $scope.allPetitions.splice(index,1);
      } else {
      }
    }, 'POST', '/api/delete-petition', {petition_id: petitionId});
  }
};

PetitionsCtrl.$inject = ['$scope', 'apiService'];