<?php
/**
 * Block Name: Statement
 *
 * This is the template that displays the statement block.
 */

// create id attribute for styling
$id = 'statement-' . $block['id'];

$statement = get_field('statement');
$statement_image = $statement['image'] ? ' style="background-image: url('.esc_url($statement['image']['url']).')"' : '';
?>

                <!-- statement -->
                <div class="module <?php if( !empty($block['className'])) { echo " ".$block['className']; } ?><?php echo $statement['background_colour'] ? ' bg-'.$statement['background_colour'] : ''; ?>">
                    <?php if ($statement['image']) { ?> 
                    <div class="statement rect-outer has-image"<?php echo $statement_image; ?>>
                        <img src="<?php echo esc_url($statement['image']['sizes']['full-promo']); ?>" alt="" class="img-fluid" srcset="<?php echo esc_url($statement['image']['sizes']['full-promo']); ?> 1366w, <?php echo esc_url($statement['image']['sizes']['tablet']); ?> 834w, <?php echo esc_url($statement['image']['sizes']['mobile']); ?> 393w">
                        <div class="statement-inner rect-inner padded h-100 d-flex flex-column justify-content-center align-items-center <?php echo $statement['text_colour'] ? ' text-'.$statement['text_colour'] : ''; ?>">
                            <?php if ($statement['title']) { ?> 
                            <<?php echo $statement['title_tag']; ?> class="lh-1 text-center <?php echo $statement['title_css_class'] ?: ''; ?>">
                                <?php echo $statement['title']; ?>
                            </<?php echo $statement['title_tag']; ?>>
                            <?php } ?> 
                        </div>
                    </div>
                    <?php } else { ?> 
                    <div class="statement">
                        <div class="statement-inner h-100 padded d-flex flex-column justify-content-center align-items-center <?php echo $statement['text_colour'] ? 'text-'.$statement['text_colour'] : ''; ?>">
                            <?php if ($statement['title']) { ?> 
                            <<?php echo $statement['title_tag']; ?> class="lh-1 text-center <?php echo $statement['title_css_class'] ?: ''; ?>">
                                <?php echo $statement['title']; ?>
                            </<?php echo $statement['title_tag']; ?>>
                            <?php } ?> 
                        </div>
                    </div>
                    <?php } ?> 
                </div>
                <!-- / statement -->
