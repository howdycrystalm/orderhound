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
