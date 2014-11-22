'use strict';

/**
 * @ngdoc function
 * @name indiegogoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the indiegogoApp
 */
angular.module('indiegogoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
