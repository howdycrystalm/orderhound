// INITILIZE SERVICE
// ============================================================
angular.module('orderhound')
.service('mapService', function($http) {

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
  });
