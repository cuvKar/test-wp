<?php
/**
 * Block Name: Download Block
 *
 * This is the template that displays the download block.
 */

// create id attribute for styling
$id = 'download-block-' . $block['id'];

$download_block = get_field('download_block');
?>

                <!-- download-block -->
                <div id="<?php echo $id; ?>" class="module padded-limited <?php echo $download_block['background_colour'] ? ' bg-'.$download_block['background_colour'] : ''; ?>">
                    <div class="download-block">
                        <div class="container-fluid text-center">
                            <a href="<?php echo esc_url($download_block['file']['url']); ?>" target="_blank" class="btn lh-1 text-uppercase fw-semibold<?php echo $download_block['text_colour'] ? ' text-'.$download_block['text_colour'] : ''; ?><?php echo $download_block['text_colour'] ? ' border-'.$download_block['text_colour'] : ''; ?>">
                                <?php _e('Download PDF', 'cuvtwentythree'); ?> 
                            </a>
                        </div>
                    </div>
                </div>
                <!-- / download-block -->
