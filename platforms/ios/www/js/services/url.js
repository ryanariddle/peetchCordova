app.service('urlService', function () {

    this.host = "https://peetch-api.herokuapp.com";
    //this.host = "http://localhost:3000";
    
    this.storyById      = function(id)  { return this.host+"/story/"+id;                    };
    this.userById       = function(id)  { return this.host+"/users/"+id;                    };
    this.vote           = function(id)  { return this.host + "/story/" + id + "/vote/";     }; 
    this.part           = function(id)  { return this.host + "/story/" + id + "/part/";     }; 
    this.comment        = function(id)  { return this.host + "/story/" + id + "/comment/";  };
    this.report         = function(id)  { return this.host + "/story/" + id + "/report/";   };
    this.authorStories  = function(id)  { return this.host+"/stories/author/" + id;         };
    this.storiesPage    = function(id)  { return this.host+"/stories/page/"+id;             };
    this.topStories     = function(id)  { return this.host+"/stories/top/page/"+id;         };
    this.triggers       = function()    { return this.host+"/triggers/";                    };
    
    this.stories        = function()    { return this.host+"/stories/";         };
    this.login          = function()    { return this.host+"/login/";           };
    this.reset          = function()    { return this.host+"/reset/";           };
    this.forgot         = function()    { return this.host+"/forgot/";          };
    this.me             = function()    { return this.host+"/me/";              };
    this.notifications  = function()    { return this.host+"/me/notifications"; };
    this.newNotifications  = function() { return this.host+"/me/notifications/new"; };
    this.signup         = function()    { return this.host+"/signup/";          };

    

    
});