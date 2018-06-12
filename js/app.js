var app =angular.module('QueryApp',['ui.router', 'ngCookies']);
    app.config(function($stateProvider,$urlRouterProvider){
    	$stateProvider
        .state("1",{
        	url:"/",
        	templateUrl:"pages/weibo.html",
        	controller:"WeiBoController"
        })
        .state("2",{
        	url:"/game",
        	templateUrl:"pages/game.html",
        	controller:"GameController"
        })
        .state("3",{
        	url:"/music",
        	templateUrl:"pages/music.html",
        	controller:"MusicController"
        })
         .state("5",{
        	url:"/edit",
        	templateUrl:"pages/edit.html",
        	controller:"EditController"
        });
        $urlRouterProvider.otherwise("/")

    });