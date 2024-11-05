/**
 * Scroll Functions + Handlers
 *
 * @author John Ranby
 * @see    https://github.com/jranby
 */
jQuery(document).ready(function($) {

    /*
     * Scroll To Element Button Handlers
     *
     * Bacon ipsum dolor amet tenderloin cow tongue,
     * filet mignon kielbasa brisket salami biltong.
     */
    if ($('.scroll-to-thee').length > 0) {
        $('.scroll-to-thee').each(function() {
            $(this).on('click', function(e) {
                e.preventDefault();
                var href = $(this).attr('href');
                CUVAjax.scrollToEl(href, 0, null);
            });            
        });        
    }

    // ---------------------------------------------------------------------

    /*
     * Scroll To Top
     *
     * Super simple scroll to top functionality
     * fired when scrolling past a given height.
     */
    $(window).scroll(function() {
        if ($(this).scrollTop() > 340) {
            $('#back-top').addClass('show');
        } else {
            $('#back-top').removeClass('show');
        }
    });

    $('#back-top').on('click', function(e) {
        e.preventDefault();
        $('body, html').animate({scrollTop: 0}, 800);
        return false;
    });
});
