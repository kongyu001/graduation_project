app.controller('WeiBoController', function($scope, $http, $cookies, $cookieStore) {

	// 百度地图API功能
	var map = new BMap.Map("map", {
		enableMapClick: true,
		title: '微博热点分布'
	}); // 创建Map实例
	map.centerAndZoom(new BMap.Point(105.403119, 38.028658), 5); // 初始化地图,设置中心点坐标和地图级别
	map.enableScrollWheelZoom(false); // 开启鼠标滚轮缩放

	// 地图自定义样式
	map.setMapStyle({
		styleJson: [{
			"featureType": "water",
			"elementType": "all",
			"stylers": {
				"color": "#044161"
			}
		}, {
			"featureType": "land",
			"elementType": "all",
			"stylers": {
				"color": "#000000"
			}
		}, {
			"featureType": "boundary",
			"elementType": "geometry",
			"stylers": {
				"color": "#064f85"
			}
		}, {
			"featureType": "railway",
			"elementType": "all",
			"stylers": {
				"visibility": "off"
			}
		}, {
			"featureType": "highway",
			"elementType": "geometry",
			"stylers": {
				"color": "#004981"
			}
		}, {
			"featureType": "highway",
			"elementType": "geometry.fill",
			"stylers": {
				"color": "#005b96",
				"lightness": 1
			}
		}, {
			"featureType": "highway",
			"elementType": "labels",
			"stylers": {
				"visibility": "on"
			}
		}, {
			"featureType": "arterial",
			"elementType": "geometry",
			"stylers": {
				"color": "#004981",
				"lightness": -39
			}
		}, {
			"featureType": "arterial",
			"elementType": "geometry.fill",
			"stylers": {
				"color": "#000000"
			}
		}, {
			"featureType": "poi",
			"elementType": "all",
			"stylers": {
				"visibility": "off"
			}
		}, {
			"featureType": "green",
			"elementType": "all",
			"stylers": {
				"color": "#056197",
				"visibility": "off"
			}
		}, {
			"featureType": "subway",
			"elementType": "all",
			"stylers": {
				"visibility": "off"
			}
		}, {
			"featureType": "manmade",
			"elementType": "all",
			"stylers": {
				"visibility": "off"
			}
		}, {
			"featureType": "local",
			"elementType": "all",
			"stylers": {
				"visibility": "off"
			}
		}, {
			"featureType": "arterial",
			"elementType": "labels",
			"stylers": {
				"visibility": "off"
			}
		}, {
			"featureType": "boundary",
			"elementType": "geometry.fill",
			"stylers": {
				"color": "#029fd4"
			}
		}, {
			"featureType": "building",
			"elementType": "all",
			"stylers": {
				"color": "#1a5787"
			}
		}, {
			"featureType": "label",
			"elementType": "all",
			"stylers": {
				"visibility": "off"
			}
		}, {
			"featureType": "poi",
			"elementType": "labels.text.fill",
			"stylers": {
				"color": "#ffffff"
			}
		}, {
			"featureType": "poi",
			"elementType": "labels.text.stroke",
			"stylers": {
				"color": "#1e1c1c"
			}
		}, {
			"featureType": "administrative",
			"elementType": "labels",
			"stylers": {
				"visibility": "off"
			}
		}, {
			"featureType": "road",
			"elementType": "labels",
			"stylers": {
				"visibility": "on"
			}
		}]
	});

	$.get('data/weibo.json', function(rs) {
		console.log(rs);
		$cookieStore.put('weibo', 'rs')
		var data1 = [];
		var data2 = [];
		var data3 = [];
		var data4 = [];
		for(var i = 0; i < rs[0].length; i++) {
			var geoCoord = rs[0][i].geoCoord;
			data1.push({
				geometry: {
					type: 'Point',
					coordinates: geoCoord
				}
			});
		}

		for(var i = 0; i < rs[1].length; i++) {
			var geoCoord = rs[1][i].geoCoord;
			data2.push({
				geometry: {
					type: 'Point',
					coordinates: geoCoord
				},
				time: Math.random() * 10
			});
		}

		for(var i = 0; i < rs[2].length; i++) {
			var geoCoord = rs[2][i].geoCoord;
			data3.push({
				geometry: {
					type: 'Point',
					coordinates: geoCoord
				},
			});
		}
		//
		var text1 = {
			geometry: {
				type: 'Point',
				coordinates: geoCoord
			},
			text: '微博热点分布'
		}

		var dataSet = new mapv.DataSet(text1);
		var options = {
			draw: 'text',
			fillStyle: '#33ccff',
			//			size:12,
			font: '25px Arial',
			textAlign: 'top',
			avoid: true, // 开启文本标注避让
			textBaseline: 'middle',
			offset: { // 文本便宜值
				x: -100,
				y: -100
			}
		}
		var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);

		var dataSet = new mapv.DataSet(data1);
		var options = {
			fillStyle: 'rgba(37, 140, 249, 0.8)',
			bigData: 'Point',
			size: 0.7,
			draw: 'simple',
		}
		var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);

		var dataSet = new mapv.DataSet(data2);
		var options = {
			fillStyle: 'rgba(14, 241, 242, 0.8)',
			size: 0.7,
			bigData: 'Point',
			draw: 'simple',
		}
		var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);

		var dataSet = new mapv.DataSet(data3);
		var options = {

			fillStyle: 'rgba(255, 250, 250, 0.8)',
			size: 0.7,
			bigData: 'Point',
			draw: 'simple',
		}
		var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);

		var dataSet = new mapv.DataSet(data2);
		var options = {
			fillStyle: 'rgba(255, 250, 250, 0.3)',
			size: 1.1,
			draw: 'simple',
			bigData: 'Point',
			animation: {
				stepsRange: {
					start: 0,
					end: 10
				},
				trails: 1,
				duration: 6,
			}
		}
		var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
	});

	//标签选项卡
	(function($) {

		var tabs = $(".tabs li a");

		tabs.click(function() {
			var content = this.hash.replace('/', '');
			tabs.removeClass("active");
			$(this).addClass("active");
			$("#content").find('p').hide();
			$(content).fadeIn(200);
		});

	})(jQuery);

	/**
	 * 加载图表内容
	 * @param {String} 要加载的html的标签id
	 * @param {Object} 图表的配置
	 * */
	$scope.initChart = function(id, echartsOption) {
		var myChart = echarts.init(document.getElementById('weibo' + id));
		myChart.setOption(echartsOption);
	};

	/**
	 * 配置微博100热点扇形图,并生成
	 * @param {String} 要加载的html的标签id
	 * @param {Object} 图表的配置
	 * */
	$scope.configWeiboPie = function(weiboId, chartsConfig) {
		var chartsOption = {
			title: {
				text: chartConfig.title,
				textStyle: {
					fontSize: '20',
					fontWeight: '500'
				}
			},
			toolbox: {
				show: true,
				feature: {
					mark: {
						show: true
					},
					dataView: {
						show: true,
						readOnly: false
					},
					magicType: {
						show: true,
						type: ['pie', 'funnel'],
						option: {
							funnel: {
								x: '25%',
								width: '50%',
								funnelAlign: 'left',
								max: 800000
							}
						}
					},
					restore: {
						show: true
					},
					saveAsImage: {
						show: true
					}
				}
			},
			calculable: true,
			legend: {
				type: 'scroll',
				orient: 'vertical',
				data: chartConfig.legendData,
				right: 20,
				top: 25
			},
			tooltip: {
				//				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			series: [{
				type: 'pie',
				radius: '60%',
				center: ['50%', '50%'],
				data: chartConfig.seriesData,
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}]

		};
		$scope.initChart(weiboId, chartsOption);
	}

	/**
	 * 配置微博与GDP点图,并生成
	 * @param {String} 要加载的html的标签id
	 * @param {Object} 图表的配置
	 * */
	$scope.configWeiboDot= function(weiboId, chartsConfig) {
		var chartsOption = {
			title : {
		text : '签到数与GDP的关系散点图'
	},
	tooltip : {
		trigger : 'axis',
		showDelay : 0,
		axisPointer : {
			type : 'cross',
			lineStyle : {
				type : 'dashed',
				width : 1
			}
		}
	},
	legend : {
		data : ['地区']
	},
	toolbox : {
		show : true,
		feature : {
			mark : {
				show : true
			},
			dataZoom : {
				show : true
			},
			dataView : {
				show : true,
				readOnly : false
			},
			restore : {
				show : true
			},
			saveAsImage : {
				show : true
			}
		}
	},
	xAxis : [{
			type : 'value',
			scale : true,
			axisLabel : {
				formatter : '{value} 次'
			}
		}
	],
	yAxis : [{
			type : 'value',
			scale : true,
			axisLabel : {
				formatter : '{value} 亿'
			}
		}
	],
	series : [{
			name : '地区',
			type : 'scatter',
			 symbolSize: function (value){
			      var size=Math.round(value[0] /100000);
                  if(size>15)
			          size=15;
                    return size;
               },
			tooltip : {
				trigger : 'item',
				textstyle:{
					color:"#FFFFFF",
					fontFamily: 'Verdana, sans-serif',
					fontWeight: 'bold'
				},
				formatter : function (params) {
				    var city="";
					if (params.value.length > 1) {

					    chartsConfig.forEach(function (item) {
					      if(Number(item.checkin_num)==params.value[0])
					         city=item.name;
					    })
						return "<h4>"+city+':<\h4>'+"签到次数"+params.value[0]+'次<br>'+"GDP"+params.value[1] +'亿';
//

					} else {
						return params.seriesName + ' :<br/>'
						+params.name + ' : '
						+params.value + '亿';
					}
				}
				
			},
			data : (function () {
				var datas = [];
				chartsConfig.forEach(function (item) {
					var data = [Number(item.checkin_num), Number(item.gdp)];
					datas.push(data);
				});
				return datas;
			})()
		}
	]
};
		$scope.initChart(weiboId, chartsOption);

	}

	/**
	 * 配置微博重点城市数据图,并生成
	 * @param {String} 要加载的html的标签id
	 * @param {Object} 图表的配置
	 * */
	$scope.configWeiboCity=function(weiboId,chartsConfig){
		var chartsOption={
			title : {
		text : '重点城市可视化',
		left:20
	},
	tooltip : {
		trigger : 'axis'
	},
	legend : {
		data : ["GDP (十亿)", "POI数 (个)", '照片数 (十)', '人口 (百万)', '签到数 (百)']
	},
	toolbox : {
		show : true,
		feature : {
			mark : {
				show : true
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
	calculable : true,
	xAxis : [{
			type : 'category',
			'axisLabel':{'interval':0},
			data : (function () {
				var data = [];
				var i=0;
				chartsConfig.forEach(function (item) {
				   i++;
				   var name="";
				    i%2==0? name=item.name :name="\n"+item.name;
					data.push(name)
				})
				return data;
			})()
		}
	],
	yAxis : [{
			type : 'value'
		}
	],
	series : [{
			name : "GDP (十亿)",
			type : 'line',
			data : (function () {
				var data = [];
				chartsConfig.forEach(function (item) {
					data.push(Number(item.gdp) * 10)
				})
				return data;
			})()
		}, {
			name : "POI数 (个)",
			type : 'line',
			data : (function () {
				var data = [];
				chartsConfig.forEach(function (item) {
					data.push(Number(item.count))
				})
				return data;
			})()
		}, {
			name : "照片数 (十)",
			type : 'line',
			data : (function () {
				var data = [];
				chartsConfig.forEach(function (item) {
					data.push(Number(item.photo_num) / 10)
				})
				return data;
			})()
		}, {
			name : "人口 (百万)",
			type : 'line',
			data : (function () {
				var data = [];
				chartsConfig.forEach(function (item) {
					data.push(Number(item.pop) * 100)
				})
				return data;
			})()
		}, {
			name : "签到数 (百)",
			type : 'line',
			data : (function () {
				var data = [];
				chartsConfig.forEach(function (item) {
					data.push(Number(item.checkin_num) / 100)
				})
				return data;
			})()
		}
	]
		};
		$scope.initChart(weiboId, chartsOption);
	}
	
	//------------------------------------------------------------配置完毕----------------------------------------

	//获取微博的100热点扇形图数据，并调用生成函数
	$scope.getWeiboDataPie1 = function() {
		simplePostData({
			"$http": $http,
			"url": "https://www.easy-mock.com/mock/5a27690ed2938d01f9d95f99/data/weiboPieData",
			"$cookies": $cookies,
			"method": "GET",
			"callbackFunction": function(response) {
				console.log(response)
				chartConfig = {
					legendData: response.legend,
					title: "Top100类型百分比图",
					seriesData: response.data
				}
				$scope.configWeiboPie(1, chartConfig);
			}
		});

	}

	$scope.getWeiboDataPie2 = function() {
		simplePostData({
			"$http": $http,
			"url": "https://www.easy-mock.com/mock/5a27690ed2938d01f9d95f99/data/weiboPieData2",
			"$cookies": $cookies,
			"method": "GET",
			"callbackFunction": function(response) {
				console.log(response)
				chartConfig = {
					legendData: response.legend,
					title: "各省POI数量百分比",
					seriesData: response.data
				}
				$scope.configWeiboPie(2, chartConfig);
				
			}
		});

	}

	$scope.getWeiboDataDot = function() {
		simplePostData({
			"$http": $http,
			"url": "https://www.easy-mock.com/mock/5a27690ed2938d01f9d95f99/data/weiboGDP",
			"$cookies": $cookies,
			"method": "GET",
			"callbackFunction": function(response) {
				var chartConfig = response.data
				console.log(chartConfig)
				$scope.configWeiboDot(3, chartConfig);
				$scope.configWeiboCity(4,chartConfig);
			}
		});

	}

	$scope.callAllFunctions = function() {
		$scope.getWeiboDataPie1()
		$scope.getWeiboDataPie2()
		$scope.getWeiboDataDot()
	}
	$scope.callAllFunctions();
})