function darkToggle() {
               var element = document.getElementById("body");
               element.classList.toggle("dark-theme");
            }

$(document).ready(function () {
	$('.burger-menu').click(function (event) {
		$('.wrapper').toggleClass('menu-open');
	});
});