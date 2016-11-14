angular.module('orderhound',  ['ui.router']);

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInNlcnZpY2VzL2F1dGhTZXJ2aWNlLmpzIiwic2VydmljZXMvdXNlclNlcnZpY2UuanMiLCJqcy9yb3V0ZXJzLmpzIiwic3RhdGVzL2FkbWluLWhvbWUvYWRtaW4taG9tZUN0cmwuanMiLCJzdGF0ZXMvYWRtaW4taG9tZS9hZG1pblNlcnZpY2UuanMiLCJzdGF0ZXMvZWRpdC9lZGl0Q3RybC5qcyIsInN0YXRlcy9lZGl0L2VkaXRTZXJ2aWNlLmpzIiwic3RhdGVzL2xvZ2luL2xvZ2luQ3RybC5qcyIsInN0YXRlcy9ob21lL2hvbWVDdHJsLmpzIiwic3RhdGVzL2hvbWUvaG9tZVNlcnZpY2UuanMiLCJzdGF0ZXMvbWFwL21hcEN0cmwuanMiLCJzdGF0ZXMvcmVnaXN0ZXIvcmVnaXN0ZXJDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxlQUFlLENBQUM7QUFDL0I7QUNEQSxRQUFRLE9BQU8sY0FBYyxRQUFRLHlCQUFlLFNBQVMsT0FBTzs7SUFFaEUsS0FBSyxRQUFRLFNBQVMsTUFBTTtRQUN4QixPQUFPLE1BQU07WUFDVCxRQUFRO1lBQ1IsS0FBSztZQUNMLE1BQU07V0FDUCxLQUFLLFNBQVMsVUFBVTtZQUN2QixPQUFPOzs7O0lBSWYsS0FBSyxTQUFTLFdBQVc7UUFDckIsT0FBTyxNQUFNO1lBQ1QsUUFBUTtZQUNSLEtBQUs7V0FDTixLQUFLLFNBQVMsVUFBVTtZQUN2QixPQUFPOzs7O0lBSWYsS0FBSyxpQkFBaUIsV0FBVztRQUM3QixPQUFPLE1BQU07WUFDVCxRQUFRO1lBQ1IsS0FBSztXQUNOLEtBQUssU0FBUyxVQUFVO1lBQ3ZCLE9BQU87Ozs7SUFJZixLQUFLLGVBQWUsU0FBUyxNQUFNO1FBQy9CLE9BQU8sTUFBTTtZQUNULFFBQVE7WUFDUixLQUFLO1lBQ0wsTUFBTTtXQUNQLEtBQUssU0FBUyxVQUFVO1lBQ3ZCLE9BQU87OztJQUdmLEtBQUssU0FBUyxTQUFTLFNBQVM7UUFDNUIsT0FBTyxNQUFN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QUFLO01BQ3JCLE1BQU07TUFDTixPQUFPLFVBQVU7TUFDakIsT0FBTyxHQUFHOztLQUVYLE1BQU0sU0FBUyxLQUFLO0lBQ3JCLE1BQU07Ozs7QUFJViIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcsICBbJ3VpLnJvdXRlciddKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJykuc2VydmljZShcImF1dGhTZXJ2aWNlXCIsIGZ1bmN0aW9uKCRodHRwKSB7XG5cbiAgICB0aGlzLmxvZ2luID0gZnVuY3Rpb24odXNlcikge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmxvZ291dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy9sb2dvdXQnXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Q3VycmVudFVzZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6ICcvaG9tZSdcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuLy9nb29kIHRvIGdvXG4gICAgdGhpcy5yZWdpc3RlclVzZXIgPSBmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJy9yZWdpc3RlcicsXG4gICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB0aGlzLmdldHRlciA9IGZ1bmN0aW9uKGFkZFVzZXIpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiAnL2FkZFVzZXInLFxuICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmVkaXRVc2VyID0gZnVuY3Rpb24oaWQsIHVzZXIpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICB1cmw6IFwiL3VzZXIvXCIgKyBpZCxcbiAgICAgICAgICAgIGRhdGE6IHVzZXJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpLnNlcnZpY2UoXCJ1c2VyU2VydmljZVwiLCBmdW5jdGlvbigkaHR0cCkge1xuXG4gICAgdGhpcy5nZXRVc2VycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy91c2VyJ1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG4vL2FtIGkgdXNpbmcgbGluZSAxMiBmdW5jdGlvbj8/Pz8/XG4gICAgdGhpcy5nZXRVc2VyID0gZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6ICcvdXNlcj9faWQ9JyArIGlkXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIE5vdCBOZWVkZWRcbiAgICAvL1xuICAgIC8vIHRoaXMuZGVsZXRlVXNlciA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgLy8gICByZXR1cm4gJGh0dHAoe1xuICAgIC8vICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgIC8vICAgICB1cmw6ICcvdXNlci8nICsgaWRcbiAgICAvLyAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAvLyAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIC8vICAgfSk7XG4gICAgLy8gfTtcbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuICAgIC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKVxuXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAuc3RhdGUoJ2xvZ2luJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2xvZ2luQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL2xvZ2luL2xvZ2luLmh0bWwnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdob21lJywge1xuICAgICAgICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL2hvbWUvaG9tZS5odG1sJyxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIHdlbGNvbWVBc3NldHM6IGZ1bmN0aW9uKGhvbWVTZXJ2aWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhvbWVTZXJ2aWNlLndlbGNvbWVBc3NldHMoKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogZnVuY3Rpb24oYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF1dGhTZXJ2aWNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdyZWdpc3RlcicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvcmVnaXN0ZXInLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyZWdpc3RlckN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0YXRlcy9yZWdpc3Rlci9yZWdpc3Rlci5odG1sJyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FkbWluLWhvbWUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2FkbWluLWhvbWUnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdhZG1pbi1ob21lQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL2FkbWluLWhvbWUvYWRtaW4taG9tZS5odG1sJyxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IGZ1bmN0aW9uKGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdXRoU2VydmljZS5nZXRDdXJyZW50VXNlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnZWRpdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZWRpdCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2VkaXRDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvZWRpdC9lZGl0Lmh0bWwnLFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2twb2ludHM6IGZ1bmN0aW9uKGVkaXRTZXJ2aWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVkaXRTZXJ2aWNlLmNoZWNrcG9pbnRzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IGZ1bmN0aW9uKGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdXRoU2VydmljZS5nZXRDdXJyZW50VXNlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdtYXAnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL21hcCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21hcEN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0YXRlcy9tYXAvbWFwLmh0bWwnLFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogZnVuY3Rpb24oYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF1dGhTZXJ2aWNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uY29udHJvbGxlcignYWRtaW4taG9tZUN0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCBob21lU2VydmljZSwgdXNlcikge1xuXG4gICRzY29wZS50ZXN0ID0gaG9tZVNlcnZpY2UubWVzc2FnZTtcbiAgJHNjb3BlLm5hbWUgPSBmdW5jdGlvbihlbXBsb3llZV9uYW1lKSB7XG4gICAgYWRtaW5TZXJ2aWNlLm5hbWUoZW1wbG95ZWVfbmFtZSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICB9KVxuICB9XG5cbiAgJHNjb3BlLmFkZHBvID0gZnVuY3Rpb24gKHBvbnVtKSB7XG4gICAgaG9tZVNlcnZpY2UuYWRkcG8ocG9udW0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAvL21ha2UgYSBjb25maXJtYXRpb24gbWVzc2FnZSwgbGlrZSBjaGVja2luIGNvbmZpcm1lZFxuXG4gICAgfSlcbiAgfVxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5zZXJ2aWNlKCdhZG1pblNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHApIHtcblxuICB0aGlzLmFkZHBvID0gZnVuY3Rpb24gKHBvbnVtYmVyKSB7XG4gICAgcmV0dXJuICRodHRwICh7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogJy9jaGVja2luJyxcbiAgICAgIGRhdGE6IHsgLy90aGlzIGlzIHRoZSBib2R5ISByZXEuYm9keSBvbiB0aGUgb3RoZXIgc2lkZSwgdGhlIHNlcnZlciBzaWRlXG4gICAgICAgIHBvbnVtYmVyOiBwb251bWJlciwgLy90aGlzIGlzIG5vdCB0aGF0LiBpdHMgdmFyaWFibGUgaW4gbGluZSA0XG4gICAgICAgIGNoZWNrcG9pbnRfaWQ6IDFcbiAgICAgIH1cbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyAvL3RoaXMgd2lsbCBwcmV0dHkgbXVjaCBiZSB0aGUgc2FtZSBmb3IgYWxsIG9mIG15IHNlcnZpY2UgZnVuY3Rpb25zXG5cbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgIH0pXG4gfTtcblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uY29udHJvbGxlcignZWRpdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIGVkaXRTZXJ2aWNlLCAkc3RhdGUsIGNoZWNrcG9pbnRzKSB7XG4vL2dvdCBoZWxwIGZyb20gbHVjYXMgd2l0aGkgdGhpc1xuICAgICRzY29wZS5vYmogPSB7fTsvL2RvIGkgbmVlZCB0aGlzIHN0aWxsPz8/P1xuXG4gICAgJHNjb3BlLmdldHRlciA9IGZ1bmN0aW9uKGFkZFVzZXIpe1xuICAgICAgZWRpdFNlcnZpY2UuYWRkVXNlcihhZGRVc2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIC8vZXZlcnl0aGluZyB0aGF0IGhhcHBlbnMgQUZURVIgZ29lcyBoZXJlLCBsaWtlIGNsZWFyIGZvcm0sICRzdGF0ZS5nb1xuICAgICAgfSlcbiAgICB9O1xuLy8qKioqKioqKioqKioqKioqKmFkZGluZyBkb3RzIHRvIG1hcCBpbiBlZGl0IHZpZXcqKioqKioqKioqKioqKioqKioqLy9cbiAgICAkc2NvcGUuY2hlY2twb2ludHMgPSBjaGVja3BvaW50cztcbiAgICBjb25zb2xlLmxvZygkc2NvcGUuY2hlY2twb2ludHMpO1xuXG4vKiBFWEFNUExFXG5hbmd1bGFyLm1vZHVsZSgnc3RhcldhcnNBcHAnKVxuLmNvbnRyb2xsZXIoJ21haW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBzdGFyV2Fyc1NlcnZpY2UpIHtcbiAgc3RhcldhcnNTZXJ2aWNlLmdldFBlb3BsZSgpIC8vdGhpcyBpcyB0aGUgcHJvbWlzZVxuICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkgeyAvLy50aGVuIGNhbGxiYWNrIGZ1bmN0aW9uIHJlcHJlc2VudHMgb3VyIGRhdGEsIHdoaWNoIGlzIHRoZSBnZXRQZW9wbGUgZnVuY3Rpb24gaW4gc3RhcldhcnNTZXJ2aWNlLiBhbHNvLCByZXNwb25zZSBpcyBqdXN0IGEgY29tbW9uIHBhcmFtZXRlciBuYW1lLCBjYW4gYmUgbmFtZWQgYW55dGhpbmcsIGJ1dCB1c2UgcmVzcG9uc2UuXG4gICAgJHNjb3BlLnBlb3BsZSA9IHJlc3BvbnNlLmRhdGEucmVzdWx0czsgLy90aGUgcmV0dXJuZWQgcHJvbWlzZSBpcyBkYXRhIGZyb20gcmVzcG9uc2UuZGF0YS5yZXN1bHRzLiBub3cgcmVzcG9uc2UuZGF0YS5yZXN1bHRzIGlzIGxpa2UgYSBmaWxlcGF0aCBmb3VuZCBpbiB0aGUgb2JqZWN0IHRoYXQgaXMgcmV0cmVpdmVkIGZyb20gU3dhcGkuY28uIGkgY2FuIHNlZSBvYmplY3Qgc3RydWN0dXJlIGlmIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgfSlcbn0pXG4qL1xuXG59KTtcbiIsIi8vIElOSVRJTElaRSBTRVJWSUNFXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmFuZ3VsYXIubW9kdWxlKFwib3JkZXJob3VuZFwiKS5zZXJ2aWNlKFwiZWRpdFNlcnZpY2VcIiwgZnVuY3Rpb24oJGh0dHApIHtcblxuICAvLyBDUlVEIEZVTkNUSU9OU1xuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxudGhpcy5hZGRVc2VyID0gZnVuY3Rpb24oYWRkVXNlcikge1xuICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICB1cmw6ICcvYWRkVXNlcicsXG4gICAgICAgICAgZGF0YTogYWRkVXNlclxuICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH0pO1xuICB9O1xuICAvLyoqKioqKioqKioqYWRkaW5nIGRvdHMgdG8gaW1hZ2Ugb2YgbWFwIGluIGVkaXQgdmlldyoqKioqKioqKioqLy9cbiAgdGhpcy5jaGVja3BvaW50cyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgdXJsOiAnL2NoZWNrcG9pbnRzJyxcbiAgICAgIC8vZGF0YTogY2hlY2twb2ludHNcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgIH0pO1xuICB9O1xuXG4gfSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4gICAgLmNvbnRyb2xsZXIoJ2xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAkc2NvcGUudGVzdCA9IFwibWFqb3IgdG9tIHRvIGdyb3VuZCBjb250cm9sXCI7XG4vLyoqKioqKioqKioqKioqKioqKioqKipERUxFVEUgVEhJUyBCRUZPUkUgUFJFU0VOVElORyBBTkQgSE9TVElORyoqKioqKioqKioqKioqKioqKioqKi8vXG4gICRzY29wZS51c2VyID0ge1xuICAgIG5hbWU6ICdRdWlubicsXG4gICAgcGFzc3dvcmQ6ICdxJ1xuICB9XG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbiAgICAgICAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24odXNlcikge1xuICAgICAgICAgICAgYXV0aFNlcnZpY2UubG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdVc2VyIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS51c2VyLnBhc3N3b3JkID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYocmVzcG9uc2UuZGF0YS5hZG1pbil7XG4gICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FkbWluLWhvbWUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdob21lJyk7IC8vdGFrZXMgdXMgdG8gaG9tZT8/Pz9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnVW5hYmxlIHRvIGxvZ2luJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9KTtcblxuLy9SRUZFUiBUTyBUSElTIENPREUgV0hFTiBUSU1FIFRPIFJFR0lTVEVSIEJVU0lORVNTXG4vLyAgICRzY29wZS5yZWdpc3RlciA9IGZ1bmN0aW9uKHVzZXIpIHtcbi8vICAgICAgIGF1dGhTZXJ2aWNlLnJlZ2lzdGVyVXNlcih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSkge1xuLy8gICAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gY3JlYXRlIHVzZXInKTtcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICBhbGVydCgnVXNlciBDcmVhdGVkJyk7XG4vLyAgICAgICAgICAgJHNjb3BlLm5ld1VzZXIgPSB7fTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4vLyAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gY3JlYXRlIHVzZXInKTtcbi8vICAgICAgIH0pO1xuLy8gICAgIH07XG4vLyB9KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5jb250cm9sbGVyKCdob21lQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsIGhvbWVTZXJ2aWNlLCB1c2VyKSB7XG5cbiAgJHNjb3BlLnRlc3QgPSBob21lU2VydmljZS5tZXNzYWdlO1xuXG4gICRzY29wZS5hZGRwbyA9IGZ1bmN0aW9uIChwb251bSkge1xuICAgIGhvbWVTZXJ2aWNlLmFkZHBvKHBvbnVtKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgLy9tYWtlIGEgY29uZmlybWF0aW9uIG1lc3NhZ2UsIGxpa2UgY2hlY2tpbiBjb25maXJtZWRcblxuICAgIH0pXG4gIH07XG4vLyoqKioqZ2l2ZXMgdmlldyBlbXBsb3llZV9uYW1lLCBwaG90bywgY2hlY2twb2ludF9uYW1lIGZvciB0aGUgd2VsY29tZSBtZXNzYWdlIGluIGhvbWUgdmlldyBmcm9tIGRhdGFic2UqKioqKi8vXG4gICRzY29wZS53ZWxjb21lQXNzZXRzID0gZnVuY3Rpb24oKSB7XG4gICAgLy9jYWxsIHRoZSBmdW5jdGlvbiB0aGF0J3MgaW4gc2VydmljZVxuICAgIGNvbnNvbGUubG9nKCdpcyB0aGlzIG9wZXJhdGluZz8nKTtcbiAgICBob21lU2VydmljZS53ZWxjb21lQXNzZXRzKCkgLy9ub3cgd2UncmUgY2FsbGluZyB3ZWxjb21lQXNzZXRzIGluIHRoZSBob21lU2VydmljZSwgZnJvbSBob21lQ3RybFxuICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBjb25zb2xlLmxvZygndGhpcyBpcyBvdXIgcmVzcG9uc2UnLCByZXNwb25zZSlcbiAgICAgICRzY29wZS5yZXNwb25zZSA9IHJlc3BvbnNlO1xuXG4gICAgfSlcbiAgfVxuICAkc2NvcGUud2VsY29tZUFzc2V0cygpO1xuIH0pO1xuIiwiLy8gSU5JVElMSVpFIFNFUlZJQ0Vcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLnNlcnZpY2UoJ2hvbWVTZXJ2aWNlJywgZnVuY3Rpb24gKCRodHRwKSB7XG5cbi8vIENSVUQgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vYWRkaW5nIHBvIG51bWJlciB0byBwcm9kdWN0aW9uXG4gIHRoaXMuYWRkcG8gPSBmdW5jdGlvbiAocG9udW1iZXIpIHtcbiAgICByZXR1cm4gJGh0dHAgKHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAnL2NoZWNraW4nLFxuICAgICAgZGF0YTogeyAvL3RoaXMgaXMgdGhlIGJvZHkhIHJlcS5ib2R5IG9uIHRoZSBvdGhlciBzaWRlLCB0aGUgc2VydmVyIHNpZGVcbiAgICAgICAgcG9udW1iZXI6IHBvbnVtYmVyLCAvL3RoaXMgaXMgbm90IHRoYXQuIGl0cyB2YXJpYWJsZSBpbiBsaW5lIDRcbiAgICAgICAgY2hlY2twb2ludF9pZDogMSAvL3RoaXMgd2lsbCB3b3JrIGFzIGxvbmcgYXMgdGhlIGZpcnN0IGNoZWNrcG9pbnQgaXMgbmV2ZXIgZGVsZXRlZC4gbGF0ZXIgb24sIHdlIGNhbiBmaWd1cmUgb3V0IGhvdyB0byBmaXggdGhhdC5cbiAgICAgIH1cbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyAvL3RoaXMgd2lsbCBwcmV0dHkgbXVjaCBiZSB0aGUgc2FtZSBmb3IgYWxsIG9mIG15IHNlcnZpY2UgZnVuY3Rpb25zXG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICB9KTtcbiB9O1xuLy9nZXR0aW5nIHVzZXIncyBuYW1lIHRvIGFkZCB0byB3ZWxjb21lIG1lc3NhZ2VcbiAgdGhpcy53ZWxjb21lQXNzZXRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6ICcvd2VsY29tZUFzc2V0cydcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXsgLy9jYXRjaGluZyB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyXG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTsgLy9yZXNwb25zZS5kYXRhIGlzIHRoZSBpbmZvIHdlIHdhbnRcbiAgfSk7XG59O1xuXG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5jb250cm9sbGVyKCdtYXBDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XG5cblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uY29udHJvbGxlcigncmVnaXN0ZXJDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4vL1xuLy8gICAgICAgJHNjb3BlLnJlZ2lzdGVyID0gZnVuY3Rpb24odXNlcikge1xuLy9cbi8vICAgICAgICAgICBhdXRoU2VydmljZS5sb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSkge1xuLy8gICAgICAgICAgICAgICAgICAgYWxlcnQoJ1VzZXIgZG9lcyBub3QgZXhpc3QnKTtcbi8vICAgICAgICAgICAgICAgICAgICRzY29wZS51c2VyLnBhc3N3b3JkID0gJyc7XG4vLyAgICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FkbWluLWhvbWUnKTsgLy90YWtlcyB1cyB0byBob21lPz8/P1xuLy8gICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4vLyAgICAgICAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gbG9naW4nKTtcbi8vICAgICAgICAgICB9KTtcbi8vICAgICAgIH07XG4vL1xuLy8gfSk7XG5cbiRzY29wZS5yZWdpc3RlciA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgYXV0aFNlcnZpY2UucmVnaXN0ZXJVc2VyKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICBpZiAoIXJlc3BvbnNlLmRhdGEpIHtcbiAgICAgIGFsZXJ0KCdVbmFibGUgdG8gY3JlYXRlIHVzZXInKTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVzcG9uc2UuZGF0YSl7XG4gICAgICBhbGVydCgnVXNlciBDcmVhdGVkJyk7XG4gICAgICAkc2NvcGUubmV3VXNlciA9IHt9O1xuICAgICAgJHN0YXRlLmdvKCdlZGl0Jyk7XG4gICAgfVxuICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICBhbGVydCgnVW5hYmxlIHRvIGNyZWF0ZSB1c2VyJyk7XG4gIH0pO1xufTtcbn0pO1xuIl19
