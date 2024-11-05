<?php
/**
 * Block Name: Tech Note
 *
 * This is the template that displays the copy block.
 */

// create id attribute for styling
$id = 'tech-note-' . $block['id'];

$tech_note = get_field('tech_note');
?>

                <!-- tech-note -->
                <div id="<?php echo $id; ?>" class="module padded">
                    <div class="container-fluid pseudo-border-top pseudo-border-bottom">
                        <div class="row">
                            <div class="col-xxl-6 copy-block display-4 fw-normal padded-limited">
                                <?php if ($tech_note['left_text']) { ?> 
                                <?php echo apply_filters('the_content', $tech_note['left_text']); ?>
                                <?php } ?> 
                            </div>
                            <div class="col-xxl-6 copy-block display-4 fw-normal padded-limited">
                                <?php if ($tech_note['right_text']) { ?> 
                                <?php echo apply_filters('the_content', $tech_note['right_text']); ?>
                                <?php } ?> 
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / tech-note -->
