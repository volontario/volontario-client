(function() {
  function ListController(
    $scope,
    $rootScope,
    $state,
    User,
    dataFactory,
    Categories,
    $q
  ) {

    var getLocations = function(){
    	var selectedTags = Categories.getActive();
	    var locations = dataFactory.getLocations();
	    var events = dataFactory.getEvents({tags: selectedTags});

	    $q.all([locations, events]).then(function successCallback(response) {
	      // this callback will be called asynchronously
	      // when the response is available
	      var res = response[0].data.concat(response[1].data);
	      $scope.data = res;
	    });
	};

    $scope.categories = Categories.all();

    $scope.toggleCategory = function(id) {
      Categories.toggle(id);
      getLocations();
    };
     getLocations();
  }

  angular.module('lg.controllers').controller('ListCtrl', ListController);
})();
