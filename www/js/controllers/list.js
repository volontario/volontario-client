angular.module('lg.controllers')

.controller('ListCtrl', function($scope,$rootScope,$state,$http, User, CORSURL, APIURL, Categories, $q) {

	var selectedTags = Categories.getActive();
	
	var locations = $http.get(CORSURL+APIURL+"/locations"),
	events = $http.get(CORSURL+APIURL+"/events?"+selectedTags);

	  $q.all([locations, events]).then(function successCallback(response) {
	    // this callback will be called asynchronously
	    // when the response is available
	    var res = response[0].data.concat(response[1].data);

	    console.log(res);
	    $scope.data = res;
	  
	});

   $scope.categories = Categories.all();

   $scope.toggleCategory = function(id){
        Categories.toggle(id);
        searchLocations();
        updateActive();
      };


});


