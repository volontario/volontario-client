(function() {
  function LoginService($q, $http, $localStorage, API_ROOT, $ionicPopup) {
    return {
      loginUser: function() {
        var deferred = $q.defer();

        var promise = $http({
          method: 'POST',
          url: API_ROOT + '/device/login-two-factor',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(obj) {
            var str = [];
            for (var p in obj) {
              str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
            return str.join('&');
          },
          data: {
            // login data
          }
        }).success(function(data) {
          // Init with defaults
          $localStorage.token = {
            token: data.token
          };

          $http.get(API_ROOT + '/customer/profile?token=' + data.token)
            .then(function(response) {
              var user = response.data;
              // Init with defaults

              $localStorage.user = {
                givenName: user.givenName,
                familyName: user.familyName,
                phoneNumber: user.phoneNumber,
                email: user.email,
                id: user.id,
                dateOfBirth: user.dateOfBirth
              };

              console.log($localStorage.user);
              console.log($localStorage.token);

              return user.givenName;
            });
        }).error(function() {
          $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Please check your credentials!'
          });
        });

        if (name) {
          deferred.resolve('Welcome ' + name + '!');
        } else {
          deferred.reject('Wrong credentials.');
        }

        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        };

        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        };

        return promise;
      }
    };
  }

  angular.module('lg.services', []).service('LoginService', LoginService);
})();
