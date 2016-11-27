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
.directive('menuDirective', function() {
  return{
    restrict: 'AE',
    //templateUrl: './app/js/directives/menuTmpl.html'
    templateUrl: './app/js/directives/menuTmpl.html'
  }
})

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

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
        console.log(response.data[1].employee_name + " HELLLLLLLOOOO");
        $scope.response = response.data;

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
      return response; //response.data is the info we want
  });
};




}]);

angular.module('orderhound')
    .controller('loginCtrl', ["$scope", "authService", "$state", function($scope, authService, $state) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImpzL3JvdXRlcnMuanMiLCJzZXJ2aWNlcy9hdXRoU2VydmljZS5qcyIsInNlcnZpY2VzL3VzZXJTZXJ2aWNlLmpzIiwianMvZGlyZWN0aXZlcy9tZW51RGlyZWN0aXZlLmpzIiwianMvZGlyZWN0aXZlcy9tZW51U2NyaXB0cy5qcyIsInN0YXRlcy9hZG1pbi1ob21lL2FkbWluLWhvbWVDdHJsLmpzIiwic3RhdGVzL2FkbWluLWhvbWUvYWRtaW5TZXJ2aWNlLmpzIiwic3RhdGVzL2VkaXQvZWRpdEN0cmwuanMiLCJzdGF0ZXMvZWRpdC9lZGl0U2VydmljZS5qcyIsInN0YXRlcy9ob21lL2hvbWVDdHJsLmpzIiwic3RhdGVzL2hvbWUvaG9tZVNlcnZpY2UuanMiLCJzdGF0ZXMvbG9naW4vbG9naW5DdHJsLmpzIiwic3RhdGVzL21hcC9tYXBDdHJsLmpzIiwic3RhdGVzL21hcC9tYXBTZXJ2aWNlLmpzIiwic3RhdGVzL3JlZ2lzdGVyL3JlZ2lzdGVyQ3RybC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sZUFBZSxDQUFDO0FBQy9CO0FDREEsUUFBUSxPQUFPO0tBQ1YsZ0RBQU8sU0FBUyxnQkFBZ0Isb0JBQW9COztRQUVqRCxtQkFBbUIsVUFBVTs7UUFFN0I7YUFDSyxNQUFNLFNBQVM7Z0JBQ1osS0FBSztnQkFDTCxZQUFZO2dCQUNaLGFBQWE7O2FBRWhCLE1BQU0sUUFBUTtnQkFDWCxLQUFLO2dCQUNMLFlBQVk7Z0JBQ1osYUFBYTtnQkFDYixTQUFTO29CQUNMLCtCQUFlLFNBQVMsYUFBYTtzQkFDbkMsT0FBTyxZQUFZOztvQkFFckIsZ0NBQU0sU0FBUyxhQUFhLFFBQVE7d0JBQ2hDLE9BQU8sWUFBWTs2QkFDZCxLQUFLLFNBQVMsVUFBVTtnQ0FDckIsSUFBSSxDQUFDLFNBQVM7b0NBQ1YsT0FBTyxHQUFHO2dDQUNkLE9BQU8sU0FBUzs7NkJBRW5CLE1BQU0sU0FBUyxLQUFLO2dDQUNqQixPQUFPLEdBQUc7Ozs7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UyxNQUFNO0VBQy9CLFlBQVksYUFBYSxNQUFNLEtBQUssU0FBUyxVQUFVO0lBQ3JELElBQUksQ0FBQyxTQUFTLE1BQU07TUFDbEIsTUFBTTs7U0FFSCxJQUFJLFNBQVMsS0FBSztNQUNyQixNQUFNOztNQUVOLE9BQU8sR0FBRzs7S0FFWCxNQUFNLFNBQVMsS0FBSztJQUNyQixNQUFNOzs7O0FBSVYiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnLCAgWyd1aS5yb3V0ZXInXSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4gICAgLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpXG5cbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgICAgIC5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbG9naW5DdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvbG9naW4vbG9naW4uaHRtbCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgd2VsY29tZUFzc2V0czogZnVuY3Rpb24oaG9tZVNlcnZpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaG9tZVNlcnZpY2Uud2VsY29tZUFzc2V0cygpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB1c2VyOiBmdW5jdGlvbihhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXV0aFNlcnZpY2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ3JlZ2lzdGVyJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9yZWdpc3RlcicsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3JlZ2lzdGVyQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL3JlZ2lzdGVyL3JlZ2lzdGVyLmh0bWwnLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnYWRtaW4taG9tZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvYWRtaW4taG9tZScsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2FkbWluLWhvbWVDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvYWRtaW4taG9tZS9hZG1pbi1ob21lLmh0bWwnLFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogZnVuY3Rpb24oYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF1dGhTZXJ2aWNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdlZGl0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9lZGl0JyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZWRpdEN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0YXRlcy9lZGl0L2VkaXQuaHRtbCcsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICBjaGVja3BvaW50czogZnVuY3Rpb24oZWRpdFNlcnZpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWRpdFNlcnZpY2UuY2hlY2twb2ludHMoKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogZnVuY3Rpb24oYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF1dGhTZXJ2aWNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ21hcCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvbWFwJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFwQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL21hcC9tYXAuaHRtbCcsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICAvLyBmaW5kcG86IGZ1bmN0aW9uKGhvbWVTZXJ2aWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgcmV0dXJuIG1hcFNlcnZpY2UuZmluZHBvKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IGZ1bmN0aW9uKGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdXRoU2VydmljZS5nZXRDdXJyZW50VXNlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKS5zZXJ2aWNlKFwiYXV0aFNlcnZpY2VcIiwgZnVuY3Rpb24oJGh0dHApIHtcblxuICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiAnL2xvZ291dCdcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRDdXJyZW50VXNlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy9ob21lJ1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG4vL2dvb2QgdG8gZ29cbiAgICB0aGlzLnJlZ2lzdGVyVXNlciA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiAnL3JlZ2lzdGVyJyxcbiAgICAgICAgICAgIGRhdGE6IHVzZXJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoaXMuZ2V0dGVyID0gZnVuY3Rpb24oYWRkVXNlcikge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6ICcvYWRkVXNlcicsXG4gICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZWRpdFVzZXIgPSBmdW5jdGlvbihpZCwgdXNlcikge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgIHVybDogXCIvdXNlci9cIiArIGlkLFxuICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJykuc2VydmljZShcInVzZXJTZXJ2aWNlXCIsIGZ1bmN0aW9uKCRodHRwKSB7XG5cbiAgICB0aGlzLmdldFVzZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiAnL3VzZXInXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcbi8vYW0gaSB1c2luZyBsaW5lIDEyIGZ1bmN0aW9uPz8/Pz9cbiAgICB0aGlzLmdldFVzZXIgPSBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy91c2VyP19pZD0nICsgaWRcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gTm90IE5lZWRlZFxuICAgIC8vXG4gICAgLy8gdGhpcy5kZWxldGVVc2VyID0gZnVuY3Rpb24oaWQpIHtcbiAgICAvLyAgIHJldHVybiAkaHR0cCh7XG4gICAgLy8gICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgLy8gICAgIHVybDogJy91c2VyLycgKyBpZFxuICAgIC8vICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgIC8vICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgLy8gICB9KTtcbiAgICAvLyB9O1xufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uZGlyZWN0aXZlKCdtZW51RGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XG4gIHJldHVybntcbiAgICByZXN0cmljdDogJ0FFJyxcbiAgICAvL3RlbXBsYXRlVXJsOiAnLi9hcHAvanMvZGlyZWN0aXZlcy9tZW51VG1wbC5odG1sJ1xuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvanMvZGlyZWN0aXZlcy9tZW51VG1wbC5odG1sJ1xuICB9XG59KVxuIiwiZnVuY3Rpb24gb3Blbk5hdigpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15U2lkZW5hdlwiKS5zdHlsZS53aWR0aCA9IFwiMjUwcHhcIjtcbn1cblxuZnVuY3Rpb24gY2xvc2VOYXYoKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteVNpZGVuYXZcIikuc3R5bGUud2lkdGggPSBcIjBcIjtcbn1cbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5jb250cm9sbGVyKCdhZG1pbi1ob21lQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsIGhvbWVTZXJ2aWNlLCB1c2VyKSB7XG5cbiAgJHNjb3BlLnRlc3QgPSBob21lU2VydmljZS5tZXNzYWdlO1xuICAkc2NvcGUubmFtZSA9IGZ1bmN0aW9uKGVtcGxveWVlX25hbWUpIHtcbiAgICBhZG1pblNlcnZpY2UubmFtZShlbXBsb3llZV9uYW1lKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgIH0pXG4gIH1cblxuICAkc2NvcGUuYWRkcG8gPSBmdW5jdGlvbiAocG9udW0pIHtcbiAgICBob21lU2VydmljZS5hZGRwbyhwb251bSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgIC8vbWFrZSBhIGNvbmZpcm1hdGlvbiBtZXNzYWdlLCBsaWtlIGNoZWNraW4gY29uZmlybWVkXG5cbiAgICB9KVxuICB9XG5cbiAgLy8qKioqKmdpdmVzIHZpZXcgZW1wbG95ZWVfbmFtZSwgcGhvdG8sIGNoZWNrcG9pbnRfbmFtZSBmb3IgdGhlIHdlbGNvbWUgbWVzc2FnZSBpbiBob21lIHZpZXcgZnJvbSBkYXRhYnNlKioqKiovL1xuICAgICRzY29wZS53ZWxjb21lQXNzZXRzID0gZnVuY3Rpb24oKSB7XG4gICAgICAvL2NhbGwgdGhlIGZ1bmN0aW9uIHRoYXQncyBpbiBzZXJ2aWNlXG4gICAgICBjb25zb2xlLmxvZygnaXMgdGhpcyBvcGVyYXRpbmc/Jyk7XG4gICAgICBob21lU2VydmljZS53ZWxjb21lQXNzZXRzKCkgLy9ub3cgd2UncmUgY2FsbGluZyB3ZWxjb21lQXNzZXRzIGluIHRoZSBob21lU2VydmljZSwgZnJvbSBob21lQ3RybFxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RoaXMgaXMgb3VyIHJlc3BvbnNlJywgcmVzcG9uc2UpXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGFbMV0uZW1wbG95ZWVfbmFtZSArIFwiIEhFTExMTExMTE9PT09cIik7XG4gICAgICAgICRzY29wZS5yZXNwb25zZSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgIH0pXG4gICAgfVxuICAgICRzY29wZS53ZWxjb21lQXNzZXRzKCk7XG4gICB9KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5zZXJ2aWNlKCdhZG1pblNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHApIHtcblxuICB0aGlzLmFkZHBvID0gZnVuY3Rpb24gKHBvbnVtYmVyKSB7XG4gICAgcmV0dXJuICRodHRwICh7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogJy9jaGVja2luJyxcbiAgICAgIGRhdGE6IHsgLy90aGlzIGlzIHRoZSBib2R5ISByZXEuYm9keSBvbiB0aGUgb3RoZXIgc2lkZSwgdGhlIHNlcnZlciBzaWRlXG4gICAgICAgIHBvbnVtYmVyOiBwb251bWJlciwgLy90aGlzIGlzIG5vdCB0aGF0LiBpdHMgdmFyaWFibGUgaW4gbGluZSA0XG4gICAgICAgIGNoZWNrcG9pbnRfaWQ6IDFcbiAgICAgIH1cbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyAvL3RoaXMgd2lsbCBwcmV0dHkgbXVjaCBiZSB0aGUgc2FtZSBmb3IgYWxsIG9mIG15IHNlcnZpY2UgZnVuY3Rpb25zXG5cbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgIH0pXG4gfTtcblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uY29udHJvbGxlcignZWRpdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIGVkaXRTZXJ2aWNlLCAkc3RhdGUsIGNoZWNrcG9pbnRzLCBhdXRoU2VydmljZSkge1xuICAgICRzY29wZS5vYmogPSB7fTsvL2RvIGkgbmVlZCB0aGlzIHN0aWxsPz8/P1xuXG4gICAgJHNjb3BlLmdldHRlciA9IGZ1bmN0aW9uKGFkZFVzZXIpe1xuICAgICAgZWRpdFNlcnZpY2UuYWRkVXNlcihhZGRVc2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIC8vZXZlcnl0aGluZyB0aGF0IGhhcHBlbnMgQUZURVIgZ29lcyBoZXJlLCBsaWtlIGNsZWFyIGZvcm0sICRzdGF0ZS5nb1xuICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpIHtcbiAgICAgICAgICBhbGVydCgnVW5hYmxlIHRvIGNyZWF0ZSB1c2VyJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVzcG9uc2UuZGF0YSl7XG4gICAgICAgICAgYWxlcnQoJ1VzZXIgQ3JlYXRlZCEnKTtcbiAgICAgICAgICAkc3RhdGUucmVsb2FkKCdlZGl0Jyk7XG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICBhbGVydCgnVW5hYmxlIHRvIGNyZWF0ZSB1c2VyJyk7XG4gICAgICB9KTtcbiAgICB9O1xuXG5cbi8vKioqKioqKioqKioqKioqKiphZGRpbmcgZG90cyB0byBtYXAgaW4gZWRpdCB2aWV3KioqKioqKioqKioqKioqKioqKi8vXG4gICAgJHNjb3BlLmNoZWNrcG9pbnRzID0gY2hlY2twb2ludHM7XG4gICAgY29uc29sZS5sb2coJHNjb3BlLmNoZWNrcG9pbnRzKTtcblxuLyogRVhBTVBMRVxuYW5ndWxhci5tb2R1bGUoJ3N0YXJXYXJzQXBwJylcbi5jb250cm9sbGVyKCdtYWluQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgc3RhcldhcnNTZXJ2aWNlKSB7XG4gIHN0YXJXYXJzU2VydmljZS5nZXRQZW9wbGUoKSAvL3RoaXMgaXMgdGhlIHByb21pc2VcbiAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHsgLy8udGhlbiBjYWxsYmFjayBmdW5jdGlvbiByZXByZXNlbnRzIG91ciBkYXRhLCB3aGljaCBpcyB0aGUgZ2V0UGVvcGxlIGZ1bmN0aW9uIGluIHN0YXJXYXJzU2VydmljZS4gYWxzbywgcmVzcG9uc2UgaXMganVzdCBhIGNvbW1vbiBwYXJhbWV0ZXIgbmFtZSwgY2FuIGJlIG5hbWVkIGFueXRoaW5nLCBidXQgdXNlIHJlc3BvbnNlLlxuICAgICRzY29wZS5wZW9wbGUgPSByZXNwb25zZS5kYXRhLnJlc3VsdHM7IC8vdGhlIHJldHVybmVkIHByb21pc2UgaXMgZGF0YSBmcm9tIHJlc3BvbnNlLmRhdGEucmVzdWx0cy4gbm93IHJlc3BvbnNlLmRhdGEucmVzdWx0cyBpcyBsaWtlIGEgZmlsZXBhdGggZm91bmQgaW4gdGhlIG9iamVjdCB0aGF0IGlzIHJldHJlaXZlZCBmcm9tIFN3YXBpLmNvLiBpIGNhbiBzZWUgb2JqZWN0IHN0cnVjdHVyZSBpZiBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gIH0pXG59KVxuKi9cblxufSk7XG4iLCIvLyBJTklUSUxJWkUgU0VSVklDRVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5hbmd1bGFyLm1vZHVsZShcIm9yZGVyaG91bmRcIikuc2VydmljZShcImVkaXRTZXJ2aWNlXCIsIGZ1bmN0aW9uKCRodHRwKSB7XG5cbiAgLy8gQ1JVRCBGVU5DVElPTlNcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbnRoaXMuYWRkVXNlciA9IGZ1bmN0aW9uKGFkZFVzZXIpIHtcbiAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgdXJsOiAnL2FkZFVzZXInLFxuICAgICAgICAgIGRhdGE6IGFkZFVzZXJcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9KTtcbiAgfTtcbiAgLy8qKioqKioqKioqKmFkZGluZyBkb3RzIHRvIGltYWdlIG9mIG1hcCBpbiBlZGl0IHZpZXcqKioqKioqKioqKi8vXG4gIHRoaXMuY2hlY2twb2ludHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHVybDogJy9jaGVja3BvaW50cycsXG4gICAgICAvL2RhdGE6IGNoZWNrcG9pbnRzXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICB9KTtcbiAgfTtcblxuIH0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLmNvbnRyb2xsZXIoJ2hvbWVDdHJsJywgZnVuY3Rpb24gKCRzY29wZSwgaG9tZVNlcnZpY2UsIHVzZXIpIHtcblxuICAkc2NvcGUudGVzdCA9IGhvbWVTZXJ2aWNlLm1lc3NhZ2U7XG5cbiAgJHNjb3BlLmFkZHBvID0gZnVuY3Rpb24gKHBvbnVtKSB7XG4gICAgaG9tZVNlcnZpY2UuYWRkcG8ocG9udW0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAvL21ha2UgYSBjb25maXJtYXRpb24gbWVzc2FnZSwgbGlrZSBjaGVja2luIGNvbmZpcm1lZFxuXG4gICAgfSlcbiAgfTtcbi8vKioqKioqKioqKioqKioqKmF0dGVtcHRpbmcgdG8gbWFrZSBmaW5kIGJ1dHRvbiAqKioqKioqKioqKioqKioqKioqKiovL1xuJHNjb3BlLmZpbmRwbyA9IGZ1bmN0aW9uIChmaW5kTnVtKSB7XG4gIGhvbWVTZXJ2aWNlLmZpbmRwbyhmaW5kTnVtKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgIC8vbWFrZSBhIGNvbmZpcm1hdGlvbiBtZXNzYWdlLCBsaWtlIGNoZWNraW4gY29uZmlybWVkXG5cbiAgfSlcbn07XG5cbi8vKioqKipnaXZlcyB2aWV3IGVtcGxveWVlX25hbWUsIHBob3RvLCBjaGVja3BvaW50X25hbWUgZm9yIHRoZSB3ZWxjb21lIG1lc3NhZ2UgaW4gaG9tZSB2aWV3IGZyb20gZGF0YWJzZSoqKioqLy9cbiAgJHNjb3BlLndlbGNvbWVBc3NldHMgPSBmdW5jdGlvbigpIHtcbiAgICAvL2NhbGwgdGhlIGZ1bmN0aW9uIHRoYXQncyBpbiBzZXJ2aWNlXG4gICAgY29uc29sZS5sb2coJ2lzIHRoaXMgb3BlcmF0aW5nPycpO1xuICAgIGhvbWVTZXJ2aWNlLndlbGNvbWVBc3NldHMoKSAvL25vdyB3ZSdyZSBjYWxsaW5nIHdlbGNvbWVBc3NldHMgaW4gdGhlIGhvbWVTZXJ2aWNlLCBmcm9tIGhvbWVDdHJsXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKCd0aGlzIGlzIG91ciByZXNwb25zZScsIHJlc3BvbnNlKVxuICAgICAgJHNjb3BlLnJlc3BvbnNlID0gcmVzcG9uc2U7XG5cbiAgICB9KVxuICB9XG4gICRzY29wZS53ZWxjb21lQXNzZXRzKCk7XG4gfSk7XG4iLCIvLyBJTklUSUxJWkUgU0VSVklDRVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5hbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uc2VydmljZSgnaG9tZVNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHApIHtcblxuLy8gQ1JVRCBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy9hZGRpbmcgcG8gbnVtYmVyIHRvIHByb2R1Y3Rpb25cbiAgdGhpcy5hZGRwbyA9IGZ1bmN0aW9uIChwb251bWJlcikge1xuICAgIHJldHVybiAkaHR0cCAoe1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6ICcvY2hlY2tpbicsXG4gICAgICBkYXRhOiB7IC8vdGhpcyBpcyB0aGUgYm9keSEgcmVxLmJvZHkgb24gdGhlIG90aGVyIHNpZGUsIHRoZSBzZXJ2ZXIgc2lkZVxuICAgICAgICBwb251bWJlcjogcG9udW1iZXIsIC8vdGhpcyBpcyBub3QgdGhhdC4gaXRzIHZhcmlhYmxlIGluIGxpbmUgNFxuICAgICAgICBjaGVja3BvaW50X2lkOiAxIC8vdGhpcyB3aWxsIHdvcmsgYXMgbG9uZyBhcyB0aGUgZmlyc3QgY2hlY2twb2ludCBpcyBuZXZlciBkZWxldGVkLiBsYXRlciBvbiwgd2UgY2FuIGZpZ3VyZSBvdXQgaG93IHRvIGZpeCB0aGF0LlxuICAgICAgfVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IC8vdGhpcyB3aWxsIHByZXR0eSBtdWNoIGJlIHRoZSBzYW1lIGZvciBhbGwgb2YgbXkgc2VydmljZSBmdW5jdGlvbnNcbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgIH0pO1xuIH07XG4gLy9hZGRpbmcgUE8jIHdoZW4gdXNlciBjbGlja3MgZmluZFxuIHRoaXMuZmluZHBvID0gZnVuY3Rpb24ocG9fbnVtYmVyKSB7XG4gICByZXR1cm4gJGh0dHAoe1xuICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgdXJsOiAnL2ZpbmQnLyosKi8sXG4gICAgIGRhdGE6IHtwb251bWJlcjogcG9fbnVtYmVyfVxuICAgIC8vICBkYXRhOiB7IC8vdGhpcyBpcyB0aGUgYm9keSEgcmVxLmJvZHkgb24gdGhlIG90aGVyIHNpZGUsIHRoZSBzZXJ2ZXIgc2lkZVxuICAgIC8vICAgIGZpbmRfcG86IGZpbmRfcG8sIC8vdGhpcyBpcyBub3QgdGhhdC4gaXRzIHZhcmlhYmxlIGluIGxpbmUgNFxuICAgIC8vICAgIC8vY2hlY2twb2ludF9pZDogMSAvL3RoaXMgd2lsbCB3b3JrIGFzIGxvbmcgYXMgdGhlIGZpcnN0IGNoZWNrcG9pbnQgaXMgbmV2ZXIgZGVsZXRlZC4gbGF0ZXIgb24sIHdlIGNhbiBmaWd1cmUgb3V0IGhvdyB0byBmaXggdGhhdC5cbiAgICAvLyAgfVxuICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7IC8vY2F0Y2hpbmcgdGhlIHJlc3BvbnNlIGZyb20gdGhlIHNlcnZlclxuICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTsgLy9yZXNwb25zZS5kYXRhIGlzIHRoZSBpbmZvIHdlIHdhbnRcbiB9KTtcbiB9O1xuLy9nZXR0aW5nIHVzZXIncyBuYW1lIHRvIGFkZCB0byB3ZWxjb21lIG1lc3NhZ2VcbiAgdGhpcy53ZWxjb21lQXNzZXRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6ICcvd2VsY29tZUFzc2V0cydcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXsgLy9jYXRjaGluZyB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyXG4gICAgICByZXR1cm4gcmVzcG9uc2U7IC8vcmVzcG9uc2UuZGF0YSBpcyB0aGUgaW5mbyB3ZSB3YW50XG4gIH0pO1xufTtcblxuXG5cblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4gICAgLmNvbnRyb2xsZXIoJ2xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAkc2NvcGUudGVzdCA9IFwibWFqb3IgdG9tIHRvIGdyb3VuZCBjb250cm9sXCI7XG4vLyoqKioqKioqKioqKioqKioqKioqKipERUxFVEUgVEhJUyBCRUZPUkUgUFJFU0VOVElORyBBTkQgSE9TVElORyoqKioqKioqKioqKioqKioqKioqKi8vXG4gIC8vICRzY29wZS51c2VyID0ge1xuICAvLyAgIG5hbWU6ICdRdWlubicsXG4gIC8vICAgcGFzc3dvcmQ6ICdxJ1xuICAvLyB9XG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbiAgICAgICAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24odXNlcikge1xuICAgICAgICAgICAgYXV0aFNlcnZpY2UubG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdVc2VyIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS51c2VyLnBhc3N3b3JkID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYocmVzcG9uc2UuZGF0YS5hZG1pbil7XG4gICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FkbWluLWhvbWUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdob21lJyk7IC8vdGFrZXMgdXMgdG8gaG9tZT8/Pz9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnVW5hYmxlIHRvIGxvZ2luJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9KTtcblxuLy9SRUZFUiBUTyBUSElTIENPREUgV0hFTiBUSU1FIFRPIFJFR0lTVEVSIEJVU0lORVNTXG4vLyAgICRzY29wZS5yZWdpc3RlciA9IGZ1bmN0aW9uKHVzZXIpIHtcbi8vICAgICAgIGF1dGhTZXJ2aWNlLnJlZ2lzdGVyVXNlcih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSkge1xuLy8gICAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gY3JlYXRlIHVzZXInKTtcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICBhbGVydCgnVXNlciBDcmVhdGVkJyk7XG4vLyAgICAgICAgICAgJHNjb3BlLm5ld1VzZXIgPSB7fTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4vLyAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gY3JlYXRlIHVzZXInKTtcbi8vICAgICAgIH0pO1xuLy8gICAgIH07XG4vLyB9KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5jb250cm9sbGVyKCdtYXBDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBtYXBTZXJ2aWNlKSB7XG5cbiAgJHNjb3BlLm1lc3NhZ2UgPSBcImhpLCBsZXRzIGRvIHRoaXNcIjtcblxuICAkc2NvcGUuZmluZHBvID0gZnVuY3Rpb24gKHRlc3RpbmcpIHtcbiAgICBtYXBTZXJ2aWNlLmZpbmRwbyh0ZXN0aW5nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgLy9tYWtlIGEgY29uZmlybWF0aW9uIG1lc3NhZ2UsIGxpa2UgY2hlY2tpbiBjb25maXJtZWRcblxuICAgIH0pXG4gIH07XG5cbi8vU1VETyBDT0RFIEZST00gQUxFWFxuLy8gJHNjb3BlLmdldEl0ID0gZnVuY3Rpb24oKXtcbiAgICAvL3JldHVybiB3aGF0IHlvdSB3YW50IGZyb20gdGhlIGRhdGFiYXNlIG9uIHNjb3BlXG4gICAgLy90aGVuIGluIHRoZSBodG1sIGJpbmQgaXQgd2l0aCBhbiBuZy1yZXBlYXQgc2ltaWxhciB0byBvdGhlciBibHVlIGRvdHNcbi8vIH0oKVxuXG4vLyQoZnVuY3Rpb24pe1xuLy8gICQoJy5jYXQnKS5jc3MoKXt9XG4vLyAgJCgpXG4vL31cblxufSk7XG4iLCIvLyBJTklUSUxJWkUgU0VSVklDRVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5hbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uc2VydmljZSgnbWFwU2VydmljZScsIGZ1bmN0aW9uKCRodHRwKSB7XG5cbi8vIENSVUQgRlVOQ1RJT05TdGVzdGluZ1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vL2ZpbmRpbmcgcG8gbnVtYmVyIGZyb20gZGF0YWJzZVxuXG4vLyBtb2RlbGluZyB0aGlzIGFmdGVyIGVkaXRTZXJ2aWNlLmpzXG4gIHRoaXMuZmluZHBvID0gZnVuY3Rpb24gKHRlc3RpbmcpIHtcbiAgICByZXR1cm4gJGh0dHAgKHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAnL2ZpbmQnLFxuICAgICAgZGF0YTogIHsgLy90aGlzIGlzIHRoZSBib2R5ISByZXEuYm9keSBvbiB0aGUgb3RoZXIgc2lkZSwgdGhlIHNlcnZlciBzaWRlXG4gICAgICAgIHRlc3Rpbmc6IHRlc3RpbmcgLy90aGlzIGlzIG5vdCB0aGF0LiBpdHMgdmFyaWFibGUgaW4gbGluZSA0XG4gICAgICAgICAvL3RoaXMgd2lsbCB3b3JrIGFzIGxvbmcgYXMgdGhlIGZpcnN0IGNoZWNrcG9pbnQgaXMgbmV2ZXIgZGVsZXRlZC4gbGF0ZXIgb24sIHdlIGNhbiBmaWd1cmUgb3V0IGhvdyB0byBmaXggdGhhdC5cbiAgICAgIH1cblxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IC8vdGhpcyB3aWxsIHByZXR0eSBtdWNoIGJlIHRoZSBzYW1lIGZvciBhbGwgb2YgbXkgc2VydmljZSBmdW5jdGlvbnNcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9KTtcbiB9O1xuICB9KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5jb250cm9sbGVyKCdyZWdpc3RlckN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbi8vXG4vLyAgICAgICAkc2NvcGUucmVnaXN0ZXIgPSBmdW5jdGlvbih1c2VyKSB7XG4vL1xuLy8gICAgICAgICAgIGF1dGhTZXJ2aWNlLmxvZ2luKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKSB7XG4vLyAgICAgICAgICAgICAgICAgICBhbGVydCgnVXNlciBkb2VzIG5vdCBleGlzdCcpO1xuLy8gICAgICAgICAgICAgICAgICAgJHNjb3BlLnVzZXIucGFzc3dvcmQgPSAnJztcbi8vICAgICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYWRtaW4taG9tZScpOyAvL3Rha2VzIHVzIHRvIGhvbWU/Pz8/XG4vLyAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbi8vICAgICAgICAgICAgICAgYWxlcnQoJ1VuYWJsZSB0byBsb2dpbicpO1xuLy8gICAgICAgICAgIH0pO1xuLy8gICAgICAgfTtcbi8vXG4vLyB9KTtcblxuJHNjb3BlLnJlZ2lzdGVyID0gZnVuY3Rpb24odXNlcikge1xuICBhdXRoU2VydmljZS5yZWdpc3RlclVzZXIodXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgIGlmICghcmVzcG9uc2UuZGF0YSkge1xuICAgICAgYWxlcnQoJ1VuYWJsZSB0byBjcmVhdGUgdXNlcicpO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZXNwb25zZS5kYXRhKXtcbiAgICAgIGFsZXJ0KCdVc2VyIENyZWF0ZWQhIFBsZWFzZSBsb2dpbi4nKTtcbiAgICAgIC8vICRzY29wZS5uZXdVc2VyID0ge307XG4gICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgfVxuICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICBhbGVydCgnVW5hYmxlIHRvIGNyZWF0ZSB1c2VyJyk7XG4gIH0pO1xufTtcbn0pO1xuIl19
