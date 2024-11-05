<?php
/**
 * Block Name: Post Data
 *
 * This is the template that displays the post data block.
 */

// create id attribute for styling
$id = 'post-data-' . $block['id'];
?>

                <!-- post-data -->
                <div class="module post-data">
                    <div class="container-fluid">
                        <?php if (get_field('show_date') || get_field('reading_time')) { ?> 
                        <div class="row">
                            <div class="col-xxl-8 breadcrumbs">
                                <?php cuv_2023_the_breadcrumbs(); ?> 
                            </div>
                            <div class="col-xxl-4 post-meta">
                                <?php if (get_field('show_date')) { ?> 
                                <div class="post-date">
                                    <?php the_date('d.m.Y'); ?> 
                                </div>
                                <?php } ?> 
                                <?php if (get_field('reading_time')) { ?> 
                                <div class="post-reading-time">
                                    <?php _e('Read time', 'cuvtwentythree'); ?> <?php echo get_field('reading_time'); ?>
                                </div>
                                <?php } ?> 
                            </div>
                        </div>
                        <?php } else { ?> 
                        <?php cuv_2023_the_breadcrumbs(); ?> 
                        <?php } ?> 
                    </div>
                </div>
                <!-- / post-data -->

