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
					e.show();

					$('.c-start__image').fadeIn(4000, function() {
						$('.c-logo').fadeIn(2000, function() {
							$('.js-buy').fadeIn(3000);
							$('#fp-nav').fadeIn(3000);
							
							setTimeout(function() {
								$('.js-next-section').fadeIn(3000);
							}, 1000);
						});						
					});					

					play.on('click', function() {
						play.fadeOut();
						cover.fadeOut();
						$('video').show();
						$('video').get(0).play();
					});
					
					video.onended = function(e) {
						play.fadeIn();
						cover.fadeIn();
						//video.load();
				    };

				},
				afterLoad: function(anchorLink, index) {
					if (index == 3) {
						play.fadeOut();
						cover.fadeOut();
						$('video').show();
						$('video').get(0).play();
					}
				},
				onLeave: function(index, nextIndex, direction){
		            var leavingSection = $(this);
		
		            if(index == 3 && direction =='down'){

		            }
		
		            else if(index == 3 && direction == 'up'){
		               
		            }
		        },
		        paddingTop: '50px',
		        paddingBottom: '50px',
				responsiveWidth: 760,
				responsiveHeight: 867,
		        scrollOverflow: true
			});
			
			$('.js-next-section').on('click', function(e) {
				e.preventDefault();
				$.fn.fullpage.moveSectionDown();
			});
		},
		tabs: function() {

			var el = $('.js-tabs'), i;

			function showTab(i, w) {
				$('.o-tabs__nav .is-active', w).removeClass('is-active');
				$('.o-tabs__nav li', w).eq(i).addClass('is-active');	
				$('.o-tabs__content .o-tabs__item', w).removeClass('is-active');
				$('.o-tabs__content .o-tabs__item', w).eq(i).addClass('is-active');
			}

			el.each(function() {
				var n = $('> .o-tabs__nav', this),
					t = $('> ul > li', n),
					i = n.find('.is-active').index(),
					_t = $(this);

				t.click(function(e) {
					e.preventDefault();
					
					var i = $(this).index();

					showTab(i, _t);						
				});
				
				showTab(i, _t);	
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
				dots: true,
				items: 1,
				loop: true,
				marign: 100,
				nav: true,
				navText: ['',''],
				smartSpeed: 450
			});	
			
			$('.owl-next', owl).addClass('icon-angle-right');
			$('.owl-prev', owl).addClass('icon-angle-left');

		},
		models: function() {
			var owl = $('.c-models .owl-carousel'), owl_big, c = '#model-1', b = $('.js-bigslide'), i = $('.c-models__item'), s = 'high', t;
			
			owl.owlCarousel({
				dots: false,
				items: 2,
				smartSpeed: 450
			});
			
			function init(id) {
				$(id).addClass('is-active');
				
				// Reset Tabs
				$('.js-tabs').find('.is-active').removeClass('is-active');
				
				// Activate first Tab Nav, Content and Thumb
				$(id).find('.o-tabs__nav li').eq(0).addClass('is-active');
				$(id).find('.o-tabs__content .o-tabs__item').eq(0).addClass('is-active');
				$(id).find('.o-tabs__content .is-active .js-thumbs .c-types__item').eq(0).addClass('is-active');				

				// Destroy Carousel
				owl_big = $('.js-bigslide .owl-loaded');
				owl_big.trigger('destroy.owl.carousel');				

				b.find('.is-active').removeClass('is-active');

				// Activate First Carousel
				$(id).find('.js-bigslide .c-types__item').eq(0).addClass('is-active');
				$(id).find('.js-bigslide .is-active .high').addClass('is-active');
				owl_big = b.find('.owl-carousel.high');
				S.big(owl_big);
			}
			
			i.on('click', function(e) {
				e.preventDefault();
				t = $(this);

				owl.find('.is-active').removeClass('is-active');
				t.addClass('is-active');
				
				c = $(this).attr('data-id');
					
				$('.c-types').removeClass('is-active');
				
				init(c);
			});

			function tabs() {
				var tabs = $('.js-tabs'), navitem = $('.o-tabs__nav li', tabs);
				
				navitem.on('click', function(ev) {
					s = $(this).attr('data-size');
				});
			}
			
			function thumbs() {
				var e = $('.js-thumbs'), i = $('.c-types__item', e), idx, t;
				
				i.on('click', function(ev) {
					ev.preventDefault();
					idx = $(this).index();
					
					t = $(this);

					e.find('.is-active').removeClass('is-active');
					
					t.addClass('is-active');
					
					// Destroy Big Slide
					owl_big.trigger('destroy.owl.carousel');
					b.find('.is-active').removeClass('is-active');
					
					// Activate
					$(c).find('.js-bigslide .c-types__item').eq(idx).addClass('is-active');
					$(c).find('.js-bigslide .c-types__item').eq(idx).find('.'+s).addClass('is-active');
					
					owl_big = $(c).find('.js-bigslide .owl-carousel.is-active');
					S.big(owl_big);
				});
			}

			init('#model-1');
			tabs();
			thumbs();
		},
		big: function(t) {			
		
			t.owlCarousel({
				dots: true,
				items: 1,
				lazyLoad: false,
				smartSpeed: 450,
				loop: true,
				nav: true,
				navText: ['',''],
				smartSpeed: 450
			});
			
			$('.owl-next', t).addClass('icon-angle-right');
			$('.owl-prev', t).addClass('icon-angle-left');


		},
		init: function() {
			S.details();
			S.models();
			//S.big();
		}
	}
	$(document).ready(function() {
		L.init();
		S.init();
	});
});