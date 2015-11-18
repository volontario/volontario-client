angular.module('lg.controllers')

.controller('UserCtrl', function($scope,$rootScope,$state,User) {

	$scope.user = User.get();
	var gender = $scope.user.gender;
	$scope.save = function(){
		$state.go('app.clothes')
		//$ionicHistory.goBack()
	}

	$scope.$on('$ionicView.leave', function(e) {
		if($scope.user.gender!==gender){
			$rootScope.$broadcast('filterChange');
		}
	})

})


