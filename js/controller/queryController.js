app.controller('QueryController', function($scope, $http, $cookies) {
	/**
	 * 隐藏加载动画
	 * 隐藏执行结果表格
	 * 隐藏执行失败提示
	 * */
	$scope.loading=1;
	$scope.hideTable=1;
	$scope.failExecute=1;
	
	/**
	 * 初始化样式
	 * */
	$('#queryList').css({
		'border'     :'1px solid #dddddd',
		'min-height' :'460px'
	})
	
	/**
	 * 重置列表选择菜单的高
	 * */ 
	$scope.resizeQueryList = function(){
		var bh = Number($('body').height())-150,
			th = Number($('#query-right').height())-50;
		$('#queryList').css('height',(bh>th?bh:th)+"px");
	}
	$scope.resizeQueryList();
	$(window).resize(function(){
		$scope.resizeQueryList();
	})
	
	/**
	 * 标签被点击
	 * @param {int} 被点击标签的id
	 * */
	$scope.itemClick=function(id) {
		setTimeout(function(){
					$('#queryList .list-group-item[data-nodeid]').removeClass('active');
					$('#queryList .list-group-item[data-nodeid="'+id+'"]').addClass('active');
				},50);
	}
	
	/**
	 * 加载query查询列表
	 * */
	$scope.groupName="集群名";
	$scope.preSelect = {};
	$scope.nowQuery = {};
	$scope.loadlist = function(focusId) {
		simplePostData({
			"$http": $http,
			"url": HOST_URL + "/query/list",
			"$cookies": $cookies,
			"method": "GET",
			"callbackFunction": function(response) {
				
				if(focusId !== undefined){
					$scope.nowQuery = response.data.filter(function(queryObj){
										return queryObj.id === focusId?queryObj:false;
								})[0];
				}else if(response.data.filter(function(queryObj){return queryObj.id === $scope.nowQuery.id?queryObj:false;}).length !== 1)
				{
					$scope.nowQuery = response.data[0];
				}else{
				}
				
				$scope.queryList = response.data;
				$scope.clusterList = response.cluster;
				$scope.itemClick($scope.nowQuery.id);
				$scope.queryItem($scope.nowQuery);
			}
		});
	}
	$scope.loadlist();
	
	/**
	 * 点击查询单个query项目
	 * @param {Object} query对象
	 * @param {event} 点击事件
	 **/
	$scope.queryItem=function(queryObj,event){
		$scope.loading=1;//点击后,隐藏正在进行的loading
		$scope.failExecute=1;
		var ev = event || window.event || {},
			tar = ev.target || ev.srcElement,
			$tar = $(tar);
		if($tar.hasClass('list-group-delete')){
			swal({   
	            title: "",   
	            text: "确定要删除查询项“"+queryObj.name+"”吗?",   
	            type: "warning",   
	            showCancelButton: true,   
	            confirmButtonColor: "#DD6B55",   
	            confirmButtonText: "确认",   
	            cancelButtonText: "取消",   
	            closeOnConfirm: true,   
	            closeOnCancel: true 
	        }, function(){   
	        	simplePostData({
					"$http": $http,
					"url": HOST_URL + "/query/delete",
					"$cookies": $cookies,
					"method": "POST",
					"data":{
							"id":queryObj.id
					},
					"callbackFunction": function(response) {
						toastr.success('删除成功！')
						$scope.loadlist();
					}
				});
	        });
		}else{
			$scope.nowQuery = queryObj;
			simplePostData({
				"$http": $http,
				"url":HOST_URL + "/query/"+queryObj.id,
				"$cookies": $cookies,
				"method": "GET",
				"data":{
					"id":queryObj.id
				},
				"callbackFunction": function(response) {
					$scope.query = response.data;
					$scope.codes=$scope.query.code;
					$scope.content=$scope.query.code;
					$scope.textOut($("#code"));
				}
			});
		}
	}
	
	/**
	 * 点击集群名,同时使下拉框上显示你所点击的集群名
	 * @param {string} 集群名
	 * @param {string} 集群id
	 * */
	$scope.groupClick=function(data,id){
		$scope.groupName=data;
		$scope.getclusterID=id;
	}
	
	
	/**
	 * 新增一个code模式框
	 * @param {Object} 代码框
	 **/
	$scope.textOut=function($dom){
		// 多参数,遍历执行
		if($dom.length>0){
			$dom.each(function(){
				var $t = $(this);
				setTimeout(function(){
					// 如果有解析好的code模式框,清除该框
					if($t.next().hasClass('CodeMirror')){
					   $t.next().remove();
					}
					// 解析textarea为code模式,同时对代码框进行配置
					$scope.editor = CodeMirror.fromTextArea($t[0], {
						mode: 'text/x-mariadb',
						lineNumbers: true,
						matchBrackets: true,
						smartIndent: true,
						hintOptions: {
							tables:{
								users: ["name", "score", "birthDate"],
								countries: ["name", "population", "size"]
							}
						},
						extraKeys: {
							"Ctrl-Space": "autocomplete"
						}
					});
				},10);
			});
		}
	}
	
	/**
	 * 定义代码输入框
	 * */
	$scope.textInput = function() {
		$scope.mime = 'text/x-mariadb'; // get mime type
		$scope.textOut($('#code'));
		$(".CodeMirror-scroll").hover(function() {
			$(this).get(0).style.cursor = "text";
		});
	}
	
	/**
	 * 新增query查询 
	 * */
	var count=1;
	$scope.add=function(){
			$("#queryList>li").each(function(i){
				if ($(this).attr('data-nodename')=="新建query项目"||$(this).attr('data-nodename')=="新建query项目"+count) {
					count=count+1;
				}
			});
			var newName = "";
			if (count>=2) {
				$scope.newName = "新建query项目"+count;
			} else{
				$scope.newName = "新建query项目";
			}
			simplePostData({
				"$http": $http,
				"url":HOST_URL+"/query",
				"$cookies": $cookies,
				"method": "POST",
				"data":{
					"data":{
						"name":$scope.newName,
						"code":''
					}
				},
				"callbackFunction": function(response) {
					console.log(response.data[response.data.length-1]);
					$scope.nowQuery.id=response.data[response.data.length-1].id;
					$scope.loadlist();
					$scope.itemClick($scope.nowQuery.id);
				}
			})
	}

	/**
	 * 保存修改后的query项目
	 * @param {Object} 保存的query对象
	 **/
	$scope.save=function(data){
		console.log(data);
		$scope.content = $scope.editor.getValue();
		simplePostData({
			"$http": $http,
			"url":HOST_URL+"/query/update",
			"$cookies": $cookies,
			"method": "POST",
			"data":{
				"data":{
					"name":data.name,
					"id":data.id,
					"code":$scope.content
				}
			},
			"callbackFunction": function(response) {
				toastr.success('保存成功！')
				
				if($scope.searchName){
					$scope.searchQuery($scope.searchName,data.id);
				}else{
					$scope.loadlist(data.id);
				}
				
			}
		})
	}
	
	/**
	 * 执行代码框内的代码
	 * */
	$scope.execute=function(pageNum){
		$scope.loading=0;
		$scope.noExecute=1;
		$scope.hideTable=1;
		if(pageNum == undefined) {
			pageNum = 1;
		}
		$scope.thHide=1;
		$scope.editor.save();
		$scope.content = document.getElementById("code").value;
		console.log($scope.content);
		simplePostData({
			"$http": $http,
			"url":HOST_URL +"/query/execute",
			"$cookies": $cookies,
			"method": "POST",
			"data":{
				"data":{
				"cluster_id":"123",
				"code":$scope.content
				}
			},
//			"params": "?pageNum=" + pageNum + "&pageSize=" + 4,
			"callbackFunction": function(response) {
				$scope.loading=1;
				$scope.failExecute=1;
				$scope.hideTable=0;
				console.log(response.data);
//				$scope.pageParams = getPageParams(response.pageNum, response.pages);
				$scope.theadNames = response.data.column;
				$scope.lists=response.data.table_data;
				$scope.resizeQueryList();
			},
			errorCallbackFunction:function(response){
				$scope.loading=1;
				$scope.failExecute=0;
				$scope.resizeQueryList();
				return true;
			}
		})
	}
	
	/**
	 * 搜索query项目
	 * @param {String}  输入的搜索内容  
	 * @param {int} focusId
	 * */
	$scope.searchQuery = function(searchName,focusId) {
		if (!searchName) {
			$scope.nowQuery.id=0;
			$scope.loadlist();
		}else{
			simplePostData({
				"$http": $http,
				"url": HOST_URL + "/query/search",
				"$cookies": $cookies,
				"method": "POST",
				"data":{
					"keyword":searchName
				},
				"callbackFunction": function(response) {
					console.log(response.data);
					$scope.queryList=response.data;
					$scope.codes=$scope.queryList[0]?$scope.queryList[0].code:'';
					$scope.textOut($("#code"));
					$scope.nowQuery = $scope.queryList[0];
					if(focusId !== undefined){
						$scope.nowQuery = $scope.queryList.filter(function(queryObj){
											return queryObj.id === focusId?queryObj:false;
										})[0];
					}
					$scope.preSelect.value = $scope.nowQuery.id;
					$scope.itemClick($scope.nowQuery.id);
					$scope.queryItem($scope.nowQuery);
				}
			});
		}	
	}
});