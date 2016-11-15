angular.module('orderhound')
.controller('mapCtrl', function($scope, mapService) {

  $scope.message = "hi, lets do this";

  $scope.findpo = function (testing) {
    mapService.findpo(testing).then(function (response) {
      //make a confirmation message, like checkin confirmed

    })
  };

//SUDO CODE FROM ALEX
// $scope.getIt = function(){
    //return what you want from the database on scope
    //then in the html bind it with an ng-repeat similar to other blue dots
// }()

//$(function){
//  $('.cat').css(){}
//  $()
//}

});
