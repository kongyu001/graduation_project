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
        .state("4",{
        	url:"/video",
        	templateUrl:"pages/video.html",
        	controller:"VideoController"
        });
        $urlRouterProvider.otherwise("/")

    });