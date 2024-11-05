/**
 * Bootstrap 4 Inits + Handlers
 *
 * @author John Ranby
 * @see    https://github.com/jranby
 */
jQuery(document).ready(function($) {

    /*
     * Bootstrap Popup Modal
     *
     * Bacon ipsum dolor amet tenderloin cow tongue,
     * filet mignon kielbasa brisket salami biltong.
     */
    if ($('#popup-modal').length > 0) {
        const popupModal = new bootstrap.Modal('#popup-modal', {
          keyboard: false
        });
        popupModal.show();
    }

    $('.collapse').on('shown.bs.collapse', function() {
        var person = $(this).data('person');
        $(this).parent().siblings('.row').find('.person').removeClass('active');
        $('#' + person).addClass('active');
    });


    // ---------------------------------------------------------------------

    /*
     * @TODO
     *
     * Bacon ipsum dolor amet tenderloin cow tongue,
     * filet mignon kielbasa brisket salami biltong.
     */
    $('input[type=radio][name=enquiry_type]').change(function(evt) {
        $('.form-wrapper').removeClass('d-none');
    });

    // ---------------------------------------------------------------------

    /*
     * @TODO
     *
     * Bacon ipsum dolor amet tenderloin cow tongue,
     * filet mignon kielbasa brisket salami biltong.
     */
    $('.close-modal').on('click', function(e) {
        e.preventDefault();
        $(this).parent().find('.form-messages').removeClass('success error').addClass('d-none').text('');
    });

    $('.modal').on('hidden.bs.modal', function() {
        $(this).find('.form-messages').removeClass('success error').addClass('d-none').text('');
    });

    // ---------------------------------------------------------------------

    /*
     * @TODO
     *
     * Bacon ipsum dolor amet tenderloin cow tongue,
     * filet mignon kielbasa brisket salami biltong.
     */
    $('.show-more').on('click', function(e) {
        var type = $(this).data('type');
        $(this).parent().find('.' + type + '.d-none').toggleClass('d-none d-flex');
        $(this).addClass('d-none');
    });
});
