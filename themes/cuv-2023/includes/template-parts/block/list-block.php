<?php
/**
 * Block Name: List Block
 *
 * This is the template that displays the list block.
 */

// create id attribute for styling
$id = 'list-block-' . $block['id'];

$list_block = get_field('list_block');
$i = 1;
?>

                <!-- list-block -->
                <div id="<?php echo $id; ?>" class="module padded-extra<?php if( !empty($block['className'])) { echo " ".$block['className']; } ?>">
                    <div class="container-fluid pseudo-border-top padded-top">
                        <div class="row">
                            <div class="col-xxl-4 copy-block">
                                <?php if ($list_block['title']) { ?> 
                                <<?php echo $list_block['title_tag']; ?> class="lh-1 mb-4 mb-xxl-0 <?php echo $list_block['title_css_class']; ?>">
                                    <?php echo $list_block['title']; ?>
                                </<?php echo $list_block['title_tag']; ?>>
                                <?php } ?> 
                            </div>
                            <div class="col-xxl-8">
                            <?php if ($list_block['items'] && is_array($list_block['items'])) { ?>
                                <?php foreach ($list_block['items'] as $item) { ?> 
                                <div class="d-<?php echo $i <= 5 ? 'flex' : 'none'; ?> flex-nowrap justify-content-between align-items-stretch border-bottom border-black py-3 list-block">
                                    <?php if ($item['text']) { ?>
                                    <div class="list-item-content d-flex flex-column justify-content-center">
                                    <?php echo apply_filters('the_content', $item['text']); ?> 
                                    </div>
                                    <?php } ?> 
                                    <?php if ($item['external_link']) { ?> 
                                    <a href="<?php echo esc_url($item['external_link']); ?>" class="site-link ms-3" target="_blank"><svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">

<line y1="-1" x2="10.1109" y2="-1" transform="matrix(-0.707761 -0.706452 0.707761 -0.706452 45.8691 40.0327)" stroke="none" stroke-width="2"/>
<line y1="-1" x2="9.09979" y2="-1" transform="matrix(0.707761 -0.706452 0.707761 0.706452 38.7129 47.1436)" stroke="none" stroke-width="2"/>
</svg></a>
                                    <?php } elseif ($item['internal_link']) { ?> 
                                    <a href="<?php echo esc_url($item['internal_link']); ?>" class="site-link ms-3"><svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M38.5239 49.88V44.03H33.0639V42.17H38.5239V36.32H40.4739V42.17H45.9339V44.03H40.4739V49.88H38.5239Z" fill="#161616"/>
</svg></a>
                                    <?php } ?> 
                                </div>
                                <?php $i++; } ?> 
                                <?php if (sizeof($list_block['items']) > 5) { ?> 
                                <button class="btn btn-outline-dark display-4 text-uppercase fw-semibold border-black lh-1 show-more mt-4" data-type="list-block">
                                    <?php _e('Show More', 'cuvtwentythree'); ?> 
                                </button>
                                <?php } ?> 
                            <?php } ?> 
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / list-block -->