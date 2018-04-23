app.controller('IndexController', function($rootScope,$scope, $http, $location,$cookies) {
	$scope.getNavItemClass = function(path) {
		var url = $location.url();
		if(url == "/") {
			url = "/weibo";
		}
		if(url == path) {
			//TODO: 加载页面时会频繁触发，为什么？
			return "active";
		}
		return "";
	};
	
//	$scope.fiveMintesQuery=function(){
//		$rootScope.queryType=0
//	}
//	
//	$scope.monthMintesQuery=function(){
//		$rootScope.queryType=1
//	}
	//登出操作
	$scope.logout = function() {
		simplePostData({
			"$http":$http,
			"url":HOST_URL+"/logout",
			"$cookies":$cookies,
			"method":"GET",
			"callbackFunction":function(response) {
			}
		});
		$cookies.remove("token");
		$cookies.remove("userId");
		window.location.href = "login.html";
	}
})