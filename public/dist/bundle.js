angular.module('orderhound')
.controller('addpoCtrl', ($scope, addpoService) => {

  $scope.test = "this is only a test";

  $scope.addpo = (ponumber) => {
    addpoService.postPO(ponumber)
    .then(response => {
      //do something to let the use know it worked
      //eg like a box that popsup and says "good" or something
    })
  }

})

//NOOOOOO es6 in my service, you fool

angular.module('orderhound')
.service('addpoService', ["$http", function ($http) {

  this.postPO = function (ponumber) {
      return $http ({
        method: 'POST',
        url: '/addpo/inProduction',
        data: { //this is the body! req.body on the other side, the server side
          ponumber: ponumber //this is not that. its variable in line 4
        }
      }).then(function (response) { //this will pretty much be the same for all of my service functions
        return response.data;
      })
  }

}])

angular.module('orderhound', ['ui.router']);

app.module('orderhound')
.controller('loginCtrl', function($scope) {

});

angular.module('orderhound')
.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url:'/',
      template: '<div>hi, im coming from routes.js</div>'
    })

    .state('addpo', {
      url: '/addpo',
      templateUrl: './public/views/addpo.html',
      controller: 'loginCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: './public/views/login.html',
      controller: 'addpoCtrl'
    })

}])

angular.module('orderhound')
.controller('addpoCtrl', ($scope, addpoService) => {

  $scope.test = "this is only a test";

  $scope.addpo = (ponumber) => {
    addpoService.postPO(ponumber)
    .then(response => {
      //do something to let the use know it worked
      //eg like a box that popsup and says "good" or something
    })
  }

})

//NOOOOOO es6 in my service, you fool

angular.module('orderhound')
.service('addpoService', ["$http", function ($http) {

  this.postPO = function (ponumber) {
      return $http ({
        method: 'POST',
        url: '/addpo/inProduction',
        data: { //this is the body! req.body on the other side, the server side
          ponumber: ponumber //this is not that. its variable in line 4
        }
      }).then(function (response) { //this will pretty much be the same for all of my service functions
        return response.data;
      })
  }

}])

angular.module('orderhound', ['ui.router']);

app.module('orderhound')
.controller('loginCtrl', function($scope) {

});

angular.module('orderhound')
.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url:'/',
      template: '<div>hi, im coming from routes.js</div>'
    })

    .state('addpo', {
      url: '/addpo',
      templateUrl: './public/views/addpo.html',
      controller: 'loginCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: './public/views/login.html',
      controller: 'addpoCtrl'
    })

}])

angular.module('orderhound')
.controller('addpoCtrl', ($scope, addpoService) => {

  $scope.test = "this is only a test";

  $scope.addpo = (ponumber) => {
    addpoService.postPO(ponumber)
    .then(response => {
      //do something to let the use know it worked
      //eg like a box that popsup and says "good" or something
    })
  }

})

//NOOOOOO es6 in my service, you fool

angular.module('orderhound')
.service('addpoService', ["$http", function ($http) {

  this.postPO = function (ponumber) {
      return $http ({
        method: 'POST',
        url: '/addpo/inProduction',
        data: { //this is the body! req.body on the other side, the server side
          ponumber: ponumber //this is not that. its variable in line 4
        }
      }).then(function (response) { //this will pretty much be the same for all of my service functions
        return response.data;
      })
  }

}])

angular.module('orderhound', ['ui.router']);

app.module('orderhound')
.controller('loginCtrl', function($scope) {

});

angular.module('orderhound')
.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url:'/',
      template: '<div>hi, im coming from routes.js</div>'
    })

    .state('addpo', {
      url: '/addpo',
      templateUrl: './public/views/addpo.html',
      controller: 'loginCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: './public/views/login.html',
      controller: 'addpoCtrl'
    })

}])

angular.module('orderhound')
.controller('addpoCtrl', ($scope, addpoService) => {

  $scope.test = "this is only a test";

  $scope.addpo = (ponumber) => {
    addpoService.postPO(ponumber)
    .then(response => {
      //do something to let the use know it worked
      //eg like a box that popsup and says "good" or something
    })
  }

})

//NOOOOOO es6 in my service, you fool

angular.module('orderhound')
.service('addpoService', ["$http", function ($http) {

  this.postPO = function (ponumber) {
      return $http ({
        method: 'POST',
        url: '/addpo/inProduction',
        data: { //this is the body! req.body on the other side, the server side
          ponumber: ponumber //this is not that. its variable in line 4
        }
      }).then(function (response) { //this will pretty much be the same for all of my service functions
        return response.data;
      })
  }

}])

