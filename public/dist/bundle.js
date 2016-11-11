angular.module('orderhound',  ['ui.router']);

angular.module('orderhound')
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/')

        $stateProvider
            .state('login', {
                url: '/login',
                controller: 'loginCtrl',
                templateUrl: 'app/states/login/login.html'
            })
            .state('home', {
                url: '/',
                controller: 'homeCtrl',
                templateUrl: 'app/states/home/home.html',
                resolve: {
                    user: ["authService", "$state", function(authService, $state) {
                        return authService.getCurrentUser()
                            .then(function(response) {
                                if (!response.data)
                                    $state.go('login');
                                return response.data;
                            })
                            .catch(function(err) {
                                $state.go('login');
                            });
                    }]
                }
            })
            .state('register', {
                url: '/register',
                controller: 'registerCtrl',
                templateUrl: 'app/states/register/register.html',
            })
            .state('admin-home', {
                url: '/admin-home',
                controller: 'admin-homeCtrl',
                templateUrl: 'app/states/admin-home/admin-home.html',
                resolve: {
                    user: ["authService", "$state", function(authService, $state) {
                        return authService.getCurrentUser()
                            .then(function(response) {
                                if (!response.data)
                                    $state.go('login');
                                return response.data;
                            })
                            .catch(function(err) {
                                $state.go('login');
                            });
                    }]
                }
            })
            .state('edit', {
                url: '/edit',
                controller: 'editCtrl',
                templateUrl: 'app/states/edit/edit.html',
                resolve: {
                    user: ["authService", "$state", function(authService, $state) {
                        return authService.getCurrentUser()
                            .then(function(response) {
                                if (!response.data)
                                    $state.go('login');
                                return response.data;
                            })
                            .catch(function(err) {
                                $state.go('login');
                            })
                    }]
                }
            })
            .state('map', {
                url: '/map',
                controller: 'mapCtrl',
                templateUrl: 'app/states/map/map.html',
                resolve: {
                    user: ["authService", "$state", function(authService, $state) {
                        return authService.getCurrentUser()
                            .then(function(response) {
                                if (!response.data)
                                    $state.go('login');
                                return response.data;
                            })
                            .catch(function(err) {
                                $state.go('login');
                            });
                    }]
                }
            })
    }])

angular.module('orderhound').service("authService", ["$http", function($http) {

    this.login = function(user) {
        return $http({
            method: 'POST',
            url: '/login',
            data: user
        }).then(function(response) {
            return response;
        });
    };

    this.logout = function() {
        return $http({
            method: 'GET',
            url: '/logout'
        }).then(function(response) {
            return response;
        });
    };

    this.getCurrentUser = function() {
        return $http({
            method: 'GET',
            url: '/home'
        }).then(function(response) {
            return response;
        });
    };
//good to go
    this.registerUser = function(user) {
        return $http({
            method: 'POST',
            url: '/register',
            data: user
        }).then(function(response) {
            return response;
        });
    };
    this.getter = function(addUser) {
        return $http({
            method: 'POST',
            url: '/addUser',
            data: user
        }).then(function(response) {
            return response;
        });
    };

    this.editUser = function(id, user) {
        return $http({
            method: 'PUT',
            url: "/user/" + id,
            data: user
        }).then(function(response) {
            return response;
        });
    };
}]);

angular.module('orderhound').service("userService", ["$http", function($http) {

    this.getUsers = function() {
        return $http({
            method: 'GET',
            url: '/user'
        }).then(function(response) {
            return response;
        });
    };

    this.getUser = function(id) {
        return $http({
            method: 'GET',
            url: '/user?_id=' + id
        }).then(function(response) {
            return response;
        });
    };

    // Not Needed
    //
    // this.deleteUser = function(id) {
    //   return $http({
    //     method: 'DELETE',
    //     url: '/user/' + id
    //   }).then(function(response) {
    //     return response;
    //   });
    // };
}]);

angular.module('orderhound')
.controller('admin-homeCtrl', ["$scope", "homeService", "user", function ($scope, homeService, user) {

  $scope.test = homeService.message;

  $scope.addpo = function (ponum) {
    homeService.addpo(ponum).then(function (response) {
      //make a confirmation message, like checkin confirmed
      
    })
  }
}])

