<?php
/**
 * Block Name: Post Titles
 *
 * This is the template that displays the post titles block.
 */

// create id attribute for styling
$id = 'post-titles-' . $block['id'];
?>

                <!-- post-titles -->
                <div class="module post-titles">
                    <div class="container-fluid">
                        <div class="row align-items-end">
                            <div class="col-xxl-8">
                                <?php if (is_single() || get_field('post_microtitle')) { ?> 
                                <span class="post-microtitle display-3 fw-semibold">
                                    <?php echo get_field('post_microtitle') ?: get_the_category_list(' '); ?> 
                                </span>
                                <?php } ?> 
                                <h1 class="post-title lh-1">
                                    <?php echo get_field('post_title') ?: get_the_title(); ?> 
                                </h1>
                            </div>
                            <div class="col-xxl-4 post-meta align-self-end">
                                <?php if (get_field('post_subtitle')) { ?> 
                                <div class="post-subtitle">
                                    <p><?php echo get_field('post_subtitle'); ?></p> 
                                </div>
                                <?php } ?> 
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / post-titles -->

