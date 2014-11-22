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
        templateUrl: 'views/campaigns.html',
        controller: 'CampaignsCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
