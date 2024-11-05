<?php
/**
 * Block Name: Text Carousel
 *
 * This is the template that displays the card(s) block.
 */

// create id attribute for styling
$id = 'text-carousel-' . $block['id'];

$text_carousel = get_field('text_carousel');
?>

                <!-- text-carousel -->
                <div class="module padded-extra<?php echo $text_carousel['background_colour'] ? ' bg-'.$text_carousel['background_colour'] : ''; ?>">
                    <div class="text-carousel">
                        <div class="container-fluid">
                            <?php if ($text_carousel['title']) { ?> 
                            <<?php echo $text_carousel['title_tag']; ?> class="mb-5 lh-1 <?php echo $text_carousel['title_css_class']; ?>">
                                <?php echo $text_carousel['title']; ?>
                            </<?php echo $text_carousel['title_tag']; ?>>
                            <?php } ?> 
                            <?php if ($text_carousel['slides']) { ?> 
                            <div class="row carousel">
                                <?php 
                                $i = 1;
                                foreach ($text_carousel['slides'] as $slide) { ?> 
                                <div class="col-md-6 col-xxl-4">
                                    <div class="text-carousel-card h-100 d-flex flex-column justify-content-<?php echo $text_carousel['hide_index'] ? 'end' : 'between'; ?> bg-<?php echo $slide['colour']; ?>">
                                        <?php if (! $text_carousel['hide_index']) { ?> 
                                        <span class="display-1 d-block <?php echo $slide['colour'] === 'black' ? 'text-white' : ''; ?>"><?php echo $i; ?>.</span>
                                        <?php } ?> 
                                        <div class="text-carousel-card-text <?php echo $slide['colour'] === 'black' ? 'text-white' : ''; ?>">
                                            <?php if ($slide['title']) { ?> 
                                            <h6 class="display-3 mb-2">
                                                <?php echo $slide['title']; ?> 
                                            </h6>
                                            <?php } ?> 
                                            <?php if ($slide['text']) { ?> 
                                            <p class="mb-0 lh-sm display-4 fw-normal">
                                                <?php echo nl2br($slide['text']); ?> 
                                            </p>
                                            <?php } ?> 
                                            <?php if ($slide['button']) { ?> 
                                            <?php if ($slide['button']['link'] && $slide['button']['text']) { ?> 
                                            <a href="<?php echo esc_url($slide['button']['link']); ?>" class="btn btn-<?php echo $slide['colour'] === 'black' ? 'white' : 'dark'; ?> lh-1 fw-semibold text-uppercase mt-4">
                                                <?php echo $slide['button']['text']; ?> 
                                            </a>
                                            <?php } ?> 
                                            <?php } ?> 
                                        </div>
                                    </div>
                                </div>
                                <?php $i++; } ?> 
                            </div>
                            <?php if (sizeof($text_carousel['slides']) > 3) { ?> 
                            <div class="pager">
                                <a class="prev" href="#" role="button"><svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">

<line y1="-1" x2="10.1109" y2="-1" transform="matrix(-0.707761 -0.706452 0.707761 -0.706452 45.8691 40.0327)" stroke="none" stroke-width="2"/>
<line y1="-1" x2="9.09979" y2="-1" transform="matrix(0.707761 -0.706452 0.707761 0.706452 38.7129 47.1436)" stroke="none" stroke-width="2"/>
</svg></a>
                                <a class="next" href="#" role="button"><svg width="80" height="80" viewBox="0 0 80 80" fill="none"
                        xmlns="http://www.w3.org/2000/svg">

                        <line y1="-1" x2="10.1109" y2="-1"
                            transform="matrix(-0.707761 -0.706452 0.707761 -0.706452 45.8691 40.0327)" stroke="none"
                            stroke-width="2" />
                        <line y1="-1" x2="9.09979" y2="-1"
                            transform="matrix(0.707761 -0.706452 0.707761 0.706452 38.7129 47.1436)" stroke="none"
                            stroke-width="2" />
                    </svg></a>
                            </div>
                            <?php } ?> 
                            <?php } ?> 
                        </div>
                    </div>
                </div>
                <!-- / text-carousel -->
