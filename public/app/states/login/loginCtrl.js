angular.module('orderhound')
    .controller('loginCtrl', function($scope, authService, $state) {
        $scope.test = "major tom to ground control";
        //**********************DELETE THIS BEFORE PRESENTING AND HOSTING*********************//
        // $scope.user = {
        //   name: 'Quinn',
        //   password: 'q'
        // }
        //***********************************************************************************//
        $scope.login = function(user) {
            authService.login(user).then(function(response) {

                if (!response.data) {
                    $scope.user.password = '';
                    return alert('User does not exist'); //if something breaks, take out 'return'

                } else if (response.data.admin) {
                    $state.go('admin-home');
                } else {

                    $state.go('home');
                }
            }).catch(function(err) { //.catch gets the error that is returned
                $scope.user.password = '';
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
