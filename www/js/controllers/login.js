angular.module('lg.controllers')
// URL to API that enables cross-origin requests to anywhere
 .value('CORSURL', '//cors-anywhere.herokuapp.com/')
 .value('APIURL', 'https://volontario-server.herokuapp.com/')

.controller('LoginCtrl', function($scope, $localStorage, $ionicLoading, $compile, $http, $timeout, $ionicHistory, $interval,$state, APIURL, CORSURL,LoginService, $ionicPopup) {

  $scope.data = {};
  $scope.show = false; 
  $scope.hide = true; 
   $scope.register = function() {
    $state.go('app.register');
   } 

    $scope.pin = function(){
        $http({
          method: 'POST',
          url: APIURL+'/device/login-customer',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(obj) {
              var str = [];
              for(var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              return str.join("&");
          },
          data: {
            number: $scope.data.phonenumber,
            key:'OWMwZTU0MjIxMDgzOTRmYTAxMTgzOTg5'
          }
      }).success(function () {
          $scope.show = true;
          $scope.hide = false; 
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    };

    $scope.login = function() {
        LoginService.loginUser($scope.data.phonenumber, $scope.data.password).success(function(data) {
            $ionicHistory.nextViewOptions({
              disableBack: true
            });
            $state.go('app.map');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    };
});




