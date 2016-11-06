angular.module('orderhound')
.controller('homeCtrl', function ($scope, homeService) {

  $scope.homeTest = "testing homeCtrl";

  $scope.test = homeService.message;

  $scope.addpo = function (ponum) {
    homeService.addpo(ponum).then(function (response) {
      //make a confirmation message, like checkin confirmed
      console.log('checkin successful');
    })
  }
})
