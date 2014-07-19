function CardsCtrl($scope, apiService) {
  $scope.allCards = [];

  $scope.getCards = function() {
  	apiService.apiCall(function(data, status) {
  		if(status === 200) {
  			$scope.allCards = data.all_cards;
        console.log($scope.allCards);
  			$scope.errorMessage = '';
  		} else {
  			$scope.errorMessage = 'No cards to display';
  		}
  	}, 'GET', '/api/get-cards', {});
  };
  $scope.getCards();

  $scope.deleteCard = function(cardId, index) {
    apiService.apiCall(function(data, status) {
      if(status === 200) {
        $scope.allCards.splice(index,1);
      } else {
      }
    }, 'POST', '/api/delete-card', {card_id: cardId});
  }
};

CardsCtrl.$inject = ['$scope', 'apiService'];