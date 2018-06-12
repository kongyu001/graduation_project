app.controller('EditController', function($scope, $http, $cookies) {
	/**
	 * 隐藏加载动画
	 * 隐藏执行结果表格
	 * 隐藏执行失败提示
	 * */
	$scope.loading=1;
	$scope.hideTable=1;
	$scope.failExecute=1;
	
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
	 * 加载图表内容
	 * @param {String} 要加载的html的标签id
	 * @param {Object} 图表的配置
	 * */
	$scope.initChart = function(_option) {
		var myChart = echarts.init(document.getElementById('consult'));
		myChart.setOption(_option);
	};
	
	
	
	
	/**
	 * 执行代码框内的代码
	 * */
	$scope.execute=function(typeName){
		$scope.loading=1;
		$scope.noExecute=1;
		$scope.hideTable=1;
//		if(pageNum == undefined) {
//			pageNum = 1;
//		}
		$scope.thHide=1;
		$scope.editor.save();
		$scope.content = document.getElementById("code").value;
		console.log($scope.content);
		console.log(typeName);
		var yvalue=$scope.content.split(",");
		var xvalue=$scope.Xvalue.split(",");
		
		//配置过程
		var chartsOption = {
			title: {
				text: "您的图表："
			},
			legend: {
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				right: 10
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'line' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: {
				x: 80,
				y: 30,
				x2: 85,
				y2: 70,
				borderWidth: 1
			},
			toolbox : {
		show : true,
		feature : {
			mark : {
				show : false
			},
			dataView : {
				show : true,
				readOnly : false
			},
			magicType : {
				show : true,
				type : ['bar', 'line']
			},
			restore : {
				show : true
			},
			saveAsImage : {
				show : true
			}
		}
	},
			xAxis: {
				type: 'category',
				data: xvalue
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				data:yvalue,
				type:typeName
			}]
		};
		
		$scope.initChart(chartsOption);
		
	
	}
	
	
	
	
});