// INITILIZE SERVICE
// ============================================================
angular.module('orderhound')
.service('homeService', function ($http) {

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
//getting user's name to add to welcome message
  this.welcomeAssets = function() {
    return $http({
      method: 'GET',
      url: '/welcomeAssets'
    }).then(function(response){ //catching the response from the server
      return response.data; //response.data is the info we want
  });
};

});

//trying out new code below
// this.welcomeAssets = function() {
//   return $http({
//     method: 'GET',
//     url: '/welcomeAssets'
//   }).then(function(response){ //catching the response from the server
//     return response.data; //response.data is the info we want
// });
// };
//
// });
