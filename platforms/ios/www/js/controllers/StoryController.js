app.controller('StoryController', function($scope,$rootScope,$location,$http,$routeParams,apiService,$translate) {
    
    var id = $routeParams.id;
    
    var headers = { 'language': $translate.use()  };
    if($scope.user) 
        headers = { 'Authorization': "Bearer "+$scope.user.token,'language': $translate.use()} ;    
    
    
    apiService.getStoryById(id,headers,function(data){
        console.log(data);
        $scope.story = data;
        $scope.story.url = 'http://alpha.peetch.co/peetch/#/story/'+$scope.story._id;
    });

    
    $scope.addPart = function()
    {
        if(!$rootScope.user)
        {   
            $location.path('/login');
        }
        else
        {
            if(!$scope.text)
                $scope.text="";
            if($scope.text.length>0 && $scope.text.length<1000) //Verify if the user wrote something in the box
            {
                var part = {'index':$scope.story.parts.length,'text':$scope.text,'author':$rootScope.user};
                $scope.story.parts.push(part);
                $scope.story.finished = $scope.story.parts.length==$scope.story.length;

                apiService.addPartToStory($scope.story._id,part,headers,function(data){
                    $scope.text = "";
                    $scope.story.error=null;
                },function(status,code){
                    console.error(status);
                    $scope.story.error=status.error;
                });
            }
            else
            {
                story.error="Votre contribution doit faire entre 1 et 1000 caractères";
            }
        }
    };
    
    $scope.addComment = function()
    {
        var com = {'text':$scope.comment,'author':$rootScope.user};
        $scope.story.comments.push(com);
        apiService.comment($scope.story._id,com,headers,function(data)
        {
            $scope.comment = "";
        });
    };
     $scope.voting = function(story,value)
     {
         var vote = {"value":value}
         apiService.vote($scope.story._id,vote,headers,function(data){
            $scope.story.votes = [vote];
            $scope.story.points += value;
        });
     };
    
    $scope.reporting = function(story)
     {
        apiService.report($scope.story._id,headers,function(data){
            console.log('reported');
        });
     };
    
    $scope.delete = function(story)
    {
        apiService.deletePart($scope.story._id,headers,function(data){
            $scope.story.parts.splice($scope.story.parts.length-1,1);
        },function(status,code){
            $scope.story.error=status.error;
        });
    };
});