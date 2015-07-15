//Define an angular module for our app
var app = angular.module('peetch', ['ngRoute','ngImgCrop','ngSocial','ngSanitize','infinite-scroll','pascalprecht.translate']);

 
//Define Routing for app
//Uri /AddNewOrder -> template add_order.html and Controller AddOrderController
//Uri /ShowOrders -> template show_orders.html and Controller AddOrderController



app.config(['$routeProvider','$translateProvider',
function($routeProvider,$translateProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'partials/stories.html',
        controller: 'StoriesController'
    }).
    when('/top', {
        templateUrl: 'partials/stories.html',
        controller: 'StoriesController'
    }).
       when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
    }).
    when('/reset/:email/:key', {
        templateUrl: 'partials/password.html',
        controller: 'PasswordController'
    }).
    when('/forgot', {
        templateUrl: 'partials/forgot.html',
        controller: 'PasswordController'
    }).
    when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupController'
    }).
    when('/profile', {
        templateUrl: 'partials/profile.html',
        controller: 'ProfileController'
    }).
    when('/profile/notifications', {
        templateUrl: 'partials/notifications.html',
        controller: 'ProfileController'
    }).
    when('/profile/:id', {
        templateUrl: 'partials/user.html',
        controller: 'UserController'
    }).
    when('/profile/:id/stories', {
        templateUrl: 'partials/stories.html',
        controller: 'StoriesController'
    }).
    when('/story/:id', {
        templateUrl: 'partials/story.html',
        controller: 'StoryController'
    }).
    when('/create', {
        templateUrl: 'partials/create.html',
        controller: 'CreateController'
    }).
      otherwise({
        redirectTo: '/'
      });
    
    $translateProvider.translations('en', {
        'POPULAR':'Popular',
        'MY_PEETCHS':'My Peetchs',
        'RECENT':'Recent',
        'CREATE':'Create',
        'PROFILE':'Profile',
        'FRIENDS':'Friends',
        'NOTIFICATIONS':'Notifications',
        'LOGOUT': 'Logout',
        'LOGIN':'Login',
        'SIGNUP':'Signup',
        'ALPHA': 'Alpha Version',
        'FEEDBACK':'To give us feedback',
        'SEND_MAIL':'send us an email',
        'CREATE_STORY':'Create a story',
        'STORY_CREATED':'The story has been successfully created!',
        'LENGTH':'Length of the story',
        'TITLE':'Title',
        'FORGOT':'Forgot your password?',
        'MAIL_SENT':'A mail has been sent to you!',
        'EMAIL':'Email',
        'SEND_MAIL':'Send an email',
        'USERNAME':'Username',
        'PASSWORD':'Password',
        'NO_NOTIFICATIONS':'You don\'t have any notifications',
        'FORGOTTEN':'Password forgotten',
        'PASSWORD_CHANGED':'Successfully changed your password',
        'CONFIRMATION':'Confirmation',
        'RESET_PASSWORD':'Reset',
        'REPORT':'Report',
        'TO_PEETCH':'Peetch!',
        'COMMENTS':'comments',
        'LATEST':'Latest',
        'OK':'OK',
        'BIO':'Bio',
        'SELECT_FILE':'Select an image file',
        'EDIT':'Edit',
        'SAVE': 'Save',
        'CREATE_ACCOUNT':'Create account',
        'ACCOUNT_CREATED':'Account successfully created!',
        'CONTRIBUTED': ' contributed to your story ',
        'COMMENTED': ' wrote a comment on your story ',
        'EXPAND':'Click to expand',
        'MUST_IMAGE':'Your file must be an image!',
        'NO_STORY':'No stories were found...'
    })
    .translations('fr', {
        'POPULAR':'Populaire',
        'MY_PEETCHS':'Mes Peetchs',
        'RECENT':'Nouveaux',
        'CREATE':'Créer',
        'PROFILE':'Profil',
        'FRIENDS':'Amis',
        'NOTIFICATIONS':'Notifications',
        'LOGOUT':'Déconnexion',
        'LOGIN':'Connexion',
        'SIGNUP':'Inscription',
        'ALPHA': 'Version Alpha',
        'FEEDBACK':'Pour nous faire vos retours',
        'SEND_MAIL':'envoyez nous un mail',
        'CREATE_STORY':'Créer une histoire',
        'STORY_CREATED':'Création de l\'histoire réussie !',
        'LENGTH':'Taille de l\'histoire',
        'TITLE':'Titre',
        'FORGOT':'Mot de passe oublié ?',
        'MAIL_SENT':'Un mail vous a été envoyé !',
        'EMAIL':'Email',
        'SEND_MAIL':'Envoyer un email',
        'USERNAME':'Nom d\'utilisateur',
        'PASSWORD':'Mot de passe',
        'NO_NOTIFICATIONS':'Vous n\'avez pas de notifications',
        'FORGOTTEN':'Mot de passe oublié',
        'PASSWORD_CHANGED':'Mot de passe changé avec succès!',
        'CONFIRMATION':'Confirmation',
        'RESET_PASSWORD':'Remise à zéro',
        'REPORT':'Signaler',
        'TO_PEETCH':'Peetcher !',
        'COMMENTS': 'commentaires',
        'LATEST':'Plus récents',
        'OK':'OK',
        'BIO':'Bio',
        'SELECT_FILE':'Sélectionnez un fichier image',
        'EDIT':'Editer',
        'SAVE':'Enregistrer',
        'CREATE_ACCOUNT':'Créer un compte',
        'ACCOUNT_CREATED':'Création du compte réussie !',
        'CONTRIBUTED': ' a contribué à votre histoire ',
        'COMMENTED': ' a commenté votre histoire ',
        'EXPAND':'Cliquer pour tout afficher',
        'MUST_IMAGE':'Votre fichier doit être une image !',
        'NO_STORY':'Aucune histoire n\'a été trouvé...'
    })
    .fallbackLanguage('en')
    .determinePreferredLanguage();
    
    //$translateProvider.rememberLanguage(true);
    
}]);

app.run([
      '$rootScope', function ($rootScope) {
          $rootScope.facebookAppId = '1620176758214483'; // set your facebook app id here
      }
  ]);
