<?php
/**
 * Pagination Functions
 *
 * @package     WordPress
 * @subpackage  cuvtwentythree
 * @author      Clinuvel <www.clinuvel.co.uk>
 */
 
// ---------------------------------------------------------------------

/**
 * Default theme pagination
 *
 * @return string 
 */
function cuv_2023_pagination() {

	global $wp_query;

	$big = 999999999;
	$pagination = '';

	$pages = paginate_links(
		array(
			'base'      => str_replace($big, '%#%', esc_url( get_pagenum_link($big))),
			'format'    => '?paged=%#%',
			'prev_text' => __('&lsaquo;'),
			'next_text' => __('&rsaquo;'),
			'type'      => 'array',
			'current'   => max(1, get_query_var('paged')),
			'total'     => $wp_query->max_num_pages
		)
	);
	
	if (is_array($pages)) {
		
		$paged = (get_query_var('paged') == 0 ) ? 1 : get_query_var('paged');

        $pagination .= '<!-- pagination -->';
        $pagination .= '<nav aria-label="page navigation" class="bg-white padded-bottom">';
		$pagination .= '<ul class="pagination d-flex mb-0">';
		$pagination .= str_replace('class="page-numbers"', 'class="page-link display-4"', implode('', $pages));
		$pagination .= '</ul>';
		$pagination .= '</nav>';
		$pagination .= '<!-- / pagination -->';

		echo $pagination;
	}	
}
	
// ---------------------------------------------------------------------

/**
 * Display pagination information as format "X - Y of Z"
 *
 * @param  object $wp_query
 * @return string 
 */
function cuv_2023_pages_count($wp_query = null) {
	
    if (! $wp_query) {
        global $wp_query;
    }

	if ($wp_query->max_num_pages > 1) {
        printf('Page %d of %d', max((int) $wp_query->get('paged'), 1), $wp_query->max_num_pages);
	}
}

// ---------------------------------------------------------------------

/**
 * Display pagination information as format "X - Y of Z"
 *
 * @param  object $wp_query
 * @return string 
 */
function cuv_2023_posts_count($wp_query = null) {

    if (! $wp_query) {
        global $wp_query;
    }

    $posts_per_page = $wp_query->query_vars['posts_per_page'] ?: get_option('posts_per_page');
    $total_posts    = $wp_query->found_posts;
    $total_pages    = $posts_per_page / $total_posts;
    $current_page   = (get_query_var('paged')) ? get_query_var('paged') : 1;

    if ($current_page === 1) {
        // on page 1 start at 1
        $counter = 1;
    } 
    elseif ($current_page === 2) {
        // on page 2 start on the post per page + 1
        $counter = $posts_per_page + 1;
    } 
    else {
        // For example on page 2 with 5 posts per page we want the counter to start on 6
        // So page * posts per page - posts on the last page + 1 to get to this page = 6
        $counter = ($current_page * $posts_per_page - $posts_per_page + 1);
    }

    $start_post = ($posts_per_page * $current_page) - $posts_per_page + 1;

    if ($start_post === 1 && $total_posts === 0) {
        $start_post = 0;
    }
    
    if (($start_post + $posts_per_page - 1) >= $total_posts) {
        $last_post = $total_posts;
    } 
    else {
        $last_post = $start_post + $posts_per_page - 1;
    }

    printf('Showing %d - %d out of %d results', $start_post, $last_post, $total_posts);
}
