app.controller('SignupController',['$scope','$rootScope','$location','$http','userService','apiService', function($scope,$rootScope,$location,$http,userService,apiService) {
    $scope.signup = function()
    {
            data = {"username":$scope.username,"password":$scope.password,"mail":$scope.email};
            apiService.createUser(data,function(data){
                console.log(data);
                userService.setUser(data);
                $location.path('/');
            },function(status,code){
                if(code==422)
                {$scope.error = "Username ou email déjà pris";}    
                else if(code==404 || code == 500)
                {$scope.error = "Problème de connexion avec le serveur";}
            });
    }  
}]);