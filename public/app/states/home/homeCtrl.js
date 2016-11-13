angular.module('orderhound')
.controller('homeCtrl', function ($scope, homeService, user) {

  $scope.test = homeService.message;

  $scope.addpo = function (ponum) {
    homeService.addpo(ponum).then(function (response) {
      //make a confirmation message, like checkin confirmed

    })
  };
//*****gives view employee_name, photo, checkpoint_name for the welcome message in home view from databse*****//
  $scope.welcomeAssets = function() {
    //call the function that's in service
    console.log('is this working?');
    homeService.welcomeAssets() //now we're calling welcomeAssets in the homeService, from homeCtrl
    .then(function(response) {
      console.log('this is our response', response)
      $scope.users

    })
  }
  $scope.welcomeAssets();
});
//trying code out below
// $scope.welcomeAssets = function() {
//   //call the function that's in service
//   console.log('is this working?');
//   homeService.welcomeAssets() //now we're calling welcomeAssets in the homeService, from homeCtrl
//   .then(function(response) {
//     console.log('this is our response', response)
//     $scope.welcomeAssets = response;
//   })
// }
// $scope.welcomeAssets()
// console.log('welcomeAssets is this: ', welcomeAssets());
//
// });
