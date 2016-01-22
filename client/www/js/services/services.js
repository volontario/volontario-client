angular.module('lg.services',[])

.value('CORSURL', '//cors-anywhere.herokuapp.com/')
.value('APIURL', 'https://volontario-server.herokuapp.com/')



.factory('User', function($localStorage,$rootScope, $http, CORSURL, APIURL) {
    return {
      get: function(){
	 $http.get(CORSURL+APIURL+'/users/56a24593b42e9f03002b54b7').then(function successCallBack(response){
		user = response.data;
			// Init with defaults
		      	$localStorage.user = {
					givenName: user.givenName,
					familyName: user.familyName,
					phoneNumber: user.phoneNumber,
					email: user.email, // For women
					id: user.id,
					dateOfBirth: user.dateOfBirth // for men
				}
		    
			}, function errorCallBack(response){

			})
        return $localStorage.user;
      }
    };

})
