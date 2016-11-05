angular.module('orderhound',  ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('login', {
      url: '/',
      controller: 'loginCtrl',
      templateUrl: 'login/login.html'
    })
})
