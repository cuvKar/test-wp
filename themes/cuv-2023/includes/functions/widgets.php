<?php
/**
 * Widgets
 * 
 * Register custom widgets and sidebars
 *
 * @package     WordPress
 * @subpackage  cuvtwentythree
 * @author      Clinuvel <www.clinuvel.co.uk>
 */
 
// ---------------------------------------------------------------------

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function cuv_2023_widgets_init() {

    // Header Menu "Mega Menu" Widgets
    $location  = 'primary';
    $css_class = 'has-mega-menu';
    $locations = get_nav_menu_locations();

    if (isset($locations[$location])) {
        $menu = get_term($locations[$location], 'nav_menu');
        if ($items = wp_get_nav_menu_items($menu->name)) {
            foreach ($items as $item) {
                if (in_array($css_class, $item->classes)) {
                    register_sidebar(array(
                        'id'   => 'mega-menu-widget-area-' . $item->ID,
                        'name' => $item->title . ' - Mega Menu',
                        'before_title'  => '<h3 class="widget-title h h2">',
                        'after_title'   => '</h2>',
                        'before_widget' => '',
                        'after_widget'  => ''
                    ));
                }
            }
        }
    }
}
add_action('widgets_init', 'cuv_2023_widgets_init');
