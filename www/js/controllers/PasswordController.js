app.controller('PasswordController',['$scope','$rootScope','$location','$http','userService','$routeParams','apiService',function($scope,$rootScope,$location,$http,userService,$routeParams,apiService) {
    $scope.reset = function()
    {       
        var key = $routeParams.key;
        var email = $routeParams.email;
        if($scope.password==$scope.confirmation)
        {
            data = {"mail":email,"password":$scope.password,"token":key};
            
            apiService.resetPassword(data,function(data) {
                console.log(data);
                $scope.success=true;
                $scope.error = false;
            },function(status,code) {
                if(code==422)
                {$scope.error = "Username et/ou mot de passe incorrect(s)";}    
                else if(code==404 || code == 500)
                {$scope.error = "Problème de connexion avec le serveur";}
            });
        }
        else
        {
            $scope.error = "Mot de passe et confirmation différents !";
        }
    };
    
    $scope.sendmail = function()
    {       
        var data = {"mail":$scope.mail};
        console.log(data);
        apiService.forgotPassword(data,function(data) {
            console.log(data);
            $scope.success=true;
            $scope.error = false;
        },function(status,code) {
            if(code==404)
            {$scope.error = "Aucun compte n'est lié à ce mail";}    
            else if(code == 500)
            {$scope.error = "Problème de connexion avec le serveur";}
        });
    };
     
}]);