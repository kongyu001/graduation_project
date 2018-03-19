var nonce = $.cookie('nonce');
var app =angular.module("QueryMonitorApp",["ui.router", "ngCookies"]);
    app.config(function($stateProvider,$urlRouterProvider){
        $stateProvider
        .state("day",{
        	url:"/",
        	templateUrl:"pages/day.html",
        	controller:"QueryController"
        })
        .state("month",{
        	url:"/month",
        	templateUrl:"pages/day.html",
        	controller:"QueryController"
        });
        $urlRouterProvider.otherwise("/")
    });
    
