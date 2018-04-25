app.controller('WeiBoController', function($scope, $http, $cookies, $cookieStore) {

	// 百度地图API功能
	var map = new BMap.Map("map", {
		enableMapClick: true,
		title:'asdasdadsa'
		
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
			text:'asdoiuahdoiuahdo'
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

})