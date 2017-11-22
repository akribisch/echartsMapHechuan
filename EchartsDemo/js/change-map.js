$(function() {
	changeMap();
//		var x=change(106.0097915659414, 30.250096059570312);
//		console.log(x)
})

/**
 * 经纬度转换为xy坐标系，使用的是1980西安的投影
 * @param {Object} longitude 经度
 * @param {Object} latitude 维度
 */
function change(longitude, latitude) {
	iPI = 0.0174532925199433; //// 3.1415926535898/180.0;
	ZoneWide = 6; //// 6度带宽
	//				a = 6378245.0;
	//				f = 1.0 / 298.3; // 54年北京坐标系参数
	a = 6378140.0;
	f = 1 / 298.257; //80年西安坐标系参数
	ProjNo = Math.floor(longitude / ZoneWide);
	longitude0 = ProjNo * ZoneWide + ZoneWide / 2;
	longitude0 = longitude0 * iPI;
	longitude1 = longitude * iPI; // 经度转换为弧度
	latitude1 = latitude * iPI; // 纬度转换为弧度
	e2 = 2 * f - f * f;
	ee = e2 * (1.0 - e2);
	NN = a / Math.sqrt(1.0 - e2 * Math.sin(latitude1) * Math.sin(latitude1));
	T = Math.tan(latitude1) * Math.tan(latitude1);
	C = ee * Math.cos(latitude1) * Math.cos(latitude1);
	A = (longitude1 - longitude0) * Math.cos(latitude1);
	M = a * ((1 - e2 / 4 - 3 * e2 * e2 / 64 - 5 * e2 * e2 * e2 / 256) * latitude1 -
		(3 * e2 / 8 + 3 * e2 * e2 / 32 + 45 * e2 * e2 * e2 / 1024) * Math.sin(2 * latitude1) +
		(15 * e2 * e2 / 256 + 45 * e2 * e2 * e2 / 1024) * Math.sin(4 * latitude1) -
		(35 * e2 * e2 * e2 / 3072) * Math.sin(6 * latitude1));
	xval = NN * (A + (1 - T + C) * A * A * A / 6 +
		(5 - 18 * T + T * T + 72 * C - 58 * ee) * A * A * A * A * A / 120);
	yval = M + NN * Math.tan(latitude1) * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A * A * A * A / 24 +
		(61 - 58 * T + T * T + 600 * C - 330 * ee) * A * A * A * A * A * A / 720);
	X0 = 1000000 * (ProjNo + 1) + 500000;
	Y0 = 0;
	xval = xval + X0;
	yval = yval + Y0;
	// *X = xval;
	// *Y = yval;
	var doubles = [];
	doubles[0] = xval;
	doubles[1] = yval;
	return doubles;
}


