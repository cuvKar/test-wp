/*
 * Cookies + Cookie Notice
 *
 * @author John Ranby
 * @see    https://github.com/jranby
 */
jQuery(document).ready(function($) {

    /*
     * Dismissed Cookie Notification
     *
     * Bacon ipsum dolor amet tenderloin cow tongue,
     * filet mignon kielbasa brisket salami biltong.
     */
    if (! Cookies.get('dismissed-notifications')) {
        $('body').addClass('cookie');
        $('#cookie-notice').show();
    }

    // ---------------------------------------------------------------------

    /*
     * Dismissed Cookie Notification
     *
     * Bacon ipsum dolor amet tenderloin cow tongue,
     * filet mignon kielbasa brisket salami biltong.
     */
    $('.dismiss-notice, .btn-cookie').click(function (e) {
        // prevent jump
        e.preventDefault();
        // remove body class
        $('body').removeClass('cookie');
        // dismiss notification
        $(this).closest('.cookie-message').fadeOut('slow');
        // update cookie
        Cookies.set('dismissed-notifications', 1, { expires: 365 });
    });

});
