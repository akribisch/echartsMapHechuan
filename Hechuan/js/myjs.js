$(function(){
	$("#detail").click(function(){
		$("#kind").html("<span class='medium-border' id='detail-refer' style='background-color: #76C1DE;'>整体分布</span>"+
		"<span class='medium-border' id='detail-query'>查询农业/经济情况</span>");
		var remove=$("#left").find("span");
		for (var i=0;i<remove.length;i++) {
			$(remove.get(i)).children("img").attr("src","img/icon_"+(i+1)+".png");
			$(remove.get(i)).children("p").css("color","gainsboro");
		}
		$(this).children("img").attr("src","img/icon_1_blue.png");
		$(this).children("p").css("color","#00A5E4");
		detail();
	});
	$("#farm").click(function(){
		$("#kind").html("<span id='farm-refer' class='medium-border' style='background-color: #76C1DE;'>农产品分布</span>");
		var remove=$("#left").find("span");
		for (var i=0;i<=remove.length;i++) {
			$(remove.get(i)).children("img").attr("src","img/icon_"+(i+1)+".png");
			$(remove.get(i)).children("p").css("color","gainsboro");
		}
		$(this).children("img").attr("src","img/icon_2_blue.png");
		$(this).children("p").css("color","#00A5E4");
		
	});
	$("#soil").click(function(){
		$("#kind").html("<span id='soil-info' class='medium-border' style='background-color: #76C1DE;'>土壤耕地信息</span>"+
		"<span class='medium-border' id='soil-query'>质量调查</span>");
		var remove=$("#left").find("span");
		for (var i=0;i<=remove.length;i++) {
			$(remove.get(i)).children("img").attr("src","img/icon_"+(i+1)+".png");
			$(remove.get(i)).children("p").css("color","gainsboro");
		}
		$(this).children("img").attr("src","img/icon_3_blue.png");
		$(this).children("p").css("color","#00A5E4");
		$("#soil-info").click(function(){
			$("#soil-query").css("background-color","gainsboro")
			$(this).css("background-color","#76C1DE");
		});
		$("#soil-query").click(function(){
			$("#soil-info").css("background-color","gainsboro")
			$(this).css("background-color","#76C1DE");
		});
	});
	$("#manure").click(function(){
		$("#kind").html("<span id='manure-query' class='medium-border' style='background-color: #76C1DE;'>施肥推荐查询</span>"+
		"<span class='medium-border' id='manure-refer'>施肥分区</span>");
		var remove=$("#left").find("span");
		for (var i=0;i<=remove.length;i++) {
			$(remove.get(i)).children("img").attr("src","img/icon_"+(i+1)+".png");
			$(remove.get(i)).children("p").css("color","gainsboro");
		}
		$(this).children("img").attr("src","img/icon_4_blue.png");
		$(this).children("p").css("color","#00A5E4");
		$("#manure-query").click(function(){
			$("#manure-refer").css("background-color","gainsboro")
			$(this).css("background-color","#76C1DE");
		});
		$("#manure-refer").click(function(){
			$("#manure-query").css("background-color","gainsboro")
			$(this).css("background-color","#76C1DE");
		});
	});
	detail();
	
});
function detail(){
	$("#detail-refer").click(function(){
		$("#detail-query").css("background-color","gainsboro");
		$(this).css("background-color","#76C1DE");
		$("#detail-query-content").css("display","none");
		$("#detail-refer-content").css("display","block");
	});
	$("#detail-query").click(function(){
		$("#detail-refer").css("background-color","gainsboro");
		$(this).css("background-color","#76C1DE");
		$("#detail-refer-content").css("display","none");
		$("#detail-query-content").css("display","block");
	});
}

