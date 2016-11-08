angular.module('orderhound',  ['ui.router']);

angular.module('orderhound')
.controller('admin-homeCtrl', ["$scope", "homeService", function ($scope, homeService) {

  $scope.test = homeService.message;

  $scope.addpo = function (ponum) {
    homeService.addpo(ponum).then(function (response) {
      //make a confirmation message, like checkin confirmed
      console.log('checkin successful');
    })
  }
}])

angular.module('orderhound')
.controller('homeCtrl', ["$scope", "homeService", function ($scope, homeService) {

  $scope.test = homeService.message;

  $scope.addpo = function (ponum) {
    homeService.addpo(ponum).then(function (response) {
      //make a confirmation message, like checkin confirmed
      console.log('checkin successful');
    })
  }
}])

angular.module('orderhound')
.service('homeService', ["$http", function ($http) {

  this.addpo = function (ponumber) {
    return $http ({
      method: 'POST',
      url: '/checkin',
      data: { //this is the body! req.body on the other side, the server side
        ponumber: ponumber, //this is not that. its variable in line 4
        checkpoint_id: 1
      }
    }).then(function (response) { //this will pretty much be the same for all of my service functions
      console.log('is gonna return?');
      return response.data;
    })
 }


}])

angular.module('orderhound')
.controller('loginCtrl', ["$scope", function($scope) {
  $scope.test = "major tom to ground control";

  
}]);

angular.module('orderhound')
.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('login', {
      url: '/login',
      controller: 'loginCtrl',
      templateUrl: 'app/states/login/login.html'
    })

    .state('home',  {
      url: '/',
      controller: 'homeCtrl',
      templateUrl: 'app/states/home/home.html'
    })

    .state('admin-home', {
      url: '/admin-home',
      controller: 'admin-homeCtrl',
      templateUrl: 'app/states/admin-home/admin-home.html'
    })
}])
