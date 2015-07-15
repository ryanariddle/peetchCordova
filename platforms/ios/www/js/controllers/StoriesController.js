app.controller('StoriesController', ['$scope','$rootScope','$location','$http','userService','$routeParams','apiService','$translate',function($scope,$rootScope,$location,$http,userService,$routeParams,apiService,$translate) {
    
    $scope.offset = 0;
    
    var headers = {'language': $translate.use()};
    if($rootScope.user) 
        headers = { 'Authorization': "Bearer "+$rootScope.user.token ,'language': $translate.use()} ;
    
    $scope.loadStories = function()
    {
        if(!$scope.stories)
            $scope.stories = [];
        if($location.path().includes('top'))
        {
            apiService.getTopStories($scope.offset,headers,function(data){
                $scope.stories = $scope.stories.concat(data);
                console.log($scope.stories);
            });
        }
        else if($location.path().includes('profile'))
        {
            apiService.getAuthorStories($routeParams.id,headers,function(data){
                $scope.stories = data
                console.log($scope.stories);
            });
        }
        else
        {
            apiService.getStories($scope.offset,headers,function(data){
                $scope.stories = $scope.stories.concat(data);
                console.log($scope.stories);
            });
        }
    };
    
    $rootScope.$watch('lang', function(newValue, oldValue) { 
        console.log("reloading stories");
        $scope.stories = [];
        headers.language=$translate.use();
		$scope.loadStories();
	});
    
    $scope.increaseOffset = function()
    {
        $scope.offset++;
        $scope.loadStories();
    };
    
    $scope.findById = function(story)
    {
        var ind = null;
        $scope.stories.some(function(item,index,array){
            ind = index;
            return story._id == item._id; 
        });
        return ind;
    }
    
    $scope.addPart = function(story)
    {
        if(!$rootScope.user)
        {   
            $location.path('/login');
        }
        else
        {
            if(!story.newPart)
                story.newPart="";
            if(story.newPart.length>0 && story.newPart.length<1000) //Verify that the user wrote something in the box
            {
                var part = {'index':story.parts.length,'text':story.newPart,'author':$rootScope.user};
                story.parts.push(part);
                story.finished = story.parts.length==story.length;

                apiService.addPartToStory(story._id,part,headers,function(data){
                    story.error=null;
                    story.newPart = "";
                },function(status,code){
                    console.error(status);
                    story.error=status.error;
                });
            }
            else
            {
                story.error="Votre contribution doit faire entre 1 et 1000 caractères";
            }
        }
    };
    
    $scope.voting = function(story,value)
     {
        var vote = {"value":value}
        apiService.vote(story._id,vote,headers,function(data){
            $scope.stories[$scope.findById(data)].votes = [vote];
            $scope.stories[$scope.findById(data)].points += value;
        });
     };
    
    $scope.reporting = function(story)
     {
        apiService.report(story._id,headers,function(data){
            console.log('reported');
        });
     };
    
    $scope.delete = function(story)
    {
        apiService.deletePart(story._id,headers,function(data){
            story.parts.splice(story.parts.length-1,1);
        },function(status,code){
            story.error=status.error;
        });
    };
    
    $scope.toggleExpand = function(story)
    {
        if(!story.expand)
            story.expand=true;
        else
            story.expand = !story.expand;
    };
    
    //$scope.loadStories();
}]);