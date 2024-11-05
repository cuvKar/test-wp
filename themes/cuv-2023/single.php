<?php
/**
 * The template for displaying all single posts and attachments
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


                <div class="container-fluid">
                    <?php the_content(); ?>
                </div>

            </article>

            <?php endwhile; endif; ?>

        </main>
        <!-- / main -->

<?php get_footer();
