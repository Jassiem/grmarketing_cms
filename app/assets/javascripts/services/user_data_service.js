//Factory Definition
//Hold single copy user data that will be needed in all angular controllers.
grassroot.factory('UserData', function() {
  return {username: '', userid: '', loggedin: false};
})