'use strict';

/**
 * @ngdoc function
 * @name indiegogoApp.controller:CampaignsCtrl
 * @description
 * # CampaignsCtrl
 * Controller of the indiegogoApp
 */
angular.module('indiegogoApp')
  .controller('CampaignsCtrl', function ($scope, $http, $window) {

    $scope.campaigns = [];
    $scope.categories = [];
    $scope.selectedCategory = 'All'

    $http.get('https://api.indiegogo.com/1/campaigns.json?api_token=e377270bf1e9121da34cb6dff0e8af52a03296766a8e955c19f62f593651b346').
      success(function(data, status, headers, config) {
        $scope.campaigns = data.response;
        $scope.categories = _.uniq(_.pluck(_.pluck($scope.campaigns, 'category'), 'name'));
      });

    $scope.findProgressBarValue = function (campaign) {
      var percentage = $scope.findPercentageCollected(campaign);
      if(percentage > 100) {
        return 100;
      }
      return percentage;
    }

    $scope.findPercentageCollected = function (campaign) {
      return Math.round(100 * campaign.collected_funds/campaign.goal);
    }

    $scope.goToCampaignPage = function (campaign) {
      $window.location.href = "https://www.indiegogo.com/projects/" + campaign.slug;
    }

    // Add in check for hours and check for 0
    $scope.daysLeft = function (campaign) {
      var today = new Date();
      var funding_ends_at = campaign.funding_ends_at;
      var yyyy = funding_ends_at.substring(0, 4);
      var mm = funding_ends_at.substring(5, 7);
      var dd = funding_ends_at.substring(8, 10);
      var campaignEndingDate = new Date(mm + '/' + dd + '/' + yyyy);
      var timeDiff = campaignEndingDate.getTime() - today.getTime();
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if(diffDays < 0) {
        return 0;
      }
      return diffDays + 1;
    }

    $scope.switchCategory = function (category) {
      $scope.selectedCategory = category;
    }

    $scope.showCampaign = function (campaign) {
      if($scope.selectedCategory == 'All') {
        return true;
      }
      return $scope.selectedCategory == campaign.category.name;
    }

    $scope.createMoneyString = function (campaign) {
      var moneyString = campaign.collected_funds.toString();
      while (/(\d+)(\d{3})/.test(moneyString.toString())){
        moneyString = moneyString.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
      }
      return moneyString;
    }

  });
