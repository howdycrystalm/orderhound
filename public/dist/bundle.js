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
     url: '/find'/*,*/,
     data: {ponumber: po_number}
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
          alert('User Created!');
          $state.reload('edit');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImpzL3JvdXRlcnMuanMiLCJzZXJ2aWNlcy9hdXRoU2VydmljZS5qcyIsInNlcnZpY2VzL3VzZXJTZXJ2aWNlLmpzIiwic3RhdGVzL2FkbWluLWhvbWUvYWRtaW4taG9tZUN0cmwuanMiLCJzdGF0ZXMvYWRtaW4taG9tZS9hZG1pblNlcnZpY2UuanMiLCJzdGF0ZXMvaG9tZS9ob21lQ3RybC5qcyIsInN0YXRlcy9ob21lL2hvbWVTZXJ2aWNlLmpzIiwic3RhdGVzL2xvZ2luL2xvZ2luQ3RybC5qcyIsInN0YXRlcy9tYXAvbWFwQ3RybC5qcyIsInN0YXRlcy9tYXAvbWFwU2VydmljZS5qcyIsInN0YXRlcy9yZWdpc3Rlci9yZWdpc3RlckN0cmwuanMiLCJzdGF0ZXMvZWRpdC9lZGl0Q3RybC5qcyIsInN0YXRlcy9lZGl0L2VkaXRTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxlQUFlLENBQUM7QUFDL0I7QUNEQSxRQUFRLE9BQU87S0FDVixnREFBTyxTQUFTLGdCQUFnQixvQkFBb0I7O1FBRWpELG1CQUFtQixVQUFVOztRQUU3QjthQUNLLE1BQU0sU0FBUztnQkFDWixLQUFLO2dCQUNMLFlBQVk7Z0JBQ1osYUFBYTs7YUFFaEIsTUFBTSxRQUFRO2dCQUNYLEtBQUs7Z0JBQ0wsWUFBWTtnQkFDWixhQUFhO2dCQUNiLFNBQVM7b0JBQ0wsK0JBQWUsU0FBUyxhQUFhO3NCQUNuQyxPQUFPLFlBQVk7O29CQUVyQixnQ0FBTSxTQUFTLGFBQWEsUUFBUTt3QkFDaEMsT0FBTyxZQUFZOzZCQUNkLEtBQUssU0FBUyxVQUFVO2dDQUNyQixJQUFJLENBQUMsU0FBUztvQ0FDVixPQUFPLEdBQUc7Z0NBQ2QsT0FBTyxTQUFTOzs2QkFFbkIsTUFBTSxTQUFTLEtBQUs7Z0NBQ2pCLE9BQU8sR0FBRzs7Ozs7YUFLN0IsTUFBTSxZQUFZO2dCQUNmLEtBQUs7Z0JBQ0wsWUFBWTtnQkFDWixhQUFhOzthQUVoQixNQUFNLGNB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QU87Q0FDZCxXQUFXLG9EQUFnQixTQUFTLFFBQVEsYUFBYSxRQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQmxFLE9BQU8sV0FBVyxTQUFTLE1BQU07RUFDL0IsWUFBWSxhQUFhLE1BQU0sS0FBSyxTQUFTLFVBQVU7SUFDckQsSUFBSSxDQUFDLFNBQVMsTUFBTTtNQUNsQixNQUFNOztTQUVILElBQUksU0FBUyxLQUFLO01BQ3JCLE1BQU07O01BRU4sT0FBTyxHQUFHOztLQUVYLE1BQU0sU0FBUyxLQUFLO0lBQ3JCLE1BQU07Ozs7QUFJVjtBQ2xDQSxRQUFRLE9BQU87Q0FDZCxXQUFXLDhFQUFZLFNBQVMsUUFBUSxhQUFhLFFBQVEsYUFBYSxhQUFhO0lBQ3BGLE9BQU8sTUFBTTs7SUFFYixPQUFPLFNBQVMsU0FBUyxRQUFRO01BQy9CLFlBQVksUUFBUSxTQUFTLEtBQUssU0FBUyxVQUFVOztRQUVuRCxJQUFJLENBQUMsU0FBUyxNQUFNO1VBQ2xCLE1BQU07O2FBRUgsSUFBSSxTQUFTLEtBQUs7VUFDckIsTUFBTTtVQUNOLE9BQU8sT0FBTzs7U0FFZixNQUFNLFNBQVMsS0FBSztRQUNyQixNQUFNOzs7Ozs7SUFNVixPQUFPLGNBQWM7SUFDckIsUUFBUSxJQUFJLE9BQU87Ozs7Ozs7Ozs7Ozs7QUFhdkI7QUNuQ0E7O0FBRUEsUUFBUSxPQUFPLGNBQWMsUUFBUSx5QkFBZSxTQUFTLE9BQU87Ozs7O0FBS3BFLEtBQUssVUFBVSxTQUFTLFNBQVM7TUFDM0IsT0FBTyxNQUFNO1VBQ1QsUUFBUTtVQUNSLEtBQUs7VUFDTCxNQUFNO1NBQ1AsS0FBSyxTQUFTLFVBQVU7VUFDdkIsT0FBTzs7OztFQUlmLEtBQUssY0FBYyxXQUFXO0lBQzVCLE9BQU8sTUFBTTtNQUNYLFFBQVE7TUFDUixLQUFLOztPQUVKLEtBQUssU0FBUyxTQUFTO01BQ3hCLE9BQU8sU0FBUzs7Ozs7QUFLdEIiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnLCAgWyd1aS5yb3V0ZXInXSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4gICAgLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpXG5cbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgICAgIC5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbG9naW5DdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvbG9naW4vbG9naW4uaHRtbCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgd2VsY29tZUFzc2V0czogZnVuY3Rpb24oaG9tZVNlcnZpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaG9tZVNlcnZpY2Uud2VsY29tZUFzc2V0cygpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB1c2VyOiBmdW5jdGlvbihhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXV0aFNlcnZpY2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ3JlZ2lzdGVyJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9yZWdpc3RlcicsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3JlZ2lzdGVyQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL3JlZ2lzdGVyL3JlZ2lzdGVyLmh0bWwnLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYWRtaW4taG9tZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvYWRtaW4taG9tZScsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2FkbWluLWhvbWVDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvYWRtaW4taG9tZS9hZG1pbi1ob21lLmh0bWwnLFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogZnVuY3Rpb24oYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF1dGhTZXJ2aWNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdlZGl0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9lZGl0JyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZWRpdEN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0YXRlcy9lZGl0L2VkaXQuaHRtbCcsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICBjaGVja3BvaW50czogZnVuY3Rpb24oZWRpdFNlcnZpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWRpdFNlcnZpY2UuY2hlY2twb2ludHMoKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogZnVuY3Rpb24oYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF1dGhTZXJ2aWNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ21hcCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvbWFwJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFwQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL21hcC9tYXAuaHRtbCcsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICAvLyBmaW5kcG86IGZ1bmN0aW9uKGhvbWVTZXJ2aWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgcmV0dXJuIG1hcFNlcnZpY2UuZmluZHBvKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IGZ1bmN0aW9uKGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdXRoU2VydmljZS5nZXRDdXJyZW50VXNlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKS5zZXJ2aWNlKFwiYXV0aFNlcnZpY2VcIiwgZnVuY3Rpb24oJGh0dHApIHtcblxuICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiAnL2xvZ291dCdcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRDdXJyZW50VXNlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy9ob21lJ1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG4vL2dvb2QgdG8gZ29cbiAgICB0aGlzLnJlZ2lzdGVyVXNlciA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiAnL3JlZ2lzdGVyJyxcbiAgICAgICAgICAgIGRhdGE6IHVzZXJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoaXMuZ2V0dGVyID0gZnVuY3Rpb24oYWRkVXNlcikge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6ICcvYWRkVXNlcicsXG4gICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZWRpdFVzZXIgPSBmdW5jdGlvbihpZCwgdXNlcikge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgIHVybDogXCIvdXNlci9cIiArIGlkLFxuICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJykuc2VydmljZShcInVzZXJTZXJ2aWNlXCIsIGZ1bmN0aW9uKCRodHRwKSB7XG5cbiAgICB0aGlzLmdldFVzZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiAnL3VzZXInXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcbi8vYW0gaSB1c2luZyBsaW5lIDEyIGZ1bmN0aW9uPz8/Pz9cbiAgICB0aGlzLmdldFVzZXIgPSBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy91c2VyP19pZD0nICsgaWRcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gTm90IE5lZWRlZFxuICAgIC8vXG4gICAgLy8gdGhpcy5kZWxldGVVc2VyID0gZnVuY3Rpb24oaWQpIHtcbiAgICAvLyAgIHJldHVybiAkaHR0cCh7XG4gICAgLy8gICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgLy8gICAgIHVybDogJy91c2VyLycgKyBpZFxuICAgIC8vICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgIC8vICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgLy8gICB9KTtcbiAgICAvLyB9O1xufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uY29udHJvbGxlcignYWRtaW4taG9tZUN0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCBob21lU2VydmljZSwgdXNlcikge1xuXG4gICRzY29wZS50ZXN0ID0gaG9tZVNlcnZpY2UubWVzc2FnZTtcbiAgJHNjb3BlLm5hbWUgPSBmdW5jdGlvbihlbXBsb3llZV9uYW1lKSB7XG4gICAgYWRtaW5TZXJ2aWNlLm5hbWUoZW1wbG95ZWVfbmFtZSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICB9KVxuICB9XG5cbiAgJHNjb3BlLmFkZHBvID0gZnVuY3Rpb24gKHBvbnVtKSB7XG4gICAgaG9tZVNlcnZpY2UuYWRkcG8ocG9udW0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAvL21ha2UgYSBjb25maXJtYXRpb24gbWVzc2FnZSwgbGlrZSBjaGVja2luIGNvbmZpcm1lZFxuXG4gICAgfSlcbiAgfVxuXG4gIC8vKioqKipnaXZlcyB2aWV3IGVtcGxveWVlX25hbWUsIHBob3RvLCBjaGVja3BvaW50X25hbWUgZm9yIHRoZSB3ZWxjb21lIG1lc3NhZ2UgaW4gaG9tZSB2aWV3IGZyb20gZGF0YWJzZSoqKioqLy9cbiAgICAkc2NvcGUud2VsY29tZUFzc2V0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy9jYWxsIHRoZSBmdW5jdGlvbiB0aGF0J3MgaW4gc2VydmljZVxuICAgICAgY29uc29sZS5sb2coJ2lzIHRoaXMgb3BlcmF0aW5nPycpO1xuICAgICAgaG9tZVNlcnZpY2Uud2VsY29tZUFzc2V0cygpIC8vbm93IHdlJ3JlIGNhbGxpbmcgd2VsY29tZUFzc2V0cyBpbiB0aGUgaG9tZVNlcnZpY2UsIGZyb20gaG9tZUN0cmxcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGlzIGlzIG91ciByZXNwb25zZScsIHJlc3BvbnNlKVxuICAgICAgICAkc2NvcGUucmVzcG9uc2UgPSByZXNwb25zZTtcblxuICAgICAgfSlcbiAgICB9XG4gICAgJHNjb3BlLndlbGNvbWVBc3NldHMoKTtcbiAgIH0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLnNlcnZpY2UoJ2FkbWluU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCkge1xuXG4gIHRoaXMuYWRkcG8gPSBmdW5jdGlvbiAocG9udW1iZXIpIHtcbiAgICByZXR1cm4gJGh0dHAgKHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAnL2NoZWNraW4nLFxuICAgICAgZGF0YTogeyAvL3RoaXMgaXMgdGhlIGJvZHkhIHJlcS5ib2R5IG9uIHRoZSBvdGhlciBzaWRlLCB0aGUgc2VydmVyIHNpZGVcbiAgICAgICAgcG9udW1iZXI6IHBvbnVtYmVyLCAvL3RoaXMgaXMgbm90IHRoYXQuIGl0cyB2YXJpYWJsZSBpbiBsaW5lIDRcbiAgICAgICAgY2hlY2twb2ludF9pZDogMVxuICAgICAgfVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IC8vdGhpcyB3aWxsIHByZXR0eSBtdWNoIGJlIHRoZSBzYW1lIGZvciBhbGwgb2YgbXkgc2VydmljZSBmdW5jdGlvbnNcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgfSlcbiB9O1xuXG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5jb250cm9sbGVyKCdob21lQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsIGhvbWVTZXJ2aWNlLCB1c2VyKSB7XG5cbiAgJHNjb3BlLnRlc3QgPSBob21lU2VydmljZS5tZXNzYWdlO1xuXG4gICRzY29wZS5hZGRwbyA9IGZ1bmN0aW9uIChwb251bSkge1xuICAgIGhvbWVTZXJ2aWNlLmFkZHBvKHBvbnVtKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgLy9tYWtlIGEgY29uZmlybWF0aW9uIG1lc3NhZ2UsIGxpa2UgY2hlY2tpbiBjb25maXJtZWRcblxuICAgIH0pXG4gIH07XG4vLyoqKioqKioqKioqKioqKiphdHRlbXB0aW5nIHRvIG1ha2UgZmluZCBidXR0b24gKioqKioqKioqKioqKioqKioqKioqLy9cbiRzY29wZS5maW5kcG8gPSBmdW5jdGlvbiAoZmluZE51bSkge1xuICBob21lU2VydmljZS5maW5kcG8oZmluZE51bSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAvL21ha2UgYSBjb25maXJtYXRpb24gbWVzc2FnZSwgbGlrZSBjaGVja2luIGNvbmZpcm1lZFxuXG4gIH0pXG59O1xuXG4vLyoqKioqZ2l2ZXMgdmlldyBlbXBsb3llZV9uYW1lLCBwaG90bywgY2hlY2twb2ludF9uYW1lIGZvciB0aGUgd2VsY29tZSBtZXNzYWdlIGluIGhvbWUgdmlldyBmcm9tIGRhdGFic2UqKioqKi8vXG4gICRzY29wZS53ZWxjb21lQXNzZXRzID0gZnVuY3Rpb24oKSB7XG4gICAgLy9jYWxsIHRoZSBmdW5jdGlvbiB0aGF0J3MgaW4gc2VydmljZVxuICAgIGNvbnNvbGUubG9nKCdpcyB0aGlzIG9wZXJhdGluZz8nKTtcbiAgICBob21lU2VydmljZS53ZWxjb21lQXNzZXRzKCkgLy9ub3cgd2UncmUgY2FsbGluZyB3ZWxjb21lQXNzZXRzIGluIHRoZSBob21lU2VydmljZSwgZnJvbSBob21lQ3RybFxuICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBjb25zb2xlLmxvZygndGhpcyBpcyBvdXIgcmVzcG9uc2UnLCByZXNwb25zZSlcbiAgICAgICRzY29wZS5yZXNwb25zZSA9IHJlc3BvbnNlO1xuXG4gICAgfSlcbiAgfVxuICAkc2NvcGUud2VsY29tZUFzc2V0cygpO1xuIH0pO1xuIiwiLy8gSU5JVElMSVpFIFNFUlZJQ0Vcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLnNlcnZpY2UoJ2hvbWVTZXJ2aWNlJywgZnVuY3Rpb24gKCRodHRwKSB7XG5cbi8vIENSVUQgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vYWRkaW5nIHBvIG51bWJlciB0byBwcm9kdWN0aW9uXG4gIHRoaXMuYWRkcG8gPSBmdW5jdGlvbiAocG9udW1iZXIpIHtcbiAgICByZXR1cm4gJGh0dHAgKHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAnL2NoZWNraW4nLFxuICAgICAgZGF0YTogeyAvL3RoaXMgaXMgdGhlIGJvZHkhIHJlcS5ib2R5IG9uIHRoZSBvdGhlciBzaWRlLCB0aGUgc2VydmVyIHNpZGVcbiAgICAgICAgcG9udW1iZXI6IHBvbnVtYmVyLCAvL3RoaXMgaXMgbm90IHRoYXQuIGl0cyB2YXJpYWJsZSBpbiBsaW5lIDRcbiAgICAgICAgY2hlY2twb2ludF9pZDogMSAvL3RoaXMgd2lsbCB3b3JrIGFzIGxvbmcgYXMgdGhlIGZpcnN0IGNoZWNrcG9pbnQgaXMgbmV2ZXIgZGVsZXRlZC4gbGF0ZXIgb24sIHdlIGNhbiBmaWd1cmUgb3V0IGhvdyB0byBmaXggdGhhdC5cbiAgICAgIH1cbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyAvL3RoaXMgd2lsbCBwcmV0dHkgbXVjaCBiZSB0aGUgc2FtZSBmb3IgYWxsIG9mIG15IHNlcnZpY2UgZnVuY3Rpb25zXG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICB9KTtcbiB9O1xuIC8vYWRkaW5nIFBPIyB3aGVuIHVzZXIgY2xpY2tzIGZpbmRcbiB0aGlzLmZpbmRwbyA9IGZ1bmN0aW9uKHBvX251bWJlcikge1xuICAgcmV0dXJuICRodHRwKHtcbiAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgIHVybDogJy9maW5kJy8qLCovLFxuICAgICBkYXRhOiB7cG9udW1iZXI6IHBvX251bWJlcn1cbiAgICAvLyAgZGF0YTogeyAvL3RoaXMgaXMgdGhlIGJvZHkhIHJlcS5ib2R5IG9uIHRoZSBvdGhlciBzaWRlLCB0aGUgc2VydmVyIHNpZGVcbiAgICAvLyAgICBmaW5kX3BvOiBmaW5kX3BvLCAvL3RoaXMgaXMgbm90IHRoYXQuIGl0cyB2YXJpYWJsZSBpbiBsaW5lIDRcbiAgICAvLyAgICAvL2NoZWNrcG9pbnRfaWQ6IDEgLy90aGlzIHdpbGwgd29yayBhcyBsb25nIGFzIHRoZSBmaXJzdCBjaGVja3BvaW50IGlzIG5ldmVyIGRlbGV0ZWQuIGxhdGVyIG9uLCB3ZSBjYW4gZmlndXJlIG91dCBob3cgdG8gZml4IHRoYXQuXG4gICAgLy8gIH1cbiAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpeyAvL2NhdGNoaW5nIHRoZSByZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXJcbiAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7IC8vcmVzcG9uc2UuZGF0YSBpcyB0aGUgaW5mbyB3ZSB3YW50XG4gfSk7XG4gfTtcbi8vZ2V0dGluZyB1c2VyJ3MgbmFtZSB0byBhZGQgdG8gd2VsY29tZSBtZXNzYWdlXG4gIHRoaXMud2VsY29tZUFzc2V0cyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgdXJsOiAnL3dlbGNvbWVBc3NldHMnXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7IC8vY2F0Y2hpbmcgdGhlIHJlc3BvbnNlIGZyb20gdGhlIHNlcnZlclxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7IC8vcmVzcG9uc2UuZGF0YSBpcyB0aGUgaW5mbyB3ZSB3YW50XG4gIH0pO1xufTtcblxuXG5cblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4gICAgLmNvbnRyb2xsZXIoJ2xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAkc2NvcGUudGVzdCA9IFwibWFqb3IgdG9tIHRvIGdyb3VuZCBjb250cm9sXCI7XG4vLyoqKioqKioqKioqKioqKioqKioqKipERUxFVEUgVEhJUyBCRUZPUkUgUFJFU0VOVElORyBBTkQgSE9TVElORyoqKioqKioqKioqKioqKioqKioqKi8vXG4gICRzY29wZS51c2VyID0ge1xuICAgIG5hbWU6ICdRdWlubicsXG4gICAgcGFzc3dvcmQ6ICdxJ1xuICB9XG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbiAgICAgICAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24odXNlcikge1xuICAgICAgICAgICAgYXV0aFNlcnZpY2UubG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdVc2VyIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS51c2VyLnBhc3N3b3JkID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYocmVzcG9uc2UuZGF0YS5hZG1pbil7XG4gICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FkbWluLWhvbWUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdob21lJyk7IC8vdGFrZXMgdXMgdG8gaG9tZT8/Pz9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnVW5hYmxlIHRvIGxvZ2luJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9KTtcblxuLy9SRUZFUiBUTyBUSElTIENPREUgV0hFTiBUSU1FIFRPIFJFR0lTVEVSIEJVU0lORVNTXG4vLyAgICRzY29wZS5yZWdpc3RlciA9IGZ1bmN0aW9uKHVzZXIpIHtcbi8vICAgICAgIGF1dGhTZXJ2aWNlLnJlZ2lzdGVyVXNlcih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSkge1xuLy8gICAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gY3JlYXRlIHVzZXInKTtcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICBhbGVydCgnVXNlciBDcmVhdGVkJyk7XG4vLyAgICAgICAgICAgJHNjb3BlLm5ld1VzZXIgPSB7fTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4vLyAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gY3JlYXRlIHVzZXInKTtcbi8vICAgICAgIH0pO1xuLy8gICAgIH07XG4vLyB9KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5jb250cm9sbGVyKCdtYXBDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBtYXBTZXJ2aWNlKSB7XG5cbiAgJHNjb3BlLm1lc3NhZ2UgPSBcImhpLCBsZXRzIGRvIHRoaXNcIjtcblxuICAkc2NvcGUuZmluZHBvID0gZnVuY3Rpb24gKHRlc3RpbmcpIHtcbiAgICBtYXBTZXJ2aWNlLmZpbmRwbyh0ZXN0aW5nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgLy9tYWtlIGEgY29uZmlybWF0aW9uIG1lc3NhZ2UsIGxpa2UgY2hlY2tpbiBjb25maXJtZWRcblxuICAgIH0pXG4gIH07XG5cbi8vU1VETyBDT0RFIEZST00gQUxFWFxuLy8gJHNjb3BlLmdldEl0ID0gZnVuY3Rpb24oKXtcbiAgICAvL3JldHVybiB3aGF0IHlvdSB3YW50IGZyb20gdGhlIGRhdGFiYXNlIG9uIHNjb3BlXG4gICAgLy90aGVuIGluIHRoZSBodG1sIGJpbmQgaXQgd2l0aCBhbiBuZy1yZXBlYXQgc2ltaWxhciB0byBvdGhlciBibHVlIGRvdHNcbi8vIH0oKVxuXG4vLyQoZnVuY3Rpb24pe1xuLy8gICQoJy5jYXQnKS5jc3MoKXt9XG4vLyAgJCgpXG4vL31cblxufSk7XG4iLCIvLyBJTklUSUxJWkUgU0VSVklDRVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5hbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uc2VydmljZSgnbWFwU2VydmljZScsIGZ1bmN0aW9uKCRodHRwKSB7XG5cbi8vIENSVUQgRlVOQ1RJT05TdGVzdGluZ1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vL2ZpbmRpbmcgcG8gbnVtYmVyIGZyb20gZGF0YWJzZVxuXG4vLyBtb2RlbGluZyB0aGlzIGFmdGVyIGVkaXRTZXJ2aWNlLmpzXG4gIHRoaXMuZmluZHBvID0gZnVuY3Rpb24gKHRlc3RpbmcpIHtcbiAgICByZXR1cm4gJGh0dHAgKHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAnL2ZpbmQnLFxuICAgICAgZGF0YTogIHsgLy90aGlzIGlzIHRoZSBib2R5ISByZXEuYm9keSBvbiB0aGUgb3RoZXIgc2lkZSwgdGhlIHNlcnZlciBzaWRlXG4gICAgICAgIHRlc3Rpbmc6IHRlc3RpbmcgLy90aGlzIGlzIG5vdCB0aGF0LiBpdHMgdmFyaWFibGUgaW4gbGluZSA0XG4gICAgICAgICAvL3RoaXMgd2lsbCB3b3JrIGFzIGxvbmcgYXMgdGhlIGZpcnN0IGNoZWNrcG9pbnQgaXMgbmV2ZXIgZGVsZXRlZC4gbGF0ZXIgb24sIHdlIGNhbiBmaWd1cmUgb3V0IGhvdyB0byBmaXggdGhhdC5cbiAgICAgIH1cblxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IC8vdGhpcyB3aWxsIHByZXR0eSBtdWNoIGJlIHRoZSBzYW1lIGZvciBhbGwgb2YgbXkgc2VydmljZSBmdW5jdGlvbnNcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9KTtcbiB9O1xuICB9KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5jb250cm9sbGVyKCdyZWdpc3RlckN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbi8vXG4vLyAgICAgICAkc2NvcGUucmVnaXN0ZXIgPSBmdW5jdGlvbih1c2VyKSB7XG4vL1xuLy8gICAgICAgICAgIGF1dGhTZXJ2aWNlLmxvZ2luKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKSB7XG4vLyAgICAgICAgICAgICAgICAgICBhbGVydCgnVXNlciBkb2VzIG5vdCBleGlzdCcpO1xuLy8gICAgICAgICAgICAgICAgICAgJHNjb3BlLnVzZXIucGFzc3dvcmQgPSAnJztcbi8vICAgICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYWRtaW4taG9tZScpOyAvL3Rha2VzIHVzIHRvIGhvbWU/Pz8/XG4vLyAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbi8vICAgICAgICAgICAgICAgYWxlcnQoJ1VuYWJsZSB0byBsb2dpbicpO1xuLy8gICAgICAgICAgIH0pO1xuLy8gICAgICAgfTtcbi8vXG4vLyB9KTtcblxuJHNjb3BlLnJlZ2lzdGVyID0gZnVuY3Rpb24odXNlcikge1xuICBhdXRoU2VydmljZS5yZWdpc3RlclVzZXIodXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgIGlmICghcmVzcG9uc2UuZGF0YSkge1xuICAgICAgYWxlcnQoJ1VuYWJsZSB0byBjcmVhdGUgdXNlcicpO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZXNwb25zZS5kYXRhKXtcbiAgICAgIGFsZXJ0KCdVc2VyIENyZWF0ZWQhIFBsZWFzZSBsb2dpbi4nKTtcbiAgICAgIC8vICRzY29wZS5uZXdVc2VyID0ge307XG4gICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgfVxuICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICBhbGVydCgnVW5hYmxlIHRvIGNyZWF0ZSB1c2VyJyk7XG4gIH0pO1xufTtcbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLmNvbnRyb2xsZXIoJ2VkaXRDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBlZGl0U2VydmljZSwgJHN0YXRlLCBjaGVja3BvaW50cywgYXV0aFNlcnZpY2UpIHtcbiAgICAkc2NvcGUub2JqID0ge307Ly9kbyBpIG5lZWQgdGhpcyBzdGlsbD8/Pz9cblxuICAgICRzY29wZS5nZXR0ZXIgPSBmdW5jdGlvbihhZGRVc2VyKXtcbiAgICAgIGVkaXRTZXJ2aWNlLmFkZFVzZXIoYWRkVXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAvL2V2ZXJ5dGhpbmcgdGhhdCBoYXBwZW5zIEFGVEVSIGdvZXMgaGVyZSwgbGlrZSBjbGVhciBmb3JtLCAkc3RhdGUuZ29cbiAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKSB7XG4gICAgICAgICAgYWxlcnQoJ1VuYWJsZSB0byBjcmVhdGUgdXNlcicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlLmRhdGEpe1xuICAgICAgICAgIGFsZXJ0KCdVc2VyIENyZWF0ZWQhJyk7XG4gICAgICAgICAgJHN0YXRlLnJlbG9hZCgnZWRpdCcpO1xuICAgICAgICB9XG4gICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgYWxlcnQoJ1VuYWJsZSB0byBjcmVhdGUgdXNlcicpO1xuICAgICAgfSk7XG4gICAgfTtcblxuXG4vLyoqKioqKioqKioqKioqKioqYWRkaW5nIGRvdHMgdG8gbWFwIGluIGVkaXQgdmlldyoqKioqKioqKioqKioqKioqKiovL1xuICAgICRzY29wZS5jaGVja3BvaW50cyA9IGNoZWNrcG9pbnRzO1xuICAgIGNvbnNvbGUubG9nKCRzY29wZS5jaGVja3BvaW50cyk7XG5cbi8qIEVYQU1QTEVcbmFuZ3VsYXIubW9kdWxlKCdzdGFyV2Fyc0FwcCcpXG4uY29udHJvbGxlcignbWFpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIHN0YXJXYXJzU2VydmljZSkge1xuICBzdGFyV2Fyc1NlcnZpY2UuZ2V0UGVvcGxlKCkgLy90aGlzIGlzIHRoZSBwcm9taXNlXG4gIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7IC8vLnRoZW4gY2FsbGJhY2sgZnVuY3Rpb24gcmVwcmVzZW50cyBvdXIgZGF0YSwgd2hpY2ggaXMgdGhlIGdldFBlb3BsZSBmdW5jdGlvbiBpbiBzdGFyV2Fyc1NlcnZpY2UuIGFsc28sIHJlc3BvbnNlIGlzIGp1c3QgYSBjb21tb24gcGFyYW1ldGVyIG5hbWUsIGNhbiBiZSBuYW1lZCBhbnl0aGluZywgYnV0IHVzZSByZXNwb25zZS5cbiAgICAkc2NvcGUucGVvcGxlID0gcmVzcG9uc2UuZGF0YS5yZXN1bHRzOyAvL3RoZSByZXR1cm5lZCBwcm9taXNlIGlzIGRhdGEgZnJvbSByZXNwb25zZS5kYXRhLnJlc3VsdHMuIG5vdyByZXNwb25zZS5kYXRhLnJlc3VsdHMgaXMgbGlrZSBhIGZpbGVwYXRoIGZvdW5kIGluIHRoZSBvYmplY3QgdGhhdCBpcyByZXRyZWl2ZWQgZnJvbSBTd2FwaS5jby4gaSBjYW4gc2VlIG9iamVjdCBzdHJ1Y3R1cmUgaWYgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICB9KVxufSlcbiovXG5cbn0pO1xuIiwiLy8gSU5JVElMSVpFIFNFUlZJQ0Vcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuYW5ndWxhci5tb2R1bGUoXCJvcmRlcmhvdW5kXCIpLnNlcnZpY2UoXCJlZGl0U2VydmljZVwiLCBmdW5jdGlvbigkaHR0cCkge1xuXG4gIC8vIENSVUQgRlVOQ1RJT05TXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG50aGlzLmFkZFVzZXIgPSBmdW5jdGlvbihhZGRVc2VyKSB7XG4gICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIHVybDogJy9hZGRVc2VyJyxcbiAgICAgICAgICBkYXRhOiBhZGRVc2VyXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSk7XG4gIH07XG4gIC8vKioqKioqKioqKiphZGRpbmcgZG90cyB0byBpbWFnZSBvZiBtYXAgaW4gZWRpdCB2aWV3KioqKioqKioqKiovL1xuICB0aGlzLmNoZWNrcG9pbnRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6ICcvY2hlY2twb2ludHMnLFxuICAgICAgLy9kYXRhOiBjaGVja3BvaW50c1xuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgfSk7XG4gIH07XG5cbiB9KTtcbiJdfQ==
