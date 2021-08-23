$(document).ready(function(){
    $("a[href*=#]").on("click", function(e){
        
        var anchor = $(this)
            ,wrapper = $('#wrapper')
            ,body = $('#body')
            ;

        e.preventDefault();
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 777);

        wrapper.removeClass('menu-open');  
        body.css({ 'overflow' : 'visible'});  
        return false;
    });
});
