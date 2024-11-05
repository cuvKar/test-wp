/*
 * Get A Query Variable
 *
 * Simple url string parsing function to grab
 * a query variable or return false if not set
 */
CUVAjax.getQueryVariable = function(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { 
            return pair[1];
        }
    }
    return(false);
}


/*
 * Check If ANY Query Variables
 *
 * Lorem ipsum dolor sit amet, consectetur adipiscing
 * elit. Proin aliquam commodo quam etiamx imperdiet.
 */
CUVAjax.hasQueryVars = function() {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    return vars.length >= 1;
}


/*
 * Remove A Query Variable
 *
 * Lorem ipsum dolor sit amet, consectetur adipiscing
 * elit. Proin aliquam commodo quam etiamx imperdiet.
 */
CUVAjax.removeQueryVariable = function(variable) {
    window.history.pushState(null, null, window.location.pathname);
}


/*
 * @TODO
 *
 * Bacon ipsum dolor amet tenderloin cow tongue,
 * filet mignon kielbasa brisket salami biltong.
 */
CUVAjax.equalHeights = function(el) {
    var $el = [],
        tallest = 0,
        els = jQuery(el);
    els.each(function() {
        $el = jQuery(this);
        $el.height('auto');
        var currentHeight = jQuery(this).height();
        if (currentHeight > tallest) {
            tallest = currentHeight;
        }
    }); 
    els.height(tallest);
};


/*
 * @TODO
 *
 * Bacon ipsum dolor amet tenderloin cow tongue,
 * filet mignon kielbasa brisket salami biltong.
 */
CUVAjax.scrollToEl = function(el, off, cb) {
    pos = el ? $(el).offset().top : 0;
    jQuery('html,body').animate({
        scrollTop: pos - (off ? off : 0)
    }, 1200, cb);
};


/**
 * Helper function to find closest ancestor
 * (polyfill as closest is not supported by IE11)
 * 
 * @param el DOM node to find the ancestor for
 * @param selector Query selector string
 * @return {HTMLElement | {matchesSelector}}
 */
CUVAjax.findAncestor = function(el, selector) {
    while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el, selector)));
    return el;
}
