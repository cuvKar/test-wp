<?php
/**
 * Block Name: Share Price
 *
 * This is the template that displays the share price block.
 */

// create id attribute for styling
$id = 'share-price-' . $block['id'];

$share_price = get_field('share_price');
?>

                <!-- share-price -->
                <div id="<?php echo $id; ?>" class="module padded-extra<?php if( !empty($block['className'])) { echo " ".$block['className']; } ?>">
                    <div class="share-price">
                        <div class="container-fluid">
                            <?php if ($share_price['title']) { ?> 
                            <<?php echo $share_price['title_tag']; ?> class="lh-1 mb-5 <?php echo $share_price['title_css_class'] ?: ''; ?>">
                                <?php echo $share_price['title']; ?>
                            </<?php echo $share_price['title_tag']; ?>>
                            <?php } ?> 
                            <?php if ($share_price['markup']) { ?> 
                            <div class="share-price-wrap">
                                <?php echo apply_filters('the_content', $share_price['markup']); ?>
                            </div>
                            <?php } ?> 
                        </div>
                    </div>
                </div>
                <!-- / share-price -->
