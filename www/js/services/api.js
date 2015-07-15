app.service('apiService', ["$http","urlService", function ($http,urlService) {

    
    this.getStories = function(offset,headers,success)
    {
        $http({
            method: "get",
            url: urlService.storiesPage(offset),
            headers: headers
        }).success(success);
    };
    
    this.getTopStories = function(offset,headers,success)
    {
        $http({
            method: "get",
            url: urlService.topStories(offset),
            headers: headers
        }).success(success);
    };
    
    this.getAuthorStories = function(id,headers,success)
    {
        $http({
            method: "get",
            url: urlService.authorStories(id),
            headers: headers
        }).success(success);
    };
    this.getStoryById = function(id, headers, success)
    {
        $http({
            method:"get",
            url:urlService.storyById(id),
            headers:headers
          }).success(success);
    };
    
    this.getTriggers = function(headers, success)
    {
        $http({
            method:"get",
            url:urlService.triggers(),
            headers:headers
          }).success(success);
    };
    
    this.vote = function(id,vote,headers,success)
    {
        $http({
            method: "put",
            url: urlService.vote(id),
            headers: headers,
            data: vote
        }).success(success);
    };
    
    this.report = function(id,headers,success)
    {
        $http({
            method: "put",
            url: urlService.report(id),
            headers: headers
        }).success(success);
    };
    
    this.comment = function(id,comment,headers,success)
    {
        $http({
            method: "put",
            url: urlService.comment(id),
            headers: headers,
            data: comment
        }).success(success);
    };
    
    this.addPartToStory = function(id,part,headers,success,error)
    {
        $http({
                method: "put",
                url: urlService.storyById(id),
                headers: headers,
                data: part
            }).success(success).error(error);
    };
    
    this.createUser = function(user,success,error)
    {
        $http({
            method:"post",
            url:urlService.signup(),
            data:user
        }).success(success).error(error);
    };
    
    this.getUserById = function(id,headers,success)
    {
        $http({
            method: "get",
            url: urlService.userById(id),
            headers: headers
        }).success(success);
    };
    
    this.updateProfile = function(data,headers,success)
    {
        $http({
            method: "put",
            url: urlService.me(),
            headers: headers,
            data: data
        }).success(success);
    };
    
    this.createStory = function(story,headers,success,error)
    {
        $http({
            method: "post",
            url: urlService.stories(),
            headers: headers,
            data: story
        }).success(success).error(error);
    };
    
    this.login = function(data,success,error)
    {
        $http({
            method: "post",
            url: urlService.login(),
            data: data
        }).success(success).error(error);
    };
    
    this.resetPassword = function(data,success,error)
    {
        $http({
            method: "post",
            url: urlService.reset(),
            data: data
        }).success(success).error(error);
    };
    
    this.forgotPassword = function(data,success,error)
    {
        $http({
            method: "post",
            url: urlService.forgot(),
            data: data
        }).success(success).error(error);
    };
    
    this.deletePart = function(id,headers,success,error)
    {
        $http({
            method: "delete",
            url: urlService.part(id),
            headers:headers
        }).success(success).error(error);
    };
    
    this.getNotifications = function(headers,success,error)
    {
        $http({
            method: "get",
            url: urlService.notifications(),
            headers:headers
        }).success(success).error(error);
    };
    
}]);