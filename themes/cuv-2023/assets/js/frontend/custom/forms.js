/**
 * Form Handlers
 *
 * @author John Ranby
 * @see    https://github.com/jranby
 */
jQuery(document).ready(function($) {

    /*
     * All Forms Custom Bootstrap File Input Helper
     */
    $('input[type="file"]').change(function(e){
        var approved = [],
            files = e.currentTarget.files;
        for (var i = 0; i < files.length; i++) {
            var filesize = ((files[i].size / 1024) / 1024).toFixed(4);
            if (filesize <= 1) {
                approved.push(files[i].name);
            } else {
                delete files[i];
            }
        }
        $(this).parent().find('.filelist').html(approved.join('<br>'));
    });

    // ---------------------------------------------------------------------

    /*
     * The Datepicker Init For All Forms
     */
    if ($('.datepicker').length > 0) {
        $('.datepicker').datepicker({
            dateFormat : "dd-mm-yy"
        });
    }

    // ---------------------------------------------------------------------

    /*
     * Generic Save Button Handler
     *
     * Bacon ipsum dolor amet tenderloin cow tongue,
     * filet mignon kielbasa brisket salami biltong.
     */
    $(document).on('click', '.btn-send', function(e) {
        
        var form = $(this).closest('form');
        var saveButton = form.find('.btn-save');
        var spinner = saveButton.find('.fa-spinner');

        $(form).submit(function(e) {
            if ($(this)[0].checkValidity() === true) {
            } else {
                e.preventDefault();
                e.stopPropagation();
            }
            form.addClass('was-validated');
        });
    });

    // ---------------------------------------------------------------------

    /*
     * Ajax Contact Form Handler
     *
     * Bacon ipsum dolor amet tenderloin cow tongue,
     * filet mignon kielbasa brisket salami biltong.
     */
    $(function() {
        
        var form     = $('#contact-form');
        var formMssg = form.find('.form-messages');
        var sendBttn = form.find('.btn-send');
        var spinner  = sendBttn.find('.fa-spinner');

        $(form).submit(function(e) {

            e.preventDefault();
            e.stopPropagation();

            if ($(this).get(0).checkValidity() === true) {

                grecaptcha.ready(function() {
                    grecaptcha.execute('6Lc40FoaAAAAAK9b4i7hlvSioZ2H3WV7pINK-YUo', {
                        action: 'asr_contact_form_handler'
                    }).then(function(token) {

                        if (! token) {
                            grecaptcha.reset();
                            return null;
                        }

                        var gRecaptchaResponse = form.find('.g-recaptcha-response');
                        gRecaptchaResponse.val(token);

                        var formData = $(form).serialize();

                        $.ajax({
                            type: 'POST',
                            url: CUVAjax.ajax_url,
                            data: {
                                'action': 'asr_contact_form_handler',
                                'formdata': formData
                            },
                            beforeSend: function() {
                                $(sendBttn).prop('disabled', true);
                                $(spinner).removeClass('d-none');
                            },
                        })
                        .done(function(response) {
                            console.log(response);
                            $(sendBttn).prop('disabled', false);
                            $(spinner).addClass('d-none');
                            $(formMssg).removeClass('d-none error').addClass('success').text(response);
                            $('.form-control').val('');
                            form.removeClass('was-validated');
                            $('#exampleModal').modal('hide');
                        })
                        .fail(function(data) {
                            $(sendBttn).prop('disabled', false);
                            $(spinner).addClass('d-none');
                            $(formMssg).removeClass('d-none success').addClass('error');
                            if (data.responseText !== '') {
                                $(formMssg).text(data.responseText);
                            } else {
                                $(formMssg).text('An error occured and your message could not be sent. Please try again.');
                            }
                        });
                    });
                });
            }
            form.addClass('was-validated');
        });
    });

    // ---------------------------------------------------------------------

    /*
     * Ajax Signup Mailchimp Form Handler
     *
     * Bacon ipsum dolor amet tenderloin cow tongue,
     * filet mignon kielbasa brisket salami biltong.
     */
    $(function() {
    
        var form     = $('#newsletter-signup-form');
        var formMssg = form.find('.form-messages');
        var sendBttn = form.find('.btn-send');
        var spinner  = sendBttn.find('.fa-spinner');

        $(document).on('submit', '#newsletter-signup-form', function(e) {

            e.preventDefault();
            e.stopPropagation();

            if ($(this).get(0).checkValidity() === true) {
                var formData = $(form).serialize();

                $.ajax({
                    type: 'POST',
                    url: CUVAjax.ajax_url,
                    data: {
                        'action': 'asr_newsletter_signup_form_handler',
                        'formdata': formData
                    },
                    beforeSend: function() {
                        $(sendBttn).prop('disabled', true);
                        $(spinner).removeClass('d-none');
                    },
                })
                .done(function(response) {
                    $(sendBttn).prop('disabled', false);
                    $(spinner).addClass('d-none');
                    $(formMssg).removeClass('d-none error').addClass('success').text(response);
                    $('.form-control').val('');
                    $('#signup_terms').prop('checked', false);
                    form.removeClass('was-validated');
                    setTimeout(function() {
                        $('#newsletter-signup-modal').modal('hide');
                        $(formMssg).removeClass('error success').addClass('d-none').text('');
                    }, 5000);
                })
                .fail(function(data) {
                    $(sendBttn).prop('disabled', false);
                    $(spinner).addClass('d-none');
                    $(formMssg).removeClass('d-none success').addClass('error');
                    if (data.responseText !== '') {
                        $(formMssg).text(data.responseText);
                    } else {
                        $(formMssg).text('An error occured and your message could not be sent. Please try again.');
                    }
                });
            }
            form.addClass('was-validated');
        });
    });
});
