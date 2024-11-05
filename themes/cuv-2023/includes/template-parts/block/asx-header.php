<?php
/**
 * Block Name: ASX Header
 *
 * This is the template that displays the ASX header block.
 */

// create id attribute for styling
$id = 'asx-header-' . $block['id'];

$asx_header = get_field('asx_header');
?>

                <!-- asx-header -->
                <div id="<?php echo $id; ?>" class="module padded<?php if( !empty($block['className'])) { echo " ".$block['className']; } ?>">
                    <div class="container-fluid pseudo-border-top pseudo-border-bottom">
                        <div class="row">
                            <div class="col-xxl-6 copy-block display-4 fw-normal py-2">
                                <?php if ($asx_header['text']) { ?> 
                                <?php echo apply_filters('the_content', $asx_header['text']); ?>
                                <?php } ?> 
                            </div>
                            <div class="col-xxl-6 copy-block display-4 fw-normal py-2">
                                <ul class="list-unstyled my-0">
                                    <?php if ($asx_header['asx']) { ?> 
                                    <li class="border-bottom border-black lh-1 py-2">
                                        <b><?php _e('ASX:', 'cuvtwentythree'); ?></b> <?php echo $asx_header['asx']; ?> 
                                    </li>
                                    <?php } ?> 
                                    <?php if ($asx_header['xetra-dax']) { ?> 
                                    <li class="border-bottom border-black lh-1 py-2">
                                        <b><?php _e('XETRA-DAX:', 'cuvtwentythree'); ?></b> <?php echo $asx_header['xetra-dax']; ?> 
                                    </li>
                                    <?php } ?> 
                                    <?php if ($asx_header['level_1_adr']) { ?> 
                                    <li class="lh-1 py-2">
                                        <b><?php _e('Level 1 ADR:', 'cuvtwentythree'); ?></b> <?php echo $asx_header['level_1_adr']; ?> 
                                    </li>
                                    <?php } ?> 
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / asx-header -->
