app.controller('DataBaseController', function($scope, $http, $cookies) {
	/**
	 * 初始化样式
	 * */
	$('#treeDemo').css({
		'border'     :'1px solid #dddddd',
		'min-height' :'560px'
	})
	// 重置列表选择菜单的高
	$scope.resizeQueryList = function(){
		var bh = Number($('body').height())-150,
			th = Number($('#database-right').height())-50;
		$('#treeDemo').css('height',(bh>th?bh:th)+"px");
	}
	$scope.resizeQueryList();
	$(window).resize(function(){
		$scope.resizeQueryList();
	})
	
	/**
	 * 配置ztree
	 **/
		var setting = {	};
		var zNodes =[
			{ name:"数据库1",
				children: [
					{ name:"数据表1 "},
					{ name:"数据表2 "},
					{ name:"数据表3"},
					{ name:"数据表4"},
					{ name:"数据表5"},
					{ name:"数据表6"},
					{ name:"数据表7"},
				]},
			{ name:"数据库2",
				children: [
					{ name:"数据表1"},
					{ name:"数据表2 "},
					{ name:"数据表3"},
					{ name:"数据表4"}
				]},
			{ name:"数据库3", isParent:true}

		];
		$scope.initZtree=function(){
			$(document).ready(function(){
				$.fn.zTree.init($("#treeDemo"), setting, zNodes);
			});
		}
		$scope.initZtree();
		
		
	/**
	 * 获取数据表的内容
	 * @param {String} 页码数
	 * */
	$scope.getDataTable=function(pageNum){
		if(pageNum == undefined) {
			pageNum = 1;
		}
		simplePostData({
			"$http": $http,
			"url": "https://www.easy-mock.com/mock/5a27690ed2938d01f9d95f99/example/dataTable",
			"$cookies": $cookies,
			"method": "GET",
			"params": "?pageNum=" + pageNum + "&pageSize=" + 4,
			"callbackFunction": function(response) {
				$scope.groups=response.cluster;
				$scope.pageParams = getPageParams(response.pageNum, response.pages);
				$scope.contents=response.data;
				}
		})
	}
	$scope.getDataTable();
	
	/**
	 * 点击集群名,使下拉框上显示你所点击的集群名
	 * @param {string} 你所点击的集群名
	 * */
	$scope.clickName="集群名";
	$scope.groupClick=function(data){
		$scope.clickName=data;
	}
	
})