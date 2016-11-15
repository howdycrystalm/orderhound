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
//****************attempting to make find button *********************//
$scope.findpo = function (findNum) {
  homeService.addpo(findNum).then(function (response) {
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
 this.findpo = function(find) {
   return $http({
     method: 'POST',
     url: '/find',
     data: { //this is the body! req.body on the other side, the server side
       namethiswhatever: what, //this is not that. its variable in line 4
       //checkpoint_id: 1 //this will work as long as the first checkpoint is never deleted. later on, we can figure out how to fix that.
     }
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
      alert('User Created');
      $scope.newUser = {};
      $state.go('edit');
    }
  }).catch(function(err) {
    alert('Unable to create user');
  });
};
}]);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImpzL3JvdXRlcnMuanMiLCJzZXJ2aWNlcy9hdXRoU2VydmljZS5qcyIsInNlcnZpY2VzL3VzZXJTZXJ2aWNlLmpzIiwic3RhdGVzL2FkbWluLWhvbWUvYWRtaW4taG9tZUN0cmwuanMiLCJzdGF0ZXMvYWRtaW4taG9tZS9hZG1pblNlcnZpY2UuanMiLCJzdGF0ZXMvZWRpdC9lZGl0Q3RybC5qcyIsInN0YXRlcy9lZGl0L2VkaXRTZXJ2aWNlLmpzIiwic3RhdGVzL2hvbWUvaG9tZUN0cmwuanMiLCJzdGF0ZXMvaG9tZS9ob21lU2VydmljZS5qcyIsInN0YXRlcy9sb2dpbi9sb2dpbkN0cmwuanMiLCJzdGF0ZXMvbWFwL21hcEN0cmwuanMiLCJzdGF0ZXMvbWFwL21hcFNlcnZpY2UuanMiLCJzdGF0ZXMvcmVnaXN0ZXIvcmVnaXN0ZXJDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxlQUFlLENBQUM7QUFDL0I7QUNEQSxRQUFRLE9BQU87S0FDVixnREFBTyxTQUFTLGdCQUFnQixvQkFBb0I7O1FBRWpELG1CQUFtQixVQUFVOztRQUU3QjthQUNLLE1BQU0sU0FBUztnQkFDWixLQUFLO2dCQUNMLFlBQVk7Z0JBQ1osYUFBYTs7YUFFaEIsTUFBTSxRQUFRO2dCQUNYLEtBQUs7Z0JBQ0wsWUFBWTtnQkFDWixhQUFhO2dCQUNiLFNBQVM7b0JBQ0wsK0JBQWUsU0FBUyxhQUFhO3NCQUNuQyxPQUFPLFlBQVk7O29CQUVyQixnQ0FBTSxTQUFTLGFBQWEsUUFBUTt3QkFDaEMsT0FBTyxZQUFZOzZCQUNkLEtBQUssU0FBUyxVQUFVO2dDQUNyQixJQUFJLENBQUMsU0FBUztvQ0FDVixPQUFPLEdBQUc7Z0NBQ2QsT0FBTyxTQUFTOzs2QkFFbkIsTUFBTSxTQUFTLEtBQUs7Z0NBQ2pCLE9BQU8sR0FBRzs7Ozs7YUFLN0IsTUFBTSxZQUFZO2dCQUNmLEtBQUs7Z0JBQ0wsWUFBWTtnQkFDWixhQUFhOzthQUVoQixNQUFNLGNB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QVEsT0FBTztDQUNkLFdBQVcsb0NBQVcsU0FBUyxRQUFRLFlBQVk7O0VBRWxELE9BQU8sVUFBVTs7RUFFakIsT0FBTyxTQUFTLFVBQVUsU0FBUztJQUNqQyxXQUFXLE9BQU8sU0FBUyxLQUFLLFVBQVUsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0J4RDtBQ3hCQTs7QUFFQSxRQUFRLE9BQU87Q0FDZCxRQUFRLHdCQUFjLFNBQVMsT0FBTzs7Ozs7OztFQU9yQyxLQUFLLFNBQVMsVUFBVSxTQUFTO0lBQy9CLE9BQU8sT0FBTztNQUNaLFFBQVE7TUFDUixLQUFLO01BQ0wsT0FBTztRQUNMLFNBQVM7Ozs7T0FJVixLQUFLLFVBQVUsVUFBVTtNQUMxQixPQUFPOzs7O0FBSWI7QUN4QkEsUUFBUSxPQUFPO0NBQ2QsV0FBVyxvREFBZ0IsU0FBUyxRQUFRLGFBQWEsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JsRSxPQUFPLFdBQVcsU0FBUyxNQUFNO0VBQy9CLFlBQVksYUFBYSxNQUFNLEtBQUssU0FBUyxVQUFVO0lBQ3JELElBQUksQ0FBQyxTQUFTLE1BQU07TUFDbEIsTUFBTTs7U0FFSCxJQUFJLFNBQVMsS0FBSztNQUNyQixNQUFNO01BQ04sT0FBTyxVQUFVO01BQ2pCLE9BQU8sR0FBRzs7S0FFWCxNQUFNLFNBQVMsS0FBSztJQUNyQixNQUFNOzs7O0FBSVYiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnLCAgWyd1aS5yb3V0ZXInXSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4gICAgLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpXG5cbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgICAgIC5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbG9naW5DdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvbG9naW4vbG9naW4uaHRtbCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgd2VsY29tZUFzc2V0czogZnVuY3Rpb24oaG9tZVNlcnZpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaG9tZVNlcnZpY2Uud2VsY29tZUFzc2V0cygpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB1c2VyOiBmdW5jdGlvbihhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXV0aFNlcnZpY2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ3JlZ2lzdGVyJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9yZWdpc3RlcicsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3JlZ2lzdGVyQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL3JlZ2lzdGVyL3JlZ2lzdGVyLmh0bWwnLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYWRtaW4taG9tZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvYWRtaW4taG9tZScsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2FkbWluLWhvbWVDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvYWRtaW4taG9tZS9hZG1pbi1ob21lLmh0bWwnLFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogZnVuY3Rpb24oYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF1dGhTZXJ2aWNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdlZGl0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9lZGl0JyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZWRpdEN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0YXRlcy9lZGl0L2VkaXQuaHRtbCcsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICBjaGVja3BvaW50czogZnVuY3Rpb24oZWRpdFNlcnZpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWRpdFNlcnZpY2UuY2hlY2twb2ludHMoKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogZnVuY3Rpb24oYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF1dGhTZXJ2aWNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ21hcCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvbWFwJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFwQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL21hcC9tYXAuaHRtbCcsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICAvLyBmaW5kcG86IGZ1bmN0aW9uKGhvbWVTZXJ2aWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgcmV0dXJuIG1hcFNlcnZpY2UuZmluZHBvKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IGZ1bmN0aW9uKGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdXRoU2VydmljZS5nZXRDdXJyZW50VXNlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKS5zZXJ2aWNlKFwiYXV0aFNlcnZpY2VcIiwgZnVuY3Rpb24oJGh0dHApIHtcblxuICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiAnL2xvZ291dCdcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRDdXJyZW50VXNlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy9ob21lJ1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG4vL2dvb2QgdG8gZ29cbiAgICB0aGlzLnJlZ2lzdGVyVXNlciA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiAnL3JlZ2lzdGVyJyxcbiAgICAgICAgICAgIGRhdGE6IHVzZXJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoaXMuZ2V0dGVyID0gZnVuY3Rpb24oYWRkVXNlcikge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6ICcvYWRkVXNlcicsXG4gICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZWRpdFVzZXIgPSBmdW5jdGlvbihpZCwgdXNlcikge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgIHVybDogXCIvdXNlci9cIiArIGlkLFxuICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJykuc2VydmljZShcInVzZXJTZXJ2aWNlXCIsIGZ1bmN0aW9uKCRodHRwKSB7XG5cbiAgICB0aGlzLmdldFVzZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiAnL3VzZXInXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcbi8vYW0gaSB1c2luZyBsaW5lIDEyIGZ1bmN0aW9uPz8/Pz9cbiAgICB0aGlzLmdldFVzZXIgPSBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy91c2VyP19pZD0nICsgaWRcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gTm90IE5lZWRlZFxuICAgIC8vXG4gICAgLy8gdGhpcy5kZWxldGVVc2VyID0gZnVuY3Rpb24oaWQpIHtcbiAgICAvLyAgIHJldHVybiAkaHR0cCh7XG4gICAgLy8gICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgLy8gICAgIHVybDogJy91c2VyLycgKyBpZFxuICAgIC8vICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgIC8vICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgLy8gICB9KTtcbiAgICAvLyB9O1xufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uY29udHJvbGxlcignYWRtaW4taG9tZUN0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCBob21lU2VydmljZSwgdXNlcikge1xuXG4gICRzY29wZS50ZXN0ID0gaG9tZVNlcnZpY2UubWVzc2FnZTtcbiAgJHNjb3BlLm5hbWUgPSBmdW5jdGlvbihlbXBsb3llZV9uYW1lKSB7XG4gICAgYWRtaW5TZXJ2aWNlLm5hbWUoZW1wbG95ZWVfbmFtZSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICB9KVxuICB9XG5cbiAgJHNjb3BlLmFkZHBvID0gZnVuY3Rpb24gKHBvbnVtKSB7XG4gICAgaG9tZVNlcnZpY2UuYWRkcG8ocG9udW0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAvL21ha2UgYSBjb25maXJtYXRpb24gbWVzc2FnZSwgbGlrZSBjaGVja2luIGNvbmZpcm1lZFxuXG4gICAgfSlcbiAgfVxuXG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uc2VydmljZSgnYWRtaW5TZXJ2aWNlJywgZnVuY3Rpb24gKCRodHRwKSB7XG5cbiAgdGhpcy5hZGRwbyA9IGZ1bmN0aW9uIChwb251bWJlcikge1xuICAgIHJldHVybiAkaHR0cCAoe1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6ICcvY2hlY2tpbicsXG4gICAgICBkYXRhOiB7IC8vdGhpcyBpcyB0aGUgYm9keSEgcmVxLmJvZHkgb24gdGhlIG90aGVyIHNpZGUsIHRoZSBzZXJ2ZXIgc2lkZVxuICAgICAgICBwb251bWJlcjogcG9udW1iZXIsIC8vdGhpcyBpcyBub3QgdGhhdC4gaXRzIHZhcmlhYmxlIGluIGxpbmUgNFxuICAgICAgICBjaGVja3BvaW50X2lkOiAxXG4gICAgICB9XG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgLy90aGlzIHdpbGwgcHJldHR5IG11Y2ggYmUgdGhlIHNhbWUgZm9yIGFsbCBvZiBteSBzZXJ2aWNlIGZ1bmN0aW9uc1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICB9KVxuIH07XG5cbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLmNvbnRyb2xsZXIoJ2VkaXRDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBlZGl0U2VydmljZSwgJHN0YXRlLCBjaGVja3BvaW50cykge1xuLy9nb3QgaGVscCBmcm9tIGx1Y2FzIHdpdGhpIHRoaXNcbiAgICAkc2NvcGUub2JqID0ge307Ly9kbyBpIG5lZWQgdGhpcyBzdGlsbD8/Pz9cblxuICAgICRzY29wZS5nZXR0ZXIgPSBmdW5jdGlvbihhZGRVc2VyKXtcbiAgICAgIGVkaXRTZXJ2aWNlLmFkZFVzZXIoYWRkVXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAvL2V2ZXJ5dGhpbmcgdGhhdCBoYXBwZW5zIEFGVEVSIGdvZXMgaGVyZSwgbGlrZSBjbGVhciBmb3JtLCAkc3RhdGUuZ29cbiAgICAgIH0pXG4gICAgfTtcbi8vKioqKioqKioqKioqKioqKiphZGRpbmcgZG90cyB0byBtYXAgaW4gZWRpdCB2aWV3KioqKioqKioqKioqKioqKioqKi8vXG4gICAgJHNjb3BlLmNoZWNrcG9pbnRzID0gY2hlY2twb2ludHM7XG4gICAgY29uc29sZS5sb2coJHNjb3BlLmNoZWNrcG9pbnRzKTtcblxuLyogRVhBTVBMRVxuYW5ndWxhci5tb2R1bGUoJ3N0YXJXYXJzQXBwJylcbi5jb250cm9sbGVyKCdtYWluQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgc3RhcldhcnNTZXJ2aWNlKSB7XG4gIHN0YXJXYXJzU2VydmljZS5nZXRQZW9wbGUoKSAvL3RoaXMgaXMgdGhlIHByb21pc2VcbiAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHsgLy8udGhlbiBjYWxsYmFjayBmdW5jdGlvbiByZXByZXNlbnRzIG91ciBkYXRhLCB3aGljaCBpcyB0aGUgZ2V0UGVvcGxlIGZ1bmN0aW9uIGluIHN0YXJXYXJzU2VydmljZS4gYWxzbywgcmVzcG9uc2UgaXMganVzdCBhIGNvbW1vbiBwYXJhbWV0ZXIgbmFtZSwgY2FuIGJlIG5hbWVkIGFueXRoaW5nLCBidXQgdXNlIHJlc3BvbnNlLlxuICAgICRzY29wZS5wZW9wbGUgPSByZXNwb25zZS5kYXRhLnJlc3VsdHM7IC8vdGhlIHJldHVybmVkIHByb21pc2UgaXMgZGF0YSBmcm9tIHJlc3BvbnNlLmRhdGEucmVzdWx0cy4gbm93IHJlc3BvbnNlLmRhdGEucmVzdWx0cyBpcyBsaWtlIGEgZmlsZXBhdGggZm91bmQgaW4gdGhlIG9iamVjdCB0aGF0IGlzIHJldHJlaXZlZCBmcm9tIFN3YXBpLmNvLiBpIGNhbiBzZWUgb2JqZWN0IHN0cnVjdHVyZSBpZiBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gIH0pXG59KVxuKi9cblxufSk7XG4iLCIvLyBJTklUSUxJWkUgU0VSVklDRVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5hbmd1bGFyLm1vZHVsZShcIm9yZGVyaG91bmRcIikuc2VydmljZShcImVkaXRTZXJ2aWNlXCIsIGZ1bmN0aW9uKCRodHRwKSB7XG5cbiAgLy8gQ1JVRCBGVU5DVElPTlNcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbnRoaXMuYWRkVXNlciA9IGZ1bmN0aW9uKGFkZFVzZXIpIHtcbiAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgdXJsOiAnL2FkZFVzZXInLFxuICAgICAgICAgIGRhdGE6IGFkZFVzZXJcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9KTtcbiAgfTtcbiAgLy8qKioqKioqKioqKmFkZGluZyBkb3RzIHRvIGltYWdlIG9mIG1hcCBpbiBlZGl0IHZpZXcqKioqKioqKioqKi8vXG4gIHRoaXMuY2hlY2twb2ludHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHVybDogJy9jaGVja3BvaW50cycsXG4gICAgICAvL2RhdGE6IGNoZWNrcG9pbnRzXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICB9KTtcbiAgfTtcblxuIH0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLmNvbnRyb2xsZXIoJ2hvbWVDdHJsJywgZnVuY3Rpb24gKCRzY29wZSwgaG9tZVNlcnZpY2UsIHVzZXIpIHtcblxuICAkc2NvcGUudGVzdCA9IGhvbWVTZXJ2aWNlLm1lc3NhZ2U7XG5cbiAgJHNjb3BlLmFkZHBvID0gZnVuY3Rpb24gKHBvbnVtKSB7XG4gICAgaG9tZVNlcnZpY2UuYWRkcG8ocG9udW0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAvL21ha2UgYSBjb25maXJtYXRpb24gbWVzc2FnZSwgbGlrZSBjaGVja2luIGNvbmZpcm1lZFxuXG4gICAgfSlcbiAgfTtcbi8vKioqKioqKioqKioqKioqKmF0dGVtcHRpbmcgdG8gbWFrZSBmaW5kIGJ1dHRvbiAqKioqKioqKioqKioqKioqKioqKiovL1xuJHNjb3BlLmZpbmRwbyA9IGZ1bmN0aW9uIChmaW5kTnVtKSB7XG4gIGhvbWVTZXJ2aWNlLmFkZHBvKGZpbmROdW0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgLy9tYWtlIGEgY29uZmlybWF0aW9uIG1lc3NhZ2UsIGxpa2UgY2hlY2tpbiBjb25maXJtZWRcblxuICB9KVxufTtcblxuLy8qKioqKmdpdmVzIHZpZXcgZW1wbG95ZWVfbmFtZSwgcGhvdG8sIGNoZWNrcG9pbnRfbmFtZSBmb3IgdGhlIHdlbGNvbWUgbWVzc2FnZSBpbiBob21lIHZpZXcgZnJvbSBkYXRhYnNlKioqKiovL1xuICAkc2NvcGUud2VsY29tZUFzc2V0cyA9IGZ1bmN0aW9uKCkge1xuICAgIC8vY2FsbCB0aGUgZnVuY3Rpb24gdGhhdCdzIGluIHNlcnZpY2VcbiAgICBjb25zb2xlLmxvZygnaXMgdGhpcyBvcGVyYXRpbmc/Jyk7XG4gICAgaG9tZVNlcnZpY2Uud2VsY29tZUFzc2V0cygpIC8vbm93IHdlJ3JlIGNhbGxpbmcgd2VsY29tZUFzc2V0cyBpbiB0aGUgaG9tZVNlcnZpY2UsIGZyb20gaG9tZUN0cmxcbiAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgY29uc29sZS5sb2coJ3RoaXMgaXMgb3VyIHJlc3BvbnNlJywgcmVzcG9uc2UpXG4gICAgICAkc2NvcGUucmVzcG9uc2UgPSByZXNwb25zZTtcblxuICAgIH0pXG4gIH1cbiAgJHNjb3BlLndlbGNvbWVBc3NldHMoKTtcbiB9KTtcbiIsIi8vIElOSVRJTElaRSBTRVJWSUNFXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5zZXJ2aWNlKCdob21lU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCkge1xuXG4vLyBDUlVEIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vL2FkZGluZyBwbyBudW1iZXIgdG8gcHJvZHVjdGlvblxuICB0aGlzLmFkZHBvID0gZnVuY3Rpb24gKHBvbnVtYmVyKSB7XG4gICAgcmV0dXJuICRodHRwICh7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogJy9jaGVja2luJyxcbiAgICAgIGRhdGE6IHsgLy90aGlzIGlzIHRoZSBib2R5ISByZXEuYm9keSBvbiB0aGUgb3RoZXIgc2lkZSwgdGhlIHNlcnZlciBzaWRlXG4gICAgICAgIHBvbnVtYmVyOiBwb251bWJlciwgLy90aGlzIGlzIG5vdCB0aGF0LiBpdHMgdmFyaWFibGUgaW4gbGluZSA0XG4gICAgICAgIGNoZWNrcG9pbnRfaWQ6IDEgLy90aGlzIHdpbGwgd29yayBhcyBsb25nIGFzIHRoZSBmaXJzdCBjaGVja3BvaW50IGlzIG5ldmVyIGRlbGV0ZWQuIGxhdGVyIG9uLCB3ZSBjYW4gZmlndXJlIG91dCBob3cgdG8gZml4IHRoYXQuXG4gICAgICB9XG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgLy90aGlzIHdpbGwgcHJldHR5IG11Y2ggYmUgdGhlIHNhbWUgZm9yIGFsbCBvZiBteSBzZXJ2aWNlIGZ1bmN0aW9uc1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgfSk7XG4gfTtcbiAvL2FkZGluZyBQTyMgd2hlbiB1c2VyIGNsaWNrcyBmaW5kXG4gdGhpcy5maW5kcG8gPSBmdW5jdGlvbihmaW5kKSB7XG4gICByZXR1cm4gJGh0dHAoe1xuICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgdXJsOiAnL2ZpbmQnLFxuICAgICBkYXRhOiB7IC8vdGhpcyBpcyB0aGUgYm9keSEgcmVxLmJvZHkgb24gdGhlIG90aGVyIHNpZGUsIHRoZSBzZXJ2ZXIgc2lkZVxuICAgICAgIG5hbWV0aGlzd2hhdGV2ZXI6IHdoYXQsIC8vdGhpcyBpcyBub3QgdGhhdC4gaXRzIHZhcmlhYmxlIGluIGxpbmUgNFxuICAgICAgIC8vY2hlY2twb2ludF9pZDogMSAvL3RoaXMgd2lsbCB3b3JrIGFzIGxvbmcgYXMgdGhlIGZpcnN0IGNoZWNrcG9pbnQgaXMgbmV2ZXIgZGVsZXRlZC4gbGF0ZXIgb24sIHdlIGNhbiBmaWd1cmUgb3V0IGhvdyB0byBmaXggdGhhdC5cbiAgICAgfVxuICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7IC8vY2F0Y2hpbmcgdGhlIHJlc3BvbnNlIGZyb20gdGhlIHNlcnZlclxuICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTsgLy9yZXNwb25zZS5kYXRhIGlzIHRoZSBpbmZvIHdlIHdhbnRcbiB9KTtcbiB9O1xuLy9nZXR0aW5nIHVzZXIncyBuYW1lIHRvIGFkZCB0byB3ZWxjb21lIG1lc3NhZ2VcbiAgdGhpcy53ZWxjb21lQXNzZXRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6ICcvd2VsY29tZUFzc2V0cydcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXsgLy9jYXRjaGluZyB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyXG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTsgLy9yZXNwb25zZS5kYXRhIGlzIHRoZSBpbmZvIHdlIHdhbnRcbiAgfSk7XG59O1xuXG5cblxuXG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbiAgICAuY29udHJvbGxlcignbG9naW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4gICAgICAgICRzY29wZS50ZXN0ID0gXCJtYWpvciB0b20gdG8gZ3JvdW5kIGNvbnRyb2xcIjtcbi8vKioqKioqKioqKioqKioqKioqKioqKkRFTEVURSBUSElTIEJFRk9SRSBQUkVTRU5USU5HIEFORCBIT1NUSU5HKioqKioqKioqKioqKioqKioqKioqLy9cbiAgJHNjb3BlLnVzZXIgPSB7XG4gICAgbmFtZTogJ1F1aW5uJyxcbiAgICBwYXNzd29yZDogJ3EnXG4gIH1cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuICAgICAgICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgICAgICBhdXRoU2VydmljZS5sb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1VzZXIgZG9lcyBub3QgZXhpc3QnKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnVzZXIucGFzc3dvcmQgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihyZXNwb25zZS5kYXRhLmFkbWluKXtcbiAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYWRtaW4taG9tZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2hvbWUnKTsgLy90YWtlcyB1cyB0byBob21lPz8/P1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gbG9naW4nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH0pO1xuXG4vL1JFRkVSIFRPIFRISVMgQ09ERSBXSEVOIFRJTUUgVE8gUkVHSVNURVIgQlVTSU5FU1Ncbi8vICAgJHNjb3BlLnJlZ2lzdGVyID0gZnVuY3Rpb24odXNlcikge1xuLy8gICAgICAgYXV0aFNlcnZpY2UucmVnaXN0ZXJVc2VyKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKSB7XG4vLyAgICAgICAgICAgYWxlcnQoJ1VuYWJsZSB0byBjcmVhdGUgdXNlcicpO1xuLy8gICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgIGFsZXJ0KCdVc2VyIENyZWF0ZWQnKTtcbi8vICAgICAgICAgICAkc2NvcGUubmV3VXNlciA9IHt9O1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbi8vICAgICAgICAgYWxlcnQoJ1VuYWJsZSB0byBjcmVhdGUgdXNlcicpO1xuLy8gICAgICAgfSk7XG4vLyAgICAgfTtcbi8vIH0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLmNvbnRyb2xsZXIoJ21hcEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIG1hcFNlcnZpY2UpIHtcblxuICAkc2NvcGUubWVzc2FnZSA9IFwiaGksIGxldHMgZG8gdGhpc1wiO1xuXG4gICRzY29wZS5maW5kcG8gPSBmdW5jdGlvbiAodGVzdGluZykge1xuICAgIG1hcFNlcnZpY2UuZmluZHBvKHRlc3RpbmcpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAvL21ha2UgYSBjb25maXJtYXRpb24gbWVzc2FnZSwgbGlrZSBjaGVja2luIGNvbmZpcm1lZFxuXG4gICAgfSlcbiAgfTtcblxuLy9TVURPIENPREUgRlJPTSBBTEVYXG4vLyAkc2NvcGUuZ2V0SXQgPSBmdW5jdGlvbigpe1xuICAgIC8vcmV0dXJuIHdoYXQgeW91IHdhbnQgZnJvbSB0aGUgZGF0YWJhc2Ugb24gc2NvcGVcbiAgICAvL3RoZW4gaW4gdGhlIGh0bWwgYmluZCBpdCB3aXRoIGFuIG5nLXJlcGVhdCBzaW1pbGFyIHRvIG90aGVyIGJsdWUgZG90c1xuLy8gfSgpXG5cbi8vJChmdW5jdGlvbil7XG4vLyAgJCgnLmNhdCcpLmNzcygpe31cbi8vICAkKClcbi8vfVxuXG59KTtcbiIsIi8vIElOSVRJTElaRSBTRVJWSUNFXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5zZXJ2aWNlKCdtYXBTZXJ2aWNlJywgZnVuY3Rpb24oJGh0dHApIHtcblxuLy8gQ1JVRCBGVU5DVElPTlN0ZXN0aW5nXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vZmluZGluZyBwbyBudW1iZXIgZnJvbSBkYXRhYnNlXG5cbi8vIG1vZGVsaW5nIHRoaXMgYWZ0ZXIgZWRpdFNlcnZpY2UuanNcbiAgdGhpcy5maW5kcG8gPSBmdW5jdGlvbiAodGVzdGluZykge1xuICAgIHJldHVybiAkaHR0cCAoe1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6ICcvZmluZCcsXG4gICAgICBkYXRhOiAgeyAvL3RoaXMgaXMgdGhlIGJvZHkhIHJlcS5ib2R5IG9uIHRoZSBvdGhlciBzaWRlLCB0aGUgc2VydmVyIHNpZGVcbiAgICAgICAgdGVzdGluZzogdGVzdGluZyAvL3RoaXMgaXMgbm90IHRoYXQuIGl0cyB2YXJpYWJsZSBpbiBsaW5lIDRcbiAgICAgICAgIC8vdGhpcyB3aWxsIHdvcmsgYXMgbG9uZyBhcyB0aGUgZmlyc3QgY2hlY2twb2ludCBpcyBuZXZlciBkZWxldGVkLiBsYXRlciBvbiwgd2UgY2FuIGZpZ3VyZSBvdXQgaG93IHRvIGZpeCB0aGF0LlxuICAgICAgfVxuXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgLy90aGlzIHdpbGwgcHJldHR5IG11Y2ggYmUgdGhlIHNhbWUgZm9yIGFsbCBvZiBteSBzZXJ2aWNlIGZ1bmN0aW9uc1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0pO1xuIH07XG4gIH0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLmNvbnRyb2xsZXIoJ3JlZ2lzdGVyQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuLy9cbi8vICAgICAgICRzY29wZS5yZWdpc3RlciA9IGZ1bmN0aW9uKHVzZXIpIHtcbi8vXG4vLyAgICAgICAgICAgYXV0aFNlcnZpY2UubG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpIHtcbi8vICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdVc2VyIGRvZXMgbm90IGV4aXN0Jyk7XG4vLyAgICAgICAgICAgICAgICAgICAkc2NvcGUudXNlci5wYXNzd29yZCA9ICcnO1xuLy8gICAgICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhZG1pbi1ob21lJyk7IC8vdGFrZXMgdXMgdG8gaG9tZT8/Pz9cbi8vICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuLy8gICAgICAgICAgICAgICBhbGVydCgnVW5hYmxlIHRvIGxvZ2luJyk7XG4vLyAgICAgICAgICAgfSk7XG4vLyAgICAgICB9O1xuLy9cbi8vIH0pO1xuXG4kc2NvcGUucmVnaXN0ZXIgPSBmdW5jdGlvbih1c2VyKSB7XG4gIGF1dGhTZXJ2aWNlLnJlZ2lzdGVyVXNlcih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgaWYgKCFyZXNwb25zZS5kYXRhKSB7XG4gICAgICBhbGVydCgnVW5hYmxlIHRvIGNyZWF0ZSB1c2VyJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlc3BvbnNlLmRhdGEpe1xuICAgICAgYWxlcnQoJ1VzZXIgQ3JlYXRlZCcpO1xuICAgICAgJHNjb3BlLm5ld1VzZXIgPSB7fTtcbiAgICAgICRzdGF0ZS5nbygnZWRpdCcpO1xuICAgIH1cbiAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgYWxlcnQoJ1VuYWJsZSB0byBjcmVhdGUgdXNlcicpO1xuICB9KTtcbn07XG59KTtcbiJdfQ==
