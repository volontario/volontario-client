(function() {
  function LoginController(
    $scope,
    $cordovaOauth,
    $q,
    $localStorage,
    $ionicLoading,
    $compile,
    $http,
    $timeout,
    $ionicHistory,
    $interval,
    $state,
    LoginService
  ) {
    var def = $q.defer();

    $scope.data = {};
    $scope.show = false;
    $scope.hide = true;
    $scope.register = function() {
      $state.go('app.register');
    };

    $scope.login = function() {
      $cordovaOauth.google('1086046664141-oh99kc2sfbc3lklpo0k8s171tbjgt68k.apps.googleusercontent.com', ['profile']) // eslint-disable-line max-len
        .then(function(result) {
          console.log('Response Object -> ' + angular.toJson(result));
          var accessToken = result.accessToken;
          $scope.getUserInfo(accessToken, def);
        }, function(error) {
          console.log('Error -> ' + error);
        });
    };
    $scope.getUserInfo = function(accessToken, def) {
      var http = $http({
        url: 'https://www.googleapis.com/oauth2/v3/userinfo',
        method: 'GET',
        params: {accessToken: accessToken}
      });
      http.then(function(data) {
        console.log(data);
        var userData = data.data;
        var user = {
          name: userData.name,
          gender: userData.gender,
          email: userData.email,
          google_id: userData.sub,
          picture: userData.picture,
          profile: userData.profile
        };
        console.log(user);
        def.resolve(user);
      });
    };
  }

  angular.module('lg.controllers').controller('LoginCtrl', LoginController);
})();
