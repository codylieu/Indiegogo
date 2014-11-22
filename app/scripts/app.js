'use strict';

/**
 * @ngdoc overview
 * @name indiegogoApp
 * @description
 * # indiegogoApp
 *
 * Main module of the application.
 */
angular
  .module('indiegogoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/campaigns', {
        templateUrl: 'views/campaigns.html',
        controller: 'CampaignsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
