<?php
/**
 * Custom Conditionals
 *
 * Functions to change what content is displayed based
 * on what conditions the current page or archive matches.
 *
 * @package     WordPress
 * @subpackage  cuvtwentythree
 * @author      Clinuvel <www.clinuvel.co.uk>
 */
    
// ---------------------------------------------------------------------

/**
 * Is current display a 'blog' screen?
 *
 * @return boolean 
 */
function is_blog() {
    global $post;
    $post_type = get_post_type($post);
    if ((is_home() || is_archive() || is_single()) && ($post_type == 'post') || $post_type == null) {
        return true;
    }
    return false;
}
