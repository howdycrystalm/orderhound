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

angular.module('orderhound')
.controller('admin-homeCtrl', ["$scope", "adminService", "user", function ($scope, adminService, user) {

  $scope.name = function(employee_name) {
    adminService.name(employee_name).then(function (response) {
    })
  }

  $scope.addpo = function (ponum) {
    adminService.addpo(ponum).then(function (response) {
      //make a confirmation message, like checkin confirmed

    })
  }

  //*****gives view employee_name, photo, checkpoint_name for the welcome message in home view from databse*****//
    $scope.welcomeAssets = function() {
      //call the function that's in service
      console.log('is this operating?');
      adminService.welcomeAssets() //now we're calling welcomeAssets in the homeService, from homeCtrl
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
                    $scope.user.password = '';
                    return alert('User does not exist'); //if something breaks, take out 'return'

                } else if (response.data.admin) {
                    $state.go('admin-home');
                } else {

                    $state.go('home');
                }
            }).catch(function(err) { //.catch gets the error that is returned
                $scope.user.password = '';
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
    }]);

angular.module('orderhound').controller('navCtrl', ["$scope", "authService", "$state", function($scope, authService, $state) {
  $scope.logout = function() {
    authService.logout().then(function(response) {
      $state.go('login');
    });
  };
}]);

