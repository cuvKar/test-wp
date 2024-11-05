<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package     WordPress
 * @subpackage  cuvtwentythree
 * @author      Clinuvel <www.clinuvel.co.uk>
 */

get_header(); ?>

                <?php $page_for_posts_id = get_option( 'page_for_posts' ); ?>
                <!-- post-data -->
                <div class="module post-data pt-2">
                    <div class="container-fluid">
                        <?php cuv_2023_the_breadcrumbs(); ?> 
                    </div>
                </div>
                <!-- / post-data -->

                <!-- post-titles -->
                <div class="module post-titles">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-xxl-8">
                                <h1 class="post-title lh-1 mb-4">
                                    <?php echo $current_title = (is_home() ) ? get_the_title($page_for_posts_id) : get_the_archive_title(); ?>
                                </h1>
                            </div>
                            <div class="col-xxl-4 post-meta align-self-end">
                                <div class="post-subtitle display-3 fw-normal lh-sm mb-4">
                                    <?php if ( is_home() ) { echo category_description( get_category_by_slug( 'news' )->term_id ); } // Use the main news category if it's the blog listing page. ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / post-titles -->

                <?php if (have_posts()) : $i = 0; ?> 
                <!-- news-feed -->
                <div class="module padded-top bg-white">
                    <div class="news-feed">
                        <div class="container-fluid">
                            <div class="row">
                                <?php 
                                while (have_posts()) : the_post(); 
                                    if ($i == 0) : 
                                ?> 
                                <div class="col-12 news-feed-item lead-item">
                                    <article class="post d-flex flex-column justify-content-between border-top border-bottom border-black padded-limited h-100 position-relative">
                                        <a href="<?php the_permalink(); ?>" class="stretched-link">
                                            <h3 class="post-title lh-sm display-1">
                                                <?php the_title(); ?> 
                                            </h3>
                                        </a>
                                        <div class="post-content d-flex flex-nowrap align-items-center">
                                            <a href="<?php the_permalink(); ?>" class="site-link me-3">
                                                &plus;
                                            </a>
                                            <div class="post-meta display-4">
                                                <?php echo get_the_category_list('.', ''); ?> 
                                                <p class="mb-0 display-4">
                                                    <?php echo get_the_date('d.m.Y'); ?> 
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                                <?php else : ?> 
                                <div class="col-md-6 col-xxl-4 news-feed-item follow-item border-end border-black">
                                    <article class="post d-flex flex-column justify-content-between border-top border-bottom border-black padded-limited h-100 position-relative">
                                        <a href="<?php the_permalink(); ?>" class="stretched-link">
                                            <h3 class="post-title lh-sm display-2">
                                                <?php the_title(); ?> 
                                            </h3>
                                        </a>
                                        <div class="post-content d-flex flex-nowrap align-items-center">
                                            <a href="<?php the_permalink(); ?>" class="site-link me-3">
                                                &plus;
                                            </a>
                                            <div class="post-meta display-4">
                                                <?php echo get_the_category_list('.', ''); ?>
                                                <p class="mb-0 display-4">
                                                    <?php echo get_the_date('d.m.Y'); ?> 
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                                <?php endif; $i++; endwhile; ?> 
                            </div>
                        </div>
                    </div>.
                </div>
                <!-- / news-articles -->
                <?php endif; ?> 

                <?php cuv_2023_pagination(); ?>


<?php get_footer();
