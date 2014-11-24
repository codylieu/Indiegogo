'use strict';

describe('Controller: CampaignsCtrl', function () {

  // load the controller's module
  beforeEach(module('indiegogoApp'));

  var CampaignsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CampaignsCtrl = $controller('CampaignsCtrl', {
      $scope: scope
    });
  }));

  describe('should return the correct value for the progress bar', function () {
    it('should return 0 for the progress bar value if the percentage is 0', function () {
      var campaign = {collected_funds: 0, goal: 100};
      expect(scope.findProgressBarValue(campaign)).toBe(0);
    });

    it('should return 50 for the progress bar value if the percentage is 50', function () {
      var campaign = {collected_funds: 50, goal: 100};
      expect(scope.findProgressBarValue(campaign)).toBe(50);
    });

    it('should return 100 for the progress bar value if the percentage is 100', function () {
      var campaign = {collected_funds: 100, goal: 100};
      expect(scope.findProgressBarValue(campaign)).toBe(100);
    });

    it('should return 100 for the progress bar value if the percentage exceeds 100', function () {
      var campaign = {collected_funds: 200, goal: 100};
      expect(scope.findProgressBarValue(campaign)).toBe(100);    
    });
  });

  describe('should return the correct percentage for funds collected', function () {
    it('should return 0 if the percentage is 0', function () {
      var campaign = {collected_funds: 0, goal: 100};
      expect(scope.findPercentageCollected(campaign)).toBe(0);
    });

    it('should return 50 if the percentage is 50', function () {
      var campaign = {collected_funds: 50, goal: 100};
      expect(scope.findPercentageCollected(campaign)).toBe(50);
    });

    it('should return 100 if the percentage is 100', function () {
      var campaign = {collected_funds: 100, goal: 100};
      expect(scope.findPercentageCollected(campaign)).toBe(100);
    });

    it('should return 200 if the percentage is 200, even if it exceeds 100', function () {
      var campaign = {collected_funds: 200, goal: 100};
      expect(scope.findPercentageCollected(campaign)).toBe(200);
    });
  });

  describe('should calculate the correct days left until the campaign stops', function () {
    it('should return 0 if the campaign has already ended', function () {
      var campaign = {funding_ends_at: '2013-05-25'};
      expect(scope.daysLeft(campaign)).toBe(0);
    });

    it('should return 10 if the campaign ends in 10 days inclusive of the current date', function () {
      var date = new Date();
      date.setDate(date.getDate() + 9);
      var yyyy = date.getFullYear();
      var mm = date.getMonth() + 1;
      var dd = date.getDate();
      var campaign = {funding_ends_at: yyyy + '-' + mm + '-' + dd};
      expect(scope.daysLeft(campaign)).toBe(10);
    });
  });

  describe('should switch to the correct category', function () {
    it('should switch to All Categories', function () {
      scope.switchCategory('All');
      expect(scope.selectedCategory).toEqual('All');
    });

    it('should switch to the Technology category', function () {
      scope.switchCategory('Technology');
      expect(scope.selectedCategory).toEqual('Technology');
    });

    it('should switch to the Community category', function () {
      scope.switchCategory('Community');
      expect(scope.selectedCategory).toEqual('Community');
    });
  });

  describe('should switch to the correct percent funded range', function () {
    it('should switch to All percent funded range', function () {
      scope.switchPercentFundedRange('All');
      expect(scope.selectedPercentFundedRange).toEqual('All');
    });

    it('should switch to 50% - 75% funded range', function () {
      scope.switchPercentFundedRange('50% - 75%');
      expect(scope.selectedPercentFundedRange).toEqual('50% - 75%');
    });

    it('should switch to greater than 75% funded range', function () {
      scope.switchPercentFundedRange('75% - 100+%');
      expect(scope.selectedPercentFundedRange).toEqual('75% - 100+%');
    });
  });

  describe('should switch to the correct funding type', function () {
    it('should switch to All funding types', function () {
      scope.switchFundingType('All');
      expect(scope.selectedFundingType).toEqual('All');
    });

    it('should switch to Flexible funding type', function () {
      scope.switchFundingType('Flexible');
      expect(scope.selectedFundingType).toEqual('Flexible');
    });

    it('should switch to Fixed funding type', function () {
      scope.switchFundingType('Fixed');
      expect(scope.selectedFundingType).toEqual('Fixed');
    });
  });

  describe('should only show campaigns of the selected category', function () {
    it('should show all campaigns if All Categories is selected', function () {
      scope.switchCategory('All');

      var campaign = {category: {name: 'Technology'}};
      expect(scope.showCampaign(campaign)).toBeTruthy();

      var campaign = {category: {name: 'Education'}};
      expect(scope.showCampaign(campaign)).toBeTruthy();
    });

    it('should show only campaigns from Technology if Technology is selected', function () {
      scope.switchCategory('Technology');

      var campaign = {category: {name: 'Technology'}};
      expect(scope.showCampaign(campaign)).toBeTruthy();

      var campaign = {category: {name: 'Education'}};
      expect(scope.showCampaign(campaign)).toBeFalsy();
    });

    it('should show only campaigns from Education if Education is selected', function () {
      scope.switchCategory('Education');

      var campaign = {category: {name: 'Technology'}};
      expect(scope.showCampaign(campaign)).toBeFalsy();

      var campaign = {category: {name: 'Education'}};
      expect(scope.showCampaign(campaign)).toBeTruthy();
    });
  });

  describe('should only show campaigns with the selected percent funded range', function () {
    it('should show all campaigns if All percent funded ranges is selected', function () {
      scope.switchPercentFundedRange('All');

      var campaign = {collected_funds: 25, goal: 100};
      expect(scope.checkPercentFundedRange(campaign)).toBeTruthy();

      var campaign = {collected_funds: 60, goal: 100};
      expect(scope.checkPercentFundedRange(campaign)).toBeTruthy();

      var campaign = {collected_funds: 90, goal: 100};
      expect(scope.checkPercentFundedRange(campaign)).toBeTruthy();

      var campaign = {collected_funds: 200, goal: 100};
      expect(scope.checkPercentFundedRange(campaign)).toBeTruthy();
    });

    it('should show only campaigns with 50% to 75% funding', function () {
      scope.switchPercentFundedRange('50% - 75%');

      var campaign = {collected_funds: 25, goal: 100};
      expect(scope.checkPercentFundedRange(campaign)).toBeFalsy();

      var campaign = {collected_funds: 60, goal: 100};
      expect(scope.checkPercentFundedRange(campaign)).toBeTruthy();

      var campaign = {collected_funds: 90, goal: 100};
      expect(scope.checkPercentFundedRange(campaign)).toBeFalsy();

      var campaign = {collected_funds: 200, goal: 100};
      expect(scope.checkPercentFundedRange(campaign)).toBeFalsy();
    });

    it('should show only campaigns with greater than 75% funding', function () {
      scope.switchPercentFundedRange('75% - 100+%');

      var campaign = {collected_funds: 25, goal: 100};
      expect(scope.checkPercentFundedRange(campaign)).toBeFalsy();

      var campaign = {collected_funds: 60, goal: 100};
      expect(scope.checkPercentFundedRange(campaign)).toBeFalsy();

      var campaign = {collected_funds: 90, goal: 100};
      expect(scope.checkPercentFundedRange(campaign)).toBeTruthy();

      var campaign = {collected_funds: 200, goal: 100};
      expect(scope.checkPercentFundedRange(campaign)).toBeTruthy();
    });
  });

  describe('should only show campaigns with the selected funding type', function () {
    it('should show all campaigns if All funding type is selected', function () {
      scope.switchFundingType('All');

      var campaign = {funding_type: 'flexible'};
      expect(scope.checkFundingType(campaign)).toBeTruthy();

      var campaign = {funding_type: 'fixed'};
      expect(scope.checkFundingType(campaign)).toBeTruthy();
    });

    it('should show only campaigns with Flexible funding type', function () {
      scope.switchFundingType('Flexible');

      var campaign = {funding_type: 'flexible'};
      expect(scope.checkFundingType(campaign)).toBeTruthy();
      
      var campaign = {funding_type: 'fixed'};
      expect(scope.checkFundingType(campaign)).toBeFalsy();
    });

    it('should show only campaigns with Fixed funding type', function () {
      scope.switchFundingType('fixed');

      var campaign = {funding_type: 'flexible'};
      expect(scope.checkFundingType(campaign)).toBeFalsy();
      
      var campaign = {funding_type: 'fixed'};
      expect(scope.checkFundingType(campaign)).toBeTruthy();
    });
  });

  describe('should create a string representation of a number with commas in the correct places', function () {
    it('should not insert any commas for numbers of 3 digits or less', function () {
      var campaign = {collected_funds: 1};
      expect(scope.createMoneyString(campaign)).toBe('1');

      var campaign = {collected_funds: 10};
      expect(scope.createMoneyString(campaign)).toBe('10');

      var campaign = {collected_funds: 100};
      expect(scope.createMoneyString(campaign)).toBe('100');
    });

    it('should insert one comma for numbers between 4 and 6 digits', function () {
      var campaign = {collected_funds: 1000};
      expect(scope.createMoneyString(campaign)).toBe('1,000');

      var campaign = {collected_funds: 10000};
      expect(scope.createMoneyString(campaign)).toBe('10,000');

      var campaign = {collected_funds: 100000};
      expect(scope.createMoneyString(campaign)).toBe('100,000');
    });

    it('should insert two commas for numbers between 7 and 9 digits', function () {
      var campaign = {collected_funds: 1000000};
      expect(scope.createMoneyString(campaign)).toBe('1,000,000');

      var campaign = {collected_funds: 10000000};
      expect(scope.createMoneyString(campaign)).toBe('10,000,000');

      var campaign = {collected_funds: 100000000};
      expect(scope.createMoneyString(campaign)).toBe('100,000,000');
    });
  });

});
