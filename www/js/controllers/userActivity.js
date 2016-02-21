(function() {
  function UserActivityController($scope, $rootScope, $state, dataFactory) {
    // '56a24593b42e9f03002b54b7';
    var userId = $scope.user.id;

    var searchEvents = function() {
      dataFactory.getUserEvents(userId)
      .then(function(response) {
        $scope.userEvents = response.data;
      });
    };

    $scope.removeFromCalendar = function(eventId, uniqueId) {
      // save to localStorage and request from a service
      dataFactory.deleteEventCalendarItem(eventId, uniqueId)
        .success(function() {
          // add response from API
          console.log('removed');
          searchEvents();
        }, function() {
          console.log('failure at event removal');
        });
    };
    searchEvents();
  }

  angular.module('lg.controllers')
    .controller('UserActivityCtrl', UserActivityController);
})();
