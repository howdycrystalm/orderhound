angular.module('orderhound',  ['ui.router']);

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
}])

angular.module('orderhound')
.controller('loginCtrl', ["$scope", function($scope) {
  $scope.test = "major tom to ground control";

  
}]);

angular.module('orderhound')
.controller('homeCtrl', ["$scope", "homeService", function ($scope, homeService) {

  $scope.homeTest = "testing homeCtrl";

  $scope.test = homeService.message;
}])

angular.module('orderhound')
.service('homeService', function () {

  this.message = "test"
  
})
