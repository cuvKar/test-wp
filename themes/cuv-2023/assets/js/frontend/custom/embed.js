/**
 * Embed Functions + Handlers
 *
 * @author John Ranby
 * @see    https://github.com/jranby
 */
(function($) {
    
    // poster frame click event
    $(document).on('click', '.js-embed-poster', function (ev) {
        ev.preventDefault();
        var $poster = $(this);
        var $wrapper = $poster.closest('.js-embed-responsive');
        videoPlay($wrapper);
    });

    // play the targeted video (and hide the poster frame)
    function videoPlay($wrapper) {
        var $iframe = $wrapper.find('.js-embed-responsive-item');
        var src = $iframe.data('src');
        // hide poster
        $wrapper.addClass('js-embed-responsive-active');
        // add iframe src in, starting the video
        $iframe.attr('src', src);
    }

    // stop the targeted/all videos (and re-instate the poster frames)
    function videoStop($wrapper) {
        // if we're stopping all videos on page
        if (! $wrapper) {
            var $wrapper = $('.js-embed-responsive');
            var $iframe = $('.js-embed-responsive-item');
        // if we're stopping a particular video
        } else {
            var $iframe = $wrapper.find('.js-embed-responsive-item');
        }
        // reveal poster
        $wrapper.removeClass('js-embed-responsive-active');
        // remove youtube link, stopping the video from playing in the background
        $iframe.attr('src', '');
    }
}
)(jQuery);
