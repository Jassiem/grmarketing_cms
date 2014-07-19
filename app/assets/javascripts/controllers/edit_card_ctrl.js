function EditCardCtrl($scope, apiService, $location, $stateParams) {
	$scope.formData = {
		title: '',
		description: '',
    file_name: '',
		start_date: '',
    end_date: ''
	}

  $scope.form = {}

	$scope.minDate = new Date();

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['MM/dd/yyyy'];
  $scope.format = $scope.formats[0];

	$scope.init = function() {
		//get card data
		apiService.apiCall(function(data, status) {
			if(status === 200) {
				$scope.formData.title = data.card.title;
				$scope.formData.description = data.card.description;
        $scope.formData.file_name = data.card.graphic_file_name;
				$scope.formData.start_date = data.card.start_date;
        $scope.formData.end_date = data.card.end_date;
			} else {}
		}, 'GET', '/api/get-card', {card_id: $stateParams.id});
	};
	$scope.init();

	$scope.editCard = function() {
		// check if form is valid
    if ($scope.form.editcard.$valid === false) {
      $scope.showErrors = true;
      $scope.errorMessage = 'One or more errors found.';
      return;
    }

    // add key for rails strong parameters and user data
    $scope.formData.id = $stateParams.id;

    // send form data to rails api
    apiService.apiCall(function(data, status){
      if(status == 200) {
        $scope.cancel();
      }
      else {
        $scope.errorMessage = 'Unable to edit card.';
      }

    }, 'POST', '/api/edit-card', $scope.formData);
	};

	$scope.cancel = function() {
		$location.url('/cards');
	}

	$scope.today = function() {
    $scope.formData.card_date = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.formData.card_date = null;
  };

  $scope.open = function($event, opened) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope[opened] = true;
  };

};

EditCardCtrl.$inject = ['$scope', 'apiService', '$location', '$stateParams'];