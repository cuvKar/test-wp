<?php
/**
 * Template Name: ASX Post
 * Template Post Type: post
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package     WordPress
 * @subpackage  cuvtwentythree
 * @author      Clinuvel <www.clinuvel.co.uk>
 */


get_header(); ?>

        <!-- main -->
        <main id="main">

            <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

            <article id="<?php the_ID(); ?>" <?php post_class(); ?>>


				<!-- post-data -->
				<div class="module post-data pt-2">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-xxl-8 breadcrumbs">
                                <?php cuv_2023_the_breadcrumbs(); ?> 
                            </div>
                            <div class="col-xxl-4 post-meta">
                                <div class="post-date">
                                    <?php the_date('d.m.Y'); ?> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / post-data -->

				<!-- post-titles -->
				<div class="module post-titles">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-xxl-8">
                                <span class="post-microtitle display-3 fw-semibold">
                                    <?php echo get_the_category_list(' '); ?> 
                                </span>
                                <h1 class="post-title lh-1">
                                    <?php echo get_the_title(); ?> 
                                </h1>
                            </div>
                            <div class="col-xxl-4 post-meta align-self-end">
                                <?php if (get_field('page_header_title_custom_subtitle_text')) { ?> 
                                <div class="post-subtitle display-3 fw-normal lh-sm">
                                    <?php echo get_field('page_header_title_custom_subtitle_text'); ?> 
                                </div>
                                <?php } ?> 
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / post-titles -->

				<?php $post_press_release_location = get_field( 'post_press_release_location' ); ?>
                <!-- asx-header -->
                <div class="module padded">
                    <div class="container-fluid pseudo-border-top pseudo-border-bottom">
                        <div class="row">
                            <div class="col-xxl-6 copy-block display-4 fw-normal py-2">
								<?php if ( $post_press_release_location ) { echo $post_press_release_location; } else { echo "Melbourne, Australia"; } ?>, <?php echo get_the_date('d F Y'); ?>
                            </div>
                            <div class="col-xxl-6 copy-block display-4 fw-normal">
                                <ul class="list-unstyled my-0">
                                    <li class="border-bottom border-black lh-1 py-2"><strong>ASX:</strong> CUV</li>
                                    <li class="border-bottom border-black lh-1 py-2"><strong>Frankfurt Börse:</strong> UR9</li>
                                    <li class="lh-1 py-2"><strong>Level 1:</strong> CLVLY</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / asx-header -->

				<?php
				$post_file_download = get_field( 'post_file_download' );
				
				if ( $post_file_download ): ?>

                <!-- download-block -->
                <div class="module padded-limited bg-taupe">
                    <div class="download-block">
                        <div class="container-fluid text-center">
                            <a href="<?php echo esc_url($post_file_download['url']); ?>" target="_blank" class="border-black btn fw-semibold lh-1 text-uppercase">
                                <?php _e('Download PDF', 'cuvtwentythree'); ?> 
                            </a>
                        </div>
                    </div>
                </div>
                <!-- / download-block -->

				<?php endif; ?>

				<div class="container-fluid">
                	<?php the_content(); ?>
                </div>
            
			</article>

            <?php endwhile; endif; ?>

        </main>
        <!-- / main -->

<?php get_footer();
