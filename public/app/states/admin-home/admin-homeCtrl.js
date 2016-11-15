angular.module('orderhound')
.controller('admin-homeCtrl', function ($scope, homeService, user) {

  $scope.test = homeService.message;
  $scope.name = function(employee_name) {
    adminService.name(employee_name).then(function (response) {
    })
  }

  $scope.addpo = function (ponum) {
    homeService.addpo(ponum).then(function (response) {
      //make a confirmation message, like checkin confirmed

    })
  }


})
