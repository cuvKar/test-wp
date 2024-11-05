/**
 * Menu and Mavigation Element Handlers.
 *
 * @author John Ranby
 * @see    https://github.com/jranby
 */
jQuery(document).ready(function($) {

    /*
     * Menu Toggle Click Hangler
     *
     * Bacon ipsum dolor amet tenderloin cow tongue,
     * filet mignon kielbasa brisket salami biltong.
     */
    $('.menu-toggle').on('click', function(e) {
        e.preventDefault();
        $('body').toggleClass('menu-open');
    });

    // ---------------------------------------------------------------------

    /*
     * Cache Current Window Wisth
     */
    var cachedWidth = $(window).width();

    // ---------------------------------------------------------------------

    /*
     * Sub Menu Toggle Click Hangler
     *
     * Bacon ipsum dolor amet tenderloin cow tongue,
     * filet mignon kielbasa brisket salami biltong.
     */
    $('.menu-item-has-children > a').on('click', function(e) {
        if (cachedWidth < 1366) {
            e.preventDefault();
            $('.menu-item-has-children > a').not(this).parent().removeClass('sub-menu-open');
            $(this).parent().toggleClass('sub-menu-open');
        }
    });

    // ---------------------------------------------------------------------

    /*
     * Resize Handler
     *
     * Bacon ipsum dolor amet tenderloin cow tongue,
     * filet mignon kielbasa brisket salami biltong.
     */
    $(window).resize(function() {
        var newWidth = $(window).width();
        if (newWidth !== cachedWidth){
            if ($('body').hasClass('menu-open')) {
                $('body').removeClass('menu-open');
            }
            $('.menu-item-has-children').removeClass('sub-menu-open');
            cachedWidth = newWidth;
        }
    });

    // ---------------------------------------------------------------------

    /*
     * Off Sidebar Click To Close Handling
     *
     * Bacon ipsum dolor amet tenderloin cow tongue,
     * filet mignon kielbasa brisket salami biltong.
     */
    $(document).mouseup(function(evt) {
        if ($('body').hasClass('off-canvas-open')) {
            var elements = '.menu, .menu-toggle, .off-canvas, .menu-socials, .off-canvas-search';
            if (! $(elements).is(evt.target) && $(elements).has(evt.target).length === 0) {
                $('.off-canvas').removeClass('open');
                $('body').removeClass('off-canvas-open');
            }
        }
    });
});
