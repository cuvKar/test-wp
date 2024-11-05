<?php
/**
 * Template
 * 
 * Output custom markup and content.
 *
 * @package     WordPress
 * @subpackage  cuvtwentythree
 * @author      Clinuvel <www.clinuvel.co.uk>
 */
 
// ---------------------------------------------------------------------

/**
 * Add a code snippet to the header of every page.
 * 
 * The ID for Google Tag Manager is hard coded for now, so should be 
 * updated for different clients.
 *
 * @return  string  The code snippet in the <head> of the page
 */
function cuv_2023_add_header_snippet()
{ ?>

    <!-- Google Tag Manager 2.0 -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-5FQH6XS');</script>
    <!-- End Google Tag Manager -->

<?php }
add_action('wp_head', 'cuv_2023_add_header_snippet');
 
// ---------------------------------------------------------------------

/**
  * Add a code snippet after the opening body tag on every page
  * 
  * The ID for Google Tag Manager is hard coded for now, so should be 
  * updated for different clients. The function "wp_body_open()" needs
  * to be added after the <body> tag.
  *
  * @return  string  The code snippet after the opening <body> tag
  */
function cuv_2023_add_body_open_snippet()
{ ?>
  
    <!-- Google Tag Manager (noscript) 2.0 -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5FQH6XS"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) 2.0 -->

<?php }
add_action('cuv_2023_body_open', 'cuv_2023_add_body_open_snippet');
 
// ---------------------------------------------------------------------

/**
  * Filter out the archive label
  * 
  * WordPress adds an archive label when getting the archive title, this will remove 
  * it to leave the naked archive name.
  *
  * @return  string  Filtered archive title
  */
function cuv_2023_get_the_archive_title($title) {
    if (is_category()) {
        $title = single_cat_title('', false);
    } elseif (is_tag()) {
        $title = single_tag_title('', false);
    } elseif (is_author()) {
        $title = '<span class="vcard">' . get_the_author() . '</span>';
    }
    return $title; 
}
add_filter('get_the_archive_title', 'cuv_2023_get_the_archive_title');