angular.module('orderhound')
.directive('navDirective', function() {
  return {
    restrict: 'AE',
    templateUrl: './app/js/directives/nav/navTmpl.html',
    controller: 'navCtrl'
  }
})

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInNlcnZpY2VzL2F1dGhTZXJ2aWNlLmpzIiwic2VydmljZXMvdXNlclNlcnZpY2UuanMiLCJqcy9yb3V0ZXJzLmpzIiwic3RhdGVzL2FkbWluLWhvbWUvYWRtaW4taG9tZUN0cmwuanMiLCJzdGF0ZXMvYWRtaW4taG9tZS9hZG1pblNlcnZpY2UuanMiLCJzdGF0ZXMvZWRpdC9lZGl0Q3RybC5qcyIsInN0YXRlcy9lZGl0L2VkaXRTZXJ2aWNlLmpzIiwic3RhdGVzL2hvbWUvaG9tZUN0cmwuanMiLCJzdGF0ZXMvaG9tZS9ob21lU2VydmljZS5qcyIsInN0YXRlcy9sb2dpbi9sb2dpbkN0cmwuanMiLCJzdGF0ZXMvbWFwL21hcEN0cmwuanMiLCJzdGF0ZXMvbWFwL21hcFNlcnZpY2UuanMiLCJzdGF0ZXMvcmVnaXN0ZXIvcmVnaXN0ZXJDdHJsLmpzIiwianMvZGlyZWN0aXZlcy9uYXYvbmF2Q3RybC5qcyIsImpzL2RpcmVjdGl2ZXMvbmF2L25hdkRpcmVjdGl2ZS5qcyIsImpzL2RpcmVjdGl2ZXMvbmF2L25hdlNjcmlwdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLGVBQWUsQ0FBQztBQUMvQjtBQ0RBLFFBQVEsT0FBTyxjQUFjLFFBQVEseUJBQWUsU0FBUyxPQUFPOztJQUVoRSxLQUFLLFFBQVEsU0FBUyxNQUFNO1FBQ3hCLE9BQU8sTUFBTTtZQUNULFFBQVE7WUFDUixLQUFLO1lBQ0wsTUFBTTtXQUNQLEtBQUssU0FBUyxVQUFVO1lBQ3ZCLE9BQU87Ozs7SUFJZixLQUFLLFNBQVMsV0FBVztRQUNyQixPQUFPLE1BQU07WUFDVCxRQUFRO1lBQ1IsS0FBSztXQUNOLEtBQUssU0FBUyxVQUFVO1lBQ3ZCLE9BQU87Ozs7SUFJZixLQUFLLGlCQUFpQixXQUFXO1FBQzdCLE9BQU8sTUFBTTtZQUNULFFBQVE7WUFDUixLQUFLO1dBQ04sS0FBSyxTQUFTLFVBQVU7WUFDdkIsT0FBTzs7OztJQUlmLEtBQUssZUFBZSxT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QkFDbkQsSUFBSSxDQUFDLFNBQVMsTUFBTTtvQkFDaEIsT0FBTyxLQUFLLFdBQVc7b0JBQ3ZCLE9BQU8sTUFBTTt1QkFDVixJQUFJLFNBQVMsTUFBTTtvQkFDdEIsTUFBTTs7b0JBRU4sT0FBTyxHQUFHOztlQUVmLE1BQU0sU0FBUyxLQUFLO2dCQUNuQixPQUFPLEtBQUssV0FBVztnQkFDdkIsTUFBTTs7OztBQUl0QjtBQ25DQSxRQUFRLE9BQU8sY0FBYyxXQUFXLCtDQUFXLFNBQVMsUUFBUSxhQUFhLFFBQVE7RUFDdkYsT0FBTyxTQUFTLFdBQVc7SUFDekIsWUFBWSxTQUFTLEtBQUssU0FBUyxVQUFVO01BQzNDLE9BQU8sR0FBRzs7OztBQUloQjtBQ1BBLFFBQVEsT0FBTztDQUNkLFVBQVUsZ0JBQWdCLFdBQVc7RUFDcEMsT0FBTztJQUNMLFVBQVU7SUFDVixhQUFhO0lBQ2IsWUFBWTs7O0FBR2hCO0FDUkEsU0FBUyxVQUFVO0lBQ2YsU0FBUyxlQUFlLGFBQWEsTUFBTSxRQUFROzs7QUFHdkQsU0FBUyxXQUFXO0lBQ2hCLFNBQVMsZUFBZSxhQUFhLE1BQU0sUUFBUTs7QUFFdkQiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnLCAgWyd1aS5yb3V0ZXInXSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpLnNlcnZpY2UoXCJhdXRoU2VydmljZVwiLCBmdW5jdGlvbigkaHR0cCkge1xuXG4gICAgdGhpcy5sb2dpbiA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgIGRhdGE6IHVzZXJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5sb2dvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6ICcvbG9nb3V0J1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmdldEN1cnJlbnRVc2VyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiAnL2hvbWUnXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcbi8vZ29vZCB0byBnb1xuICAgIHRoaXMucmVnaXN0ZXJVc2VyID0gZnVuY3Rpb24odXNlcikge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6ICcvcmVnaXN0ZXInLFxuICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgdGhpcy5nZXR0ZXIgPSBmdW5jdGlvbihhZGRVc2VyKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJy9hZGRVc2VyJyxcbiAgICAgICAgICAgIGRhdGE6IHVzZXJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5lZGl0VXNlciA9IGZ1bmN0aW9uKGlkLCB1c2VyKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgdXJsOiBcIi91c2VyL1wiICsgaWQsXG4gICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKS5zZXJ2aWNlKFwidXNlclNlcnZpY2VcIiwgZnVuY3Rpb24oJGh0dHApIHtcblxuICAgIHRoaXMuZ2V0VXNlcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6ICcvdXNlcidcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuLy9hbSBpIHVzaW5nIGxpbmUgMTIgZnVuY3Rpb24/Pz8/P1xuICAgIHRoaXMuZ2V0VXNlciA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiAnL3VzZXI/X2lkPScgKyBpZFxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBOb3QgTmVlZGVkXG4gICAgLy9cbiAgICAvLyB0aGlzLmRlbGV0ZVVzZXIgPSBmdW5jdGlvbihpZCkge1xuICAgIC8vICAgcmV0dXJuICRodHRwKHtcbiAgICAvLyAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAvLyAgICAgdXJsOiAnL3VzZXIvJyArIGlkXG4gICAgLy8gICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgLy8gICAgIHJldHVybiByZXNwb25zZTtcbiAgICAvLyAgIH0pO1xuICAgIC8vIH07XG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbiAgICAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJylcblxuICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgLnN0YXRlKCdsb2dpbicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdsb2dpbkN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0YXRlcy9sb2dpbi9sb2dpbi5odG1sJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnaG9tZUN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0YXRlcy9ob21lL2hvbWUuaHRtbCcsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICB3ZWxjb21lQXNzZXRzOiBmdW5jdGlvbihob21lU2VydmljZSkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBob21lU2VydmljZS53ZWxjb21lQXNzZXRzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IGZ1bmN0aW9uKGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdXRoU2VydmljZS5nZXRDdXJyZW50VXNlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgncmVnaXN0ZXInLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3JlZ2lzdGVyJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncmVnaXN0ZXJDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvcmVnaXN0ZXIvcmVnaXN0ZXIuaHRtbCcsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdhZG1pbi1ob21lJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9hZG1pbi1ob21lJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnYWRtaW4taG9tZUN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0YXRlcy9hZG1pbi1ob21lL2FkbWluLWhvbWUuaHRtbCcsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICB1c2VyOiBmdW5jdGlvbihhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXV0aFNlcnZpY2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2VkaXQnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2VkaXQnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdlZGl0Q3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL2VkaXQvZWRpdC5odG1sJyxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrcG9pbnRzOiBmdW5jdGlvbihlZGl0U2VydmljZSkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlZGl0U2VydmljZS5jaGVja3BvaW50cygpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB1c2VyOiBmdW5jdGlvbihhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXV0aFNlcnZpY2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnbWFwJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9tYXAnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYXBDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvbWFwL21hcC5odG1sJyxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGZpbmRwbzogZnVuY3Rpb24oaG9tZVNlcnZpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICByZXR1cm4gbWFwU2VydmljZS5maW5kcG8oKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogZnVuY3Rpb24oYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF1dGhTZXJ2aWNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uY29udHJvbGxlcignYWRtaW4taG9tZUN0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCBhZG1pblNlcnZpY2UsIHVzZXIpIHtcblxuICAkc2NvcGUubmFtZSA9IGZ1bmN0aW9uKGVtcGxveWVlX25hbWUpIHtcbiAgICBhZG1pblNlcnZpY2UubmFtZShlbXBsb3llZV9uYW1lKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgIH0pXG4gIH1cblxuICAkc2NvcGUuYWRkcG8gPSBmdW5jdGlvbiAocG9udW0pIHtcbiAgICBhZG1pblNlcnZpY2UuYWRkcG8ocG9udW0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAvL21ha2UgYSBjb25maXJtYXRpb24gbWVzc2FnZSwgbGlrZSBjaGVja2luIGNvbmZpcm1lZFxuXG4gICAgfSlcbiAgfVxuXG4gIC8vKioqKipnaXZlcyB2aWV3IGVtcGxveWVlX25hbWUsIHBob3RvLCBjaGVja3BvaW50X25hbWUgZm9yIHRoZSB3ZWxjb21lIG1lc3NhZ2UgaW4gaG9tZSB2aWV3IGZyb20gZGF0YWJzZSoqKioqLy9cbiAgICAkc2NvcGUud2VsY29tZUFzc2V0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy9jYWxsIHRoZSBmdW5jdGlvbiB0aGF0J3MgaW4gc2VydmljZVxuICAgICAgY29uc29sZS5sb2coJ2lzIHRoaXMgb3BlcmF0aW5nPycpO1xuICAgICAgYWRtaW5TZXJ2aWNlLndlbGNvbWVBc3NldHMoKSAvL25vdyB3ZSdyZSBjYWxsaW5nIHdlbGNvbWVBc3NldHMgaW4gdGhlIGhvbWVTZXJ2aWNlLCBmcm9tIGhvbWVDdHJsXG4gICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBjb25zb2xlLmxvZygndGhpcyBpcyBvdXIgcmVzcG9uc2UnLCByZXNwb25zZSlcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YVsxXS5lbXBsb3llZV9uYW1lICsgXCIgSEVMTExMTExMT09PT1wiKTtcbiAgICAgICAgJHNjb3BlLnJlc3BvbnNlID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgfSlcbiAgICB9XG4gICAgJHNjb3BlLndlbGNvbWVBc3NldHMoKTtcbiAgIH0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLnNlcnZpY2UoJ2FkbWluU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCkge1xuXG4gIHRoaXMuYWRkcG8gPSBmdW5jdGlvbiAocG9udW1iZXIpIHtcbiAgICByZXR1cm4gJGh0dHAgKHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAnL2NoZWNraW4nLFxuICAgICAgZGF0YTogeyAvL3RoaXMgaXMgdGhlIGJvZHkhIHJlcS5ib2R5IG9uIHRoZSBvdGhlciBzaWRlLCB0aGUgc2VydmVyIHNpZGVcbiAgICAgICAgcG9udW1iZXI6IHBvbnVtYmVyLCAvL3RoaXMgaXMgbm90IHRoYXQuIGl0cyB2YXJpYWJsZSBpbiBsaW5lIDRcbiAgICAgICAgY2hlY2twb2ludF9pZDogMVxuICAgICAgfVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IC8vdGhpcyB3aWxsIHByZXR0eSBtdWNoIGJlIHRoZSBzYW1lIGZvciBhbGwgb2YgbXkgc2VydmljZSBmdW5jdGlvbnNcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgfSlcbiB9O1xuXG4gdGhpcy53ZWxjb21lQXNzZXRzID0gZnVuY3Rpb24oKSB7XG4gICByZXR1cm4gJGh0dHAoe1xuICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICB1cmw6ICcvd2VsY29tZUFzc2V0cydcbiAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpeyAvL2NhdGNoaW5nIHRoZSByZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXJcbiAgICAgcmV0dXJuIHJlc3BvbnNlOyAvL3Jlc3BvbnNlLmRhdGEgaXMgdGhlIGluZm8gd2Ugd2FudFxuIH0pO1xufTtcblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uY29udHJvbGxlcignZWRpdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIGVkaXRTZXJ2aWNlLCAkc3RhdGUsIGNoZWNrcG9pbnRzLCBhdXRoU2VydmljZSkge1xuICAgICRzY29wZS5vYmogPSB7fTsvL2RvIGkgbmVlZCB0aGlzIHN0aWxsPz8/P1xuXG4gICAgJHNjb3BlLmdldHRlciA9IGZ1bmN0aW9uKGFkZFVzZXIpe1xuICAgICAgZWRpdFNlcnZpY2UuYWRkVXNlcihhZGRVc2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIC8vZXZlcnl0aGluZyB0aGF0IGhhcHBlbnMgQUZURVIgZ29lcyBoZXJlLCBsaWtlIGNsZWFyIGZvcm0sICRzdGF0ZS5nb1xuICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpIHtcbiAgICAgICAgICBhbGVydCgnVW5hYmxlIHRvIGNyZWF0ZSB1c2VyJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVzcG9uc2UuZGF0YSl7XG4gICAgICAgICAgYWxlcnQoJ1VzZXIgQ3JlYXRlZCEnKTtcbiAgICAgICAgICAkc3RhdGUucmVsb2FkKCdlZGl0Jyk7XG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICBhbGVydCgnVW5hYmxlIHRvIGNyZWF0ZSB1c2VyJyk7XG4gICAgICB9KTtcbiAgICB9O1xuXG5cbi8vKioqKioqKioqKioqKioqKiphZGRpbmcgZG90cyB0byBtYXAgaW4gZWRpdCB2aWV3KioqKioqKioqKioqKioqKioqKi8vXG4gICAgJHNjb3BlLmNoZWNrcG9pbnRzID0gY2hlY2twb2ludHM7XG4gICAgY29uc29sZS5sb2coJHNjb3BlLmNoZWNrcG9pbnRzKTtcblxuLyogRVhBTVBMRVxuYW5ndWxhci5tb2R1bGUoJ3N0YXJXYXJzQXBwJylcbi5jb250cm9sbGVyKCdtYWluQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgc3RhcldhcnNTZXJ2aWNlKSB7XG4gIHN0YXJXYXJzU2VydmljZS5nZXRQZW9wbGUoKSAvL3RoaXMgaXMgdGhlIHByb21pc2VcbiAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHsgLy8udGhlbiBjYWxsYmFjayBmdW5jdGlvbiByZXByZXNlbnRzIG91ciBkYXRhLCB3aGljaCBpcyB0aGUgZ2V0UGVvcGxlIGZ1bmN0aW9uIGluIHN0YXJXYXJzU2VydmljZS4gYWxzbywgcmVzcG9uc2UgaXMganVzdCBhIGNvbW1vbiBwYXJhbWV0ZXIgbmFtZSwgY2FuIGJlIG5hbWVkIGFueXRoaW5nLCBidXQgdXNlIHJlc3BvbnNlLlxuICAgICRzY29wZS5wZW9wbGUgPSByZXNwb25zZS5kYXRhLnJlc3VsdHM7IC8vdGhlIHJldHVybmVkIHByb21pc2UgaXMgZGF0YSBmcm9tIHJlc3BvbnNlLmRhdGEucmVzdWx0cy4gbm93IHJlc3BvbnNlLmRhdGEucmVzdWx0cyBpcyBsaWtlIGEgZmlsZXBhdGggZm91bmQgaW4gdGhlIG9iamVjdCB0aGF0IGlzIHJldHJlaXZlZCBmcm9tIFN3YXBpLmNvLiBpIGNhbiBzZWUgb2JqZWN0IHN0cnVjdHVyZSBpZiBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gIH0pXG59KVxuKi9cblxufSk7XG4iLCIvLyBJTklUSUxJWkUgU0VSVklDRVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5hbmd1bGFyLm1vZHVsZShcIm9yZGVyaG91bmRcIikuc2VydmljZShcImVkaXRTZXJ2aWNlXCIsIGZ1bmN0aW9uKCRodHRwKSB7XG5cbiAgLy8gQ1JVRCBGVU5DVElPTlNcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbnRoaXMuYWRkVXNlciA9IGZ1bmN0aW9uKGFkZFVzZXIpIHtcbiAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgdXJsOiAnL2FkZFVzZXInLFxuICAgICAgICAgIGRhdGE6IGFkZFVzZXJcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9KTtcbiAgfTtcbiAgLy8qKioqKioqKioqKmFkZGluZyBkb3RzIHRvIGltYWdlIG9mIG1hcCBpbiBlZGl0IHZpZXcqKioqKioqKioqKi8vXG4gIHRoaXMuY2hlY2twb2ludHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHVybDogJy9jaGVja3BvaW50cycsXG4gICAgICAvL2RhdGE6IGNoZWNrcG9pbnRzXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICB9KTtcbiAgfTtcblxuIH0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLmNvbnRyb2xsZXIoJ2hvbWVDdHJsJywgZnVuY3Rpb24gKCRzY29wZSwgaG9tZVNlcnZpY2UsIHVzZXIpIHtcblxuICAkc2NvcGUudGVzdCA9IGhvbWVTZXJ2aWNlLm1lc3NhZ2U7XG5cbiAgJHNjb3BlLmFkZHBvID0gZnVuY3Rpb24gKHBvbnVtKSB7XG4gICAgaG9tZVNlcnZpY2UuYWRkcG8ocG9udW0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAvL21ha2UgYSBjb25maXJtYXRpb24gbWVzc2FnZSwgbGlrZSBjaGVja2luIGNvbmZpcm1lZFxuXG4gICAgfSlcbiAgfTtcbi8vKioqKioqKioqKioqKioqKmF0dGVtcHRpbmcgdG8gbWFrZSBmaW5kIGJ1dHRvbiAqKioqKioqKioqKioqKioqKioqKiovL1xuJHNjb3BlLmZpbmRwbyA9IGZ1bmN0aW9uIChmaW5kTnVtKSB7XG4gIGhvbWVTZXJ2aWNlLmZpbmRwbyhmaW5kTnVtKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgIC8vbWFrZSBhIGNvbmZpcm1hdGlvbiBtZXNzYWdlLCBsaWtlIGNoZWNraW4gY29uZmlybWVkXG5cbiAgfSlcbn07XG5cbi8vKioqKipnaXZlcyB2aWV3IGVtcGxveWVlX25hbWUsIHBob3RvLCBjaGVja3BvaW50X25hbWUgZm9yIHRoZSB3ZWxjb21lIG1lc3NhZ2UgaW4gaG9tZSB2aWV3IGZyb20gZGF0YWJzZSoqKioqLy9cbiAgJHNjb3BlLndlbGNvbWVBc3NldHMgPSBmdW5jdGlvbigpIHtcbiAgICAvL2NhbGwgdGhlIGZ1bmN0aW9uIHRoYXQncyBpbiBzZXJ2aWNlXG4gICAgY29uc29sZS5sb2coJ2lzIHRoaXMgb3BlcmF0aW5nPycpO1xuICAgIGhvbWVTZXJ2aWNlLndlbGNvbWVBc3NldHMoKSAvL25vdyB3ZSdyZSBjYWxsaW5nIHdlbGNvbWVBc3NldHMgaW4gdGhlIGhvbWVTZXJ2aWNlLCBmcm9tIGhvbWVDdHJsXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKCd0aGlzIGlzIG91ciByZXNwb25zZScsIHJlc3BvbnNlKVxuICAgICAgJHNjb3BlLnJlc3BvbnNlID0gcmVzcG9uc2U7XG5cbiAgICB9KVxuICB9XG4gICRzY29wZS53ZWxjb21lQXNzZXRzKCk7XG4gfSk7XG4iLCIvLyBJTklUSUxJWkUgU0VSVklDRVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5hbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uc2VydmljZSgnaG9tZVNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHApIHtcblxuLy8gQ1JVRCBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy9hZGRpbmcgcG8gbnVtYmVyIHRvIHByb2R1Y3Rpb25cbiAgdGhpcy5hZGRwbyA9IGZ1bmN0aW9uIChwb251bWJlcikge1xuICAgIHJldHVybiAkaHR0cCAoe1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6ICcvY2hlY2tpbicsXG4gICAgICBkYXRhOiB7IC8vdGhpcyBpcyB0aGUgYm9keSEgcmVxLmJvZHkgb24gdGhlIG90aGVyIHNpZGUsIHRoZSBzZXJ2ZXIgc2lkZVxuICAgICAgICBwb251bWJlcjogcG9udW1iZXIsIC8vdGhpcyBpcyBub3QgdGhhdC4gaXRzIHZhcmlhYmxlIGluIGxpbmUgNFxuICAgICAgICBjaGVja3BvaW50X2lkOiAxIC8vdGhpcyB3aWxsIHdvcmsgYXMgbG9uZyBhcyB0aGUgZmlyc3QgY2hlY2twb2ludCBpcyBuZXZlciBkZWxldGVkLiBsYXRlciBvbiwgd2UgY2FuIGZpZ3VyZSBvdXQgaG93IHRvIGZpeCB0aGF0LlxuICAgICAgfVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IC8vdGhpcyB3aWxsIHByZXR0eSBtdWNoIGJlIHRoZSBzYW1lIGZvciBhbGwgb2YgbXkgc2VydmljZSBmdW5jdGlvbnNcbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgIH0pO1xuIH07XG4gLy9hZGRpbmcgUE8jIHdoZW4gdXNlciBjbGlja3MgZmluZFxuIHRoaXMuZmluZHBvID0gZnVuY3Rpb24ocG9fbnVtYmVyKSB7XG4gICByZXR1cm4gJGh0dHAoe1xuICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgdXJsOiAnL2ZpbmQnLyosKi8sXG4gICAgIGRhdGE6IHtwb251bWJlcjogcG9fbnVtYmVyfVxuICAgIC8vICBkYXRhOiB7IC8vdGhpcyBpcyB0aGUgYm9keSEgcmVxLmJvZHkgb24gdGhlIG90aGVyIHNpZGUsIHRoZSBzZXJ2ZXIgc2lkZVxuICAgIC8vICAgIGZpbmRfcG86IGZpbmRfcG8sIC8vdGhpcyBpcyBub3QgdGhhdC4gaXRzIHZhcmlhYmxlIGluIGxpbmUgNFxuICAgIC8vICAgIC8vY2hlY2twb2ludF9pZDogMSAvL3RoaXMgd2lsbCB3b3JrIGFzIGxvbmcgYXMgdGhlIGZpcnN0IGNoZWNrcG9pbnQgaXMgbmV2ZXIgZGVsZXRlZC4gbGF0ZXIgb24sIHdlIGNhbiBmaWd1cmUgb3V0IGhvdyB0byBmaXggdGhhdC5cbiAgICAvLyAgfVxuICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7IC8vY2F0Y2hpbmcgdGhlIHJlc3BvbnNlIGZyb20gdGhlIHNlcnZlclxuICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTsgLy9yZXNwb25zZS5kYXRhIGlzIHRoZSBpbmZvIHdlIHdhbnRcbiB9KTtcbiB9O1xuLy9nZXR0aW5nIHVzZXIncyBuYW1lIHRvIGFkZCB0byB3ZWxjb21lIG1lc3NhZ2VcbiAgdGhpcy53ZWxjb21lQXNzZXRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6ICcvd2VsY29tZUFzc2V0cydcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXsgLy9jYXRjaGluZyB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyXG4gICAgICByZXR1cm4gcmVzcG9uc2U7IC8vcmVzcG9uc2UuZGF0YSBpcyB0aGUgaW5mbyB3ZSB3YW50XG4gIH0pO1xufTtcblxuXG5cblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4gICAgLmNvbnRyb2xsZXIoJ2xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAkc2NvcGUudGVzdCA9IFwibWFqb3IgdG9tIHRvIGdyb3VuZCBjb250cm9sXCI7XG4gICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKkRFTEVURSBUSElTIEJFRk9SRSBQUkVTRU5USU5HIEFORCBIT1NUSU5HKioqKioqKioqKioqKioqKioqKioqLy9cbiAgICAgICAgLy8gJHNjb3BlLnVzZXIgPSB7XG4gICAgICAgIC8vICAgbmFtZTogJ1F1aW5uJyxcbiAgICAgICAgLy8gICBwYXNzd29yZDogJ3EnXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXG4gICAgICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICAgICAgIGF1dGhTZXJ2aWNlLmxvZ2luKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcblxuICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudXNlci5wYXNzd29yZCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWxlcnQoJ1VzZXIgZG9lcyBub3QgZXhpc3QnKTsgLy9pZiBzb21ldGhpbmcgYnJlYWtzLCB0YWtlIG91dCAncmV0dXJuJ1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5kYXRhLmFkbWluKSB7XG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYWRtaW4taG9tZScpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdob21lJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7IC8vLmNhdGNoIGdldHMgdGhlIGVycm9yIHRoYXQgaXMgcmV0dXJuZWRcbiAgICAgICAgICAgICAgICAkc2NvcGUudXNlci5wYXNzd29yZCA9ICcnO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gbG9naW4nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH0pO1xuXG4vL1JFRkVSIFRPIFRISVMgQ09ERSBXSEVOIFRJTUUgVE8gUkVHSVNURVIgQlVTSU5FU1Ncbi8vICAgJHNjb3BlLnJlZ2lzdGVyID0gZnVuY3Rpb24odXNlcikge1xuLy8gICAgICAgYXV0aFNlcnZpY2UucmVnaXN0ZXJVc2VyKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKSB7XG4vLyAgICAgICAgICAgYWxlcnQoJ1VuYWJsZSB0byBjcmVhdGUgdXNlcicpO1xuLy8gICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgIGFsZXJ0KCdVc2VyIENyZWF0ZWQnKTtcbi8vICAgICAgICAgICAkc2NvcGUubmV3VXNlciA9IHt9O1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbi8vICAgICAgICAgYWxlcnQoJ1VuYWJsZSB0byBjcmVhdGUgdXNlcicpO1xuLy8gICAgICAgfSk7XG4vLyAgICAgfTtcbi8vIH0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLmNvbnRyb2xsZXIoJ21hcEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIG1hcFNlcnZpY2UpIHtcblxuICAkc2NvcGUubWVzc2FnZSA9IFwiaGksIGxldHMgZG8gdGhpc1wiO1xuXG4gICRzY29wZS5maW5kcG8gPSBmdW5jdGlvbiAodGVzdGluZykge1xuICAgIG1hcFNlcnZpY2UuZmluZHBvKHRlc3RpbmcpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAvL21ha2UgYSBjb25maXJtYXRpb24gbWVzc2FnZSwgbGlrZSBjaGVja2luIGNvbmZpcm1lZFxuXG4gICAgfSlcbiAgfTtcblxuLy9TVURPIENPREUgRlJPTSBBTEVYXG4vLyAkc2NvcGUuZ2V0SXQgPSBmdW5jdGlvbigpe1xuICAgIC8vcmV0dXJuIHdoYXQgeW91IHdhbnQgZnJvbSB0aGUgZGF0YWJhc2Ugb24gc2NvcGVcbiAgICAvL3RoZW4gaW4gdGhlIGh0bWwgYmluZCBpdCB3aXRoIGFuIG5nLXJlcGVhdCBzaW1pbGFyIHRvIG90aGVyIGJsdWUgZG90c1xuLy8gfSgpXG5cbi8vJChmdW5jdGlvbil7XG4vLyAgJCgnLmNhdCcpLmNzcygpe31cbi8vICAkKClcbi8vfVxuXG59KTtcbiIsIi8vIElOSVRJTElaRSBTRVJWSUNFXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5zZXJ2aWNlKCdtYXBTZXJ2aWNlJywgZnVuY3Rpb24oJGh0dHApIHtcblxuLy8gQ1JVRCBGVU5DVElPTlN0ZXN0aW5nXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vZmluZGluZyBwbyBudW1iZXIgZnJvbSBkYXRhYnNlXG5cbi8vIG1vZGVsaW5nIHRoaXMgYWZ0ZXIgZWRpdFNlcnZpY2UuanNcbiAgdGhpcy5maW5kcG8gPSBmdW5jdGlvbiAodGVzdGluZykge1xuICAgIHJldHVybiAkaHR0cCAoe1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6ICcvZmluZCcsXG4gICAgICBkYXRhOiAgeyAvL3RoaXMgaXMgdGhlIGJvZHkhIHJlcS5ib2R5IG9uIHRoZSBvdGhlciBzaWRlLCB0aGUgc2VydmVyIHNpZGVcbiAgICAgICAgdGVzdGluZzogdGVzdGluZyAvL3RoaXMgaXMgbm90IHRoYXQuIGl0cyB2YXJpYWJsZSBpbiBsaW5lIDRcbiAgICAgICAgIC8vdGhpcyB3aWxsIHdvcmsgYXMgbG9uZyBhcyB0aGUgZmlyc3QgY2hlY2twb2ludCBpcyBuZXZlciBkZWxldGVkLiBsYXRlciBvbiwgd2UgY2FuIGZpZ3VyZSBvdXQgaG93IHRvIGZpeCB0aGF0LlxuICAgICAgfVxuXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgLy90aGlzIHdpbGwgcHJldHR5IG11Y2ggYmUgdGhlIHNhbWUgZm9yIGFsbCBvZiBteSBzZXJ2aWNlIGZ1bmN0aW9uc1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0pO1xuIH07XG4gIH0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuICAgIC5jb250cm9sbGVyKCdyZWdpc3RlckN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgJHNjb3BlLnJlZ2lzdGVyID0gZnVuY3Rpb24odXNlcikge1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICAgICAgYXV0aFNlcnZpY2UubG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICBhbGVydCgnVXNlciBkb2VzIG5vdCBleGlzdCcpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAkc2NvcGUudXNlci5wYXNzd29yZCA9ICcnO1xuICAgICAgICAvLyAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYWRtaW4taG9tZScpOyAvL3Rha2VzIHVzIHRvIGhvbWU/Pz8/XG4gICAgICAgIC8vICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgYWxlcnQoJ1VuYWJsZSB0byBsb2dpbicpO1xuICAgICAgICAvLyAgICAgICAgICAgfSk7XG4gICAgICAgIC8vICAgICAgIH07XG4gICAgICAgIC8vXG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgICRzY29wZS5yZWdpc3RlciA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICAgICAgIGF1dGhTZXJ2aWNlLnJlZ2lzdGVyVXNlcih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS51c2VyLnBhc3N3b3JkID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhbGVydCgnVW5hYmxlIHRvIGNyZWF0ZSB1c2VyJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdVc2VyIENyZWF0ZWQhIFBsZWFzZSBsb2dpbi4nKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gJHNjb3BlLm5ld1VzZXIgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICRzY29wZS51c2VyLnBhc3N3b3JkID0gJyc7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1VuYWJsZSB0byBjcmVhdGUgdXNlcicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpLmNvbnRyb2xsZXIoJ25hdkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbiAgJHNjb3BlLmxvZ291dCA9IGZ1bmN0aW9uKCkge1xuICAgIGF1dGhTZXJ2aWNlLmxvZ291dCgpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICB9KTtcbiAgfTtcbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLmRpcmVjdGl2ZSgnbmF2RGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBRScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9qcy9kaXJlY3RpdmVzL25hdi9uYXZUbXBsLmh0bWwnLFxuICAgIGNvbnRyb2xsZXI6ICduYXZDdHJsJ1xuICB9XG59KVxuIiwiZnVuY3Rpb24gb3Blbk5hdigpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15U2lkZW5hdlwiKS5zdHlsZS53aWR0aCA9IFwiMjUwcHhcIjtcbn1cblxuZnVuY3Rpb24gY2xvc2VOYXYoKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteVNpZGVuYXZcIikuc3R5bGUud2lkdGggPSBcIjBcIjtcbn1cbiJdfQ==
