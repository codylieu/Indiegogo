"use strict";angular.module("indiegogoApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/campaigns.html",controller:"CampaignsCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("indiegogoApp").controller("AboutCtrl",["$scope",function(){}]),angular.module("indiegogoApp").controller("CampaignsCtrl",["$scope","$http","$window",function(a,b,c){a.campaigns=[],a.categories=[],a.selectedCategory="All",b.get("https://api.indiegogo.com/1/campaigns.json?api_token=e377270bf1e9121da34cb6dff0e8af52a03296766a8e955c19f62f593651b346").success(function(b){a.campaigns=b.response,a.categories=_.uniq(_.pluck(_.pluck(a.campaigns,"category"),"name"))}),a.percentFundedRange=["All","50% - 75%","75% - 100+%"],a.selectedPercentFundedRange="All",a.fundingType=["All","Flexible","Fixed"],a.selectedFundingType="All",a.findProgressBarValue=function(b){var c=a.findPercentageCollected(b);return c>100?100:c},a.findPercentageCollected=function(a){return Math.round(100*a.collected_funds/a.goal)},a.goToCampaignPage=function(a){c.location.href="https://www.indiegogo.com/projects/"+a.slug},a.daysLeft=function(a){var b=new Date,c=a.funding_ends_at,d=c.substring(0,4),e=c.substring(5,7),f=c.substring(8,10),g=new Date(e+"/"+f+"/"+d),h=g.getTime()-b.getTime(),i=Math.ceil(h/864e5);return 0>i?0:i+1},a.switchCategory=function(b){a.selectedCategory=b},a.switchPercentFundedRange=function(b){a.selectedPercentFundedRange=b},a.switchFundingType=function(b){a.selectedFundingType=b},a.checkCategory=function(b){return"All"==a.selectedCategory?!0:a.selectedCategory==b.category.name},a.checkPercentFundedRange=function(b){if("All"==a.selectedPercentFundedRange)return!0;var c=a.findPercentageCollected(b);return"50% - 75%"==a.selectedPercentFundedRange&&c>=50&&75>=c||"75% - 100+%"==a.selectedPercentFundedRange&&c>=75?!0:!1},a.checkFundingType=function(b){return"All"==a.selectedFundingType?!0:a.selectedFundingType.toLowerCase()==b.funding_type},a.showCampaign=function(b){return a.checkCategory(b)&&a.checkPercentFundedRange(b)&&a.checkFundingType(b)},a.createMoneyString=function(a){for(var b=a.collected_funds.toString();/(\d+)(\d{3})/.test(b.toString());)b=b.toString().replace(/(\d+)(\d{3})/,"$1,$2");return b}}]);