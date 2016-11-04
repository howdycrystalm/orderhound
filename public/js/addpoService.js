//NOOOOOO es6 in my service, you fool

angular.module('orderhound')
.service('addpoService', function ($http) {

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

})
