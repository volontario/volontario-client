angular.module('lg.controllers')

.controller('UserActivityCtrl', function($scope,$rootScope, $state, $http, CORS_PROXY, API_ROOT, User) {

    var userId = $scope.user.id;//"56a24593b42e9f03002b54b7";
    var Auth = 'Basic dGVzdC50ZXN0QHRlc3QudGVzdDp0ZXN0';

	var searchEvents = function(){
    $http({
         url: CORS_PROXY+API_ROOT+'users/'+userId+'/events',
         method: 'GET',
         headers: {'Authorization': Auth},
         }).then(function successCallBack(response){
		$scope.userEvents = response.data;
		 }, function errorCallBack(response){

	 });
  };
    /* DELETE /events/:id/calendar
	/* Deletes an item in an event calendar. Returns 204 on success.
	/*	id 	ID of the item
	*/

	$scope.removeFromCalendar = function(eventId,uniqueId){
		//save to localStorage and request from a service
        var Auth = 'Basic dGVzdC50ZXN0QHRlc3QudGVzdDp0ZXN0';   
        $http.delete(CORS_PROXY+API_ROOT+'events/'+eventId+'/calendar/'+uniqueId,
            {headers: {'Authorization': Auth},
            })
          .success(function successCallBack(response){
            // add response from API
            console.log('removed');
            searchEvents();
          }, 
          function errorCallBack(response){
          	console.log('failure at event removal');
        });      
	};
  searchEvents();
});
