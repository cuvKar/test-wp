<?php
/**
 * Block Name: Card Block
 *
 * This is the template that displays the card(s) block.
 */

// create id attribute for styling
$id = 'card-block-' . $block['id'];

$card_block = get_field('card_block');

$cols = sizeof($card_block) <= 2 ? 6 : 4;
?>

                <!-- card-blocks -->
                <div id="<?php echo $id; ?>" class="module padded<?php if( !empty($block['className'])) { echo " ".$block['className']; } ?>">
                    <div class="container-fluid">
                        <div class="row">
                            <?php foreach ($card_block as $card) { ?>                             
                            <div class="col-xxl-<?php echo $cols; ?> card-block mb-4 mb-xxl-0">
                                <figure class="figure">
                                    <img src="<?php echo esc_url($card['image']['sizes']['half-promo']); ?>" alt="" class="figure-img img-fluid">
                                </figure>
                                <?php if ($card['title']) { ?> 
                                <<?php echo $card['title_tag']; ?> class="mb-3 <?php echo $card['title_css_class'] ?: ''; ?>">
                                    <?php echo $card['title']; ?>
                                </<?php echo $card['title_tag']; ?>>
                                <?php } ?> 
                                <?php if ($card['text']) { ?> 
                                <p class="mb-0 lh-sm display-4 fw-normal">
                                    <?php echo nl2br($card['text']); ?> 
                                </p>
                                <?php } ?> 
                            </div>
                            <?php } ?> 
                        </div>
                    </div>
                </div>
                <!-- / card-blocks -->
