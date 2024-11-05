<?php
/**
 * Block Name: Copy Block
 *
 * This is the template that displays the copy block.
 */

// create id attribute for styling
$id = 'copy-block-' . $block['id'];

$copy_block = get_field('copy_block');
?>

                <!-- copy-block -->
				<div id="<?php echo $id; ?>" class="module padded-extra<?php if( !empty($block['className'])) { echo " ".$block['className']; } ?>">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-xxl-6 copy-block">
                                <?php if ($copy_block['microtitle']) { ?> 
                                <span class="display-4 text-uppercase">
                                    <?php echo $copy_block['microtitle']; ?> 
                                </span>
                                <?php } ?> 
                                <?php if ($copy_block['title']) { ?> 
                                <<?php echo $copy_block['title_tag']; ?> class="lh-1 mb-4 mb-xxl-0 <?php echo $copy_block['title_css_class'] ?: ''; ?>">
                                    <?php echo $copy_block['title']; ?>
                                </<?php echo $copy_block['title_tag']; ?>>
                                <?php } ?> 
                            </div>
                            <div class="col-xxl-6 copy-block">
                                <?php if ($copy_block['text']) { ?> 
                                <?php echo apply_filters('the_content', $copy_block['text']); ?>
                                <?php } ?> 
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / copy-block -->
