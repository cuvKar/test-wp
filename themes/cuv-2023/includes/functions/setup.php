<?php
/**
 * Setup Functions
 * 
 * Functions which set up theme defaults and registers support for
 * various WordPress features hooked into the after_setup_theme hook.
 *
 * @package     WordPress
 * @subpackage  cuvtwentythree
 * @author      Clinuvel <www.clinuvel.co.uk>
 */

// ---------------------------------------------------------------------

/**
* Set max content width to enable full width
* video oembeds which are scaled via fitvids.
*
* @var integer $content_width
*/
if (! isset($content_width)) $content_width = 1440;

// ---------------------------------------------------------------------

/**
 * Sets up the theme base defaults.
 *
 * @return void
 */
function cuv_2023_setup() {
    
    /**
     * Makes theme available for translation
     */
    load_theme_textdomain('cuvtwentythree', get_template_directory() . '/languages');
    
    /**
     * Style the visual editor to resemble the theme style
     */
    add_editor_style('public/css/editor.css');
    
    /**
     * Default core markup for all forms to output valid HTML5
     */
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'widgets',
        'script',
        'style'
    ));

    /*
     * Enable support for Post Thumbnails on posts and pages.
     *
     * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
     */
    add_theme_support('post-thumbnails');

    /*
     * Enable support for "Selective Refresh! for Widgets"
     * which are being managed from within the Customizer.
     *
     * @link https://make.wordpress.org/core/2016/03/22/implementing-selective-refresh-support-for-widgets/
     */
    add_theme_support('customize-selective-refresh-widgets');

    /*
     * Let WordPress manage the document title.
     * 
     * By adding theme support, we declare that this theme does not use a
     * hard-coded <title> tag in the document head, and expect WordPress to
     * provide it for us.
     */
    add_theme_support('title-tag');

    /**
     * Custom image size
     */
    add_image_size('full-promo', 1920, 1080, true);
    add_image_size('half-promo', 960, 1080, true);
    add_image_size('stack-promo', 900, 720, true);
    add_image_size('tablet', 834, 1194, true);
    add_image_size('mobile', 393, 852, true);
    add_image_size('link-carousel', 587, 741, true);

    /*
     * Declare Anglo Siam Records support
     */
    add_theme_support('cuv_2023');

    /**
     * Register menus
     */
    register_nav_menus(array(
        'primary'   => __('Primary', 'cuvtwentythree'),
        'secondary' => __('Secondary', 'cuvtwentythree'),
    ));

    /**
     * Ensure medium image size gets a hard crop
     */
    if (! get_option('medium_crop')) {
        add_option('medium_crop', '1');
    } else {
        update_option('medium_crop', '1');
    }
}
add_action('after_setup_theme', 'cuv_2023_setup');

// ---------------------------------------------------------------------

/**
 * Disables the "autop" function from adding <p> elements around
 * form fields in WPCF7.
 */
add_filter('wpcf7_autop_or_not', '__return_false');
