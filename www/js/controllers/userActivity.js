angular.module('lg.controllers')

.controller('UserActivityCtrl', function($scope,$rootScope,$state, $http, CORSURL, APIURL, User) {

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
});
