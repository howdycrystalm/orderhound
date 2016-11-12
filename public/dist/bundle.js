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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInNlcnZpY2VzL2F1dGhTZXJ2aWNlLmpzIiwic2VydmljZXMvdXNlclNlcnZpY2UuanMiLCJqcy9yb3V0ZXJzLmpzIiwic3RhdGVzL2FkbWluLWhvbWUvYWRtaW4taG9tZUN0cmwuanMiLCJzdGF0ZXMvYWRtaW4taG9tZS9hZG1pblNlcnZpY2UuanMiLCJzdGF0ZXMvZWRpdC9lZGl0Q3RybC5qcyIsInN0YXRlcy9lZGl0L2VkaXRTZXJ2aWNlLmpzIiwic3RhdGVzL2hvbWUvaG9tZUN0cmwuanMiLCJzdGF0ZXMvaG9tZS9ob21lU2VydmljZS5qcyIsInN0YXRlcy9sb2dpbi9sb2dpbkN0cmwuanMiLCJzdGF0ZXMvbWFwL21hcEN0cmwuanMiLCJzdGF0ZXMvcmVnaXN0ZXIvcmVnaXN0ZXJDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxlQUFlLENBQUM7QUFDL0I7QUNEQSxRQUFRLE9BQU8sY0FBYyxRQUFRLHlCQUFlLFNBQVMsT0FBTzs7SUFFaEUsS0FBSyxRQUFRLFNBQVMsTUFBTTtRQUN4QixPQUFPLE1BQU07WUFDVCxRQUFRO1lBQ1IsS0FBSztZQUNMLE1BQU07V0FDUCxLQUFLLFNBQVMsVUFBVTtZQUN2QixPQUFPOzs7O0lBSWYsS0FBSyxTQUFTLFdBQVc7UUFDckIsT0FBTyxNQUFNO1lBQ1QsUUFBUTtZQUNSLEtBQUs7V0FDTixLQUFLLFNBQVMsVUFBVTtZQUN2QixPQUFPOzs7O0lBSWYsS0FBSyxpQkFBaUIsV0FBVztRQUM3QixPQUFPLE1BQU07WUFDVCxRQUFRO1lBQ1IsS0FBSztXQUNOLEtBQUssU0FBUyxVQUFVO1lBQ3ZCLE9BQU87Ozs7SUFJZixLQUFLLGVBQWUsU0FBUyxNQUFNO1FBQy9CLE9BQU8sTUFBTTtZQUNULFFBQVE7WUFDUixLQUFLO1lBQ0wsTUFBTTtXQUNQLEtBQUssU0FBUyxVQUFVO1lBQ3ZCLE9BQU87OztJQUdmLEtBQUssU0FBUyxTQUFTLFNBQVM7UUFDNUIsT0FBTyxNQUFN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QUFNLE1BQU0sS0FBSyxTQUFTLFVBQVU7O2dCQUU1QyxJQUFJLENBQUMsU0FBUyxNQUFNO29CQUNoQixNQUFNO29CQUNOLE9BQU8sS0FBSyxXQUFXOztxQkFFdEIsR0FBRyxTQUFTLEtBQUssTUFBTTtrQkFDMUIsT0FBTyxHQUFHOztxQkFFUDs7b0JBRUQsT0FBTyxHQUFHOztlQUVmLE1BQU0sU0FBUyxLQUFLO2dCQUNuQixNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJ0QjtBQzVDQSxRQUFRLE9BQU87Q0FDZCxXQUFXLHNCQUFXLFNBQVMsUUFBUTs7OztBQUl4QztBQ0xBLFFBQVEsT0FBTztDQUNkLFdBQVcsb0RBQWdCLFNBQVMsUUFBUSxhQUFhLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCbEUsT0FBTyxXQUFXLFNBQVMsTUFBTTs7RUFFL0IsWUFBWSxhQUFhLE1BQU0sS0FBSyxTQUFTLFVBQVU7SUFDckQsSUFBSSxDQUFDLFNBQVMsTUFBTTtNQUNsQixNQUFNOztTQUVILElBQUksU0FBUyxLQUFLO01BQ3JCLE1BQU07TUFDTixPQUFPLFVBQVU7TUFDakIsT0FBTyxHQUFHOztLQUVYLE1BQU0sU0FBUyxLQUFLO0lBQ3JCLE1BQU07Ozs7QUFJViIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcsICBbJ3VpLnJvdXRlciddKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJykuc2VydmljZShcImF1dGhTZXJ2aWNlXCIsIGZ1bmN0aW9uKCRodHRwKSB7XG5cbiAgICB0aGlzLmxvZ2luID0gZnVuY3Rpb24odXNlcikge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmxvZ291dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy9sb2dvdXQnXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Q3VycmVudFVzZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6ICcvaG9tZSdcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuLy9nb29kIHRvIGdvXG4gICAgdGhpcy5yZWdpc3RlclVzZXIgPSBmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJy9yZWdpc3RlcicsXG4gICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB0aGlzLmdldHRlciA9IGZ1bmN0aW9uKGFkZFVzZXIpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiAnL2FkZFVzZXInLFxuICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmVkaXRVc2VyID0gZnVuY3Rpb24oaWQsIHVzZXIpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICB1cmw6IFwiL3VzZXIvXCIgKyBpZCxcbiAgICAgICAgICAgIGRhdGE6IHVzZXJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpLnNlcnZpY2UoXCJ1c2VyU2VydmljZVwiLCBmdW5jdGlvbigkaHR0cCkge1xuXG4gICAgdGhpcy5nZXRVc2VycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy91c2VyJ1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmdldFVzZXIgPSBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy91c2VyP19pZD0nICsgaWRcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gTm90IE5lZWRlZFxuICAgIC8vXG4gICAgLy8gdGhpcy5kZWxldGVVc2VyID0gZnVuY3Rpb24oaWQpIHtcbiAgICAvLyAgIHJldHVybiAkaHR0cCh7XG4gICAgLy8gICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgLy8gICAgIHVybDogJy91c2VyLycgKyBpZFxuICAgIC8vICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgIC8vICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgLy8gICB9KTtcbiAgICAvLyB9O1xufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4gICAgLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpXG5cbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgICAgIC5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbG9naW5DdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvbG9naW4vbG9naW4uaHRtbCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogZnVuY3Rpb24oYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF1dGhTZXJ2aWNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdyZWdpc3RlcicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvcmVnaXN0ZXInLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyZWdpc3RlckN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0YXRlcy9yZWdpc3Rlci9yZWdpc3Rlci5odG1sJyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FkbWluLWhvbWUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2FkbWluLWhvbWUnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdhZG1pbi1ob21lQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL2FkbWluLWhvbWUvYWRtaW4taG9tZS5odG1sJyxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IGZ1bmN0aW9uKGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdXRoU2VydmljZS5nZXRDdXJyZW50VXNlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnZWRpdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZWRpdCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2VkaXRDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvZWRpdC9lZGl0Lmh0bWwnLFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogZnVuY3Rpb24oYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF1dGhTZXJ2aWNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ21hcCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvbWFwJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFwQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL21hcC9tYXAuaHRtbCcsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICB1c2VyOiBmdW5jdGlvbihhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXV0aFNlcnZpY2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5jb250cm9sbGVyKCdhZG1pbi1ob21lQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsIGhvbWVTZXJ2aWNlLCB1c2VyKSB7XG5cbiAgJHNjb3BlLnRlc3QgPSBob21lU2VydmljZS5tZXNzYWdlO1xuICAkc2NvcGUubmFtZSA9IGZ1bmN0aW9uKGVtcGxveWVlX25hbWUpIHtcbiAgICBhZG1pblNlcnZpY2UubmFtZShlbXBsb3llZV9uYW1lKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgIH0pXG4gIH1cblxuICAkc2NvcGUuYWRkcG8gPSBmdW5jdGlvbiAocG9udW0pIHtcbiAgICBob21lU2VydmljZS5hZGRwbyhwb251bSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgIC8vbWFrZSBhIGNvbmZpcm1hdGlvbiBtZXNzYWdlLCBsaWtlIGNoZWNraW4gY29uZmlybWVkXG5cbiAgICB9KVxuICB9XG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLnNlcnZpY2UoJ2FkbWluU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCkge1xuXG4gIHRoaXMuYWRkcG8gPSBmdW5jdGlvbiAocG9udW1iZXIpIHtcbiAgICByZXR1cm4gJGh0dHAgKHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAnL2NoZWNraW4nLFxuICAgICAgZGF0YTogeyAvL3RoaXMgaXMgdGhlIGJvZHkhIHJlcS5ib2R5IG9uIHRoZSBvdGhlciBzaWRlLCB0aGUgc2VydmVyIHNpZGVcbiAgICAgICAgcG9udW1iZXI6IHBvbnVtYmVyLCAvL3RoaXMgaXMgbm90IHRoYXQuIGl0cyB2YXJpYWJsZSBpbiBsaW5lIDRcbiAgICAgICAgY2hlY2twb2ludF9pZDogMVxuICAgICAgfVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IC8vdGhpcyB3aWxsIHByZXR0eSBtdWNoIGJlIHRoZSBzYW1lIGZvciBhbGwgb2YgbXkgc2VydmljZSBmdW5jdGlvbnNcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgfSlcbiB9O1xuXG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5jb250cm9sbGVyKCdlZGl0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgZWRpdFNlcnZpY2UsICRzdGF0ZSkge1xuLy9nb3QgaGVscCBmcm9tIGx1Y2FzIHdpdGhpIHRoaXNcbiRzY29wZS5vYmogPSB7fTtcblxuJHNjb3BlLmdldHRlciA9IGZ1bmN0aW9uKGFkZFVzZXIpe1xuICBlZGl0U2VydmljZS5hZGRVc2VyKGFkZFVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAvL2V2ZXJ5dGhpbmcgdGhhdCBoYXBwZW5zIEFGVEVSIGdvZXMgaGVyZSwgbGlrZSBjbGVhciBmb3JtLCAkc3RhdGUuZ29cbiAgfSlcbiAvLyBlbXBsb3llZV9pbmZvXG4gLy8gdmFyIHggPSAoZW1wbG95ZWVfaW5mby5sZW5ndGggKyAxKTtcbiAvLyBlbXBsb3llZV9pbmZvLmlkID0geDtcbiAvLyBlbXBsb3llZV9pbmZvLmVtcGxveWVlX25hbWUgPSBvYmouZW1wbG95ZWVfbmFtZTtcbiAvLyBlbXBsb3llZV9pbmZvLmFkbWluID0gb2JqLmFkbWluO1xuIC8vIGVtcGxveWVlX2luZm8ucGFzc3dvcmQgPSBvYmoucGFzc3dvcmQ7XG4gLy8gLy8gY2hlY2twb2ludFxuIC8vIGNoZWNrcG9pbnQuaWQgPSAoY2hlY2twb2ludC5sZW5ndGgrMSk7XG4gLy8gY2hlY2twb2ludC5lbXBsb3llZV9pZCA9IHg7IC8vdGhpcyB4IGlzIG5vdyBlcXVhbCB0byBlbXBsb3llZV9pbmZvLmlkPz9cbiAvLyBjaGVwb2ludC5uYW1lID0gb2JqLmNoZWNrcG9pbnRfbmFtZTtcbn07XG59KTtcbiIsIi8vIElOSVRJTElaRSBTRVJWSUNFXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmFuZ3VsYXIubW9kdWxlKFwib3JkZXJob3VuZFwiKS5zZXJ2aWNlKFwiZWRpdFNlcnZpY2VcIiwgZnVuY3Rpb24oJGh0dHApIHtcblxuICAvLyBDUlVEIEZVTkNUSU9OU1xuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB0aGlzLmFkZFVzZXIgPSBmdW5jdGlvbihhZGRVc2VyKSB7XG4gICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIHVybDogJy9hZGRVc2VyJyxcbiAgICAgICAgICBkYXRhOiBhZGRVc2VyXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSk7XG4gIH07XG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5jb250cm9sbGVyKCdob21lQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsIGhvbWVTZXJ2aWNlLCB1c2VyKSB7XG5cbiAgJHNjb3BlLnRlc3QgPSBob21lU2VydmljZS5tZXNzYWdlO1xuXG4gICRzY29wZS5hZGRwbyA9IGZ1bmN0aW9uIChwb251bSkge1xuICAgIGhvbWVTZXJ2aWNlLmFkZHBvKHBvbnVtKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgLy9tYWtlIGEgY29uZmlybWF0aW9uIG1lc3NhZ2UsIGxpa2UgY2hlY2tpbiBjb25maXJtZWRcbiAgICAgIFxuICAgIH0pXG4gIH1cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uc2VydmljZSgnaG9tZVNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHApIHtcblxuICB0aGlzLmFkZHBvID0gZnVuY3Rpb24gKHBvbnVtYmVyKSB7XG4gICAgcmV0dXJuICRodHRwICh7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogJy9jaGVja2luJyxcbiAgICAgIGRhdGE6IHsgLy90aGlzIGlzIHRoZSBib2R5ISByZXEuYm9keSBvbiB0aGUgb3RoZXIgc2lkZSwgdGhlIHNlcnZlciBzaWRlXG4gICAgICAgIHBvbnVtYmVyOiBwb251bWJlciwgLy90aGlzIGlzIG5vdCB0aGF0LiBpdHMgdmFyaWFibGUgaW4gbGluZSA0XG4gICAgICAgIGNoZWNrcG9pbnRfaWQ6IDEgLy90aGlzIHdpbGwgd29yayBhcyBsb25nIGFzIHRoZSBmaXJzdCBjaGVja3BvaW50IGlzIG5ldmVyIGRlbGV0ZWQuIGxhdGVyIG9uLCB3ZSBjYW4gZmlndXJlIG91dCBob3cgdG8gZml4IHRoYXQuXG4gICAgICB9XG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgLy90aGlzIHdpbGwgcHJldHR5IG11Y2ggYmUgdGhlIHNhbWUgZm9yIGFsbCBvZiBteSBzZXJ2aWNlIGZ1bmN0aW9uc1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICB9KVxuIH1cblxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuICAgIC5jb250cm9sbGVyKCdsb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbiAgICAgICAgJHNjb3BlLnRlc3QgPSBcIm1ham9yIHRvbSB0byBncm91bmQgY29udHJvbFwiO1xuLy8qKioqKioqKioqKioqKioqKioqKioqREVMRVRFIFRISVMgQkVGT1JFIFBSRVNFTlRJTkcgQU5EIEhPU1RJTkcqKioqKioqKioqKioqKioqKioqKiovL1xuICAkc2NvcGUudXNlciA9IHtcbiAgICBuYW1lOiAnUXVpbm4nLFxuICAgIHBhc3N3b3JkOiAncSdcbiAgfVxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXG4gICAgICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKHVzZXIpIHtcblxuICAgICAgICAgICAgYXV0aFNlcnZpY2UubG9naW4odXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdVc2VyIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS51c2VyLnBhc3N3b3JkID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYocmVzcG9uc2UuZGF0YS5hZG1pbil7XG4gICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FkbWluLWhvbWUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdob21lJyk7IC8vdGFrZXMgdXMgdG8gaG9tZT8/Pz9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnVW5hYmxlIHRvIGxvZ2luJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9KTtcblxuLy9SRUZFUiBUTyBUSElTIENPREUgV0hFTiBUSU1FIFRPIFJFR0lTVEVSIEJVU0lORVNTXG4vLyAgICRzY29wZS5yZWdpc3RlciA9IGZ1bmN0aW9uKHVzZXIpIHtcbi8vICAgICAgIGF1dGhTZXJ2aWNlLnJlZ2lzdGVyVXNlcih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSkge1xuLy8gICAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gY3JlYXRlIHVzZXInKTtcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICBhbGVydCgnVXNlciBDcmVhdGVkJyk7XG4vLyAgICAgICAgICAgJHNjb3BlLm5ld1VzZXIgPSB7fTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4vLyAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gY3JlYXRlIHVzZXInKTtcbi8vICAgICAgIH0pO1xuLy8gICAgIH07XG4vLyB9KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5jb250cm9sbGVyKCdtYXBDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XG5cblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uY29udHJvbGxlcigncmVnaXN0ZXJDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4vL1xuLy8gICAgICAgJHNjb3BlLnJlZ2lzdGVyID0gZnVuY3Rpb24odXNlcikge1xuLy8gICAgICAgICAgIFxuLy8gICAgICAgICAgIGF1dGhTZXJ2aWNlLmxvZ2luKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKSB7XG4vLyAgICAgICAgICAgICAgICAgICBhbGVydCgnVXNlciBkb2VzIG5vdCBleGlzdCcpO1xuLy8gICAgICAgICAgICAgICAgICAgJHNjb3BlLnVzZXIucGFzc3dvcmQgPSAnJztcbi8vICAgICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYWRtaW4taG9tZScpOyAvL3Rha2VzIHVzIHRvIGhvbWU/Pz8/XG4vLyAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbi8vICAgICAgICAgICAgICAgYWxlcnQoJ1VuYWJsZSB0byBsb2dpbicpO1xuLy8gICAgICAgICAgIH0pO1xuLy8gICAgICAgfTtcbi8vXG4vLyB9KTtcblxuJHNjb3BlLnJlZ2lzdGVyID0gZnVuY3Rpb24odXNlcikge1xuICBcbiAgYXV0aFNlcnZpY2UucmVnaXN0ZXJVc2VyKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICBpZiAoIXJlc3BvbnNlLmRhdGEpIHtcbiAgICAgIGFsZXJ0KCdVbmFibGUgdG8gY3JlYXRlIHVzZXInKTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVzcG9uc2UuZGF0YSl7XG4gICAgICBhbGVydCgnVXNlciBDcmVhdGVkJyk7XG4gICAgICAkc2NvcGUubmV3VXNlciA9IHt9O1xuICAgICAgJHN0YXRlLmdvKCdlZGl0Jyk7XG4gICAgfVxuICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICBhbGVydCgnVW5hYmxlIHRvIGNyZWF0ZSB1c2VyJyk7XG4gIH0pO1xufTtcbn0pO1xuIl19
