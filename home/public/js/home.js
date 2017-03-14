
$(function(){
	// 页头滑入滑出效果
	$(".dropTitle").hover(function(){
		$(this).css({"background":"#fff"});
		$(this).find('.dropTitleBox').css({"display":"block"});
		$(this).find("s").css({"transform":"rotate(180deg)"});
	},function(){
		$(this).css({"background":"#f2f2f2"});
		$(this).find('.dropTitleBox').css({"display":"none"});
		$(this).find("s").css({"transform":"rotate(0deg)"}); 
	});

// 左侧导航滑入滑出效果
	$(".categoryBox li").hover(function(){
		$(this).css({"background":"#f1f1f1"});
		$(this).find(".catRight").css({"display":"block"});
	},function(){
		$(this).css({"background":"#fff"});
		$(this).find(".catRight").css({"display":"none"});
	});


// 轮播图效果
	// 定时轮播函数
	(function(){
		var rotateSwitch=function(){
			play100=setInterval(function(){
				test = true;
				var imgs=$(".imgBanner .imgBox a");
				imgs.eq(3).stop().fadeOut(250,function(){

					var idx=$(this).prev().attr("idx");
					$('#'+idx).addClass("active");	
					$(".imgBanner .pagingBox a").not($('#'+idx).addClass("active")).removeClass("active");
					$(this).show().prependTo(".imgBox");
				});
			},3000);
			test = false;
		};
	
		rotateSwitch();	

		$(".imgBanner .pagingBox a").hover(function(){
			clearInterval(play100);
			var idxs=$(this).attr("id");
			// console.log(imgobjR);
			for(i=0;i<10;i++){
				var imgobj=$(".imgBanner .imgBox a");
				var idxR=imgobj.eq(3).attr("idx");
				if(idxs==idxR){
					$('#'+idxs).addClass("active");	
					$(".imgBanner .imgBox a[idx="+idxs+"]").fadeIn(250);  //注意字符串的链接方式
					$(".imgBanner .pagingBox a").not($('#'+idxs).addClass("active")).removeClass("active");
				}else{
					imgobj.eq(3).show().prependTo(".imgBox");
				}
			}
		});

		$(".imgBanner").hover(function(){
			clearInterval(play100);
		},function(){
			rotateSwitch();
		});

	})();

// 主体头部标签页效果
	$(".indexTabNav ul li").first().addClass("active");
	$(".indexTabBottom .indexTabCon").hide();
	$(".indexTabBottom .indexTabCon").eq("0").show();
	
	$(".indexTabNav ul li").mouseenter(function(){
		$(".indexTabNav ul li").removeClass("active");
		$(this).addClass("active");

		var idx=$(this).index('.indexTabNav ul li');
		$(".indexTabBottom .indexTabCon").hide();
		$(".indexTabBottom .indexTabCon").eq(idx).show();
	})

// 右侧公告栏标签页效果
	$(".indexTabRight .indexTabNewNav ul li").first().addClass("active");
	$(".indexTabRight .indexTabNewList").hide();
	$(".indexTabRight .indexTabNewList").eq("0").show();

	$(".indexTabRight .indexTabNewNav ul li").mouseenter(function(){
		$(".indexTabRight .indexTabNewNav ul li").removeClass("active");
		$(this).addClass("active");

		var idx=$(this).index(".indexTabRight .indexTabNewNav ul li");
		$(".indexTabRight .indexTabNewList").hide();
		$(".indexTabRight .indexTabNewList").eq(idx).show();
	});

	

//广告栏轮播图函数 star
function lunBo(firstName){
	$(firstName+" .paging").show();	
	$(firstName+" .paging a:first").addClass("active");

	var imgWidth = $(firstName+" .window").width();
	var imgSun = $(firstName+" .img_reel img").size();
	var pagingSun = imgSun - 1;
	var imgReelWidth = imgWidth * imgSun;
	var rel = $(firstName+" .paging a:first").next().attr("rel");
	var play = null;

	$(firstName+' .img_reel').css({'width':imgReelWidth});

	// 指示灯以及图片切换逻辑 	
	var nextImg = function(){

		if(!rel){
			var triggerID = imgSun - 1;
			var image_reelPosition = triggerID * imgWidth;	

			$(firstName+" .paging a").removeClass("active");
			$(firstName+" .paging a:first").addClass("active");

			$(firstName+' .img_reel').animate({
				left: - image_reelPosition
			},500,function(){
				$(firstName+" .img_reel").css({'left':'0px'});
			});
			rel = $(firstName+" .paging a:first").next().attr("rel");

		}else{
			$(firstName+" .paging a").removeClass("active");
			$(firstName+" .paging a[rel="+rel+"]").addClass("active");

			var triggerID = rel-1;
			var image_reelPosition = triggerID * imgWidth;	

			$(firstName+' .img_reel').animate({
				left: - image_reelPosition
			},500);                 
			rel = $(firstName+" .paging a.active").next().attr("rel");
		}
	};

	//设置定时器
	play = setInterval(nextImg,2000);

	//鼠标点击序号标签拖动图片效果
	$(firstName+" .paging a").click(function(){
		clearInterval(play);
		rel = $(this).attr("rel");
		$(firstName+" .paging a").removeClass("active");
		$(this).addClass("active");

		var triggerID = rel-1;
		var image_reelPosition = triggerID * imgWidth;	

		$(firstName+' .img_reel').animate({
			left: - image_reelPosition
		},500);                 
		rel = $(firstName+" .paging a.active").next().attr("rel");
		return false;
	});

	//鼠标移入暂停效果
	$(firstName+' .cursole').hover(function(){
		clearInterval(play)
		play=null;
	},function(){
		play=setInterval(nextImg,2000);
	});	
}
//广告栏轮播图 end 

// 广告栏轮播图 1
(function(){
	var firstName=".indexTuanBox";
	lunBo(firstName);
})();

// 广告栏轮播图 2
(function(){
	var firstName=".indexAdFocus";
	lunBo(firstName);
})();

// 优惠推荐下左右移动特效
(function(){
	// 设置指示灯
	setLight=function(){
		var n=s/-1200;
		$(".indexRaceBox .rightNavBox span").removeClass('active');
		$(".indexRaceBox .rightNavBox span").eq(n).addClass('active');
	};

	s=0;
	v=1200;
	$('.raceRight').click(function(){
		s-=v;
		if(s<=-2400){
			s=-2400;
		};
		$(".indexRaceBox .receBoxs").stop().animate({
				'left':s+'px' 
		},500);
	//设置指示灯
		setLight();
	});

	$('.raceLeft').click(function(){
		s+=v;
		if(s>=0){
			s=0;
		};
		$(".indexRaceBox .receBoxs").stop().animate({
				'left':s+'px'
		},500);
	//设置指示灯
		setLight();	
	});
})();

// 优惠推荐右侧指示灯控制
$(".indexRaceBox .rightNavBox span").click(function(){

	$(".indexRaceBox .rightNavBox span").removeClass('active');
	$(this).addClass("active");

	idx=$(this).index(".indexRaceBox .rightNavBox span");
	// alert(idx)
	s=-idx*v;
	$(".indexRaceBox .receBoxs").stop().animate({
			'left':s+'px'
	},500);

});

// 白酒馆轮播图
(function(){
	var firstName=".whiteWineJs";
	lunBo(firstName);
})();

// 白酒馆标签页效果
(function(){
	$(".whiteWineJs .topTenConWrap ul").hide();
	$(".whiteWineJs .topTenConWrap ul").eq(0).show()
	$(".whiteWineJs .topTenNav li a").eq(0).addClass("active");

	$(".whiteWineJs .topTenNav li a").mouseenter(function(){
	$(".whiteWineJs .topTenNav li a").removeClass("active");
	$(this).addClass("active");

	idx=$(this).index(".whiteWineJs .topTenNav li a");
	// alert(idx);
	$(".whiteWineJs .topTenConWrap ul").hide();
	$(".whiteWineJs .topTenConWrap ul").eq(idx).show();
});
})();

// 葡萄酒馆轮播图
(function(){
	var firstName=".redWineJs";
	lunBo(firstName);
})();

// 葡萄酒馆标签页效果
(function(){
	$(".redWineJs .topTenConWrap ul").hide();
	$(".redWineJs .topTenConWrap ul").eq(0).show()
	$(".redWineJs .topTenNav li a").eq(0).addClass("active");

	$(".redWineJs .topTenNav li a").mouseenter(function(){
	$(".redWineJs .topTenNav li a").removeClass("active");
	$(this).addClass("active");

	idx=$(this).index(".redWineJs .topTenNav li a");
	// alert(idx);
	$(".redWineJs .topTenConWrap ul").hide();
	$(".redWineJs .topTenConWrap ul").eq(idx).show();
});
})();

// 洋酒馆轮播图
(function(){
	var firstName=".foreignWinejs";
	lunBo(firstName);
})();

// 洋酒馆标签页效果
(function(){
	$(".foreignWinejs .topTenConWrap ul").hide();
	$(".foreignWinejs .topTenConWrap ul").eq(0).show()
	$(".foreignWinejs .topTenNav li a").eq(0).addClass("active");

	$(".foreignWinejs .topTenNav li a").mouseenter(function(){
		$(".foreignWinejs .topTenNav li a").removeClass("active");
		$(this).addClass("active");

		idx=$(this).index(".foreignWinejs .topTenNav li a");
		$(".foreignWinejs .topTenConWrap ul").hide();
		$(".foreignWinejs .topTenConWrap ul").eq(idx).show();
	});
})();

// 官方推荐小滑块及标签页效果
(function(){
	$(".contentThree .logoBox .logoAll").hide();
	$(".contentThree .logoBox .logoAll").eq(0).show();
	$(".contentThree .titleBox li").mouseenter(function(){
		var l = $(this).position().left;
		$(".contentThree .titleSlider").animate({
			"left" : l + "px"
		},100);

		var idx = $(this).index(".contentThree .titleBox li");
		$(".contentThree .logoBox .logoAll").hide();
		$(".contentThree .logoBox .logoAll").eq(idx).show();
	});

})()

// 官方推荐之左右页效果
$(".contentThree .logoBox .logoAll .prevPage").click(function(){
	$(".contentThree .logoBox .logoFirst").animate({
		"left":"0px"
	},200)
});

$(".contentThree .logoBox .logoAll .nextPage").click(function(){
	// alert(1);
	$(".contentThree .logoBox .logoFirst").animate({
		"left":"-1200px" 
	},200)
});

// 官方推荐之图片动效
$(".contentThree .logoBox li img").hover(function(){
	$(this).stop().animate({
		"left":"-100px"
	},200)
},function(){
	$(this).stop().animate({
		"left":"0px"
	},200)
});

// 页面底部微信二维码图片隐藏、显示特效
$(".footer .footerBottom ul li .weiXin").hover(function() {
	$(".footer .footerBottom ul li .weiXin .weiXinCode").show();
},function(){
	$(".footer .footerBottom ul li .weiXin .weiXinCode").hide();
})

// 右边栏
sw=$(window).height();
$(".rightSidebar").css({'height':sw+"px"})

$(".rightSidebar .rSidebarItem").hover(function(){
	$(this).find(".rsItemCon").show();
},function(){
	$(this).find(".rsItemCon").hide();
});

// 右边栏回到顶部
$(".rightSidebar .backTop").click(function(){
	$(window).scrollTop(0);
});

// 左侧滚动监听回到顶部
$(".leftNav .floorBack").hover(function(){
	$(".leftNav .floorBack i").css({"background-position":"-95px -190px"})
},function(){
	$(".leftNav .floorBack i").css({"background-position":"-74px -190px"})
});

$(".leftNav .floorBack").click(function(){
	$(window).scrollTop(0);
});

// 左侧滚动监听栏鼠标移入特效
$(".leftNav .floorBtn").mouseenter(function(){
	$(this).find('i').hide();

	var fname2 = $(this).find("a").attr("name2");

	$(this).find('a').stop().html(fname2).animate({
		"width":"70px"
	},500)
});
$(".leftNav .floorBtn").mouseleave(function(){
	$(this).find('a').stop().animate({
		"width":"30px"
	},200,function(){
		$(this).css({"display":"none"})
		$(this).next().show();
		myscroll();
	});
});

// 滚动监听标签快速定位特效
$(".leftNav .floorBtn").click(function(){
	var f = $(this).find('a').attr('name');
	var t = $("#"+f).offset().top-150;
	$(window).scrollTop(t);
});

// 监听特效
$(window).scroll(function(){
	myscroll();
});

function myscroll(){
	$(".comTitle .newIndexIcon").each(function(){
		var st = $(window).scrollTop();
		var ot = $(this).offset().top-200;
		var fname = $(this).attr("id");

		if(st>=ot){

			$(".leftNav").css({"display":"block"});

			$(".leftNav .floorBtn a[name="+fname+"]").next("i").hide();
			$(".leftNav .floorBtn a[name="+fname+"]").html(fname).css({"display":"block"});

			$(".leftNav .floorBtn a").not($(".leftNav .floorBtn a[name="+fname+"]")).each(function(){
				var fname3 = $(this).attr("name2");
				$(this).html(fname3).css({"display":"none"});
				$(this).next().show();	
			});
		}
	});
}



});



















