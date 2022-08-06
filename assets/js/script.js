
(function ($) {
    // WOW JS
    new WOW().init();

    $(document).ready(function () {
        $(".catagory_btn").click(function () {
            $('#catagory').slideToggle();
        });
    });

    /* ................Slider area..........................*/

    $('#slides').superslides({
        inherit_width_from: '.cover-slides',
        inherit_height_from: '.cover-slides',
        play: 5000,
        animation: 'fade',
    });

    $(".cover-slides ul li").append("<div class='overlay-background'></div>");

    /*------------------Modal-popup-------------------*/

    $(document).ready(function () {
        $('#overlay').modal('show');
        $(".popup_close_btn").click(function () {
            $('#overlay').modal('hide');
        });
    });

    /*----------------Pree-loader-----------------*/

    $(window).on('load', function () { // makes sure the whole site is loaded 
        $('#status').fadeOut(); // will first fade out the loading animation 
        $('#preloader').delay(700).fadeOut('slow'); // will fade out the white DIV that covers the website. 
        $('body').delay(700).css({ 'overflow': 'visible' });
    })


    /*------------tool-tip--------------------*/
    $(document).ready(function () {
        $('.tool-tip').tooltip();
    });

    $(document).ready(function () {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    });


    /*----------------back-to-top--------------*/

    $(".switch").on('click', function () {
        if ($("body").hasClass("light")) {
            $("body").removeClass("light");
            $(".switch").removeClass("switched");
        }
        else {
            $("body").addClass("light");
            $(".switch").addClass("switched");
        }
    });

    $(document).ready(function () {
        "use strict";

        //Scroll back to top

        var progressPath = document.querySelector('.progress-wrap path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 550;
        jQuery(window).on('scroll', function () {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.progress-wrap').addClass('active-progress');
            } else {
                jQuery('.progress-wrap').removeClass('active-progress');
            }
        });
        jQuery('.progress-wrap').on('click', function (event) {
            event.preventDefault();
            jQuery('html, body').animate({ scrollTop: 0 }, duration);
            return false;
        })


    });

    /*---------------------popular-product-------------------------/*/

    'use script';
    var mixer = mixitup('.popular-product-full');
    var mixer = mixitup('.popular');
    var mixer = mixitup('.popular', {
        selectors: {
            target: '.product-item'
        },
        animation: {
            duration: 100
        }
    });

    /*---category-Product---*/
    var $categoryProduct = $('.category-product-full');
    if ($categoryProduct.length > 0) {
        $('.category-product-full').owlCarousel({
            autoplay: true,
            loop: true,
            nav: true,
            autoplay: true,
            autoplayTimeout: 8000,
            smartSpeed: 800,
            items: 5,
            dots: false,
            navText: ['<span class="categoryProduct-slider-nav"><i class="fas fa-chevron-left"></i></i></i></span>', '<span class="categoryProduct-slider-nav"><i class="fas fa-chevron-right"></i></span>'],
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                },
                400: {
                    items: 2,
                },
                767: {
                    items: 3,
                },
                991: {
                    items: 4,
                },
                1001: {
                    items: 5,
                },

            }
        });
    }

    /*------------discount-time-area--------------*/

    var Countdown = {

        // Backbone-like structure
        $el: $('.countdown'),

        // Params
        countdown_interval: null,
        total_seconds: 0,

        // Initialize the countdown  
        init: function () {

            // DOM
            this.$ = {
                hours: this.$el.find('.bloc-time.hours .figure'),
                minutes: this.$el.find('.bloc-time.min .figure'),
                seconds: this.$el.find('.bloc-time.sec .figure')
            };

            // Init countdown values
            this.values = {
                hours: this.$.hours.parent().attr('data-init-value'),
                minutes: this.$.minutes.parent().attr('data-init-value'),
                seconds: this.$.seconds.parent().attr('data-init-value'),
            };

            // Initialize total seconds
            this.total_seconds = this.values.hours * 60 * 60 + (this.values.minutes * 60) + this.values.seconds;

            // Animate countdown to the end 
            this.count();
        },

        count: function () {

            var that = this,
                $hour_1 = this.$.hours.eq(0),
                $hour_2 = this.$.hours.eq(1),
                $min_1 = this.$.minutes.eq(0),
                $min_2 = this.$.minutes.eq(1),
                $sec_1 = this.$.seconds.eq(0),
                $sec_2 = this.$.seconds.eq(1);

            this.countdown_interval = setInterval(function () {

                if (that.total_seconds > 0) {

                    --that.values.seconds;

                    if (that.values.minutes >= 0 && that.values.seconds < 0) {

                        that.values.seconds = 59;
                        --that.values.minutes;
                    }

                    if (that.values.hours >= 0 && that.values.minutes < 0) {

                        that.values.minutes = 59;
                        --that.values.hours;
                    }

                    // Update DOM values
                    // Hours
                    that.checkHour(that.values.hours, $hour_1, $hour_2);

                    // Minutes
                    that.checkHour(that.values.minutes, $min_1, $min_2);

                    // Seconds
                    that.checkHour(that.values.seconds, $sec_1, $sec_2);

                    --that.total_seconds;
                }
                else {
                    clearInterval(that.countdown_interval);
                }
            }, 1000);
        },

        animateFigure: function ($el, value) {

            var that = this,
                $top = $el.find('.top'),
                $bottom = $el.find('.bottom'),
                $back_top = $el.find('.top-back'),
                $back_bottom = $el.find('.bottom-back');

            // Before we begin, change the back value
            $back_top.find('span').html(value);

            // Also change the back bottom value
            $back_bottom.find('span').html(value);

            // Then animate
            TweenMax.to($top, 0.8, {
                rotationX: '-180deg',
                transformPerspective: 300,
                ease: Quart.easeOut,
                onComplete: function () {

                    $top.html(value);

                    $bottom.html(value);

                    TweenMax.set($top, { rotationX: 0 });
                }
            });

            TweenMax.to($back_top, 0.8, {
                rotationX: 0,
                transformPerspective: 300,
                ease: Quart.easeOut,
                clearProps: 'all'
            });
        },

        checkHour: function (value, $el_1, $el_2) {

            var val_1 = value.toString().charAt(0),
                val_2 = value.toString().charAt(1),
                fig_1_value = $el_1.find('.top').html(),
                fig_2_value = $el_2.find('.top').html();

            if (value >= 10) {

                // Animate only if the figure has changed
                if (fig_1_value !== val_1) this.animateFigure($el_1, val_1);
                if (fig_2_value !== val_2) this.animateFigure($el_2, val_2);
            }
            else {

                // If we are under 10, replace first figure with 0
                if (fig_1_value !== '0') this.animateFigure($el_1, 0);
                if (fig_2_value !== val_1) this.animateFigure($el_2, val_1);
            }
        }
    };


    // Let's go !
    Countdown.init();
    // Create Countdown

    /*--------------------Start-menu-area-----------------------*/

    const menu = document.querySelector('.menu');
    const menuSection = menu.querySelector('.menu-section');
    const menuArrow = menu.querySelector('.menu-mobile-arrow');
    const menuClosed = menu.querySelector('.menu-mobile-close');
    const menuToggle = document.querySelector('.menu-mobile-toggle');
    const menuOverlay = document.querySelector('.overlay');
    let subMenu;

    menuSection.addEventListener('click', (e) => {
        if (!menu.classList.contains('active')) {
            return;
        }
        if (e.target.closest('.menu-item-has-children')) {
            const hasChildren = e.target.closest('.menu-item-has-children');
            showSubMenu(hasChildren);
        }
    });

    menuArrow.addEventListener('click', () => {
        hideSubMenu();
    });

    menuToggle.addEventListener('click', () => {
        toggleMenu();
    });

    menuClosed.addEventListener('click', () => {
        toggleMenu();
    });

    menuOverlay.addEventListener('click', () => {
        toggleMenu();
    });

    // Show & Hide Toggle Menu Function
    function toggleMenu() {
        menu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
    }

    // Show the Mobile Side Menu Function
    function showSubMenu(hasChildren) {
        subMenu = hasChildren.querySelector('.menu-subs');
        subMenu.classList.add('active');
        subMenu.style.animation = 'slideLeft 0.5s ease forwards';
        const menuTitle = hasChildren.querySelector('i').parentNode.childNodes[0].textContent;
        menu.querySelector('.menu-mobile-title').innerHTML = menuTitle;
        menu.querySelector('.menu-mobile-header').classList.add('active');
    }

    // Hide the Mobile Side Menu Function
    function hideSubMenu() {
        subMenu.style.animation = 'slideRight 0.5s ease forwards';
        setTimeout(() => {
            subMenu.classList.remove('active');
        }, 300);

        menu.querySelector('.menu-mobile-title').innerHTML = '';
        menu.querySelector('.menu-mobile-header').classList.remove('active');
    }

    // Windows Screen Resizes Function
    window.onresize = function () {
        if (this.innerWidth > 991) {
            if (menu.classList.contains('active')) {
                toggleMenu();
            }
        }
    };

    /*----------------------End-menu-area--------------------------*/


}(jQuery));