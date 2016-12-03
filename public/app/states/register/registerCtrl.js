angular.module('orderhound')
    .controller('registerCtrl', function($scope, authService, $state) {
        //
        //       $scope.register = function(user) {
        //
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
            authService.registerUser(user).then(function(response) {
                if (!response.data) {
                    $scope.user.password = '';
                    return alert('Unable to create user');
                } else if (response.data) {
                    alert('User Created! Please login.');
                    // $scope.newUser = {};
                    $state.go('login');
                }
            }).catch(function(err) {
                $scope.user.password = '';
                alert('Unable to create user');
            });
        };
    });
