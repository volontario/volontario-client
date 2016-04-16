(function() {
  function RegistrationController(
    $http,
    $location,
    $scope,
    $state,
    dataFactory
  ) {
    $scope.data = {};

    if ($location.search().quasiuserId !== undefined) {
      $scope.data.quasiuserId = $location.search().quasiuserId;
    }

    $scope.submit = function() {
      dataFactory.postUser($scope.data)
        .then(function(res) {
          $state.go('app.map');
        }, function() {
          console.log('Error in registration');
        });
    }
  };

  angular.module('lg.controllers').controller('RegistrationCtrl', RegistrationController);
})();
