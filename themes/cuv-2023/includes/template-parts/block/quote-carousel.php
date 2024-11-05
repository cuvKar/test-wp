<?php
/**
 * Block Name: Quote Carousel
 *
 * This is the template that displays the quote carousel block.
 */

// create id attribute for styling
$id = 'quote-carousel-' . $block['id'];

$quote_carousel = get_field('quote_carousel');
?>

<!-- quote-carousel -->
<div class="module padded-extra">
    <div class="quote-carousel">
        <div class="container-fluid">
            <?php if ($quote_carousel['slides']) { ?>
            <div class="carousel">
                <?php foreach ($quote_carousel['slides'] as $slide) { ?>
                <div class="carousel-card">
                    <div class="row">
                        <div class="col-xxl-5 text-center">
                            <?php if ($slide['image']) { ?>
                            <figure class="figure mb-0">
                                <img src="<?php echo esc_url($slide['image']['sizes']['link-carousel']); ?>" alt=""
                                    class="figure-img img-fluid mb-0">
                            </figure>
                            <?php } ?>
                        </div>
                        <div class="col-xxl-7 align-self-center px-5">
                            <h2 class="lh-1 mb-4">
                                <?php echo $slide['quote']; ?>
                            </h2>
                            <p class="mb-0">
                                <?php echo $slide['cite']; ?>
                            </p>
                        </div>
                    </div>
                </div>
                <?php } ?>
            </div>
            <?php if (sizeof($quote_carousel['slides']) > 1) { ?>
            <div class="pager">
                <a class="prev" href="#" role="button"><svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">

<line y1="-1" x2="10.1109" y2="-1" transform="matrix(-0.707761 -0.706452 0.707761 -0.706452 45.8691 40.0327)" stroke="none" stroke-width="2"/>
<line y1="-1" x2="9.09979" y2="-1" transform="matrix(0.707761 -0.706452 0.707761 0.706452 38.7129 47.1436)" stroke="none" stroke-width="2"/>
</svg></a>
                <a class="next" href="#" role="button"><svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">

<line y1="-1" x2="10.1109" y2="-1" transform="matrix(-0.707761 -0.706452 0.707761 -0.706452 45.8691 40.0327)" stroke="none" stroke-width="2"/>
<line y1="-1" x2="9.09979" y2="-1" transform="matrix(0.707761 -0.706452 0.707761 0.706452 38.7129 47.1436)" stroke="none" stroke-width="2"/>
</svg>
</a>
            </div>
            <?php } ?>
            <?php } ?>
        </div>
    </div>
</div>
<!-- / quote-carousel -->