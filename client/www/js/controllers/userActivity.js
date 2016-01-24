angular.module('lg.controllers')

.controller('UserActivityCtrl', function($scope,$rootScope, $state, $http, CORSURL, APIURL, User) {

    var userId = $scope.user.id;//"56a24593b42e9f03002b54b7";
    var Auth = 'Basic dGVzdC50ZXN0QHRlc3QudGVzdDp0ZXN0';

	$http({
         url: CORSURL+APIURL+'users/'+userId+'/events',
         method: 'GET',
         headers: {'Authorization': Auth},
         }).then(function successCallBack(response){
		$scope.userEvents = response.data;
		 }, function errorCallBack(response){

	});

    /* DELETE /events/:id/calendar
	/* Deletes an item in an event calendar. Returns 204 on success.
	/*	id 	ID of the item
	*/

	$scope.removeFromCalendar = function(eventId){
		//save to localStorage and request from a service
        var Auth = 'Basic dGVzdC50ZXN0QHRlc3QudGVzdDp0ZXN0';   

        $http({
            url: CORSURL+APIURL+'events/'+eventId+'/calendar',
            method: 'DELETE',
            headers: {'Authorization': Auth},
            data: {userId:userId,}
            })
          .success(function successCallBack(response){
            // add response from API
            console.log('removed');
          }, 
          function errorCallBack(response){
          	console.log('failure at event removal');
        });      
	};

});
