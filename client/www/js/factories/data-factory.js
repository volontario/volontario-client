angular.module('lg')
  .factory('dataFactory', function($http, API_ROOT, CORS_PROXY) {
    var root = CORS_PROXY + API_ROOT;
    var testAuth = 'Basic dGVzdC50ZXN0QHRlc3QudGVzdDp0ZXN0';

    return {
      deleteEventCalendarItem: function(eventId, itemId) {
        return $http({
          method: 'DELETE',
          url: root + '/events/' + eventId + '/calendar/' + itemId,
          headers: {Authorization: testAuth}
        });
      },

      getEvents: function(data) {
        return $http({
          method: 'GET',
          url: root + '/events',
          params: data
        });
      },

      getLocations: function() {
        return $http.get(root + '/locations');
      },

      getUserById: function(id) {
        return $http.get(root + '/users/' + id);
      },

      getUserEvents: function(id) {
        return $http({
          method: 'GET',
          url: root + '/users/' + id + '/events',
          headers: {Authorization: testAuth}
        });
      },

      postEventCalendarItem: function(id, data) {
        return $http({
          method: 'POST',
          url: root + '/events/' + id + '/calendar',
          headers: {Authorization: testAuth},
          data: data
        });
      }
    };
  });
