'use strict';

/**
 * @ngdoc function
 * @name indiegogoApp.controller:CampaignsCtrl
 * @description
 * # CampaignsCtrl
 * Controller of the indiegogoApp
 */
angular.module('indiegogoApp')
  .controller('CampaignsCtrl', function ($scope, $http, $window, $modal, $log) {

    $scope.campaigns = [];
    $scope.categories = [];
    $scope.selectedCategory = 'All'

    $http.get('https://api.indiegogo.com/1/campaigns.json?api_token=e377270bf1e9121da34cb6dff0e8af52a03296766a8e955c19f62f593651b346').
      success(function(data, status, headers, config) {
        $scope.campaigns = data.response;
        $scope.categories = _.uniq(_.pluck(_.pluck($scope.campaigns, 'category'), 'name'));
      });

    $scope.percentFundedRange = ['All', '50% - 75%', '75% - 100+%'];
    $scope.selectedPercentFundedRange = 'All';
    $scope.fundingType = ['All', 'Flexible', 'Fixed'];
    $scope.selectedFundingType = 'All';

    /*
     * Starts a campaign
     */
    $scope.startACampaign = function () {
      var modalInstance = $modal.open({
        templateUrl: 'views/new_campaign.html',
        controller: 'NewCampaignCtrl'
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.campaigns.push(selectedItem);
      })
    }

    /* Finds percentage of the Progress Bar to fill.
     * If percentage is greater than 100, it will just return 100.
     * Otherwise, it returns the true value of the percentage.
     */
    $scope.findProgressBarValue = function (campaign) {
      var percentage = $scope.findPercentageCollected(campaign);
      return (percentage > 100) ? 100 : percentage;
    };

    /* Calculates percentage of funds the campaign has collected compared with the goal */
    $scope.findPercentageCollected = function (campaign) {
      return Math.round(100 * campaign.collected_funds/campaign.goal);
    };

    /* Redirects to the campaign page */
    $scope.goToCampaignPage = function (campaign) {
      $window.location.href = "https://www.indiegogo.com/projects/" + campaign.slug;
    };

    /* Calculates how many days are left until campaign stops collecting funds
     * If the difference is less than 0, it just returns 0
     */
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
    };

    /* Switches the category used to filter the campaigns */
    $scope.switchCategory = function (category) {
      $scope.selectedCategory = category;
    };

    /* Switches the percent funded range used to filter the campaigns */
    $scope.switchPercentFundedRange = function (range) {
      $scope.selectedPercentFundedRange = range;
    };

    /* Switches the funding type used to filter the campaigns */
    $scope.switchFundingType = function (type) {
      $scope.selectedFundingType = type;
    };

    /* Decides whether to show a campaign based off the category selected */
    $scope.checkCategory = function (campaign) {
      if($scope.selectedCategory == 'All') {
        return true;
      }
      return $scope.selectedCategory == campaign.category.name;
    };

    /* Decides whether to show a campaign based off the percent funding range selected */
    $scope.checkPercentFundedRange = function (campaign) {
      if($scope.selectedPercentFundedRange == 'All') {
        return true;
      }
      var percentage = $scope.findPercentageCollected(campaign);
      if(($scope.selectedPercentFundedRange == '50% - 75%' && percentage >= 50 && percentage <= 75) ||
          ($scope.selectedPercentFundedRange == '75% - 100+%' && percentage >= 75)) {
        return true;
      }
      return false;
    };

    /* Decides whether to show a campaign based off the funding type selected */
    $scope.checkFundingType = function (campaign) {
      if($scope.selectedFundingType == 'All') {
        return true;
      }
      return $scope.selectedFundingType.toLowerCase() == campaign.funding_type;
    }

    /* Decides whether to show a campaign based off the filtering criteria */
    $scope.showCampaign = function (campaign) {
      return $scope.checkCategory(campaign) &&
                $scope.checkPercentFundedRange(campaign) &&
                $scope.checkFundingType(campaign);
    };

    /* Takes a string representing money and inserts commas at the appropriate places to make it more readable */
    $scope.createMoneyString = function (campaign) {
      var moneyString = campaign.collected_funds.toString();
      while (/(\d+)(\d{3})/.test(moneyString.toString())){
        moneyString = moneyString.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
      }
      return moneyString;
    };

  });
