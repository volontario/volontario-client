angular.module('lg.controllers', [])

.controller('AppCtrl', function($scope, $rootScope, $window,$ionicHistory, $timeout,$localStorage,$sessionStorage,$state,User) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Disable drag menu for Android
  var isAndroid = ionic.Platform.isAndroid();
  $scope.dragThreshold = isAndroid ? 0 : 20;
  $scope.isNotAndroid = !isAndroid;

  if(isAndroid){
    document.body.classList.add('android-device');
  }

  // Filtering
  $scope.goToState = function(state){
    $state.go(state);
  };

  $scope.goBack = function(){
    //console.log('back')

    $ionicHistory.nextViewOptions({
      //disableAnimate: true,
      disableBack: true
    });
    $window.history.go(-1);
    //$ionicHistory.goBack(-1);
  }


  $scope.user = User.get();
  
  $scope.filter = $localStorage.filter;
  if(!$localStorage.filter){
    $localStorage.filter = {
      color:[],
      gender:'mens'
    }
  }
  
  $scope.editAvatar = function(){
    $state.go('app.avatar');
  }

  $scope.changeGender = function(gender){
    $scope.user.gender = gender;
    filtersUpdated();
  }



// COLOR FILTERS
  $scope.toggleColorChange = function(){
    $scope.colorChooseMode = !$scope.colorChooseMode;
    if(!$scope.colorChooseMode){
      filtersUpdated();
    }
  }
  $scope.toggleColor = function(color){
    if(!$localStorage.filter.color.length){
      $localStorage.filter.color = [];
    }
    $localStorage.filter.color = $localStorage.filter.color.length && $localStorage.filter.color.indexOf(color) >= 0 ?  _.without($localStorage.filter.color,color) : $localStorage.filter.color.concat([color]);
  }
  $scope.activeColor = function(color){
    if(!$localStorage.filter.color){
      $localStorage.filter.color = [];
    }

    return ($localStorage.filter.color.length && $localStorage.filter.color.indexOf(color) >= 0);
  }
  $scope.clearColors = function() {
    $localStorage.filter.color = [];
  }


  var filtersUpdated = function(){
    $scope.$broadcast('filterChange');
  }

/*
  var updateClothCount = function(){
    $scope.clothCount = Math.floor(Math.random() * 999) + 1  
  }
  updateClothCount();
*/
  
  if(!$sessionStorage.total){
    $sessionStorage.total = {
      top:0,
      bottom:0
    }
  }
// Total 
  var calcTotal = function(){
    $scope.clothCount = ($sessionStorage.total.top + $sessionStorage.total.bottom)  || 0;  

  }
  $scope.$watch(
    function(){ return $sessionStorage.total.top || $sessionStorage.total.bottom },
    function(){
      calcTotal();
    }
  );
  calcTotal();

// Sort by
  $scope.sortOptions= [
   {label:'popular', value:'popularity'},
   {label:'price low', value:'priceAsc'},
   {label:'price high', value:'priceDesc'},
   {label:'sale', value:'sale'},
   {label:'new', value:'activationDate'}
  ]
  

  if(!$localStorage.sortby){
     $localStorage.sortby = 'popularity';
  }
  
  $scope.sortby = $localStorage.sortby;

  $scope.sortChanged= function(sortby){
    $localStorage.sortby = sortby;
    $timeout(function(){
      filtersUpdated();
    })
  }

// Show Clothing Section
  if(!$localStorage.show){
    $localStorage.show = {top:true,bottom:true };
  }
  
  $scope.show = $localStorage.show

  

})

.directive('noScroll', function() {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      $element.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})
