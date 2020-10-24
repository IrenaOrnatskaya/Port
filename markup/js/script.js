function darkToggle() {
               var element = document.getElementById("body");
               element.classList.toggle("dark-theme");
            }

$(document).ready(function () {
	$('.burger-menu').click(function (event) {
		$('.wrapper').toggleClass('menu-open');
	});
});

$(function(){
	$().timelinr({
		orientation: 'horizontal',
		containerDiv: '#timeline',
		datesDiv: '#dates',
		datesSelectedClass: 'selected',
		datesSpeed: 'normal',
		issuesDiv : '#issues',
		issuesSelectedClass: 'selected',
		issuesSpeed: 'fast',
		issuesTransparency: 0.2,
		issuesTransparencySpeed: 500,
		prevButton: '#prev',
		nextButton: '#next',
		arrowKeys: 'false',
		startAt: 1,
		autoPlay: 'false',
		autoPlayDirection: 'forward',
		autoPlayPause: 2000
	});
});