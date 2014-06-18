function MessagesCtrl($scope, apiService) {
  $scope.allMessages = [];

  $scope.getMessages = function() {
  	apiService.apiCall(function(data, status) {
  		if(status === 200) {
  			$scope.allMessages = data.all_messages;
  			$scope.errorMessage = '';
  		} else {
  			$scope.errorMessage = 'No messages to display';
  		}
  	}, 'GET', '/api/get-messages', {});
  };
  $scope.getMessages();

  $scope.sendMessage = function(messageId) {
    apiService.apiCall(function(data, status) {
      if(status == 200) {
        console.log('success');
      } else {
        console.log('error');
      }
    }, 'POST', '/api/send-notification', {message_id: messageId});
  };

  $scope.deleteMessage = function(messageId, index) {
    apiService.apiCall(function(data, status) {
      if(status === 200) {
        $scope.allMessages.splice(index,1);
      } else {
      }
    }, 'GET', '/api/delete-message', {message_id: messageId});
  }
};

MessagesCtrl.$inject = ['$scope', 'apiService'];