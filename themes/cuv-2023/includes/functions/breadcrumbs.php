<?php
/**
 * Breadcrumbs
 *
 * @package     WordPress
 * @subpackage  cuvtwentythree
 * @author      Clinuvel <www.clinuvel.co.uk>
 */
 
// ---------------------------------------------------------------------

/**
 * Get and return our breadcrumbs
 *
 * @return string 
 */
function cuv_2023_get_breadcrumbs() {

	$i = 4;
	$out = '';
	$name = 'Home';
	$before = '<li class="breadcrumb-item active" aria-current="page">';
	$after = '</li>';
	    
	if (! is_front_page() || is_paged()) {
		
		global $post;		
		
		$home = esc_url(home_url());
		$page_for_posts = get_option('page_for_posts');
		
		$out .= '<!-- breadcrumbs -->';
		$out .= '<nav aria-label="breadcrumb">';
		$out .= '<ol class="breadcrumb">';
		$out .= '<li class="breadcrumb-item"><a href="' . $home . '">' . $name . '</a></li>';
	
		if (is_home()) {
			$out .= $before . get_the_title($page_for_posts) . $after;
		} 
        elseif (is_page() && !$post->post_parent) {
			$out .= $before . get_the_title() . $after;
		} 
        elseif (is_page() && $post->post_parent) {
		    $parent_id = $post->post_parent;
	        $breadcrumbs = array();
			while ($parent_id) {
				$page = get_page($parent_id);
				$breadcrumbs[] = '<li class="breadcrumb-item"><a href="' . get_permalink($page->ID) . '">' . get_the_title($page->ID) . '</a></li>';
				$parent_id = $page->post_parent;
			}
			$breadcrumbs = array_reverse($breadcrumbs);
			foreach ($breadcrumbs as $crumb) {
				$out .= $crumb;
			}
			$out .= $before . get_the_title() . $after;
		}
        elseif (is_category()) {
			$cat_obj = get_the_category();
			$cat_obj = $cat_obj[0];
			$this_cat = $cat_obj->term_id;
			$out .= '<li class="breadcrumb-item"><a href="' . get_permalink($page_for_posts) . '">' . get_the_title($page_for_posts) . '</a></li>';	
			if ($cat_obj->parent != 0) {
				$out .= $before . get_category_parents($this_cat, TRUE, '') . $after;
			} else {
			    $out .= $before . single_cat_title($prefix = '', $display = false) . $after;
			}
		} 
        elseif (is_day()) {
		    $out .= '<li class="breadcrumb-item"><a href="' . get_year_link(get_the_time('Y')) . '">' . get_the_time('Y') . '</a></li>';
		    $out .= '<li class="breadcrumb-item"><a href="' . get_month_link(get_the_time('Y'), get_the_time('m')) . '">' . get_the_time('F') . '</a></li>';
		    $out .= $before . get_the_time('d') . $after;
		} 
        elseif (is_month()) {
		    $out .= '<li class="breadcrumb-item"><a href="' . get_year_link(get_the_time('Y')) . '">' . get_the_time('Y') . '</a></li>';
		    $out .= $before . get_the_time('F') . $after;
		} 
        elseif (is_year()) {
		    $out .= $before . get_the_time('Y') . $after;
		} 
        elseif (is_post_type_archive() || is_tax()) {
			$term = get_term_by('slug', get_query_var('term'), get_query_var('taxonomy'));
            $post_type = get_post_type_object(get_post_type());
			if ($term && is_tax()) {
			    $out .= '<li class="breadcrumb-item"><a href="' . get_post_type_archive_link($post_type->name) . '">' . $post_type->labels->name . '</a></li>';
			    if ($term->parent != 0) {
				    $out .= $before . get_category_parents($term->term_id, TRUE, '') . $after;
			    } else {
			        $out .= $before . single_cat_title($prefix = '', $display = false) . $after;
			    }
			} else {  
				$out .= $before . $post_type->labels->name . $after;
			}
		} 
        elseif (is_single() && ! is_attachment()) {
			if (get_post_type() != 'post') {
			    $post_type = get_post_type_object(get_post_type());
				$out .= '<li class="breadcrumb-item"><a href="' . get_post_type_archive_link($post_type->name) . '">' . $post_type->labels->name . '</a></li>';	
			} else {
				$cat_obj = get_the_category();
				$cat_obj = $cat_obj[0];
				$this_cat = $cat_obj->term_id;
				$out .= '<li class="breadcrumb-item"><a href="' . get_permalink($page_for_posts) . '">' . get_the_title($page_for_posts) . '</a></li>';	
				if ($cat_obj->parent != 0) {
					$out .= $before . get_category_parents($this_cat, TRUE, '') . $after;
				} else {
				    $out .= '<li class="breadcrumb-item"><a href="' . get_term_link($cat_obj->slug, $cat_obj->taxonomy) . '">' . $cat_obj->name . '</a></li>';	
				}
			}
			$out .= $before . get_the_title() . $after;
		} 
        elseif (! is_single() && ! is_page() && get_post_type() != 'post' && ! is_404()) {

		} 
        elseif (is_attachment()) {
		
		} 
        elseif (is_search()) {
		    $out .= $before . 'Search results for &#39;' . get_search_query() . '&#39;' . $after;
		} 
        elseif (is_tag()) {
		    $out .= $before . 'Posts tagged &#39;' . single_tag_title() . '&#39;' . $after;
		} 
        elseif (is_author()) {
		    global $author;
		    $userdata = get_userdata($author);
		    $out .= $before . 'Articles posted by ' . $userdata->display_name . $after;
		} 
        elseif (is_404()) {
		    $out .= $before . 'Error 404' . $after;
		}
		if (get_query_var('paged')) {
		    $out .= '<span id="paged" class="crumb">' . __('Page') . ' ' . get_query_var('paged') . '</span>';
		}
	
		$out .= '</ol>';
		$out .= '</nav>';
		$out .= '<!-- / breadcrumbs -->';
	}
	return $out;
}
 
// ---------------------------------------------------------------------

/**
 * Actually outputs the breadcrumbs
 *
 * @return string 
 */
function cuv_2023_the_breadcrumbs() {
    $breadcrumbs = cuv_2023_get_breadcrumbs();
	echo $breadcrumbs ? $breadcrumbs : '';
}
