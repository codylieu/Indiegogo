'use strict';

/**
 * @ngdoc function
 * @name indiegogoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the indiegogoApp
 */
angular.module('indiegogoApp')
  .controller('NewCampaignCtrl', function ($scope, $modalInstance) {

    $scope.campaign = {
      title: '',
      tagline: '',
      category: {
        name: ''
      },
      goal: '',
      collected_funds: '',
      funding_ends_at: '',
      slug: '',
      funding_type : '',
      baseball_card_image_url: ''
    };

    $scope.addCampaign = function () {
      $modalInstance.close($scope.campaign);
    }

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    }

  });
