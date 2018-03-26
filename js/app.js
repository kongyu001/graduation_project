var app =angular.module('QueryApp',['ui.router', 'ngCookies']);
    app.config(function($stateProvider,$urlRouterProvider){
    	$stateProvider
        .state("1",{
        	url:"/",
        	templateUrl:"pages/1.html",
        	controller:"QueryController"
        })
        .state("2",{
        	url:"/2",
        	templateUrl:"pages/2.html",
        	controller:"QueryController"
        })
        .state("3",{
        	url:"/3",
        	templateUrl:"pages/3.html",
        	controller:"QueryController"
        })
        .state("4",{
        	url:"/4",
        	templateUrl:"pages/3.html",
        	controller:"QueryController"
        });
        $urlRouterProvider.otherwise("/")
//      $routeProvider
//      .when('/',{
//      	templateUrl:"pages/query.html",
//      	controller:"QueryController"
//      })
//      .when('/dataBase',{
//      	templateUrl:"pages/dataBase.html",
//      	controller:"DataBaseController"
//      })
//      .when('/dashboard',{
//      	templateUrl:"pages/dashboard.html",
//      	controller:"DashboardController"
//      })
//       .when('/day',{
//      	templateUrl:"pages/day.html",
//      	controller:"DayController"
//      })
//      .otherwise({redirectTo:'/'});
    });