$(function() {
	$("#return").click(function(){
		changeMap();
	});
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
	$("#return").css("display","none");
	$.get("json/xzjx.json", function(params) {
		var myChart = echarts.init(document.getElementById('map'));
		echarts.registerMap('合川区', params)

		option = {
			backgroundColor: '#0165B5',
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
							color: '#FE9F03'
						}
					},
					data: [],
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
							areaColor: '#0165B5', //区域默认颜色
							borderColor: '#CFCFCF', //边界颜色
							borderWidth: 2 //边界宽度
						},
						emphasis: {
							areaColor: '#FE9F03'
						}
					},
					animation: false,
				}
			]
		};
		var county = "";
		myChart.on('click', function(params) {
			$("#return").css("display","block");
			county = params.name;
			$.get("json/info.json",function(param){
				for (var i=0;i<param.length;i++) {
					if (param[i].name==county) {
						$("#detail-refer-content").empty();
						$("#detail-refer-content").html("<p class='third-font'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+param[i].info+"</p>")
					}
				}
			})
			var myChart = echarts.init(document.getElementById('map'));
			option = {
				backgroundColor: '#0165B5',
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
							areaColor: '#0165B5', //区域默认颜色
							borderColor: '#CFCFCF', //边界颜色
							borderWidth: 2 //边界宽度
						},
						emphasis: {
							areaColor: '#FE9F03' //选中色
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
						data: [],
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
								areaColor: '#0165B5', //区域默认颜色
								borderColor: '#CFCFCF', //边界颜色
								borderWidth: 2 //边界宽度
							},
							emphasis: {
								areaColor: '#FE9F03'
							}
						},
						animation: false,
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