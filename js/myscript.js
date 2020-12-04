
		$(function(){
			//네비게이션 실행
			var gnb_li=$("#gnb li");
			var ht=$(window).height();
			var body =$("html,body");

			//윈도우창을 수정해도 해당페이지로 잘 넘어가게 하는 코드
			$(window).resize(function(){
				ht=$(window).height();
			})

			gnb_li.click(function(){
				var tg=$(this);
				var i=tg.index();
				var nowTop=ht*i;

				gnb_li.removeClass('active_nav');
				$(this).addClass('active_nav');

				//버튼 클릭시 해당 컨텐츠로 스르륵 이동
				$("html,body").animate({scrollTop:nowTop},600,"linear");
			})
			//스크롤시 해당 컨첸트의 메뉴를 활성화
			$(window).scroll(function(){
				var myscrollTop=$(window).scrollTop();
				if(myscrollTop>=0 && myscrollTop<ht){
					gnb_li.removeClass("active_nav");
					gnb_li.eq(0).addClass("active_nav");
				}
				else if(myscrollTop>=ht && myscrollTop<ht*2){
					gnb_li.removeClass("active_nav");
					gnb_li.eq(1).addClass("active_nav");
				}
				else if(myscrollTop>=ht*2 && myscrollTop<ht*3){
					gnb_li.removeClass("active_nav");
					gnb_li.eq(2).addClass("active_nav");
				}
				else if(myscrollTop>=ht*3 && myscrollTop<ht*4){
					gnb_li.removeClass("active_nav");
					gnb_li.eq(3).addClass("active_nav");
				}
				else{
					gnb_li.removeClass("active_nav");
					gnb_li.eq(4).addClass("active_nav");
				}
			})
			//스크롤이 움직이지 않도록 구현
			// $("#wrapper>*").not("#wrapper>.modi_modal").on("scroll touchmove mousewheel", function(event) {
			//   event.preventDefault();
			//   event.stopPropagation();
			//   return false;
			// });
			
			/*
			//마우스 휠에 반응하여 한 섹션씩 스르륵 이동
			$("section").on("mousewheel",function(event,delta){				
				if(delta>0){
					//마우스휠을 올렸을 때 실행구문
					var prev=$(this).prev().offset().top;
					$("html,body").stop().animate({"scrollTop":prev},600,"linear");
				}
				else if(delta<0){
					//마우스휠을 내렸을 때 실행구문
					var next=$(this).next().offset().top;
					$("html,body").stop().animate({"scrollTop":next},600,"linear");
				}
			})
			*/

			//1page 캐로셀
			var carousel_stories=$(".stories li");
			var carousel_stories_btn=$(".stories_btn li");
			var current_story=0;

			carousel_stories_btn.click(function(){
				var tg=$(this);
				var i=tg.index();
				if(current_story==i) return 0;
					// 동작하지 않겠다!

				move(i);

				function move(i){
					var currentImg_stories=carousel_stories.eq(current_story);
					var nextImg_stories=carousel_stories.eq(i);

					currentImg_stories.css("left",0).
						animate({"left":"-100%"});
					nextImg_stories.css("left","100%").
						animate({"left":0});
					current_story=i;
				}

				//1page 캐로셀 버튼 활성화
				carousel_stories_btn.removeClass("active_stories");
				tg.addClass("active_stories");
			})

			// 2page 모달창
			var page2_x_btn=$("#recipe_page02 .fa-times-circle");
			var modi_tag=$(".modi_tag li");
			var modi_modalBg=$(".modi_modal")
			var modi_modal=$(".modi_modal div");
			var blackBg_2page=$(".blackBg_2page")
			
			page2_x_btn.hide();
			modi_modalBg.hide();
			modi_modal.hide();
			blackBg_2page.hide();

			
			modi_tag.click(function(){
				var i=$(this).index();
				modi_modal.hide(500);
				blackBg_2page.fadeIn(500);
				modi_modalBg.fadeIn(500);
				page2_x_btn.fadeIn(500);
				modi_modal.eq(i).fadeIn(500);
				body.css("overflow","hidden");
			})

			page2_x_btn.click(function(){
				page2_x_btn.fadeOut(300);
				blackBg_2page.fadeOut(300);
				modi_modalBg.fadeOut(300);
				modi_modal.fadeOut(300);
				body.css("overflow","");
				window.location.reload();
			})

			blackBg_2page.click(function(){
				page2_x_btn.fadeOut(300);
				blackBg_2page.fadeOut(300);
				modi_modalBg.fadeOut(300);
				modi_modal.fadeOut(300);
				body.css("overflow","");
				window.location.reload();
			})

			// 3page 우유 영양정보 모달창
			var information=$(".information li");
			var milkModalBg=$(".milk_modal");
			var milkModal=$(".milk_modal>div");
			var milkModal_prev=$(".milk_modal .fa-caret-square-left");
			var milkModal_next=$(".milk_modal .fa-caret-square-right");
			var page3_x_btn=$(".milk_modal .fa-times");
			var bg_3page=$(".bg_3page");

			//3page 우유 영양정보 모달창 캐로셀버튼
			milkModal_prev.click(function(){
				var currentImg=milkModal.eq(current);
				var nextImg=milkModal.eq(current-=1);

				currentImg.stop().css("left",0).animate({"left":"100%"});
				nextImg.stop().css("left","-100%").animate({"left":0});
				
				if(current==-1){current=6}
				i2-=1;
			})

			milkModal_next.click(function(){
				var currentImg=milkModal.eq(current);
				var nextImg=milkModal.eq(current=current+1);

				currentImg.css("left",0).animate({"left":"-100%"});
				nextImg.css("left","100%").animate({"left":0});
				
				if(current==7){
					current=-1;
					var currentImg=milkModal.eq(current);

					var nextImg=milkModal.eq(current=current+1);

					currentImg.css("left",0).animate({"left":"-100%"});
					nextImg.css("left","100%").animate({"left":0});
				}
				i2+=1;
			})

			milkModalBg.hide();
			bg_3page.hide();

			information.click(function(){
				i2=$(this).index();
				current=$(this).index();
				milkModalBg.fadeIn(500);
				bg_3page.fadeIn(500);

				milkModal.css("left","100%");
				milkModal.eq(i2).css("left",0);
			})

			// 우유 영양정보 close버튼
			page3_x_btn.click(function(){
				milkModalBg.fadeOut(300);
			})

			bg_3page.click(function(){
				milkModalBg.fadeOut(300);
			})
			
			// 3page 한정판 캐러셀 prev, next버튼
			var carousel_editions=$(".edition li")
			var carousel_edition_prev=$(".edition .fa-angle-left");
			var carousel_edition_next=$(".edition .fa-angle-right");
			var current_edition=0;


			carousel_edition_prev.click(function(){
				var currentImg = carousel_editions.eq(current_edition);
				var nextImg = carousel_editions.eq(current_edition=current_edition-1);
				currentImg.stop().css("left",0).animate({"left":"100%"});
				nextImg.stop().css("left","-100%").animate({"left":0});

				if(current_edition==-1){current_edition=3}
			})

			carousel_edition_next.click(function(){
				var currentImg = carousel_editions.eq(current_edition);
				var nextImg = carousel_editions.eq(current_edition=current_edition+1);
				currentImg.stop().css("left",0).animate({"left":"-100%"});
				nextImg.stop().css("left","100%").animate({"left":0});

				if(current_edition==4)
					{current_edition=-1;
					var currentImg = carousel_editions.eq(current_edition);
					var nextImg = carousel_editions.eq(current_edition=current_edition+1);
					currentImg.stop().css("left",0).animate({"left":"-100%"});
					nextImg.stop().css("left","100%").animate({"left":0});
				}
			})

			// 4page 분바스틱 모달창
			var page4_stick_x_btn=$("#goods_page04 .fa-times-circle")
			var bgStick_4page=$(".bgStick_4page");
			var stick=$(".stick")
			var stick_modal=$('.stick_modal')
			var stick_news=$('.stick_news')

			stick_modal.hide();
			bgStick_4page.hide();
			page4_stick_x_btn.hide();
			stick_news.hide();

			stick.click(function(){
				stick_modal.fadeIn(500);
				bgStick_4page.fadeIn(500);
				page4_stick_x_btn.fadeIn(500);
				stick_news.fadeIn(500);
				body.css("overflow","hidden");
			})

			page4_stick_x_btn.click(function(){
				stick_modal.fadeOut(500);
				bgStick_4page.fadeOut(500)
				page4_stick_x_btn.fadeOut(500);
				stick_news.fadeOut(500);
				body.css("overflow","");
			})

			bgStick_4page.click(function(){
				stick_modal.fadeOut(500);
				bgStick_4page.fadeOut(500)
				page4_stick_x_btn.fadeOut(500);
				stick_news.fadeOut(500);
				body.css("overflow","");
			});

			//4p 굿즈판매위치(옐로우카페) 모달창
			var page4_Yellow_x_btn=$('.yellowcafe .fa-window-close');
			var yellowcafe=$('.yellowcafe');
			var goods=$('.goods');
			var place_text=$('.place_text');
			var place_icon=$('.yellowcafe li:nth-child(2)')
			var bgYellowcafe_4page=$(".bgYellowcafe_4page");

			yellowcafe.hide();
			place_text.hide();
			bgYellowcafe_4page.hide();

			goods.click(function(){
				yellowcafe.fadeIn(500);
				bgYellowcafe_4page.show();
			})

			place_icon.click(function(){
				place_text.fadeToggle(500);
			})

			page4_Yellow_x_btn.click(function(){
				yellowcafe.fadeOut(500);
				bgYellowcafe_4page.hide();
			})

			bgYellowcafe_4page.click(function(){
				yellowcafe.fadeOut(500);
				bgYellowcafe_4page.hide();
			})

			//4page 굿즈종류소개(이미지)
			var goods_menu=$(".menuboard li")
			var frame=$(".frame>div")

			goods_menu.eq(0).click(function(){
				frame.css("background-image","url(css/img/04_goods/goods_menu/hat.jpg)");
			})
			goods_menu.eq(1).click(function(){
				frame.css("background-image","url(css/img/04_goods/goods_menu/keyling01.jpg)");
			})
			goods_menu.eq(2).click(function(){
				frame.css("background-image","url(css/img/04_goods/goods_menu/keyling02.jpg)");
			})
			goods_menu.eq(3).click(function(){
				frame.css("background-image","url(css/img/04_goods/goods_menu/keyling03.jpg)");
			})
			goods_menu.eq(4).click(function(){
				frame.css("background-image","url(css/img/04_goods/goods_menu/masking.jpg)");
			})
			
			//4page 굿즈종류소개(버튼)
			var menuboard=$(".menuboard li");

			menuboard.click(function(){
			menuboard.removeClass('active_menuboard');
			$(this).addClass('active_menuboard');
			})

			//5page 캐로셀
			var carousel_event=$(".event_banner li");
			var carousel_event_btn=$(".event_banner_btn li");
			var btn=$(".event_banner .btn_event");
			var eventOkay=$("#event_okay");
			var current_event=0;

			carousel_event_btn.click(function(){
				var tg=$(this);
				var i=tg.index();
				if(current_event==i) return 0;
					// 동작하지 않겠다!

				move(i);

				function move(i){
					var currentImg_event=carousel_event.eq(current_event);
					var nextImg_event=carousel_event.eq(i);

					currentImg_event.css("left",0).
						animate({"left":"-100%"});
					nextImg_event.css("left","100%").
						animate({"left":0});
					current_event=i;
				}
				
				//캐로셀 버튼 활성화
				carousel_event_btn.removeClass("active_event");
				tg.addClass("active_event");
			})

			// 응모하기버튼 알러트창
			btn.click(function(){
				// alert("모디슈머 이벤트에 참가해주셔서 감사합니다^^")

				var result=confirm("완료하시겠습니까?");
				if(result){
					//yes
					alert("모디슈머 이벤트에 참가해주셔서 감사합니다^^")
				}else{
					//no
				}
			})
		})