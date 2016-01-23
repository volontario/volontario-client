// kick off the platform web client
Ionic.io();

// this will give you a fresh user or the previously saved 'current user'
var user = Ionic.User.current();

// if the user doesn't have an id, you'll need to give it one.
if (!user.id) {
  user.id = Ionic.User.anonymousId();
  // user.id = 'your-custom-user-id';
}

//persist the user
user.save();

angular.module('lg', ['ionic','ionic.service.core','chart.js','ionic.service.analytics','lg.controllers','lg.services','transparentize','ionic.contrib.ui.tinderCards','ngStorage','ngTable','ngCordova'])

.run(function($ionicPlatform,$ionicAnalytics) {
  $ionicPlatform.ready(function() {

    $ionicAnalytics.register();

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider,$httpProvider,$ionicConfigProvider,$compileProvider) {
  


  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|file|blob|mailto|whatsapp|spotify):|data:image\//);


  $ionicConfigProvider.views.transition('none');
  $ionicConfigProvider.backButton.text('');

  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
        }
      }
    })
    
    .state('app.favorites', {
        url: '/favorites',
        views: {
          'menuContent': {
            templateUrl: 'templates/favorites.html',
            controller: 'SelectedCtrl'
          }
        }
    })

    .state('app.map', {
        url: '/map',
        views: {
          'menuContent': {
            templateUrl: 'templates/map.html',
            controller: 'MapCtrl'
          }
        }
    })

   .state('app.userActivity', {
        url: '/userActivity',
        views: {
          'menuContent': {
            templateUrl: 'templates/userActivity.html',
            controller: 'UserActivityCtrl'
          }
        }
    })


    .state('app.help', {
      url: '/help',
      views: {
        'menuContent': {
          templateUrl: 'templates/help.html'
        }
      }
    })

    .state('app.avatar', {
      url: '/user',
      views: {
        'menuContent': {
          templateUrl: 'templates/user.html',
          controller: 'UserCtrl'
        }
      }
    })

    .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/settings.html'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/map');
});
