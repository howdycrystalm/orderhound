angular.module('orderhound')
.config(function ($stateProvider, $urlRouterProvider) {

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
})
