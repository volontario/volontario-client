(function() {
  function UserController($scope, dataFactory) {
    var userId = $scope.user.id;
    $scope.skill = $scope.user.tags;

    $scope.addSkill = function(skill) {
      dataFactory.setUserTags(userId, skill);
    };

    $scope.preference = $scope.user.tags;

    $scope.addPreference = function(preference) {
        dataFactory.setUserPreference(userId, preference);
    };
  }

  angular.module('lg.controllers').controller('UserCtrl', UserController);
})();
