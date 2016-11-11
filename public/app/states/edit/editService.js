// INITILIZE SERVICE
// ============================================================
angular.module("orderhound").service("editService", function($http) {

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
});
