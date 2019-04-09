$(document).ready(function() {
              var owl = $('.owl-carousel');
              owl.owlCarousel({
                items: 4,
                loop: true,
                margin: 10,
                nav: false,
                responsive: {
                	0:{
            			items:1,
            			nav:false
        			},
        			600:{
           			 items:3,
            			nav:false
        			},
        			1000:{
           			 items:4,
            			nav:false,
            			loop:false
        			}
                }
              });
            });