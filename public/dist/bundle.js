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
 }


}])

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
        checkpoint_id: 1
      }
    }).then(function (response) { //this will pretty much be the same for all of my service functions
      
      return response.data;
    })
 }


}])

angular.module('orderhound')
.controller('mapCtrl', ["$scope", function($scope) {


}]);

angular.module('orderhound')
    .controller('loginCtrl', ["$scope", "authService", "$state", function($scope, authService, $state) {
        $scope.test = "major tom to ground control";

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInNlcnZpY2VzL2F1dGhTZXJ2aWNlLmpzIiwic2VydmljZXMvdXNlclNlcnZpY2UuanMiLCJqcy9yb3V0ZXJzLmpzIiwic3RhdGVzL2FkbWluLWhvbWUvYWRtaW4taG9tZUN0cmwuanMiLCJzdGF0ZXMvYWRtaW4taG9tZS9hZG1pblNlcnZpY2UuanMiLCJzdGF0ZXMvZWRpdC9lZGl0Q3RybC5qcyIsInN0YXRlcy9lZGl0L2VkaXRTZXJ2aWNlLmpzIiwic3RhdGVzL2hvbWUvaG9tZUN0cmwuanMiLCJzdGF0ZXMvaG9tZS9ob21lU2VydmljZS5qcyIsInN0YXRlcy9tYXAvbWFwQ3RybC5qcyIsInN0YXRlcy9sb2dpbi9sb2dpbkN0cmwuanMiLCJzdGF0ZXMvcmVnaXN0ZXIvcmVnaXN0ZXJDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxlQUFlLENBQUM7QUFDL0I7QUNEQSxRQUFRLE9BQU8sY0FBYyxRQUFRLHlCQUFlLFNBQVMsT0FBTzs7SUFFaEUsS0FBSyxRQUFRLFNBQVMsTUFBTTtRQUN4QixPQUFPLE1BQU07WUFDVCxRQUFRO1lBQ1IsS0FBSztZQUNMLE1BQU07V0FDUCxLQUFLLFNBQVMsVUFBVTtZQUN2QixPQUFPOzs7O0lBSWYsS0FBSyxTQUFTLFdBQVc7UUFDckIsT0FBTyxNQUFNO1lBQ1QsUUFBUTtZQUNSLEtBQUs7V0FDTixLQUFLLFNBQVMsVUFBVTtZQUN2QixPQUFPOzs7O0lBSWYsS0FBSyxpQkFBaUIsV0FBVztRQUM3QixPQUFPLE1BQU07WUFDVCxRQUFRO1lBQ1IsS0FBSztXQUNOLEtBQUssU0FBUyxVQUFVO1lBQ3ZCLE9BQU87Ozs7SUFJZixLQUFLLGVBQWUsU0FBUyxNQUFNO1FBQy9CLE9BQU8sTUFBTTtZQUNULFFBQVE7WUFDUixLQUFLO1lBQ0wsTUFBTTtXQUNQLEtBQUssU0FBUyxVQUFVO1lBQ3ZCLE9BQU87OztJQUdmLEtBQUssU0FBUyxTQUFTLFNBQVM7UUFDNUIsT0FBTyxNQUFN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b0JBQ2hCLE1BQU07b0JBQ04sT0FBTyxLQUFLLFdBQVc7O3FCQUV0QixHQUFHLFNBQVMsS0FBSyxNQUFNO2tCQUMxQixPQUFPLEdBQUc7O3FCQUVQOztvQkFFRCxPQUFPLEdBQUc7O2VBRWYsTUFBTSxTQUFTLEtBQUs7Z0JBQ25CLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQnRCO0FDdkNBLFFBQVEsT0FBTztDQUNkLFdBQVcsb0RBQWdCLFNBQVMsUUFBUSxhQUFhLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCbEUsT0FBTyxXQUFXLFNBQVMsTUFBTTs7RUFFL0IsWUFBWSxhQUFhLE1BQU0sS0FBSyxTQUFTLFVBQVU7SUFDckQsSUFBSSxDQUFDLFNBQVMsTUFBTTtNQUNsQixNQUFNOztTQUVILElBQUksU0FBUyxLQUFLO01BQ3JCLE1BQU07TUFDTixPQUFPLFVBQVU7TUFDakIsT0FBTyxHQUFHOztLQUVYLE1BQU0sU0FBUyxLQUFLO0lBQ3JCLE1BQU07Ozs7QUFJViIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcsICBbJ3VpLnJvdXRlciddKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJykuc2VydmljZShcImF1dGhTZXJ2aWNlXCIsIGZ1bmN0aW9uKCRodHRwKSB7XG5cbiAgICB0aGlzLmxvZ2luID0gZnVuY3Rpb24odXNlcikge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmxvZ291dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy9sb2dvdXQnXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Q3VycmVudFVzZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6ICcvaG9tZSdcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuLy9nb29kIHRvIGdvXG4gICAgdGhpcy5yZWdpc3RlclVzZXIgPSBmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJy9yZWdpc3RlcicsXG4gICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB0aGlzLmdldHRlciA9IGZ1bmN0aW9uKGFkZFVzZXIpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiAnL2FkZFVzZXInLFxuICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmVkaXRVc2VyID0gZnVuY3Rpb24oaWQsIHVzZXIpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICB1cmw6IFwiL3VzZXIvXCIgKyBpZCxcbiAgICAgICAgICAgIGRhdGE6IHVzZXJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpLnNlcnZpY2UoXCJ1c2VyU2VydmljZVwiLCBmdW5jdGlvbigkaHR0cCkge1xuXG4gICAgdGhpcy5nZXRVc2VycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy91c2VyJ1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmdldFVzZXIgPSBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy91c2VyP19pZD0nICsgaWRcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gTm90IE5lZWRlZFxuICAgIC8vXG4gICAgLy8gdGhpcy5kZWxldGVVc2VyID0gZnVuY3Rpb24oaWQpIHtcbiAgICAvLyAgIHJldHVybiAkaHR0cCh7XG4gICAgLy8gICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgLy8gICAgIHVybDogJy91c2VyLycgKyBpZFxuICAgIC8vICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgIC8vICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgLy8gICB9KTtcbiAgICAvLyB9O1xufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4gICAgLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpXG5cbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgICAgIC5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbG9naW5DdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvbG9naW4vbG9naW4uaHRtbCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogZnVuY3Rpb24oYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF1dGhTZXJ2aWNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdyZWdpc3RlcicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvcmVnaXN0ZXInLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyZWdpc3RlckN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0YXRlcy9yZWdpc3Rlci9yZWdpc3Rlci5odG1sJyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2FkbWluLWhvbWUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2FkbWluLWhvbWUnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdhZG1pbi1ob21lQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL2FkbWluLWhvbWUvYWRtaW4taG9tZS5odG1sJyxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IGZ1bmN0aW9uKGF1dGhTZXJ2aWNlLCAkc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdXRoU2VydmljZS5nZXRDdXJyZW50VXNlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnZWRpdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZWRpdCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2VkaXRDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdGF0ZXMvZWRpdC9lZGl0Lmh0bWwnLFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogZnVuY3Rpb24oYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF1dGhTZXJ2aWNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ21hcCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvbWFwJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFwQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3RhdGVzL21hcC9tYXAuaHRtbCcsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICB1c2VyOiBmdW5jdGlvbihhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXV0aFNlcnZpY2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5jb250cm9sbGVyKCdhZG1pbi1ob21lQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsIGhvbWVTZXJ2aWNlLCB1c2VyKSB7XG5cbiAgJHNjb3BlLnRlc3QgPSBob21lU2VydmljZS5tZXNzYWdlO1xuXG4gICRzY29wZS5hZGRwbyA9IGZ1bmN0aW9uIChwb251bSkge1xuICAgIGhvbWVTZXJ2aWNlLmFkZHBvKHBvbnVtKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgLy9tYWtlIGEgY29uZmlybWF0aW9uIG1lc3NhZ2UsIGxpa2UgY2hlY2tpbiBjb25maXJtZWRcbiAgICAgIFxuICAgIH0pXG4gIH1cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uc2VydmljZSgnYWRtaW5TZXJ2aWNlJywgZnVuY3Rpb24gKCRodHRwKSB7XG5cbiAgdGhpcy5hZGRwbyA9IGZ1bmN0aW9uIChwb251bWJlcikge1xuICAgIHJldHVybiAkaHR0cCAoe1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6ICcvY2hlY2tpbicsXG4gICAgICBkYXRhOiB7IC8vdGhpcyBpcyB0aGUgYm9keSEgcmVxLmJvZHkgb24gdGhlIG90aGVyIHNpZGUsIHRoZSBzZXJ2ZXIgc2lkZVxuICAgICAgICBwb251bWJlcjogcG9udW1iZXIsIC8vdGhpcyBpcyBub3QgdGhhdC4gaXRzIHZhcmlhYmxlIGluIGxpbmUgNFxuICAgICAgICBjaGVja3BvaW50X2lkOiAxXG4gICAgICB9XG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgLy90aGlzIHdpbGwgcHJldHR5IG11Y2ggYmUgdGhlIHNhbWUgZm9yIGFsbCBvZiBteSBzZXJ2aWNlIGZ1bmN0aW9uc1xuICAgICAgXG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICB9KVxuIH1cblxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLmNvbnRyb2xsZXIoJ2VkaXRDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBlZGl0U2VydmljZSwgJHN0YXRlKSB7XG4vL2dvdCBoZWxwIGZyb20gbHVjYXMgd2l0aGkgdGhpc1xuJHNjb3BlLm9iaiA9IHt9O1xuXG4kc2NvcGUuZ2V0dGVyID0gZnVuY3Rpb24oYWRkVXNlcil7XG4gIGVkaXRTZXJ2aWNlLmFkZFVzZXIoYWRkVXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgIC8vZXZlcnl0aGluZyB0aGF0IGhhcHBlbnMgQUZURVIgZ29lcyBoZXJlLCBsaWtlIGNsZWFyIGZvcm0sICRzdGF0ZS5nb1xuICB9KVxuIC8vIGVtcGxveWVlX2luZm9cbiAvLyB2YXIgeCA9IChlbXBsb3llZV9pbmZvLmxlbmd0aCArIDEpO1xuIC8vIGVtcGxveWVlX2luZm8uaWQgPSB4O1xuIC8vIGVtcGxveWVlX2luZm8uZW1wbG95ZWVfbmFtZSA9IG9iai5lbXBsb3llZV9uYW1lO1xuIC8vIGVtcGxveWVlX2luZm8uYWRtaW4gPSBvYmouYWRtaW47XG4gLy8gZW1wbG95ZWVfaW5mby5wYXNzd29yZCA9IG9iai5wYXNzd29yZDtcbiAvLyAvLyBjaGVja3BvaW50XG4gLy8gY2hlY2twb2ludC5pZCA9IChjaGVja3BvaW50Lmxlbmd0aCsxKTtcbiAvLyBjaGVja3BvaW50LmVtcGxveWVlX2lkID0geDsgLy90aGlzIHggaXMgbm93IGVxdWFsIHRvIGVtcGxveWVlX2luZm8uaWQ/P1xuIC8vIGNoZXBvaW50Lm5hbWUgPSBvYmouY2hlY2twb2ludF9uYW1lO1xufTtcbn0pO1xuIiwiLy8gSU5JVElMSVpFIFNFUlZJQ0Vcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuYW5ndWxhci5tb2R1bGUoXCJvcmRlcmhvdW5kXCIpLnNlcnZpY2UoXCJlZGl0U2VydmljZVwiLCBmdW5jdGlvbigkaHR0cCkge1xuXG4gIC8vIENSVUQgRlVOQ1RJT05TXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHRoaXMuYWRkVXNlciA9IGZ1bmN0aW9uKGFkZFVzZXIpIHtcbiAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgdXJsOiAnL2FkZFVzZXInLFxuICAgICAgICAgIGRhdGE6IGFkZFVzZXJcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9KTtcbiAgfTtcbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ29yZGVyaG91bmQnKVxuLmNvbnRyb2xsZXIoJ2hvbWVDdHJsJywgZnVuY3Rpb24gKCRzY29wZSwgaG9tZVNlcnZpY2UsIHVzZXIpIHtcblxuICAkc2NvcGUudGVzdCA9IGhvbWVTZXJ2aWNlLm1lc3NhZ2U7XG5cbiAgJHNjb3BlLmFkZHBvID0gZnVuY3Rpb24gKHBvbnVtKSB7XG4gICAgaG9tZVNlcnZpY2UuYWRkcG8ocG9udW0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAvL21ha2UgYSBjb25maXJtYXRpb24gbWVzc2FnZSwgbGlrZSBjaGVja2luIGNvbmZpcm1lZFxuICAgICAgXG4gICAgfSlcbiAgfVxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5zZXJ2aWNlKCdob21lU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCkge1xuXG4gIHRoaXMuYWRkcG8gPSBmdW5jdGlvbiAocG9udW1iZXIpIHtcbiAgICByZXR1cm4gJGh0dHAgKHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAnL2NoZWNraW4nLFxuICAgICAgZGF0YTogeyAvL3RoaXMgaXMgdGhlIGJvZHkhIHJlcS5ib2R5IG9uIHRoZSBvdGhlciBzaWRlLCB0aGUgc2VydmVyIHNpZGVcbiAgICAgICAgcG9udW1iZXI6IHBvbnVtYmVyLCAvL3RoaXMgaXMgbm90IHRoYXQuIGl0cyB2YXJpYWJsZSBpbiBsaW5lIDRcbiAgICAgICAgY2hlY2twb2ludF9pZDogMVxuICAgICAgfVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IC8vdGhpcyB3aWxsIHByZXR0eSBtdWNoIGJlIHRoZSBzYW1lIGZvciBhbGwgb2YgbXkgc2VydmljZSBmdW5jdGlvbnNcbiAgICAgIFxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgfSlcbiB9XG5cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdvcmRlcmhvdW5kJylcbi5jb250cm9sbGVyKCdtYXBDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XG5cblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4gICAgLmNvbnRyb2xsZXIoJ2xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgYXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAkc2NvcGUudGVzdCA9IFwibWFqb3IgdG9tIHRvIGdyb3VuZCBjb250cm9sXCI7XG5cbiAgICAgICAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24odXNlcikge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBhdXRoU2VydmljZS5sb2dpbih1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBhbGVydCgnVXNlciBkb2VzIG5vdCBleGlzdCcpO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudXNlci5wYXNzd29yZCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKHJlc3BvbnNlLmRhdGEuYWRtaW4pe1xuICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhZG1pbi1ob21lJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnaG9tZScpOyAvL3Rha2VzIHVzIHRvIGhvbWU/Pz8/XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1VuYWJsZSB0byBsb2dpbicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSk7XG5cbi8vUkVGRVIgVE8gVEhJUyBDT0RFIFdIRU4gVElNRSBUTyBSRUdJU1RFUiBCVVNJTkVTU1xuLy8gICAkc2NvcGUucmVnaXN0ZXIgPSBmdW5jdGlvbih1c2VyKSB7XG4vLyAgICAgICBhdXRoU2VydmljZS5yZWdpc3RlclVzZXIodXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuLy8gICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpIHtcbi8vICAgICAgICAgICBhbGVydCgnVW5hYmxlIHRvIGNyZWF0ZSB1c2VyJyk7XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgYWxlcnQoJ1VzZXIgQ3JlYXRlZCcpO1xuLy8gICAgICAgICAgICRzY29wZS5uZXdVc2VyID0ge307XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuLy8gICAgICAgICBhbGVydCgnVW5hYmxlIHRvIGNyZWF0ZSB1c2VyJyk7XG4vLyAgICAgICB9KTtcbi8vICAgICB9O1xuLy8gfSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnb3JkZXJob3VuZCcpXG4uY29udHJvbGxlcigncmVnaXN0ZXJDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBhdXRoU2VydmljZSwgJHN0YXRlKSB7XG4vL1xuLy8gICAgICAgJHNjb3BlLnJlZ2lzdGVyID0gZnVuY3Rpb24odXNlcikge1xuLy8gICAgICAgICAgIFxuLy8gICAgICAgICAgIGF1dGhTZXJ2aWNlLmxvZ2luKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKSB7XG4vLyAgICAgICAgICAgICAgICAgICBhbGVydCgnVXNlciBkb2VzIG5vdCBleGlzdCcpO1xuLy8gICAgICAgICAgICAgICAgICAgJHNjb3BlLnVzZXIucGFzc3dvcmQgPSAnJztcbi8vICAgICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYWRtaW4taG9tZScpOyAvL3Rha2VzIHVzIHRvIGhvbWU/Pz8/XG4vLyAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbi8vICAgICAgICAgICAgICAgYWxlcnQoJ1VuYWJsZSB0byBsb2dpbicpO1xuLy8gICAgICAgICAgIH0pO1xuLy8gICAgICAgfTtcbi8vXG4vLyB9KTtcblxuJHNjb3BlLnJlZ2lzdGVyID0gZnVuY3Rpb24odXNlcikge1xuICBcbiAgYXV0aFNlcnZpY2UucmVnaXN0ZXJVc2VyKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICBpZiAoIXJlc3BvbnNlLmRhdGEpIHtcbiAgICAgIGFsZXJ0KCdVbmFibGUgdG8gY3JlYXRlIHVzZXInKTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVzcG9uc2UuZGF0YSl7XG4gICAgICBhbGVydCgnVXNlciBDcmVhdGVkJyk7XG4gICAgICAkc2NvcGUubmV3VXNlciA9IHt9O1xuICAgICAgJHN0YXRlLmdvKCdlZGl0Jyk7XG4gICAgfVxuICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICBhbGVydCgnVW5hYmxlIHRvIGNyZWF0ZSB1c2VyJyk7XG4gIH0pO1xufTtcbn0pO1xuIl19
