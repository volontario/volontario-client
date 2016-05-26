/* eslint no-alert:0 */
(function() {
  function MapController(
    $scope,
    $q,
    $ionicLoading,
    $compile,
    $timeout,
    $interval,
    $cordovaDatePicker,
    Categories,
    MapSettings,
    UPDATE_INTERVAL,
    dataFactory,
    $cordovaGeolocation
  ) {
    var markers = [];
    var markerObj = [];
    var infowindow = null;
    var updateMarkersPromise;
    var clearMarkers = function() {
      _.map(markerObj, function(item) {
        item.setMap(null);
      });
    };
    var loading; // eslint-disable-line no-unused-vars
    $scope.calendar = {};

    var animateCircle = function(id, traffic, time) {
      $timeout(function() {
        if (document.getElementById('circle_' + id)) {
          document.getElementById('circle_' + id).style.strokeDashoffset =
            (100 - traffic);
        }
      }, time);
    };

    var updateActive = function() {
      $scope.selectedCategories = Categories.getActive();
      console.log($scope.selectedCategories);
    };

    var updateMarkers = function() {
    };

    var initialize = function() {
      var mapOptions = MapSettings;
      var map = new google.maps.Map(document.getElementById('map'), mapOptions);
      $scope.map = map;

      map.addListener('zoom_changed', function() {
        _.map(markerObj, function(item, i) {
          var t = Math.round(markers[i].traffic.average * 100) || 0;
          animateCircle(i, t, 0);
        });
      });
    };

    initialize();

    $scope.clearAll = function() {
      clearMarkers();
      Categories.clear();
      updateActive();
    };

    $scope.centerOnMe = function() {
      if (!$scope.map) {
        return;
      }

      $scope.loading = $ionicLoading.show({
        content: 'Loading...',
        showBackdrop: false
      });

      navigator.geolocation.getCurrentPosition(function(pos) {
        $scope.map.setCenter(
          new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
        );
        $scope.loading.hide();
      }, function(error) {
        alert('Unable to get location: ' + error.message);
      });
    };

    var CalendarStart =
      '<div class="list" data-ec5-date>' +
      '<label class="item item-input item-stacked-label">' +
      '<input type="datetime-local" name="calendarStart" required ng-model="calendar.Start">' +
      '</label>';

    var CalendarEnd =
      '<div class="list" data-ec5-date>' +
      '<label class="item item-input item-stacked-label">' +
      '<input type="datetime-local" name="calendarEnd" required ng-model="calendar.End">' +
      '</label>';

    var searchLocations = function() {
      loading = $ionicLoading.show({
        content: 'Loading...',
        showBackdrop: false
      });

      $scope.addToCalendar = function(eventId) {
        // save to localStorage and request from a service
        var userId = '56a24593b42e9f03002b54b7';

        var from = $scope.calendar.Start;
        var to = $scope.calendar.End;
        var microFrom = new Date(from).getTime();
        var microTo = new Date(to).getTime();

        var data = {userId: userId, from: microFrom, to: microTo};
        dataFactory.postEventCalendarItem(eventId, data)
          .then(function() {
            // add response from API
            var successText = 'ilmoittautumisesi lähetettiin eteenpäin.';
            updateContent(successText);
          }, function() {
          });
      };

      // infoWindow new visuals after succesfull or unsuccesfull $http.
      function updateContent(content) {
        infowindow.setContent(content);
      }

      var selectedTags = Categories.getActive();
      clearMarkers();
      var locations = dataFactory.getLocations();
      var events = dataFactory.getEvents({tags: selectedTags});

      $q.all([locations, events]).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available

        // hide loader
        $timeout(function() {
          $ionicLoading.hide();
        });
        // var geocoder = new google.maps.Geocoder();
        var res = response[0].data.concat(response[1].data);
        var traffic;
        var tag;
        markers = [];
        markerObj = [];
        infowindow = new google.maps.InfoWindow({content: 'content'});
        // Clear previous update promise
        $interval.cancel(updateMarkersPromise);

        // Start new update process
        updateMarkersPromise = $interval(updateMarkers, UPDATE_INTERVAL);

        for (var i = 0; i < res.length; i++) {
          markers.push(res[i]);
          $scope.calendar.eventId = angular.toJson(res[i].id);
          var content = '<div>' + angular.toJson(res[i].name) || angular.toJson(res[i].title);
          content += '<br><a href=' + angular.toJson(res[i].url) + '>lue lisää..</a>';
          content += '<br>' + CalendarStart + '' + CalendarEnd;
          content += '<button class="btn waves-effect waves-light" ng-click="addToCalendar({{calendar.eventId}});" name="action">Lisää kalenteriin<i class="material-icons right"></i></button>';
          var compiled = $compile(content)($scope);

          tag = Categories.getIcon(res[i].category);
          var title = res[i].title;
          // this is still random
          traffic = 1;
          // define activity class
          var light = 'darkest';
          if (traffic < 25) {
            light = 'light';
          } else if (traffic < 50) {
            light = 'medium';
          } else if (traffic < 75) {
            light = 'dark';
          }

          // define label class
          var className = 'labels ' + light;

          // Get center
          var coords = new google.maps.LatLng(
            res[i].coordinates.latitude,
            res[i].coordinates.longitude
          );

          // Set marker also
          marker = new MarkerWithLabel({
            position: coords,
            map: $scope.map,
            title: title,
            icon: ' ',
            labelContent: '<span class="' + tag + '"></span><span class="ion-person-stalker activity icon">',
            labelAnchor: new google.maps.Point(18, 18),
            labelClass: className,
            content: compiled[0],
            html: content
          });
          markerObj.push(marker);
          animateCircle(i, traffic, 500);

          google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(this.content);
            infowindow.open($scope.map, this);
          });
        }
      }, function() {
        $ionicLoading.hide();
      });
    };

    $scope.categories = Categories.all();

    $scope.toggleCategory = function(id) {
      Categories.toggle(id);
      searchLocations();
      updateActive();
    };

    updateActive();
    searchLocations();
  }

  angular.module('lg.controllers').value('UPDATE_INTERVAL', '10000000')
    .controller('MapCtrl', MapController);
})();
