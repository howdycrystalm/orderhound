angular.module('orderhound')
.controller('registerCtrl', function($scope, authService, $state) {
//
//       $scope.register = function(user) {
//           console.log(user);
//           authService.login(user).then(function(response) {
//               if (!response.data) {
//                   alert('User does not exist');
//                   $scope.user.password = '';
//               } else {
//                   $state.go('admin-home'); //takes us to home????
//               }
//           }).catch(function(err) {
//               alert('Unable to login');
//           });
//       };
//
// });

$scope.register = function(user) {
  console.log(user);
  authService.registerUser(user).then(function(response) {
    if (!response.data) {
      alert('Unable to create user');
    }
    else if (response.data){
      alert('User Created');
      $scope.newUser = {};
    }
    else {//why don't you work??????
      $state.go('admin-home');
    }
  }).catch(function(err) {
    alert('Unable to create user');
  });
};
});
