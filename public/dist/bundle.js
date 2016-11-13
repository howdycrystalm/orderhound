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
                    checkpoints: ["editService", function(editService) {
                      return editService.checkpoints();
                    }],
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
//am i using line 12 function?????
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
  $scope.name = function(employee_name) {
    adminService.name(employee_name).then(function (response) {
    })
  }

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
 };

}]);

angular.module('orderhound')
.controller('editCtrl', ["$scope", "editService", "$state", "checkpoints", function($scope, editService, $state, checkpoints) {
//got help from lucas withi this
    $scope.obj = {};//do i need this still????

    $scope.getter = function(addUser){
      editService.addUser(addUser).then(function(response) {
        //everything that happens AFTER goes here, like clear form, $state.go
      })
    };
//*****************adding dots to map in edit view*******************//
    $scope.checkpoints = checkpoints;
    console.log($scope.checkpoints);

/* EXAMPLE
angular.module('starWarsApp')
.controller('mainCtrl', function($scope, starWarsService) {
  starWarsService.getPeople() //this is the promise
  .then(function(response) { //.then callback function represents our data, which is the getPeople function in starWarsService. also, response is just a common parameter name, can be named anything, but use response.
    $scope.people = response.data.results; //the returned promise is data from response.data.results. now response.data.results is like a filepath found in the object that is retreived from Swapi.co. i can see object structure if console.log(response);
  })
})
*/

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
  //***********adding dots to map in edit view***********//
  this.checkpoints = function() {
    return $http({
      method: 'GET',
      url: '/checkpoints',
      //data: checkpoints
    }).then(function(response){
      return response.data;
    })
  }

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

angular.module('orderhound')
    .controller('loginCtrl', ["$scope", "authService", "$state", function($scope, authService, $state) {
        $scope.test = "major tom to ground control";
//**********************DELETE THIS BEFORE PRESENTING AND HOSTING*********************//
  $scope.user = {
    name: 'Quinn',
    password: 'q'
  }
//***********************************************************************************//
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImpzL3JvdXRlcnMuanMiLCJzZXJ2aWNlcy9hdXRoU2VydmljZS5qcyIsInNlcnZpY2VzL3VzZXJTZXJ2aWNlLmpzIiwic3RhdGVzL2FkbWluLWhvbWUvYWRtaW4taG9tZUN0cmwuanMiLCJzdGF0ZXMvYWRtaW4taG9tZS9hZG1pblNlcnZpY2UuanMiLCJzdGF0ZXMvZWRpdC9lZGl0Q3RybC5qcyIsInN0YXRlcy9lZGl0L2VkaXRTZXJ2aWNlLmpzIiwic3RhdGVzL2hvbWUvaG9tZUN0cmwuanMiLCJzdGF0ZXMvaG9tZS9ob21lU2VydmljZS5qcyIsInN0YXRlcy9sb2dpbi9sb2dpbkN0cmwuanMiLCJzdGF0ZXMvbWFwL21hcEN0cmwuanMiLCJzdGF0ZXMvcmVnaXN0ZXIvcmVnaXN0ZXJDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxlQUFlLENBQUM7QUFDL0I7QUNEQSxRQUFRLE9BQU87S0FDVixnREFBTyxTQUFTLGdCQUFnQixvQkFBb0I7O1FBRWpELG1CQUFtQixVQUFVOztRQUU3QjthQUNLLE1BQU0sU0FBUztnQkFDWixLQUFLO2dCQUNMLFlBQVk7Z0JBQ1osYUFBYTs7YUFFaEIsTUFBTSxRQUFRO2dCQUNYLEtBQUs7Z0JBQ0wsWUFBWTtnQkFDWixhQUFhO2dCQUNiLFNBQVM7b0JBQ0wsZ0NBQU0sU0FBUyxhQUFhLFFBQVE7d0JBQ2hDLE9BQU8sWUFBWTs2QkFDZCxLQUFLLFNBQVMsVUFBVTtnQ0FDckIsSUFBSSxDQUFDLFNBQVM7b0NBQ1YsT0FBTyxHQUFHO2dDQUNkLE9BQU8sU0FBUzs7NkJBRW5CLE1BQU0sU0FBUyxLQUFLO2dDQUNqQixPQUFPLEdBQUc7Ozs7O2FBSzdCLE1BQU0sWUFBWTtnQkFDZixLQUFLO2dCQUNMLFlBQVk7Z0JBQ1osYUFBYTs7YUFFaEIsTUFBTSxjQUFjO2dCQUNqQixLQUFLO2dCQUNMLFlBQVk7Z0JBQ1osYUFBYTtnQkFDYixTQUFTO29CQUNMLGdDQUFNLFNBQVMsYUFB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QUFVLFVBQVU7O01BRTFCLE9BQU8sU0FBUzs7Ozs7O0FBTXRCO0FDbkJBLFFBQVEsT0FBTztLQUNWLFdBQVcsaURBQWEsU0FBUyxRQUFRLGFBQWEsUUFBUTtRQUMzRCxPQUFPLE9BQU87O0VBRXBCLE9BQU8sT0FBTztJQUNaLE1BQU07SUFDTixVQUFVOzs7UUFHTixPQUFPLFFBQVEsU0FBUyxNQUFNOztZQUUxQixZQUFZLE1BQU0sTUFBTSxLQUFLLFNBQVMsVUFBVTs7Z0JBRTVDLElBQUksQ0FBQyxTQUFTLE1BQU07b0JBQ2hCLE1BQU07b0JBQ04sT0FBTyxLQUFLLFdBQVc7O3FCQUV0QixHQUFHLFNBQVMsS0FBSyxNQUFNO2tCQUMxQixPQUFPLEdBQUc7O3FCQUVQOztvQkFFRCxPQUFPLEdBQUc7O2VBRWYsTUFBTSxTQUFTLEtBQUs7Z0JBQ25CLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQnRCO0FDNUNBLFFBQVEsT0FBTztDQUNkLFdBQVcsc0JBQVcsU0FBUyxRQUFROzs7O0FBSXhDO0FDTEEsUUFBUSxPQUFPO0NBQ2QsV0FBVyxvREFBZ0IsU0FBUyxRQUFRLGFBQWEsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JsRSxPQUFPLFdBQVcsU0FBUyxNQUFNOztFQUUvQixZQUFZLGFBQWEsTUFBTSxLQUFLLFNBQVMsVUFBVTtJQUNyRCxJQUFJLENBQUMsU0FBUyxNQUFNO01BQ2xCLE1BQU07O1NBRUgsSUFBSSxTQUFTLEtBQUs7TUFDckIsTUFBTTtNQUNOLE9BQU8sVUFBVTtNQUNqQixPQUFPLEdBQUc7O0tBRVgsTUFBTSxTQUFTLEtBQUs7SUFDckIsTUFBTTs7OztBQUlWIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJywgIFsndWkucm91dGVyJ10pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuICAgIC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKVxuXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAuc3RhdGUoJ2xvZ2luJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2xvZ2luQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL2xvZ2luL2xvZ2luLmh0bWwnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdob21lJywge1xuICAgICAgICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL2hvbWUvaG9tZS5odG1sJyxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IGZ1bmN0aW9uKGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdXRoU2VydmljZS5nZXRDdXJyZW50VXNlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgncmVnaXN0ZXInLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3JlZ2lzdGVyJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncmVnaXN0ZXJDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvcmVnaXN0ZXIvcmVnaXN0ZXIuaHRtbCcsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhZG1pbi1ob21lJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9hZG1pbi1ob21lJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnYWRtaW4taG9tZUN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0YXRlcy9hZG1pbi1ob21lL2FkbWluLWhvbWUuaHRtbCcsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICB1c2VyOiBmdW5jdGlvbihhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXV0aFNlcnZpY2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2VkaXQnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2VkaXQnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdlZGl0Q3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL2VkaXQvZWRpdC5odG1sJyxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrcG9pbnRzOiBmdW5jdGlvbihlZGl0U2VydmljZSkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlZGl0U2VydmljZS5jaGVja3BvaW50cygpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB1c2VyOiBmdW5jdGlvbihhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXV0aFNlcnZpY2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnbWFwJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9tYXAnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYXBDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvbWFwL21hcC5odG1sJyxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IGZ1bmN0aW9uKGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdXRoU2VydmljZS5nZXRDdXJyZW50VXNlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKS5zZXJ2aWNlKFwiYXV0aFNlcnZpY2VcIiwgZnVuY3Rpb24oJGh0dHApIHtcblxuICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiAnL2xvZ291dCdcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRDdXJyZW50VXNlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy9ob21lJ1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG4vL2dvb2QgdG8gZ29cbiAgICB0aGlzLnJlZ2lzdGVyVXNlciA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiAnL3JlZ2lzdGVyJyxcbiAgICAgICAgICAgIGRhdGE6IHVzZXJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoaXMuZ2V0dGVyID0gZnVuY3Rpb24oYWRkVXNlcikge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6ICcvYWRkVXNlcicsXG4gICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZWRpdFVzZXIgPSBmdW5jdGlvbihpZCwgdXNlcikge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgIHVybDogXCIvdXNlci9cIiArIGlkLFxuICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJykuc2VydmljZShcInVzZXJTZXJ2aWNlXCIsIGZ1bmN0aW9uKCRodHRwKSB7XG5cbiAgICB0aGlzLmdldFVzZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiAnL3VzZXInXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcbi8vYW0gaSB1c2luZyBsaW5lIDEyIGZ1bmN0aW9uPz8/Pz9cbiAgICB0aGlzLmdldFVzZXIgPSBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy91c2VyP19pZD0nICsgaWRcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gTm90IE5lZWRlZFxuICAgIC8vXG4gICAgLy8gdGhpcy5kZWxldGVVc2VyID0gZnVuY3Rpb24oaWQpIHtcbiAgICAvLyAgIHJldHVybiAkaHR0cCh7XG4gICAgLy8gICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgLy8gICAgIHVybDogJy91c2VyLycgKyBpZFxuICAgIC8vICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgIC8vICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgLy8gICB9KTtcbiAgICAvLyB9O1xufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uY29udHJvbGxlcignYWRtaW4taG9tZUN0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCBob21lU2VydmljZSwgdXNlcikge1xuXG4gICRzY29wZS50ZXN0ID0gaG9tZVNlcnZpY2UubWVzc2FnZTtcbiAgJHNjb3BlLm5hbWUgPSBmdW5jdGlvbihlbXBsb3llZV9uYW1lKSB7XG4gICAgYWRtaW5TZXJ2aWNlLm5hbWUoZW1wbG95ZWVfbmFtZSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICB9KVxuICB9XG5cbiAgJHNjb3BlLmFkZHBvID0gZnVuY3Rpb24gKHBvbnVtKSB7XG4gICAgaG9tZVNlcnZpY2UuYWRkcG8ocG9udW0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAvL21ha2UgYSBjb25maXJtYXRpb24gbWVzc2FnZSwgbGlrZSBjaGVja2luIGNvbmZpcm1lZFxuXG4gICAgfSlcbiAgfVxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5zZXJ2aWNlKCdhZG1pblNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHApIHtcblxuICB0aGlzLmFkZHBvID0gZnVuY3Rpb24gKHBvbnVtYmVyKSB7XG4gICAgcmV0dXJuICRodHRwICh7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogJy9jaGVja2luJyxcbiAgICAgIGRhdGE6IHsgLy90aGlzIGlzIHRoZSBib2R5ISByZXEuYm9keSBvbiB0aGUgb3RoZXIgc2lkZSwgdGhlIHNlcnZlciBzaWRlXG4gICAgICAgIHBvbnVtYmVyOiBwb251bWJlciwgLy90aGlzIGlzIG5vdCB0aGF0LiBpdHMgdmFyaWFibGUgaW4gbGluZSA0XG4gICAgICAgIGNoZWNrcG9pbnRfaWQ6IDFcbiAgICAgIH1cbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyAvL3RoaXMgd2lsbCBwcmV0dHkgbXVjaCBiZSB0aGUgc2FtZSBmb3IgYWxsIG9mIG15IHNlcnZpY2UgZnVuY3Rpb25zXG5cbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgIH0pXG4gfTtcblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uY29udHJvbGxlcignZWRpdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIGVkaXRTZXJ2aWNlLCAkc3RhdGUsIGNoZWNrcG9pbnRzKSB7XG4vL2dvdCBoZWxwIGZyb20gbHVjYXMgd2l0aGkgdGhpc1xuICAgICRzY29wZS5vYmogPSB7fTsvL2RvIGkgbmVlZCB0aGlzIHN0aWxsPz8/P1xuXG4gICAgJHNjb3BlLmdldHRlciA9IGZ1bmN0aW9uKGFkZFVzZXIpe1xuICAgICAgZWRpdFNlcnZpY2UuYWRkVXNlcihhZGRVc2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIC8vZXZlcnl0aGluZyB0aGF0IGhhcHBlbnMgQUZURVIgZ29lcyBoZXJlLCBsaWtlIGNsZWFyIGZvcm0sICRzdGF0ZS5nb1xuICAgICAgfSlcbiAgICB9O1xuLy8qKioqKioqKioqKioqKioqKmFkZGluZyBkb3RzIHRvIG1hcCBpbiBlZGl0IHZpZXcqKioqKioqKioqKioqKioqKioqLy9cbiAgICAkc2NvcGUuY2hlY2twb2ludHMgPSBjaGVja3BvaW50cztcbiAgICBjb25zb2xlLmxvZygkc2NvcGUuY2hlY2twb2ludHMpO1xuXG4vKiBFWEFNUExFXG5hbmd1bGFyLm1vZHVsZSgnc3RhcldhcnNBcHAnKVxuLmNvbnRyb2xsZXIoJ21haW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBzdGFyV2Fyc1NlcnZpY2UpIHtcbiAgc3RhcldhcnNTZXJ2aWNlLmdldFBlb3BsZSgpIC8vdGhpcyBpcyB0aGUgcHJvbWlzZVxuICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkgeyAvLy50aGVuIGNhbGxiYWNrIGZ1bmN0aW9uIHJlcHJlc2VudHMgb3VyIGRhdGEsIHdoaWNoIGlzIHRoZSBnZXRQZW9wbGUgZnVuY3Rpb24gaW4gc3RhcldhcnNTZXJ2aWNlLiBhbHNvLCByZXNwb25zZSBpcyBqdXN0IGEgY29tbW9uIHBhcmFtZXRlciBuYW1lLCBjYW4gYmUgbmFtZWQgYW55dGhpbmcsIGJ1dCB1c2UgcmVzcG9uc2UuXG4gICAgJHNjb3BlLnBlb3BsZSA9IHJlc3BvbnNlLmRhdGEucmVzdWx0czsgLy90aGUgcmV0dXJuZWQgcHJvbWlzZSBpcyBkYXRhIGZyb20gcmVzcG9uc2UuZGF0YS5yZXN1bHRzLiBub3cgcmVzcG9uc2UuZGF0YS5yZXN1bHRzIGlzIGxpa2UgYSBmaWxlcGF0aCBmb3VuZCBpbiB0aGUgb2JqZWN0IHRoYXQgaXMgcmV0cmVpdmVkIGZyb20gU3dhcGkuY28uIGkgY2FuIHNlZSBvYmplY3Qgc3RydWN0dXJlIGlmIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgfSlcbn0pXG4qL1xuXG59KTtcbiIsIi8vIElOSVRJTElaRSBTRVJWSUNFXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmFuZ3VsYXIubW9kdWxlKFwib3JkZXJob3VuZFwiKS5zZXJ2aWNlKFwiZWRpdFNlcnZpY2VcIiwgZnVuY3Rpb24oJGh0dHApIHtcblxuICAvLyBDUlVEIEZVTkNUSU9OU1xuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB0aGlzLmFkZFVzZXIgPSBmdW5jdGlvbihhZGRVc2VyKSB7XG4gICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIHVybDogJy9hZGRVc2VyJyxcbiAgICAgICAgICBkYXRhOiBhZGRVc2VyXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSk7XG4gIH07XG4gIC8vKioqKioqKioqKiphZGRpbmcgZG90cyB0byBtYXAgaW4gZWRpdCB2aWV3KioqKioqKioqKiovL1xuICB0aGlzLmNoZWNrcG9pbnRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6ICcvY2hlY2twb2ludHMnLFxuICAgICAgLy9kYXRhOiBjaGVja3BvaW50c1xuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgfSlcbiAgfVxuXG4gfSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uY29udHJvbGxlcignaG9tZUN0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCBob21lU2VydmljZSwgdXNlcikge1xuXG4gICRzY29wZS50ZXN0ID0gaG9tZVNlcnZpY2UubWVzc2FnZTtcblxuICAkc2NvcGUuYWRkcG8gPSBmdW5jdGlvbiAocG9udW0pIHtcbiAgICBob21lU2VydmljZS5hZGRwbyhwb251bSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgIC8vbWFrZSBhIGNvbmZpcm1hdGlvbiBtZXNzYWdlLCBsaWtlIGNoZWNraW4gY29uZmlybWVkXG4gICAgICBcbiAgICB9KVxuICB9XG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLnNlcnZpY2UoJ2hvbWVTZXJ2aWNlJywgZnVuY3Rpb24gKCRodHRwKSB7XG5cbiAgdGhpcy5hZGRwbyA9IGZ1bmN0aW9uIChwb251bWJlcikge1xuICAgIHJldHVybiAkaHR0cCAoe1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6ICcvY2hlY2tpbicsXG4gICAgICBkYXRhOiB7IC8vdGhpcyBpcyB0aGUgYm9keSEgcmVxLmJvZHkgb24gdGhlIG90aGVyIHNpZGUsIHRoZSBzZXJ2ZXIgc2lkZVxuICAgICAgICBwb251bWJlcjogcG9udW1iZXIsIC8vdGhpcyBpcyBub3QgdGhhdC4gaXRzIHZhcmlhYmxlIGluIGxpbmUgNFxuICAgICAgICBjaGVja3BvaW50X2lkOiAxIC8vdGhpcyB3aWxsIHdvcmsgYXMgbG9uZyBhcyB0aGUgZmlyc3QgY2hlY2twb2ludCBpcyBuZXZlciBkZWxldGVkLiBsYXRlciBvbiwgd2UgY2FuIGZpZ3VyZSBvdXQgaG93IHRvIGZpeCB0aGF0LlxuICAgICAgfVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IC8vdGhpcyB3aWxsIHByZXR0eSBtdWNoIGJlIHRoZSBzYW1lIGZvciBhbGwgb2YgbXkgc2VydmljZSBmdW5jdGlvbnNcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgfSlcbiB9XG5cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbiAgICAuY29udHJvbGxlcignbG9naW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4gICAgICAgICRzY29wZS50ZXN0ID0gXCJtYWpvciB0b20gdG8gZ3JvdW5kIGNvbnRyb2xcIjtcbi8vKioqKioqKioqKioqKioqKioqKioqKkRFTEVURSBUSElTIEJFRk9SRSBQUkVTRU5USU5HIEFORCBIT1NUSU5HKioqKioqKioqKioqKioqKioqKioqLy9cbiAgJHNjb3BlLnVzZXIgPSB7XG4gICAgbmFtZTogJ1F1aW5uJyxcbiAgICBwYXNzd29yZDogJ3EnXG4gIH1cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuICAgICAgICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbih1c2VyKSB7XG5cbiAgICAgICAgICAgIGF1dGhTZXJ2aWNlLmxvZ2luKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcblxuICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBhbGVydCgnVXNlciBkb2VzIG5vdCBleGlzdCcpO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudXNlci5wYXNzd29yZCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKHJlc3BvbnNlLmRhdGEuYWRtaW4pe1xuICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhZG1pbi1ob21lJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnaG9tZScpOyAvL3Rha2VzIHVzIHRvIGhvbWU/Pz8/XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1VuYWJsZSB0byBsb2dpbicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSk7XG5cbi8vUkVGRVIgVE8gVEhJUyBDT0RFIFdIRU4gVElNRSBUTyBSRUdJU1RFUiBCVVNJTkVTU1xuLy8gICAkc2NvcGUucmVnaXN0ZXIgPSBmdW5jdGlvbih1c2VyKSB7XG4vLyAgICAgICBhdXRoU2VydmljZS5yZWdpc3RlclVzZXIodXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuLy8gICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpIHtcbi8vICAgICAgICAgICBhbGVydCgnVW5hYmxlIHRvIGNyZWF0ZSB1c2VyJyk7XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgYWxlcnQoJ1VzZXIgQ3JlYXRlZCcpO1xuLy8gICAgICAgICAgICRzY29wZS5uZXdVc2VyID0ge307XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuLy8gICAgICAgICBhbGVydCgnVW5hYmxlIHRvIGNyZWF0ZSB1c2VyJyk7XG4vLyAgICAgICB9KTtcbi8vICAgICB9O1xuLy8gfSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uY29udHJvbGxlcignbWFwQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSkge1xuXG5cbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLmNvbnRyb2xsZXIoJ3JlZ2lzdGVyQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuLy9cbi8vICAgICAgICRzY29wZS5yZWdpc3RlciA9IGZ1bmN0aW9uKHVzZXIpIHtcbi8vICAgICAgICAgICBcbi8vICAgICAgICAgICBhdXRoU2VydmljZS5sb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSkge1xuLy8gICAgICAgICAgICAgICAgICAgYWxlcnQoJ1VzZXIgZG9lcyBub3QgZXhpc3QnKTtcbi8vICAgICAgICAgICAgICAgICAgICRzY29wZS51c2VyLnBhc3N3b3JkID0gJyc7XG4vLyAgICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FkbWluLWhvbWUnKTsgLy90YWtlcyB1cyB0byBob21lPz8/P1xuLy8gICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4vLyAgICAgICAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gbG9naW4nKTtcbi8vICAgICAgICAgICB9KTtcbi8vICAgICAgIH07XG4vL1xuLy8gfSk7XG5cbiRzY29wZS5yZWdpc3RlciA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgXG4gIGF1dGhTZXJ2aWNlLnJlZ2lzdGVyVXNlcih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgaWYgKCFyZXNwb25zZS5kYXRhKSB7XG4gICAgICBhbGVydCgnVW5hYmxlIHRvIGNyZWF0ZSB1c2VyJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlc3BvbnNlLmRhdGEpe1xuICAgICAgYWxlcnQoJ1VzZXIgQ3JlYXRlZCcpO1xuICAgICAgJHNjb3BlLm5ld1VzZXIgPSB7fTtcbiAgICAgICRzdGF0ZS5nbygnZWRpdCcpO1xuICAgIH1cbiAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgYWxlcnQoJ1VuYWJsZSB0byBjcmVhdGUgdXNlcicpO1xuICB9KTtcbn07XG59KTtcbiJdfQ==
