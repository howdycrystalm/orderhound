angular.module('orderhound')
.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('login', {
          ulr: '/',
          templateUrl: './public/views/login.html',
          controller: 'loginCtrl'
        })
})
