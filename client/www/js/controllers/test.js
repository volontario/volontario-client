angular.module('lg.controllers')

.controller('TestCtrl', function($scope, $timeout) {

	$scope.testimgs = {
		asos: [ 
			'http://images.asos-media.com/inv/media/1/3/9/5/5655931/charcoal/image1xl.jpg',
	   		'http://images.asos-media.com/inv/media/3/2/8/9/5309823/darkblue/image1xxl.jpg'],
	   	boozt: [
	   		'http://images2.booztx.com/superdry/1300x1700/sdm40le017f1_ontarionavych.jpg',
	   		'http://images3.booztx.com/lee-jeans/1300x1700/ljsl719jbuw_coalcity.jpg'
	   	],
	   	zalando:[
	   		'https://secure-i6.ztat.net//large/AD/12/2O/04/SQ/11/AD122O04S-Q11@12.jpg',
	   		'https://secure-i4.ztat.net//large/OS/32/2E/00/0N/11/OS322E000-N11@14.jpg'
	   	],
	   	reima:[
	   		'http://www.reimashop.fi/medias/sys_master/images/8877230489630.png',
	   		'http://www.reimashop.fi/medias/sys_master/images/8877913767966.png'
	   	],
	   	marimekko:[
	   		'https://marimekko.com/media/catalog/product/cache/1/image/890x1338/17f82f742ffe127f42dca9de82fb58b1/0/4/042814-990_40.jpg',
	   		''
	   	]
	 }

	 _.map($scope.testimgs,function(shop,index){
	 	
	 	shop = _.map(shop,function(imgUrl) {
	 		return imgUrl ? imgUrl : '';
	 	});
	 	$scope.testimgs[index] = shop;
	 	
	 })

	 $scope.changeStore = function(){
	 	$scope.hideCloth = true;
	 	$timeout(function(){$scope.hideCloth=false});
	 }


})