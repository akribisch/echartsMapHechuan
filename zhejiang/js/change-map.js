$(function(){
	changeMap();
})
function changeMap(){
	var myChart= echarts.init(document.getElementById('map'));
	option = {
	    tooltip: {
	        trigger: 'item',
	        formatter: '{b}'
	    },
	    series: [
	        {
	            name: '重庆',
	            type: 'map',
	            mapType: '重庆',
	            selectedMode : 'single',
	            label: {
	                normal: {
	                    show: true
	                },
	                emphasis: {
	                    show: true
	                }
	            },
	             data:[
                
            ]
	        }
	    ]  
	};
	var Province = "";
	myChart.on('click', function (params){
		var myChart= echarts.init(document.getElementById('map'));
		Province = params.name;
		option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: '{b}'
		    },
		    series: [
		        {
		            name: '重庆',
		            type: 'map',
		            mapType: Province,
		            selectedMode : 'single',
		            label: {
		                normal: {
		                    show: true
		                },
		                emphasis: {
		                    show: true
		                }
		            },
		             data:[
	                
	            ]
		        }
		    ]
		};

		myChart.setOption(option);
 		window.addEventListener("resize",function(){
       	 	myChart.resize();
   		});
	});
	console.log(option)
	myChart.setOption(option);
 	window.addEventListener("resize",function(){
        myChart.resize();
   });
}
