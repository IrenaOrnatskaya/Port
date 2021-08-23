$(document).ready(function(){
                $('.slick-slider').slick({
                	centerMode: true,
  					centerPadding: '20px',
  					draggable:true,
					 
					  slidesToShow: 3,
					  // slidesToScroll: 3,
					  arrows: true,
					  responsive: [
					    {
					      breakpoint: 768,
					      settings: {
					        arrows: false,
					        centerMode: true,
					        centerPadding: '40px',
					        slidesToShow: 3
					      }
					    },
					    {
					      breakpoint: 480,
					      settings: {
					        arrows: false,
					        centerMode: true,
					        centerPadding: '40px',
					        slidesToShow: 1
					      }
					    }
					  ]
					  
					});
                });