angular.module('orderhound', ['ui.router']);

app.module('orderhound')
.controller('loginCtrl', function($scope) {

});

angular.module('orderhound')
.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url:'/',
      template: '<div>hi, im coming from routes.js</div>'
    })

    .state('addpo', {
      url: '/addpo',
      templateUrl: './public/views/addpo.html',
      controller: 'loginCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: './public/views/login.html',
      controller: 'addpoCtrl'
    })

}])

angular.module('orderhound')
.controller('addpoCtrl', ($scope, addpoService) => {

  $scope.test = "this is only a test";

  $scope.addpo = (ponumber) => {
    addpoService.postPO(ponumber)
    .then(response => {
      //do something to let the use know it worked
      //eg like a box that popsup and says "good" or something
    })
  }

})

//NOOOOOO es6 in my service, you fool

angular.module('orderhound')
.service('addpoService', ["$http", function ($http) {

  this.postPO = function (ponumber) {
      return $http ({
        method: 'POST',
        url: '/addpo/inProduction',
        data: { //this is the body! req.body on the other side, the server side
          ponumber: ponumber //this is not that. its variable in line 4
        }
      }).then(function (response) { //this will pretty much be the same for all of my service functions
        return response.data;
      })
  }

}])

angular.module('orderhound', ['ui.router']);

app.module('orderhound')
.controller('loginCtrl', function($scope) {

});

angular.module('orderhound')
.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url:'/',
      template: '<div>hi, im coming from routes.js</div>'
    })

    .state('addpo', {
      url: '/addpo',
      templateUrl: './public/views/addpo.html',
      controller: 'loginCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: './public/views/login.html',
      controller: 'addpoCtrl'
    })

}])

angular.module('orderhound')
.controller('addpoCtrl', ($scope, addpoService) => {

  $scope.test = "this is only a test";

  $scope.addpo = (ponumber) => {
    addpoService.postPO(ponumber)
    .then(response => {
      //do something to let the use know it worked
      //eg like a box that popsup and says "good" or something
    })
  }

})

//NOOOOOO es6 in my service, you fool

angular.module('orderhound')
.service('addpoService', ["$http", function ($http) {

  this.postPO = function (ponumber) {
      return $http ({
        method: 'POST',
        url: '/addpo/inProduction',
        data: { //this is the body! req.body on the other side, the server side
          ponumber: ponumber //this is not that. its variable in line 4
        }
      }).then(function (response) { //this will pretty much be the same for all of my service functions
        return response.data;
      })
  }

}])

angular.module('orderhound', ['ui.router']);

app.module('orderhound')
.controller('loginCtrl', function($scope) {

});

angular.module('orderhound')
.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url:'/',
      template: '<div>hi, im coming from routes.js</div>'
    })

    .state('addpo', {
      url: '/addpo',
      templateUrl: './public/views/addpo.html',
      controller: 'loginCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: './public/views/login.html',
      controller: 'addpoCtrl'
    })

}])

angular.module('orderhound')
.controller('addpoCtrl', ($scope, addpoService) => {

  $scope.test = "this is only a test";

  $scope.addpo = (ponumber) => {
    addpoService.postPO(ponumber)
    .then(response => {
      //do something to let the use know it worked
      //eg like a box that popsup and says "good" or something
    })
  }

})

//NOOOOOO es6 in my service, you fool

angular.module('orderhound')
.service('addpoService', ["$http", function ($http) {

  this.postPO = function (ponumber) {
      return $http ({
        method: 'POST',
        url: '/addpo/inProduction',
        data: { //this is the body! req.body on the other side, the server side
          ponumber: ponumber //this is not that. its variable in line 4
        }
      }).then(function (response) { //this will pretty much be the same for all of my service functions
        return response.data;
      })
  }

}])

angular.module('orderhound', ['ui.router']);

app.module('orderhound')
.controller('loginCtrl', function($scope) {

});

angular.module('orderhound')
.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url:'/',
      template: '<div>hi, im coming from routes.js</div>'
    })

    .state('addpo', {
      url: '/addpo',
      templateUrl: './public/views/addpo.html',
      controller: 'loginCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: './public/views/login.html',
      controller: 'addpoCtrl'
    })

}])

angular.module('orderhound')
.controller('addpoCtrl', ($scope, addpoService) => {

  $scope.test = "this is only a test";

  $scope.addpo = (ponumber) => {
    addpoService.postPO(ponumber)
    .then(response => {
      //do something to let the use know it worked
      //eg like a box that popsup and says "good" or something
    })
  }

})

//NOOOOOO es6 in my service, you fool

