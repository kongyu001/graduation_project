app.controller('QueryController', function($rootScope,$scope, $http, $state, $cookies) {
	$scope.countStatForm = {
		"userNameList": null, //用户名列表
		"type": $rootScope.queryType, //是否按天查询
		"startDate": null, //开始时间
		"endDate": null, //结束时间
		"pageNum": 1,
		"pageSize": 8
	}
	//调用以上所有函数
	$scope.callAllFunctions = function() {
		$scope.getUserList();
		$scope.getNumberData("total");
		$scope.getNumberData("success");
		$scope.getNumberData("empty");
		$scope.getNumberData("error");
		$scope.getEchartsDataLine1();
		$scope.getEchartsDataLine2();
		$scope.getEchartsDataLine3();
		$scope.getEchartsDataDot();
		$scope.getTableData();
		$scope.getEchartsDataPie1();
		$scope.getEchartsDataPie2();
		$scope.getEchartsDataBar();
	}

	//获取用户列表
	$scope.getUserList = function() {
		simplePostData({
			"$http": $http,
			"url": HOST_URL + "/dashboard/users",
			"$cookies": $cookies,
			"method": "POST",
			"data": {
				"data": $scope.countStatForm
			},
			"callbackFunction": function(response) {
				$scope.userList = response.data;
				setTimeout(function() {
					$('#userList').selectpicker();
				}, 500);
			}
		});
	}

	/**
	 * 点击后"用户名"变为所点击的用户,同时获取所有该用户的数据,刷新页面
	 * @param {String} 所点击的用户名
	 * */
	$scope.userNameClick = function(user) {
		$scope.userName = user;
		var a = [];
		a.push(user);
		simplePostData({
			"$http": $http,
			"url": HOST_URL + "/dashboard/selectOptions",
			"$cookies": $cookies,
			"dataType": "json",
			"method": "POST",
			"data": {
				"data": $scope.countStatForm
			},
			"data": {
				"userNameList": a,
				"daily": true
			},
			"callbackFunction": function(response) {
				$scope.callAllFunctions()
			}
		});
	}

	/**
	 * 加载图表内容
	 * @param {String} 要加载的html的标签id
	 * @param {Object} 图表的配置
	 * */
	$scope.initChart = function(id, _option) {
		var myChart = echarts.init(document.getElementById('main' + id));
		myChart.setOption(_option);
	};

	/**
	 * 配置第一类图表 曲线1,并生成
	 * @param {String} 要加载的html的标签id
	 * @param {Object} 图表的配置
	 * */
	$scope.configEchartDataLine = function(mainId, chartConfig) {
		var chartsOption = {
			title: {
				text: chartConfig.title
			},
			legend: {
				data: chartConfig.legendData,
				right: 50
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
			xAxis: {
				type: 'category',
				data: chartConfig.xAxisData,
			},
			yAxis: {
				type: 'value'
			},
			series: chartConfig.series
		};
		$scope.initChart(mainId, chartsOption);
	};

	/**
	 * 配置第一类图表 曲线2,并生成
	 * @param {String} 要加载的html的标签id
	 * @param {Object} 图表的配置
	 * */
	$scope.configEchartDataLine2 = function(mainId, chartConfig) {
		var chartsOption = {
			title: {
				text: chartConfig.title,
				textStyle: {
					fontSize: '12',
					fontWeight: '400'
				}
			},
			legend: {
				data: chartConfig.legendData,
				right: 20
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'line' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: {
				x: 25,
				y: 30,
				x2: 30,
				y2: 50,
				borderWidth: 1
			},
			xAxis: {
				type: 'category',
				data: chartConfig.xAxisData,
			},
			yAxis: {
				type: 'value'
			},
			series: chartConfig.series
		};
		$scope.initChart(mainId, chartsOption);
	};

	/**
	 * 配置第二类图表  y轴柱状图,并生成
	 * @param {String} 要加载的html的标签id
	 * @param {Object} 图表的配置
	 * */
	$scope.configEchartDataBar = function(mainId, chartConfig) {
		var chartsOption = {
			legend: {
				data: chartConfig.legendData,
				left: "right"
			},
			grid: {
				x: 60,
				y: 20,
				x2: 35,
				y2: 80,
				borderWidth: 1
			},
			tooltip: {
				trigger: 'axis',
				formatter: "{b} : {c}",
				axisPointer: {
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			yAxis: {
				type: 'category',
				data: chartConfig.yAxisData,
			},
			xAxis: {
				type: 'value'
			},
			series: [{
				data: chartConfig.xAxisData,
				type: 'bar',
				barWidth: 20

			}]
		};
		$scope.initChart(mainId, chartsOption);
	}

	/**
	 * 配置第三类图表 环图,并生成
	 * @param {String} 要加载的html的标签id
	 * @param {String} 其中一个配置项的值
	 * @param {String} 其中一个配置项的值
	 * @param {String} 其中一个配置项的值
	 * */
	$scope.configEchartDataPie1 = function(mainId, errorCnt, succCnt, emptyCnt) {
		var chartsOption = {
			tooltip: {
				trigger: 'item',
				formatter: "{b}:{d}%"
			},
			series: [{
					name: '访问来源',
					type: 'pie',
					radius: ['50%', '70%'],
					avoidLabelOverlap: false,
					label: {
						normal: {
							show: false,
							position: 'center'
						},
						emphasis: {
							show: false,
							formatter: "{b}  \n {d}%",
							textStyle: {
								fontSize: '25',
								fontWeight: '400'
							}
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data: [{
							value: errorCnt,
							name: "异常"
						},
						{
							value: succCnt,
							name: '查得'
						}, {
							value: emptyCnt,
							name: '查空'
						}
					],
					color: ['#f90404', '#96C93C', '#FFCF00'], //显示的圆环百分比颜色
				},
				{

					type: 'pie',
					radius: ['0%', '0%'],
					center: ['50%', '50%'],
					selectedMode: 'false',
					hoverAnimation: true,
					silent: true,
					data: [{
						value: 1
					}],
					label: {
						normal: {
							show: true,
							formatter: "查得" + "\n" + succCnt + "%",
							position: 'center',
							textStyle: {
								fontSize: 30,
								fontWeight: '400',
								color: '#96C93C' //圆心字体颜色
							}
						}
					}
				}
			]
		};
		$scope.initChart(mainId, chartsOption);
	};

	/**
	 * /配置第三类图表 环图,并生成
	 * @param {String} 要加载的html的标签id
	 * @param {Object} 图表的配置
	 * */
	$scope.configEchartDataPie2 = function(mainId, chartConfig) {
		var chartsOption = {
			tooltip: {
				trigger: 'item',
				formatter: "{b}: {d}%"
			},
			legend: {
				orient: 'vertical',
				x: 'left',
			},
			series: [{
				type: 'pie',
				radius: ['50%', '70%'],
				avoidLabelOverlap: false,
				label: {
					normal: {
						show: false,
						position: 'center'
					},
					emphasis: {
						show: false,
						formatter: "{b}  \n {d}%",
						textStyle: {
							fontSize: '30',
							fontWeight: 'bold'
						}
					}
				},
				labelLine: {
					normal: {
						show: false
					}
				},
				data: chartConfig.data,
				color: ['#977aea', '#5537ab', '#200961', '#4c0efb', '#2a1663'], //显示的圆环百分比颜色
			}, {

				type: 'pie',
				radius: ['0%', '0%'],
				center: ['50%', '50%'],
				selectedMode: 'false',
				hoverAnimation: true,
				silent: true,
				data: [{
					value: 1
				}],
				label: {
					normal: {
						show: true,
						position: 'center',
						formatter: chartConfig.data[0].name + "\n" + chartConfig.data[0].value + "%",
						textStyle: {
							fontSize: 30,
							fontWeight: '400',
							color: '#5537ab' //圆心字体颜色
						}
					}
				}
			}]
		};
		$scope.initChart(mainId, chartsOption);
	};

	/**
	 * 配置第四类图表 点图,并生成
	 * @param {String} 要加载的html的标签id
	 * @param {Array}  图表的data项
	 * */
	$scope.configEchartDataDot = function(mainId, data) {
		var chartsOption = {
			tooltip: {
				trigger: 'axis',
				formatter: "{b}:<br/> {c} ",
				axisPointer: {
					type: 'line' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			xAxis: {},
			yAxis: {},
			series: [{
				symbolSize: 3,
				data: data,
				type: 'scatter',
			}]
		};
		$scope.initChart(mainId, chartsOption);
	}

	//------------------------------------------------配置完毕-----------------------------------------------

	//获取 第1页的第1个图---数字图的数据,并生成
	$scope.numberList = new Map();
	
	$scope.getNumberData = function(numberUrl) {
		simplePostData({
			"$http": $http,
			"url": HOST_URL + "/dashboard/" + numberUrl,
			"$cookies": $cookies,
			"method": "POST",
			"data": {
				"data": $scope.countStatForm
			},
			"callbackFunction": function(response) {
				$scope._name = response.data.value;
				$scope.numberList.set(numberUrl, response.data.value);
			}
		});
	}

	//获取 第1页的第2个图---曲线图的数据,并调用生成函数
	$scope.getEchartsDataLine1 = function() {
		simplePostData({
			"$http": $http,
			"url": HOST_URL + "/dashboard/queryCurve",
			"$cookies": $cookies,
			"method": "POST",
			"data": {
				"data": $scope.countStatForm
			},
			"callbackFunction": function(response) {
				if(response.data.length == 0) {
					$('#main12').css("visibility", "hidden");
				} else {
					$('#main12').css("visibility", "visible");
				chartLineLegend = response.data.legend;
				chartLinexAxis = response.data.xAxis;
				chartLineSeries = response.data.series;
				chartConfig = {
					legendData: chartLineLegend,
					xAxisData: chartLinexAxis,
					series: [{
						data: chartLineSeries[0].data,
						name: chartLineSeries[0].name,
						type: 'line',
						smooth: true
					}, {
						data: chartLineSeries[1].data,
						name: chartLineSeries[1].name,
						type: 'line',
						smooth: true
					}, {
						data: chartLineSeries[2].data,
						name: chartLineSeries[2].name,
						type: 'line',
						smooth: true
					}, {
						data: chartLineSeries[3].data,
						name: chartLineSeries[3].name,
						type: 'line',
						smooth: true
					}]
				}
				$scope.configEchartDataLine(12, chartConfig);}
			}
		});
	}

	//获取 第1页的第3个图---点图的数据,并调用生成函数
	$scope.getEchartsDataDot = function() {
		simplePostData({
			"$http": $http,
			"url": HOST_URL + "/dashboard/queryDistribution",
			"$cookies": $cookies,
			"method": "POST",
			"data": {
				"data": $scope.countStatForm
			},
			"callbackFunction": function(response) {
				if(response.data.length == 0) {
					$('#main13').css("visibility", "hidden");
				} else {
					$('#main13').css("visibility", "visible");
				chartConfig = response.data;
				$scope.configEchartDataDot(13, chartConfig);}
			}
		});
	}

	//获取 第二页的第一个图---环图的数据,并调用生成函数
	$scope.getEchartsDataPie1 = function() {
		simplePostData({
			"$http": $http,
			"url": HOST_URL + "/dashboard/queryPercentage",
			"$cookies": $cookies,
			"method": "POST",
			"data": {
				"data": $scope.countStatForm
			},
			"callbackFunction": function(response) {
				if(response.data.length == 0) {
					$('#main21').css("visibility", "hidden");
				} else {
					$('#main21').css("visibility", "visible");
				errorCnt = response.data[0].errorCnt;
				succCnt = response.data[0].succCnt;
				emptyCnt = response.data[0].emptyCnt;
				$scope.configEchartDataPie1(21, errorCnt, succCnt, emptyCnt);}
			}
		});
	}

	//获取 第2页的第2个图---曲线图的数据,并调用生成函数
	$scope.getEchartsDataLine2 = function() {
		simplePostData({
			"$http": $http,
			"url": HOST_URL + "/dashboard/slowQuery",
			"$cookies": $cookies,
			"method": "POST",
			"data": {
				"data": $scope.countStatForm
			},
			"callbackFunction": function(response) {
				if(response.data.length == 0) {
					$('#main21').css("visibility", "hidden");
				} else {
					$('#main21').css("visibility", "visible");
				chartLineLegend = response.data.legend;
				chartLinexAxis = response.data.xAxis;
				chartLineSeries = response.data.series;

				chartConfig = {
					legendData: chartLineLegend,
					xAxisData: chartLinexAxis,
					series: [{
						data: chartLineSeries[0].data,
						name: chartLineSeries[0].name,
						type: 'line',
						smooth: true
					}, {
						data: chartLineSeries[1].data,
						name: chartLineSeries[1].name,
						type: 'line',
						smooth: true
					}, {
						data: chartLineSeries[2].data,
						name: chartLineSeries[2].name,
						type: 'line',
						smooth: true
					}]
				}
				$scope.configEchartDataLine(22, chartConfig);}
			}
		});
	}

	//获取 第2页的第3个图---表格的数据并生成
	$scope.getTableData = function() {
		simplePostData({
			"$http": $http,
			"url": HOST_URL + "/dashboard/slowQueryUser",
			"$cookies": $cookies,
			"method": "POST",
			"data": {
				"data": $scope.countStatForm
			},
			"callbackFunction": function(response) {
				$scope.list = response.data;
				var allNormalCnt = response.data.map(function(a){
					return a.normalCnt;
				});
				var allLongCnt=response.data.map(function(a){
					return a.tooLongCnt;
				});
				var allSlowCnt=response.data.map(function(a){
					return a.slowCnt;
				})
				$scope.normalAll=$scope.longAll=$scope.slowAll=0
				for (var i=0;i<allNormalCnt.length;i++) {
					$scope.normalAll+=parseInt(allNormalCnt[i]);
					$scope.longAll+=parseInt(allLongCnt[i]);
					$scope.slowAll+=parseInt(allSlowCnt[i]);
				}
			}
		});
	}

	//获取 第3页的第一个图---环图的数据,并调用生成函数
	$scope.getEchartsDataPie2 = function() {
		simplePostData({
			"$http": $http,
			"url": HOST_URL + "/dashboard/errorDistribution",
			"$cookies": $cookies,
			"method": "POST",
			"data": {
				"data": $scope.countStatForm
			},
			"callbackFunction": function(response) {
				if(response.data.length == 0) {
					$('#main31').css("visibility", "hidden");
				} else {
					$('#main31').css("visibility", "visible");
					chartConfig = {
						data: response.data
					}
					$scope.configEchartDataPie2(31, chartConfig);
				}
			}
		});
	}

	//获取 第3页的第二个图---y轴柱状图的数据,并调用生成函数
	$scope.getEchartsDataBar = function() {
		simplePostData({
			"$http": $http,
			"url": HOST_URL + "/dashboard/errorTop5",
			"$cookies": $cookies,
			"method": "POST",
			"data": {
				"data": $scope.countStatForm
			},
			"callbackFunction": function(response) {
				if(response.data.xAxis.length == 0) {
					console.log("no data")
					$scope.dataMax=0;
					$('#main32').css("visibility", "hidden");
					chartConfig = {
						yAxisData: [response.data.xAxis],
						xAxisData: [],
					}
					$scope.configEchartDataBar(32, chartConfig);
				} else {
					$('#main32').css("visibility", "visible");
					$scope.dataMax = response.data.series[0].data[response.data.series[0].data.length - 1];
					chartConfig = {
						yAxisData: response.data.xAxis,
						xAxisData: response.data.series[0].data,
					}
					$scope.configEchartDataBar(32, chartConfig);
				}
			}
		});
	}

	//获取 第3页的第3个图---2*4的曲线图的数据,并调用生成函数
	$scope.getEchartsDataLine3 = function(pageNum) {
		if(pageNum == undefined) {
			pageNum = 1;
		}
		$scope.countStatForm.pageNum = pageNum;
		simplePostData({
			"$http": $http,
			"url": HOST_URL + "/dashboard/errorDetail",
			"$cookies": $cookies,
			"method": "POST",
			"data": {
				"data": $scope.countStatForm
			},
			"callbackFunction": function(response) {
				$scope.pageParams = getPageParams(response.data.pageNum, response.data.pageCount);
				var pageCount = response.data.pageCount;
				var errorDetail = response.data.data;
				for(var i = 0; i < response.data.data.length; i++) {
					$("#main33" + (i + 1)).css("visibility", "visible");
					chartConfig = {
						title: errorDetail[i].chartName,
						legendData: errorDetail[i].legend,
						xAxisData: errorDetail[i].xAxis,
						gridData: {
							x: 25,
							y: 30,
							x2: 15,
							y2: 50,
							borderWidth: 1
						},
						series: [{
							data: errorDetail[i].series[0].data,
							name: errorDetail[i].series[0].name,
							type: 'line',
							smooth: false
						}]
					}
					$scope.configEchartDataLine2('33' + (i + 1), chartConfig);
				}
				for(var i = response.data.data.length; i < 8; i++) {
					$("#main33" + (i + 1)).css("visibility", "hidden");
				}
			}
		});
	}

	$scope.callAllFunctions();
})