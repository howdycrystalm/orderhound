angular.module('orderhound')
.controller('editCtrl', function($scope, editService, $state) {
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
});