angular.module('orderhound')
.service('addpoService', ["$http", function ($http) {

  this.postPO = function (ponumber) {
      return $http ({
        method: 'POST',
        url: '/addpo/inProduction',
        data: { //this is the body! req.body on the other side, the server side
          ponumber: ponumber //this is not that. its variable in line 4
        }
      }).then(function (response) { //this will pretty much be the same for all of my service functions
        return response.data;
      })
  }

}])

angular.module('orderhound', ['ui.router']);

app.module('orderhound')
.controller('loginCtrl', function($scope) {

});

angular.module('orderhound')
.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url:'/',
      template: '<div>hi, im coming from routes.js</div>'
    })

    .state('addpo', {
      url: '/addpo',
      templateUrl: './public/views/addpo.html',
      controller: 'loginCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: './public/views/login.html',
      controller: 'addpoCtrl'
    })

}])

angular.module('orderhound')
.controller('addpoCtrl', ($scope, addpoService) => {

  $scope.test = "this is only a test";

  $scope.addpo = (ponumber) => {
    addpoService.postPO(ponumber)
    .then(response => {
      //do something to let the use know it worked
      //eg like a box that popsup and says "good" or something
    })
  }

})

//NOOOOOO es6 in my service, you fool

angular.module('orderhound')
.service('addpoService', ["$http", function ($http) {

  this.postPO = function (ponumber) {
      return $http ({
        method: 'POST',
        url: '/addpo/inProduction',
        data: { //this is the body! req.body on the other side, the server side
          ponumber: ponumber //this is not that. its variable in line 4
        }
      }).then(function (response) { //this will pretty much be the same for all of my service functions
        return response.data;
      })
  }

}])

angular.module('orderhound', ['ui.router']);

app.module('orderhound')
.controller('loginCtrl', function($scope) {

});

angular.module('orderhound')
.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url:'/',
      template: '<div>hi, im coming from routes.js</div>'
    })

    .state('addpo', {
      url: '/addpo',
      templateUrl: './public/views/addpo.html',
      controller: 'loginCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: './public/views/login.html',
      controller: 'addpoCtrl'
    })

}])

angular.module('orderhound')
.controller('addpoCtrl', ($scope, addpoService) => {

  $scope.test = "this is only a test";

  $scope.addpo = (ponumber) => {
    addpoService.postPO(ponumber)
    .then(response => {
      //do something to let the use know it worked
      //eg like a box that popsup and says "good" or something
    })
  }

})

//NOOOOOO es6 in my service, you fool

angular.module('orderhound')
.service('addpoService', ["$http", function ($http) {

  this.postPO = function (ponumber) {
      return $http ({
        method: 'POST',
        url: '/addpo/inProduction',
        data: { //this is the body! req.body on the other side, the server side
          ponumber: ponumber //this is not that. its variable in line 4
        }
      }).then(function (response) { //this will pretty much be the same for all of my service functions
        return response.data;
      })
  }

}])

angular.module('orderhound', ['ui.router']);

app.module('orderhound')
.controller('loginCtrl', function($scope) {

});

angular.module('orderhound')
.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url:'/',
      template: '<div>hi, im coming from routes.js</div>'
    })

    .state('addpo', {
      url: '/addpo',
      templateUrl: './public/views/addpo.html',
      controller: 'loginCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: './public/views/login.html',
      controller: 'addpoCtrl'
    })

}])

angular.module('orderhound')
.controller('addpoCtrl', ($scope, addpoService) => {

  $scope.test = "this is only a test";

  $scope.addpo = (ponumber) => {
    addpoService.postPO(ponumber)
    .then(response => {
      //do something to let the use know it worked
      //eg like a box that popsup and says "good" or something
    })
  }

})

//NOOOOOO es6 in my service, you fool

angular.module('orderhound')
.service('addpoService', ["$http", function ($http) {

  this.postPO = function (ponumber) {
      return $http ({
        method: 'POST',
        url: '/addpo/inProduction',
        data: { //this is the body! req.body on the other side, the server side
          ponumber: ponumber //this is not that. its variable in line 4
        }
      }).then(function (response) { //this will pretty much be the same for all of my service functions
        return response.data;
      })
  }

}])

angular.module('orderhound', ['ui.router']);

app.module('orderhound')
.controller('loginCtrl', function($scope) {

});

angular.module('orderhound')
.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url:'/',
      template: '<div>hi, im coming from routes.js</div>'
    })

    .state('addpo', {
      url: '/addpo',
      templateUrl: './public/views/addpo.html',
      controller: 'loginCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: './public/views/login.html',
      controller: 'addpoCtrl'
    })

}])
