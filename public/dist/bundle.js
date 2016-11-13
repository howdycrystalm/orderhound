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
                    welcomeAssets: ["homeService", function(homeService) {
                      return homeService.welcomeAssets();
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
  //***********adding dots to image of map in edit view***********//
  this.checkpoints = function() {
    return $http({
      method: 'GET',
      url: '/checkpoints',
      //data: checkpoints
    }).then(function(response){
      return response.data;
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
  };
//*****gives view employee_name, photo, checkpoint_name for the welcome message in home view from databse*****//
  $scope.welcomeAssets = function() {
    //call the function that's in service
    console.log('is this operating?');
    homeService.welcomeAssets() //now we're calling welcomeAssets in the homeService, from homeCtrl
    .then(function(response) {
      console.log('this is our response', response)
      $scope.response = response;

    })
  }
  $scope.welcomeAssets();
 }]);

// INITILIZE SERVICE
// ============================================================
angular.module('orderhound')
.service('homeService', ["$http", function ($http) {

// CRUD FUNCTIONS
// ============================================================
//adding po number to production
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
    });
 };
//getting user's name to add to welcome message
  this.welcomeAssets = function() {
    return $http({
      method: 'GET',
      url: '/welcomeAssets'
    }).then(function(response){ //catching the response from the server
      return response.data; //response.data is the info we want
  });
};

}]);

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImpzL3JvdXRlcnMuanMiLCJzZXJ2aWNlcy9hdXRoU2VydmljZS5qcyIsInNlcnZpY2VzL3VzZXJTZXJ2aWNlLmpzIiwic3RhdGVzL2FkbWluLWhvbWUvYWRtaW4taG9tZUN0cmwuanMiLCJzdGF0ZXMvYWRtaW4taG9tZS9hZG1pblNlcnZpY2UuanMiLCJzdGF0ZXMvZWRpdC9lZGl0Q3RybC5qcyIsInN0YXRlcy9lZGl0L2VkaXRTZXJ2aWNlLmpzIiwic3RhdGVzL2hvbWUvaG9tZUN0cmwuanMiLCJzdGF0ZXMvaG9tZS9ob21lU2VydmljZS5qcyIsInN0YXRlcy9sb2dpbi9sb2dpbkN0cmwuanMiLCJzdGF0ZXMvbWFwL21hcEN0cmwuanMiLCJzdGF0ZXMvcmVnaXN0ZXIvcmVnaXN0ZXJDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxlQUFlLENBQUM7QUFDL0I7QUNEQSxRQUFRLE9BQU87S0FDVixnREFBTyxTQUFTLGdCQUFnQixvQkFBb0I7O1FBRWpELG1CQUFtQixVQUFVOztRQUU3QjthQUNLLE1BQU0sU0FBUztnQkFDWixLQUFLO2dCQUNMLFlBQVk7Z0JBQ1osYUFBYTs7YUFFaEIsTUFBTSxRQUFRO2dCQUNYLEtBQUs7Z0JBQ0wsWUFBWTtnQkFDWixhQUFhO2dCQUNiLFNBQVM7b0JBQ0wsK0JBQWUsU0FBUyxhQUFhO3NCQUNuQyxPQUFPLFlBQVk7O29CQUVyQixnQ0FBTSxTQUFTLGFBQWEsUUFBUTt3QkFDaEMsT0FBTyxZQUFZOzZCQUNkLEtBQUssU0FBUyxVQUFVO2dDQUNyQixJQUFJLENBQUMsU0FBUztvQ0FDVixPQUFPLEdBQUc7Z0NBQ2QsT0FBTyxTQUFTOzs2QkFFbkIsTUFBTSxTQUFTLEtBQUs7Z0NBQ2pCLE9BQU8sR0FBRzs7Ozs7YUFLN0IsTUFBTSxZQUFZO2dCQUNmLEtBQUs7Z0JBQ0wsWUFBWTtnQkFDWixhQUFhOzthQUVoQixNQUFNLGNBQWM7Z0JBQ2pCLEtBQUs7Z0JBQ0wsWUFBWTtn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QUFLO01BQ3JCLE1BQU07TUFDTixPQUFPLFVBQVU7TUFDakIsT0FBTyxHQUFHOztLQUVYLE1BQU0sU0FBUyxLQUFLO0lBQ3JCLE1BQU07Ozs7QUFJViIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcsICBbJ3VpLnJvdXRlciddKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbiAgICAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJylcblxuICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgLnN0YXRlKCdsb2dpbicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdsb2dpbkN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0YXRlcy9sb2dpbi9sb2dpbi5odG1sJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnaG9tZUN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0YXRlcy9ob21lL2hvbWUuaHRtbCcsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICB3ZWxjb21lQXNzZXRzOiBmdW5jdGlvbihob21lU2VydmljZSkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBob21lU2VydmljZS53ZWxjb21lQXNzZXRzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IGZ1bmN0aW9uKGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdXRoU2VydmljZS5nZXRDdXJyZW50VXNlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgncmVnaXN0ZXInLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3JlZ2lzdGVyJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncmVnaXN0ZXJDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvcmVnaXN0ZXIvcmVnaXN0ZXIuaHRtbCcsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhZG1pbi1ob21lJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9hZG1pbi1ob21lJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnYWRtaW4taG9tZUN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0YXRlcy9hZG1pbi1ob21lL2FkbWluLWhvbWUuaHRtbCcsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICB1c2VyOiBmdW5jdGlvbihhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXV0aFNlcnZpY2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2VkaXQnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2VkaXQnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdlZGl0Q3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL2VkaXQvZWRpdC5odG1sJyxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrcG9pbnRzOiBmdW5jdGlvbihlZGl0U2VydmljZSkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlZGl0U2VydmljZS5jaGVja3BvaW50cygpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB1c2VyOiBmdW5jdGlvbihhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXV0aFNlcnZpY2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnbWFwJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9tYXAnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYXBDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvbWFwL21hcC5odG1sJyxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IGZ1bmN0aW9uKGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdXRoU2VydmljZS5nZXRDdXJyZW50VXNlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKS5zZXJ2aWNlKFwiYXV0aFNlcnZpY2VcIiwgZnVuY3Rpb24oJGh0dHApIHtcblxuICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiAnL2xvZ291dCdcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRDdXJyZW50VXNlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy9ob21lJ1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG4vL2dvb2QgdG8gZ29cbiAgICB0aGlzLnJlZ2lzdGVyVXNlciA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiAnL3JlZ2lzdGVyJyxcbiAgICAgICAgICAgIGRhdGE6IHVzZXJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoaXMuZ2V0dGVyID0gZnVuY3Rpb24oYWRkVXNlcikge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6ICcvYWRkVXNlcicsXG4gICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZWRpdFVzZXIgPSBmdW5jdGlvbihpZCwgdXNlcikge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgIHVybDogXCIvdXNlci9cIiArIGlkLFxuICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJykuc2VydmljZShcInVzZXJTZXJ2aWNlXCIsIGZ1bmN0aW9uKCRodHRwKSB7XG5cbiAgICB0aGlzLmdldFVzZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiAnL3VzZXInXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcbi8vYW0gaSB1c2luZyBsaW5lIDEyIGZ1bmN0aW9uPz8/Pz9cbiAgICB0aGlzLmdldFVzZXIgPSBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy91c2VyP19pZD0nICsgaWRcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gTm90IE5lZWRlZFxuICAgIC8vXG4gICAgLy8gdGhpcy5kZWxldGVVc2VyID0gZnVuY3Rpb24oaWQpIHtcbiAgICAvLyAgIHJldHVybiAkaHR0cCh7XG4gICAgLy8gICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgLy8gICAgIHVybDogJy91c2VyLycgKyBpZFxuICAgIC8vICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgIC8vICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgLy8gICB9KTtcbiAgICAvLyB9O1xufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uY29udHJvbGxlcignYWRtaW4taG9tZUN0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCBob21lU2VydmljZSwgdXNlcikge1xuXG4gICRzY29wZS50ZXN0ID0gaG9tZVNlcnZpY2UubWVzc2FnZTtcbiAgJHNjb3BlLm5hbWUgPSBmdW5jdGlvbihlbXBsb3llZV9uYW1lKSB7XG4gICAgYWRtaW5TZXJ2aWNlLm5hbWUoZW1wbG95ZWVfbmFtZSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICB9KVxuICB9XG5cbiAgJHNjb3BlLmFkZHBvID0gZnVuY3Rpb24gKHBvbnVtKSB7XG4gICAgaG9tZVNlcnZpY2UuYWRkcG8ocG9udW0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAvL21ha2UgYSBjb25maXJtYXRpb24gbWVzc2FnZSwgbGlrZSBjaGVja2luIGNvbmZpcm1lZFxuXG4gICAgfSlcbiAgfVxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5zZXJ2aWNlKCdhZG1pblNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHApIHtcblxuICB0aGlzLmFkZHBvID0gZnVuY3Rpb24gKHBvbnVtYmVyKSB7XG4gICAgcmV0dXJuICRodHRwICh7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogJy9jaGVja2luJyxcbiAgICAgIGRhdGE6IHsgLy90aGlzIGlzIHRoZSBib2R5ISByZXEuYm9keSBvbiB0aGUgb3RoZXIgc2lkZSwgdGhlIHNlcnZlciBzaWRlXG4gICAgICAgIHBvbnVtYmVyOiBwb251bWJlciwgLy90aGlzIGlzIG5vdCB0aGF0LiBpdHMgdmFyaWFibGUgaW4gbGluZSA0XG4gICAgICAgIGNoZWNrcG9pbnRfaWQ6IDFcbiAgICAgIH1cbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyAvL3RoaXMgd2lsbCBwcmV0dHkgbXVjaCBiZSB0aGUgc2FtZSBmb3IgYWxsIG9mIG15IHNlcnZpY2UgZnVuY3Rpb25zXG5cbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgIH0pXG4gfTtcblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uY29udHJvbGxlcignZWRpdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIGVkaXRTZXJ2aWNlLCAkc3RhdGUsIGNoZWNrcG9pbnRzKSB7XG4vL2dvdCBoZWxwIGZyb20gbHVjYXMgd2l0aGkgdGhpc1xuICAgICRzY29wZS5vYmogPSB7fTsvL2RvIGkgbmVlZCB0aGlzIHN0aWxsPz8/P1xuXG4gICAgJHNjb3BlLmdldHRlciA9IGZ1bmN0aW9uKGFkZFVzZXIpe1xuICAgICAgZWRpdFNlcnZpY2UuYWRkVXNlcihhZGRVc2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIC8vZXZlcnl0aGluZyB0aGF0IGhhcHBlbnMgQUZURVIgZ29lcyBoZXJlLCBsaWtlIGNsZWFyIGZvcm0sICRzdGF0ZS5nb1xuICAgICAgfSlcbiAgICB9O1xuLy8qKioqKioqKioqKioqKioqKmFkZGluZyBkb3RzIHRvIG1hcCBpbiBlZGl0IHZpZXcqKioqKioqKioqKioqKioqKioqLy9cbiAgICAkc2NvcGUuY2hlY2twb2ludHMgPSBjaGVja3BvaW50cztcbiAgICBjb25zb2xlLmxvZygkc2NvcGUuY2hlY2twb2ludHMpO1xuXG4vKiBFWEFNUExFXG5hbmd1bGFyLm1vZHVsZSgnc3RhcldhcnNBcHAnKVxuLmNvbnRyb2xsZXIoJ21haW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBzdGFyV2Fyc1NlcnZpY2UpIHtcbiAgc3RhcldhcnNTZXJ2aWNlLmdldFBlb3BsZSgpIC8vdGhpcyBpcyB0aGUgcHJvbWlzZVxuICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkgeyAvLy50aGVuIGNhbGxiYWNrIGZ1bmN0aW9uIHJlcHJlc2VudHMgb3VyIGRhdGEsIHdoaWNoIGlzIHRoZSBnZXRQZW9wbGUgZnVuY3Rpb24gaW4gc3RhcldhcnNTZXJ2aWNlLiBhbHNvLCByZXNwb25zZSBpcyBqdXN0IGEgY29tbW9uIHBhcmFtZXRlciBuYW1lLCBjYW4gYmUgbmFtZWQgYW55dGhpbmcsIGJ1dCB1c2UgcmVzcG9uc2UuXG4gICAgJHNjb3BlLnBlb3BsZSA9IHJlc3BvbnNlLmRhdGEucmVzdWx0czsgLy90aGUgcmV0dXJuZWQgcHJvbWlzZSBpcyBkYXRhIGZyb20gcmVzcG9uc2UuZGF0YS5yZXN1bHRzLiBub3cgcmVzcG9uc2UuZGF0YS5yZXN1bHRzIGlzIGxpa2UgYSBmaWxlcGF0aCBmb3VuZCBpbiB0aGUgb2JqZWN0IHRoYXQgaXMgcmV0cmVpdmVkIGZyb20gU3dhcGkuY28uIGkgY2FuIHNlZSBvYmplY3Qgc3RydWN0dXJlIGlmIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgfSlcbn0pXG4qL1xuXG59KTtcbiIsIi8vIElOSVRJTElaRSBTRVJWSUNFXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmFuZ3VsYXIubW9kdWxlKFwib3JkZXJob3VuZFwiKS5zZXJ2aWNlKFwiZWRpdFNlcnZpY2VcIiwgZnVuY3Rpb24oJGh0dHApIHtcblxuICAvLyBDUlVEIEZVTkNUSU9OU1xuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxudGhpcy5hZGRVc2VyID0gZnVuY3Rpb24oYWRkVXNlcikge1xuICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICB1cmw6ICcvYWRkVXNlcicsXG4gICAgICAgICAgZGF0YTogYWRkVXNlclxuICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH0pO1xuICB9O1xuICAvLyoqKioqKioqKioqYWRkaW5nIGRvdHMgdG8gaW1hZ2Ugb2YgbWFwIGluIGVkaXQgdmlldyoqKioqKioqKioqLy9cbiAgdGhpcy5jaGVja3BvaW50cyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgdXJsOiAnL2NoZWNrcG9pbnRzJyxcbiAgICAgIC8vZGF0YTogY2hlY2twb2ludHNcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgIH0pO1xuICB9O1xuXG4gfSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uY29udHJvbGxlcignaG9tZUN0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCBob21lU2VydmljZSwgdXNlcikge1xuXG4gICRzY29wZS50ZXN0ID0gaG9tZVNlcnZpY2UubWVzc2FnZTtcblxuICAkc2NvcGUuYWRkcG8gPSBmdW5jdGlvbiAocG9udW0pIHtcbiAgICBob21lU2VydmljZS5hZGRwbyhwb251bSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgIC8vbWFrZSBhIGNvbmZpcm1hdGlvbiBtZXNzYWdlLCBsaWtlIGNoZWNraW4gY29uZmlybWVkXG5cbiAgICB9KVxuICB9O1xuLy8qKioqKmdpdmVzIHZpZXcgZW1wbG95ZWVfbmFtZSwgcGhvdG8sIGNoZWNrcG9pbnRfbmFtZSBmb3IgdGhlIHdlbGNvbWUgbWVzc2FnZSBpbiBob21lIHZpZXcgZnJvbSBkYXRhYnNlKioqKiovL1xuICAkc2NvcGUud2VsY29tZUFzc2V0cyA9IGZ1bmN0aW9uKCkge1xuICAgIC8vY2FsbCB0aGUgZnVuY3Rpb24gdGhhdCdzIGluIHNlcnZpY2VcbiAgICBjb25zb2xlLmxvZygnaXMgdGhpcyBvcGVyYXRpbmc/Jyk7XG4gICAgaG9tZVNlcnZpY2Uud2VsY29tZUFzc2V0cygpIC8vbm93IHdlJ3JlIGNhbGxpbmcgd2VsY29tZUFzc2V0cyBpbiB0aGUgaG9tZVNlcnZpY2UsIGZyb20gaG9tZUN0cmxcbiAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgY29uc29sZS5sb2coJ3RoaXMgaXMgb3VyIHJlc3BvbnNlJywgcmVzcG9uc2UpXG4gICAgICAkc2NvcGUucmVzcG9uc2UgPSByZXNwb25zZTtcblxuICAgIH0pXG4gIH1cbiAgJHNjb3BlLndlbGNvbWVBc3NldHMoKTtcbiB9KTtcbiIsIi8vIElOSVRJTElaRSBTRVJWSUNFXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5zZXJ2aWNlKCdob21lU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCkge1xuXG4vLyBDUlVEIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vL2FkZGluZyBwbyBudW1iZXIgdG8gcHJvZHVjdGlvblxuICB0aGlzLmFkZHBvID0gZnVuY3Rpb24gKHBvbnVtYmVyKSB7XG4gICAgcmV0dXJuICRodHRwICh7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogJy9jaGVja2luJyxcbiAgICAgIGRhdGE6IHsgLy90aGlzIGlzIHRoZSBib2R5ISByZXEuYm9keSBvbiB0aGUgb3RoZXIgc2lkZSwgdGhlIHNlcnZlciBzaWRlXG4gICAgICAgIHBvbnVtYmVyOiBwb251bWJlciwgLy90aGlzIGlzIG5vdCB0aGF0LiBpdHMgdmFyaWFibGUgaW4gbGluZSA0XG4gICAgICAgIGNoZWNrcG9pbnRfaWQ6IDEgLy90aGlzIHdpbGwgd29yayBhcyBsb25nIGFzIHRoZSBmaXJzdCBjaGVja3BvaW50IGlzIG5ldmVyIGRlbGV0ZWQuIGxhdGVyIG9uLCB3ZSBjYW4gZmlndXJlIG91dCBob3cgdG8gZml4IHRoYXQuXG4gICAgICB9XG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgLy90aGlzIHdpbGwgcHJldHR5IG11Y2ggYmUgdGhlIHNhbWUgZm9yIGFsbCBvZiBteSBzZXJ2aWNlIGZ1bmN0aW9uc1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgfSk7XG4gfTtcbi8vZ2V0dGluZyB1c2VyJ3MgbmFtZSB0byBhZGQgdG8gd2VsY29tZSBtZXNzYWdlXG4gIHRoaXMud2VsY29tZUFzc2V0cyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgdXJsOiAnL3dlbGNvbWVBc3NldHMnXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7IC8vY2F0Y2hpbmcgdGhlIHJlc3BvbnNlIGZyb20gdGhlIHNlcnZlclxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7IC8vcmVzcG9uc2UuZGF0YSBpcyB0aGUgaW5mbyB3ZSB3YW50XG4gIH0pO1xufTtcblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4gICAgLmNvbnRyb2xsZXIoJ2xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAkc2NvcGUudGVzdCA9IFwibWFqb3IgdG9tIHRvIGdyb3VuZCBjb250cm9sXCI7XG4vLyoqKioqKioqKioqKioqKioqKioqKipERUxFVEUgVEhJUyBCRUZPUkUgUFJFU0VOVElORyBBTkQgSE9TVElORyoqKioqKioqKioqKioqKioqKioqKi8vXG4gICRzY29wZS51c2VyID0ge1xuICAgIG5hbWU6ICdRdWlubicsXG4gICAgcGFzc3dvcmQ6ICdxJ1xuICB9XG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbiAgICAgICAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24odXNlcikge1xuICAgICAgICAgICAgYXV0aFNlcnZpY2UubG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdVc2VyIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS51c2VyLnBhc3N3b3JkID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYocmVzcG9uc2UuZGF0YS5hZG1pbil7XG4gICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FkbWluLWhvbWUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdob21lJyk7IC8vdGFrZXMgdXMgdG8gaG9tZT8/Pz9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnVW5hYmxlIHRvIGxvZ2luJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9KTtcblxuLy9SRUZFUiBUTyBUSElTIENPREUgV0hFTiBUSU1FIFRPIFJFR0lTVEVSIEJVU0lORVNTXG4vLyAgICRzY29wZS5yZWdpc3RlciA9IGZ1bmN0aW9uKHVzZXIpIHtcbi8vICAgICAgIGF1dGhTZXJ2aWNlLnJlZ2lzdGVyVXNlcih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSkge1xuLy8gICAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gY3JlYXRlIHVzZXInKTtcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICBhbGVydCgnVXNlciBDcmVhdGVkJyk7XG4vLyAgICAgICAgICAgJHNjb3BlLm5ld1VzZXIgPSB7fTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4vLyAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gY3JlYXRlIHVzZXInKTtcbi8vICAgICAgIH0pO1xuLy8gICAgIH07XG4vLyB9KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5jb250cm9sbGVyKCdtYXBDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XG5cblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uY29udHJvbGxlcigncmVnaXN0ZXJDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4vL1xuLy8gICAgICAgJHNjb3BlLnJlZ2lzdGVyID0gZnVuY3Rpb24odXNlcikge1xuLy9cbi8vICAgICAgICAgICBhdXRoU2VydmljZS5sb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSkge1xuLy8gICAgICAgICAgICAgICAgICAgYWxlcnQoJ1VzZXIgZG9lcyBub3QgZXhpc3QnKTtcbi8vICAgICAgICAgICAgICAgICAgICRzY29wZS51c2VyLnBhc3N3b3JkID0gJyc7XG4vLyAgICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FkbWluLWhvbWUnKTsgLy90YWtlcyB1cyB0byBob21lPz8/P1xuLy8gICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4vLyAgICAgICAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gbG9naW4nKTtcbi8vICAgICAgICAgICB9KTtcbi8vICAgICAgIH07XG4vL1xuLy8gfSk7XG5cbiRzY29wZS5yZWdpc3RlciA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgYXV0aFNlcnZpY2UucmVnaXN0ZXJVc2VyKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICBpZiAoIXJlc3BvbnNlLmRhdGEpIHtcbiAgICAgIGFsZXJ0KCdVbmFibGUgdG8gY3JlYXRlIHVzZXInKTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVzcG9uc2UuZGF0YSl7XG4gICAgICBhbGVydCgnVXNlciBDcmVhdGVkJyk7XG4gICAgICAkc2NvcGUubmV3VXNlciA9IHt9O1xuICAgICAgJHN0YXRlLmdvKCdlZGl0Jyk7XG4gICAgfVxuICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICBhbGVydCgnVW5hYmxlIHRvIGNyZWF0ZSB1c2VyJyk7XG4gIH0pO1xufTtcbn0pO1xuIl19
