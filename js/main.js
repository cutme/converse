/*jshint expr:true */

function debouncer( func , timeout ) {
   var timeoutID , timeout = timeout || 200;
   return function () {
      var scope = this , args = arguments;
      clearTimeout( timeoutID );
      timeoutID = setTimeout( function () {
          func.apply( scope , Array.prototype.slice.call( args ) );
      } , timeout );
   }
}

jQuery(function($) {
	var L = {
		fp: function() {
			var e = $('.o-fullpage'), cover = $('.js-cover'), play = $('.js-play'), video = document.getElementsByTagName('video')[0];
			e.fullpage({
				css3: false,
				navigation: true,
				navigationPosition: 'right',
				loopBottom: false,
				afterRender: function() {

					e.fadeIn(1000, function() {
						$('.js-buy').show().addClass('animated fadeInLeftBig');
					});

					play.on('click', function() {
						play.fadeOut();
						cover.fadeOut();
						$('video').show();
						$('video').get(0).play();
					});
					
/*
					video.onended = function(e) {
						play.fadeIn();
						cover.fadeIn();
						video.load();
				    };
*/
				},
				afterLoad: function(anchorLink, index) {
					if (index == 3) {
						//play.fadeIn(1000);
						//cover.fadeIn(1000);
					}
				},
				onLeave: function(index, nextIndex, direction){
		            var leavingSection = $(this);
		
		            if(index == 3 && direction =='down'){

		            }
		
		            else if(index == 3 && direction == 'up'){
		               
		            }
		        },
		        scrollOverflow: true
			});
			
			$('.js-next-section').on('click', function(e) {
				e.preventDefault();
				$.fn.fullpage.moveSectionDown();
			});
		},
		tabs: function() {

			var el = $('.js-tabs'),
				i;

			function showTab(i) {
				$('.o-tabs__nav .is-active').removeClass('is-active');
				$('.o-tabs__nav li').eq(i).addClass('is-active');	
				$('.o-tabs__content .o-tabs__item').removeClass('active').hide();
				$('.o-tabs__content .o-tabs__item').eq(i).addClass('is-active').fadeIn(250);
			}

			el.each(function() {
				var n = $('> .o-tabs__nav', this),
					t = $('> ul > li', n),
					i = n.find('.is-active').index();

				t.click(function(e) {
					e.preventDefault();
					
					var i = $(this).index();

					showTab(i);						
				});
				
				showTab(i);
			});
		},
		init: function() {
			L.fp();
			L.tabs();
		}
	};
	var S = {
		details: function() {
			var owl = $('.c-details .owl-carousel'), f = $('.c-details__fade');		

			owl.on('initialized.owl.carousel', function(e) {
				var d = $('.c-details__fade');
					d.detach();
					owl.prepend(d);
			});
			
			owl.owlCarousel({
				autoWidth: true,
				center: true,
				dots: false,
				items: 1,
				loop: true,
				nav: true,
				navText: ['',''],
				smartSpeed: 450
			});	
			
			$('.owl-next').addClass('icon-angle-right');
			$('.owl-prev').addClass('icon-angle-left');

		},
		models: function() {
			var owl = $('.c-models .owl-carousel'), i = $('.c-models__item'), t;
			
			owl.owlCarousel({
				dots: false,
				items: 2,
				smartSpeed: 450
			});
			
			i.on('click', function(e) {
				e.preventDefault();
				t = $(this);

				owl.find('.is-active').removeClass('is-active');
				t.addClass('is-active');
			});
		},
		init: function() {
			S.details();
			S.models();
		}
	}
	$(document).ready(function() {
		L.init();
		S.init();
	});
});