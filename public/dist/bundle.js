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
                    // findpo: function(homeService) {
                    //   return mapService.findpo();
                    // },
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
.controller('editCtrl', ["$scope", "editService", "$state", "checkpoints", "authService", function($scope, editService, $state, checkpoints, authService) {
    $scope.obj = {};//do i need this still????

    $scope.getter = function(addUser){
      editService.addUser(addUser).then(function(response) {
        //everything that happens AFTER goes here, like clear form, $state.go
        if (!response.data) {
          alert('Unable to create user');
        }
        else if (response.data){
          alert('User Created! Please Login.');
          $scope.newUser = {};
          $state.go('login');
        }
      }).catch(function(err) {
        alert('Unable to create user');
      });
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
//****************attempting to make find button *********************//
$scope.findpo = function (findNum) {
  homeService.findpo(findNum).then(function (response) {
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
 //adding PO# when user clicks find
 this.findpo = function(po_number) {
   return $http({
     method: 'POST',
     url: '/find'/*,*/
    //  data: { //this is the body! req.body on the other side, the server side
    //    find_po: find_po, //this is not that. its variable in line 4
    //    //checkpoint_id: 1 //this will work as long as the first checkpoint is never deleted. later on, we can figure out how to fix that.
    //  }
   }).then(function(response){ //catching the response from the server
     return response.data; //response.data is the info we want
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
.controller('mapCtrl', ["$scope", "mapService", function($scope, mapService) {

  $scope.message = "hi, lets do this";

  $scope.findpo = function (testing) {
    mapService.findpo(testing).then(function (response) {
      //make a confirmation message, like checkin confirmed

    })
  };

//SUDO CODE FROM ALEX
// $scope.getIt = function(){
    //return what you want from the database on scope
    //then in the html bind it with an ng-repeat similar to other blue dots
// }()

//$(function){
//  $('.cat').css(){}
//  $()
//}

}]);

// INITILIZE SERVICE
// ============================================================
angular.module('orderhound')
.service('mapService', ["$http", function($http) {

// CRUD FUNCTIONStesting
// ============================================================
//finding po number from databse

// modeling this after editService.js
  this.findpo = function (testing) {
    return $http ({
      method: 'POST',
      url: '/find',
      data:  { //this is the body! req.body on the other side, the server side
        testing: testing //this is not that. its variable in line 4
         //this will work as long as the first checkpoint is never deleted. later on, we can figure out how to fix that.
      }

    }).then(function (response) { //this will pretty much be the same for all of my service functions
      return response;
    });
 };
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
      alert('User Created! Please login.');
      // $scope.newUser = {};
      $state.go('login');
    }
  }).catch(function(err) {
    alert('Unable to create user');
  });
};
}]);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImpzL3JvdXRlcnMuanMiLCJzZXJ2aWNlcy9hdXRoU2VydmljZS5qcyIsInNlcnZpY2VzL3VzZXJTZXJ2aWNlLmpzIiwic3RhdGVzL2FkbWluLWhvbWUvYWRtaW4taG9tZUN0cmwuanMiLCJzdGF0ZXMvYWRtaW4taG9tZS9hZG1pblNlcnZpY2UuanMiLCJzdGF0ZXMvZWRpdC9lZGl0Q3RybC5qcyIsInN0YXRlcy9lZGl0L2VkaXRTZXJ2aWNlLmpzIiwic3RhdGVzL2hvbWUvaG9tZUN0cmwuanMiLCJzdGF0ZXMvaG9tZS9ob21lU2VydmljZS5qcyIsInN0YXRlcy9sb2dpbi9sb2dpbkN0cmwuanMiLCJzdGF0ZXMvbWFwL21hcEN0cmwuanMiLCJzdGF0ZXMvbWFwL21hcFNlcnZpY2UuanMiLCJzdGF0ZXMvcmVnaXN0ZXIvcmVnaXN0ZXJDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxlQUFlLENBQUM7QUFDL0I7QUNEQSxRQUFRLE9BQU87S0FDVixnREFBTyxTQUFTLGdCQUFnQixvQkFBb0I7O1FBRWpELG1CQUFtQixVQUFVOztRQUU3QjthQUNLLE1BQU0sU0FBUztnQkFDWixLQUFLO2dCQUNMLFlBQVk7Z0JBQ1osYUFBYTs7YUFFaEIsTUFBTSxRQUFRO2dCQUNYLEtBQUs7Z0JBQ0wsWUFBWTtnQkFDWixhQUFhO2dCQUNiLFNBQVM7b0JBQ0wsK0JBQWUsU0FBUyxhQUFhO3NCQUNuQyxPQUFPLFlBQVk7O29CQUVyQixnQ0FBTSxTQUFTLGFBQWEsUUFBUTt3QkFDaEMsT0FBTyxZQUFZOzZCQUNkLEtBQUssU0FBUyxVQUFVO2dDQUNyQixJQUFJLENBQUMsU0FBUztvQ0FDVixPQUFPLEdBQUc7Z0NBQ2QsT0FBTyxTQUFTOzs2QkFFbkIsTUFBTSxTQUFTLEtBQUs7Z0NBQ2pCLE9BQU8sR0FBRzs7Ozs7YUFLN0IsTUFBTSxZQUFZO2dCQUNmLEtBQUs7Z0JBQ0wsWUFBWTtnQkFDWixhQUFhOzthQUVoQixNQUFNLGNB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LE1BQU07WUFDMUIsWUFBWSxNQUFNLE1BQU0sS0FBSyxTQUFTLFVBQVU7O2dCQUU1QyxJQUFJLENBQUMsU0FBUyxNQUFNO29CQUNoQixNQUFNO29CQUNOLE9BQU8sS0FBSyxXQUFXOztxQkFFdEIsR0FBRyxTQUFTLEtBQUssTUFBTTtrQkFDMUIsT0FBTyxHQUFHOztxQkFFUDs7b0JBRUQsT0FBTyxHQUFHOztlQUVmLE1BQU0sU0FBUyxLQUFLO2dCQUNuQixNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJ0QjtBQzNDQSxRQUFRLE9BQU87Q0FDZCxXQUFXLG9DQUFXLFNBQVMsUUFBUSxZQUFZOztFQUVsRCxPQUFPLFVBQVU7O0VBRWpCLE9BQU8sU0FBUyxVQUFVLFNBQVM7SUFDakMsV0FBVyxPQUFPLFNBQVMsS0FBSyxVQUFVLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCeEQ7QUN4QkE7O0FBRUEsUUFBUSxPQUFPO0NBQ2QsUUFBUSx3QkFBYyxTQUFTLE9BQU87Ozs7Ozs7RUFPckMsS0FBSyxTQUFTLFVBQVUsU0FBUztJQUMvQixPQUFPLE9BQU87TUFDWixRQUFRO01BQ1IsS0FBSztNQUNMLE9BQU87UUFDTCxTQUFTOzs7O09BSVYsS0FBSyxVQUFVLFVBQVU7TUFDMUIsT0FBTzs7OztBQUliO0FDeEJBLFFBQVEsT0FBTztDQUNkLFdBQVcsb0RBQWdCLFNBQVMsUUFBUSxhQUFhLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCbEUsT0FBTyxXQUFXLFNBQVMsTUFBTTtFQUMvQixZQUFZLGFBQWEsTUFBTSxLQUFLLFNBQVMsVUFBVTtJQUNyRCxJQUFJLENBQUMsU0FBUyxNQUFNO01BQ2xCLE1BQU07O1NBRUgsSUFBSSxTQUFTLEtBQUs7TUFDckIsTUFBTTs7TUFFTixPQUFPLEdBQUc7O0tBRVgsTUFBTSxTQUFTLEtBQUs7SUFDckIsTUFBTTs7OztBQUlWIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJywgIFsndWkucm91dGVyJ10pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuICAgIC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKVxuXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAuc3RhdGUoJ2xvZ2luJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2xvZ2luQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL2xvZ2luL2xvZ2luLmh0bWwnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdob21lJywge1xuICAgICAgICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL2hvbWUvaG9tZS5odG1sJyxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIHdlbGNvbWVBc3NldHM6IGZ1bmN0aW9uKGhvbWVTZXJ2aWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhvbWVTZXJ2aWNlLndlbGNvbWVBc3NldHMoKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogZnVuY3Rpb24oYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF1dGhTZXJ2aWNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdyZWdpc3RlcicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvcmVnaXN0ZXInLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyZWdpc3RlckN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0YXRlcy9yZWdpc3Rlci9yZWdpc3Rlci5odG1sJyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FkbWluLWhvbWUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2FkbWluLWhvbWUnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdhZG1pbi1ob21lQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL2FkbWluLWhvbWUvYWRtaW4taG9tZS5odG1sJyxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IGZ1bmN0aW9uKGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdXRoU2VydmljZS5nZXRDdXJyZW50VXNlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnZWRpdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZWRpdCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2VkaXRDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvZWRpdC9lZGl0Lmh0bWwnLFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2twb2ludHM6IGZ1bmN0aW9uKGVkaXRTZXJ2aWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVkaXRTZXJ2aWNlLmNoZWNrcG9pbnRzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IGZ1bmN0aW9uKGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdXRoU2VydmljZS5nZXRDdXJyZW50VXNlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdtYXAnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL21hcCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21hcEN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0YXRlcy9tYXAvbWFwLmh0bWwnLFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZmluZHBvOiBmdW5jdGlvbihob21lU2VydmljZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgIHJldHVybiBtYXBTZXJ2aWNlLmZpbmRwbygpO1xuICAgICAgICAgICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgICAgICAgICB1c2VyOiBmdW5jdGlvbihhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXV0aFNlcnZpY2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJykuc2VydmljZShcImF1dGhTZXJ2aWNlXCIsIGZ1bmN0aW9uKCRodHRwKSB7XG5cbiAgICB0aGlzLmxvZ2luID0gZnVuY3Rpb24odXNlcikge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmxvZ291dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy9sb2dvdXQnXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Q3VycmVudFVzZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6ICcvaG9tZSdcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuLy9nb29kIHRvIGdvXG4gICAgdGhpcy5yZWdpc3RlclVzZXIgPSBmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJy9yZWdpc3RlcicsXG4gICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB0aGlzLmdldHRlciA9IGZ1bmN0aW9uKGFkZFVzZXIpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiAnL2FkZFVzZXInLFxuICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmVkaXRVc2VyID0gZnVuY3Rpb24oaWQsIHVzZXIpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICB1cmw6IFwiL3VzZXIvXCIgKyBpZCxcbiAgICAgICAgICAgIGRhdGE6IHVzZXJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpLnNlcnZpY2UoXCJ1c2VyU2VydmljZVwiLCBmdW5jdGlvbigkaHR0cCkge1xuXG4gICAgdGhpcy5nZXRVc2VycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy91c2VyJ1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG4vL2FtIGkgdXNpbmcgbGluZSAxMiBmdW5jdGlvbj8/Pz8/XG4gICAgdGhpcy5nZXRVc2VyID0gZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6ICcvdXNlcj9faWQ9JyArIGlkXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIE5vdCBOZWVkZWRcbiAgICAvL1xuICAgIC8vIHRoaXMuZGVsZXRlVXNlciA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgLy8gICByZXR1cm4gJGh0dHAoe1xuICAgIC8vICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgIC8vICAgICB1cmw6ICcvdXNlci8nICsgaWRcbiAgICAvLyAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAvLyAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIC8vICAgfSk7XG4gICAgLy8gfTtcbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLmNvbnRyb2xsZXIoJ2FkbWluLWhvbWVDdHJsJywgZnVuY3Rpb24gKCRzY29wZSwgaG9tZVNlcnZpY2UsIHVzZXIpIHtcblxuICAkc2NvcGUudGVzdCA9IGhvbWVTZXJ2aWNlLm1lc3NhZ2U7XG4gICRzY29wZS5uYW1lID0gZnVuY3Rpb24oZW1wbG95ZWVfbmFtZSkge1xuICAgIGFkbWluU2VydmljZS5uYW1lKGVtcGxveWVlX25hbWUpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgfSlcbiAgfVxuXG4gICRzY29wZS5hZGRwbyA9IGZ1bmN0aW9uIChwb251bSkge1xuICAgIGhvbWVTZXJ2aWNlLmFkZHBvKHBvbnVtKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgLy9tYWtlIGEgY29uZmlybWF0aW9uIG1lc3NhZ2UsIGxpa2UgY2hlY2tpbiBjb25maXJtZWRcblxuICAgIH0pXG4gIH1cblxuICAvLyoqKioqZ2l2ZXMgdmlldyBlbXBsb3llZV9uYW1lLCBwaG90bywgY2hlY2twb2ludF9uYW1lIGZvciB0aGUgd2VsY29tZSBtZXNzYWdlIGluIGhvbWUgdmlldyBmcm9tIGRhdGFic2UqKioqKi8vXG4gICAgJHNjb3BlLndlbGNvbWVBc3NldHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vY2FsbCB0aGUgZnVuY3Rpb24gdGhhdCdzIGluIHNlcnZpY2VcbiAgICAgIGNvbnNvbGUubG9nKCdpcyB0aGlzIG9wZXJhdGluZz8nKTtcbiAgICAgIGhvbWVTZXJ2aWNlLndlbGNvbWVBc3NldHMoKSAvL25vdyB3ZSdyZSBjYWxsaW5nIHdlbGNvbWVBc3NldHMgaW4gdGhlIGhvbWVTZXJ2aWNlLCBmcm9tIGhvbWVDdHJsXG4gICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBjb25zb2xlLmxvZygndGhpcyBpcyBvdXIgcmVzcG9uc2UnLCByZXNwb25zZSlcbiAgICAgICAgJHNjb3BlLnJlc3BvbnNlID0gcmVzcG9uc2U7XG5cbiAgICAgIH0pXG4gICAgfVxuICAgICRzY29wZS53ZWxjb21lQXNzZXRzKCk7XG4gICB9KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5zZXJ2aWNlKCdhZG1pblNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHApIHtcblxuICB0aGlzLmFkZHBvID0gZnVuY3Rpb24gKHBvbnVtYmVyKSB7XG4gICAgcmV0dXJuICRodHRwICh7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogJy9jaGVja2luJyxcbiAgICAgIGRhdGE6IHsgLy90aGlzIGlzIHRoZSBib2R5ISByZXEuYm9keSBvbiB0aGUgb3RoZXIgc2lkZSwgdGhlIHNlcnZlciBzaWRlXG4gICAgICAgIHBvbnVtYmVyOiBwb251bWJlciwgLy90aGlzIGlzIG5vdCB0aGF0LiBpdHMgdmFyaWFibGUgaW4gbGluZSA0XG4gICAgICAgIGNoZWNrcG9pbnRfaWQ6IDFcbiAgICAgIH1cbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyAvL3RoaXMgd2lsbCBwcmV0dHkgbXVjaCBiZSB0aGUgc2FtZSBmb3IgYWxsIG9mIG15IHNlcnZpY2UgZnVuY3Rpb25zXG5cbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgIH0pXG4gfTtcblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uY29udHJvbGxlcignZWRpdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIGVkaXRTZXJ2aWNlLCAkc3RhdGUsIGNoZWNrcG9pbnRzLCBhdXRoU2VydmljZSkge1xuICAgICRzY29wZS5vYmogPSB7fTsvL2RvIGkgbmVlZCB0aGlzIHN0aWxsPz8/P1xuXG4gICAgJHNjb3BlLmdldHRlciA9IGZ1bmN0aW9uKGFkZFVzZXIpe1xuICAgICAgZWRpdFNlcnZpY2UuYWRkVXNlcihhZGRVc2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIC8vZXZlcnl0aGluZyB0aGF0IGhhcHBlbnMgQUZURVIgZ29lcyBoZXJlLCBsaWtlIGNsZWFyIGZvcm0sICRzdGF0ZS5nb1xuICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpIHtcbiAgICAgICAgICBhbGVydCgnVW5hYmxlIHRvIGNyZWF0ZSB1c2VyJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVzcG9uc2UuZGF0YSl7XG4gICAgICAgICAgYWxlcnQoJ1VzZXIgQ3JlYXRlZCEgUGxlYXNlIExvZ2luLicpO1xuICAgICAgICAgICRzY29wZS5uZXdVc2VyID0ge307XG4gICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICB9XG4gICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgYWxlcnQoJ1VuYWJsZSB0byBjcmVhdGUgdXNlcicpO1xuICAgICAgfSk7XG4gICAgfTtcblxuXG4vLyoqKioqKioqKioqKioqKioqYWRkaW5nIGRvdHMgdG8gbWFwIGluIGVkaXQgdmlldyoqKioqKioqKioqKioqKioqKiovL1xuICAgICRzY29wZS5jaGVja3BvaW50cyA9IGNoZWNrcG9pbnRzO1xuICAgIGNvbnNvbGUubG9nKCRzY29wZS5jaGVja3BvaW50cyk7XG5cbi8qIEVYQU1QTEVcbmFuZ3VsYXIubW9kdWxlKCdzdGFyV2Fyc0FwcCcpXG4uY29udHJvbGxlcignbWFpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIHN0YXJXYXJzU2VydmljZSkge1xuICBzdGFyV2Fyc1NlcnZpY2UuZ2V0UGVvcGxlKCkgLy90aGlzIGlzIHRoZSBwcm9taXNlXG4gIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7IC8vLnRoZW4gY2FsbGJhY2sgZnVuY3Rpb24gcmVwcmVzZW50cyBvdXIgZGF0YSwgd2hpY2ggaXMgdGhlIGdldFBlb3BsZSBmdW5jdGlvbiBpbiBzdGFyV2Fyc1NlcnZpY2UuIGFsc28sIHJlc3BvbnNlIGlzIGp1c3QgYSBjb21tb24gcGFyYW1ldGVyIG5hbWUsIGNhbiBiZSBuYW1lZCBhbnl0aGluZywgYnV0IHVzZSByZXNwb25zZS5cbiAgICAkc2NvcGUucGVvcGxlID0gcmVzcG9uc2UuZGF0YS5yZXN1bHRzOyAvL3RoZSByZXR1cm5lZCBwcm9taXNlIGlzIGRhdGEgZnJvbSByZXNwb25zZS5kYXRhLnJlc3VsdHMuIG5vdyByZXNwb25zZS5kYXRhLnJlc3VsdHMgaXMgbGlrZSBhIGZpbGVwYXRoIGZvdW5kIGluIHRoZSBvYmplY3QgdGhhdCBpcyByZXRyZWl2ZWQgZnJvbSBTd2FwaS5jby4gaSBjYW4gc2VlIG9iamVjdCBzdHJ1Y3R1cmUgaWYgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICB9KVxufSlcbiovXG5cbn0pO1xuIiwiLy8gSU5JVElMSVpFIFNFUlZJQ0Vcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuYW5ndWxhci5tb2R1bGUoXCJvcmRlcmhvdW5kXCIpLnNlcnZpY2UoXCJlZGl0U2VydmljZVwiLCBmdW5jdGlvbigkaHR0cCkge1xuXG4gIC8vIENSVUQgRlVOQ1RJT05TXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG50aGlzLmFkZFVzZXIgPSBmdW5jdGlvbihhZGRVc2VyKSB7XG4gICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIHVybDogJy9hZGRVc2VyJyxcbiAgICAgICAgICBkYXRhOiBhZGRVc2VyXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSk7XG4gIH07XG4gIC8vKioqKioqKioqKiphZGRpbmcgZG90cyB0byBpbWFnZSBvZiBtYXAgaW4gZWRpdCB2aWV3KioqKioqKioqKiovL1xuICB0aGlzLmNoZWNrcG9pbnRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6ICcvY2hlY2twb2ludHMnLFxuICAgICAgLy9kYXRhOiBjaGVja3BvaW50c1xuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgfSk7XG4gIH07XG5cbiB9KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5jb250cm9sbGVyKCdob21lQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsIGhvbWVTZXJ2aWNlLCB1c2VyKSB7XG5cbiAgJHNjb3BlLnRlc3QgPSBob21lU2VydmljZS5tZXNzYWdlO1xuXG4gICRzY29wZS5hZGRwbyA9IGZ1bmN0aW9uIChwb251bSkge1xuICAgIGhvbWVTZXJ2aWNlLmFkZHBvKHBvbnVtKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgLy9tYWtlIGEgY29uZmlybWF0aW9uIG1lc3NhZ2UsIGxpa2UgY2hlY2tpbiBjb25maXJtZWRcblxuICAgIH0pXG4gIH07XG4vLyoqKioqKioqKioqKioqKiphdHRlbXB0aW5nIHRvIG1ha2UgZmluZCBidXR0b24gKioqKioqKioqKioqKioqKioqKioqLy9cbiRzY29wZS5maW5kcG8gPSBmdW5jdGlvbiAoZmluZE51bSkge1xuICBob21lU2VydmljZS5maW5kcG8oZmluZE51bSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAvL21ha2UgYSBjb25maXJtYXRpb24gbWVzc2FnZSwgbGlrZSBjaGVja2luIGNvbmZpcm1lZFxuXG4gIH0pXG59O1xuXG4vLyoqKioqZ2l2ZXMgdmlldyBlbXBsb3llZV9uYW1lLCBwaG90bywgY2hlY2twb2ludF9uYW1lIGZvciB0aGUgd2VsY29tZSBtZXNzYWdlIGluIGhvbWUgdmlldyBmcm9tIGRhdGFic2UqKioqKi8vXG4gICRzY29wZS53ZWxjb21lQXNzZXRzID0gZnVuY3Rpb24oKSB7XG4gICAgLy9jYWxsIHRoZSBmdW5jdGlvbiB0aGF0J3MgaW4gc2VydmljZVxuICAgIGNvbnNvbGUubG9nKCdpcyB0aGlzIG9wZXJhdGluZz8nKTtcbiAgICBob21lU2VydmljZS53ZWxjb21lQXNzZXRzKCkgLy9ub3cgd2UncmUgY2FsbGluZyB3ZWxjb21lQXNzZXRzIGluIHRoZSBob21lU2VydmljZSwgZnJvbSBob21lQ3RybFxuICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBjb25zb2xlLmxvZygndGhpcyBpcyBvdXIgcmVzcG9uc2UnLCByZXNwb25zZSlcbiAgICAgICRzY29wZS5yZXNwb25zZSA9IHJlc3BvbnNlO1xuXG4gICAgfSlcbiAgfVxuICAkc2NvcGUud2VsY29tZUFzc2V0cygpO1xuIH0pO1xuIiwiLy8gSU5JVElMSVpFIFNFUlZJQ0Vcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLnNlcnZpY2UoJ2hvbWVTZXJ2aWNlJywgZnVuY3Rpb24gKCRodHRwKSB7XG5cbi8vIENSVUQgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vYWRkaW5nIHBvIG51bWJlciB0byBwcm9kdWN0aW9uXG4gIHRoaXMuYWRkcG8gPSBmdW5jdGlvbiAocG9udW1iZXIpIHtcbiAgICByZXR1cm4gJGh0dHAgKHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAnL2NoZWNraW4nLFxuICAgICAgZGF0YTogeyAvL3RoaXMgaXMgdGhlIGJvZHkhIHJlcS5ib2R5IG9uIHRoZSBvdGhlciBzaWRlLCB0aGUgc2VydmVyIHNpZGVcbiAgICAgICAgcG9udW1iZXI6IHBvbnVtYmVyLCAvL3RoaXMgaXMgbm90IHRoYXQuIGl0cyB2YXJpYWJsZSBpbiBsaW5lIDRcbiAgICAgICAgY2hlY2twb2ludF9pZDogMSAvL3RoaXMgd2lsbCB3b3JrIGFzIGxvbmcgYXMgdGhlIGZpcnN0IGNoZWNrcG9pbnQgaXMgbmV2ZXIgZGVsZXRlZC4gbGF0ZXIgb24sIHdlIGNhbiBmaWd1cmUgb3V0IGhvdyB0byBmaXggdGhhdC5cbiAgICAgIH1cbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyAvL3RoaXMgd2lsbCBwcmV0dHkgbXVjaCBiZSB0aGUgc2FtZSBmb3IgYWxsIG9mIG15IHNlcnZpY2UgZnVuY3Rpb25zXG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICB9KTtcbiB9O1xuIC8vYWRkaW5nIFBPIyB3aGVuIHVzZXIgY2xpY2tzIGZpbmRcbiB0aGlzLmZpbmRwbyA9IGZ1bmN0aW9uKHBvX251bWJlcikge1xuICAgcmV0dXJuICRodHRwKHtcbiAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgIHVybDogJy9maW5kJy8qLCovXG4gICAgLy8gIGRhdGE6IHsgLy90aGlzIGlzIHRoZSBib2R5ISByZXEuYm9keSBvbiB0aGUgb3RoZXIgc2lkZSwgdGhlIHNlcnZlciBzaWRlXG4gICAgLy8gICAgZmluZF9wbzogZmluZF9wbywgLy90aGlzIGlzIG5vdCB0aGF0LiBpdHMgdmFyaWFibGUgaW4gbGluZSA0XG4gICAgLy8gICAgLy9jaGVja3BvaW50X2lkOiAxIC8vdGhpcyB3aWxsIHdvcmsgYXMgbG9uZyBhcyB0aGUgZmlyc3QgY2hlY2twb2ludCBpcyBuZXZlciBkZWxldGVkLiBsYXRlciBvbiwgd2UgY2FuIGZpZ3VyZSBvdXQgaG93IHRvIGZpeCB0aGF0LlxuICAgIC8vICB9XG4gICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXsgLy9jYXRjaGluZyB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyXG4gICAgIHJldHVybiByZXNwb25zZS5kYXRhOyAvL3Jlc3BvbnNlLmRhdGEgaXMgdGhlIGluZm8gd2Ugd2FudFxuIH0pO1xuIH07XG4vL2dldHRpbmcgdXNlcidzIG5hbWUgdG8gYWRkIHRvIHdlbGNvbWUgbWVzc2FnZVxuICB0aGlzLndlbGNvbWVBc3NldHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHVybDogJy93ZWxjb21lQXNzZXRzJ1xuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpeyAvL2NhdGNoaW5nIHRoZSByZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXJcbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhOyAvL3Jlc3BvbnNlLmRhdGEgaXMgdGhlIGluZm8gd2Ugd2FudFxuICB9KTtcbn07XG5cblxuXG5cbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuICAgIC5jb250cm9sbGVyKCdsb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbiAgICAgICAgJHNjb3BlLnRlc3QgPSBcIm1ham9yIHRvbSB0byBncm91bmQgY29udHJvbFwiO1xuLy8qKioqKioqKioqKioqKioqKioqKioqREVMRVRFIFRISVMgQkVGT1JFIFBSRVNFTlRJTkcgQU5EIEhPU1RJTkcqKioqKioqKioqKioqKioqKioqKiovL1xuICAkc2NvcGUudXNlciA9IHtcbiAgICBuYW1lOiAnUXVpbm4nLFxuICAgIHBhc3N3b3JkOiAncSdcbiAgfVxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXG4gICAgICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICAgICAgIGF1dGhTZXJ2aWNlLmxvZ2luKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcblxuICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBhbGVydCgnVXNlciBkb2VzIG5vdCBleGlzdCcpO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudXNlci5wYXNzd29yZCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKHJlc3BvbnNlLmRhdGEuYWRtaW4pe1xuICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhZG1pbi1ob21lJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnaG9tZScpOyAvL3Rha2VzIHVzIHRvIGhvbWU/Pz8/XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1VuYWJsZSB0byBsb2dpbicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSk7XG5cbi8vUkVGRVIgVE8gVEhJUyBDT0RFIFdIRU4gVElNRSBUTyBSRUdJU1RFUiBCVVNJTkVTU1xuLy8gICAkc2NvcGUucmVnaXN0ZXIgPSBmdW5jdGlvbih1c2VyKSB7XG4vLyAgICAgICBhdXRoU2VydmljZS5yZWdpc3RlclVzZXIodXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuLy8gICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpIHtcbi8vICAgICAgICAgICBhbGVydCgnVW5hYmxlIHRvIGNyZWF0ZSB1c2VyJyk7XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgYWxlcnQoJ1VzZXIgQ3JlYXRlZCcpO1xuLy8gICAgICAgICAgICRzY29wZS5uZXdVc2VyID0ge307XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuLy8gICAgICAgICBhbGVydCgnVW5hYmxlIHRvIGNyZWF0ZSB1c2VyJyk7XG4vLyAgICAgICB9KTtcbi8vICAgICB9O1xuLy8gfSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uY29udHJvbGxlcignbWFwQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgbWFwU2VydmljZSkge1xuXG4gICRzY29wZS5tZXNzYWdlID0gXCJoaSwgbGV0cyBkbyB0aGlzXCI7XG5cbiAgJHNjb3BlLmZpbmRwbyA9IGZ1bmN0aW9uICh0ZXN0aW5nKSB7XG4gICAgbWFwU2VydmljZS5maW5kcG8odGVzdGluZykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgIC8vbWFrZSBhIGNvbmZpcm1hdGlvbiBtZXNzYWdlLCBsaWtlIGNoZWNraW4gY29uZmlybWVkXG5cbiAgICB9KVxuICB9O1xuXG4vL1NVRE8gQ09ERSBGUk9NIEFMRVhcbi8vICRzY29wZS5nZXRJdCA9IGZ1bmN0aW9uKCl7XG4gICAgLy9yZXR1cm4gd2hhdCB5b3Ugd2FudCBmcm9tIHRoZSBkYXRhYmFzZSBvbiBzY29wZVxuICAgIC8vdGhlbiBpbiB0aGUgaHRtbCBiaW5kIGl0IHdpdGggYW4gbmctcmVwZWF0IHNpbWlsYXIgdG8gb3RoZXIgYmx1ZSBkb3RzXG4vLyB9KClcblxuLy8kKGZ1bmN0aW9uKXtcbi8vICAkKCcuY2F0JykuY3NzKCl7fVxuLy8gICQoKVxuLy99XG5cbn0pO1xuIiwiLy8gSU5JVElMSVpFIFNFUlZJQ0Vcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLnNlcnZpY2UoJ21hcFNlcnZpY2UnLCBmdW5jdGlvbigkaHR0cCkge1xuXG4vLyBDUlVEIEZVTkNUSU9OU3Rlc3Rpbmdcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy9maW5kaW5nIHBvIG51bWJlciBmcm9tIGRhdGFic2VcblxuLy8gbW9kZWxpbmcgdGhpcyBhZnRlciBlZGl0U2VydmljZS5qc1xuICB0aGlzLmZpbmRwbyA9IGZ1bmN0aW9uICh0ZXN0aW5nKSB7XG4gICAgcmV0dXJuICRodHRwICh7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogJy9maW5kJyxcbiAgICAgIGRhdGE6ICB7IC8vdGhpcyBpcyB0aGUgYm9keSEgcmVxLmJvZHkgb24gdGhlIG90aGVyIHNpZGUsIHRoZSBzZXJ2ZXIgc2lkZVxuICAgICAgICB0ZXN0aW5nOiB0ZXN0aW5nIC8vdGhpcyBpcyBub3QgdGhhdC4gaXRzIHZhcmlhYmxlIGluIGxpbmUgNFxuICAgICAgICAgLy90aGlzIHdpbGwgd29yayBhcyBsb25nIGFzIHRoZSBmaXJzdCBjaGVja3BvaW50IGlzIG5ldmVyIGRlbGV0ZWQuIGxhdGVyIG9uLCB3ZSBjYW4gZmlndXJlIG91dCBob3cgdG8gZml4IHRoYXQuXG4gICAgICB9XG5cbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyAvL3RoaXMgd2lsbCBwcmV0dHkgbXVjaCBiZSB0aGUgc2FtZSBmb3IgYWxsIG9mIG15IHNlcnZpY2UgZnVuY3Rpb25zXG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSk7XG4gfTtcbiAgfSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uY29udHJvbGxlcigncmVnaXN0ZXJDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4vL1xuLy8gICAgICAgJHNjb3BlLnJlZ2lzdGVyID0gZnVuY3Rpb24odXNlcikge1xuLy9cbi8vICAgICAgICAgICBhdXRoU2VydmljZS5sb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSkge1xuLy8gICAgICAgICAgICAgICAgICAgYWxlcnQoJ1VzZXIgZG9lcyBub3QgZXhpc3QnKTtcbi8vICAgICAgICAgICAgICAgICAgICRzY29wZS51c2VyLnBhc3N3b3JkID0gJyc7XG4vLyAgICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FkbWluLWhvbWUnKTsgLy90YWtlcyB1cyB0byBob21lPz8/P1xuLy8gICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4vLyAgICAgICAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gbG9naW4nKTtcbi8vICAgICAgICAgICB9KTtcbi8vICAgICAgIH07XG4vL1xuLy8gfSk7XG5cbiRzY29wZS5yZWdpc3RlciA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgYXV0aFNlcnZpY2UucmVnaXN0ZXJVc2VyKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICBpZiAoIXJlc3BvbnNlLmRhdGEpIHtcbiAgICAgIGFsZXJ0KCdVbmFibGUgdG8gY3JlYXRlIHVzZXInKTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVzcG9uc2UuZGF0YSl7XG4gICAgICBhbGVydCgnVXNlciBDcmVhdGVkISBQbGVhc2UgbG9naW4uJyk7XG4gICAgICAvLyAkc2NvcGUubmV3VXNlciA9IHt9O1xuICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgIH1cbiAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgYWxlcnQoJ1VuYWJsZSB0byBjcmVhdGUgdXNlcicpO1xuICB9KTtcbn07XG59KTtcbiJdfQ==
