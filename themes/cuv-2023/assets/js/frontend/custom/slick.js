/**
 * Slick Carousel Inits + Handles
 *
 * @author John Ranby
 * @see    https://github.com/jranby
 */
jQuery(document).ready(function($) {

    /*
     * Link Carousel.
     *
     * Bacon ipsum dolor amet tenderloin cow tongue,
     * filet mignon kielbasa brisket salami biltong.
     */
    if ($('.link-carousel .carousel').length > 0) {
        $('.link-carousel .carousel').each(function() {
            
            var specSlider = $(this),
                specPaging = specSlider.parent().find('.pager');

            var specPrev = specPaging.find('.prev'),
                specNext = specPaging.find('.next');

            specSlider.on('init', function (event, slick) {
                //$('.slick-current').next().addClass('pull-down');
            });

            specSlider.slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                infinite: true,
                prevArrow: specPrev,
                nextArrow: specNext,
                appendArrows: specPaging,
                adaptiveHeight: 0,
                accessibility: 0,
                rows: 0,
                responsive: [
                    {
                        breakpoint: 1366,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            arrows: false
                        }
                    }               
                ]           
            });
        });
    }

    /*
     * Text Carousel.
     *
     * Bacon ipsum dolor amet tenderloin cow tongue,
     * filet mignon kielbasa brisket salami biltong.
     */
    if ($('.text-carousel .carousel').length > 0) {
        $('.text-carousel .carousel').each(function() {
            
            var specSlider = $(this),
                specPaging = specSlider.parent().find('.pager');

            var specPrev = specPaging.find('.prev'),
                specNext = specPaging.find('.next');

            specSlider.slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                infinite: true,
                prevArrow: specPrev,
                nextArrow: specNext,
                appendArrows: specPaging,
                adaptiveHeight: 0,
                accessibility: 0,
                rows: 0,
                responsive: [
                    {
                        breakpoint: 1366,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            arrows: false
                        }
                    }               
                ]           
            });
        });
    }

    /*
     * Image Carousel.
     *
     * Bacon ipsum dolor amet tenderloin cow tongue,
     * filet mignon kielbasa brisket salami biltong.
     */
    if ($('.image-carousel .carousel').length > 0) {
        $('.image-carousel .carousel').each(function () {
          var specSlider = $(this),
            specPaging = specSlider.parent().find('.pager');

          var specPrev = specPaging.find('.prev'),
            specNext = specPaging.find('.next');
          specSlider.slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            vertical: true,
            autoplaySpeed: 2000,
            arrows: false,
            dots: false,
            infinite: true,
            autoplay: true,
            prevArrow: specPrev,
            nextArrow: specNext,
            // appendArrows: specPaging,
            // adaptiveHeight: 0,
            // accessibility: 0,
            // rows: 0
          });
        });
    }

    /*
     * Quote Carousel.
     *
     * Bacon ipsum dolor amet tenderloin cow tongue,
     * filet mignon kielbasa brisket salami biltong.
     */
    if ($('.quote-carousel .carousel').length > 0) {
        $('.quote-carousel .carousel').each(function() {
            
            var specSlider = $(this),
                specPaging = specSlider.parent().find('.pager');

            var specPrev = specPaging.find('.prev'),
                specNext = specPaging.find('.next');

            specSlider.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                infinite: true,
                prevArrow: specPrev,
                nextArrow: specNext,
                appendArrows: specPaging,
                adaptiveHeight: 0,
                accessibility: 0,
                rows: 0
            });
        });
    }
});
