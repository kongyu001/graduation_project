app.controller('DashboardController', function($scope, $http, $cookies) {
	
	/**
	 * 对图表进行配置
	 * @param {String} ev
	 * @param {string} 年月日时间
	 * @param {string} 页码
	 * @param {Object} 图表配置
	 * @param {String} 图表id
	 * @param {String} 数据url
	 * */
	$scope.getEchartsData = function(ev,time,pageNum, chartConfig,chartId,_url) {
		//先去除原先的active类,然后添加被点击按钮的active类
		var e = ev || window.event,
			tar = e.target || e.srcElement,
			$t = $(tar); 
		$t.parent().children().removeClass("active");
		$t.addClass("active");

		var chartOption = {
			title:{
				text:chartConfig.titleText,
				left:"center"
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			toolbox: {
				show: true
			},
			legend: {
				data: chartConfig.legendData,
				left:"right"
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				data: []
			},
			yAxis: {
				type: 'value'
			},
			series: [

				{
					name: chartConfig.seriesName1,
					type: 'bar',
					stack: '1',
					data: [],
					barWidth:30
				},
				{
					name: chartConfig.seriesName2,
					type: 'bar',
					stack: '1',
					data: [],
					barWidth:30
				}
			]
		};

		//拉取"图表"的数据
		simplePostData({
			"$http": $http,
			"url": _url,
			"$cookies": $cookies,
			"method": "GET",
			"params": "?pageNum=" + pageNum + "&pageSize=" + 4,
			"callbackFunction": function(response) {
				$scope.pageParams = getPageParams(response.pageNum, response.pages);
				chartOption.xAxis.data = response.data.result.map(function(a) {
					return a.user_name
				});
				chartOption.series[0].data = response.data.result.map(function(b) {
					return b.count_num
				})
				chartOption.series[1].data = response.data.result.map(function(c) {
					return c.count_card
				})

				/**
				 * 加载图表的内容
				 * @param {String} 图表的配置
				 * @param {String} 以及加载在div中的id
				 * */
				$scope.initChart = function(_option, id) {
					var myChart = echarts.init(document.getElementById('main' + id));
					myChart.setOption(_option);
				};
				$scope.initChart(chartOption, chartId);

			}
		});
	}
	
	/**
	 * 调用配置图表的函数
	 * @param {String} ev
	 * @param {string} 年月日时间
	 * */
	$scope.showEchart1=function(ev,time){
		chartConfig = {
			titleText: "个人统计表",
			legendData: ['查询商户款', '查询次数'],
			seriesName1:"查询商户款",
			seriesName2:"查询次数"
		}
		var _url="https://www.easy-mock.com/mock/5a27690ed2938d01f9d95f99/example/dashboard1"
		$scope.getEchartsData(ev, time,1, chartConfig,1,_url);
	}
	
	/**
	 * 调用配置图表的函数
	 * @param {String} ev
	 * @param {string} 年月日时间
	 * */
	 $scope.showEchart2=function(ev,time){
		chartConfig = {
			titleText: "商户统计表",
			legendData: ['查询款', '查询次数'],
			seriesName1:"查询款",
			seriesName2:"查询次数"
		}
		var _url="https://www.easy-mock.com/mock/5a27690ed2938d01f9d95f99/example/dashboard2"
		$scope.getEchartsData(ev, time, 1,chartConfig,2,_url);
	}
	
	$scope.showEchart1();
	$scope.showEchart2();
	
});



