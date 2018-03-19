app.controller('IndexController', function($rootScope, $scope, $http, $location, $cookies) {
	$scope.getNavItemClass = function(path) {
		var url = $location.url();
		if(url == "home") {
			url = "/"
		}
		if(url == "/product_detail") {
			url = "/product"
		}
		if(url == path) {
			//TODO: 加载页面时会频繁触发，为什么？
			return "active";
		}
		return "";
	};
	
//	$rootScope.queryType=0
	$scope.fiveMintesQuery=function(){
		$rootScope.queryType=0
	}
	
	$scope.monthMintesQuery=function(){
		$rootScope.queryType=1
	}
	
	//判断是否已登录
//	var token = $cookies.get("token");
//	$scope.realName=$cookies.get("realName");
//	var userId = $cookies.get("userId");
//	var nonce = $cookies.get("nonce");
//	
//	if(token==undefined){
//		window.location.href = "login.html";
//	}
//	
//	if(token != null) {
//		$scope.userHasLogin = true;
//		toastr.success('登录成功！');
//	} else {
//		$scope.userHasLogin = false;
//		window.location.href = "login.html";
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
});