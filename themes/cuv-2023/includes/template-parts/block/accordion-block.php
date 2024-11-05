<?php
/**
 * Block Name: Accordion Block
 *
 * This is the template that displays the accordion block.
 */

// create id attribute for styling
$id = 'accordiom-block-' . $block['id'];

$accordion_block = get_field('accordion_block');
?>

                <!-- accordiom-block -->
                <div id="<?php echo $id; ?>" class="module padded-extra<?php if( !empty($block['className'])) { echo " ".$block['className']; } ?>">
                    <div class="container-fluid pseudo-border-top padded-top">
                        <div class="row">
                            <div class="col-xxl-4 copy-block">
                                <?php if ($accordion_block['title']) { ?> 
                                <<?php echo $accordion_block['title_tag']; ?> class="lh-1 mb-4 mb-xxl-0 <?php echo $accordion_block['title_css_class']; ?>">
                                    <?php echo $accordion_block['title']; ?>
                                </<?php echo $accordion_block['title_tag']; ?>>
                                <?php } ?> 
                            </div>
                            <div class="col-xxl-8 accordiom-block">
                                <?php if ($accordion_block['items'] && is_array($accordion_block['items'])) { ?>
                                <div id="accordion-<?php echo $block['id']; ?>" class="accordion">
                                    <?php 
                                    $i = 1;
                                    foreach ($accordion_block['items'] as $item) { ?> 
                                    <div class="accordion-row border-bottom border-black">
                                        <div class="accordion-header" id="accordion-<?php echo $block['id']; ?>-heading-<?php echo $i; ?>">
                                            <h5 class="accordion-header-title mb-0 display-3">
                                                <a aria-controls="accordion-<?php echo $block['id']; ?>-collapse-<?php echo $i; ?>" aria-expanded="<?php echo $i > 1 ? 'false' : 'true'; ?>" data-parent="#accordion-<?php echo $block['id']; ?>" data-bs-toggle="collapse" data-bs-target="#accordion-<?php echo $block['id']; ?>-collapse-<?php echo $i; ?>" href="#accordion-<?php echo $block['id']; ?>-collapse-<?php echo $i; ?>" class="text-decoration-none display-3 py-3 <?php echo $i > 1 ? ' collapsed' : ''; ?>">
													<div class="site-link">
														<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
															<line y1="-1" x2="10.1109" y2="-1" transform="matrix(0.706452 -0.707761 0.706452 0.707761 29.9668 36.8691)" stroke="none" stroke-width="2"></line>
															<line y1="-1" x2="9.09979" y2="-1" transform="matrix(0.706452 0.707761 -0.706452 0.707761 22.8564 29.7134)" stroke="none" stroke-width="2"></line>
														</svg>
													</div><?php echo $item['title']; ?> 
                                                </a>
                                            </h5>
                                        </div>
                                        <div id="accordion-<?php echo $block['id']; ?>-collapse-<?php echo $i; ?>" class="collapse<?php echo $i > 1 ? '' : ' show'; ?>" aria-labelledby="accordion-<?php echo $block['id']; ?>-heading-<?php echo $i; ?>" data-parent="#accordion-<?php echo $block['id']; ?>">
                                            <div class="accordion-body px-0 pt-0 pb-5">
                                                <?php echo apply_filters('the_content', $item['text']); ?> 
                                            </div>
                                        </div>
                                    </div>
                                    <?php $i++; } ?> 
                                </div>
                                <?php } ?> 
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / accordiom-block -->

