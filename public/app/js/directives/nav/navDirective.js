angular.module('orderhound')
.directive('navDirective', function() {
  return {
    restrict: 'AE',
    templateUrl: './app/js/directives/nav/navTmpl.html',
    controller: 'navCtrl'
  }
})
