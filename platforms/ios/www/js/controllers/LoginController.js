app.controller('LoginController',['$scope','$rootScope','$location','userService','apiService',function($scope,$rootScope,$location,userService,apiService) {
    $scope.login = function()
    {
            data = {"username":$scope.username,"password":$scope.password};
            apiService.login(data,function(data){
                console.log(data);
                userService.setUser(data);
                $location.path('/'); 
            },function(status,code){
                if(code==404)
                {$scope.error = "Username et/ou mot de passe incorrect(s)";}   
                if(code==422)
                {$scope.error = "Requête mal formée";}   
                else if(code == 500)
                {$scope.error = "Problème de connexion avec le serveur";}
            });
    }
     
}]);