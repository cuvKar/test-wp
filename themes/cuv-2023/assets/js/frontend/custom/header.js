/**
 * Header Handlers
 *
 * @author John Ranby
 * @see    https://github.com/jranby
 */
jQuery(document).ready(function($) {

    /*
     * @TODO
     */
    var mainHeader = $('#page-header'),
        headerHeight = mainHeader.height(),
        scrolling = false,
        previousTop = 0,
        currentTop = 0,
        scrollDelta = 10,
        scrollOffset = 90;

    /*
     * @TODO
     */
    $(window).on('scroll', function() {
        if (! scrolling) {
            scrolling = true;
            (! window.requestAnimationFrame) 
            ? setTimeout(autoHideHeader, 250)
            : requestAnimationFrame(autoHideHeader);
        }
    });
    

    /*
     * @TODO
     */
    $(window).on('resize', function() {
        headerHeight = mainHeader.height();
    });


    /*
     * @TODO
     */
    function autoHideHeader() {
        var currentTop = $(window).scrollTop();
        animateLogo(currentTop);
        checkSimpleNavigation(currentTop);
        previousTop = currentTop;
        scrolling = false;
    }


    /*
     * @TODO
     */
    function animateLogo(currentTop) {
        if (currentTop > 1) {
            $('body').addClass('scrolled');
        } else {
            $('body').removeClass('scrolled');
        }
    }


    /*
     * @TODO
     */
    function checkSimpleNavigation(currentTop) {
        if (previousTop - currentTop > scrollDelta) {
            if (mainHeader.hasClass('has-shop-nav')) {
                $('html').removeClass('nav-pinned');
                mainHeader.removeClass('is-hidden');
            }
        } else if (currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
            if (mainHeader.hasClass('has-shop-nav')) {
                $('html').addClass('nav-pinned');
                mainHeader.addClass('is-hidden');
            }
        }
    }
});