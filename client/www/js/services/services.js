angular.module('lg.services',[])

.value('corsURL', 'https://this-cors.herokuapp.com/')
//.value('corsURL', '')

.value('articleAPI', '')
.value('outfitAPI','')
.constant('eurToPound','1.36920393')

.factory('Currency',function(eurToPound){
	return {
		poundToEuro:function(price1,price2){
			price1 = price1 || 0;
			price2 = price2 || 0;
			return (Math.floor(((price1 + price2)*eurToPound)*10) / 10)
		}
	}
})

.factory('Clothes', function($http, $q, corsURL, articleAPI) {
	return {

		get: function(category,sortby,filters,page,limit,imgtype) {

				var colors = _.reduce(filters.color || [], function(memo, color){ return memo ? memo + '&color='+color : '?color='+color },'' );

				var imgSize = imgtype || 'mediumUrl';
				var deferred = $q.defer();
				var CORS = ionic.Platform.isWebView() ? '' : corsURL;
				
					$http.get(CORS+articleAPI+colors,{
						params:{
							sort: sortby || 'popularity',
							category:category,
							page: page,
							pageSize:limit || 5
						},
						headers: {
						  'Accept-Language':'fi',
						  'x-client-name': 'sviit',
				      'x-requested-with': 'XMLHttpRequest'
				    }
					})
					.success(function(data, status, header, config){

						var clothes = [];
						_.map(data.content,function(piece){
							if(piece.media.images[0][imgSize]){
								clothes.push( 
									{
										image: piece.media.images[0][imgSize],
										name: piece.name,
										available: piece.available,
										brand: piece.brand.name,
										price: piece.units[0].price.value,
										id: piece.id,
										modelId: piece.modelId,
										shopUrl: piece.shopUrl
									} 
								)
							}
						})

						var result = {
							clothes:clothes,
							totalElements:data.totalElements,
							totalPages : data.totalPages,
							page: data.page,
							size: data.size
						}

						deferred.resolve(result);

					})
					.error(function(data, status){
						deferred.reject(data);
					});
				
				return deferred.promise;
		}
	}
})

.factory('Selected', function(Outfits,$localStorage,$rootScope) {

    if(!$localStorage.selected){
      	$localStorage.selected = [];
    }

    return {
      get: function(){
        return $localStorage.selected;
      },
      set:function(data){
      	$localStorage.selected = data;
      },
      add:function(data){
      	if(!$localStorage.selected)
      		$localStorage.selected = [];
        $localStorage.selected.unshift(data);


        Outfits.create(
        	data.gender,
        	_.merge({position:'top'},data.top),
        	_.merge({position:'bottom'},data.bottom)
        	)


      },
      clear:function(){
      	$localStorage.selected = [];
      },
      remove: function(index) {
         $localStorage.selected.splice(index, 1);
      },
      removeCertain: function(setToAdd){
      	console.log('removing ',setToAdd)
      	var existingItems = _.filter($localStorage.selected,function(item){
      		return item.top.id !== setToAdd.top.id || item.bottom.id !== setToAdd.bottom.id;
      	})

      	$localStorage.selected = Array.prototype.slice.call(existingItems, 0);
      	$rootScope.$broadcast('selectedChange');
      }

    };

})


/*
	{
	gender: String,
	clothes:[{
		storeId: String,
		id: String,
		name:String,
		position:String,
		price:String,
		color:String,
		img: String, 
		available:Boolean
	}]
	}
*/

.factory('Outfits', function($http,$q,outfitAPI) {
	return {
		create: function(gender,outfit1,outfit2){
			
			$http.post(outfitAPI,{
				gender: gender,
				clothes: [outfit1,outfit2]
			}).success(function(result){
				console.log('Saved ', result)
			})

		}
	}

})

.factory('User', function($localStorage,$rootScope) {



	// Init with defaults
    if(!$localStorage.user){
      	$localStorage.user = {
			gender:'mens',
			skin:'medium',
			hair:'dark',
			hairlength:'long', // For women
			beard:true,
			hairtype:'short' // for men
		}
    }

    return {
      get: function(){
        return $localStorage.user;
      }
    };

})