angular.module('orderhound')
.service('adminService', ["$http", function ($http) {

  this.addpo = function (ponumber) {
    return $http ({
      method: 'POST',
      url: '/checkin',
      data: { //this is the body! req.body on the other side, the server side
        ponumber: ponumber, //this is not that. its variable in line 4
        checkpoint_id: 1
      }
    }).then(function (response) { //this will pretty much be the same for all of my service functions
      
      return response.data;
    })
 }


}])

angular.module('orderhound')
.controller('editCtrl', ["$scope", "editService", "$state", function($scope, editService, $state) {
//got help from lucas withi this
$scope.obj = {};

$scope.getter = function(addUser){
  editService.addUser(addUser).then(function(response) {
    //everything that happens AFTER goes here, like clear form, $state.go
  })
 // employee_info
 // var x = (employee_info.length + 1);
 // employee_info.id = x;
 // employee_info.employee_name = obj.employee_name;
 // employee_info.admin = obj.admin;
 // employee_info.password = obj.password;
 // // checkpoint
 // checkpoint.id = (checkpoint.length+1);
 // checkpoint.employee_id = x; //this x is now equal to employee_info.id??
 // chepoint.name = obj.checkpoint_name;
};
}]);

// INITILIZE SERVICE
// ============================================================
angular.module("orderhound").service("editService", ["$http", function($http) {

  // CRUD FUNCTIONS
  // ============================================================

  this.addUser = function(addUser) {
      return $http({
          method: 'POST',
          url: '/addUser',
          data: addUser
      }).then(function(response) {
          return response;
      });
  };
}]);

angular.module('orderhound')
    .controller('loginCtrl', ["$scope", "authService", "$state", function($scope, authService, $state) {
        $scope.test = "major tom to ground control";

        $scope.login = function(user) {
            
            authService.login(user).then(function(response) {
              
                if (!response.data) {
                    alert('User does not exist');
                    $scope.user.password = '';
                }
                else if(response.data.admin){
                  $state.go('admin-home');
                }
                else {
                  
                    $state.go('home'); //takes us to home????
                }
            }).catch(function(err) {
                alert('Unable to login');
            });
        };
    }]);

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

angular.module('orderhound')
.controller('mapCtrl', ["$scope", function($scope) {


}]);

angular.module('orderhound')
.controller('registerCtrl', ["$scope", "authService", "$state", function($scope, authService, $state) {
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
      alert('Unable to create user');
    }
    else if (response.data){
      alert('User Created');
      $scope.newUser = {};
      $state.go('edit');
    }
  }).catch(function(err) {
    alert('Unable to create user');
  });
};
}]);

angular.module('orderhound')
.controller('homeCtrl', ["$scope", "homeService", "user", function ($scope, homeService, user) {

  $scope.test = homeService.message;

  $scope.addpo = function (ponum) {
    homeService.addpo(ponum).then(function (response) {
      //make a confirmation message, like checkin confirmed
      
    })
  }
}])

