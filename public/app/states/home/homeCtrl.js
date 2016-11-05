angular.module('orderhound')
.controller('homeCtrl', function ($scope, homeService) {

  $scope.homeTest = "testing homeCtrl";

  $scope.test = homeService.message;
})
