'use strict';

/**
 * @ngdoc function
 * @name indiegogoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the indiegogoApp
 */
angular.module('indiegogoApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
