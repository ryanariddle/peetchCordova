app.controller('ProfileController', ['$scope','$rootScope','$location','$http','userService','apiService','$translate', function($scope,$rootScope,$location,$http,userService,apiService,$translate) 
{
    $scope.myImage='';
    $scope.myCroppedImage='';
    $scope.bio='';
    $scope.editing = false;
    $scope.newAvatar=false;
    
    var headers = {'language': $translate.use()};
    if($scope.user) 
        headers = { 'Authorization': "Bearer "+$scope.user.token, 'language': $translate.use() } ; 
    
    apiService.getUserById($rootScope.user._id,headers,function(data){
        $scope.profile = data;
        
        if(data.avatar)
        {
            $scope.myImage = data.avatar;
            $scope.myCroppedImage = data.avatar;
        }
        if(data.bio)
        $scope.bio = data.bio;
    });
    
    apiService.getNotifications(headers,function(data){
        $scope.profile.notifications = data;
        $rootScope.newNotifs=[];
    },function(status,code){
        console.error(status);
    });
    
    $scope.updateAvatar = function()
    {
        //If the avatar has been changed, we send the new one
        if($scope.newAvatar)
            var dat = {'avatar':$scope.myCroppedImage,'bio':$scope.bio};
        //Otherwise, we send the old one
        else
            var dat= {'avatar':$scope.profile.avatar,'bio':$scope.bio};
        console.log(dat);
        apiService.updateProfile(dat,headers,function(data){
            console.log(dat);
            $scope.myImage=$scope.myCroppedImage;
            var user = $rootScope.user;
            user.avatar = $scope.myImage;
            $rootScope.user = user;
            userService.setUser(user);
            $scope.editing = false;
        });
    };
    
    var handleFileSelect=function(evt) {
        var file=evt.currentTarget.files[0];
        console.log(file);
        if(file.type.indexOf('image')!=-1)
        {
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function($scope){
                    $scope.myImage=evt.target.result;
                    $scope.newAvatar = true;
                });
            };
            reader.readAsDataURL(file);
        }
        else
        {
            $translate('MUST_IMAGE').then(function (translation) {
                $scope.error = translation;
                console.error($scope.error);
            });
        }
    };
    
    $scope.edit = function()
    {
        $scope.editing = true;
    }
    
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
    
}]);