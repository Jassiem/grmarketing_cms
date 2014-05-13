// homepage controller
function HomeCtrl($scope, apiService) {

  $scope.init = function() {
    $scope.testApi();
  };

  $scope.testApi = function() {
    apiService.apiCall(function(data, status){
      if(status == 200) {
        console.log(data);
      } else {
        console.log('get fucked');
      }

    }, 'GET', '/api/test', {});
  }

  $scope.init();
}
HomeCtrl.$inject = ['$scope', 'apiService'];