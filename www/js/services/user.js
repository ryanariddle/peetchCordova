app.service('userService', ['$window', '$rootScope', '$route', '$location', "$timeout", function ($window, $rootScope, $route, $location, $timeout) {

    this.setLang = function(lang)
    {
        if (typeof lang !== 'undefined') {
            $window.localStorage.lang = lang;
            console.log($window.localStorage.lang);
            $rootScope.lang = lang;
            return true;
        }
        else
        {
            return false;
        }
    };
    
    this.getLang = function()
    {
        if ($window.localStorage.lang && $window.localStorage.lang !== null) {
            try {
                return $window.localStorage.lang;
            } catch (e) {
                console.log('lang not in storage, will try to fetch');
            }
        }
    };
    
    this.getUser = function () {
        if ($window.localStorage.user && $window.localStorage.user !== null) {
            var user = null;
            try {
                return JSON.parse($window.localStorage.user);
            } catch (e) {
                console.log('user not in storage, will try to fetch');
            }
        }
    };

    this.setUser = function (user) 
    {
        console.log("mon service marche!!");
        if (typeof user !== 'undefined') {
            $window.localStorage.user = JSON.stringify(user);
            $rootScope.user = user;
            return true;
        }
        else
        {
            return false;
        }
    };

    this.emptyStorage = function () 
    {
        $rootScope.user = null;
        delete $window.localStorage.user;
    };
}]);