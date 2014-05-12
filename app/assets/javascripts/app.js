//= require_self
//= require_tree ./controllers
//= require_tree ./services
//= require_tree ./filters

var app = angular.module('app', ['ui.router', 'ui.bootstrap'])
.config(['$locationProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
  
  authToken = $("meta[name=\"csrf-token\"]").attr("content");
  $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken;

  delete $httpProvider.defaults.headers.common["X-Requested-With"];

  // check if the user is connected
  var checkLoggedin = ['$q', '$timeout', 'apiService', '$location', function($q, $timeout, apiService, $location){
    // Initialize a new promise
    var deferred = $q.defer();
    
    //call api and check if user is logged in
    apiService.apiCall(function(data, status) {
      // Authenticated
      if (data.userid !== '0') {
        $timeout(deferred.resolve, 0);

        // check if any global variables (failsafe)
        // if no globals, load them

      } else {
        // Not Authenticated
        // clear global user status meaning no longer logged in
        $timeout(function(){deferred.reject();}, 0);
        $location.url('/login');
      }
      
    }, 'GET', '/api/loggedin', {});

    return deferred.promise;
  }];

  $httpProvider.interceptors.push(function($q, $location) {
    return {
      //if there in unauthorized call to api redirect to login
      'responseError': function(rejection){
        if(rejection.status == 401){
          // window.location is used because the rejection status of promise affects $location
          // promise isn't resolved so scope-life cycle is incomplete and observers/watchers are not notified of change in $location
          // http://docs.angularjs.org/guide/dev_guide.services.$location#caveats
          window.location = '/login'; 
        }
        //resolve promise
        return rejection;
      }
    };
  });

  // declare routes and states
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/partials/home.html',
    controller: 'HomeCtrl'
	})

	$locationProvider.html5Mode(true);
}]);
/*.run(['$rootScope', '$location', 'apiService', 'UserData', function ($rootScope, $location, apiService, UserData) {
  var userdata = UserData;

  // get some global user data
  apiService.apiCall(function(data, status) {
    if (status === 200) {
      // set global data
      delete data.success;
      userdata.username = data.username;
      userdata.userid = data.userid;
      userdata.loggedin = data.loggedin;
    } else {
      // error getting user data
    }
  }, 'GET', '/api/get-user-info', {});

}]);*/