<?php
/**
 * Enqueues
 *
 * Functions to register, load and initialise all of the required
 * scripts and stylesheets conditionally as required by the theme.
 * 
 * @package     WordPress
 * @subpackage  cuvtwentythree
 * @author      Clinuvel <www.clinuvel.co.uk>
 */

// ---------------------------------------------------------------------

/**
 * Add JS to pages with the comment form
 * to allow support for threaded comments
 *
 * @return void 
 */
function cuv_2023_add_comment_reply() {
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
    
// ---------------------------------------------------------------------

/**
 * Load jQuery via default wordpress included file
 *
 * @return void 
 */
function cuv_2023_add_jquery() {
    wp_enqueue_script('jquery');
}

// ---------------------------------------------------------------------

/**
 * Add the custom JS file
 *
 * @return void 
 */
function cuv_2023_add_custom() {
    
    if (! is_admin()) {
        
        $localized = [
            'ajax_url'  => admin_url('admin-ajax.php'),
            'assetsUrl' => get_template_directory_uri() . '/assets/',
            'publicUrl' => get_template_directory_uri() . '/public/',
            'domain'    => get_option('siteurl')
        ];      

        wp_register_script('cuv-2023-manifest', get_template_directory_uri() . '/public/js/manifest.js', array('jquery'), NULL, true);
        wp_enqueue_script('cuv-2023-manifest');

        wp_register_script('cuv-2023-vendor', get_template_directory_uri() . '/public/js/vendor.js', array('cuv-2023-manifest'), NULL, true);
        wp_enqueue_script('cuv-2023-vendor');

        wp_register_script('cuv-2023-frontend', get_template_directory_uri() . '/public/js/frontend.js', array('cuv-2023-vendor'), NULL, true);
        wp_enqueue_script('cuv-2023-frontend');

        wp_localize_script('cuv-2023-frontend', 'CUVAjax', $localized);

		//wp_register_style( 'cuv-2023-customiser', get_template_directory_uri() . '/public/css/customiser.css', array(), '1.0', 'all' );
		//wp_enqueue_style( 'cuv-2023-customiser' );
    }
}

// ---------------------------------------------------------------------

add_action('wp_enqueue_scripts', 'cuv_2023_add_comment_reply', 5);
add_action('wp_enqueue_scripts', 'cuv_2023_add_jquery', 10);
add_action('wp_enqueue_scripts', 'cuv_2023_add_custom', 15);

// ---------------------------------------------------------------------

/**
 * Remove version query string from scripts & css
 *
 * @return mixed
 */
function cuv_2023_remove_script_styles_version($src) {
    return remove_query_arg('ver', $src);
}
add_filter('script_loader_src', 'cuv_2023_remove_script_styles_version');
add_filter('style_loader_src', 'cuv_2023_remove_script_styles_version');
