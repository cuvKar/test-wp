/*
 * Google Tag Manager & Analytics Handling
 *
 * Bacon ipsum dolor amet tenderloin cow tongue,
 * filet mignon kielbasa brisket salami biltong.
 */
(function() {

    // Add click tracking
    var entityLinks = document.querySelectorAll('.entity-click');
    [].forEach.call(entityLinks, function(entityLink) {
        // Add click event listener
        entityLink.addEventListener('click', function(){
            var eventLabel  = this.hasAttribute('data-gtag-label') ? this.getAttribute('data-gtag-label') : ''; 
            var eventAction = this.hasAttribute('data-gtag-action') ? this.getAttribute('data-gtag-action') : 'Click';
            gtag('event', eventAction, {
                'event_category': 'GHE',
                'event_label': eventLabel
            });
        });
    });
})();
