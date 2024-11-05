<?php
/**
 * The template for displaying all pages
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
            <?php the_content(); ?>
            <?php endwhile; endif; ?>

        </main>
        <!-- / main -->

<?php get_footer();
