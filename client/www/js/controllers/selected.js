angular.module('lg.controllers')

.controller('SelectedCtrl', function($scope, $rootScope, $timeout, $window, Selected, $localStorage, Currency,eurToPound) {


	$scope.selected = Selected.get();

	$scope.$on('selectedChange',function(){
		$scope.selected = Selected.get();
	});

	$scope.calcPrice = function(price1,price2){
		return Currency.poundToEuro(price1,price2)
	}

	$scope.removeFromSelected = function(index){
		Selected.remove(index);
	}

	$scope.clearSelected = function(){
		if(confirm('Clear favorites?')){
			Selected.clear();
			$scope.selected = Selected.get();
		}
	}



	$scope.getTimeAgo = function(ago) {
	  var diff = (new Date().getTime() - ago) / 60000; // minutes

	  if(diff < 60)
	    return Math.round(diff) + 'm';
	  else if(diff < 60 * 24)
	    return Math.round(diff/60) + 'h';
	  else
	    return Math.round(diff/60/24) + 'd';
	}


	$scope.actions = {
		wear:function(item){
			$rootScope.$broadcast('showCloth',item);
		},
		share: function(item){
			//whatsapp://send?text=Tässä uusi ostoslistamme http%3A%2F%2Fostoslista.mobi%2Findex.html%23%2Fid%2F-Jzkehkduruok53G1o15


			var link = 'whatsapp://send?text=Set of clothes for you: 1) '+item.top.shopUrl+' 2) '+item.bottom.shopUrl +' Total: '+ Math.round(eurToPound*(item.top.price+item.bottom.price)) +'€';

			$window.open(link);
			
			return false;
		},
		buy: function(item){
			var topOrBottom = Math.round(Math.random()) ? 'top' : 'bottom';
			$window.open(item[topOrBottom].shopUrl);
			//$window.open(item.bottom.shopUrl,'_blank');
			//$window.open(item.top.shopUrl,'_blank');

		}
	}


})