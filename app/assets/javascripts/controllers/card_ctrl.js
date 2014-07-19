function CardCtrl($scope, $location, apiService, $http) {
	$scope.showErrors = false;
  $scope.errorMessage;
	$scope.form = {};

  $scope.formData = {};
  $scope.minDate = new Date();

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['MM/dd/yyyy'];
  $scope.format = $scope.formats[0];

  /*
    Angular does not support data binding for input tags with type=file.
    For now a workaround will be used that takes advantage of onchange card in js.
    The name will be retrieved and stored in the scope, when the field is updated.
  */
  $scope.getFile = function(element){
    $scope.fileData = element.files[0];
  }

	$scope.createCard = function() {
		// check if form is valid
    if ($scope.form.createcard.$valid === false) {
      $scope.showErrors = true;
      return;
    }

    // check if date range is valid
    if($scope.formData.start_date > $scope.formData.end_date) {
      $scope.showErrors;
      $scope.errorMessage = 'Invalid date range';
      return;

    }

    //check if file type is supported and determine media type
    var testFileType = new RegExp("\.(jpg|jpeg|gif|png|bmp)$");

    if(!testFileType.test($scope.fileData.name)) {
      $scope.showErrors = true;
      $scope.errorMessage = 'Invalid file type';
      return;
    }
    
    //make formData object out of the uploaded file data, so that angular can post it
    var fd = new FormData();
    fd.append('graphic', $scope.fileData);
    fd.append('title', $scope.formData.title);
    fd.append('description', $scope.formData.description);
    fd.append('start_date', $scope.formData.start_date);
    fd.append('end_date', $scope.formData.end_date);

    // add key for rails strong parameters

    /* Api Service isn't used because special paramter, transformRequest, requires new value.
      This is so that angular does not try to send the data as JSON by default */
    $http.post('/api/create-card', fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    })
    .success(function(data, status){
      console.log(status);
      $location.url('/card');
    })
    .error(function(data, status){
      $scope.errorMessage = 'Unable to upload file.';
    });   

	};

	$scope.cancel = function() {
		$location.url('/card');
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

CardCtrl.$inject= ['$scope', '$location', 'apiService', '$http'];