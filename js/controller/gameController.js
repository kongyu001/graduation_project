app.controller('GameController', function($scope, $http, $cookies) {
	var map, draw, interaction, listener, measureTooltipElement, helpTooltipElement, tooltipCoord, area;
	var raster = new ol.layer.Tile({
		source: new ol.source.OSM()
	});
	var source = new ol.source.Vector({
		wrapX: false
	});
	var vector = new ol.layer.Vector({
		source: source
	});
	url = (window.isLocal ? window.server : "http://support.supermap.com.cn:8090") + "/iserver/services/map-china400/rest/maps/China";
	map = new ol.Map({
		layers: [raster, vector],
		target: 'map',
		view: new ol.View({
			center: ol.proj.fromLonLat([115.4539, 35.27405]),
			zoom: 4,
			//					projection: 'EPSG:4326'
		})
	});
	var info = new ol.control.Control({
		element: document.getElementById('popup')
	});
	info.setMap(map);
	map.addControl(info);

	function createMeasureTooltip() {
		if(measureTooltipElement) {
			measureTooltipElement.parentNode.removeChild(measureTooltipElement);
		}
		measureTooltipElement = document.createElement('div');
		measureTooltipElement.className = 'tooltip tooltip-measure';
		measureTooltip = new ol.Overlay({
			element: measureTooltipElement,
			offset: [0, -15],
			positioning: 'bottom-center'
		});
		map.addOverlay(measureTooltip);
	}

	/**
	 * Creates a new help tooltip
	 */
	function createHelpTooltip() {
		if(helpTooltipElement) {
			helpTooltipElement.parentNode.removeChild(helpTooltipElement);
		}
		helpTooltipElement = document.createElement('div');
		helpTooltipElement.className = 'tooltip hidden';
		helpTooltip = new ol.Overlay({
			element: helpTooltipElement,
			offset: [15, 0],
			positioning: 'center-left'
		});
		map.addOverlay(helpTooltip);
	}

	var formatLength = function(line) {
		var length = ol.Sphere.getLength(line);
		var output;
		if(length > 100) {
			output = (Math.round(length / 1000 * 100) / 100) +
				' ' + 'km';
		} else {
			output = (Math.round(length * 100) / 100) +
				' ' + 'm';
		}
		return output;
	};

	var formatRadius = function(data, circle) {
		var length = data.getRadius(circle);
		var output;
		if(length > 100) {
			output = (Math.round(length / 1000 * 100) / 100) +
				' ' + 'km';
		} else {
			output = (Math.round(length * 100) / 100) +
				' ' + 'm';
		}
		return output;
	};

	var covertCoord = function(coord) {
		var arr = [];
		for(var i = 0; i < coord[0].length - 1; i++) {
			arr.push("经度：" + Math.round(ol.proj.transform(coord[0][i], 'EPSG:3857', 'EPSG:4326')[0] * 10000) / 10000 + " ");
			arr.push("纬度：" + Math.round(ol.proj.transform(coord[0][i], 'EPSG:3857', 'EPSG:4326')[1] * 10000) / 10000 + "<br>");
		}
		return arr;
	}

	var buttons = $('.btn-group').children();

	buttons.map(function(key) {
		var value = buttons[key].value;
		if(value === 'None') {
			$(buttons[key]).on('click', function() {
				clearInteraction();
			});
			return;
		}
		if(value === 'Clear') {
			$(buttons[key]).on('click', function() {
				clearInteraction();
				source.clear();
			});
			return;
		}
		$(buttons[key]).on('click',
			function() {
				clearInteraction();
				draw = new ol.interaction.Draw({
					source: source,
					type: buttons[key].value,
					snapTolerance: 20
				});
				map.addInteraction(draw);
				var output;
				draw.on('drawstart',
					function(evt) {
						createMeasureTooltip()
						createHelpTooltip()
						feature = evt.feature;

						tooltipCoord = evt.coordinate;

						listener = feature.getGeometry().on('change', function(evt) {
							var geom = evt.target;
							if(geom instanceof ol.geom.Circle) {
								output = formatRadius(geom, geom);
								tooltipCoord = geom.getLastCoordinate();
							} else if(geom instanceof ol.geom.LineString) {
								output = formatLength(geom, geom);
							} else if(geom instanceof ol.geom.Polygon) {
								tooltipCoord = geom.getCoordinates();
								area = geom.getArea();
							}
							measureTooltipElement.innerHTML = output;
							measureTooltip.setPosition(tooltipCoord);
						});

					}, this);

				if(buttons[key].value == "LineString") {
					draw.on('drawend', function() {
						//								widgets.alert.showAlert(output, true)
						toastr.success(output)
					}, this);
				}

				if(buttons[key].value == "Polygon") {
					draw.on('drawend', function() {
						console.log(covertCoord(tooltipCoord))
						var areaMeasureParam = new SuperMap.MeasureParameters(feature.getGeometry());
						new ol.supermap.MeasureService(url).measureArea(areaMeasureParam, function(serviceResult) {
							toastr.success(covertCoord(tooltipCoord) + serviceResult.result.area / 10000000000 + "万平方千米");
						});
					});
				}

				if(buttons[key].value == "Circle") {
					draw.on('drawend', function() {
						//								widgets.alert.showAlert("经度:" + Math.round(ol.proj.transform(tooltipCoord, 'EPSG:3857', 'EPSG:4326')[0]*10000)/10000 + " " + "纬度：" +Math.round(ol.proj.transform(tooltipCoord, 'EPSG:3857', 'EPSG:4326')[1]*10000)/10000 + "<br>" + "半径：" + output, true)
						toastr.success("经度:" + Math.round(ol.proj.transform(tooltipCoord, 'EPSG:3857', 'EPSG:4326')[0] * 10000) / 10000 + " " + "纬度：" + Math.round(ol.proj.transform(tooltipCoord, 'EPSG:3857', 'EPSG:4326')[1] * 10000) / 10000 + "<br>" + "半径：" + output)
					});
				}
			});
	});

	function clearInteraction() {
		if(draw) {
			map.removeInteraction(draw);
		}
	}

//-----------------------------------------------------以下是图表-----------------------------------------

	//调用所有获取数据函数
	$scope.callAllFunctions = function() {
		$scope.getDataPie1();
		$scope.getDatabar1 ();
		$scope.getDataPie2();
		$scope.getDatabar2();
		$scope.configGameCloud();
		$scope.getDataPie3();
	}

	/**
	 * 加载图表内容
	 * @param {String} 要加载的html的标签id
	 * @param {Object} 图表的配置
	 * */
	$scope.initChart = function(id, echartsOption) {
		var myChart = echarts.init(document.getElementById('game' + id));
		myChart.setOption(echartsOption);
	};

	/**
	 * 配置环图,并生成
	 * @param {String} 要加载的html的标签id
	 * @param {Object} 图表的配置
	 * */
	$scope.configPie = function(id, chartsConfig) {
		var chartsOption = {
			title: {
				text: chartsConfig.title,
				textStyle: {
					fontSize: '20',
					fontWeight: '500'
				}
			},
			tooltip: {
				trigger: 'item',
				formatter: "{b}: {d}%"
			},
			legend: {
				orient: 'vertical',
				x: 'right',
				data: chartsConfig.legend
			},
			series: [{
				type: 'pie',
				radius: ['40%', '70%'],
				center: ['50%', '50%'],
				data: chartsConfig.seriesData,
				avoidLabelOverlap: false,
				itemStyle:{
				labelLine: {
					normal: {
						show: true,
						color: ['balck']
					},

				},
				label: {
					normal: {
						show: false,
						position: 'center'
					},emphasis: {
					show: false,
					textStyle: {
						fontSize: '25',
						fontWeight: '400'
					}
				}
				}},
				color:chartsConfig.color  //显示的圆环百分比颜色
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
							formatter: chartsConfig.name ,
							position: 'center',
							textStyle: {
								fontSize: chartsConfig.size,
								fontWeight: '400',
								color: '#96C93C' //圆心字体颜色
							}
						}
					}
				}
			
			]
		};
		$scope.initChart(id, chartsOption);
	};
	
	
	/**
	 * 配置第二类图表  y轴柱状图,并生成
	 * @param {String} 要加载的html的标签id
	 * @param {Object} 图表的配置
	 * */
	$scope.configYBar = function(id, chartConfig) {
		var chartsOption = {
			title: {
				text: chartConfig.title,
				textStyle: {
					fontSize: '20',
					fontWeight: '500'
				}
			},
			legend: {
				data: chartConfig.legend,
				left: "right"
			},
			 toolbox: {
        y: '20',
        feature: {
            magicType: {
                type: ['stack', 'tiled']
            },
            dataView: {},
            saveAsImage: {
                pixelRatio: 2
            }
        }
    },
			grid: chartConfig.grid,
			tooltip: {},
			yAxis: {
				type: 'category',
				data: chartConfig.ydata,
			},
			xAxis: {
				type: 'value'
			},
			series: [{
				name:chartConfig.name1,
				data: chartConfig.xdata1,
				type: 'bar',
				barWidth: 30
			},
			{
				name:chartConfig.name2,
				data: chartConfig.xdata2,
				type: 'bar',
				barWidth: 30
			}
			]
		};
		$scope.initChart(id, chartsOption);
	}
	
	//微博词云图
	$scope.configGameCloud = function() {
		var text = '上班路上 地铁上 酒吧  地铁上 地铁上 饭店 在家里  在家里 学校里  学校里  办公室里 等车的时候 咖啡厅里 办公室里';
		var data = text
			.split(/[,\. ]+/g)
			.reduce(function(arr, word) {
				var obj = arr.find(function(obj) {
					return obj.name === word;
				});
				if(obj) {
					obj.weight += 1;
				} else {
					obj = {
						name: word,
						weight: 1
					};
					arr.push(obj);
				}
				return arr;
			}, []);
		Highcharts.chart('game5', {
			series: [{
				type: 'wordcloud',
				data: data
			}],
			title: {
				text: '  '
			}
		});
	}
	
	//--------------------------------------------------------获取数据--------------------------------------
	
	//获取---环图1的数据,并调用生成函数
	$scope.getDataPie1 = function() {
		simplePostData({
			"$http": $http,
			"url": HOST_URL + "pieAge",
			"$cookies": $cookies,
			"method": "GET",
			"callbackFunction": function(response) {
				chartConfig = {
					title: "休闲移动游戏年龄分布",
					name:"Age",
					size:"50",
					seriesData: response.data,
					legend: response.legend
				}
				console.log(chartConfig.seriesData)
				$scope.configPie(1, chartConfig);
			}
		});
	}
	
	//获取---y轴柱状图的数据,并调用生成函数
	$scope.getDatabar1 = function() {
		simplePostData({
			"$http": $http,
			"url": HOST_URL + "man",
			"$cookies": $cookies,
			"method": "GET",
			"callbackFunction": function(response) {
				chartConfig = {
					name1:"休闲游戏",
					name2:"竞技游戏",
					title: "休闲移动游戏性别比例",
					xdata1: response.ydata1,
					xdata2:	response.ydata2,
					ydata: response.xdata,
					legend: response.legend
				}
				console.log(chartConfig.xdata2)
				$scope.configYBar(2, chartConfig);
			}
		});
	}
	
	//获取---环图2的数据,并调用生成函数
	$scope.getDataPie2 = function() {
		simplePostData({
			"$http": $http,
			"url": HOST_URL + "pieTime",
			"$cookies": $cookies,
			"method": "GET",
			"callbackFunction": function(response) {
				chartConfig = {
					title: "休闲移动游戏用户游戏频次",
					name:"频率",
					size:"50",
					seriesData: response.data,
					legend: response.legend
				}
				console.log(chartConfig.seriesData)
				$scope.configPie(3, chartConfig);
			}
		});
	}
	
	//获取---y轴柱状图的数据,并调用生成函数
	$scope.getDatabar2 = function() {
		simplePostData({
			"$http": $http,
			"url": HOST_URL + "gameAge",
			"$cookies": $cookies,
			"method": "GET",
			"callbackFunction": function(response) {
				chartConfig = {
					title: "休闲移动游戏用户游龄",
					xdata1: response.ydata,
					xdata2:	[],
					ydata: response.xdata,
//					legend: response.legend,
					grid:{
				x: 80,
				y: 60,
				x2: 35,
				y2: 30,
				borderWidth: 1
			},
				}
				$scope.configYBar(4, chartConfig);
			}
		});
	}
	
	//获取---环图3的数据,并调用生成函数
	$scope.getDataPie3 = function() {
			var	chartConfig1 = {
					title: "  ",
					name:"try",
					size:"50",
					seriesData: [{'value':'92.8','name':'愿意尝试'},
					{'value':'7.2','name':'不愿意尝试'}],
					legend: ['愿意尝试','不愿意尝试'],
					color:['#96C93C','#87CEFF']
			};
			var	chartConfig2 = {
					title: "  ",
					name:"buy",
					size:"35",
					seriesData: [{'value':'64','name':'休闲游戏'},
					{'value':'83.3','name':'竞技游戏'}],
					color:['#96C93C','#87CEFF']
			};
			var	chartConfig3 = {
					title: "  ",
					name:"free",
					size:"35",
					seriesData: [{"value":36,"name":"休闲游戏"},
					{"value":16.7,"name":"竞技游戏"}],
					color:['#96C93C','#87CEFF']
			};
			var chartConfig4 = {
					title: " ",
					ydata: ["朋友推荐","APP商店推荐","网络咨询推荐","手机原厂自带游戏","线下广告推荐","其它"],
					xdata2:	[],
					xdata1: ['34.8','33.4','17.7','7.9','4','2.3'],
					grid:{
					x: 80,
					y: 60,
					x2: 35,
					y2: 100,
					borderWidth: 1
				}
			};
			var chartConfig5 = {
					name1:"休闲游戏用户",
					name2:"竞技游戏用户",
					title: "2018人均付费金额",
					grid:{
					x: 110,
					y: 60,
					x2: 15,
					y2: 30,
					borderWidth: 1
				},
					xdata1:['0.5','14.8','54.5','30.2'] ,
					xdata2:	['10.2','22.1','37.4','30.4'],
					ydata: ['重氪（超10000）','中氪（1001-10000）','小氪（101-1000）','微氪（不足100）'],
					legend: ['竞技游戏用户','休闲游戏用户']
				}
				$scope.configPie(6, chartConfig1);
				$scope.configPie(7, chartConfig2);
				$scope.configPie(8, chartConfig3);
				$scope.configYBar(9,chartConfig4);
				$scope.configYBar(10,chartConfig5)
	}
	
		
	$scope.callAllFunctions()
});