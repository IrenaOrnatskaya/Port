//DARK THEME
function darkToggle() {
               let element = document.getElementById("body");
               element.classList.toggle("dark-theme");
            }

// BURGER MENU

$(document).ready(function () {
	$('.burger-menu').click(function (event) {
		$('.wrapper').toggleClass('menu-open');
	});
});

//ARROW UP
let btn = $('#arrow-up');
$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});
btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});


// TIMELINE

 let timeline = {    
    cacheDom: function () {
        this.timeline = document.querySelector('.js-timeline');
        this.year = this.timeline.querySelector('.js-year');
        this.controlBack = this.timeline.querySelector('.js-back');
        this.controlForward = this.timeline.querySelector('.js-forward');
        this.dotsContainer = this.timeline.querySelector('.js-dots-container');
        this.slider = this.timeline.querySelector('.js-slider');
        this.dots = this.timeline.querySelectorAll('.js-dot');
        this.textContainer = this.timeline.querySelector('.js-textcontainer');
        this.textItems = this.timeline.querySelectorAll('.js-textitem');
    },
    
    bindEvents: function () {
        let self = this;
        this.pagingInterval = {}
        
        ;['mousedown', 'touchdown'].forEach(function (eventType) {
            self.controlBack.addEventListener(eventType, function () {
                self.goBack();
                
                clearInterval(self.pagingInterval);
                self.pagingInterval = setInterval(function () {
                    self.goBack();
                }, 250);
            });
            self.controlForward.addEventListener(eventType, function () {
                self.goForward();
                
                clearInterval(self.pagingInterval);
                self.pagingInterval = setInterval(function () {
                    self.goForward();
                }, 250);
            });
        });
        
        ;['mouseup', 'touchend'].forEach(function (eventType) {
            self.timeline.addEventListener(eventType, function () {
                clearInterval(self.pagingInterval);    
            });
        });
        
        
        
        this.slider.addEventListener('touchstart', function (e) {
            self.touchstartX = e.touches[0].clientX;
            self.touchstartSliderX = parseInt(self.slider.style.left);
            
            this.classList.add('is-touching');
        });
        this.slider.addEventListener('touchmove', function (e) {            
            let delta = e.touches[0].clientX - self.touchstartX;
            let target = self.touchstartSliderX + delta;
            
            if (target < self.sliderLeftMin && target > self.sliderLeftMax) {
                self.slider.style.left = self.touchstartSliderX + delta + 'px';                
            }           
        });
        this.slider.addEventListener('touchend', function () {
            this.classList.remove('is-touching');
        });
        
        Array.prototype.forEach.call(this.dots, function (dot) {
            dot.addEventListener('click', function () {
                console.log('click dot');
                self.changeState(~~this.getAttribute('data-year'));
            });
        });
        
        let resizing = setTimeout(resized, 250);
        function resized () {
            self.resizeTextContainer();
            self.moveSlider();
            self.getSliderBounds();            
        }
        window.addEventListener('resize', function () {
            clearTimeout(resizing);
            resizing = setTimeout(resized, 250);
        });
        
    },
    
    changeState: function (state) {
        console.log('changeState', state);
        this.state.year = state;
        this.state.index = state - this.yearMin;
        this.changeYear();
        this.changeText();
        this.setActiveDot();
        this.moveSlider();
        this.switchControlsVisibility();
        
        console.log('this.state', this.state);
    },
    
    goBack: function () {
        if (this.state.year > this.yearMin) {
            console.log('goBack');
            this.changeState(this.state.year - 1);
        }        
    },
    
    goForward: function () {
        console.log('goForward');
        if (this.state.year < this.yearMax) {
            this.changeState(this.state.year + 1);
        }        
    },
    
    changeYear: function () {
        this.year.innerHTML = this.state.year
    },
    
    changeText: function () {
        let self = this;
        Array.prototype.forEach.call(this.textItems, function (textItem) {
            textItem.classList.remove('is-active');
            
            if (~~textItem.getAttribute('data-year') === self.state.year) {
                textItem.classList.add('is-active');
                self.state.activeTextItem = textItem;                            
                self.resizeTextContainer();
            }
        });        
    },
    
    moveSlider: function () {
        let width = this.dotsContainer.getBoundingClientRect().width;
        let target = (width / 2) - ((this.state.index + 1) * (this.sliderDotWidth)) + (this.sliderDotWidth / 2);        
        this.slider.style.left = target + 'px';
    },
    
    resizeTextContainer: function () {
        this.state.textHeight = this.state.activeTextItem.getBoundingClientRect().height;
        this.textContainer.style.height = this.state.textHeight + 'px'; 
    },
    
    setActiveDot: function () {
        let self = this;
        Array.prototype.forEach.call(this.dots, function (dot) {
            dot.classList.remove('is-active');
            if (~~dot.getAttribute('data-year') === self.state.year) {
                dot.classList.add('is-active');
            }
        });
    },
    
    switchControlsVisibility: function () {
        if (this.state.year <= this.yearMin) {
            this.controlBack.classList.remove('is-visible');
        } else {
            this.controlBack.classList.add('is-visible');
        }
        if (this.state.year >= this.yearMax) {
            this.controlForward.classList.remove('is-visible');
        } else {
            this.controlForward.classList.add('is-visible');
        }
    },
    
    getSliderBounds: function () {         
        let width = this.dotsContainer.getBoundingClientRect().width;
        this.sliderLeftMin = (width / 2) - this.sliderDotWidth + (this.sliderDotWidth / 2);
        this.sliderLeftMax = (width / 2) - (this.dots.length * this.sliderDotWidth) + (this.sliderDotWidth / 2);
    },
    
    init: function (options) {        
        this.cacheDom();
        this.bindEvents();
        
        this.yearMin = ~~this.dots[0].getAttribute('data-year');
        this.yearMax = ~~this.dots[this.dots.length-1].getAttribute('data-year');
        
        this.sliderDotWidth = (function (dot) {
            return dot.getBoundingClientRect().width + parseInt(getComputedStyle(dot)['margin-left']) + parseInt(getComputedStyle(dot)['margin-right'])
        })(this.dots[0]);
        
        this.state = {
            year: options.startYear,
            index: options.startYear - this.yearMin,
            activeTextItem: this.timeline.querySelector('.js-textitem[data-year="' + options.startYear + '"]'),
            textHeight: 0
        }

        this.getSliderBounds();
        
        this.changeState(this.state.year);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    timeline.init({
        startYear: 2020
    });    
});

