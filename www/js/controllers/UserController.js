app.controller('UserController', ['$scope','$rootScope','$location','$http','userService','$routeParams','apiService','$translate', function($scope,$rootScope,$location,$http,userService,$routeParams,apiService,$translate) 
{
        
    headers = { 'Authorization': "Bearer",'language': $translate.use() } ;  
    if($rootScope.user) 
        headers = { 'Authorization': "Bearer "+$rootScope.user.token,'language': $translate.use() } ;  
    
    var id = $routeParams.id;
    
    apiService.getUserById(id,headers,function(data){
        $scope.profile = data;
    });
        
}]);