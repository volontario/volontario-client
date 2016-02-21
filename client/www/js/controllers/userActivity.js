angular.module('lg.controllers')

.controller('UserActivityCtrl', function($scope,$rootScope, $state, dataFactory) {

    var userId = $scope.user.id;//"56a24593b42e9f03002b54b7";

	var searchEvents = function(){

    dataFactory.getUserEvents(userId)
    .then(function successCallBack(response){
		$scope.userEvents = response.data;
		 }, function errorCallBack(response){

	 });
  };

	$scope.removeFromCalendar = function(eventId,uniqueId){
		//save to localStorage and request from a service
        dataFactory.deleteEventCalendarItem(eventId, uniqueId)
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
