app.controller('CreateController', function($scope,$rootScope,$location,$http,apiService,$translate) {
    if($rootScope.user)
    {
        var headers = { 'Authorization': "Bearer "+$scope.user.token, 'language': $translate.use() } ;   
        
        $scope.triggers = {"introduction":[],"internal":[],"conclusion":[]};
        $scope.story = {};
        $scope.story.length = 8;
        $scope.story.parts = []; 
        
        apiService.getTriggers(headers,function(data)
        {
            /*
            $scope.triggers.introduction = ['Il était une fois',
            'Un jour','Hier','Ce matin','En 1998','Il fut un temps','À une lointaine époque','Avant-hier à 12h55','Lundi dernier',
            "L'été dernier",'Tous les matins','Au bord de la mer','A Paris','En France','Dans le centre de la France','Le WE dernier','Mardi dernier','La semaine dernière',
            'Chaque dimanche','A minuit',"Un jour d'été","Un jour d'hiver",'Au premier jour du printemps','Tous les ans','Tous les mois','Toutes les heures',
            "Une nuit d'été",'Une nuit sous la neige','Le lundi au soleil',"Un soir d'automne",'Un soir de printemps','Par une nuit de grand vent',
            "Par une belle matinée d'hiver","Par une froide matinée d'hiver",'Un matin sous la pluie','Sous une pluie battante','Sous un soleil de plomb','Dans le desert'];

            $scope.triggers.internal = ['Tout à coup','Soudain',"C'est alors,",'Aussitôt','À cet instant','Brusquement',
            'Brutalement','Immédiatement','De façon imprévisible','Instantanément','Rapidement','Subitement','Mais,','Pendant ce temps là,',"C'est alors,",
            'Mais,','Pendant ce temps là,','Quand,','Quand soudain','Soudainement,','Car','Parce que','Mais un jour,','À cause de ça',
            "D'un seul coup","Sans que personne ne s'y attende","Tout d'un coup","Et c'est alors que",'Mais en fait'];

            $scope.triggers.conclusion = ['Finalement,','Du coup,',"Jusqu'à ce que",'Mais','Pour finalement',"Et c'est alors",'Malheureusement',
            'Heureusement',"C'est ainsi",'En fin de compte','Finalement,','Et à la fin','Enfin','Mais après tout','Au final','Mais il se trouvait que',
            'À la fin'];*/
            console.log(data);
            data.forEach(function(item,index,array){
                if(item.location=="introduction")
                    $scope.triggers.introduction.push(item.trigger);
                else if(item.location=="internal")
                    $scope.triggers.internal.push(item.trigger);
                else if(item.location=="conclusion")
                    $scope.triggers.conclusion.push(item.trigger);
                
            });

            console.log($scope.triggers);
            $scope.introduction =  $scope.triggers.introduction[Math.floor(Math.random() * $scope.triggers.introduction.length)];
            $scope.conclusion = $scope.triggers.conclusion[ Math.floor(Math.random() * $scope.triggers.conclusion.length)];
            $scope.reloadTriggers();
        });

    
    $scope.reloadTriggers = function()
    {
        console.log($scope.story.length);
        $scope.internal = [];
        var number = 1;
        if($scope.story.length==16)
            number = 3;
        else if($scope.story.length==32)
            number = 7;
        
        for(i=0;i<number;i++)
        {
            $scope.internal.push($scope.triggers.internal[ Math.floor(Math.random() * $scope.triggers.internal.length)]);
        }
        console.log($scope.introduction);
        $scope.story.triggers = [$scope.introduction].concat($scope.internal.concat([$scope.conclusion]));
        console.log($scope.story.triggers);
    }
    
    
        

        //$scope.story.parts.push({'text' :"C'est alors que ",'author':$scope.user._id});
        $scope.createStory = function()
        {
            $scope.story.parts[0].author = $rootScope.user._id;
            $scope.story.author = $rootScope.user._id;
            
            apiService.createStory($scope.story,headers,function(data){
                $location.path("/story/"+data._id);
            },function(status,code){
                console.log(code);
                if(code==422)
                {$scope.error = "Votre histoire est incomplète";}    
                else if(code==404 || code == 500)
                {$scope.error = "Problème de connexion avec le serveur";}
            });
        };
    }
     else
     {
         $location.path('/');
     }
});