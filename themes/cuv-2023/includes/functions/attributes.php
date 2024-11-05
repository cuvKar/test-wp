<?php
/**
 * Attributes
 * 
 * Output class filters and custom attributes
 *
 * @package     WordPress
 * @subpackage  cuvtwentythree
 * @author      Clinuvel <www.clinuvel.co.uk>
 */
 
// ---------------------------------------------------------------------

/**
 * Add a body class based on white header meta field
 *
 * @param  array $classes
 * @return array 
 */
function cuv_2023_white_header_body_class($classes) {
    global $post;
    if (is_page() || is_single()) {
        if (get_field('white_header')) {
            $classes[] = 'is-white-header';
        }
    }
    return $classes;
}
add_filter('body_class', 'cuv_2023_white_header_body_class');
 
// ---------------------------------------------------------------------

/**
 * Add Category Body Class On Single
 * 
 * Add the Category nicename to the body class for single posts.
 *
 * @param [type] $classes
 * @return string   The categories as a nicename.
 */
function cuv_2023_add_category_to_single($classes) {

    if (is_single()) {
        global $post;
        foreach ((get_the_category($post->ID)) as $category) {
            // Rename the 2022 class
            if ($category->category_nicename == '2022-announcements' ) {
                $category->category_nicename = 'announcements-2022';
            }
            // Rename the 2023 class
            if ($category->category_nicename == '2023-announcements' ) {
                $category->category_nicename = 'announcements-2023';
            }
            // add category slug to the $classes array
            $classes[] = $category->category_nicename;
        }
    }
    // return the $classes array
    return $classes;
}
add_filter('body_class', 'cuv_2023_add_category_to_single'); 

// ---------------------------------------------------------------------

/**
 * Add a body class based on if blog section
 *
 * @param  array $classes
 * @return array 
 */
function cuv_2023_blog_body_class($classes) {
    global $post;
    if (is_blog()) {
        $classes[] = 'is-blog';
    }
    return $classes;
}
add_filter('body_class', 'cuv_2023_blog_body_class');
