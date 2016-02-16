angular.module('lg.services',[])

.service('LoginService', function($q, $http, $localStorage,API_ROOT,$ionicPopup) {
    return {
        loginUser: function(phoneNumber, pw) {
            var deferred = $q.defer();
            
            var promise = $http({
			    method: 'POST',
			    url: API_ROOT+'/device/login-two-factor',
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			    transformRequest: function(obj) {
			        var str = [];
			        for(var p in obj)
			        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			        return str.join("&");
			    },
			    data: {
			    	// login data
			    }
			}).success(function (data) {
			// Init with defaults
		      	$localStorage.token = {
					token: data.token,
				}
				
			 $http.get(API_ROOT+'/customer/profile?token='+ data.token).then(function successCallBack(response){
				user = response.data;
			// Init with defaults
		      	$localStorage.user = {
					givenName: user.givenName,
					familyName: user.familyName,
					phoneNumber: user.phoneNumber,
					email: user.email, 
					id: user.id,
					dateOfBirth: user.dateOfBirth 
				}
		    
			}, function errorCallBack(response){

			})
		    	console.log($localStorage.user);
		    	console.log($localStorage.token);
				return user.givenName;
			}).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
 
            if (name) {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})


.factory('User', function($localStorage,$rootScope, $http, CORS_PROXY, API_ROOT) {
    return {
      get: function(){
	 $http.get(CORS_PROXY+API_ROOT+'/users/56a24593b42e9f03002b54b7').then(function successCallBack(response){
		user = response.data;
			// Init with defaults
		      	$localStorage.user = {
					givenName: user.givenName,
					familyName: user.familyName,
					phoneNumber: user.phoneNumber,
					email: user.email, 
					id: user.id,
					dateOfBirth: user.dateOfBirth 
				}
		    
			}, function errorCallBack(response){

			})
        return $localStorage.user;
      }
    };

})
