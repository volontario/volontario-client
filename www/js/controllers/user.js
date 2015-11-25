angular.module('lg.controllers')
 .value('CORSURL', '//cors-anywhere.herokuapp.com/')
 .value('APIURL', 'https://volontario-server.herokuapp.com/')
.controller('UserCtrl', function($scope,$rootScope,$state,$http, CORSURL, APIURL) {

	$scope.user = {};
	 
	 $http.get(CORSURL+APIURL+'/users/5655c20b1f771103001ff9bd').then(function successCallBack(response){
		$scope.user = response.data;
	}, function errorCallBack(response){

	})
})


