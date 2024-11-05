<?php
/**
 * Block Name: Video Block
 *
 * This is the template that displays the video block.
 */

// create id attribute for styling
$id = 'video-block-' . $block['id'];

$video_block = get_field('video_block');
?>

                <!-- video-block -->
                <div id="<?php echo $id; ?>" class="module video-block padded">
                    <div class="container-fluid ps-0">
                        <div class="row align-items-end">
                            <div class="col-xxl-9 mb-4 mb-xxl-0">
                                <div class="ratio ratio-16x9">
                                    <?php echo $video_block['embed']; ?> 
                                </div>
                            </div>
                            <div class="col-xxl-3">
                                <?php if ($video_block['title']) { ?> 
                                <<?php echo $video_block['title_tag']; ?> class="mb-3 <?php echo $video_block['title_css_class'] ?: ''; ?>">
                                    <?php echo $video_block['title']; ?>
                                </<?php echo $video_block['title_tag']; ?>>
                                <?php } ?> 
                                <?php if ($video_block['text']) { ?> 
                                <p class="mb-0 lh-sm display-4 fw-normal">
                                    <?php echo nl2br($video_block['text']); ?> 
                                </p>
                                <?php } ?> 
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / video-block -->
