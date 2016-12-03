angular.module('orderhound')
.controller('admin-homeCtrl', function ($scope, adminService, user) {

  $scope.name = function(employee_name) {
    adminService.name(employee_name).then(function (response) {
    })
  }

  $scope.addpo = function (ponum) {
    adminService.addpo(ponum).then(function (response) {
      //make a confirmation message, like checkin confirmed

    })
  }

  //*****gives view employee_name, photo, checkpoint_name for the welcome message in home view from databse*****//
    $scope.welcomeAssets = function() {
      //call the function that's in service
      console.log('is this operating?');
      adminService.welcomeAssets() //now we're calling welcomeAssets in the homeService, from homeCtrl
      .then(function(response) {
        console.log('this is our response', response)
        console.log(response.data[1].employee_name + " HELLLLLLLOOOO");
        $scope.response = response.data;

      })
    }
    $scope.welcomeAssets();
   });
