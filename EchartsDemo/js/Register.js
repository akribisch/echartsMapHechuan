$(function(){
	$.get("json/yanwo.json",function(params){echarts.registerMap('燕窝镇',params)});
	$.get("json/erlang.json",function(params){echarts.registerMap('二郎镇',params)});
	$.get("json/longfeng.json",function(params){echarts.registerMap('龙凤镇',params)});
	$.get("json/yanjing.json",function(params){echarts.registerMap('盐井镇',params)});
	$.get("json/longxing.json",function(params){echarts.registerMap('隆兴镇',params)});
	$.get("json/gulou.json",function(params){echarts.registerMap('古楼镇',params)});
	$.get("json/xianglong.json",function(params){echarts.registerMap('香龙镇',params)});
	$.get("json/sanhui.json",function(params){echarts.registerMap('三汇镇',params)});
	$.get("json/qingping.json",function(params){echarts.registerMap('清平镇',params)});
	$.get("json/tuchang.json",function(params){echarts.registerMap('土场镇',params)});
	$.get("json/shuangfeng.json",function(params){echarts.registerMap('双凤镇',params)});
	$.get("json/caojie.json",function(params){echarts.registerMap('草街镇',params)});
	$.get("json/shitang.json",function(params){echarts.registerMap('狮滩镇',params)});
	$.get("json/guandu.json",function(params){echarts.registerMap('官渡镇',params)});
	$.get("json/tongxi.json",function(params){echarts.registerMap('铜溪镇',params)});
	$.get("json/xiaojia.json",function(params){echarts.registerMap('肖家镇',params)});
	$.get("json/shayu.json",function(params){echarts.registerMap('沙鱼镇',params)});
	$.get("json/heyang.json",function(params){echarts.registerMap('合阳城',params)});
	$.get("json/diaoyu.json",function(params){echarts.registerMap('钓鱼城',params)});
	$.get("json/laitang.json",function(params){echarts.registerMap('涞滩镇',params)});
	$.get("json/xiaomian.json",function(params){echarts.registerMap('小沔镇',params)});
	
	$.get("json/shuanghuai.json",function(params){echarts.registerMap('双槐镇',params)});
	$.get("json/longshi.json",function(params){echarts.registerMap('龙市镇',params)});
	$.get("json/qiantang.json",function(params){echarts.registerMap('钱塘镇',params)});
	$.get("json/sanmiao.json",function(params){echarts.registerMap('三庙镇',params)});
	$.get("json/yunmen.json",function(params){echarts.registerMap('云门镇',params)});
	$.get("json/nanjin.json",function(params){echarts.registerMap('南津街',params)});
	$.get("json/dashi.json",function(params){echarts.registerMap('大石镇',params)});
	$.get("json/weituo.json",function(params){echarts.registerMap('渭沱镇',params)});
	$.get("json/taihe.json",function(params){echarts.registerMap('太和镇',params)});
})