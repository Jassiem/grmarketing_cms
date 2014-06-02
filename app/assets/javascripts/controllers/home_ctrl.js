// homepage controller
function HomeCtrl($scope, apiService) {

  $scope.notify = function() {
    apiService.apiCall(function(data, status){
      if(status == 200) {
        console.log('success');
      } else {
        console.log('get fucked');
      }

    }, 'POST', '/api/send-notification', {});
  }

}
HomeCtrl.$inject = ['$scope', 'apiService'];