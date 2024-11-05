<?php
/**
 * Block Name: Image Annotation
 *
 * This is the template that displays the image annotation block.
 */

// create id attribute for styling
$id = 'image-annotation-' . $block['id'];

$image_annotation = get_field('image_annotation');
?>

                <!-- image-annotation -->
                <div id="<?php echo $id; ?>" class="module">
                    <div class="image-annotation rect-outer">
                        <img src="<?php echo esc_url($image_annotation['image']['sizes']['full-promo']); ?>" alt="" class="img-fluid" srcset="<?php echo esc_url($image_annotation['image']['sizes']['full-promo']); ?> 1366w, <?php echo esc_url($image_annotation['image']['sizes']['tablet']); ?> 834w, <?php echo esc_url($image_annotation['image']['sizes']['mobile']); ?> 393w">
                        <div class="image-annotation-content rect-inner d-flex flex-column justify-content-between">
                            <?php if ($image_annotation['title']) { ?> 
                            <<?php echo $image_annotation['title_tag']; ?> class="lh-1 mb-3 text-white <?php echo $image_annotation['title_css_class']; ?>">
                                <?php echo $image_annotation['title']; ?>
                            </<?php echo $image_annotation['title_tag']; ?>>
                            <?php } ?> 
                            <?php if ($image_annotation['annotations']) { ?> 
                            <div class="annotations d-flex flex-column">
                                <?php foreach ($image_annotation['annotations'] as $annotation) { ?> 
                                <div class="annotation d-flex flex-nowrap align-items-center">
                                    <span class="site-link me-3 text-white border-white">&bull;</span>
                                    <p class="mb-0 lh-sm display-4 text-white annotation-text">
                                        <?php echo nl2br($annotation['text']); ?> 
                                    </p>
                                </div>
                                <?php } ?> 
                            </div>
                            <?php } ?> 
                        </div>
                    </div>
                </div>
                <!-- / image-annotation -->
