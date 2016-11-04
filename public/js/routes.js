angular.module('orderhound')
.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url:'/',
      template: '<div>hi, im coming from routes.js</div>'
    })

    .state('addpo', {
      url: '/addpo',
      templateUrl: './public/views/addpo.html',
      controller: 'loginCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: './public/views/login.html',
      controller: 'addpoCtrl'
    })

})
