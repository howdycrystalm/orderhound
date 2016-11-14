angular.module('orderhound',  ['ui.router'/*, 'angular-simple-sidebar'*/]);

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
.controller('sidebarCtrl', ["$scope", function ($scope) {

  $scope.state = true;
  $scope.menuTitle = "menu";
  $scope.settings = {
  	close: true,
  	closeIcon: "fa fa-times"
  };
  $scope.items = [
      {
          name: "first item",
          link: "//google.com",
          icon: "fa fa-google",
          target: "_blank"
      },
      {
          name: "second item",
          link: "",
          icon: "",
          target: ""
      }
  ];
 }]);

angular.module('orderhound')
  .directive('angular-simple-sidebar', function() {
    return {
      restrict: 'E',
      templateUrl: './public/app/states/sidebarTmpl.html'
    }
  })

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImpzL3JvdXRlcnMuanMiLCJzZXJ2aWNlcy9hdXRoU2VydmljZS5qcyIsInNlcnZpY2VzL3VzZXJTZXJ2aWNlLmpzIiwic3RhdGVzL3NpZGViYXJDdHJsLmpzIiwianMvZGlyZWN0aXZlcy9zaWRlYmFyLWRpcmVjdGl2ZS5qcyIsInN0YXRlcy9hZG1pbi1ob21lL2FkbWluLWhvbWVDdHJsLmpzIiwic3RhdGVzL2FkbWluLWhvbWUvYWRtaW5TZXJ2aWNlLmpzIiwic3RhdGVzL2VkaXQvZWRpdEN0cmwuanMiLCJzdGF0ZXMvZWRpdC9lZGl0U2VydmljZS5qcyIsInN0YXRlcy9ob21lL2hvbWVDdHJsLmpzIiwic3RhdGVzL2hvbWUvaG9tZVNlcnZpY2UuanMiLCJzdGF0ZXMvbG9naW4vbG9naW5DdHJsLmpzIiwic3RhdGVzL21hcC9tYXBDdHJsLmpzIiwic3RhdGVzL3JlZ2lzdGVyL3JlZ2lzdGVyQ3RybC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sZUFBZSxDQUFDO0FBQy9CO0FDREEsUUFBUSxPQUFPO0tBQ1YsZ0RBQU8sU0FBUyxnQkFBZ0Isb0JBQW9COztRQUVqRCxtQkFBbUIsVUFBVTs7UUFFN0I7YUFDSyxNQUFNLFNBQVM7Z0JBQ1osS0FBSztnQkFDTCxZQUFZO2dCQUNaLGFBQWE7O2FBRWhCLE1BQU0sUUFBUTtnQkFDWCxLQUFLO2dCQUNMLFlBQVk7Z0JBQ1osYUFBYTtnQkFDYixTQUFTO29CQUNMLCtCQUFlLFNBQVMsYUFBYTtzQkFDbkMsT0FBTyxZQUFZOztvQkFFckIsZ0NBQU0sU0FBUyxhQUFhLFFBQVE7d0JBQ2hDLE9BQU8sWUFBWTs2QkFDZCxLQUFLLFNBQVMsVUFBVTtnQ0FDckIsSUFBSSxDQUFDLFNBQVM7b0NBQ1YsT0FBTyxHQUFHO2dDQUNkLE9BQU8sU0FBUzs7NkJBRW5CLE1BQU0sU0FBUyxLQUFLO2dDQUNqQixPQUFPLEdBQUc7Ozs7O2FBSzdCLE1BQU0sWUFBWTtnQkFDZixLQUFLO2dC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O3FCQUV0QixHQUFHLFNBQVMsS0FBSyxNQUFNO2tCQUMxQixPQUFPLEdBQUc7O3FCQUVQOztvQkFFRCxPQUFPLEdBQUc7O2VBRWYsTUFBTSxTQUFTLEtBQUs7Z0JBQ25CLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQnRCO0FDM0NBLFFBQVEsT0FBTztDQUNkLFdBQVcsc0JBQVcsU0FBUyxRQUFROzs7O0FBSXhDO0FDTEEsUUFBUSxPQUFPO0NBQ2QsV0FBVyxvREFBZ0IsU0FBUyxRQUFRLGFBQWEsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JsRSxPQUFPLFdBQVcsU0FBUyxNQUFNO0VBQy9CLFlBQVksYUFBYSxNQUFNLEtBQUssU0FBUyxVQUFVO0lBQ3JELElBQUksQ0FBQyxTQUFTLE1BQU07TUFDbEIsTUFBTTs7U0FFSCxJQUFJLFNBQVMsS0FBSztNQUNyQixNQUFNO01BQ04sT0FBTyxVQUFVO01BQ2pCLE9BQU8sR0FBRzs7S0FFWCxNQUFNLFNBQVMsS0FBSztJQUNyQixNQUFNOzs7O0FBSVYiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnLCAgWyd1aS5yb3V0ZXInLyosICdhbmd1bGFyLXNpbXBsZS1zaWRlYmFyJyovXSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4gICAgLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpXG5cbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgICAgIC5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbG9naW5DdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvbG9naW4vbG9naW4uaHRtbCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgd2VsY29tZUFzc2V0czogZnVuY3Rpb24oaG9tZVNlcnZpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaG9tZVNlcnZpY2Uud2VsY29tZUFzc2V0cygpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB1c2VyOiBmdW5jdGlvbihhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXV0aFNlcnZpY2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ3JlZ2lzdGVyJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9yZWdpc3RlcicsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3JlZ2lzdGVyQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL3JlZ2lzdGVyL3JlZ2lzdGVyLmh0bWwnLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYWRtaW4taG9tZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvYWRtaW4taG9tZScsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2FkbWluLWhvbWVDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvYWRtaW4taG9tZS9hZG1pbi1ob21lLmh0bWwnLFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogZnVuY3Rpb24oYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF1dGhTZXJ2aWNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdlZGl0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9lZGl0JyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZWRpdEN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0YXRlcy9lZGl0L2VkaXQuaHRtbCcsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICBjaGVja3BvaW50czogZnVuY3Rpb24oZWRpdFNlcnZpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWRpdFNlcnZpY2UuY2hlY2twb2ludHMoKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogZnVuY3Rpb24oYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF1dGhTZXJ2aWNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ21hcCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvbWFwJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFwQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL21hcC9tYXAuaHRtbCcsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICB1c2VyOiBmdW5jdGlvbihhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXV0aFNlcnZpY2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJykuc2VydmljZShcImF1dGhTZXJ2aWNlXCIsIGZ1bmN0aW9uKCRodHRwKSB7XG5cbiAgICB0aGlzLmxvZ2luID0gZnVuY3Rpb24odXNlcikge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmxvZ291dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy9sb2dvdXQnXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Q3VycmVudFVzZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6ICcvaG9tZSdcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuLy9nb29kIHRvIGdvXG4gICAgdGhpcy5yZWdpc3RlclVzZXIgPSBmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJy9yZWdpc3RlcicsXG4gICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB0aGlzLmdldHRlciA9IGZ1bmN0aW9uKGFkZFVzZXIpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiAnL2FkZFVzZXInLFxuICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmVkaXRVc2VyID0gZnVuY3Rpb24oaWQsIHVzZXIpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICB1cmw6IFwiL3VzZXIvXCIgKyBpZCxcbiAgICAgICAgICAgIGRhdGE6IHVzZXJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpLnNlcnZpY2UoXCJ1c2VyU2VydmljZVwiLCBmdW5jdGlvbigkaHR0cCkge1xuXG4gICAgdGhpcy5nZXRVc2VycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy91c2VyJ1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG4vL2FtIGkgdXNpbmcgbGluZSAxMiBmdW5jdGlvbj8/Pz8/XG4gICAgdGhpcy5nZXRVc2VyID0gZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6ICcvdXNlcj9faWQ9JyArIGlkXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIE5vdCBOZWVkZWRcbiAgICAvL1xuICAgIC8vIHRoaXMuZGVsZXRlVXNlciA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgLy8gICByZXR1cm4gJGh0dHAoe1xuICAgIC8vICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgIC8vICAgICB1cmw6ICcvdXNlci8nICsgaWRcbiAgICAvLyAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAvLyAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIC8vICAgfSk7XG4gICAgLy8gfTtcbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLmNvbnRyb2xsZXIoJ3NpZGViYXJDdHJsJywgZnVuY3Rpb24gKCRzY29wZSkge1xuXG4gICRzY29wZS5zdGF0ZSA9IHRydWU7XG4gICRzY29wZS5tZW51VGl0bGUgPSBcIm1lbnVcIjtcbiAgJHNjb3BlLnNldHRpbmdzID0ge1xuICBcdGNsb3NlOiB0cnVlLFxuICBcdGNsb3NlSWNvbjogXCJmYSBmYS10aW1lc1wiXG4gIH07XG4gICRzY29wZS5pdGVtcyA9IFtcbiAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcImZpcnN0IGl0ZW1cIixcbiAgICAgICAgICBsaW5rOiBcIi8vZ29vZ2xlLmNvbVwiLFxuICAgICAgICAgIGljb246IFwiZmEgZmEtZ29vZ2xlXCIsXG4gICAgICAgICAgdGFyZ2V0OiBcIl9ibGFua1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIG5hbWU6IFwic2Vjb25kIGl0ZW1cIixcbiAgICAgICAgICBsaW5rOiBcIlwiLFxuICAgICAgICAgIGljb246IFwiXCIsXG4gICAgICAgICAgdGFyZ2V0OiBcIlwiXG4gICAgICB9XG4gIF07XG4gfSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4gIC5kaXJlY3RpdmUoJ2FuZ3VsYXItc2ltcGxlLXNpZGViYXInLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnLi9wdWJsaWMvYXBwL3N0YXRlcy9zaWRlYmFyVG1wbC5odG1sJ1xuICAgIH1cbiAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5jb250cm9sbGVyKCdhZG1pbi1ob21lQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsIGhvbWVTZXJ2aWNlLCB1c2VyKSB7XG5cbiAgJHNjb3BlLnRlc3QgPSBob21lU2VydmljZS5tZXNzYWdlO1xuICAkc2NvcGUubmFtZSA9IGZ1bmN0aW9uKGVtcGxveWVlX25hbWUpIHtcbiAgICBhZG1pblNlcnZpY2UubmFtZShlbXBsb3llZV9uYW1lKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgIH0pXG4gIH1cblxuICAkc2NvcGUuYWRkcG8gPSBmdW5jdGlvbiAocG9udW0pIHtcbiAgICBob21lU2VydmljZS5hZGRwbyhwb251bSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgIC8vbWFrZSBhIGNvbmZpcm1hdGlvbiBtZXNzYWdlLCBsaWtlIGNoZWNraW4gY29uZmlybWVkXG5cbiAgICB9KVxuICB9XG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLnNlcnZpY2UoJ2FkbWluU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCkge1xuXG4gIHRoaXMuYWRkcG8gPSBmdW5jdGlvbiAocG9udW1iZXIpIHtcbiAgICByZXR1cm4gJGh0dHAgKHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAnL2NoZWNraW4nLFxuICAgICAgZGF0YTogeyAvL3RoaXMgaXMgdGhlIGJvZHkhIHJlcS5ib2R5IG9uIHRoZSBvdGhlciBzaWRlLCB0aGUgc2VydmVyIHNpZGVcbiAgICAgICAgcG9udW1iZXI6IHBvbnVtYmVyLCAvL3RoaXMgaXMgbm90IHRoYXQuIGl0cyB2YXJpYWJsZSBpbiBsaW5lIDRcbiAgICAgICAgY2hlY2twb2ludF9pZDogMVxuICAgICAgfVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IC8vdGhpcyB3aWxsIHByZXR0eSBtdWNoIGJlIHRoZSBzYW1lIGZvciBhbGwgb2YgbXkgc2VydmljZSBmdW5jdGlvbnNcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgfSlcbiB9O1xuXG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5jb250cm9sbGVyKCdlZGl0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgZWRpdFNlcnZpY2UsICRzdGF0ZSwgY2hlY2twb2ludHMpIHtcbi8vZ290IGhlbHAgZnJvbSBsdWNhcyB3aXRoaSB0aGlzXG4gICAgJHNjb3BlLm9iaiA9IHt9Oy8vZG8gaSBuZWVkIHRoaXMgc3RpbGw/Pz8/XG5cbiAgICAkc2NvcGUuZ2V0dGVyID0gZnVuY3Rpb24oYWRkVXNlcil7XG4gICAgICBlZGl0U2VydmljZS5hZGRVc2VyKGFkZFVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgLy9ldmVyeXRoaW5nIHRoYXQgaGFwcGVucyBBRlRFUiBnb2VzIGhlcmUsIGxpa2UgY2xlYXIgZm9ybSwgJHN0YXRlLmdvXG4gICAgICB9KVxuICAgIH07XG4vLyoqKioqKioqKioqKioqKioqYWRkaW5nIGRvdHMgdG8gbWFwIGluIGVkaXQgdmlldyoqKioqKioqKioqKioqKioqKiovL1xuICAgICRzY29wZS5jaGVja3BvaW50cyA9IGNoZWNrcG9pbnRzO1xuICAgIGNvbnNvbGUubG9nKCRzY29wZS5jaGVja3BvaW50cyk7XG5cbi8qIEVYQU1QTEVcbmFuZ3VsYXIubW9kdWxlKCdzdGFyV2Fyc0FwcCcpXG4uY29udHJvbGxlcignbWFpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIHN0YXJXYXJzU2VydmljZSkge1xuICBzdGFyV2Fyc1NlcnZpY2UuZ2V0UGVvcGxlKCkgLy90aGlzIGlzIHRoZSBwcm9taXNlXG4gIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7IC8vLnRoZW4gY2FsbGJhY2sgZnVuY3Rpb24gcmVwcmVzZW50cyBvdXIgZGF0YSwgd2hpY2ggaXMgdGhlIGdldFBlb3BsZSBmdW5jdGlvbiBpbiBzdGFyV2Fyc1NlcnZpY2UuIGFsc28sIHJlc3BvbnNlIGlzIGp1c3QgYSBjb21tb24gcGFyYW1ldGVyIG5hbWUsIGNhbiBiZSBuYW1lZCBhbnl0aGluZywgYnV0IHVzZSByZXNwb25zZS5cbiAgICAkc2NvcGUucGVvcGxlID0gcmVzcG9uc2UuZGF0YS5yZXN1bHRzOyAvL3RoZSByZXR1cm5lZCBwcm9taXNlIGlzIGRhdGEgZnJvbSByZXNwb25zZS5kYXRhLnJlc3VsdHMuIG5vdyByZXNwb25zZS5kYXRhLnJlc3VsdHMgaXMgbGlrZSBhIGZpbGVwYXRoIGZvdW5kIGluIHRoZSBvYmplY3QgdGhhdCBpcyByZXRyZWl2ZWQgZnJvbSBTd2FwaS5jby4gaSBjYW4gc2VlIG9iamVjdCBzdHJ1Y3R1cmUgaWYgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICB9KVxufSlcbiovXG5cbn0pO1xuIiwiLy8gSU5JVElMSVpFIFNFUlZJQ0Vcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuYW5ndWxhci5tb2R1bGUoXCJvcmRlcmhvdW5kXCIpLnNlcnZpY2UoXCJlZGl0U2VydmljZVwiLCBmdW5jdGlvbigkaHR0cCkge1xuXG4gIC8vIENSVUQgRlVOQ1RJT05TXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG50aGlzLmFkZFVzZXIgPSBmdW5jdGlvbihhZGRVc2VyKSB7XG4gICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIHVybDogJy9hZGRVc2VyJyxcbiAgICAgICAgICBkYXRhOiBhZGRVc2VyXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSk7XG4gIH07XG4gIC8vKioqKioqKioqKiphZGRpbmcgZG90cyB0byBpbWFnZSBvZiBtYXAgaW4gZWRpdCB2aWV3KioqKioqKioqKiovL1xuICB0aGlzLmNoZWNrcG9pbnRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6ICcvY2hlY2twb2ludHMnLFxuICAgICAgLy9kYXRhOiBjaGVja3BvaW50c1xuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgfSk7XG4gIH07XG5cbiB9KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5jb250cm9sbGVyKCdob21lQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsIGhvbWVTZXJ2aWNlLCB1c2VyKSB7XG5cbiAgJHNjb3BlLnRlc3QgPSBob21lU2VydmljZS5tZXNzYWdlO1xuXG4gICRzY29wZS5hZGRwbyA9IGZ1bmN0aW9uIChwb251bSkge1xuICAgIGhvbWVTZXJ2aWNlLmFkZHBvKHBvbnVtKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgLy9tYWtlIGEgY29uZmlybWF0aW9uIG1lc3NhZ2UsIGxpa2UgY2hlY2tpbiBjb25maXJtZWRcblxuICAgIH0pXG4gIH07XG4vLyoqKioqZ2l2ZXMgdmlldyBlbXBsb3llZV9uYW1lLCBwaG90bywgY2hlY2twb2ludF9uYW1lIGZvciB0aGUgd2VsY29tZSBtZXNzYWdlIGluIGhvbWUgdmlldyBmcm9tIGRhdGFic2UqKioqKi8vXG4gICRzY29wZS53ZWxjb21lQXNzZXRzID0gZnVuY3Rpb24oKSB7XG4gICAgLy9jYWxsIHRoZSBmdW5jdGlvbiB0aGF0J3MgaW4gc2VydmljZVxuICAgIGNvbnNvbGUubG9nKCdpcyB0aGlzIG9wZXJhdGluZz8nKTtcbiAgICBob21lU2VydmljZS53ZWxjb21lQXNzZXRzKCkgLy9ub3cgd2UncmUgY2FsbGluZyB3ZWxjb21lQXNzZXRzIGluIHRoZSBob21lU2VydmljZSwgZnJvbSBob21lQ3RybFxuICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBjb25zb2xlLmxvZygndGhpcyBpcyBvdXIgcmVzcG9uc2UnLCByZXNwb25zZSlcbiAgICAgICRzY29wZS5yZXNwb25zZSA9IHJlc3BvbnNlO1xuXG4gICAgfSlcbiAgfVxuICAkc2NvcGUud2VsY29tZUFzc2V0cygpO1xuIH0pO1xuIiwiLy8gSU5JVElMSVpFIFNFUlZJQ0Vcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLnNlcnZpY2UoJ2hvbWVTZXJ2aWNlJywgZnVuY3Rpb24gKCRodHRwKSB7XG5cbi8vIENSVUQgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vYWRkaW5nIHBvIG51bWJlciB0byBwcm9kdWN0aW9uXG4gIHRoaXMuYWRkcG8gPSBmdW5jdGlvbiAocG9udW1iZXIpIHtcbiAgICByZXR1cm4gJGh0dHAgKHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAnL2NoZWNraW4nLFxuICAgICAgZGF0YTogeyAvL3RoaXMgaXMgdGhlIGJvZHkhIHJlcS5ib2R5IG9uIHRoZSBvdGhlciBzaWRlLCB0aGUgc2VydmVyIHNpZGVcbiAgICAgICAgcG9udW1iZXI6IHBvbnVtYmVyLCAvL3RoaXMgaXMgbm90IHRoYXQuIGl0cyB2YXJpYWJsZSBpbiBsaW5lIDRcbiAgICAgICAgY2hlY2twb2ludF9pZDogMSAvL3RoaXMgd2lsbCB3b3JrIGFzIGxvbmcgYXMgdGhlIGZpcnN0IGNoZWNrcG9pbnQgaXMgbmV2ZXIgZGVsZXRlZC4gbGF0ZXIgb24sIHdlIGNhbiBmaWd1cmUgb3V0IGhvdyB0byBmaXggdGhhdC5cbiAgICAgIH1cbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyAvL3RoaXMgd2lsbCBwcmV0dHkgbXVjaCBiZSB0aGUgc2FtZSBmb3IgYWxsIG9mIG15IHNlcnZpY2UgZnVuY3Rpb25zXG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICB9KTtcbiB9O1xuLy9nZXR0aW5nIHVzZXIncyBuYW1lIHRvIGFkZCB0byB3ZWxjb21lIG1lc3NhZ2VcbiAgdGhpcy53ZWxjb21lQXNzZXRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6ICcvd2VsY29tZUFzc2V0cydcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXsgLy9jYXRjaGluZyB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyXG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTsgLy9yZXNwb25zZS5kYXRhIGlzIHRoZSBpbmZvIHdlIHdhbnRcbiAgfSk7XG59O1xuXG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbiAgICAuY29udHJvbGxlcignbG9naW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4gICAgICAgICRzY29wZS50ZXN0ID0gXCJtYWpvciB0b20gdG8gZ3JvdW5kIGNvbnRyb2xcIjtcbi8vKioqKioqKioqKioqKioqKioqKioqKkRFTEVURSBUSElTIEJFRk9SRSBQUkVTRU5USU5HIEFORCBIT1NUSU5HKioqKioqKioqKioqKioqKioqKioqLy9cbiAgJHNjb3BlLnVzZXIgPSB7XG4gICAgbmFtZTogJ1F1aW5uJyxcbiAgICBwYXNzd29yZDogJ3EnXG4gIH1cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuICAgICAgICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgICAgICBhdXRoU2VydmljZS5sb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1VzZXIgZG9lcyBub3QgZXhpc3QnKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnVzZXIucGFzc3dvcmQgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihyZXNwb25zZS5kYXRhLmFkbWluKXtcbiAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYWRtaW4taG9tZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2hvbWUnKTsgLy90YWtlcyB1cyB0byBob21lPz8/P1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gbG9naW4nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH0pO1xuXG4vL1JFRkVSIFRPIFRISVMgQ09ERSBXSEVOIFRJTUUgVE8gUkVHSVNURVIgQlVTSU5FU1Ncbi8vICAgJHNjb3BlLnJlZ2lzdGVyID0gZnVuY3Rpb24odXNlcikge1xuLy8gICAgICAgYXV0aFNlcnZpY2UucmVnaXN0ZXJVc2VyKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKSB7XG4vLyAgICAgICAgICAgYWxlcnQoJ1VuYWJsZSB0byBjcmVhdGUgdXNlcicpO1xuLy8gICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgIGFsZXJ0KCdVc2VyIENyZWF0ZWQnKTtcbi8vICAgICAgICAgICAkc2NvcGUubmV3VXNlciA9IHt9O1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbi8vICAgICAgICAgYWxlcnQoJ1VuYWJsZSB0byBjcmVhdGUgdXNlcicpO1xuLy8gICAgICAgfSk7XG4vLyAgICAgfTtcbi8vIH0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLmNvbnRyb2xsZXIoJ21hcEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuXG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5jb250cm9sbGVyKCdyZWdpc3RlckN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbi8vXG4vLyAgICAgICAkc2NvcGUucmVnaXN0ZXIgPSBmdW5jdGlvbih1c2VyKSB7XG4vL1xuLy8gICAgICAgICAgIGF1dGhTZXJ2aWNlLmxvZ2luKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKSB7XG4vLyAgICAgICAgICAgICAgICAgICBhbGVydCgnVXNlciBkb2VzIG5vdCBleGlzdCcpO1xuLy8gICAgICAgICAgICAgICAgICAgJHNjb3BlLnVzZXIucGFzc3dvcmQgPSAnJztcbi8vICAgICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYWRtaW4taG9tZScpOyAvL3Rha2VzIHVzIHRvIGhvbWU/Pz8/XG4vLyAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbi8vICAgICAgICAgICAgICAgYWxlcnQoJ1VuYWJsZSB0byBsb2dpbicpO1xuLy8gICAgICAgICAgIH0pO1xuLy8gICAgICAgfTtcbi8vXG4vLyB9KTtcblxuJHNjb3BlLnJlZ2lzdGVyID0gZnVuY3Rpb24odXNlcikge1xuICBhdXRoU2VydmljZS5yZWdpc3RlclVzZXIodXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgIGlmICghcmVzcG9uc2UuZGF0YSkge1xuICAgICAgYWxlcnQoJ1VuYWJsZSB0byBjcmVhdGUgdXNlcicpO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZXNwb25zZS5kYXRhKXtcbiAgICAgIGFsZXJ0KCdVc2VyIENyZWF0ZWQnKTtcbiAgICAgICRzY29wZS5uZXdVc2VyID0ge307XG4gICAgICAkc3RhdGUuZ28oJ2VkaXQnKTtcbiAgICB9XG4gIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgIGFsZXJ0KCdVbmFibGUgdG8gY3JlYXRlIHVzZXInKTtcbiAgfSk7XG59O1xufSk7XG4iXX0=