function changeMap() {

	$.get("json/xjclip.json", function(params) {
		var myChart = echarts.init(document.getElementById('map'));
		echarts.registerMap('合川区', params)

		var geoCoordMap = {
			'龙凤镇': [106.0097915659414, 30.250096059570312],
		}

		var geoCoordMap1 = {
			'农家小院': [18593925.127168464, 3353198.969590579],
		}

		var data = [{
			name: '龙凤镇',
			value: 300
		}]

		var data1 = [{
			name: '农家小院',
			value: 220
		}]

		var max = 480,
			min = 90; // todo 
		var maxSize4Pin = 200,
			minSize4Pin = 50;

		var convertData = function(data) {
			var res = [];
			for(var i = 0; i < data.length; i++) {
				var geoCoord = geoCoordMap[data[i].name];
				if(geoCoord) {
					res.push({
						name: data[i].name,
						value: geoCoord.concat(data[i].value)
					});
				}
			}
			return res;
		};
		var convertData1 = function(data) {
			var res = [];
			for(var i = 0; i < data.length; i++) {
				var geoCoord = geoCoordMap1[data[i].name];
				if(geoCoord) {
					res.push({
						name: data[i].name,
						value: geoCoord.concat(data[i].value)
					});
				}
			}
			return res;
		};
		var convert = function(data) {
			//			console.log(data)
			var res = [];
			for(var i = 0; i < data.length; i++) {
				var geoCoord = geoCoordMap[data[i].name];

				if(geoCoord) {
					var s = geoCoord.toString();
					var ss = s.substring(1, s.length - 1).split(",");
					res.push({
						name: data[i].name,
						value: change(ss[0], ss[1]).concat(data[i].value)
					});
				}
			}
			return res;
		};

		option = {
			backgroundColor: '#004881',
			geo: {
				map: '合川区',
				label: {
					normal: {
						show: true,
					},
					emphasis: {
						show: true,
					}
				},
				roam: true,
			},
			series: [{
					name: '合川区',
					type: 'scatter',
					mapType: '合川区',
					coordinateSystem: 'geo',
					label: {
						normal: {
							show: true
						},
						emphasis: {
							show: true
						}
					},
					itemStyle: {
						normal: {
							color: '#800080'
						}
					},
					data: convertData(data),
					symbolSize: function(val) {
						return val[2] / 10;
					},
					label: {
						normal: {
							formatter: '{b}',
							position: 'right',
							show: true
						},
						emphasis: {
							show: true
						}
					},
					itemStyle: {
						normal: {
							color: '#05C3F9'
						}
					}
				},
				{
					type: 'map',
					map: '合川区',
					geoIndex: 0,
					aspectScale: 0.75, //长宽比
					showLegendSymbol: false, // 存在legend时显示
					label: {
						normal: {
							show: true,
							textStyle: {
								color: '#fff'
							}
						},
						emphasis: {
							show: true,
							textStyle: {
								color: '#fff'
							}
						}
					},
					roam: true,
					itemStyle: {
						normal: {
							areaColor: '#004881', //区域默认颜色
							borderColor: '#019FD4', //边界颜色
							borderWidth: 2 //边界宽度
						},
						emphasis: {
							areaColor: '#800080'
						}
					},
					animation: false,
					data: data
				},
				{
					name: '点',
					type: 'scatter',
					coordinateSystem: 'geo',
					symbol: 'pin',
					symbolSize: function(val) {
						var a = (maxSize4Pin - minSize4Pin) / (max - min);
						var b = minSize4Pin - a * min;
						b = maxSize4Pin - a * max;
						return a * val[2] + b;
					},
					label: {
						normal: {
							show: true,
							textStyle: {
								color: '#fff',
								fontSize: 9,
							}
						}
					},
					itemStyle: {
						normal: {
							color: '#F62157', //标志颜色
						}
					},
					zlevel: 6,
					data: convertData(data),
				}
			]
		};
		var county = "";
		myChart.on('click', function(params) {
			county = params.name;
			var myChart = echarts.init(document.getElementById('map'));
			option = {
				backgroundColor: '#004881',
				geo: {
					map: county,
					label: {
						normal: {
							show: true,
							textStyle: {
								color: '#fff'
							}
						},
						emphasis: {
							show: true,
							textStyle: {
								color: '#fff'
							}
						}
					},
					roam: true,
					itemStyle: {
						normal: {
							areaColor: '#004881', //区域默认颜色
							borderColor: '#019FD4', //边界颜色
							borderWidth: 2 //边界宽度
						},
						emphasis: {
							areaColor: '#800080' //选中色
						}
					}

				},
				series: [{
						name: county,
						type: 'map',
						mapType: county,
						type: 'scatter',
						coordinateSystem: 'geo',
						//					selectedMode:'singled',
						label: {
							normal: {
								show: true
							},
							emphasis: {
								show: true
							}
						},
						data: convertData1(data1),
						symbolSize: function(val) {
							return val[2] / 10;
						},
						label: {
							normal: {
								formatter: '{b}',
								position: 'right',
								show: true
							},
							emphasis: {
								show: true
							}
						},
						itemStyle: {
							normal: {
								color: '#05C3F9'
							}
						}
					},
					{
						type: 'map',
						map: county,
						geoIndex: 0,
						aspectScale: 0.75, //长宽比
						showLegendSymbol: false, // 存在legend时显示
						label: {
							normal: {
								show: true,
								textStyle: {
									color: '#fff'
								}
							},
							emphasis: {
								show: true,
								textStyle: {
									color: '#fff'
								}
							}
						},
						roam: true,
						itemStyle: {
							normal: {
								areaColor: '#004881', //区域默认颜色
								borderColor: '#019FD4', //边界颜色
								borderWidth: 2 //边界宽度
							},
							emphasis: {
								areaColor: '#800080'
							}
						},
						animation: false,
						data: data1
					},
					{
						name: '点',
						type: 'scatter',
						coordinateSystem: 'geo',
						symbol: 'pin',
						symbolSize: function(val) {
							var a = (maxSize4Pin - minSize4Pin) / (max - min);
							var b = minSize4Pin - a * min;
							b = maxSize4Pin - a * max;
							return a * val[2] + b;
						},
						label: {
							normal: {
								show: true,
								textStyle: {
									color: '#fff',
									fontSize: 9,
								}
							}
						},
						itemStyle: {
							normal: {
								color: '#F62157', //标志颜色
							}
						},
						zlevel: 6,
						data: convertData1(data1),
					}
				]
			};
			var town = "";
			myChart.on('click', function(params) {
				town = params.name;
				alert(town);
			});
			myChart.setOption(option);
			window.addEventListener("resize", function() {
				myChart.resize();
			});
		});
  
		myChart.setOption(option);
		window.addEventListener("resize", function() {
			myChart.resize();
		});
	});
}