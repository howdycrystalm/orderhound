angular.module('orderhound')
.controller('admin-homeCtrl', function ($scope, homeService) {

  $scope.test = homeService.message;

  $scope.addpo = function (ponum) {
    homeService.addpo(ponum).then(function (response) {
      //make a confirmation message, like checkin confirmed
      console.log('checkin successful');
    })
  }
})