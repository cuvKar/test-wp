<?php
/**
 * Block Name: Table Block
 *
 * This is the template that displays the table block.
 */

// create id attribute for styling
$id = 'table-block-' . $block['id'];

$table_block = get_field('table_block');
?>

                <!-- table-block -->
                <div id="<?php echo $id; ?>" class="module padded-extra<?php if( !empty($block['className'])) { echo " ".$block['className']; } ?>">
                    <div class="table-block">
                        <div class="container-fluid">
                            <?php if ($table_block['title']) { ?> 
                            <<?php echo $table_block['title_tag']; ?> class="lh-1 mb-5 <?php echo $table_block['title_css_class'] ?: ''; ?>">
                                <?php echo $table_block['title']; ?>
                            </<?php echo $table_block['title_tag']; ?>>
                            <?php } ?> 
                            <?php if ($table_block['markup']) { ?> 
                            <div class="table-wrap border-top border-black">
                                <?php echo apply_filters('the_content', $table_block['markup']); ?>
                            </div>
                            <?php } ?> 
                        </div>
                    </div>
                </div>
                <!-- / table-block -->
