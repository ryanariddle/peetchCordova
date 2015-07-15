app.controller('LayoutController', ['$scope','$rootScope','$location','$http','userService','$translate','apiService', function($scope,$rootScope,$location,$http,userService,$translate,apiService) {
    
    var headers = {'language': $translate.use()};
    
    if(!$rootScope.lang)
    {
        $rootScope.lang = userService.getLang();
        console.log($rootScope.user);
        $translate.use($rootScope.lang);
    }
    
    $scope.checkNotifications = function()
    {
        if($rootScope.user)
        {
            apiService.getNotifications(headers,function(data)
            {
                $rootScope.newNotifs = [];
                data.forEach(function(item,index,array)
                {
                    if(item.seen == false)
                        $rootScope.newNotifs.push(item);
                });
            },
            function(status,code)
            {
                console.error(status,code);
            });
        }
    }
    
    if(!$rootScope.user){
        $rootScope.user = userService.getUser();
        console.log($rootScope.user);
        if($rootScope.user&& $rootScope.user!=undefined)
        {
            headers = { 'Authorization': "Bearer "+$scope.user.token, 'language': $translate.use() } ; 
            $scope.checkNotifications();
        }
    }




    
    $scope.login = function()
    {
        $location.path('/login');
    };
    
    $scope.signup = function()
    {
        $location.path('/signup');
    };
    $scope.profile = function()
    {
        $location.path('/profile');
    };
    $scope.logout = function()
    {
        userService.emptyStorage();
        $location.path('/');
    };
    
    $scope.createStory = function()
    {
        $location.path('/create');
    };
    $scope.top = function()
    {
        $location.path('/top');
    };
    
    $scope.checkLogin = function()
    {
        if(!$rootScope.user)
            $location.path('/login');
    };
    
    $scope.changeLanguage = function (key) {
    $rootScope.lang=key;
    userService.setLang(key);
    $translate.use(key);
  };
    
    var timer = setInterval($scope.checkNotifications,60000);
 
}]);