angular.module('orderhound')
.service('homeService', ["$http", function ($http) {

  this.addpo = function (ponumber) {
    return $http ({
      method: 'POST',
      url: '/checkin',
      data: { //this is the body! req.body on the other side, the server side
        ponumber: ponumber, //this is not that. its variable in line 4
        checkpoint_id: 1 //this will work as long as the first checkpoint is never deleted. later on, we can figure out how to fix that.
      }
    }).then(function (response) { //this will pretty much be the same for all of my service functions

      return response.data;
    })
 }


}])

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImpzL3JvdXRlcnMuanMiLCJzZXJ2aWNlcy9hdXRoU2VydmljZS5qcyIsInNlcnZpY2VzL3VzZXJTZXJ2aWNlLmpzIiwic3RhdGVzL2FkbWluLWhvbWUvYWRtaW4taG9tZUN0cmwuanMiLCJzdGF0ZXMvYWRtaW4taG9tZS9hZG1pblNlcnZpY2UuanMiLCJzdGF0ZXMvZWRpdC9lZGl0Q3RybC5qcyIsInN0YXRlcy9lZGl0L2VkaXRTZXJ2aWNlLmpzIiwic3RhdGVzL2xvZ2luL2xvZ2luQ3RybC5qcyIsInN0YXRlcy9tYXAvbWFwQ3RybC5qcyIsInN0YXRlcy9yZWdpc3Rlci9yZWdpc3RlckN0cmwuanMiLCJzdGF0ZXMvaG9tZS9ob21lQ3RybC5qcyIsInN0YXRlcy9ob21lL2hvbWVTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxlQUFlLENBQUM7QUFDL0I7QUNEQSxRQUFRLE9BQU87S0FDVixnREFBTyxTQUFTLGdCQUFnQixvQkFBb0I7O1FBRWpELG1CQUFtQixVQUFVOztRQUU3QjthQUNLLE1BQU0sU0FBUztnQkFDWixLQUFLO2dCQUNMLFlBQVk7Z0JBQ1osYUFBYTs7YUFFaEIsTUFBTSxRQUFRO2dCQUNYLEtBQUs7Z0JBQ0wsWUFBWTtnQkFDWixhQUFhO2dCQUNiLFNBQVM7b0JBQ0wsZ0NBQU0sU0FBUyxhQUFhLFFBQVE7d0JBQ2hDLE9BQU8sWUFBWTs2QkFDZCxLQUFLLFNBQVMsVUFBVTtnQ0FDckIsSUFBSSxDQUFDLFNBQVM7b0NBQ1YsT0FBTyxHQUFHO2dDQUNkLE9BQU8sU0FBUzs7NkJBRW5CLE1BQU0sU0FBUyxLQUFLO2dDQUNqQixPQUFPLEdBQUc7Ozs7O2FBSzdCLE1BQU0sWUFBWTtnQkFDZixLQUFLO2dCQUNMLFlBQVk7Z0JBQ1osYUFBYTs7YUFFaEIsTUFBTSxjQUFjO2dCQUNqQixLQUFLO2dCQUNMLFlBQVk7Z0JBQ1osYUFBYTtnQkFDYixTQUFTO29CQUNMLGdDQUFNLFNBQVMsYUFBYSxRQUFRO3dCQUNoQyxPQUFPLFlBQVk7NkJBQ2QsS0FBSyxTQUFTLFVBQVU7Z0NBQ3JCLElBQUksQ0FBQyxTQUFTO29DQUNWLE9BQU8sR0FBRztnQ0FDZCxPQUFPLFNBQVM7OzZCQUVuQixNQUFNLFNBQVMsS0FBSztnQ0FDakIsT0FBTyxHQUFHOzs7OzthQUs3QixNQUFNLFFBQVE7Z0JBQ1gsS0FBSztnQkFDTCxZQUFZO2dCQUNaLGFBQWE7Z0JBQ2IsU0FBUztvQkFDTCxnQ0FBTSxTQUFTLGFBQWEsUUFBUTt3QkFDaEMsT0FBTyxZQUFZOzZCQUNkLEtBQUssU0FBUyxVQUFVO2dDQUNyQixJQUFJLENBQUMsU0FBUztvQ0FDVixPQUFPLEdBQUc7Z0NBQ2QsT0FBTyxTQUFTOzs2QkFFbkIsTUFBTSxTQUFTLEtBQUs7Z0NBQ2pCLE9BQU8sR0FBRzs7Ozs7YUFLN0IsTUFBTSxPQUFPO2dCQUNWLEtBQUs7Z0JBQ0wsWUFBWTtnQkFDWixhQUFhO2dCQUNiLFNBQVM7b0JBQ0wsZ0NBQU0sU0FBUyxhQUFhLFFBQVE7d0JBQ2hDLE9BQU8sWUFBWTs2QkFDZCxLQUFLLFNBQVMsVUFBVTtnQ0FDckIsSUFBSSxDQUFDLFNBQVM7b0NBQ1YsT0FBTyxHQUFHO2dDQUNkLE9BQU8sU0FBUzs7NkJBRW5CLE1BQU0sU0FBUyxLQUFLO2dDQUNqQixPQUFPLEdBQUc7Ozs7OztBQU0xQztBQ3pGQSxRQUFRLE9BQU8sY0FBYyxRQUFRLHlCQUFlLFNBQVMsT0FBTzs7SUFFaEUsS0FBSyxRQUFRLFNBQVMsTUFBTTtRQUN4QixPQUFPLE1BQU07WUFDVCxRQUFRO1lBQ1IsS0FBSztZQUNMLE1BQU07V0FDUCxLQUFLLFNBQVMsVUFBVTtZQUN2QixPQUFPOzs7O0lBSWYsS0FBSyxTQUFTLFdBQVc7UUFDckIsT0FBTyxNQUFNO1lBQ1QsUUFBUTtZQUNSLEtBQUs7V0FDTixLQUFLLFNBQVMsVUFBVTtZQUN2QixPQUFPOzs7O0lBSWYsS0FBSyxpQkFBaUIsV0FBVztRQUM3QixPQUFPLE1BQU07WUFDVCxRQUFRO1lBQ1IsS0FBSztXQUNOLEtBQUssU0FBUyxVQUFVO1lBQ3ZCLE9BQU87Ozs7SUFJZixLQUFLLGVBQWUsU0FBUyxNQUFNO1FBQy9CLE9BQU8sTUFBTTtZQUNULFFBQVE7WUFDUixLQUFLO1lBQ0wsTUFBTTtXQUNQLEtBQUssU0FBUyxVQUFVO1lBQ3ZCLE9BQU87OztJQUdmLEtBQUssU0FBUyxTQUFTLFNBQVM7UUFDNUIsT0FBTyxNQUFNO1lBQ1QsUUFBUTtZQUNSLEtBQUs7WUFDTCxNQUFNO1dBQ1AsS0FBSyxTQUFTLFVBQVU7WUFDdkIsT0FBTzs7OztJQUlmLEtBQUssV0FBVyxTQUFTLElBQUksTUFBTTtRQUMvQixPQUFPLE1BQU07WUFDVCxRQUFRO1lBQ1IsS0FBSyxXQUFXO1lBQ2hCLE1BQU07V0FDUCxLQUFLLFNBQVMsVUFBVTtZQUN2QixPQUFPOzs7O0FBSW5CO0FDM0RBLFFBQVEsT0FBTyxjQUFjLFFBQVEseUJBQWUsU0FBUyxPQUFPOztJQUVoRSxLQUFLLFdBQVcsV0FBVztRQUN2QixPQUFPLE1BQU07WUFDVCxRQUFRO1lBQ1IsS0FBSztXQUNOLEtBQUssU0FBUyxVQUFVO1lBQ3ZCLE9BQU87Ozs7SUFJZixLQUFLLFVBQVUsU0FBUyxJQUFJO1FBQ3hCLE9BQU8sTUFBTTtZQUNULFFBQVE7WUFDUixLQUFLLGVBQWU7V0FDckIsS0FBSyxTQUFTLFVBQVU7WUFDdkIsT0FBTzs7Ozs7Ozs7Ozs7Ozs7O0FBZW5CO0FDL0JBLFFBQVEsT0FBTztDQUNkLFdBQVcsb0RBQWtCLFVBQVUsUUFBUSxhQUFhLE1BQU07O0VBRWpFLE9BQU8sT0FBTyxZQUFZOztFQUUxQixPQUFPLFFBQVEsVUFBVSxPQUFPO0lBQzlCLFlBQVksTUFBTSxPQUFPLEtBQUssVUFBVSxVQUFVOzs7Ozs7QUFNdEQ7QUNaQSxRQUFRLE9BQU87Q0FDZCxRQUFRLDBCQUFnQixVQUFVLE9BQU87O0VBRXhDLEtBQUssUUFBUSxVQUFVLFVBQVU7SUFDL0IsT0FBTyxPQUFPO01BQ1osUUFBUTtNQUNSLEtBQUs7TUFDTCxNQUFNO1FBQ0osVUFBVTtRQUNWLGVBQWU7O09BRWhCLEtBQUssVUFBVSxVQUFVOztNQUUxQixPQUFPLFNBQVM7Ozs7OztBQU10QjtBQ25CQSxRQUFRLE9BQU87Q0FDZCxXQUFXLGdEQUFZLFNBQVMsUUFBUSxhQUFhLFFBQVE7O0FBRTlELE9BQU8sTUFBTTs7QUFFYixPQUFPLFNBQVMsU0FBUyxRQUFRO0VBQy9CLFlBQVksUUFBUSxTQUFTLEtBQUssU0FBUyxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7QUFldkQ7QUNyQkE7O0FBRUEsUUFBUSxPQUFPLGNBQWMsUUFBUSx5QkFBZSxTQUFTLE9BQU87Ozs7O0VBS2xFLEtBQUssVUFBVSxTQUFTLFNBQVM7TUFDN0IsT0FBTyxNQUFNO1VBQ1QsUUFBUTtVQUNSLEtBQUs7VUFDTCxNQUFNO1NBQ1AsS0FBSyxTQUFTLFVBQVU7VUFDdkIsT0FBTzs7OztBQUlqQjtBQ2pCQSxRQUFRLE9BQU87S0FDVixXQUFXLGlEQUFhLFNBQVMsUUFBUSxhQUFhLFFBQVE7UUFDM0QsT0FBTyxPQUFPOztRQUVkLE9BQU8sUUFBUSxTQUFTLE1BQU07O1lBRTFCLFlBQVksTUFBTSxNQUFNLEtBQUssU0FBUyxVQUFVOztnQkFFNUMsSUFBSSxDQUFDLFNBQVMsTUFBTTtvQkFDaEIsTUFBTTtvQkFDTixPQUFPLEtBQUssV0FBVzs7cUJBRXRCLEdBQUcsU0FBUyxLQUFLLE1BQU07a0JBQzFCLE9BQU8sR0FBRzs7cUJBRVA7O29CQUVELE9BQU8sR0FBRzs7ZUFFZixNQUFNLFNBQVMsS0FBSztnQkFDbkIsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CdEI7QUN2Q0EsUUFBUSxPQUFPO0NBQ2QsV0FBVyxzQkFBVyxTQUFTLFFBQVE7Ozs7QUFJeEM7QUNMQSxRQUFRLE9BQU87Q0FDZCxXQUFXLG9EQUFnQixTQUFTLFFBQVEsYUFBYSxRQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQmxFLE9BQU8sV0FBVyxTQUFTLE1BQU07O0VBRS9CLFlBQVksYUFBYSxNQUFNLEtBQUssU0FBUyxVQUFVO0lBQ3JELElBQUksQ0FBQyxTQUFTLE1BQU07TUFDbEIsTUFBTTs7U0FFSCxJQUFJLFNBQVMsS0FBSztNQUNyQixNQUFNO01BQ04sT0FBTyxVQUFVO01BQ2pCLE9BQU8sR0FBRzs7S0FFWCxNQUFNLFNBQVMsS0FBSztJQUNyQixNQUFNOzs7O0FBSVY7QUNuQ0EsUUFBUSxPQUFPO0NBQ2QsV0FBVyw4Q0FBWSxVQUFVLFFBQVEsYUFBYSxNQUFNOztFQUUzRCxPQUFPLE9BQU8sWUFBWTs7RUFFMUIsT0FBTyxRQUFRLFVBQVUsT0FBTztJQUM5QixZQUFZLE1BQU0sT0FBTyxLQUFLLFVBQVUsVUFBVTs7Ozs7O0FBTXREO0FDWkEsUUFBUSxPQUFPO0NBQ2QsUUFBUSx5QkFBZSxVQUFVLE9BQU87O0VBRXZDLEtBQUssUUFBUSxVQUFVLFVBQVU7SUFDL0IsT0FBTyxPQUFPO01BQ1osUUFBUTtNQUNSLEtBQUs7TUFDTCxNQUFNO1FBQ0osVUFBVTtRQUNWLGVBQWU7O09BRWhCLEtBQUssVUFBVSxVQUFVOztNQUUxQixPQUFPLFNBQVM7Ozs7OztBQU10QiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcsICBbJ3VpLnJvdXRlciddKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbiAgICAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJylcblxuICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgLnN0YXRlKCdsb2dpbicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdsb2dpbkN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0YXRlcy9sb2dpbi9sb2dpbi5odG1sJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnaG9tZUN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0YXRlcy9ob21lL2hvbWUuaHRtbCcsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICB1c2VyOiBmdW5jdGlvbihhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXV0aFNlcnZpY2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ3JlZ2lzdGVyJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9yZWdpc3RlcicsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3JlZ2lzdGVyQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL3JlZ2lzdGVyL3JlZ2lzdGVyLmh0bWwnLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYWRtaW4taG9tZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvYWRtaW4taG9tZScsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2FkbWluLWhvbWVDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvYWRtaW4taG9tZS9hZG1pbi1ob21lLmh0bWwnLFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogZnVuY3Rpb24oYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF1dGhTZXJ2aWNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdlZGl0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9lZGl0JyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZWRpdEN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0YXRlcy9lZGl0L2VkaXQuaHRtbCcsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICB1c2VyOiBmdW5jdGlvbihhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXV0aFNlcnZpY2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnbWFwJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9tYXAnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYXBDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvbWFwL21hcC5odG1sJyxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IGZ1bmN0aW9uKGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdXRoU2VydmljZS5nZXRDdXJyZW50VXNlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKS5zZXJ2aWNlKFwiYXV0aFNlcnZpY2VcIiwgZnVuY3Rpb24oJGh0dHApIHtcblxuICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiAnL2xvZ291dCdcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRDdXJyZW50VXNlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy9ob21lJ1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG4vL2dvb2QgdG8gZ29cbiAgICB0aGlzLnJlZ2lzdGVyVXNlciA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiAnL3JlZ2lzdGVyJyxcbiAgICAgICAgICAgIGRhdGE6IHVzZXJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoaXMuZ2V0dGVyID0gZnVuY3Rpb24oYWRkVXNlcikge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6ICcvYWRkVXNlcicsXG4gICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZWRpdFVzZXIgPSBmdW5jdGlvbihpZCwgdXNlcikge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgIHVybDogXCIvdXNlci9cIiArIGlkLFxuICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJykuc2VydmljZShcInVzZXJTZXJ2aWNlXCIsIGZ1bmN0aW9uKCRodHRwKSB7XG5cbiAgICB0aGlzLmdldFVzZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiAnL3VzZXInXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0VXNlciA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiAnL3VzZXI/X2lkPScgKyBpZFxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBOb3QgTmVlZGVkXG4gICAgLy9cbiAgICAvLyB0aGlzLmRlbGV0ZVVzZXIgPSBmdW5jdGlvbihpZCkge1xuICAgIC8vICAgcmV0dXJuICRodHRwKHtcbiAgICAvLyAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAvLyAgICAgdXJsOiAnL3VzZXIvJyArIGlkXG4gICAgLy8gICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgLy8gICAgIHJldHVybiByZXNwb25zZTtcbiAgICAvLyAgIH0pO1xuICAgIC8vIH07XG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5jb250cm9sbGVyKCdhZG1pbi1ob21lQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsIGhvbWVTZXJ2aWNlLCB1c2VyKSB7XG5cbiAgJHNjb3BlLnRlc3QgPSBob21lU2VydmljZS5tZXNzYWdlO1xuXG4gICRzY29wZS5hZGRwbyA9IGZ1bmN0aW9uIChwb251bSkge1xuICAgIGhvbWVTZXJ2aWNlLmFkZHBvKHBvbnVtKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgLy9tYWtlIGEgY29uZmlybWF0aW9uIG1lc3NhZ2UsIGxpa2UgY2hlY2tpbiBjb25maXJtZWRcbiAgICAgIFxuICAgIH0pXG4gIH1cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uc2VydmljZSgnYWRtaW5TZXJ2aWNlJywgZnVuY3Rpb24gKCRodHRwKSB7XG5cbiAgdGhpcy5hZGRwbyA9IGZ1bmN0aW9uIChwb251bWJlcikge1xuICAgIHJldHVybiAkaHR0cCAoe1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6ICcvY2hlY2tpbicsXG4gICAgICBkYXRhOiB7IC8vdGhpcyBpcyB0aGUgYm9keSEgcmVxLmJvZHkgb24gdGhlIG90aGVyIHNpZGUsIHRoZSBzZXJ2ZXIgc2lkZVxuICAgICAgICBwb251bWJlcjogcG9udW1iZXIsIC8vdGhpcyBpcyBub3QgdGhhdC4gaXRzIHZhcmlhYmxlIGluIGxpbmUgNFxuICAgICAgICBjaGVja3BvaW50X2lkOiAxXG4gICAgICB9XG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgLy90aGlzIHdpbGwgcHJldHR5IG11Y2ggYmUgdGhlIHNhbWUgZm9yIGFsbCBvZiBteSBzZXJ2aWNlIGZ1bmN0aW9uc1xuICAgICAgXG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICB9KVxuIH1cblxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLmNvbnRyb2xsZXIoJ2VkaXRDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBlZGl0U2VydmljZSwgJHN0YXRlKSB7XG4vL2dvdCBoZWxwIGZyb20gbHVjYXMgd2l0aGkgdGhpc1xuJHNjb3BlLm9iaiA9IHt9O1xuXG4kc2NvcGUuZ2V0dGVyID0gZnVuY3Rpb24oYWRkVXNlcil7XG4gIGVkaXRTZXJ2aWNlLmFkZFVzZXIoYWRkVXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgIC8vZXZlcnl0aGluZyB0aGF0IGhhcHBlbnMgQUZURVIgZ29lcyBoZXJlLCBsaWtlIGNsZWFyIGZvcm0sICRzdGF0ZS5nb1xuICB9KVxuIC8vIGVtcGxveWVlX2luZm9cbiAvLyB2YXIgeCA9IChlbXBsb3llZV9pbmZvLmxlbmd0aCArIDEpO1xuIC8vIGVtcGxveWVlX2luZm8uaWQgPSB4O1xuIC8vIGVtcGxveWVlX2luZm8uZW1wbG95ZWVfbmFtZSA9IG9iai5lbXBsb3llZV9uYW1lO1xuIC8vIGVtcGxveWVlX2luZm8uYWRtaW4gPSBvYmouYWRtaW47XG4gLy8gZW1wbG95ZWVfaW5mby5wYXNzd29yZCA9IG9iai5wYXNzd29yZDtcbiAvLyAvLyBjaGVja3BvaW50XG4gLy8gY2hlY2twb2ludC5pZCA9IChjaGVja3BvaW50Lmxlbmd0aCsxKTtcbiAvLyBjaGVja3BvaW50LmVtcGxveWVlX2lkID0geDsgLy90aGlzIHggaXMgbm93IGVxdWFsIHRvIGVtcGxveWVlX2luZm8uaWQ/P1xuIC8vIGNoZXBvaW50Lm5hbWUgPSBvYmouY2hlY2twb2ludF9uYW1lO1xufTtcbn0pO1xuIiwiLy8gSU5JVElMSVpFIFNFUlZJQ0Vcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuYW5ndWxhci5tb2R1bGUoXCJvcmRlcmhvdW5kXCIpLnNlcnZpY2UoXCJlZGl0U2VydmljZVwiLCBmdW5jdGlvbigkaHR0cCkge1xuXG4gIC8vIENSVUQgRlVOQ1RJT05TXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHRoaXMuYWRkVXNlciA9IGZ1bmN0aW9uKGFkZFVzZXIpIHtcbiAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgdXJsOiAnL2FkZFVzZXInLFxuICAgICAgICAgIGRhdGE6IGFkZFVzZXJcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9KTtcbiAgfTtcbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuICAgIC5jb250cm9sbGVyKCdsb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbiAgICAgICAgJHNjb3BlLnRlc3QgPSBcIm1ham9yIHRvbSB0byBncm91bmQgY29udHJvbFwiO1xuXG4gICAgICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYXV0aFNlcnZpY2UubG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1VzZXIgZG9lcyBub3QgZXhpc3QnKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnVzZXIucGFzc3dvcmQgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihyZXNwb25zZS5kYXRhLmFkbWluKXtcbiAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYWRtaW4taG9tZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2hvbWUnKTsgLy90YWtlcyB1cyB0byBob21lPz8/P1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gbG9naW4nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH0pO1xuXG4vL1JFRkVSIFRPIFRISVMgQ09ERSBXSEVOIFRJTUUgVE8gUkVHSVNURVIgQlVTSU5FU1Ncbi8vICAgJHNjb3BlLnJlZ2lzdGVyID0gZnVuY3Rpb24odXNlcikge1xuLy8gICAgICAgYXV0aFNlcnZpY2UucmVnaXN0ZXJVc2VyKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKSB7XG4vLyAgICAgICAgICAgYWxlcnQoJ1VuYWJsZSB0byBjcmVhdGUgdXNlcicpO1xuLy8gICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgIGFsZXJ0KCdVc2VyIENyZWF0ZWQnKTtcbi8vICAgICAgICAgICAkc2NvcGUubmV3VXNlciA9IHt9O1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbi8vICAgICAgICAgYWxlcnQoJ1VuYWJsZSB0byBjcmVhdGUgdXNlcicpO1xuLy8gICAgICAgfSk7XG4vLyAgICAgfTtcbi8vIH0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLmNvbnRyb2xsZXIoJ21hcEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuXG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5jb250cm9sbGVyKCdyZWdpc3RlckN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbi8vXG4vLyAgICAgICAkc2NvcGUucmVnaXN0ZXIgPSBmdW5jdGlvbih1c2VyKSB7XG4vLyAgICAgICAgICAgXG4vLyAgICAgICAgICAgYXV0aFNlcnZpY2UubG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpIHtcbi8vICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdVc2VyIGRvZXMgbm90IGV4aXN0Jyk7XG4vLyAgICAgICAgICAgICAgICAgICAkc2NvcGUudXNlci5wYXNzd29yZCA9ICcnO1xuLy8gICAgICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhZG1pbi1ob21lJyk7IC8vdGFrZXMgdXMgdG8gaG9tZT8/Pz9cbi8vICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuLy8gICAgICAgICAgICAgICBhbGVydCgnVW5hYmxlIHRvIGxvZ2luJyk7XG4vLyAgICAgICAgICAgfSk7XG4vLyAgICAgICB9O1xuLy9cbi8vIH0pO1xuXG4kc2NvcGUucmVnaXN0ZXIgPSBmdW5jdGlvbih1c2VyKSB7XG4gIFxuICBhdXRoU2VydmljZS5yZWdpc3RlclVzZXIodXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgIGlmICghcmVzcG9uc2UuZGF0YSkge1xuICAgICAgYWxlcnQoJ1VuYWJsZSB0byBjcmVhdGUgdXNlcicpO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZXNwb25zZS5kYXRhKXtcbiAgICAgIGFsZXJ0KCdVc2VyIENyZWF0ZWQnKTtcbiAgICAgICRzY29wZS5uZXdVc2VyID0ge307XG4gICAgICAkc3RhdGUuZ28oJ2VkaXQnKTtcbiAgICB9XG4gIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgIGFsZXJ0KCdVbmFibGUgdG8gY3JlYXRlIHVzZXInKTtcbiAgfSk7XG59O1xufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uY29udHJvbGxlcignaG9tZUN0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCBob21lU2VydmljZSwgdXNlcikge1xuXG4gICRzY29wZS50ZXN0ID0gaG9tZVNlcnZpY2UubWVzc2FnZTtcblxuICAkc2NvcGUuYWRkcG8gPSBmdW5jdGlvbiAocG9udW0pIHtcbiAgICBob21lU2VydmljZS5hZGRwbyhwb251bSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgIC8vbWFrZSBhIGNvbmZpcm1hdGlvbiBtZXNzYWdlLCBsaWtlIGNoZWNraW4gY29uZmlybWVkXG4gICAgICBcbiAgICB9KVxuICB9XG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLnNlcnZpY2UoJ2hvbWVTZXJ2aWNlJywgZnVuY3Rpb24gKCRodHRwKSB7XG5cbiAgdGhpcy5hZGRwbyA9IGZ1bmN0aW9uIChwb251bWJlcikge1xuICAgIHJldHVybiAkaHR0cCAoe1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6ICcvY2hlY2tpbicsXG4gICAgICBkYXRhOiB7IC8vdGhpcyBpcyB0aGUgYm9keSEgcmVxLmJvZHkgb24gdGhlIG90aGVyIHNpZGUsIHRoZSBzZXJ2ZXIgc2lkZVxuICAgICAgICBwb251bWJlcjogcG9udW1iZXIsIC8vdGhpcyBpcyBub3QgdGhhdC4gaXRzIHZhcmlhYmxlIGluIGxpbmUgNFxuICAgICAgICBjaGVja3BvaW50X2lkOiAxIC8vdGhpcyB3aWxsIHdvcmsgYXMgbG9uZyBhcyB0aGUgZmlyc3QgY2hlY2twb2ludCBpcyBuZXZlciBkZWxldGVkLiBsYXRlciBvbiwgd2UgY2FuIGZpZ3VyZSBvdXQgaG93IHRvIGZpeCB0aGF0LlxuICAgICAgfVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IC8vdGhpcyB3aWxsIHByZXR0eSBtdWNoIGJlIHRoZSBzYW1lIGZvciBhbGwgb2YgbXkgc2VydmljZSBmdW5jdGlvbnNcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgfSlcbiB9XG5cblxufSlcbiJdfQ==
