app.controller('MusicController', function($scope, $http, $cookies) {

	//调用所有获取数据函数
	$scope.callAllFunctions = function() {
		$scope.getAlldata();
		//		$scope.configGameCloud();
	}

	/**
	 * 加载图表内容
	 * @param {String} 要加载的html的标签id
	 * @param {Object} 图表的配置
	 * */
	$scope.initChart = function(id, echartsOption) {
		var myChart = echarts.init(document.getElementById('music' + id));
		myChart.setOption(echartsOption);
	};

	/**
	 * 配置第一类图表  x轴柱状图,并生成
	 * @param {String} 要加载的html的标签id
	 * @param {Object} 图表的配置
	 * */
	$scope.configYBar1 = function(id, chartConfig) {
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
			tooltip: {
				trigger: 'axis',
				formatter: "{b} : {c}",
				axisPointer: {
					type: 'line' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			 label: {
      normal: {
          show: true,
          position: 'top',
          textStyle: {
            color: 'black'
          }
      }
   },
			xAxis: {
				type: 'category',
				data: chartConfig.xdata,
			},
			yAxis: {
				type: 'value'
			},
			series: [{
					name: chartConfig.name1,
					data: chartConfig.ydata1,
					type: 'bar',
					barWidth: 30,
					itemStyle: {
					normal: {
						color: 'rgb(101,175,69)'
					}
				}
				},
				{
					name: chartConfig.name2,
					data: chartConfig.ydata2,
					type: 'bar',
					barWidth: 30,
					itemStyle: {
					normal: {
						color: '#00C5CD	'
					}
				}
				}, {
					name: chartConfig.name3,
					data: chartConfig.ydata3,
					type: 'line',
            		areaStyle: chartConfig.areastyle3,
				},{
					name: chartConfig.name4,
					data: chartConfig.ydata4,
					type: 'line',
            		areaStyle: chartConfig.areastyle4,
				}
			]
		};
		$scope.initChart(id, chartsOption);
	}
	
	
	/**
	 * 配置第2类图表  y轴柱状图,并生成
	 * @param {String} 要加载的html的标签id
	 * @param {Object} 图表的配置
	 * */
	$scope.configYBar2 = function(id, chartConfig) {
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
				top: "top"
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
			tooltip: {
				trigger: 'axis',
				formatter: "{b} : {c}",
				axisPointer: {
					type: 'line' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			yAxis: {
				type: 'category',
				data: chartConfig.xdata,
			},
			xAxis: {
				type: 'value'
			},
			 label: {
      normal: {
          show: true,
          position: 'right',
          textStyle: {
            color: 'black'
          }
      }
   },
			series: [{
				name: chartConfig.name1,
				data: chartConfig.ydata1,
				type: 'bar',
				barWidth: 10,
				itemStyle: {
					normal: {
						color: 'rgb(101,175,69)'
					}
				}
			},
			{
				name: chartConfig.name2,
				data: chartConfig.ydata2,
				type: 'bar',
				barWidth: 10,
				itemStyle: {
					normal: {
						color: '#00C5CD'
					}
				}
			}
			]
		};
		$scope.initChart(id, chartsOption);
	}

	/**
	 * 配置第3类图表  x轴堆叠图,并生成
	 * @param {String} 要加载的html的标签id
	 * @param {Object} 图表的配置
	 * */
	$scope.configYBar3 = function(id, chartConfig) {
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
			 label: {
      normal: {
          show: true,
          position: 'top',
          textStyle: {
            color: 'black'
          }
      }
   },
			grid: chartConfig.grid,
			tooltip: {
				trigger: 'axis',
				formatter: "{b} : {c}",
				axisPointer: {
					type: 'line' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			xAxis: {
				type: 'category',
				data: chartConfig.xdata,
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					name: chartConfig.name3,
					data: chartConfig.ydata3,
					type: 'line',
            		areaStyle: {
					normal: {
						color: 'rgb(101,175,69)'
					}
				}
				},{
					name: chartConfig.name4,
					data: chartConfig.ydata4,
					type: 'line',
            		areaStyle: {
					normal: {
						color: '#00C5CD	'
					}
				}
				}
			]
		};
		$scope.initChart(id, chartsOption);
	}
	
	/**
	 * 配置第2类图表  y轴柱状图,并生成
	 * @param {String} 要加载的html的标签id
	 * @param {Object} 图表的配置
	 * */
	$scope.configYBar4 = function(id, chartConfig) {
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
				top: "top"
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
			tooltip: {
				trigger: 'axis',
				formatter: "{b} : {c}",
				axisPointer: {
					type: 'line' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			yAxis: {
				type: 'category',
				data: chartConfig.xdata,
			},
			xAxis: {
				type: 'value'
			},
			 label: {
      normal: {
          show: true,
          position: 'top',
          textStyle: {
            color: 'black'
          }
      }
   },
			series: [{
				name: chartConfig.name1,
				data: chartConfig.ydata1,
				type: 'bar',
				barWidth: 30,
				 stack: '总量',
				itemStyle: {
					normal: {
						color: 'rgb(101,175,69)'
					}
				}
			},
			{
				name: chartConfig.name2,
				data: chartConfig.ydata2,
				type: 'bar',
				barWidth: 30,
				 stack: '总量',
				itemStyle: {
					normal: {
						color: '#00C5CD'
					}
				}
			}
			]
		};
		$scope.initChart(id, chartsOption);
	}

	
	//------------------------配置完成，获取数据-------------------------------------------------------

	$scope.getAlldata = function() {
		var chartConfig1 = {
			name1: "数字音乐消费者",
			name2: "数字音乐整体用户",
			name3: "TGL",
			title: "  ",
			grid: {
				x: 50,
				y: 60,
				x2: 15,
				y2: 80,
				borderWidth: 1
			},
			ydata1: ['75.4', '73.2', '54.5', '37.8', '56.2', '56', '40.6', '47.4', '53.2'],
			ydata2: ['68', '60.9', '25.3', '41', '40.4', '29', '33.3', '33.2'],
			ydata3: ['111', '120', '149', '137', '139', '140', '142', '160'],
			xdata: ['分享及转发音乐', '评论点赞', '撰写乐评', '参与热门话题讨论', '单曲打榜', '自制歌单', '发布动态', '购买周边'],
			legend: ['数字音乐消费者', '数字音乐整体用户', 'TGL']
		}
		
		var chartConfig2 = {
			name1: "数字音乐消费者",
			title: "  ",
			grid: {
				x: 80,
				y: 60,
				x2: 5,
				y2: 80,
				borderWidth: 1
			},
			ydata1: ['105.4', '111.2', '106.5', '94.8', '58.2'],
			xdata: ['24岁及以下', '25-30岁', '31-35岁', '36-40岁', '40岁以上'],
			legend: []
		}
		
		var chartConfig3 = {
			name1: "数字音乐消费者",
			title: "  ",
			grid: {
				x: 80,
				y: 30,
				x2: 5,
				y2: 80,
				borderWidth: 1
			},
			ydata1: ['123.4', '103.2', '81.5', '59.8'],
			xdata: ['一线城市', '二线城市', '三线城市', '4线及以下城市'],
			legend: []
		}
		
		var chartConfig4 = {
			name1: "数字音乐消费者",
			title: "  ",
			grid: {
				x: 80,
				y: 30,
				x2: 5,
				y2: 30,
				borderWidth: 1
			},
			ydata1: ['44.4', '122.2', '110.5', '77.8','40'],
			xdata: ['博士', '硕士/MBA', '本科', '大专','高中及大专以下'],
			legend: []
		}
		
		var chartConfig5 = {
			name1: "数字音乐消费者",
			title: "  ",
			grid: {
				x: 100,
				y: 0,
				x2: 35,
				y2: 40,
				borderWidth: 1
			},
			ydata1: ['166.4', '125.2', '133.5', '106.8','96','79','55'],
			xdata: ['20000元以上', '15000-20000元', '10000-15000元', '8000-10000元', '5000-8000元', '3000-5000元', '3000以下'],
			legend: []
		}
		
		var chartConfig6 = {
			name1: "数字音乐消费者",
			title: "  ",
			grid: {
				x: 80,
				y: 30,
				x2: 35,
				y2: 30,
				borderWidth: 1
			},
			ydata1: ['139.4', '133.2', '100.5', '92.8', '92', '92.8', '79.8', '72.8'],
			xdata: ['企业高层管理', '企业基层管理', '国家公务员', '企业基层员工', '学生', '业主/个体户', '专业技术人员', '自由职业者'],
			legend: []
		}
		
		var chartConfig7 = {
			name3: "数字音乐消费者(%)",
			name4: "数字音乐整体用户(%)",
			title: "  ",
			grid: {
				x: 50,
				y: 60,
				x2: 15,
				y2: 80,
				borderWidth: 1
			},
			ydata3: ['87', '85', '90', '78', '86', '92', '81', '89','86','84','76','83.2','85.8','79.6','72.4'],
			ydata4: ['80', '74', '83', '68', '79', '85', '73', '83','78','73.5','59.1','73.6','80.4','64.9','56.1'],
			xdata: ['搜索引擎', '社交网络', '即时通讯', '手机阅读', '视频服务', '手机购物', '电子邮件', '第三方支付','网上银行','生活服务','旅行预订','下载应用软件','浏览新闻资讯','游戏','摄影服务'],
			legend: ['数字音乐消费者(%)', '数字音乐整体用户(%)']
		}
		
		var chartConfig8 = {
			name1: "数字音乐消费者",
			name2: "数字音乐整体用户",
			title: "  ",
			grid: {
				x: 50,
				y: 30,
				x2: 15,
				y2: 50,
				borderWidth: 1
			},
			ydata1: ['37.4', '29.2', '37.5', '62.8', '43.2', '37', '66.6', '78.4', '56.2', '31.2', '56.2', '55.2'],
			ydata2: ['26', '21.9', '26.3', '56', '33.4', '27', '59.3', '70', '47.2', '22.2', '49.2', '48.2'],
			xdata: ['爵士', '重金属', '电音', '中国风', '摇滚', '嘻哈/说唱', '轻音乐', '流行', '电影原声', 'R&B', '古典', '民谣'],
			legend: ['数字音乐消费者', '数字音乐整体用户']
		}
		
		var chartConfig9 = {
			name1: "喜爱",
			name2: "经常收听",
			title: "  ",
			grid: {
				x: 50,
				y: 30,
				x2: 15,
				y2: 50,
				borderWidth: 1
			},
			ydata1: ['-130.4', '-118.2', '-122.5', '-106.8', '-101.2'],
			ydata2: ['127', '122.9', '116.3', '112', '103.4'],
			xdata: ['韩国', '日本', '欧美', '港台', '内地'],
			legend: ['喜爱', '经常收听']
		}
		
		var chartConfig10 = {
			name1: "核心动漫视频用户",
			name2: "非核心动漫视频用户",
			name3: "泛动漫视频用户增长率",
			title: "  ",
			grid: {
				x: 50,
				y: 60,
				x2: 15,
				y2: 80,
				borderWidth: 1
			},
			ydata1: ['3225.4', '4984.2', '5939.5', '7956.8', '9107.2', '10189'],
			ydata2: ['5635', '9904.9', '15952.3', '19107', '24897.4', '28796'],
			ydata3: ['','6800', '4700', '2300', '2500', '1460'],
			xdata: ['2013', '2014', '2015', '2016', '2017', '2018'],
			legend: ['核心动漫视频用户', '非核心动漫视频用户', '泛动漫视频用户增长率']
		}
		
		$scope.configYBar1(1, chartConfig1);
		$scope.configYBar2(2, chartConfig2);
		$scope.configYBar2(3, chartConfig3);
		$scope.configYBar2(4, chartConfig4);
		$scope.configYBar2(5, chartConfig5);
		$scope.configYBar2(6, chartConfig6);
		$scope.configYBar3(7, chartConfig7);
		$scope.configYBar2(8, chartConfig8);
		$scope.configYBar4(9, chartConfig9);
		$scope.configYBar1(10, chartConfig10);
	}

	$scope.callAllFunctions()
})