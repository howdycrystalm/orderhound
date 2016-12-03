angular.module('orderhound')
.service('adminService', function ($http) {

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

});
