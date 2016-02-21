(function() {
  function UserFactory(
    $localStorage,
    $rootScope,
    dataFactory
  ) {
    return {
      get: function() {
        dataFactory.getUserById('56a24593b42e9f03002b54b7')
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
          });

        return $localStorage.user;
      }
    };
  }

  angular.module('lg').factory('User', UserFactory);
})();
