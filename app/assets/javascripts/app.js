//= require_self
//= require_tree ./controllers
//= require_tree ./services
//= require_tree ./filters

var grassroot = angular.module('grassroot', ['ui.router', 'ui.bootstrap'])
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
    .state('event', {
      url: '/event',
      templateUrl: '/partials/event',
      controller: 'EventCtrl'
    })
    .state('edit_event', {
      url: '/event/:id',
      templateUrl: '/partials/edit_event',
      controller: 'EditEventCtrl'
    })
    .state('create_event', {
      url: '/create_event',
      templateUrl: '/partials/create_event',
      controller: 'EventCtrl'
    })
    .state('events', {
      url: '/events',
      templateUrl: '/partials/events',
      controller: 'EventsCtrl'
    })
    .state('petition', {
      url: '/petition',
      templateUrl: '/partials/petition',
      controller: 'PetitionCtrl'
    })
    .state('create_petition', {
      url: '/create_petition',
      templateUrl: '/partials/create_petition',
      controller: 'PetitionCtrl'
    })
    .state('petitions', {
      url: '/petitions',
      templateUrl: '/partials/petitions',
      controller: 'PetitionsCtrl'
    })
    .state('edit_petition', {
      url: '/petition/:id',
      templateUrl: '/partials/edit_petition',
      controller: 'EditPetitionCtrl'
    })
    .state('story', {
      url: '/story',
      templateUrl: '/partials/story',
      controller: 'StoryCtrl'
    })
    .state('create_story', {
      url: '/create_story',
      templateUrl: '/partials/create_story',
      controller: 'StoryCtrl'
    })
    .state('stories', {
      url: '/stories',
      templateUrl: '/partials/stories',
      controller: 'StoriesCtrl'
    })
    .state('edit_story', {
      url: '/story/:id',
      templateUrl: '/partials/edit_story',
      controller: 'EditStoryCtrl'
    })
    .state('message', {
      url: '/message',
      templateUrl: '/partials/message',
      controller: 'MessageCtrl'
    })
    .state('create_message', {
      url: '/create_message',
      templateUrl: '/partials/create_message',
      controller: 'MessageCtrl'
    })
    .state('messages', {
      url: '/messages',
      templateUrl: '/partials/messages',
      controller: 'MessagesCtrl'
    })
    .state('edit_message', {
      url: '/message/:id',
      templateUrl: '/partials/edit_message',
      controller: 'EditMessageCtrl'
    });

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