<?php
/**
 * Mega Menu Walker
 * 
 * @package     WordPress
 * @subpackage  cuvtwentythree
 * @author      Clinuvel <www.clinuvel.co.uk>
 */
 
// ---------------------------------------------------------------------

/**
 * Custom Megta Menu Walker Class
 *
 * @return void
 */
class CUV_2023_Mega_Menu_Walker extends Walker_Nav_Menu {

    function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0)
    {
        global $wp_query;
        $indent = ($depth) ? str_repeat("\t", $depth) : '';

        $class_names = $value = '';

        $classes = empty($item->classes) ? array() : (array) $item->classes;
        $classes[] = 'menu-item-' . $item->ID;

        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
        $class_names = ' class="' . esc_attr($class_names) . '"';

        $id = apply_filters('nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args);
        $id = strlen($id) ? ' id="' . esc_attr( $id ) . '"' : '';

        $output .= $indent . '<li' . $id . $value . $class_names .'>';

        $attributes  = ! empty($item->attr_title) ? ' title="'  . esc_attr($item->attr_title) .'"' : '';
        $attributes .= ! empty($item->target)     ? ' target="' . esc_attr($item->target    ) .'"' : '';
        $attributes .= ! empty($item->xfn)        ? ' rel="'    . esc_attr($item->xfn       ) .'"' : '';
        $attributes .= ! empty($item->url)        ? ' href="'   . esc_attr($item->url       ) .'"' : '';

        $item_output = $args->before;
        $item_output .= '<a'. $attributes .'>';

        $item_output .= $args->link_before . apply_filters('the_title', $item->title, $item->ID) . $args->link_after;

        $item_output .= '</a>';

        if (is_active_sidebar('mega-menu-widget-area-' . $item->ID)) {
            $item_output .= '<div class="mega-menu-block">';
            ob_start();
            dynamic_sidebar('mega-menu-widget-area-' . $item->ID);
            $widget = ob_get_contents();
            ob_end_clean();
            $item_output .= $widget;
            $item_output .= "</div>";
        }

        $item_output .= $args->after;

        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }
}
