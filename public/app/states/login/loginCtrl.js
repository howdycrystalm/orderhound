angular.module('orderhound')
    .controller('loginCtrl', function($scope, authService, $state) {
        $scope.test = "major tom to ground control";

        $scope.login = function(user) {
            console.log(user);
            authService.login(user).then(function(response) {
                if (!response.data) {
                    alert('User does not exist');
                    $scope.user.password = '';
                } else {
                  console.log("is it running?");
                    $state.go('home'); //takes us to home????
                }
            }).catch(function(err) {
                alert('Unable to login');
            });
        };
    });

//REFER TO THIS CODE WHEN TIME TO REGISTER BUSINESS
//   $scope.register = function(user) {
//       authService.registerUser(user).then(function(response) {
//         if (!response.data) {
//           alert('Unable to create user');
//         } else {
//           alert('User Created');
//           $scope.newUser = {};
//         }
//       }).catch(function(err) {
//         alert('Unable to create user');
//       });
//     };
// });
